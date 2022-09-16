import { DiscordInteraction } from "discordeno/types";
import Client from "../Client.js";

export class PingInteraction {
    constructor(data: DiscordInteraction, client: Client) {}
}

export default PingInteraction;
