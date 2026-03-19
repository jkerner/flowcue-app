import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { SourceTypeBadge } from '../components/SourceTypeBadge';
import { SequenceSection } from '../components/SequenceSection';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';
import type { Sequence, Cue, SequenceSection as SectionType } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'SequenceDetail'>;

// Mock full sequence with cues across sections
const mockSequence: Sequence = {
  id: 'seq-1',
  title: 'Grounding Vinyasa Flow',
  style: 'Vinyasa',
  durationMinutes: 60,
  description:
    'A full 60-minute grounding vinyasa flow emphasizing connection to breath, rooted standing postures, and a calming cool-down. Designed for mixed-level classes.',
  sourceType: 'user_owned',
  isFavorite: true,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const now = Date.now();

const mockCues: Cue[] = [
  // Integration
  { id: 'c1', sequenceId: 'seq-1', section: 'integration', orderIndex: 0, poseName: 'Seated Center', cueText: 'Find a comfortable seat. Close your eyes and begin to notice your breath.', breathCount: 5, cueType: 'breath', createdAt: now, updatedAt: now },
  { id: 'c2', sequenceId: 'seq-1', section: 'integration', orderIndex: 1, poseName: 'Intention Setting', cueText: 'Set an intention for your practice. Something you want to cultivate today.', cueType: 'meditation', createdAt: now, updatedAt: now },
  { id: 'c3', sequenceId: 'seq-1', section: 'integration', orderIndex: 2, poseName: 'Seated Side Bend', cueText: 'Right hand down, left arm reaches up and over. Breathe into the left side body.', breathCount: 3, cueType: 'alignment', createdAt: now, updatedAt: now },

  // Warm Up
  { id: 'c4', sequenceId: 'seq-1', section: 'warm_up', orderIndex: 0, poseName: 'Cat-Cow', cueText: 'Tabletop position. Inhale to arch, exhale to round. Move with your breath.', breathCount: 5, cueType: 'breath', createdAt: now, updatedAt: now },
  { id: 'c5', sequenceId: 'seq-1', section: 'warm_up', orderIndex: 1, poseName: 'Downward Dog', cueText: 'Tuck toes, lift hips high. Pedal out the feet. Find length through the spine.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'c6', sequenceId: 'seq-1', section: 'warm_up', orderIndex: 2, poseName: 'Ragdoll', cueText: 'Walk hands to feet. Grab opposite elbows. Sway gently side to side.', breathCount: 3, cueType: 'alignment', createdAt: now, updatedAt: now },

  // Sun A
  { id: 'c7', sequenceId: 'seq-1', section: 'sun_a', orderIndex: 0, poseName: 'Tadasana', cueText: 'Stand tall. Ground through all four corners of your feet. Palms face forward.', breathCount: 2, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'c8', sequenceId: 'seq-1', section: 'sun_a', orderIndex: 1, poseName: 'Urdhva Hastasana', cueText: 'Inhale, sweep arms overhead. Gaze up between your palms.', cueType: 'transition', createdAt: now, updatedAt: now },
  { id: 'c9', sequenceId: 'seq-1', section: 'sun_a', orderIndex: 2, poseName: 'Uttanasana', cueText: 'Exhale, hinge at the hips and fold forward. Relax the head and neck.', cueType: 'transition', createdAt: now, updatedAt: now },
  { id: 'c10', sequenceId: 'seq-1', section: 'sun_a', orderIndex: 3, poseName: 'Chaturanga', cueText: 'Exhale, shift forward and lower halfway. Elbows hug in, hover above the mat.', cueType: 'alignment', createdAt: now, updatedAt: now },

  // Standing
  { id: 'c11', sequenceId: 'seq-1', section: 'standing', orderIndex: 0, poseName: 'Warrior II', cueText: 'Right foot forward. Open hips to the side. Arms extend. Gaze past right fingertips.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'c12', sequenceId: 'seq-1', section: 'standing', orderIndex: 1, poseName: 'Extended Side Angle', cueText: 'Right forearm to thigh or hand to floor. Left arm reaches long overhead.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'c13', sequenceId: 'seq-1', section: 'standing', orderIndex: 2, poseName: 'Triangle', cueText: 'Straighten front leg. Reach forward, then tilt. Open the chest to the sky.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },

  // Balance
  { id: 'c14', sequenceId: 'seq-1', section: 'balance', orderIndex: 0, poseName: 'Tree Pose', cueText: 'Root into the left foot. Right foot to calf or inner thigh — never the knee. Find your drishti.', breathCount: 5, cueType: 'alignment', notes: 'Offer options: foot to ankle, calf, or thigh', createdAt: now, updatedAt: now },

  // Cool Down
  { id: 'c15', sequenceId: 'seq-1', section: 'cool_down', orderIndex: 0, poseName: 'Seated Forward Fold', cueText: 'Extend both legs. Inhale to lengthen, exhale to fold. No need to touch your toes.', breathCount: 8, cueType: 'alignment', createdAt: now, updatedAt: now },
  { id: 'c16', sequenceId: 'seq-1', section: 'cool_down', orderIndex: 1, poseName: 'Supine Twist', cueText: 'Hug right knee in. Guide it across the body. Open right arm wide. Breathe into the twist.', breathCount: 5, cueType: 'alignment', createdAt: now, updatedAt: now },

  // Savasana
  { id: 'c17', sequenceId: 'seq-1', section: 'savasana', orderIndex: 0, poseName: 'Savasana', cueText: 'Extend both legs, arms alongside the body, palms face up. Let go of any effort.', breathCount: 0, durationSeconds: 300, cueType: 'meditation', createdAt: now, updatedAt: now },
  { id: 'c18', sequenceId: 'seq-1', section: 'savasana', orderIndex: 1, cueText: 'Begin to deepen the breath. Wiggle fingers and toes. When you are ready, roll to one side.', cueType: 'grounding', createdAt: now, updatedAt: now },
];

// Group cues by section
function groupCuesBySection(cues: Cue[]): { section: SectionType; cues: Cue[] }[] {
  const map = new Map<SectionType, Cue[]>();
  for (const cue of cues) {
    if (!map.has(cue.section)) {
      map.set(cue.section, []);
    }
    map.get(cue.section)!.push(cue);
  }
  return Array.from(map.entries()).map(([section, sectionCues]) => ({
    section,
    cues: sectionCues.sort((a, b) => a.orderIndex - b.orderIndex),
  }));
}

export const SequenceDetailScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { sequenceId } = route.params;

  // TODO: Fetch real sequence and cues by sequenceId from repository
  const sequence = mockSequence;
  const cues = mockCues;

  const [isFavorite, setIsFavorite] = useState(sequence.isFavorite);
  const sections = groupCuesBySection(cues);
  const isTemplate = sequence.sourceType === 'template';

  const handleDuplicate = () => {
    // TODO: Duplicate template to user library
    Alert.alert('Duplicated', `"${sequence.title}" has been added to your library.`);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{sequence.title}</Text>
            <Pressable onPress={() => setIsFavorite(!isFavorite)}>
              <Text style={[styles.favorite, isFavorite && styles.favoriteActive]}>
                {isFavorite ? '[*]' : '[ ]'}
              </Text>
            </Pressable>
          </View>
          <View style={styles.badges}>
            <SourceTypeBadge sourceType={sequence.sourceType} />
            <Text style={styles.styleBadge}>{sequence.style}</Text>
            <Text style={styles.duration}>{sequence.durationMinutes} min</Text>
          </View>
          <Text style={styles.description}>{sequence.description}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {isTemplate ? (
            <PrimaryButton
              title="Duplicate to My Library"
              onPress={handleDuplicate}
              variant="filled"
              size="lg"
            />
          ) : (
            <>
              <PrimaryButton
                title="Start Live Teach"
                onPress={() =>
                  navigation.navigate('LiveTeach', { sequenceId: sequence.id })
                }
                variant="filled"
                size="lg"
              />
              <View style={styles.actionRow}>
                <View style={styles.actionHalf}>
                  <PrimaryButton
                    title="Edit"
                    onPress={() =>
                      navigation.navigate('SequenceBuilder', {
                        sequenceId: sequence.id,
                      })
                    }
                    variant="outline"
                    size="md"
                  />
                </View>
                <View style={styles.actionHalf}>
                  <PrimaryButton
                    title="AI Improve"
                    onPress={() =>
                      navigation.navigate('AIDrafting')
                    }
                    variant="outline"
                    size="md"
                  />
                </View>
              </View>
            </>
          )}
        </View>

        {/* Sections with Cues */}
        <View style={styles.sectionsContainer}>
          <SectionHeader
            title="Sequence"
            subtitle={`${cues.length} cues across ${sections.length} sections`}
          />
          {sections.map((group) => (
            <SequenceSection
              key={group.section}
              section={group.section}
              cues={group.cues}
            />
          ))}
        </View>
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
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.md,
  },
  favorite: {
    ...typography.h2,
    color: colors.textTertiary,
    marginTop: 4,
  },
  favoriteActive: {
    color: colors.accent,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  styleBadge: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  duration: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  actions: {
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionHalf: {
    flex: 1,
  },
  sectionsContainer: {
    marginTop: spacing.sm,
  },
});

export default SequenceDetailScreen;
