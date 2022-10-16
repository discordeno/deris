import { DiscordVoiceState } from 'discordeno/types';
import { Base } from '../Base.js';

export class VoiceState extends Base {
    channelID: string | null = null;
    deaf: boolean;
    mute: boolean;
    requestToSpeakTimestamp: number | null;
    selfDeaf: boolean;
    selfMute: boolean;
    selfStream: boolean;
    selfVideo: boolean;
    sessionID!: string | null;
    suppress: boolean;

    constructor(data: DiscordVoiceState & { id: string }) {
        super(data.id);

        this.mute = false;
        this.deaf = false;
        this.requestToSpeakTimestamp = null;
        this.selfMute = false;
        this.selfDeaf = false;
        this.selfStream = false;
        this.selfVideo = false;
        this.suppress = false;

        this.update(data);
    }

    update(data: DiscordVoiceState) {
        if (data.channel_id !== undefined) {
            this.channelID = data.channel_id;
            this.sessionID = data.channel_id === null ? null : data.session_id;
        } else if (this.channelID === undefined) {
            this.channelID = this.sessionID = null;
        }
        if (data.mute !== undefined) {
            this.mute = data.mute;
        }
        if (data.deaf !== undefined) {
            this.deaf = data.deaf;
        }
        if (data.request_to_speak_timestamp) {
            this.requestToSpeakTimestamp = Date.parse(data.request_to_speak_timestamp);
        }
        if (data.self_mute !== undefined) {
            this.selfMute = data.self_mute;
        }
        if (data.self_deaf !== undefined) {
            this.selfDeaf = data.self_deaf;
        }
        if (data.self_video !== undefined) {
            this.selfVideo = data.self_video;
        }
        if (data.self_stream !== undefined) {
            this.selfStream = data.self_stream;
        }
        if (data.suppress !== undefined) {
            // Bots ignore this
            this.suppress = data.suppress;
        }
    }

    toJSON(props: string[] = []) {
        return super.toJSON(['channelID', 'deaf', 'mute', 'requestToSpeakTimestamp', 'selfDeaf', 'selfMute', 'selfStream', 'selfVideo', 'sessionID', 'suppress', ...props]);
    }
}
