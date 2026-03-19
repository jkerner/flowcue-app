import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SourceType } from '../types/domain';
import { colors, typography, spacing } from '../theme';

interface SourceTypeBadgeProps {
  sourceType: SourceType;
}

const badgeColors: Record<SourceType, string> = {
  template: colors.templateBadge,
  user_owned: colors.userOwnedBadge,
  duplicated: colors.duplicatedBadge,
  ai_generated: colors.aiGeneratedBadge,
};

const badgeLabels: Record<SourceType, string> = {
  template: 'Template',
  user_owned: 'My Content',
  duplicated: 'Duplicated',
  ai_generated: 'AI Generated',
};

export const SourceTypeBadge: React.FC<SourceTypeBadgeProps> = ({
  sourceType,
}) => {
  const bg = badgeColors[sourceType];

  return (
    <View style={[styles.badge, { backgroundColor: bg + '22' }]}>
      <View style={[styles.dot, { backgroundColor: bg }]} />
      <Text style={[styles.label, { color: bg }]}>
        {badgeLabels[sourceType]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs + 1,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 14,
  },
});

export default SourceTypeBadge;
