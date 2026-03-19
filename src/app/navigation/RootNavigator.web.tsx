import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { WebNavContext } from '../../navigation-shim';

import { HomeScreen } from '../../screens/HomeScreen';
import { LibraryScreen } from '../../screens/LibraryScreen';
import { SequenceDetailScreen } from '../../screens/SequenceDetailScreen';
import { MeditationDetailScreen } from '../../screens/MeditationDetailScreen';
import { SequenceBuilderScreen } from '../../screens/SequenceBuilderScreen';
import { MeditationBuilderScreen } from '../../screens/MeditationBuilderScreen';
import { LiveTeachScreen } from '../../screens/LiveTeachScreen';
import { MeditationModeScreen } from '../../screens/MeditationModeScreen';
import { AIDraftingScreen } from '../../screens/AIDraftingScreen';
import { AIRecommendationsScreen } from '../../screens/AIRecommendationsScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';

type Screen =
  | 'Home'
  | 'Library'
  | 'SequenceDetail'
  | 'MeditationDetail'
  | 'SequenceBuilder'
  | 'MeditationBuilder'
  | 'LiveTeach'
  | 'MeditationMode'
  | 'AIDrafting'
  | 'AIRecommendations'
  | 'Settings';

// Simple web navigation context that screens can use
const NavigationContext = React.createContext<{
  navigate: (screen: Screen, params?: any) => void;
  goBack: () => void;
  params: any;
}>({
  navigate: () => {},
  goBack: () => {},
  params: {},
});

export const useWebNavigation = () => React.useContext(NavigationContext);

const SCREEN_TITLES: Record<Screen, string> = {
  Home: 'FlowCue',
  Library: 'Library',
  SequenceDetail: 'Sequence',
  MeditationDetail: 'Meditation',
  SequenceBuilder: 'Build Sequence',
  MeditationBuilder: 'Build Meditation',
  LiveTeach: 'Live Teach',
  MeditationMode: 'Meditation Mode',
  AIDrafting: 'AI Drafting',
  AIRecommendations: 'AI Suggestions',
  Settings: 'Settings',
};

const HIDE_HEADER: Screen[] = ['Home', 'LiveTeach', 'MeditationMode'];

export const RootNavigator: React.FC = () => {
  const [history, setHistory] = useState<{ screen: Screen; params?: any }[]>([
    { screen: 'Home' },
  ]);

  const current = history[history.length - 1];

  const navigate = (screen: Screen, params?: any) => {
    setHistory((prev) => [...prev, { screen, params }]);
  };

  const goBack = () => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const renderScreen = () => {
    const mockRoute = { params: current.params || {} };

    switch (current.screen) {
      case 'Home':
        return <HomeScreen />;
      case 'Library':
        return <LibraryScreen />;
      case 'SequenceDetail':
        return <SequenceDetailScreen route={mockRoute as any} />;
      case 'MeditationDetail':
        return <MeditationDetailScreen route={mockRoute as any} />;
      case 'SequenceBuilder':
        return <SequenceBuilderScreen route={mockRoute as any} />;
      case 'MeditationBuilder':
        return <MeditationBuilderScreen route={mockRoute as any} />;
      case 'LiveTeach':
        return <LiveTeachScreen route={mockRoute as any} />;
      case 'MeditationMode':
        return <MeditationModeScreen route={mockRoute as any} />;
      case 'AIDrafting':
        return <AIDraftingScreen />;
      case 'AIRecommendations':
        return <AIRecommendationsScreen route={mockRoute as any} />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showHeader = !HIDE_HEADER.includes(current.screen);

  return (
    <WebNavContext.Provider value={{ navigate, goBack, params: current.params || {} }}>
      <View style={styles.container}>
        {/* Phone frame */}
        <View style={styles.phoneFrame}>
          {showHeader && (
            <View style={styles.header}>
              {history.length > 1 && (
                <Pressable onPress={goBack} style={styles.backButton}>
                  <Text style={styles.backText}>{'< Back'}</Text>
                </Pressable>
              )}
              <Text style={styles.headerTitle}>
                {SCREEN_TITLES[current.screen]}
              </Text>
              <View style={styles.headerSpacer} />
            </View>
          )}
          <View style={styles.screenContainer}>{renderScreen()}</View>
          {/* Bottom tab bar */}
          <View style={styles.tabBar}>
            {(['Home', 'Library', 'AIDrafting', 'Settings'] as Screen[]).map(
              (tab) => (
                <Pressable
                  key={tab}
                  onPress={() => {
                    setHistory([{ screen: tab }]);
                  }}
                  style={[
                    styles.tab,
                    current.screen === tab && styles.tabActive,
                  ]}
                >
                  <Text style={styles.tabIcon}>
                    {tab === 'Home'
                      ? '🏠'
                      : tab === 'Library'
                      ? '📚'
                      : tab === 'AIDrafting'
                      ? '✨'
                      : '⚙️'}
                  </Text>
                  <Text
                    style={[
                      styles.tabLabel,
                      current.screen === tab && styles.tabLabelActive,
                    ]}
                  >
                    {tab === 'AIDrafting' ? 'AI' : tab}
                  </Text>
                </Pressable>
              )
            )}
          </View>
        </View>
      </View>
    </WebNavContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E5E0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  phoneFrame: {
    width: 390,
    height: 844,
    backgroundColor: colors.background,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: '#2D2D2D',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: 50,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  backButton: {
    paddingRight: spacing.sm,
  },
  backText: {
    ...typography.label,
    color: colors.primary,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 50,
  },
  screenContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingBottom: 20,
    paddingTop: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  tabActive: {},
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});

export default RootNavigator;
