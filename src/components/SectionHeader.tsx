import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: { label: string; onPress: () => void };
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightAction ? (
        <Pressable
          onPress={rightAction.onPress}
          hitSlop={8}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <Text style={styles.action}>{rightAction.label}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm + 4,
    marginBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  left: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  action: {
    ...typography.label,
    color: colors.primary,
  },
});

export default SectionHeader;
