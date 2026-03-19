import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { TimerPill } from '../components/TimerPill';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing, typography } from '../theme';
import { useLiveSession } from '../hooks/useLiveSession';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import type { Cue, SequenceSection, AISuggestion, SuggestionKind } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'LiveTeach'>;

const now = Date.now();

// Mock cues for a demo live teach session
const mockCues: Cue[] = [
  { id: 'lc1', sequenceId: 'seq-1', section: 'integration', orderIndex: 0, poseName: 'Seated Center', cueText: 'Find a comfortable seat. Close your eyes. Begin to notice the rhythm of your breath.', breathCount: 5, cueType: 'breath', createdAt: now, updatedAt: now },
  { id: 'lc2', sequenceId: 'seq-1', section: 'integration', orderIndex: 1, poseName: 'Intention Setting', cueText: 'Set an intention for your practice. Something you want to cultivate or release.', cueType: 'meditation', createdAt: now, updatedAt: now },
  { id: 'lc3', sequenceId: 'seq-1', section: 'warm_up', orderIndex: 0, poseName: 'Cat-Cow', cueText: 'Come to tabletop. Inhale, drop the belly, lift the chest. Exhale, round the spine, tuck the chin.', breathCount: 5, cueType: 'breath', createdAt: now, updatedAt: now },
  { id: 'lc4', sequenceId: 'seq-1', section: 'warm_up', orderIndex: 1, poseName: 'Downward Dog', cueText: 'Tuck toes, lift hips high and back. Pedal out the feet. Find length through the spine.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'lc5', sequenceId: 'seq-1', section: 'sun_a', orderIndex: 0, poseName: 'Tadasana', cueText: 'Walk to the top of your mat. Stand tall. Root through all four corners of the feet.', breathCount: 3, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'lc6', sequenceId: 'seq-1', section: 'sun_a', orderIndex: 1, poseName: 'Sun Sal Flow', cueText: 'Inhale arms up. Exhale fold. Inhale halfway lift. Exhale step or float back, lower down.', cueType: 'transition', createdAt: now, updatedAt: now },
  { id: 'lc7', sequenceId: 'seq-1', section: 'standing', orderIndex: 0, poseName: 'Warrior II', cueText: 'Right foot forward. Open to Warrior II. Arms extend, gaze past the right fingertips. Sink into the front knee.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'lc8', sequenceId: 'seq-1', section: 'standing', orderIndex: 1, poseName: 'Extended Side Angle', cueText: 'Right forearm to thigh. Left arm sweeps overhead. Create one long line of energy from left foot to left fingertips.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'lc9', sequenceId: 'seq-1', section: 'balance', orderIndex: 0, poseName: 'Tree Pose', cueText: 'Shift weight to left foot. Right foot to inner calf or thigh. Find your gaze point. Hands at heart or overhead.', breathCount: 5, cueType: 'alignment', notes: 'Offer options', createdAt: now, updatedAt: now },
  { id: 'lc10', sequenceId: 'seq-1', section: 'cool_down', orderIndex: 0, poseName: 'Seated Fold', cueText: 'Take a seat. Extend both legs. Inhale lengthen, exhale fold forward. Let gravity do the work.', breathCount: 8, cueType: 'alignment', createdAt: now, updatedAt: now },
];

const sectionLabels: Record<SequenceSection, string> = {
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

const mockSuggestions: {
  text: string;
  kind: SuggestionKind;
  confidence: number;
}[] = [
  {
    text: 'Try Extended Side Angle next for a deeper hip opener.',
    kind: 'next_cue',
    confidence: 0.85,
  },
  {
    text: 'Consider adding a breath cue here — students may need a moment.',
    kind: 'transition',
    confidence: 0.72,
  },
  {
    text: 'This is a good moment for a grounding reminder.',
    kind: 'grounding',
    confidence: 0.65,
  },
];

const GROUND_ME_TEXT =
  'Take a breath.\nFeel your feet on the floor.\nYou are here.\nYou are exactly where you need to be.';

export const LiveTeachScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const isOffline = useOfflineStatus();

  const {
    currentCueIndex,
    elapsedSeconds,
    isPlaying,
    autoAdvance,
    startSession,
    endSession,
    nextCue,
    previousCue,
    toggleAutoAdvance,
  } = useLiveSession({ totalCues: mockCues.length });

  const [showGroundMe, setShowGroundMe] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Start the session on mount
  useEffect(() => {
    startSession();
  }, [startSession]);

  const currentCue = mockCues[currentCueIndex];
  const prevCue = currentCueIndex > 0 ? mockCues[currentCueIndex - 1] : null;
  const nextCueItem =
    currentCueIndex < mockCues.length - 1
      ? mockCues[currentCueIndex + 1]
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

          <Text style={styles.sectionIndicator}>
            {sectionLabels[currentCue.section]}
          </Text>

          <View style={styles.topRight}>
            {isOffline && <Text style={styles.offlineBadge}>Offline</Text>}
            <Pressable onPress={toggleAutoAdvance}>
              <Text
                style={[
                  styles.autoAdvance,
                  autoAdvance && styles.autoAdvanceActive,
                ]}
              >
                Auto
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Cue Display Area */}
        <View style={styles.cueArea}>
          {/* Previous Cue */}
          <View style={styles.prevCueContainer}>
            {prevCue && (
              <>
                {prevCue.poseName && (
                  <Text style={styles.prevPoseName}>{prevCue.poseName}</Text>
                )}
                <Text style={styles.prevCueText} numberOfLines={2}>
                  {prevCue.cueText}
                </Text>
              </>
            )}
          </View>

          {/* Current Cue */}
          <View style={styles.currentCueContainer}>
            {currentCue.poseName && (
              <Text style={styles.currentPoseName}>{currentCue.poseName}</Text>
            )}
            <Text style={styles.currentCueText}>{currentCue.cueText}</Text>
            {currentCue.breathCount ? (
              <Text style={styles.breathIndicator}>
                {currentCue.breathCount} breaths
              </Text>
            ) : null}
            {currentCue.notes ? (
              <Text style={styles.notesText}>{currentCue.notes}</Text>
            ) : null}
          </View>

          {/* Next Cue */}
          <View style={styles.nextCueContainer}>
            {nextCueItem && (
              <>
                {nextCueItem.poseName && (
                  <Text style={styles.nextPoseName}>{nextCueItem.poseName}</Text>
                )}
                <Text style={styles.nextCueText} numberOfLines={2}>
                  {nextCueItem.cueText}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Progress indicator */}
        <Text style={styles.progress}>
          {currentCueIndex + 1} / {mockCues.length}
        </Text>

        {/* AI Suggestions Drawer */}
        {showSuggestions && (
          <View style={styles.suggestionsDrawer}>
            <Text style={styles.suggestionsTitle}>AI Suggestions</Text>
            {mockSuggestions.map((sug, i) => (
              <View key={i} style={styles.suggestionItem}>
                <View style={styles.suggestionHeader}>
                  <Text style={styles.suggestionKind}>{sug.kind}</Text>
                  <Text style={styles.suggestionConfidence}>
                    {Math.round(sug.confidence * 100)}%
                  </Text>
                </View>
                <Text style={styles.suggestionText}>{sug.text}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Controls */}
        <View style={styles.bottomBar}>
          <View style={styles.secondaryActions}>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => setShowGroundMe(true)}
            >
              <Text style={styles.secondaryButtonText}>Ground Me</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => setShowSuggestions(!showSuggestions)}
            >
              <Text style={styles.secondaryButtonText}>
                {showSuggestions ? 'Hide AI' : 'AI Tips'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() =>
                navigation.navigate('AIRecommendations', {
                  sessionId: 'session-mock',
                })
              }
            >
              <Text style={styles.secondaryButtonText}>Full AI</Text>
            </Pressable>
          </View>

          <View style={styles.mainControls}>
            <Pressable
              style={[styles.navButton, currentCueIndex === 0 && styles.navButtonDisabled]}
              onPress={previousCue}
              disabled={currentCueIndex === 0}
            >
              <Text style={styles.navButtonText}>Prev</Text>
            </Pressable>

            <TimerPill seconds={elapsedSeconds} isRunning={isPlaying} />

            <Pressable
              style={[
                styles.navButton,
                currentCueIndex === mockCues.length - 1 && styles.navButtonDisabled,
              ]}
              onPress={nextCue}
              disabled={currentCueIndex === mockCues.length - 1}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </Pressable>
          </View>
        </View>

        {/* Ground Me Modal */}
        <Modal
          visible={showGroundMe}
          transparent
          animationType="fade"
          onRequestClose={() => setShowGroundMe(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowGroundMe(false)}
          >
            <View style={styles.groundMeCard}>
              <Text style={styles.groundMeText}>{GROUND_ME_TEXT}</Text>
              <View style={styles.groundMeAction}>
                <PrimaryButton
                  title="I am here"
                  onPress={() => setShowGroundMe(false)}
                  variant="filled"
                  size="md"
                />
              </View>
            </View>
          </Pressable>
        </Modal>
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
    fontWeight: '600',
  },
  sectionIndicator: {
    ...typography.label,
    color: colors.liveCueNext,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  offlineBadge: {
    ...typography.caption,
    color: colors.warning,
    backgroundColor: colors.warning + '25',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  autoAdvance: {
    ...typography.caption,
    color: colors.liveCuePrev,
    backgroundColor: '#ffffff10',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  autoAdvanceActive: {
    color: colors.liveAccent,
    backgroundColor: colors.liveAccent + '25',
  },

  // Cue Display
  cueArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  prevCueContainer: {
    minHeight: 60,
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  prevPoseName: {
    ...typography.bodySmall,
    color: colors.liveCuePrev,
    marginBottom: 2,
  },
  prevCueText: {
    ...typography.livePreview,
    color: colors.liveCuePrev,
  },
  currentCueContainer: {
    marginBottom: spacing.lg,
  },
  currentPoseName: {
    ...typography.h2,
    color: colors.liveAccent,
    marginBottom: spacing.xs,
  },
  currentCueText: {
    ...typography.liveCue,
    color: colors.liveCueText,
  },
  breathIndicator: {
    ...typography.label,
    color: colors.liveAccent,
    marginTop: spacing.sm,
  },
  notesText: {
    ...typography.bodySmall,
    color: colors.liveCueNext,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  nextCueContainer: {
    minHeight: 60,
    opacity: 0.7,
  },
  nextPoseName: {
    ...typography.bodySmall,
    color: colors.liveCueNext,
    marginBottom: 2,
  },
  nextCueText: {
    ...typography.livePreview,
    color: colors.liveCueNext,
  },
  progress: {
    ...typography.caption,
    color: colors.liveCuePrev,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  // AI Suggestions
  suggestionsDrawer: {
    backgroundColor: '#ffffff12',
    borderRadius: 12,
    marginHorizontal: spacing.screenPadding,
    padding: spacing.md,
    marginBottom: spacing.sm,
    maxHeight: 180,
  },
  suggestionsTitle: {
    ...typography.label,
    color: colors.liveAccent,
    marginBottom: spacing.sm,
  },
  suggestionItem: {
    marginBottom: spacing.sm,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  suggestionKind: {
    ...typography.caption,
    color: colors.liveCueNext,
    textTransform: 'capitalize',
  },
  suggestionConfidence: {
    ...typography.caption,
    color: colors.liveAccent,
  },
  suggestionText: {
    ...typography.bodySmall,
    color: colors.liveCueText,
  },

  // Bottom Controls
  bottomBar: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.md,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  secondaryButton: {
    backgroundColor: '#ffffff12',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  secondaryButtonText: {
    ...typography.caption,
    color: colors.liveCueNext,
    fontWeight: '600',
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  // Ground Me Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  groundMeCard: {
    backgroundColor: colors.liveBackground,
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.liveAccent + '40',
    width: '100%',
    maxWidth: 360,
  },
  groundMeText: {
    ...typography.liveCue,
    color: colors.liveCueText,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: spacing.xl,
  },
  groundMeAction: {
    alignItems: 'center',
  },
});

export default LiveTeachScreen;
