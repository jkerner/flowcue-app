import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SectionHeader } from '../components/SectionHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing, typography } from '../theme';

export const SettingsScreen: React.FC = () => {
  const handleResetDemoData = () => {
    Alert.alert(
      'Reset Demo Data',
      'This would reset all local content to the default demo state.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Audio Configuration */}
        <SectionHeader title="Audio Configuration" />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Agora Audio</Text>
          <Text style={styles.cardBody}>
            Agora audio is not configured. To enable live audio streaming,
            provide your Agora App ID in a future update.
          </Text>
          <View style={styles.placeholderInput}>
            <Text style={styles.placeholderText}>App ID (not configured)</Text>
          </View>
        </View>

        {/* AI Provider */}
        <SectionHeader title="AI Provider" />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Provider</Text>
          <View style={styles.providerBadge}>
            <Text style={styles.providerText}>Mock AI</Text>
          </View>
          <Text style={styles.cardBody}>
            AI features currently use mock responses. Claude integration will be
            available in a future release for real-time cue suggestions and
            content generation.
          </Text>
        </View>

        {/* Offline & Storage */}
        <SectionHeader title="Offline & Storage" />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Local Storage</Text>
          <Text style={styles.cardBody}>
            All content is stored locally on your device using WatermelonDB. Your
            sequences, meditations, and session history are available offline.
          </Text>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>Cache Size</Text>
            <Text style={styles.storageValue}>2.4 MB</Text>
          </View>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>Sequences</Text>
            <Text style={styles.storageValue}>3 items</Text>
          </View>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>Meditations</Text>
            <Text style={styles.storageValue}>3 items</Text>
          </View>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>Sessions</Text>
            <Text style={styles.storageValue}>0 recorded</Text>
          </View>
        </View>

        {/* Developer */}
        <SectionHeader title="Developer" />
        <View style={styles.card}>
          <PrimaryButton
            title="Reset Demo Data"
            onPress={handleResetDemoData}
            variant="outline"
            size="md"
          />
          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>App Version</Text>
            <Text style={styles.versionValue}>0.1.0</Text>
          </View>
        </View>

        {/* About */}
        <SectionHeader title="About" />
        <View style={styles.card}>
          <Text style={styles.aboutTitle}>FlowCue</Text>
          <Text style={styles.cardBody}>
            A teaching companion for yoga instructors. FlowCue helps you build
            class sequences, guide meditations, and teach with confidence — even
            when your mind goes blank.
          </Text>
          <Text style={styles.tagline}>
            Built for yoga teachers, by a yoga teacher.
          </Text>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  cardBody: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  placeholderInput: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholderText: {
    ...typography.bodySmall,
    color: colors.textTertiary,
  },
  providerBadge: {
    backgroundColor: colors.aiGeneratedBadge + '20',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  providerText: {
    ...typography.label,
    color: colors.aiGeneratedBadge,
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  storageLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  storageValue: {
    ...typography.label,
    color: colors.textPrimary,
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  versionLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  versionValue: {
    ...typography.label,
    color: colors.textTertiary,
  },
  aboutTitle: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.primary,
    fontStyle: 'italic',
  },
});

export default SettingsScreen;
