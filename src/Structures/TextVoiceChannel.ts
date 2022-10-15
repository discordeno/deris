import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import VoiceChannel from "./VoiceChannel.js";

export class TextVoiceChannel extends VoiceChannel {
    constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
        super(data, client);
    }
}

export default TextVoiceChannel;