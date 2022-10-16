import { BigString } from "../Client.js";
import { Collection } from "../Collection.js";
import { AnyGuildChannel } from "../typings.js";
import GuildChannel from "./GuildChannel.js";

export class CategoryChannel extends GuildChannel {
  get channels() {
    return this.guild?.channels.filter((c) => c.parentID === this.id, false) as Collection<BigString, Exclude<AnyGuildChannel, CategoryChannel>>;
  }
}

export default CategoryChannel;
