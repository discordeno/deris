import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import Channel from "./Channel.js";

export class PrivateChannel extends Channel {
    constructor(data: DiscordChannel, client: Client) {
        super(data, client);
    }
}

export default PrivateChannel;