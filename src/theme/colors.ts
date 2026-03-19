export const colors = {
  // Primary - warm sage green
  primary: '#7C9A82',
  primaryLight: '#A8C5AE',
  primaryDark: '#5A7A60',

  // Neutrals
  background: '#FAFAF8',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F3F0',
  border: '#E8E5E0',
  borderLight: '#F0EDE8',

  // Text
  textPrimary: '#2D2D2D',
  textSecondary: '#6B6B6B',
  textTertiary: '#9B9B9B',
  textInverse: '#FFFFFF',

  // Accents
  accent: '#C4956A',
  accentLight: '#E8D5C0',

  // Live mode - high contrast
  liveBackground: '#1A1A2E',
  liveCueText: '#FFFFFF',
  liveCueNext: '#A0A0B0',
  liveCuePrev: '#606070',
  liveAccent: '#7C9A82',

  // Status
  success: '#7C9A82',
  warning: '#D4A574',
  error: '#C47070',
  info: '#7094AA',

  // Source type badges
  templateBadge: '#7094AA',
  userOwnedBadge: '#7C9A82',
  duplicatedBadge: '#C4956A',
  aiGeneratedBadge: '#9B7CB0',
} as const;

export type ColorToken = keyof typeof colors;
