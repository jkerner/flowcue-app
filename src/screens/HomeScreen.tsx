import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { SourceTypeBadge } from '../components/SourceTypeBadge';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import type { Sequence } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// Mock recent content
const recentSequences: Sequence[] = [
  {
    id: 'seq-1',
    title: 'Grounding Vinyasa Flow',
    style: 'Vinyasa',
    durationMinutes: 60,
    description: 'A full grounding flow emphasizing connection to breath and earth.',
    sourceType: 'user_owned',
    isFavorite: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'seq-2',
    title: 'Gentle Morning Stretch',
    style: 'Gentle',
    durationMinutes: 30,
    description: 'Soft, slow stretches to start the day.',
    sourceType: 'duplicated',
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'med-1',
    title: 'Body Scan Savasana',
    style: 'Meditation',
    durationMinutes: 10,
    description: 'A guided body scan for deep relaxation.',
    sourceType: 'template',
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const quickActions = [
  { label: 'New Sequence', route: 'SequenceBuilder' as const, variant: 'filled' as const },
  { label: 'New Meditation', route: 'MeditationBuilder' as const, variant: 'outline' as const },
  { label: 'Browse Templates', route: 'Library' as const, variant: 'outline' as const },
  { label: 'AI Drafting', route: 'AIDrafting' as const, variant: 'outline' as const },
  { label: 'Start Teaching', route: 'Library' as const, variant: 'filled' as const },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const isOffline = useOfflineStatus();

  const handleRecentPress = (item: Sequence) => {
    if (item.style === 'Meditation') {
      navigation.navigate('MeditationDetail', { meditationId: item.id });
    } else {
      navigation.navigate('SequenceDetail', { sequenceId: item.id });
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Offline Banner */}
        {isOffline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>
              You are offline. Content is available locally.
            </Text>
          </View>
        )}

        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>FlowCue</Text>
          <Text style={styles.subtitle}>Your teaching companion</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <SectionHeader title="Quick Actions" />
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <View key={action.label} style={styles.actionItem}>
                <PrimaryButton
                  title={action.label}
                  onPress={() => navigation.navigate(action.route as any)}
                  variant={action.variant}
                  size="sm"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Content */}
        <View style={styles.section}>
          <SectionHeader
            title="Recent Content"
            subtitle="Your latest sequences and meditations"
            rightAction={{
              label: 'See All',
              onPress: () => navigation.navigate('Library'),
            }}
          />
          {recentSequences.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handleRecentPress(item)}
              style={({ pressed }) => [
                styles.recentCard,
                pressed && { opacity: 0.85 },
              ]}
            >
              <View style={styles.recentCardTop}>
                <Text style={styles.recentTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.isFavorite && <Text style={styles.favoriteIcon}>*</Text>}
              </View>
              <Text style={styles.recentDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.recentMeta}>
                <SourceTypeBadge sourceType={item.sourceType} />
                <Text style={styles.recentStyle}>{item.style}</Text>
                <Text style={styles.recentDuration}>{item.durationMinutes} min</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Settings shortcut */}
        <View style={styles.settingsRow}>
          <PrimaryButton
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
            variant="ghost"
            size="sm"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  offlineBanner: {
    backgroundColor: colors.warning + '20',
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  offlineText: {
    ...typography.bodySmall,
    color: colors.warning,
    textAlign: 'center',
  },
  header: {
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  appTitle: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionItem: {
    minWidth: '45%',
    flexGrow: 1,
  },
  recentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  recentCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  recentTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
  },
  favoriteIcon: {
    ...typography.h3,
    color: colors.accent,
    marginLeft: spacing.sm,
  },
  recentDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  recentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  recentStyle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  recentDuration: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  settingsRow: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
});

export default HomeScreen;
