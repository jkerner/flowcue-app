const path = require('path');

module.exports = function override(config) {
  // Alias react-native to react-native-web
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
    // Shim navigation libraries to our web-compatible shim
    '@react-navigation/native': path.resolve(__dirname, 'src/navigation-shim.ts'),
    '@react-navigation/native-stack': path.resolve(__dirname, 'src/navigation-shim.ts'),
    '@react-navigation/stack': path.resolve(__dirname, 'src/navigation-shim.ts'),
    // Shim native modules that don't exist on web
    'react-native-safe-area-context': path.resolve(__dirname, 'src/shims/safe-area.ts'),
    'react-native-screens': path.resolve(__dirname, 'src/shims/screens.ts'),
    'react-native-gesture-handler': path.resolve(__dirname, 'src/shims/gesture-handler.ts'),
    'react-native-reanimated': path.resolve(__dirname, 'src/shims/reanimated.ts'),
    '@react-native-community/netinfo': path.resolve(__dirname, 'src/shims/netinfo.ts'),
    '@nozbe/watermelondb': path.resolve(__dirname, 'src/shims/watermelondb.ts'),
    '@nozbe/with-observables': path.resolve(__dirname, 'src/shims/with-observables.ts'),
    'react-native-agora': path.resolve(__dirname, 'src/shims/agora.ts'),
  };

  // Support TypeScript paths
  config.resolve.extensions = ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js', ...config.resolve.extensions];

  return config;
};
