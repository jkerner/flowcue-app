import React, { useRef, useEffect, useCallback } from 'react';
import { FlatList, View, StyleSheet, type ListRenderItemInfo } from 'react-native';
import { spacing } from '../theme';
import { CueCard } from './CueCard';
import type { Cue } from '../types/domain';

interface CueScrollerProps {
  cues: Cue[];
  currentIndex: number;
  onCuePress?: (cue: Cue) => void;
}

export const CueScroller: React.FC<CueScrollerProps> = ({
  cues,
  currentIndex,
  onCuePress,
}) => {
  const listRef = useRef<FlatList<Cue>>(null);

  useEffect(() => {
    if (cues.length === 0 || currentIndex < 0 || currentIndex >= cues.length) {
      return;
    }
    // Small delay so layout is ready before scrolling
    const timer = setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewPosition: 0.4, // roughly center
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [currentIndex, cues.length]);

  const getItemOpacity = useCallback(
    (index: number): number => {
      if (index === currentIndex) return 1;
      if (index < currentIndex) return 0.4;
      return 0.75;
    },
    [currentIndex],
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Cue>) => (
      <View style={{ opacity: getItemOpacity(index) }}>
        <CueCard
          cue={item}
          index={index}
          isActive={index === currentIndex}
          onPress={onCuePress}
        />
      </View>
    ),
    [currentIndex, getItemOpacity, onCuePress],
  );

  const keyExtractor = useCallback((item: Cue) => item.id, []);

  const onScrollToIndexFailed = useCallback(
    (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
      // Fallback: scroll to end then retry
      listRef.current?.scrollToEnd({ animated: false });
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: info.index,
          animated: true,
          viewPosition: 0.4,
        });
      }, 200);
    },
    [],
  );

  return (
    <FlatList
      ref={listRef}
      data={cues}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      onScrollToIndexFailed={onScrollToIndexFailed}
      initialNumToRender={15}
      windowSize={11}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
  },
});

export default CueScroller;
