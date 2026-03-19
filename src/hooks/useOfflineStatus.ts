import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useAppStore } from '../store/useAppStore';

/**
 * Hook that subscribes to network connectivity changes via NetInfo
 * and keeps useAppStore.isOffline in sync.
 *
 * Mount this once near the root of the app (e.g., in App.tsx).
 */
export function useOfflineStatus(): boolean {
  const isOffline = useAppStore((s) => s.isOffline);
  const setOffline = useAppStore((s) => s.setOffline);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected ?? true);
      setOffline(offline);
    });

    // Also fetch the current state immediately
    NetInfo.fetch().then((state) => {
      const offline = !(state.isConnected ?? true);
      setOffline(offline);
    });

    return () => {
      unsubscribe();
    };
  }, [setOffline]);

  return isOffline;
}

export default useOfflineStatus;
