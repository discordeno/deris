import { DiscordMember, DiscordMemberWithUser } from "discordeno/types";
import { Base } from "../Base.js";
import Client, { BigString } from "../Client.js";
import Guild from "./Guild.js";

export class Member extends Base {
  roles: BigString[];

  constructor(data: (DiscordMember & { id: BigString }) | DiscordMemberWithUser, guild: Guild, client: Client) {
    super(client.isDiscordMemberWithUser(data) ? data.user.id : data.id);

    this.roles = data.roles;
  }
}

export default Member;
