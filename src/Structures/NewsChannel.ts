import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import TextChannel from "./TextChannel.js";

export class NewsChannel extends TextChannel {
    constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
        super(data, client, messageLimit);
    }
}

export default NewsChannel;