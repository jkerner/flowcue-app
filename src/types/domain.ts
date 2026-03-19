export type SourceType =
  | 'template'
  | 'user_owned'
  | 'duplicated'
  | 'ai_generated';

export type CueType =
  | 'alignment'
  | 'transition'
  | 'breath'
  | 'meditation'
  | 'modification'
  | 'grounding';

export type SessionMode = 'live_teach' | 'meditation' | 'ai_assist';

export type SuggestionKind =
  | 'next_cue'
  | 'transition'
  | 'grounding'
  | 'modification'
  | 'meditation_line';

export type MeditationCategory =
  | 'grounding'
  | 'savasana'
  | 'body_scan'
  | 'breathwork'
  | 'closing'
  | 'visualization'
  | 'self_inquiry';

export type SequenceSection =
  | 'integration'
  | 'warm_up'
  | 'sun_a'
  | 'sun_b'
  | 'standing'
  | 'balance'
  | 'peak'
  | 'prone'
  | 'seated'
  | 'hip_openers'
  | 'cool_down'
  | 'savasana'
  | 'pranayama'
  | 'meditation';

export interface Sequence {
  id: string;
  title: string;
  style: string;
  durationMinutes: number;
  description: string;
  sourceType: SourceType;
  sourceSequenceId?: string;
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Cue {
  id: string;
  sequenceId: string;
  section: SequenceSection;
  orderIndex: number;
  poseName?: string;
  cueText: string;
  breathCount?: number;
  durationSeconds?: number;
  cueType: CueType;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface MeditationScript {
  id: string;
  title: string;
  category: MeditationCategory;
  durationMinutes: number;
  sourceType: SourceType;
  sourceScriptId?: string;
  scriptText: string;
  createdAt: number;
  updatedAt: number;
}

export interface Session {
  id: string;
  sequenceId?: string;
  meditationScriptId?: string;
  startedAt: number;
  endedAt?: number;
  mode: SessionMode;
  usedAi: boolean;
  offline: boolean;
  notes?: string;
}

export interface AISuggestion {
  id: string;
  sessionId?: string;
  parentType:
    | 'sequence'
    | 'meditation_script'
    | 'cue'
    | 'meditation_chunk';
  parentId: string;
  suggestionText: string;
  suggestionKind: SuggestionKind;
  contextSnapshotJson?: string;
  accepted: boolean;
  editedBeforeSave: boolean;
  createdAt: number;
}

/** Meditation chunks for display */
export interface MeditationChunk {
  text: string;
  pauseSeconds?: number;
  pacingNote?: string;
}
