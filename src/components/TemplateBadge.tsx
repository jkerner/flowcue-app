import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

interface TemplateBadgeProps {
  label?: string;
}

export const TemplateBadge: React.FC<TemplateBadgeProps> = ({
  label = 'Template',
}) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.templateBadge,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textInverse,
    fontSize: 11,
    lineHeight: 14,
  },
});

export default TemplateBadge;
