import { BigString } from "../Client.js";
import { Collection } from "../Collection.js";
import { AnyGuildChannel } from "../typings.js";
import GuildChannel from "./GuildChannel.js";

export class CategoryChannel extends GuildChannel {
  get channels(): Collection<BigString, Exclude<AnyGuildChannel, CategoryChannel>> {
    return this.guild?.channels.filter((c) => c.parentID === this.id, false);
  }
}

export default CategoryChannel;
