import { BigString, ChannelTypes, DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import Collection from "../Collection.js";
import {
  FileContent,
  GetMessageReactionOptions,
  GetMessagesOptions,
  MessageContent,
  MessageContentEdit,
} from "../typings.js";
import Channel from "./Channel.js";
import Message from "./Message.js";
import User from "./User.js";

export class PrivateChannel extends Channel {
  /** The ID of the last message in this channel */
  lastMessageID?: string | null;
  // TODO: THIS A THING IN DMS????
  /** The rate limit per user. */
  rateLimitPerUser?: number;
  /** Collection of Messages in this channel */
  messages: Collection<string, Message>;
  /** The recipient in this private channel */
  recipient?: User;

  constructor(data: DiscordChannel, client: Client) {
    super(data, client);

    this.lastMessageID = data.last_message_id;
    this.rateLimitPerUser = data.rate_limit_per_user;
    if (this.type === ChannelTypes.DM || this.type === undefined) {
      // @ts-ignore Some eris magic here
      if (data.recipients?.[0])
        // @ts-ignore Some eris magic here
        this.recipient = new User(data.recipients[0], client);
    }
    this.messages = new Collection();
    this.messages.limit = client.options.messageLimit;
  }

  /** Add a reaction to a message */
  async addMessageReaction(
    messageID: BigString,
    reaction: string
  ): Promise<void> {
    return await this.client.addMessageReaction.call(
      this.client,
      this.id,
      messageID,
      reaction
    );
  }

  /** Create a message in a text channel */
  async createMessage(
    content: MessageContent,
    file: FileContent | FileContent[]
  ): Promise<Message> {
    return await this.client.createMessage.call(
      this.client,
      this.id,
      content,
      file
    );
  }

  // TODO: REASONS ARE A THING FOR AUDIT LOGS IN DMS???
  /** Delete a message */
  async deleteMessage(messageID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteMessage.call(
      this.client,
      this.id,
      messageID,
      reason
    );
  }

  /** Edit a message */
  async editMessage(
    messageID: BigString,
    content: MessageContentEdit
  ): Promise<Message> {
    return await this.client.editMessage.call(
      this.client,
      this.id,
      messageID,
      content
    );
  }

  /** Get a previous message in a text channel */
  async getMessage(messageID: BigString): Promise<Message> {
    return await this.client.getMessage.call(this.client, this.id, messageID);
  }

  /** Get a list of users who reacted with a specific reaction */
  async getMessageReaction(
    messageID: BigString,
    reaction: string,
    options: GetMessageReactionOptions
  ): Promise<User[]> {
    return await this.client.getMessageReaction.call(
      this.client,
      this.id,
      messageID,
      reaction,
      options
    );
  }

  /** Get a previous message in a text channel */
  async getMessages(options: GetMessagesOptions): Promise<Message[]> {
    return await this.client.getMessages.call(
      this.client,
      this.id,
      options,
    );
  }

  /** Get all the pins in a text channel */
  async getPins(): Promise<Message[]> {
    return await this.client.getPins.call(this.client, this.id);
  }

  /** Leave the channel */
  async leave(): Promise<void> {
    return await this.client.deleteChannel.call(this.client, this.id);
  }

  /** Pin a message */
  async pinMessage(messageID: BigString): Promise<void> {
    return await this.client.pinMessage.call(this.client, this.id, messageID);
  }

  /** Remove a reaction from a message */
  async removeMessageReaction(messageID: BigString, reaction: string): Promise<void> {
    return await this.client.removeMessageReaction.call(
      this.client,
      this.id,
      messageID,
      reaction,
    );
  }

  /** Send typing status in a text channel */
  async sendTyping(): Promise<void> {
    return await this.client.sendChannelTyping.call(this.client, this.id);
  }

  /** Unpin a message */
  async unpinMessage(messageID: BigString): Promise<void> {
    return await this.client.unpinMessage.call(this.client, this.id, messageID);
  }

  toJSON(props = []) {
    return super.toJSON([
      "call",
      "lastCall",
      "lastMessageID",
      "messages",
      "recipient",
      ...props,
    ]);
  }
}

export default PrivateChannel;
