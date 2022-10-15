import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import { GuildChannel } from "../index.js";
import Collection from "../Collection.js";
import Message from "./Message.js";

export class TextChannel extends GuildChannel {
    messages: Collection<string, Message>;

    constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
        super(data, client);

        this.messages = new Collection();
        if (messageLimit == null) this.messages.limit = client.options.messageLimit;
        else this.messages.limit = messageLimit;
        

    }
}

export default TextChannel;