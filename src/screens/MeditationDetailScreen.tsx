import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { SourceTypeBadge } from '../components/SourceTypeBadge';
import { ScriptChunkCard } from '../components/ScriptChunkCard';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';
import type { MeditationScript, MeditationChunk } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'MeditationDetail'>;

const mockMeditation: MeditationScript = {
  id: 'med-1',
  title: 'Body Scan Savasana',
  category: 'body_scan',
  durationMinutes: 10,
  sourceType: 'user_owned',
  scriptText:
    'A guided body scan meditation designed for deep relaxation at the end of class. Progressively relax each part of the body from toes to crown.',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

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

const categoryLabels: Record<string, string> = {
  grounding: 'Grounding',
  savasana: 'Savasana',
  body_scan: 'Body Scan',
  breathwork: 'Breathwork',
  closing: 'Closing',
  visualization: 'Visualization',
  self_inquiry: 'Self Inquiry',
};

export const MeditationDetailScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { meditationId } = route.params;

  // TODO: Fetch real meditation by meditationId from repository
  const meditation = mockMeditation;
  const chunks = mockChunks;

  const [isFavorite, setIsFavorite] = useState(false);
  const isTemplate = meditation.sourceType === 'template';

  const handleDuplicate = () => {
    // TODO: Duplicate to user library
    Alert.alert('Duplicated', `"${meditation.title}" added to your library.`);
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
            <Text style={styles.title}>{meditation.title}</Text>
            <Pressable onPress={() => setIsFavorite(!isFavorite)}>
              <Text style={[styles.favorite, isFavorite && styles.favoriteActive]}>
                {isFavorite ? '[*]' : '[ ]'}
              </Text>
            </Pressable>
          </View>
          <View style={styles.badges}>
            <SourceTypeBadge sourceType={meditation.sourceType} />
            <Text style={styles.categoryBadge}>
              {categoryLabels[meditation.category] || meditation.category}
            </Text>
            <Text style={styles.duration}>{meditation.durationMinutes} min</Text>
          </View>
          <Text style={styles.description}>{meditation.scriptText}</Text>
        </View>

        {/* Actions */}
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
                title="Start Meditation Mode"
                onPress={() =>
                  navigation.navigate('MeditationMode', {
                    meditationId: meditation.id,
                  })
                }
                variant="filled"
                size="lg"
              />
              <View style={styles.actionRow}>
                <View style={styles.actionHalf}>
                  <PrimaryButton
                    title="Edit"
                    onPress={() =>
                      navigation.navigate('MeditationBuilder', {
                        meditationId: meditation.id,
                      })
                    }
                    variant="outline"
                    size="md"
                  />
                </View>
                <View style={styles.actionHalf}>
                  <PrimaryButton
                    title="AI Refine"
                    onPress={() => navigation.navigate('AIDrafting')}
                    variant="outline"
                    size="md"
                  />
                </View>
              </View>
            </>
          )}
        </View>

        {/* Script Preview */}
        <View style={styles.scriptSection}>
          <SectionHeader
            title="Script Preview"
            subtitle={`${chunks.length} chunks`}
          />
          {chunks.map((chunk, index) => (
            <ScriptChunkCard
              key={`chunk-${index}`}
              chunk={chunk}
              index={index}
              isActive={false}
              isDelivered={false}
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
  categoryBadge: {
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
  scriptSection: {
    marginTop: spacing.sm,
  },
});

export default MeditationDetailScreen;
