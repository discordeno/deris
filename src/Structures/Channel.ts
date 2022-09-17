import { ChannelTypes, DiscordChannel } from "discordeno/types";
import { Base } from "../Base.js";
import Client from "../Client.js";
import CategoryChannel from "./CategoryChannel.js";
import GuildChannel from "./GuildChannel.js";
import NewsChannel from "./NewsChannel.js";
import NewsThreadChannel from "./NewsThreadChannel.js";
import PrivateChannel from "./PrivateChannel.js";
import PrivateThreadChannel from "./PrivateThreadChannel.js";
import PublicThreadChannel from "./PublicThreadChannel.js";
import StageChannel from "./StageChannel.js";
import TextChannel from "./TextChannel.js";
import TextVoiceChannel from "./TextVoiceChannel.js";

export class Channel extends Base {
  type: ChannelTypes;
  client: Client;

  constructor(data: DiscordChannel | Pick<DiscordChannel, "id" | "permissions" | "name" | "type">, client: Client) {
    super(data.id);
    this.type = data.type;
    this.client = client;
  }

  get mention() {
    return `<#${this.id}>`;
  }

  static from(data: DiscordChannel, client: Client) {
    switch (data.type) {
      case ChannelTypes.GuildText: {
        return new TextChannel(data, client);
      }
      case ChannelTypes.DM: {
        return new PrivateChannel(data, client);
      }
      case ChannelTypes.GuildVoice: {
        return new TextVoiceChannel(data, client);
      }
      case ChannelTypes.GuildCategory: {
        return new CategoryChannel(data, client);
      }
      case ChannelTypes.GuildAnnouncement: {
        return new NewsChannel(data, client);
      }
      case ChannelTypes.AnnouncementThread: {
        return new NewsThreadChannel(data, client);
      }
      case ChannelTypes.PublicThread: {
        return new PublicThreadChannel(data, client);
      }
      case ChannelTypes.PrivateThread: {
        return new PrivateThreadChannel(data, client);
      }
      case ChannelTypes.GuildStageVoice: {
        return new StageChannel(data, client);
      }
    }
    if (data.guild_id) {
      if (data.last_message_id !== undefined) {
        client.emit("warn", new Error(`Unknown guild text channel type: ${data.type}\n${JSON.stringify(data)}`));
        return new TextChannel(data, client);
      }
      client.emit("warn", new Error(`Unknown guild channel type: ${data.type}\n${JSON.stringify(data)}`));
      return new GuildChannel(data, client);
    }
    client.emit("warn", new Error(`Unknown channel type: ${data.type}\n${JSON.stringify(data)}`));
    return new Channel(data, client);
  }

  toJSON(props: string[] = []) {
    return super.toJSON([
      "type",
      ...props,
    ]);
  }
}

export default Channel;
