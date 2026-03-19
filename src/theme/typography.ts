import { Platform } from 'react-native';

const headerFont =
  Platform.select({
    ios: 'Cormorant Garamond',
    android: 'Cormorant Garamond',
  }) ?? 'Cormorant Garamond';

const bodyFont =
  Platform.select({
    ios: 'DM Sans',
    android: 'DM Sans',
  }) ?? 'DM Sans';

const cueFont =
  Platform.select({
    ios: 'Lora',
    android: 'Lora',
  }) ?? 'Lora';

export const typography = {
  h1: {
    fontFamily: headerFont,
    fontSize: 28,
    fontWeight: '300' as const,
    lineHeight: 36,
    letterSpacing: 1.2,
  },
  h2: {
    fontFamily: headerFont,
    fontSize: 22,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: 0.8,
  },
  h3: {
    fontFamily: headerFont,
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0.6,
  },
  body: {
    fontFamily: bodyFont,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: bodyFont,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontFamily: bodyFont,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  label: {
    fontFamily: bodyFont,
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 1.0,
    textTransform: 'uppercase' as const,
  },
  // Cue script - Lora italic for in-practice read-aloud feel
  cueScript: {
    fontFamily: cueFont,
    fontSize: 18,
    fontWeight: '400' as const,
    fontStyle: 'italic' as const,
    lineHeight: 28,
  },
  // Live mode - Lora italic, extra large for glanceability
  liveCue: {
    fontFamily: cueFont,
    fontSize: 32,
    fontWeight: '400' as const,
    fontStyle: 'italic' as const,
    lineHeight: 42,
  },
  livePreview: {
    fontFamily: cueFont,
    fontSize: 20,
    fontWeight: '400' as const,
    fontStyle: 'italic' as const,
    lineHeight: 28,
  },
  button: {
    fontFamily: bodyFont,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
} as const;

export type TypographyToken = keyof typeof typography;
