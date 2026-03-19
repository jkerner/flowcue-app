import { create } from 'zustand';

interface AppState {
  selectedSequenceId: string | null;
  selectedMeditationId: string | null;
  activeSessionId: string | null;
  isOffline: boolean;
  currentAIMode: 'drafting' | 'live_assist' | null;
  lastOpenedContentId: string | null;
  lastOpenedContentType: 'sequence' | 'meditation' | null;

  // Actions
  setSelectedSequence(id: string | null): void;
  setSelectedMeditation(id: string | null): void;
  setActiveSession(id: string | null): void;
  setOffline(offline: boolean): void;
  setAIMode(mode: 'drafting' | 'live_assist' | null): void;
  setLastOpened(id: string, type: 'sequence' | 'meditation'): void;
  reset(): void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedSequenceId: null,
  selectedMeditationId: null,
  activeSessionId: null,
  isOffline: false,
  currentAIMode: null,
  lastOpenedContentId: null,
  lastOpenedContentType: null,

  setSelectedSequence: (id) => set({ selectedSequenceId: id }),
  setSelectedMeditation: (id) => set({ selectedMeditationId: id }),
  setActiveSession: (id) => set({ activeSessionId: id }),
  setOffline: (offline) => set({ isOffline: offline }),
  setAIMode: (mode) => set({ currentAIMode: mode }),
  setLastOpened: (id, type) =>
    set({ lastOpenedContentId: id, lastOpenedContentType: type }),
  reset: () =>
    set({
      selectedSequenceId: null,
      selectedMeditationId: null,
      activeSessionId: null,
      isOffline: false,
      currentAIMode: null,
      lastOpenedContentId: null,
      lastOpenedContentType: null,
    }),
}));

export default useAppStore;
