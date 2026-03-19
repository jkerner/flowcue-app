import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { Cue, CueType } from '../types/domain';

interface CueCardProps {
  cue: Cue;
  index: number;
  onPress?: (cue: Cue) => void;
  onLongPress?: (cue: Cue) => void;
  isActive?: boolean;
}

const cueTypeColors: Record<CueType, string> = {
  alignment: colors.info,
  transition: colors.accent,
  breath: colors.primary,
  meditation: colors.aiGeneratedBadge,
  modification: colors.warning,
  grounding: colors.primaryDark,
};

const cueTypeLabels: Record<CueType, string> = {
  alignment: 'Alignment',
  transition: 'Transition',
  breath: 'Breath',
  meditation: 'Meditation',
  modification: 'Modification',
  grounding: 'Grounding',
};

export const CueCard: React.FC<CueCardProps> = ({
  cue,
  index,
  onPress,
  onLongPress,
  isActive = false,
}) => {
  const dotColor = cueTypeColors[cue.cueType] ?? colors.textTertiary;

  return (
    <Pressable
      onPress={() => onPress?.(cue)}
      onLongPress={() => onLongPress?.(cue)}
      style={({ pressed }) => [
        styles.card,
        isActive && styles.activeCard,
        pressed && { opacity: 0.85 },
      ]}
      accessibilityRole="button"
    >
      <View style={styles.orderBadge}>
        <Text style={styles.orderText}>{index + 1}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.topRow}>
          {cue.poseName ? (
            <Text style={styles.poseName} numberOfLines={1}>
              {cue.poseName}
            </Text>
          ) : null}

          <View style={[styles.typeBadge, { backgroundColor: dotColor + '20' }]}>
            <View style={[styles.typeDot, { backgroundColor: dotColor }]} />
            <Text style={[styles.typeLabel, { color: dotColor }]}>
              {cueTypeLabels[cue.cueType]}
            </Text>
          </View>
        </View>

        <Text style={styles.cueText} numberOfLines={3}>
          {cue.cueText}
        </Text>

        <View style={styles.metaRow}>
          {cue.breathCount != null && cue.breathCount > 0 && (
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>
                {cue.breathCount} breath{cue.breathCount > 1 ? 's' : ''}
              </Text>
            </View>
          )}
          {cue.durationSeconds != null && cue.durationSeconds > 0 && (
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>{cue.durationSeconds}s</Text>
            </View>
          )}
        </View>

        {cue.notes ? (
          <Text style={styles.notes} numberOfLines={2}>
            {cue.notes}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  activeCard: {
    borderColor: colors.primary,
    borderWidth: 2,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  orderBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 4,
    marginTop: 2,
  },
  orderText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  body: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  poseName: {
    ...typography.label,
    color: colors.textPrimary,
    fontWeight: '700',
    flex: 1,
    marginRight: spacing.sm,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  typeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  typeLabel: {
    ...typography.caption,
    fontWeight: '500',
  },
  cueText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaChip: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  notes: {
    ...typography.caption,
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
});

export default CueCard;
