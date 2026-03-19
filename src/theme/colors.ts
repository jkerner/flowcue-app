export const colors = {
  // Primary accent - Rose Ash
  primary: '#C4907A',
  primaryLight: '#D4A08A',
  primaryDark: '#A47060',

  // Backgrounds - dark only
  background: '#1A1F2E',    // Deep Indigo
  surface: '#141824',       // Night Slate
  surfaceAlt: '#0E1019',    // Deep Shadow
  border: '#2A2F3E',
  borderLight: '#232838',

  // Text - Warm Pearl & Muted Sage
  textPrimary: '#EDE8DF',   // Warm Pearl
  textSecondary: '#7A8C7E', // Muted Sage
  textTertiary: '#5A6A5E',  // Dimmer sage
  textInverse: '#1A1F2E',

  // Accents - Ember
  accent: '#D4845A',
  accentLight: '#E4946A',

  // Live mode
  liveBackground: '#0E1019', // Deep Shadow
  liveCueText: '#EDE8DF',    // Warm Pearl
  liveCueNext: '#7A8C7E',    // Muted Sage
  liveCuePrev: '#5A6A5E',
  liveAccent: '#C4907A',     // Rose Ash

  // Status
  success: '#7A8C7E',
  warning: '#D4845A',
  error: '#C47070',
  info: '#7094AA',

  // Source type badges
  templateBadge: '#7094AA',
  userOwnedBadge: '#7A8C7E',
  duplicatedBadge: '#C4907A',
  aiGeneratedBadge: '#9B7CB0',
} as const;

export type ColorToken = keyof typeof colors;
