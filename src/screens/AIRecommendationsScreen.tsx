import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';
import type { SuggestionKind } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'AIRecommendations'>;

interface MockSuggestion {
  id: string;
  text: string;
  kind: SuggestionKind;
  confidence: number;
  reasoning: string;
  dismissed: boolean;
}

const initialSuggestions: MockSuggestion[] = [
  {
    id: 's1',
    text: 'Try Extended Side Angle to deepen the hip opening after Warrior II.',
    kind: 'next_cue',
    confidence: 0.88,
    reasoning:
      'Your sequence has been focused on standing postures, and Extended Side Angle is a natural progression from Warrior II.',
    dismissed: false,
  },
  {
    id: 's2',
    text: 'Add a breath cue here — students may benefit from 3 breaths before transitioning.',
    kind: 'transition',
    confidence: 0.76,
    reasoning:
      'You have been moving through poses quickly. A brief pause can help students integrate.',
    dismissed: false,
  },
  {
    id: 's3',
    text: 'Remind students to ground through the standing foot before balance poses.',
    kind: 'grounding',
    confidence: 0.82,
    reasoning:
      'Balance poses are coming next and a grounding reminder helps prepare the body and mind.',
    dismissed: false,
  },
  {
    id: 's4',
    text: 'Offer a knee-down option for students who need a modification in Warrior III.',
    kind: 'modification',
    confidence: 0.71,
    reasoning:
      'For mixed-level classes, having a clear modification ensures inclusivity.',
    dismissed: false,
  },
  {
    id: 's5',
    text: 'Close with a brief body scan visualization before final rest.',
    kind: 'meditation_line',
    confidence: 0.68,
    reasoning:
      'The session has been physically demanding. A guided visualization can deepen the savasana experience.',
    dismissed: false,
  },
];

const kindColors: Record<SuggestionKind, string> = {
  next_cue: colors.primary,
  transition: colors.accent,
  grounding: colors.primaryDark,
  modification: colors.warning,
  meditation_line: colors.aiGeneratedBadge,
};

const kindLabels: Record<SuggestionKind, string> = {
  next_cue: 'Next Cue',
  transition: 'Transition',
  grounding: 'Grounding',
  modification: 'Modification',
  meditation_line: 'Meditation',
};

export const AIRecommendationsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { sessionId } = route.params;

  const [suggestions, setSuggestions] = useState<MockSuggestion[]>(initialSuggestions);

  const handleAccept = (id: string) => {
    // TODO: Apply suggestion to the live session
    Alert.alert('Accepted', 'Suggestion applied to your session.');
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEditAndSave = (id: string) => {
    // TODO: Open edit modal and save modified suggestion
    Alert.alert('Edit & Save', 'This would open an editor for the suggestion.');
  };

  const handleDismiss = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, dismissed: true } : s)),
    );
  };

  const activeSuggestions = suggestions.filter((s) => !s.dismissed);
  const dismissedSuggestions = suggestions.filter((s) => s.dismissed);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title="AI Recommendations"
          subtitle="Based on your current session"
        />

        <Text style={styles.explanation}>
          These suggestions are generated based on your current session flow,
          teaching style, and sequence structure. Accept, modify, or dismiss them
          as you see fit.
        </Text>

        {activeSuggestions.map((sug) => (
          <View key={sug.id} style={styles.card}>
            {/* Kind Badge & Confidence */}
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.kindBadge,
                  { backgroundColor: kindColors[sug.kind] + '20' },
                ]}
              >
                <Text
                  style={[styles.kindText, { color: kindColors[sug.kind] }]}
                >
                  {kindLabels[sug.kind]}
                </Text>
              </View>

              <View style={styles.confidenceContainer}>
                <View style={styles.confidenceBarBg}>
                  <View
                    style={[
                      styles.confidenceBarFill,
                      {
                        width: `${sug.confidence * 100}%`,
                        backgroundColor: kindColors[sug.kind],
                      },
                    ]}
                  />
                </View>
                <Text style={styles.confidenceText}>
                  {Math.round(sug.confidence * 100)}%
                </Text>
              </View>
            </View>

            {/* Suggestion Text */}
            <Text style={styles.suggestionText}>{sug.text}</Text>

            {/* Reasoning */}
            <Text style={styles.reasoningLabel}>Reasoning:</Text>
            <Text style={styles.reasoning}>{sug.reasoning}</Text>

            {/* Actions */}
            <View style={styles.actions}>
              <PrimaryButton
                title="Accept"
                onPress={() => handleAccept(sug.id)}
                variant="filled"
                size="sm"
              />
              <PrimaryButton
                title="Edit & Save"
                onPress={() => handleEditAndSave(sug.id)}
                variant="outline"
                size="sm"
              />
              <PrimaryButton
                title="Dismiss"
                onPress={() => handleDismiss(sug.id)}
                variant="ghost"
                size="sm"
              />
            </View>
          </View>
        ))}

        {activeSuggestions.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              All suggestions have been addressed.
            </Text>
          </View>
        )}

        {dismissedSuggestions.length > 0 && (
          <View style={styles.dismissedSection}>
            <Text style={styles.dismissedTitle}>
              Dismissed ({dismissedSuggestions.length})
            </Text>
            {dismissedSuggestions.map((sug) => (
              <View key={sug.id} style={styles.dismissedCard}>
                <Text style={styles.dismissedText}>{sug.text}</Text>
              </View>
            ))}
          </View>
        )}
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
  explanation: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  kindBadge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: 8,
  },
  kindText: {
    ...typography.caption,
    fontWeight: '600',
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  confidenceBarBg: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  confidenceBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceText: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '600',
  },
  suggestionText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  reasoningLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  reasoning: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textTertiary,
  },
  dismissedSection: {
    marginTop: spacing.lg,
  },
  dismissedTitle: {
    ...typography.label,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  dismissedCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.xs,
    opacity: 0.6,
  },
  dismissedText: {
    ...typography.bodySmall,
    color: colors.textTertiary,
  },
});

export default AIRecommendationsScreen;
