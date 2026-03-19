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
import { useForm, Controller } from 'react-hook-form';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme';
import type { CueType, SequenceSection } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'SequenceBuilder'>;

interface SequenceFormData {
  title: string;
  style: string;
  durationMinutes: string;
  description: string;
}

interface CueFormData {
  poseName: string;
  cueText: string;
  cueType: CueType;
  breathCount: string;
  durationSeconds: string;
  notes: string;
}

interface SectionData {
  id: string;
  section: SequenceSection;
  cues: (CueFormData & { id: string })[];
}

const cueTypes: CueType[] = [
  'alignment',
  'transition',
  'breath',
  'meditation',
  'modification',
  'grounding',
];

const sectionOptions: SequenceSection[] = [
  'integration',
  'warm_up',
  'sun_a',
  'sun_b',
  'standing',
  'balance',
  'peak',
  'prone',
  'seated',
  'hip_openers',
  'cool_down',
  'savasana',
  'pranayama',
  'meditation',
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

let nextId = 1;
const genId = () => `temp-${nextId++}`;

const emptyCue = (): CueFormData & { id: string } => ({
  id: genId(),
  poseName: '',
  cueText: '',
  cueType: 'alignment',
  breathCount: '',
  durationSeconds: '',
  notes: '',
});

export const SequenceBuilderScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const isEditing = !!route.params?.sequenceId;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SequenceFormData>({
    defaultValues: {
      title: isEditing ? 'Grounding Vinyasa Flow' : '',
      style: isEditing ? 'Vinyasa' : '',
      durationMinutes: isEditing ? '60' : '',
      description: isEditing ? 'A full grounding flow.' : '',
    },
  });

  const [sections, setSections] = useState<SectionData[]>(
    isEditing
      ? [
          {
            id: genId(),
            section: 'warm_up',
            cues: [
              {
                id: genId(),
                poseName: 'Cat-Cow',
                cueText: 'Inhale to arch, exhale to round.',
                cueType: 'breath',
                breathCount: '5',
                durationSeconds: '',
                notes: '',
              },
            ],
          },
        ]
      : [],
  );

  const [sectionPickerOpen, setSectionPickerOpen] = useState(false);

  const addSection = useCallback((section: SequenceSection) => {
    setSections((prev) => [
      ...prev,
      { id: genId(), section, cues: [emptyCue()] },
    ]);
    setSectionPickerOpen(false);
  }, []);

  const addCueToSection = useCallback((sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, cues: [...s.cues, emptyCue()] } : s,
      ),
    );
  }, []);

  const updateCue = useCallback(
    (sectionId: string, cueId: string, field: keyof CueFormData, value: string) => {
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                cues: s.cues.map((c) =>
                  c.id === cueId ? { ...c, [field]: value } : c,
                ),
              }
            : s,
        ),
      );
    },
    [],
  );

  const removeCue = useCallback((sectionId: string, cueId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, cues: s.cues.filter((c) => c.id !== cueId) }
          : s,
      ),
    );
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  }, []);

  const onSave = handleSubmit((data) => {
    // TODO: Persist sequence and cues to WatermelonDB
    Alert.alert(
      'Saved',
      `Sequence "${data.title}" with ${sections.reduce((acc, s) => acc + s.cues.length, 0)} cues saved.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  });

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SectionHeader title={isEditing ? 'Edit Sequence' : 'New Sequence'} />

        {/* Form Fields */}
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Title *</Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: 'Title is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                placeholder="e.g., Grounding Vinyasa Flow"
                placeholderTextColor={colors.textTertiary}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}

          <Text style={styles.fieldLabel}>Style</Text>
          <Controller
            control={control}
            name="style"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="e.g., Vinyasa, Gentle, Power, Restorative"
                placeholderTextColor={colors.textTertiary}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={styles.fieldLabel}>Duration (minutes)</Text>
          <Controller
            control={control}
            name="durationMinutes"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="60"
                placeholderTextColor={colors.textTertiary}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />

          <Text style={styles.fieldLabel}>Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Describe your sequence..."
                placeholderTextColor={colors.textTertiary}
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={3}
              />
            )}
          />
        </View>

        {/* Sections & Cues */}
        <SectionHeader
          title="Sections & Cues"
          subtitle={`${sections.length} section(s)`}
        />

        {sections.map((sectionData) => (
          <View key={sectionData.id} style={styles.sectionBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {sectionLabels[sectionData.section]}
              </Text>
              <Pressable onPress={() => removeSection(sectionData.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>

            {sectionData.cues.map((cue, cueIndex) => (
              <View key={cue.id} style={styles.cueForm}>
                <View style={styles.cueHeader}>
                  <Text style={styles.cueNumber}>Cue {cueIndex + 1}</Text>
                  <Pressable
                    onPress={() => removeCue(sectionData.id, cue.id)}
                  >
                    <Text style={styles.removeText}>X</Text>
                  </Pressable>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Pose name"
                  placeholderTextColor={colors.textTertiary}
                  value={cue.poseName}
                  onChangeText={(v) =>
                    updateCue(sectionData.id, cue.id, 'poseName', v)
                  }
                />

                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  placeholder="Cue text — what you say to your students"
                  placeholderTextColor={colors.textTertiary}
                  value={cue.cueText}
                  onChangeText={(v) =>
                    updateCue(sectionData.id, cue.id, 'cueText', v)
                  }
                  multiline
                  numberOfLines={2}
                />

                {/* Cue Type Selector */}
                <Text style={styles.miniLabel}>Cue Type</Text>
                <View style={styles.cueTypeRow}>
                  {cueTypes.map((ct) => (
                    <Pressable
                      key={ct}
                      onPress={() =>
                        updateCue(sectionData.id, cue.id, 'cueType', ct)
                      }
                      style={[
                        styles.cueTypeChip,
                        cue.cueType === ct && styles.cueTypeChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.cueTypeText,
                          cue.cueType === ct && styles.cueTypeTextActive,
                        ]}
                      >
                        {ct}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <View style={styles.row}>
                  <View style={styles.halfField}>
                    <TextInput
                      style={styles.input}
                      placeholder="Breaths"
                      placeholderTextColor={colors.textTertiary}
                      value={cue.breathCount}
                      onChangeText={(v) =>
                        updateCue(sectionData.id, cue.id, 'breathCount', v)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.halfField}>
                    <TextInput
                      style={styles.input}
                      placeholder="Duration (s)"
                      placeholderTextColor={colors.textTertiary}
                      value={cue.durationSeconds}
                      onChangeText={(v) =>
                        updateCue(sectionData.id, cue.id, 'durationSeconds', v)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Notes (optional)"
                  placeholderTextColor={colors.textTertiary}
                  value={cue.notes}
                  onChangeText={(v) =>
                    updateCue(sectionData.id, cue.id, 'notes', v)
                  }
                />
              </View>
            ))}

            <Pressable
              style={styles.addCueButton}
              onPress={() => addCueToSection(sectionData.id)}
            >
              <Text style={styles.addCueText}>+ Add Cue</Text>
            </Pressable>
          </View>
        ))}

        {/* Add Section */}
        {sectionPickerOpen ? (
          <View style={styles.sectionPicker}>
            <Text style={styles.pickerTitle}>Choose section type:</Text>
            <View style={styles.pickerGrid}>
              {sectionOptions.map((sec) => (
                <Pressable
                  key={sec}
                  style={styles.pickerItem}
                  onPress={() => addSection(sec)}
                >
                  <Text style={styles.pickerItemText}>
                    {sectionLabels[sec]}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => setSectionPickerOpen(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
          <PrimaryButton
            title="+ Add Section"
            onPress={() => setSectionPickerOpen(true)}
            variant="outline"
            size="md"
          />
        )}

        {/* Save */}
        <View style={styles.saveArea}>
          <PrimaryButton
            title={isEditing ? 'Save Changes' : 'Save Sequence'}
            onPress={onSave}
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
  formSection: {
    marginBottom: spacing.xl,
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
  inputError: {
    borderColor: colors.error,
  },
  multilineInput: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  sectionBlock: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  removeText: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '600',
  },
  cueForm: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cueNumber: {
    ...typography.label,
    color: colors.textSecondary,
  },
  miniLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cueTypeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  cueTypeChip: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cueTypeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cueTypeText: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  cueTypeTextActive: {
    color: colors.textInverse,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfField: {
    flex: 1,
  },
  addCueButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: spacing.xs,
  },
  addCueText: {
    ...typography.label,
    color: colors.primary,
  },
  sectionPicker: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  pickerTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  pickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  pickerItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  pickerItemText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
  cancelText: {
    ...typography.label,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  saveArea: {
    marginTop: spacing.xl,
  },
});

export default SequenceBuilderScreen;
