import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Cue, SequenceSection as SectionType } from '../types/domain';
import { CueCard } from './CueCard';
import { colors, spacing, typography } from '../theme';

interface SequenceSectionProps {
  section: SectionType;
  cues: Cue[];
  onCuePress?: (cue: Cue) => void;
  onAddCue?: (section: SectionType) => void;
}

const sectionLabels: Record<SectionType, string> = {
  integration: 'Integration',
  warm_up: 'Warm-Up',
  sun_a: 'Sun Salutation A',
  sun_b: 'Sun Salutation B',
  standing: 'Standing',
  balance: 'Balance',
  peak: 'Peak',
  prone: 'Prone',
  seated: 'Seated',
  hip_openers: 'Hip Openers',
  cool_down: 'Cool Down',
  savasana: 'Savasana',
  pranayama: 'Pranayama',
  meditation: 'Meditation',
};

const sectionIcons: Record<SectionType, string> = {
  integration: '\u2728',
  warm_up: '\uD83D\uDD25',
  sun_a: '\u2600\uFE0F',
  sun_b: '\uD83C\uDF1E',
  standing: '\uD83E\uDDCD',
  balance: '\u2696\uFE0F',
  peak: '\u26F0\uFE0F',
  prone: '\uD83D\uDCA4',
  seated: '\uD83E\uDDD8',
  hip_openers: '\uD83E\uDDB5',
  cool_down: '\u2744\uFE0F',
  savasana: '\uD83C\uDF19',
  pranayama: '\uD83C\uDF2C\uFE0F',
  meditation: '\uD83E\uDDD8\u200D\u2640\uFE0F',
};

export const SequenceSection: React.FC<SequenceSectionProps> = ({
  section,
  cues,
  onCuePress,
  onAddCue,
}) => {
  const label = sectionLabels[section] || section;
  const icon = sectionIcons[section] || '\u25CF';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{label}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{cues.length}</Text>
        </View>
      </View>

      <View style={styles.cueList}>
        {cues.map((cue, index) => (
          <CueCard
            key={cue.id}
            cue={cue}
            index={index}
            onPress={onCuePress}
          />
        ))}
      </View>

      {onAddCue && (
        <Pressable
          onPress={() => onAddCue(section)}
          style={({ pressed }) => [
            styles.addButton,
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Add cue to ${label}`}
        >
          <Text style={styles.addIcon}>+</Text>
          <Text style={styles.addLabel}>Add Cue</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm + 4,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  icon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
  },
  countBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  cueList: {
    marginTop: spacing.xs,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    marginTop: spacing.xs,
  },
  addIcon: {
    fontSize: 18,
    color: colors.primary,
    marginRight: spacing.xs,
    fontWeight: '600',
  },
  addLabel: {
    ...typography.label,
    color: colors.primary,
  },
});

export default SequenceSection;
