import { DiscordInteraction } from "discordeno/types";
import Client from "../Client.js";

export class UnknownInteraction {
    constructor(data: DiscordInteraction, client: Client) {}

}

export default UnknownInteraction;
