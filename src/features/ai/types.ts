import type {
  GenerationOptions,
  LiveTeachContext,
  MeditationContext,
  CueSuggestion,
  LineSuggestion,
  GeneratedSequence,
  GeneratedMeditation,
} from '../../types/api';

/**
 * Contract for any AI recommendation backend (mock, OpenAI, local model, etc.).
 * Every method returns a Promise so implementations can be async/network-bound.
 */
export interface AIRecommendationService {
  /** Generate a full sequence from a free-text prompt */
  generateSequenceFromPrompt(
    prompt: string,
    options?: GenerationOptions,
  ): Promise<GeneratedSequence>;

  /** Generate a full meditation script from a free-text prompt */
  generateMeditationFromPrompt(
    prompt: string,
    options?: GenerationOptions,
  ): Promise<GeneratedMeditation>;

  /** Return improvement suggestions for an existing sequence */
  improveSequence(
    sequenceId: string,
    options?: GenerationOptions,
  ): Promise<CueSuggestion[]>;

  /** Return improvement suggestions for an existing meditation script */
  improveMeditation(
    scriptId: string,
    options?: GenerationOptions,
  ): Promise<LineSuggestion[]>;

  /** Suggest the next cue(s) during a live teaching session */
  getNextCueSuggestions(context: LiveTeachContext): Promise<CueSuggestion[]>;

  /** Suggest the next meditation line(s) during a live meditation session */
  getMeditationLineSuggestions(context: MeditationContext): Promise<LineSuggestion[]>;
}
