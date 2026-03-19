import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';
import type { MeditationCategory } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'MeditationBuilder'>;

interface ChunkData {
  id: string;
  text: string;
  pauseSeconds: string;
}

const categories: { key: MeditationCategory; label: string }[] = [
  { key: 'grounding', label: 'Grounding' },
  { key: 'savasana', label: 'Savasana' },
  { key: 'body_scan', label: 'Body Scan' },
  { key: 'breathwork', label: 'Breathwork' },
  { key: 'closing', label: 'Closing' },
  { key: 'visualization', label: 'Visualization' },
  { key: 'self_inquiry', label: 'Self Inquiry' },
];

let chunkId = 1;
const genChunkId = () => `chunk-${chunkId++}`;

export const MeditationBuilderScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const isEditing = !!route.params?.meditationId;

  const [title, setTitle] = useState(isEditing ? 'Body Scan Savasana' : '');
  const [category, setCategory] = useState<MeditationCategory>(
    isEditing ? 'body_scan' : 'grounding',
  );
  const [durationMinutes, setDurationMinutes] = useState(isEditing ? '10' : '');
  const [description, setDescription] = useState(
    isEditing ? 'A guided body scan for deep relaxation.' : '',
  );

  const [chunks, setChunks] = useState<ChunkData[]>(
    isEditing
      ? [
          {
            id: genChunkId(),
            text: 'Allow your body to settle into the mat. Let the ground hold all of your weight.',
            pauseSeconds: '5',
          },
          {
            id: genChunkId(),
            text: 'Bring your awareness to the soles of your feet. Notice any sensation there.',
            pauseSeconds: '4',
          },
        ]
      : [{ id: genChunkId(), text: '', pauseSeconds: '' }],
  );

  const addChunk = useCallback(() => {
    setChunks((prev) => [
      ...prev,
      { id: genChunkId(), text: '', pauseSeconds: '' },
    ]);
  }, []);

  const updateChunk = useCallback(
    (chunkId: string, field: 'text' | 'pauseSeconds', value: string) => {
      setChunks((prev) =>
        prev.map((c) => (c.id === chunkId ? { ...c, [field]: value } : c)),
      );
    },
    [],
  );

  const removeChunk = useCallback((chunkId: string) => {
    setChunks((prev) => prev.filter((c) => c.id !== chunkId));
  }, []);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title.');
      return;
    }
    // TODO: Persist meditation to WatermelonDB
    Alert.alert(
      'Saved',
      `Meditation "${title}" with ${chunks.length} chunk(s) saved.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SectionHeader
          title={isEditing ? 'Edit Meditation' : 'New Meditation'}
        />

        {/* Form Fields */}
        <Text style={styles.fieldLabel}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Grounding Body Scan"
          placeholderTextColor={colors.textTertiary}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.fieldLabel}>Category</Text>
        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <Pressable
              key={cat.key}
              onPress={() => setCategory(cat.key)}
              style={[
                styles.categoryChip,
                category === cat.key && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat.key && styles.categoryTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.fieldLabel}>Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder="10"
          placeholderTextColor={colors.textTertiary}
          value={durationMinutes}
          onChangeText={setDurationMinutes}
          keyboardType="numeric"
        />

        <Text style={styles.fieldLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Describe this meditation..."
          placeholderTextColor={colors.textTertiary}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        {/* Chunk Editor */}
        <View style={styles.chunkSection}>
          <SectionHeader
            title="Script Chunks"
            subtitle={`${chunks.length} chunk(s)`}
          />

          {chunks.map((chunk, index) => (
            <View key={chunk.id} style={styles.chunkCard}>
              <View style={styles.chunkHeader}>
                <Text style={styles.chunkNumber}>Chunk {index + 1}</Text>
                {chunks.length > 1 && (
                  <Pressable onPress={() => removeChunk(chunk.id)}>
                    <Text style={styles.removeText}>X</Text>
                  </Pressable>
                )}
              </View>

              <TextInput
                style={[styles.input, styles.chunkInput]}
                placeholder="What you say to your students..."
                placeholderTextColor={colors.textTertiary}
                value={chunk.text}
                onChangeText={(v) => updateChunk(chunk.id, 'text', v)}
                multiline
                numberOfLines={4}
              />

              <TextInput
                style={styles.input}
                placeholder="Pause after (seconds)"
                placeholderTextColor={colors.textTertiary}
                value={chunk.pauseSeconds}
                onChangeText={(v) => updateChunk(chunk.id, 'pauseSeconds', v)}
                keyboardType="numeric"
              />
            </View>
          ))}

          <PrimaryButton
            title="+ Add Chunk"
            onPress={addChunk}
            variant="outline"
            size="md"
          />
        </View>

        {/* Save */}
        <View style={styles.saveArea}>
          <PrimaryButton
            title={isEditing ? 'Save Changes' : 'Save Meditation'}
            onPress={handleSave}
            variant="filled"
            size="lg"
          />
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
    paddingBottom: spacing.xxl + 40,
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
  multilineInput: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.textInverse,
    fontWeight: '600',
  },
  chunkSection: {
    marginTop: spacing.xl,
  },
  chunkCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  chunkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  chunkNumber: {
    ...typography.label,
    color: colors.textSecondary,
  },
  removeText: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '600',
  },
  chunkInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveArea: {
    marginTop: spacing.xl,
  },
});

export default MeditationBuilderScreen;
