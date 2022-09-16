import { AllowedMentionsTypes, DiscordAllowedMentions } from "discordeno/types";
import { EventEmitter } from "events";

export class Client extends EventEmitter {
  /** The cleaned up version of the provided configurations for the client. */
  options: ParsedClientOptions;

  constructor(options: ClientOptions) {
    super();

    this.options = {
      apiVersion: options.apiVersion ?? 10,
      allowedMentions: this._formatAllowedMentions(options.allowedMentions),
      defaultImageFormat: options.defaultImageFormat ?? "png",
      defaultImageSize: options.defaultImageSize ?? 128,
      proxyURL: options.proxyURL,
      proxyRestAuthorization: options.proxyRestAuthorization,
      applicationId: options.applicationId,
    };
  }

  /** Converts the easy to type allowed mentions to the format discord requires. */
  _formatAllowedMentions(allowed?: AllowedMentions): DiscordAllowedMentions {
    if (!allowed) {
      return this.options.allowedMentions;
    }
    const result: DiscordAllowedMentions = {};
    result.parse = [];

    if (allowed.everyone) {
      result.parse.push(AllowedMentionsTypes.EveryoneMentions);
    }
    if (allowed.roles === true) {
      result.parse.push(AllowedMentionsTypes.RoleMentions);
    } else if (Array.isArray(allowed.roles)) {
      if (allowed.roles.length > 100) {
        throw new Error("Allowed role mentions cannot exceed 100.");
      }
      result.roles = allowed.roles;
    }
    if (allowed.users === true) {
      result.parse.push(AllowedMentionsTypes.UserMentions);
    } else if (Array.isArray(allowed.users)) {
      if (allowed.users.length > 100) {
        throw new Error("Allowed user mentions cannot exceed 100.");
      }
      result.users = allowed.users;
    }
    if (allowed.repliedUser !== undefined) {
      result.replied_user = allowed.repliedUser;
    }
    return result;
  }
}

export default Client;

export interface ClientOptions {
  /** The default allowed mentions you would like to use. */
  allowedMentions?: AllowedMentions;
  /** The default image format you would like to use. */
  defaultImageFormat?: ImageFormat;
  /** The default image size you would like to use. */
  defaultImageSize?: ImageSize;
  /** The message limit you would like to set. */
  messageLimit?: number;
  /** The api version you would like to use. */
  apiVersion: ApiVersions;
  /** The url to the REST proxy to send requests to. This url should nly include the initial domain:port portion until api/v.... */
  proxyURL: string;
  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  proxyRestAuthorization: string;
  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  applicationId: BigString;
}

export interface ParsedClientOptions {
  /** The discord api version to use. */
  apiVersion: ApiVersions;
  /** Allowed mentions */
  allowedMentions: DiscordAllowedMentions;
  /** The image format to use by default. */
  defaultImageFormat: ImageFormat;
  /** The image size to use by default. */
  defaultImageSize: ImageSize;
  /** The url to the REST proxy to send requests to. This url should nly include the initial domain:port portion until api/v.... */
  proxyURL: string;
  /** The password/authorization to confirm that these request made to your rest proxy are indeed from you and not a hacker. */
  proxyRestAuthorization: string;
  /** The application id(NOT the bot id). The bot id and application id are the same for newer bots but older bots have different ids. */
  applicationId: BigString;
}

export interface AllowedMentions {
  /** Whether or not to allow mentioning @everyone */
  everyone?: boolean;
  /** Whether or not to allow mentioning the replied user. */
  repliedUser?: boolean;
  /** The roles to allow mentioning by default or enable all roles to be able to be mentioned by default. */
  roles?: boolean | string[];
  /** The users to allow mentioning by default or enable all users to be able to be mentioned by default. */
  users?: boolean | string[];
}

// TODO: Switch bigstring to dd version in next dd release.
/** A union type of string or bigint to help make it easier for users to switch between one another. */
export type BigString = bigint | string;
/** The API versions that are supported. */
export type ApiVersions = 10;
/** The sizes for images that are supported. */
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
/** The formats for images that are supported. */
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif";
/** The methods that are acceptable for REST. */
export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestData {
  /** The method which should be used to send this request. */
  method: RequestMethod;
  /** The url to send this request to. */
  url: string;
  /** The headers you can send which will override internal headers or add others ones. */
  headers?: Record<string, string>;
  /** The reason to add to the audit logs for this request. */
  reason?: string;
  /** The payload this request should send. */
  body?: Record<string, unknown> | string | null | any[];
  /** The file contents that should be sent in this request. */
  file?: FileContent | FileContent[];
}

export interface FileContent {
  /** The file data. */
  file: Buffer | string;
  /** The name of the file, which must include the file suffix. */
  name: string;
}
