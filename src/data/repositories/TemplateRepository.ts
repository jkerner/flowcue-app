import { SequenceRepository } from './SequenceRepository';
import { MeditationRepository } from './MeditationRepository';
import type { Sequence, MeditationScript } from '../../types/domain';

export interface TemplateListItem {
  id: string;
  title: string;
  type: 'sequence' | 'meditation';
  style?: string;
  category?: string;
  durationMinutes: number;
}

export const TemplateRepository = {
  /** List all templates (both sequences and meditations), merged and sorted by title */
  async listAllTemplates(): Promise<TemplateListItem[]> {
    const [sequences, meditations] = await Promise.all([
      SequenceRepository.listTemplates(),
      MeditationRepository.listTemplates(),
    ]);

    const sequenceItems: TemplateListItem[] = sequences.map((s) => ({
      id: s.id,
      title: s.title,
      type: 'sequence' as const,
      style: s.style,
      durationMinutes: s.durationMinutes,
    }));

    const meditationItems: TemplateListItem[] = meditations.map((m) => ({
      id: m.id,
      title: m.title,
      type: 'meditation' as const,
      category: m.category,
      durationMinutes: m.durationMinutes,
    }));

    return [...sequenceItems, ...meditationItems].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  },

  /** Duplicate a sequence template into the user's library */
  async duplicateSequenceTemplate(id: string): Promise<Sequence> {
    return SequenceRepository.duplicate(id);
  },

  /** Duplicate a meditation template into the user's library */
  async duplicateMeditationTemplate(id: string): Promise<MeditationScript> {
    return MeditationRepository.duplicate(id);
  },

  /** Get a single template by ID and type */
  async getTemplateById(
    id: string,
    type: 'sequence' | 'meditation',
  ): Promise<Sequence | MeditationScript> {
    if (type === 'sequence') {
      const result = await SequenceRepository.getById(id);
      // Strip the cues array — return just the Sequence fields
      const { cues: _cues, ...sequence } = result;
      return sequence;
    }
    return MeditationRepository.getById(id);
  },
};
