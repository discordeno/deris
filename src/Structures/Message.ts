import { DiscordMessage } from "discordeno/types";
import { Base } from "../Base.js";
import Client from "../Client.js";

export class Message extends Base {
    timestamp: number;

    constructor(data: DiscordMessage, client: Client) {
        super(data.id);
        
        this.timestamp = Date.parse(data.timestamp);
    }
}

export default Message;
