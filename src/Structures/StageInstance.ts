import { DiscordStageInstance } from "discordeno/types";
import { Base } from "../Base.js";
import Client from "../Client.js";

export class StageInstance extends Base {
  constructor(data: DiscordStageInstance, client: Client) {
    super(data.id);
  }
}

export default StageInstance;
