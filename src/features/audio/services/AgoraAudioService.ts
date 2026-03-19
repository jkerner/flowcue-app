import { AgoraConfig } from './AgoraConfig';

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'failed';

/**
 * Scaffold for the Agora audio streaming service.
 * When AgoraConfig.appId is empty every method exits gracefully so the app
 * can run without audio features during development.
 */
class AgoraAudioService {
  private connectionState: ConnectionState = 'disconnected';
  private currentChannel: string | null = null;

  /** Returns true if the Agora SDK is properly configured */
  isConfigured(): boolean {
    return AgoraConfig.appId.length > 0;
  }

  /** Get the current connection state */
  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  /** Initialize the Agora engine. Call once at app startup. */
  async initialize(): Promise<void> {
    if (!this.isConfigured()) {
      console.warn('Agora not configured. Audio features disabled.');
      return;
    }

    // TODO: Initialize the Agora RTC engine
    // import createAgoraRtcEngine from 'react-native-agora';
    // const engine = createAgoraRtcEngine();
    // engine.initialize({ appId: AgoraConfig.appId });
    // engine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
    // engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
    // engine.enableAudio();
  }

  /**
   * Join a named audio channel.
   * The full channel name is prefixed with AgoraConfig.channelPrefix.
   */
  async joinChannel(channelName: string): Promise<void> {
    if (!this.isConfigured()) {
      console.warn('Agora not configured. Audio features disabled.');
      return;
    }

    const fullChannel = `${AgoraConfig.channelPrefix}_${channelName}`;
    this.connectionState = 'connecting';

    // TODO: Join the Agora channel
    // await engine.joinChannel(AgoraConfig.token, fullChannel, 0, {});

    this.currentChannel = fullChannel;
    this.connectionState = 'connected';
  }

  /** Leave the current audio channel */
  async leaveChannel(): Promise<void> {
    if (!this.isConfigured()) {
      console.warn('Agora not configured. Audio features disabled.');
      return;
    }

    // TODO: Leave the Agora channel
    // await engine.leaveChannel();

    this.currentChannel = null;
    this.connectionState = 'disconnected';
  }

  /** Mute the local microphone */
  async muteLocalAudio(): Promise<void> {
    if (!this.isConfigured()) {
      console.warn('Agora not configured. Audio features disabled.');
      return;
    }

    // TODO: Mute local audio stream
    // engine.muteLocalAudioStream(true);
  }

  /** Unmute the local microphone */
  async unmuteLocalAudio(): Promise<void> {
    if (!this.isConfigured()) {
      console.warn('Agora not configured. Audio features disabled.');
      return;
    }

    // TODO: Unmute local audio stream
    // engine.muteLocalAudioStream(false);
  }

  /** Destroy the Agora engine. Call when the app is shutting down or audio is no longer needed. */
  async destroy(): Promise<void> {
    if (!this.isConfigured()) {
      return;
    }

    if (this.currentChannel) {
      await this.leaveChannel();
    }

    // TODO: Release the Agora engine
    // engine.release();

    this.connectionState = 'disconnected';
  }
}

/** Singleton instance */
export const agoraAudioService = new AgoraAudioService();
