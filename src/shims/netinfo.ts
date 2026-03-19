export default {
  addEventListener: (callback: any) => {
    // Assume online on web
    setTimeout(() => callback({ isConnected: true, isInternetReachable: true }), 0);
    return () => {};
  },
  fetch: async () => ({ isConnected: true, isInternetReachable: true }),
};
