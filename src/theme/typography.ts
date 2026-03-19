import { Platform } from 'react-native';

const fontFamily =
  Platform.select({
    ios: 'System',
    android: 'Roboto',
  }) ?? 'System';

export const typography = {
  h1: { fontFamily, fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
  h2: { fontFamily, fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontFamily, fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  label: {
    fontFamily,
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  // Live mode - extra large for glanceability
  liveCue: {
    fontFamily,
    fontSize: 32,
    fontWeight: '600' as const,
    lineHeight: 42,
  },
  livePreview: {
    fontFamily,
    fontSize: 20,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
} as const;

export type TypographyToken = keyof typeof typography;
