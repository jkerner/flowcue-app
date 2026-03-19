import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';
import type { Cue, MeditationChunk, SequenceSection } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Mode = 'sequence' | 'meditation';

const styleOptions = ['Vinyasa', 'Gentle', 'Restorative', 'Power'];
const toneOptions = ['Calm', 'Energetic', 'Grounding'];
const levelOptions = ['Beginner', 'Mixed', 'Advanced'];

const seedPrompts = [
  '45-min grounding vinyasa',
  '5-min closing meditation',
  'Restorative opening with breath',
];

// Mock generated sequence result
const mockGeneratedCues: { section: SequenceSection; cues: { poseName: string; cueText: string }[] }[] = [
  {
    section: 'warm_up',
    cues: [
      { poseName: 'Seated Breath', cueText: 'Find a comfortable seat. Close your eyes and breathe deeply for 5 rounds.' },
      { poseName: 'Cat-Cow', cueText: 'Come to all fours. Inhale arch, exhale round. 5 breaths.' },
    ],
  },
  {
    section: 'sun_a',
    cues: [
      { poseName: 'Sun Salutation A', cueText: 'Inhale arms up, exhale fold forward. Halfway lift, step back, lower down. Upward dog, downward dog.' },
    ],
  },
  {
    section: 'standing',
    cues: [
      { poseName: 'Warrior I', cueText: 'Step right foot forward. Square hips. Arms reach overhead. Sink into the front knee.' },
      { poseName: 'Warrior II', cueText: 'Open hips to the side. Arms extend long. Gaze past the front hand.' },
      { poseName: 'Triangle', cueText: 'Straighten front leg. Reach forward then tilt. Bottom hand to shin, top arm to sky.' },
    ],
  },
  {
    section: 'cool_down',
    cues: [
      { poseName: 'Seated Twist', cueText: 'Take a comfortable seat. Twist gently to each side, 5 breaths per side.' },
      { poseName: 'Savasana', cueText: 'Lie down. Close your eyes. Release everything. Rest for 5 minutes.' },
    ],
  },
];

const mockGeneratedChunks: MeditationChunk[] = [
  { text: 'Close your eyes and bring your awareness inward. Let the outside world fade away.', pauseSeconds: 4 },
  { text: 'Feel the ground beneath you. You are supported. You are safe.', pauseSeconds: 5 },
  { text: 'With each exhale, let go of something you no longer need. With each inhale, welcome stillness.', pauseSeconds: 6 },
  { text: 'Scan your body from head to toe. Wherever you find tension, breathe warmth into that space.', pauseSeconds: 5 },
  { text: 'Rest in this quiet. There is nothing to achieve. Just be.', pauseSeconds: 8 },
];

export const AIDraftingScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const [mode, setMode] = useState<Mode>('sequence');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Vinyasa');
  const [selectedTone, setSelectedTone] = useState('Grounding');
  const [selectedLevel, setSelectedLevel] = useState('Mixed');
  const [duration, setDuration] = useState('60');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) {
      Alert.alert('Prompt needed', 'Please describe what you want to generate.');
      return;
    }
    setIsGenerating(true);
    setHasResult(false);

    // TODO: Replace with real AI generation call
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 1200);
  }, [prompt]);

  const handleRegenerate = useCallback(() => {
    setHasResult(false);
    handleGenerate();
  }, [handleGenerate]);

  const handleSaveToLibrary = () => {
    // TODO: Persist generated content to WatermelonDB
    Alert.alert(
      'Saved',
      `Generated ${mode} has been saved to your library.`,
      [{ text: 'OK', onPress: () => navigation.navigate('Library') }],
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SectionHeader title="AI Drafting" subtitle="Let AI help you create content" />

        {/* Mode Selector */}
        <View style={styles.modeRow}>
          <Pressable
            onPress={() => { setMode('sequence'); setHasResult(false); }}
            style={[styles.modeButton, mode === 'sequence' && styles.modeButtonActive]}
          >
            <Text style={[styles.modeText, mode === 'sequence' && styles.modeTextActive]}>
              Generate Sequence
            </Text>
          </Pressable>
          <Pressable
            onPress={() => { setMode('meditation'); setHasResult(false); }}
            style={[styles.modeButton, mode === 'meditation' && styles.modeButtonActive]}
          >
            <Text style={[styles.modeText, mode === 'meditation' && styles.modeTextActive]}>
              Generate Meditation
            </Text>
          </Pressable>
        </View>

        {/* Prompt */}
        <Text style={styles.fieldLabel}>Describe what you want</Text>
        <TextInput
          style={[styles.input, styles.promptInput]}
          placeholder="Describe the class you want to create..."
          placeholderTextColor={colors.textTertiary}
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={4}
        />

        {/* Seed Prompts */}
        <View style={styles.seedRow}>
          {seedPrompts.map((sp) => (
            <Pressable
              key={sp}
              onPress={() => setPrompt(sp)}
              style={styles.seedChip}
            >
              <Text style={styles.seedText}>{sp}</Text>
            </Pressable>
          ))}
        </View>

        {/* Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.fieldLabel}>Style</Text>
          <View style={styles.optionRow}>
            {styleOptions.map((s) => (
              <Pressable
                key={s}
                onPress={() => setSelectedStyle(s)}
                style={[styles.optionChip, selectedStyle === s && styles.optionChipActive]}
              >
                <Text style={[styles.optionText, selectedStyle === s && styles.optionTextActive]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Tone</Text>
          <View style={styles.optionRow}>
            {toneOptions.map((t) => (
              <Pressable
                key={t}
                onPress={() => setSelectedTone(t)}
                style={[styles.optionChip, selectedTone === t && styles.optionChipActive]}
              >
                <Text style={[styles.optionText, selectedTone === t && styles.optionTextActive]}>
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Level</Text>
          <View style={styles.optionRow}>
            {levelOptions.map((l) => (
              <Pressable
                key={l}
                onPress={() => setSelectedLevel(l)}
                style={[styles.optionChip, selectedLevel === l && styles.optionChipActive]}
              >
                <Text style={[styles.optionText, selectedLevel === l && styles.optionTextActive]}>
                  {l}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Duration (min)</Text>
          <TextInput
            style={[styles.input, { width: 100 }]}
            placeholder="60"
            placeholderTextColor={colors.textTertiary}
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
        </View>

        {/* Generate Button */}
        <View style={styles.generateArea}>
          <PrimaryButton
            title={isGenerating ? 'Generating...' : 'Generate'}
            onPress={handleGenerate}
            variant="filled"
            size="lg"
            loading={isGenerating}
            disabled={isGenerating}
          />
        </View>

        {/* Results */}
        {hasResult && (
          <View style={styles.resultsSection}>
            <SectionHeader
              title="Generated Result"
              subtitle={mode === 'sequence' ? 'Sequence Preview' : 'Meditation Preview'}
            />

            {mode === 'sequence' ? (
              mockGeneratedCues.map((group, gi) => (
                <View key={gi} style={styles.resultSection}>
                  <Text style={styles.resultSectionTitle}>
                    {group.section.replace('_', ' ').toUpperCase()}
                  </Text>
                  {group.cues.map((cue, ci) => (
                    <View key={ci} style={styles.resultCue}>
                      <Text style={styles.resultPoseName}>{cue.poseName}</Text>
                      <Text style={styles.resultCueText}>{cue.cueText}</Text>
                    </View>
                  ))}
                </View>
              ))
            ) : (
              mockGeneratedChunks.map((chunk, i) => (
                <View key={i} style={styles.resultChunk}>
                  <Text style={styles.resultChunkNumber}>{i + 1}</Text>
                  <View style={styles.resultChunkContent}>
                    <Text style={styles.resultCueText}>{chunk.text}</Text>
                    {chunk.pauseSeconds ? (
                      <Text style={styles.resultPause}>
                        Pause {chunk.pauseSeconds}s
                      </Text>
                    ) : null}
                  </View>
                </View>
              ))
            )}

            <View style={styles.resultActions}>
              <PrimaryButton
                title="Save to Library"
                onPress={handleSaveToLibrary}
                variant="filled"
                size="lg"
              />
              <View style={styles.regenRow}>
                <PrimaryButton
                  title="Regenerate"
                  onPress={handleRegenerate}
                  variant="outline"
                  size="md"
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl + 40,
  },
  modeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  modeButton: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  modeTextActive: {
    color: colors.textInverse,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.sm,
  },
  promptInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  seedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  seedChip: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  seedText: {
    ...typography.bodySmall,
    color: colors.accent,
    fontWeight: '500',
  },
  optionsSection: {
    marginBottom: spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  optionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  optionChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  optionTextActive: {
    color: colors.textInverse,
    fontWeight: '600',
  },
  generateArea: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  resultsSection: {
    marginTop: spacing.md,
  },
  resultSection: {
    marginBottom: spacing.md,
  },
  resultSectionTitle: {
    ...typography.label,
    color: colors.primary,
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  resultCue: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  resultPoseName: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  resultCueText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  resultChunk: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  resultChunkNumber: {
    ...typography.label,
    color: colors.textTertiary,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  resultChunkContent: {
    flex: 1,
  },
  resultPause: {
    ...typography.caption,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  resultActions: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  regenRow: {
    alignItems: 'center',
  },
});

export default AIDraftingScreen;
