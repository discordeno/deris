import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import { GuildChannel } from "../index.js";
import Collection from "../Collection.js";
import Message from "./Message.js";

export class TextChannel extends GuildChannel {
  /** Collection of Messages in this channel */
  messages: Collection<string, Message>;
  /** The ratelimit of the channel, in seconds. 0 means no ratelimit is enabled */
  rateLimitPerUser: number | null;

  constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
    super(data, client);

    this.messages = new Collection();
    if (messageLimit == null) this.messages.limit = client.options.messageLimit;
    else this.messages.limit = messageLimit;

    this.rateLimitPerUser =
      data.rate_limit_per_user == null ? null : data.rate_limit_per_user;
  }
}

export default TextChannel;
