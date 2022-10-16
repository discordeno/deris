import { DiscordChannel } from "discordeno/types";
import { Client } from "../Client.js";
import { StageInstanceOptions } from "../typings.js";
import StageInstance from "./StageInstance.js";
import VoiceChannel from "./VoiceChannel.js";

export class StageChannel extends VoiceChannel {
  /** The topic of the channel */
  topic?: string | null;

  constructor(data: DiscordChannel, client: Client) {
    super(data, client);
  }

  update(data: DiscordChannel) {
    super.update(data);

    if (data.topic !== undefined) {
      this.topic = data.topic;
    }
  }

  /** Create a stage instance */
  async createInstance(options: StageInstanceOptions): Promise<StageInstance> {
    return await this.client.createStageInstance.call(
      this.client,
      this.id,
      options
    );
  }

  /** Delete the stage instance for this channel */
  async deleteInstance(): Promise<void> {
    return await this.client.deleteStageInstance.call(this.client, this.id);
  }

  /** Update the stage instance for this channel */
  async editInstance(options: StageInstanceOptions): Promise<StageInstance> {
    return await this.client.editStageInstance.call(
      this.client,
      this.id,
      options
    );
  }

  /** Get the stage instance for this channel */
  async getInstance(): Promise<StageInstance> {
    return await this.client.getStageInstance.call(this.client, this.id);
  }

  toJSON(props: string[] = []) {
    return super.toJSON(["topic", ...props]);
  }
}

export default StageChannel;
