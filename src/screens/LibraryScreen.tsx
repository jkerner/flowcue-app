import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { SourceTypeBadge } from '../components/SourceTypeBadge';
import { EmptyState } from '../components/EmptyState';
import { colors, spacing, typography } from '../theme';
import type { Sequence, MeditationScript, SourceType } from '../types/domain';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type TabKey = 'sequences' | 'meditations' | 'templates';

// Mock data
const mockSequences: Sequence[] = [
  {
    id: 'seq-1',
    title: 'Grounding Vinyasa Flow',
    style: 'Vinyasa',
    durationMinutes: 60,
    description: 'Full grounding flow with breath focus.',
    sourceType: 'user_owned',
    isFavorite: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'seq-2',
    title: 'Gentle Morning Stretch',
    style: 'Gentle',
    durationMinutes: 30,
    description: 'Soft morning stretches.',
    sourceType: 'duplicated',
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'seq-3',
    title: 'Power Hour',
    style: 'Power',
    durationMinutes: 60,
    description: 'High-intensity power yoga.',
    sourceType: 'ai_generated',
    isFavorite: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const mockMeditations: MeditationScript[] = [
  {
    id: 'med-1',
    title: 'Body Scan Savasana',
    category: 'body_scan',
    durationMinutes: 10,
    sourceType: 'user_owned',
    scriptText: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'med-2',
    title: 'Grounding Visualization',
    category: 'grounding',
    durationMinutes: 8,
    sourceType: 'duplicated',
    scriptText: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'med-3',
    title: 'Closing Breathwork',
    category: 'breathwork',
    durationMinutes: 5,
    sourceType: 'ai_generated',
    scriptText: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const mockTemplates: Sequence[] = [
  {
    id: 'tmpl-1',
    title: 'Classic Vinyasa Template',
    style: 'Vinyasa',
    durationMinutes: 60,
    description: 'A standard vinyasa template with all sections.',
    sourceType: 'template',
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'tmpl-2',
    title: 'Restorative Evening',
    style: 'Restorative',
    durationMinutes: 75,
    description: 'A calming restorative template for evening classes.',
    sourceType: 'template',
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'sequences', label: 'Sequences' },
  { key: 'meditations', label: 'Meditations' },
  { key: 'templates', label: 'Templates' },
];

export const LibraryScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [activeTab, setActiveTab] = useState<TabKey>('sequences');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSequences = useMemo(
    () =>
      mockSequences.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const filteredMeditations = useMemo(
    () =>
      mockMeditations.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const filteredTemplates = useMemo(
    () =>
      mockTemplates.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const handleDuplicate = (item: Sequence) => {
    // TODO: Duplicate template into user library
    Alert.alert('Duplicated', `"${item.title}" added to your library.`);
  };

  const handleCreateNew = () => {
    if (activeTab === 'meditations') {
      navigation.navigate('MeditationBuilder', {});
    } else {
      navigation.navigate('SequenceBuilder', {});
    }
  };

  const renderSequenceItem = ({ item }: { item: Sequence }) => (
    <Pressable
      onPress={() => navigation.navigate('SequenceDetail', { sequenceId: item.id })}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        {item.isFavorite && <Text style={styles.star}>*</Text>}
      </View>
      <View style={styles.cardMeta}>
        <SourceTypeBadge sourceType={item.sourceType} />
        <Text style={styles.cardStyle}>{item.style}</Text>
        <Text style={styles.cardDuration}>{item.durationMinutes} min</Text>
      </View>
    </Pressable>
  );

  const renderMeditationItem = ({ item }: { item: MeditationScript }) => (
    <Pressable
      onPress={() =>
        navigation.navigate('MeditationDetail', { meditationId: item.id })
      }
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <View style={styles.cardMeta}>
        <SourceTypeBadge sourceType={item.sourceType} />
        <Text style={styles.cardStyle}>{item.category.replace('_', ' ')}</Text>
        <Text style={styles.cardDuration}>{item.durationMinutes} min</Text>
      </View>
    </Pressable>
  );

  const renderTemplateItem = ({ item }: { item: Sequence }) => (
    <Pressable
      onPress={() => navigation.navigate('SequenceDetail', { sequenceId: item.id })}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.cardMeta}>
        <SourceTypeBadge sourceType={item.sourceType} />
        <Text style={styles.cardStyle}>{item.style}</Text>
        <Text style={styles.cardDuration}>{item.durationMinutes} min</Text>
      </View>
      <View style={styles.duplicateRow}>
        <PrimaryButton
          title="Duplicate"
          onPress={() => handleDuplicate(item)}
          variant="outline"
          size="sm"
        />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search content..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'sequences' && (
        <FlatList
          data={filteredSequences}
          keyExtractor={(item) => item.id}
          renderItem={renderSequenceItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title="No Sequences"
              message="Create your first yoga sequence to get started."
              actionLabel="Create Sequence"
              onAction={() => navigation.navigate('SequenceBuilder', {})}
            />
          }
        />
      )}

      {activeTab === 'meditations' && (
        <FlatList
          data={filteredMeditations}
          keyExtractor={(item) => item.id}
          renderItem={renderMeditationItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title="No Meditations"
              message="Create your first meditation script."
              actionLabel="Create Meditation"
              onAction={() => navigation.navigate('MeditationBuilder', {})}
            />
          }
        />
      )}

      {activeTab === 'templates' && (
        <FlatList
          data={filteredTemplates}
          keyExtractor={(item) => item.id}
          renderItem={renderTemplateItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title="No Templates"
              message="Templates will appear here when available."
            />
          }
        />
      )}

      {/* FAB */}
      {activeTab !== 'templates' && (
        <Pressable
          style={({ pressed }) => [styles.fab, pressed && { opacity: 0.85 }]}
          onPress={handleCreateNew}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.label,
    color: colors.textTertiary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxl + 60,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
  },
  star: {
    ...typography.h3,
    color: colors.accent,
    marginLeft: spacing.sm,
  },
  cardDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardStyle: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  cardDuration: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  duplicateRow: {
    marginTop: spacing.sm,
    alignItems: 'flex-start',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.screenPadding,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  fabText: {
    fontSize: 28,
    color: colors.textInverse,
    fontWeight: '400',
    marginTop: -2,
  },
});

export default LibraryScreen;
