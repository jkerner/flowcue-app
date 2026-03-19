import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'react-native', replacement: 'react-native-web' },
      { find: '@react-navigation/native', replacement: path.resolve(__dirname, 'src/navigation-shim.ts') },
      { find: '@react-navigation/native-stack', replacement: path.resolve(__dirname, 'src/navigation-shim.ts') },
      { find: '@react-navigation/stack', replacement: path.resolve(__dirname, 'src/navigation-shim.ts') },
      { find: 'react-native-safe-area-context', replacement: path.resolve(__dirname, 'src/shims/safe-area.ts') },
      { find: 'react-native-screens', replacement: path.resolve(__dirname, 'src/shims/screens.ts') },
      { find: 'react-native-gesture-handler', replacement: path.resolve(__dirname, 'src/shims/gesture-handler.ts') },
      { find: 'react-native-reanimated', replacement: path.resolve(__dirname, 'src/shims/reanimated.ts') },
      { find: '@react-native-community/netinfo', replacement: path.resolve(__dirname, 'src/shims/netinfo.ts') },
      // Catch all @nozbe/watermelondb sub-paths
      { find: /^@nozbe\/watermelondb(.*)$/, replacement: path.resolve(__dirname, 'src/shims/watermelondb.ts') },
      { find: '@nozbe/with-observables', replacement: path.resolve(__dirname, 'src/shims/with-observables.ts') },
      { find: 'react-native-agora', replacement: path.resolve(__dirname, 'src/shims/agora.ts') },
    ],
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
  },
  define: {
    global: 'globalThis',
    __DEV__: JSON.stringify(true),
    'process.env': JSON.stringify({}),
  },
});
