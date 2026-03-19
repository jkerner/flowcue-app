/**
 * Environment configuration for FlowCue.
 *
 * In a React Native CLI project, environment variables are typically
 * injected via react-native-config or a build-time transform.
 * This module provides typed access with sensible defaults.
 */

interface EnvConfig {
  AGORA_APP_ID: string;
  AGORA_TOKEN: string;
  AGORA_CHANNEL_PREFIX: string;
  AI_PROVIDER: 'mock' | 'openai' | 'anthropic';
}

function getString(key: string, fallback: string): string {
  // process.env is populated by react-native-config or metro transform
  const value =
    typeof process !== 'undefined' && process.env
      ? process.env[key]
      : undefined;
  return value ?? fallback;
}

export const env: EnvConfig = {
  AGORA_APP_ID: getString('AGORA_APP_ID', ''),
  AGORA_TOKEN: getString('AGORA_TOKEN', ''),
  AGORA_CHANNEL_PREFIX: getString('AGORA_CHANNEL_PREFIX', 'flowcue'),
  AI_PROVIDER: getString('AI_PROVIDER', 'mock') as EnvConfig['AI_PROVIDER'],
};

/** Returns true when the app is running in __DEV__ mode. */
export function isDev(): boolean {
  return typeof __DEV__ !== 'undefined' && __DEV__;
}
