import { Animated } from 'react-native';

export default {
  Value: Animated.Value,
  event: Animated.event,
  add: Animated.add,
  eq: () => false,
  set: () => {},
  cond: () => {},
  interpolate: () => {},
  View: Animated.View,
  ScrollView: Animated.ScrollView,
};

export const useSharedValue = (init: number) => ({ value: init });
export const useAnimatedStyle = (fn: () => any) => fn();
export const withTiming = (value: number) => value;
export const withSpring = (value: number) => value;
export const withRepeat = (value: number) => value;
export const withSequence = (...args: number[]) => args[0];
export const Easing = { linear: (x: number) => x, ease: (x: number) => x };
