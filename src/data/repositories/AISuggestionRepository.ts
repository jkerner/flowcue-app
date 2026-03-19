import { Q } from '@nozbe/watermelondb';
import { getDatabase } from '../database';
import type AISuggestionModel from '../database/models/AISuggestion';
import type CueModel from '../database/models/Cue';
import type MeditationScriptModel from '../database/models/MeditationScript';
import type {
  AISuggestion as AISuggestionDomain,
  Cue as CueDomain,
  SequenceSection,
  CueType,
} from '../../types/domain';

// TODO: Add pruning logic for old suggestions
// TODO: Add analytics on suggestion acceptance rate

/** Convert a WatermelonDB AISuggestion model to a plain domain object */
function toAISuggestion(model: AISuggestionModel): AISuggestionDomain {
  return {
    id: model.id,
    sessionId: model.sessionId || undefined,
    parentType: model.parentType as AISuggestionDomain['parentType'],
    parentId: model.parentId,
    suggestionText: model.suggestionText,
    suggestionKind: model.suggestionKind,
    contextSnapshotJson: model.contextSnapshotJson || undefined,
    accepted: model.accepted,
    editedBeforeSave: model.editedBeforeSave,
    createdAt: model.createdAt.getTime(),
  };
}

/** Map suggestion kind to a cue type */
function suggestionKindToCueType(kind: string): CueType {
  switch (kind) {
    case 'next_cue':
      return 'alignment';
    case 'transition':
      return 'transition';
    case 'grounding':
      return 'grounding';
    case 'modification':
      return 'modification';
    case 'meditation_line':
      return 'meditation';
    default:
      return 'alignment';
  }
}

export const AISuggestionRepository = {
  /** Save a new AI suggestion */
  async save(
    data: Omit<AISuggestionDomain, 'id' | 'createdAt'>,
  ): Promise<AISuggestionDomain> {
    const db = getDatabase();
    let created!: AISuggestionModel;

    await db.write(async () => {
      created = await db
        .get<AISuggestionModel>('ai_suggestions')
        .create((rec) => {
          rec.sessionId = data.sessionId ?? '';
          rec.parentType = data.parentType;
          rec.parentId = data.parentId;
          rec.suggestionText = data.suggestionText;
          rec.suggestionKind = data.suggestionKind;
          rec.contextSnapshotJson = data.contextSnapshotJson ?? '';
          rec.accepted = data.accepted;
          rec.editedBeforeSave = data.editedBeforeSave;
        });
    });

    return toAISuggestion(created);
  },

  /** Mark a suggestion as accepted */
  async markAccepted(id: string): Promise<AISuggestionDomain> {
    const db = getDatabase();
    const model = await db.get<AISuggestionModel>('ai_suggestions').find(id);
    let updated!: AISuggestionModel;

    await db.write(async () => {
      updated = await model.update((rec) => {
        rec.accepted = true;
      });
    });

    return toAISuggestion(updated);
  },

  /**
   * Accept a suggestion and save it as a new Cue in a sequence.
   * Creates a Cue from the suggestion text and marks the suggestion as accepted.
   */
  async saveAsCue(
    suggestionId: string,
    sequenceId: string,
    section: SequenceSection,
    orderIndex: number,
  ): Promise<CueDomain> {
    const db = getDatabase();
    const suggestion = await db
      .get<AISuggestionModel>('ai_suggestions')
      .find(suggestionId);

    let createdCue!: CueModel;

    await db.write(async () => {
      // Mark suggestion as accepted
      await suggestion.update((rec) => {
        rec.accepted = true;
      });

      // Create the cue from suggestion text
      createdCue = await db.get<CueModel>('cues').create((rec) => {
        rec.sequenceId = sequenceId;
        rec.section = section;
        rec.orderIndex = orderIndex;
        rec.poseName = '';
        rec.cueText = suggestion.suggestionText;
        rec.breathCount = 0;
        rec.durationSeconds = 0;
        rec.cueType = suggestionKindToCueType(suggestion.suggestionKind);
        rec.notes = null;
      });
    });

    return {
      id: createdCue.id,
      sequenceId: createdCue.sequenceId,
      section: createdCue.section,
      orderIndex: createdCue.orderIndex,
      poseName: createdCue.poseName || undefined,
      cueText: createdCue.cueText,
      breathCount: createdCue.breathCount || undefined,
      durationSeconds: createdCue.durationSeconds || undefined,
      cueType: createdCue.cueType,
      notes: createdCue.notes ?? undefined,
      createdAt: createdCue.createdAt.getTime(),
      updatedAt: createdCue.updatedAt.getTime(),
    };
  },

  /**
   * Accept a suggestion and append it to a meditation script's text.
   * Marks the suggestion as accepted and appends the text to the script.
   */
  async saveAsMeditationLine(
    suggestionId: string,
    scriptId: string,
  ): Promise<void> {
    const db = getDatabase();
    const suggestion = await db
      .get<AISuggestionModel>('ai_suggestions')
      .find(suggestionId);
    const script = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .find(scriptId);

    await db.write(async () => {
      // Mark suggestion as accepted
      await suggestion.update((rec) => {
        rec.accepted = true;
      });

      // Append the suggestion text to the script
      await script.update((rec) => {
        const separator = rec.scriptText.length > 0 ? '\n\n' : '';
        rec.scriptText = `${rec.scriptText}${separator}${suggestion.suggestionText}`;
      });
    });
  },

  /** List all suggestions for a given session, ordered by creation time */
  async listForSession(sessionId: string): Promise<AISuggestionDomain[]> {
    const db = getDatabase();
    const models = await db
      .get<AISuggestionModel>('ai_suggestions')
      .query(
        Q.where('session_id', sessionId),
        Q.sortBy('created_at', Q.desc),
      )
      .fetch();

    return models.map(toAISuggestion);
  },
};
