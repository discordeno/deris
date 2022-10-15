import { DiscordChannel } from "discordeno/types";
import Client, { GuildChannel } from "..";

export class VoiceChannel extends GuildChannel {
  constructor(data: DiscordChannel, client: Client) {
    super(data, client);
  }
}

export default VoiceChannel;
