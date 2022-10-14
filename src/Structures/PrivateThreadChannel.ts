import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import ThreadChannel from "./ThreadChannel.js";

export class PrivateThreadChannel extends ThreadChannel {
    constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
        super(data, client, messageLimit);

        this.update(data);
    }

    update(data: DiscordChannel) {
        if(data.thread_metadata !== undefined) {
            this.threadMetadata = {
                archiveTimestamp: Date.parse(data.thread_metadata.archive_timestamp),
                archived: data.thread_metadata.archived,
                autoArchiveDuration: data.thread_metadata.auto_archive_duration,
                invitable: data.thread_metadata.invitable,
                locked: data.thread_metadata.locked
            };
        }
    }
}

export default PrivateThreadChannel;