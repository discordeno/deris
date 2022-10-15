import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import VoiceChannel from "./VoiceChannel.js";

export class StageChannel extends VoiceChannel {
    constructor(data: DiscordChannel, client: Client) {
        super(data, client);
    }
}

export default StageChannel;