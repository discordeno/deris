import {
  DiscordInteraction,
  DiscordInteractionData,
  InteractionResponseTypes,
} from "discordeno/types";
import Client, { BigString } from "../Client.js";
import { ApplicationCommandOptionChoice } from "../typings.js";
import Guild from "./Guild.js";
import Interaction from "./Interaction.js";
import Member from "./Member.js";
import NewsChannel from "./NewsChannel.js";
import Permission from "./Permission.js";
import PrivateChannel from "./PrivateChannel.js";
import TextChannel from "./TextChannel.js";
import User from "./User.js";

export class AutocompleteInteraction extends Interaction {
  /** The guild id if this interaction occurred in a guild. */
  guildID?: BigString;
  /** The permissions the app or bot has within the channel, the interaction was sent from. */
  appPermissions?: Permission;
  /** The channel id where this interaction was created in. */
  channelID: BigString;
  /** The user who triggered the interaction. Sent when used in a DM. */
  user?: User;
  /** The data attached to this interaction. */
  data?: DiscordInteractionData;
  /** The member who triggered the interaction. Sent when used in a guild. */
  member?: Member;

  constructor(data: DiscordInteraction, client: Client) {
    super(data, client);

    this.channelID = data.channel_id!;
    this.data = data.data;

    if (data.guild_id !== undefined) {
      this.guildID = data.guild_id;
    }

    if (data.member !== undefined && this.guild) {
      this.member = new Member(data.member, this.guild, this.client);
      this.guild.members.update(this.member, this.guild);
    }

    if (data.user !== undefined) {
      const user = new User(data.user, client);
      this.user = this.client.users.update(user, client);
    }

    if (data.app_permissions !== undefined) {
      this.appPermissions = new Permission(data.app_permissions);
    }
  }

  /** The channel the interaction was created in. */
  get channel(): PrivateChannel | TextChannel | NewsChannel {
    return this.client.getChannel(this.channelID);
  }

  /** The guild the interaction was created in. */
  get guild(): Guild | undefined {
    return this.guildID ? this.client.guilds.get(this.guildID) : undefined;
  }

  async acknowledge(choices: ApplicationCommandOptionChoice[]) {
    return this.result(choices);
  }

  async result(choices: ApplicationCommandOptionChoice[]) {
    if (this.acknowledged === true)
      throw new Error("You have already acknowledged this interaction.");

    return this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
        data: { choices },
      })
      .then(() => this.update());
  }
}

export default AutocompleteInteraction;
