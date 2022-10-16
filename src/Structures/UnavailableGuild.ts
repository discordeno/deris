import { DiscordUnavailableGuild } from "discordeno/types";
import { Base } from "../Base";
import Client from "../Client";

export class UnavailableGuild extends Base {
  /** Whether or not the guild is unavailable. */
  unavailable: boolean;

  constructor(data: DiscordUnavailableGuild, client: Client) {
    super(data.id);

    // TODO: gateway
    // this.shard = client.shards.get(client.guildShardMap[this.id]);
    this.unavailable = !!data.unavailable;
  }

  toJSON(props: string[] = []) {
    return super.toJSON(["unavailable", ...props]);
  }
}

export default UnavailableGuild;
