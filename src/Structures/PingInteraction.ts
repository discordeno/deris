import { DiscordInteraction, InteractionResponseTypes } from "discordeno/types";
import Client from "../Client.js";
import Interaction from "./Interaction.js";

export class PingInteraction extends Interaction {
    constructor(data: DiscordInteraction, client: Client) {
        super(data, client);
    }

    /**
    * Acknowledges the ping interaction with a pong response.
    * Note: You can **not** use more than 1 initial interaction response per interaction.
    */
     async acknowledge(): Promise<void> {
        return this.pong();
    }

    /**
    * Acknowledges the ping interaction with a pong response.
    * Note: You can **not** use more than 1 initial interaction response per interaction.
    */
    async pong(): Promise<void> {
        if(this.acknowledged === true) {
            throw new Error("You have already acknowledged this interaction.");
        }

        return await this.client.createInteractionResponse.call(this.client, this.id, this.token, {
            type: InteractionResponseTypes.Pong
        }).then(() => this.update());
    }
}

export default PingInteraction;
