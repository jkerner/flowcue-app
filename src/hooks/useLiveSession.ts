import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { SequenceRepository } from '../data/repositories/SequenceRepository';
import { SessionRepository } from '../data/repositories/SessionRepository';
import type { Cue as CueDomain, Session as SessionDomain } from '../types/domain';
import { AUTO_ADVANCE_DEFAULT_SECONDS } from '../lib/constants';

export interface LiveSessionState {
  /** Cues for the loaded sequence */
  cues: CueDomain[];
  /** Index of the currently displayed cue */
  currentCueIndex: number;
  /** Elapsed time in seconds since the session started */
  elapsedSeconds: number;
  /** Whether auto-advance is active */
  isPlaying: boolean;
  /** The active session record, if any */
  session: SessionDomain | null;
  /** True while the session is loading */
  isLoading: boolean;
}

export interface LiveSessionActions {
  startSession(sequenceId: string): Promise<void>;
  endSession(): Promise<void>;
  nextCue(): void;
  previousCue(): void;
  toggleAutoAdvance(): void;
}

/**
 * Hook that manages live teaching session state:
 * cue navigation, elapsed-time timer, auto-advance, and session lifecycle.
 */
export function useLiveSession(): LiveSessionState & LiveSessionActions {
  const [cues, setCues] = useState<CueDomain[]>([]);
  const [currentCueIndex, setCurrentCueIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [session, setSession] = useState<SessionDomain | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setActiveSession = useAppStore((s) => s.setActiveSession);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----- Elapsed-time timer -----
  useEffect(() => {
    if (session && !session.endedAt) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [session]);

  // ----- Auto-advance -----
  useEffect(() => {
    if (isPlaying && cues.length > 0) {
      const currentCue = cues[currentCueIndex];
      const advanceDelay =
        (currentCue?.durationSeconds ?? AUTO_ADVANCE_DEFAULT_SECONDS) * 1000;

      autoAdvanceRef.current = setTimeout(() => {
        setCurrentCueIndex((prev) => {
          if (prev < cues.length - 1) {
            return prev + 1;
          }
          // Reached the end — stop auto-advance
          setIsPlaying(false);
          return prev;
        });
      }, advanceDelay);
    }

    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current);
        autoAdvanceRef.current = null;
      }
    };
  }, [isPlaying, currentCueIndex, cues]);

  // ----- Actions -----

  const startSession = useCallback(
    async (sequenceId: string) => {
      setIsLoading(true);
      try {
        const sequenceWithCues = await SequenceRepository.getById(sequenceId);
        setCues(sequenceWithCues.cues);
        setCurrentCueIndex(0);
        setElapsedSeconds(0);
        setIsPlaying(false);

        const newSession = await SessionRepository.start({
          sequenceId,
          mode: 'live_teach',
          usedAi: false,
          offline: useAppStore.getState().isOffline,
        });

        setSession(newSession);
        setActiveSession(newSession.id);
      } finally {
        setIsLoading(false);
      }
    },
    [setActiveSession],
  );

  const endSession = useCallback(async () => {
    if (!session) return;

    setIsPlaying(false);
    const ended = await SessionRepository.end(session.id);
    setSession(ended);
    setActiveSession(null);
  }, [session, setActiveSession]);

  const nextCue = useCallback(() => {
    setCurrentCueIndex((prev) => Math.min(prev + 1, cues.length - 1));
  }, [cues.length]);

  const previousCue = useCallback(() => {
    setCurrentCueIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleAutoAdvance = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return {
    cues,
    currentCueIndex,
    elapsedSeconds,
    isPlaying,
    session,
    isLoading,
    startSession,
    endSession,
    nextCue,
    previousCue,
    toggleAutoAdvance,
  };
}

export default useLiveSession;
