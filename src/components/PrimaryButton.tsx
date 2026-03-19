import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

type ButtonVariant = 'filled' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  size?: ButtonSize;
}

const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: {
      paddingVertical: spacing.xs + 2,
      paddingHorizontal: spacing.md,
    },
    text: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
  md: {
    container: {
      paddingVertical: spacing.sm + 4,
      paddingHorizontal: spacing.lg,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
    },
  },
  lg: {
    container: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
    },
    text: {
      fontSize: 18,
      lineHeight: 28,
    },
  },
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  icon,
  size = 'md',
}) => {
  const containerStyle = [
    styles.base,
    sizeStyles[size].container,
    variant === 'filled' && styles.filledContainer,
    variant === 'outline' && styles.outlineContainer,
    variant === 'ghost' && styles.ghostContainer,
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.baseText,
    sizeStyles[size].text,
    variant === 'filled' && styles.filledText,
    variant === 'outline' && styles.outlineText,
    variant === 'ghost' && styles.ghostText,
    disabled && styles.disabledText,
  ];

  const indicatorColor =
    variant === 'filled' ? colors.textInverse : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        containerStyle,
        pressed && { opacity: 0.7 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text style={textStyle}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44,
  },
  filledContainer: {
    backgroundColor: colors.primary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.45,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: spacing.sm,
  },
  baseText: {
    ...typography.button,
  },
  filledText: {
    color: colors.textInverse,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textTertiary,
  },
});

export default PrimaryButton;
