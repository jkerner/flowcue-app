import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MeditationChunk } from '../types/domain';
import { colors, spacing, typography } from '../theme';

interface ScriptChunkCardProps {
  chunk: MeditationChunk;
  index: number;
  isActive?: boolean;
  isDelivered?: boolean;
}

export const ScriptChunkCard: React.FC<ScriptChunkCardProps> = ({
  chunk,
  index,
  isActive = false,
  isDelivered = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        isActive && styles.active,
        isDelivered && styles.delivered,
      ]}
    >
      <View style={styles.indexColumn}>
        <View
          style={[
            styles.indexBadge,
            isActive && styles.indexBadgeActive,
          ]}
        >
          <Text
            style={[
              styles.indexText,
              isActive && styles.indexTextActive,
            ]}
          >
            {index + 1}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.text,
            isActive && styles.activeText,
            isDelivered && styles.deliveredText,
          ]}
        >
          {chunk.text}
        </Text>

        {chunk.pauseSeconds != null && chunk.pauseSeconds > 0 && (
          <View style={styles.pauseRow}>
            <View style={styles.pauseDot} />
            <Text style={styles.pauseText}>
              Pause {chunk.pauseSeconds}s
            </Text>
          </View>
        )}

        {chunk.pacingNote ? (
          <Text style={styles.pacingNote}>{chunk.pacingNote}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  active: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primaryLight + '18',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  delivered: {
    opacity: 0.5,
  },
  indexColumn: {
    marginRight: spacing.md,
    paddingTop: 2,
  },
  indexBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexBadgeActive: {
    backgroundColor: colors.primary,
  },
  indexText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
  },
  indexTextActive: {
    color: colors.textInverse,
  },
  content: {
    flex: 1,
  },
  text: {
    ...typography.livePreview,
    color: colors.textPrimary,
    lineHeight: 30,
  },
  activeText: {
    ...typography.liveCue,
    color: colors.primaryDark,
    fontSize: 24,
    lineHeight: 34,
  },
  deliveredText: {
    color: colors.textTertiary,
  },
  pauseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    backgroundColor: colors.accentLight + '40',
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  pauseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing.xs + 2,
  },
  pauseText: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '600',
  },
  pacingNote: {
    ...typography.caption,
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginTop: spacing.xs + 2,
  },
});

export default ScriptChunkCard;
