import { BigString, DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import { ChannelFollow } from "../typings.js";
import Message from "./Message.js";
import TextChannel from "./TextChannel.js";

export class NewsChannel extends TextChannel {
  constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
    super(data, client, messageLimit);

    this.rateLimitPerUser = 0;
    this.update(data);
  }

  /** Crosspost (publish) a message to subscribed channels */
  async crosspostMessage(messageID: BigString): Promise<Message> {
    return await this.client.crosspostMessage.call(
      this.client,
      this.id,
      messageID
    );
  }

  /** Follow this channel in another channel. This creates a webhook in the target channel */
  async follow(webhookChannelID: BigString): Promise<ChannelFollow> {
    return await this.client.followChannel.call(
      this.client,
      this.id,
      webhookChannelID
    );
  }
}

export default NewsChannel;
