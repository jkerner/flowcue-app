module.exports = {
  preset: 'react-native',
  setupFilesAfterSetup: [],
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '@react-native|' +
      'react-native|' +
      '@react-navigation|' +
      'react-native-reanimated|' +
      'react-native-gesture-handler|' +
      'react-native-screens|' +
      'react-native-safe-area-context|' +
      '@nozbe/watermelondb|' +
      '@nozbe/with-observables|' +
      '@react-native-community/netinfo' +
      ')/)',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};
