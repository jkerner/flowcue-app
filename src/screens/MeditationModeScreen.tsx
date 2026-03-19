import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { TimerPill } from '../components/TimerPill';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing, typography } from '../theme';
import { useLiveSession } from '../hooks/useLiveSession';
import type { MeditationChunk } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'MeditationMode'>;

// Grounding meditation chunks
const mockChunks: MeditationChunk[] = [
  {
    text: 'Allow your body to settle into the mat. Let the ground hold all of your weight. There is nothing to do and nowhere to be.',
    pauseSeconds: 5,
    pacingNote: 'Slow, quiet voice',
  },
  {
    text: 'Bring your awareness to the soles of your feet. Notice any sensation there — warmth, tingling, pressure. Simply observe.',
    pauseSeconds: 4,
  },
  {
    text: 'Let that awareness drift up through your ankles, into your calves. If there is any tension, breathe into it. Let it soften.',
    pauseSeconds: 4,
  },
  {
    text: 'Feel the weight of your legs on the mat. Your thighs, your hips. Let everything release toward the earth.',
    pauseSeconds: 5,
  },
  {
    text: 'Notice your belly rising and falling with each breath. No need to change the breath. Just watch it, like waves on a shore.',
    pauseSeconds: 6,
    pacingNote: 'Extra pause here',
  },
  {
    text: 'Soften across your chest and ribcage. Release the shoulders away from the ears. Let the arms feel heavy.',
    pauseSeconds: 4,
  },
  {
    text: 'Relax the muscles of your face. Your jaw, your brow, the tiny muscles around your eyes. Everything softens.',
    pauseSeconds: 5,
  },
  {
    text: 'Rest here in stillness. You are complete, exactly as you are in this moment. There is nothing to fix.',
    pauseSeconds: 10,
    pacingNote: 'Long, comfortable silence',
  },
];

const mockAltLines = [
  'You might also say: "Let the earth rise up to meet you."',
  'Alternative: "Your body knows how to rest. Trust it."',
];

export const MeditationModeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();

  const {
    currentCueIndex: currentChunkIndex,
    elapsedSeconds,
    isPlaying,
    autoAdvance,
    startSession,
    endSession,
    nextCue: nextChunk,
    previousCue: previousChunk,
    toggleAutoAdvance,
  } = useLiveSession({ totalCues: mockChunks.length });

  const [pauseCountdown, setPauseCountdown] = useState<number | null>(null);

  // Start session on mount
  useEffect(() => {
    startSession();
  }, [startSession]);

  // Pause countdown between chunks when auto-advance is on
  useEffect(() => {
    if (!autoAdvance || !isPlaying) return;
    const chunk = mockChunks[currentChunkIndex];
    if (!chunk.pauseSeconds) return;

    setPauseCountdown(chunk.pauseSeconds);
    const interval = setInterval(() => {
      setPauseCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          nextChunk();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentChunkIndex, autoAdvance, isPlaying, nextChunk]);

  const currentChunk = mockChunks[currentChunkIndex];
  const prevChunk =
    currentChunkIndex > 0 ? mockChunks[currentChunkIndex - 1] : null;
  const nextChunkItem =
    currentChunkIndex < mockChunks.length - 1
      ? mockChunks[currentChunkIndex + 1]
      : null;

  const handleEnd = () => {
    endSession();
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.liveBackground} />
      <SafeAreaView style={styles.safeArea}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Pressable onPress={handleEnd}>
            <Text style={styles.endButton}>End</Text>
          </Pressable>

          <Text style={styles.title}>Meditation</Text>

          <Pressable onPress={toggleAutoAdvance}>
            <Text
              style={[
                styles.autoScroll,
                autoAdvance && styles.autoScrollActive,
              ]}
            >
              Auto
            </Text>
          </Pressable>
        </View>

        {/* Chunk Display */}
        <View style={styles.chunkArea}>
          {/* Previous chunk */}
          <View style={styles.prevContainer}>
            {prevChunk && (
              <Text style={styles.prevText} numberOfLines={3}>
                {prevChunk.text}
              </Text>
            )}
          </View>

          {/* Current chunk */}
          <View style={styles.currentContainer}>
            <Text style={styles.currentText}>{currentChunk.text}</Text>
            {currentChunk.pacingNote && (
              <Text style={styles.pacingNote}>{currentChunk.pacingNote}</Text>
            )}
            {pauseCountdown !== null && (
              <View style={styles.pauseBadge}>
                <Text style={styles.pauseText}>
                  Pause: {pauseCountdown}s
                </Text>
              </View>
            )}
          </View>

          {/* Next chunk */}
          <View style={styles.nextContainer}>
            {nextChunkItem && (
              <Text style={styles.nextText} numberOfLines={3}>
                {nextChunkItem.text}
              </Text>
            )}
          </View>
        </View>

        {/* AI Alternate Lines */}
        <View style={styles.altSection}>
          <Text style={styles.altTitle}>AI Alternatives</Text>
          {mockAltLines.map((line, i) => (
            <Text key={i} style={styles.altLine}>
              {line}
            </Text>
          ))}
        </View>

        {/* Progress */}
        <Text style={styles.progress}>
          {currentChunkIndex + 1} / {mockChunks.length}
        </Text>

        {/* Bottom Controls */}
        <View style={styles.bottomBar}>
          <Pressable
            style={[
              styles.navButton,
              currentChunkIndex === 0 && styles.navButtonDisabled,
            ]}
            onPress={previousChunk}
            disabled={currentChunkIndex === 0}
          >
            <Text style={styles.navButtonText}>Prev</Text>
          </Pressable>

          <TimerPill seconds={elapsedSeconds} isRunning={isPlaying} />

          <Pressable
            style={[
              styles.navButton,
              currentChunkIndex === mockChunks.length - 1 &&
                styles.navButtonDisabled,
            ]}
            onPress={nextChunk}
            disabled={currentChunkIndex === mockChunks.length - 1}
          >
            <Text style={styles.navButtonText}>Next</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.liveBackground,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.sm,
  },
  endButton: {
    ...typography.label,
    color: colors.error,
  },
  title: {
    ...typography.label,
    color: colors.liveCueNext,
  },
  autoScroll: {
    ...typography.caption,
    color: colors.liveCuePrev,
    backgroundColor: '#ffffff10',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  autoScrollActive: {
    color: colors.liveAccent,
    backgroundColor: colors.liveAccent + '25',
  },

  // Chunk display
  chunkArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  prevContainer: {
    minHeight: 50,
    marginBottom: spacing.xl,
    opacity: 0.4,
  },
  prevText: {
    ...typography.livePreview,
    color: colors.liveCuePrev,
  },
  currentContainer: {
    marginBottom: spacing.xl,
  },
  currentText: {
    ...typography.liveCue,
    color: colors.liveCueText,
    lineHeight: 46,
  },
  pacingNote: {
    ...typography.bodySmall,
    color: colors.liveAccent,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  pauseBadge: {
    marginTop: spacing.md,
    backgroundColor: colors.accent + '30',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  pauseText: {
    ...typography.label,
    color: colors.accent,
  },
  nextContainer: {
    minHeight: 50,
    opacity: 0.6,
  },
  nextText: {
    ...typography.livePreview,
    color: colors.liveCueNext,
  },

  // AI Alternates
  altSection: {
    marginHorizontal: spacing.screenPadding,
    backgroundColor: '#ffffff08',
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  altTitle: {
    ...typography.caption,
    color: colors.liveAccent,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  altLine: {
    ...typography.bodySmall,
    color: colors.liveCueNext,
    marginBottom: spacing.xs,
  },

  progress: {
    ...typography.caption,
    color: colors.liveCuePrev,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  // Bottom controls
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.md,
  },
  navButton: {
    backgroundColor: colors.liveAccent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
});

export default MeditationModeScreen;
