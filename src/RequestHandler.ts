import { FileContent, RequestHandlerOptions } from "./typings.js";
import Client from "./Client.js";
import Base from "./Base.js";
import {
  createRestManager,
  RestManager,
  DISCORDENO_VERSION,
  RequestMethod,
} from "discordeno";

export class RequestHandler {
  /** The client manager. */
  client: Client;
  /** The options this manager was configured with. */
  options: RequestHandlerOptions;
  /** The user agent used to make requests. */
  userAgent: string;
  /** The rate limits currently in cache. */
  ratelimits: Record<string, unknown>;
  /** The latency information for this manager. */
  latencyRef: {
    latency: number;
    raw: number[];
    timeOffset: number;
    timeOffsets: number[];
    lastTimeOffsetCheck: number;
  };
  /** Whether or not the manager is globally blocked. */
  globalBlock: boolean;
  /** The ready queue */
  readyQueue: unknown[];
  /** The internal rest manager from dd. */
  discordeno: RestManager;

  constructor(client: Client, options: RequestHandlerOptions) {
    

    this.options = options = Object.assign(
      {
        // agent: client.options.agent || null,
        agent: null,
        baseURL: client.BASE_URL,
        decodeReasons: true,
        disableLatencyCompensation: false,
        domain: "discord.com",
        // latencyThreshold: client.options.latencyThreshold || 30000,
        latencyThreshold: 30000,
        // ratelimiterOffset: client.options.ratelimiterOffset || 0,
        ratelimiterOffset: 0,
        // requestTimeout: client.options.requestTimeout || 15000,
        requestTimeout: 15000,
      },
      options
    );

    this.client = client;

    this.userAgent = `DiscordBot (https://github.com/discordeno/discordeno, ${DISCORDENO_VERSION})`;
    this.ratelimits = {};
    this.latencyRef = {
      latency: this.options.ratelimiterOffset ?? 0,
      raw: new Array(10).fill(this.options.ratelimiterOffset),
      timeOffset: 0,
      timeOffsets: new Array(10).fill(0),
      lastTimeOffsetCheck: 0,
    };
    this.globalBlock = false;
    this.readyQueue = [];

    this.discordeno = createRestManager({
      token: this.client.token,
      customUrl: options.baseURL ?? this.client.options.proxyURL,
      secretKey: this.client.options.proxyRestAuthorization,
    });
  }

  /**
   * @deprecated Use `.client` instead
   */
  get _client(): Client {
    return this.client;
  }

  /**
   * @deprecated Useless, handled by discordeno itself. Kept for Eris api compatibility.
   */
  globalUnblock() {}

  warnUser() {
    // LOG IT ENOUGH TIMES TO MAKE USER SEE IT CLEARLY
    for (let i = 0; i < 10; i++) {
      console.warn(
        "[WARNING] Using internal RestManager since no proxy rest manager was provided. THIS IS NOT RECOMMENDED. Please use a proxy rest manager. If you need help setting it up, join discord.gg/ddeno"
      );
    }
  }

  /**
   * Make an API request
   * @deprecated Use a proxy rest instead.
   */
  async request(
    method: RequestMethod,
    url: string,
    auth?: boolean,
    body?: any,
    file?: FileContent
  ): Promise<unknown> {
    if (file) body.file = file;

    return await this.discordeno.runMethod(this.discordeno, method, url, body);
  }

  routefy(url: string, method: string) {
    let route = url
      .replace(/\/([a-z-]+)\/(?:[0-9]{17,19})/g, function (match, p) {
        return p === "channels" || p === "guilds" || p === "webhooks"
          ? match
          : `/${p}/:id`;
      })
      .replace(/\/reactions\/[^/]+/g, "/reactions/:id")
      .replace(/\/reactions\/:id\/[^/]+/g, "/reactions/:id/:userID")
      .replace(/^\/webhooks\/(\d+)\/[A-Za-z0-9-_]{64,}/, "/webhooks/$1/:token");
    if (method === "DELETE" && route.endsWith("/messages/:id")) {
      const messageID = url.slice(url.lastIndexOf("/") + 1);
      const createdAt = Base.getCreatedAt(messageID);
      if (
        Date.now() - this.latencyRef.latency - createdAt >=
        1000 * 60 * 60 * 24 * 14
      ) {
        method += "_OLD";
      } else if (
        Date.now() - this.latencyRef.latency - createdAt <=
        1000 * 10
      ) {
        method += "_NEW";
      }
      route = method + route;
    } else if (method === "GET" && /\/guilds\/[0-9]+\/channels$/.test(route)) {
      route = "/guilds/:id/channels";
    }
    if (method === "PUT" || method === "DELETE") {
      const index = route.indexOf("/reactions");
      if (index !== -1) {
        route = "MODIFY" + route.slice(0, index + 10);
      }
    }
    return route;
  }

  toString() {
    return "[RequestHandler]";
  }

  toJSON(props: string[] = []) {
    return Base.prototype.toJSON.call(this, [
      "globalBlock",
      "latencyRef",
      "options",
      "ratelimits",
      "readyQueue",
      "userAgent",
      ...props,
    ]);
  }
}

export default RequestHandler;
