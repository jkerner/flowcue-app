import {
  Cue,
  MeditationChunk,
} from './domain';

export interface GenerationOptions {
  style?: string;
  tone?: string;
  duration?: number;
  level?: string;
  focus?: string;
}

export interface LiveTeachContext {
  currentCueIndex: number;
  deliveredCues: Cue[];
  section: string;
  elapsedTime: number;
  style: string;
  sequenceTitle: string;
}

export interface MeditationContext {
  currentChunkIndex: number;
  deliveredChunks: MeditationChunk[];
  elapsedTime: number;
  category: string;
  scriptTitle: string;
}

export interface CueSuggestion {
  text: string;
  cueType: string;
  confidence: number;
  reasoning?: string;
}

export interface LineSuggestion {
  text: string;
  pauseSeconds?: number;
  confidence: number;
  reasoning?: string;
}

export interface GeneratedSequence {
  title: string;
  style: string;
  durationMinutes: number;
  description: string;
  cues: Omit<Cue, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[];
}

export interface GeneratedMeditation {
  title: string;
  category: string;
  durationMinutes: number;
  scriptText: string;
  chunks: MeditationChunk[];
}
