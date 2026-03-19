import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AppProviders } from './providers/AppProviders';
import { RootNavigator } from './navigation/RootNavigator';
import { colors, typography, spacing } from '../theme';

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // TODO: Call seed() to populate default template data
        // await seed();

        // Simulate brief initialization delay
        await new Promise((resolve) => setTimeout(resolve, 600));
      } catch (error) {
        console.warn('Initialization error:', error);
      } finally {
        setIsReady(true);
      }
    };
    init();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingTitle}>FlowCue</Text>
        <Text style={styles.loadingSubtitle}>Your teaching companion</Text>
        <ActivityIndicator
          color={colors.primary}
          size="small"
          style={styles.spinner}
        />
      </View>
    );
  }

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTitle: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 40,
    lineHeight: 48,
  },
  loadingSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  spinner: {
    marginTop: spacing.xl,
  },
});

export default App;
