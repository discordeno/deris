import { DiscordChannel } from 'discordeno/types';
import Client from '../Client.js';
import Collection from '../Collection.js';
import { CreateInviteOptions, JoinVoiceChannelOptions, TextVoiceChannelTypes, VideoQualityMode } from '../typings.js';
import GuildChannel from './GuildChannel.js';
import { Member } from './Member.js';

export class VoiceChannel extends GuildChannel {
    bitrate: number = 0;
    rtcRegion: string | null = null;
    type: TextVoiceChannelTypes = 0;
    userLimit: number = 0;
    videoQualityMode: VideoQualityMode = 0;
    voiceMembers: Collection<string, Member>;

    constructor(data: DiscordChannel, client: Client) {
        super(data, client);

        this.voiceMembers = new Collection();
        this.update(data);
    }

    update(data: DiscordChannel) {
        super.update(data);

        if (data.bitrate !== undefined) {
            this.bitrate = data.bitrate;
        }
        if (data.rtc_region !== undefined) {
            this.rtcRegion = data.rtc_region;
        }
        if (data.user_limit !== undefined) {
            this.userLimit = data.user_limit;
        }
        if (data.video_quality_mode !== undefined) {
            this.videoQualityMode = data.video_quality_mode;
        }
    }

    /**
     * Create an invite for the channel
     * @arg {Object} [options] Invite generation options
     * @arg {Number} [options.maxAge] How long the invite should last in seconds
     * @arg {Number} [options.maxUses] How many uses the invite should last for
     * @arg {Boolean} [options.temporary] Whether the invite grants temporary membership or not
     * @arg {Boolean} [options.unique] Whether the invite is unique or not
     * @arg {String} [reason] The reason to be displayed in audit logs
     * @returns {Promise<Invite>}
     */
    createInvite(options: CreateInviteOptions, reason: string) {
        return this.client.createChannelInvite.call(this.client, this.id, options, reason);
    }

    /**
     * Get all invites in the channel
     * @returns {Promise<Array<Invite>>}
     */
    getInvites() {
        return this.client.getChannelInvites.call(this.client, this.id);
    }

    /**
     * Joins the channel.
     * @arg {Object} [options] VoiceConnection constructor options
     * @arg {Object} [options.opusOnly] Skip opus encoder initialization. You should not enable this unless you know what you are doing
     * @arg {Object} [options.shared] Whether the VoiceConnection will be part of a SharedStream or not
     * @arg {Boolean} [options.selfMute] Whether the bot joins the channel muted or not
     * @arg {Boolean} [options.selfDeaf] Whether the bot joins the channel deafened or not
     * @returns {Promise<VoiceConnection>} Resolves with a VoiceConnection
     */
    join(options: JoinVoiceChannelOptions) {
        return this.client.joinVoiceChannel.call(this.client, this.id, options);
    }

    /**
     * Leaves the channel.
     */
    leave() {
        return this.client.leaveVoiceChannel.call(this.client, this.id);
    }

    toJSON(props: string[] = []) {
        return super.toJSON(['bitrate', 'rtcRegion', 'userLimit', 'videoQualityMode', 'voiceMembers', ...props]);
    }
}

export default VoiceChannel;
