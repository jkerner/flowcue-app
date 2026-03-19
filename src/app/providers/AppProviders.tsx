import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppProviders;
