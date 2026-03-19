import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface TimerPillProps {
  seconds: number;
  isRunning: boolean;
}

const formatTime = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const TimerPill: React.FC<TimerPillProps> = ({ seconds, isRunning }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRunning) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      );
      animation.start();
      return () => animation.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRunning, pulseAnim]);

  return (
    <View style={[styles.pill, isRunning && styles.running]}>
      <Animated.View
        style={[
          styles.dot,
          isRunning && styles.dotRunning,
          isRunning && { opacity: pulseAnim },
        ]}
      />
      <Text style={styles.time}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  running: {
    backgroundColor: colors.primaryLight + '30',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textTertiary,
    marginRight: spacing.sm,
  },
  dotRunning: {
    backgroundColor: colors.success,
  },
  time: {
    ...typography.label,
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
});

export default TimerPill;
