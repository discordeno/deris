import { OverwriteTypes, DiscordOverwrite } from "discordeno/types";
import { Base } from "../Base.js";
import { BigString } from "../Client.js";
import Permission from "./Permission.js";

export class PermissionOverwrite extends Permission {
  id: BigString;
  type: OverwriteTypes;

  constructor(data: DiscordOverwrite) {
    super(data.allow, data.deny);

    this.id = data.id;
    this.type = data.type;
  }

  toJSON(props: string[] = []) {
    return Base.prototype.toJSON.call([
      "id",
      "type",
      ...props,
    ]);
  }
}

export default PermissionOverwrite;
