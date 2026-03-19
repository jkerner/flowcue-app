import { Q } from '@nozbe/watermelondb';
import { getDatabase } from '../database';
import type SequenceModel from '../database/models/Sequence';
import type CueModel from '../database/models/Cue';
import type {
  Sequence as SequenceDomain,
  Cue as CueDomain,
  SequenceSection,
} from '../../types/domain';

// TODO: Add sync conflict resolution logic
// TODO: Add optimistic updates for offline support

/** Convert a WatermelonDB Sequence model to a plain Sequence domain object */
function toSequence(model: SequenceModel): SequenceDomain {
  return {
    id: model.id,
    title: model.title,
    style: model.style,
    durationMinutes: model.durationMinutes,
    description: model.description,
    sourceType: model.sourceType,
    sourceSequenceId: model.sourceSequenceId ?? undefined,
    isFavorite: model.isFavorite,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

/** Convert a WatermelonDB Cue model to a plain Cue domain object */
function toCue(model: CueModel): CueDomain {
  return {
    id: model.id,
    sequenceId: model.sequenceId,
    section: model.section,
    orderIndex: model.orderIndex,
    poseName: model.poseName || undefined,
    cueText: model.cueText,
    breathCount: model.breathCount || undefined,
    durationSeconds: model.durationSeconds || undefined,
    cueType: model.cueType,
    notes: model.notes ?? undefined,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export const SequenceRepository = {
  /** Fetch a sequence by ID along with all its cues, ordered by section and orderIndex */
  async getById(id: string): Promise<SequenceDomain & { cues: CueDomain[] }> {
    const db = getDatabase();
    const model = await db.get<SequenceModel>('sequences').find(id);
    const cueModels = await db
      .get<CueModel>('cues')
      .query(Q.where('sequence_id', id), Q.sortBy('order_index', Q.asc))
      .fetch();

    return {
      ...toSequence(model),
      cues: cueModels.map(toCue),
    };
  },

  /** List all user-created sequences (excludes templates) */
  async listUserSequences(): Promise<SequenceDomain[]> {
    const db = getDatabase();
    const models = await db
      .get<SequenceModel>('sequences')
      .query(Q.where('source_type', Q.notEq('template')), Q.sortBy('updated_at', Q.desc))
      .fetch();

    return models.map(toSequence);
  },

  /** List all template sequences */
  async listTemplates(): Promise<SequenceDomain[]> {
    const db = getDatabase();
    const models = await db
      .get<SequenceModel>('sequences')
      .query(Q.where('source_type', 'template'), Q.sortBy('title', Q.asc))
      .fetch();

    return models.map(toSequence);
  },

  /** Create a new sequence */
  async create(
    data: Omit<SequenceDomain, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SequenceDomain> {
    const db = getDatabase();
    let created!: SequenceModel;

    await db.write(async () => {
      created = await db.get<SequenceModel>('sequences').create((rec) => {
        rec.title = data.title;
        rec.style = data.style;
        rec.durationMinutes = data.durationMinutes;
        rec.description = data.description;
        rec.sourceType = data.sourceType;
        rec.sourceSequenceId = data.sourceSequenceId ?? null;
        rec.isFavorite = data.isFavorite;
      });
    });

    return toSequence(created);
  },

  /** Update an existing sequence by ID */
  async update(id: string, data: Partial<SequenceDomain>): Promise<SequenceDomain> {
    const db = getDatabase();
    const model = await db.get<SequenceModel>('sequences').find(id);
    let updated!: SequenceModel;

    await db.write(async () => {
      updated = await model.update((rec) => {
        if (data.title !== undefined) rec.title = data.title;
        if (data.style !== undefined) rec.style = data.style;
        if (data.durationMinutes !== undefined) rec.durationMinutes = data.durationMinutes;
        if (data.description !== undefined) rec.description = data.description;
        if (data.sourceType !== undefined) rec.sourceType = data.sourceType;
        if (data.sourceSequenceId !== undefined) rec.sourceSequenceId = data.sourceSequenceId ?? null;
        if (data.isFavorite !== undefined) rec.isFavorite = data.isFavorite;
      });
    });

    return toSequence(updated);
  },

  /**
   * Deep-copy a sequence and all its cues.
   * The duplicate gets source_type = 'duplicated' and source_sequence_id pointing to the original.
   */
  async duplicate(id: string): Promise<SequenceDomain> {
    const db = getDatabase();
    const original = await db.get<SequenceModel>('sequences').find(id);
    const originalCues = await db
      .get<CueModel>('cues')
      .query(Q.where('sequence_id', id))
      .fetch();

    let duplicatedSeq!: SequenceModel;

    await db.write(async () => {
      duplicatedSeq = await db.get<SequenceModel>('sequences').create((rec) => {
        rec.title = `${original.title} (Copy)`;
        rec.style = original.style;
        rec.durationMinutes = original.durationMinutes;
        rec.description = original.description;
        rec.sourceType = 'duplicated';
        rec.sourceSequenceId = original.id;
        rec.isFavorite = false;
      });

      // Deep-copy each cue
      for (const cue of originalCues) {
        await db.get<CueModel>('cues').create((rec) => {
          rec.sequenceId = duplicatedSeq.id;
          rec.section = cue.section;
          rec.orderIndex = cue.orderIndex;
          rec.poseName = cue.poseName;
          rec.cueText = cue.cueText;
          rec.breathCount = cue.breathCount;
          rec.durationSeconds = cue.durationSeconds;
          rec.cueType = cue.cueType;
          rec.notes = cue.notes;
        });
      }
    });

    return toSequence(duplicatedSeq);
  },

  /** Toggle the isFavorite flag on a sequence */
  async toggleFavorite(id: string): Promise<SequenceDomain> {
    const db = getDatabase();
    const model = await db.get<SequenceModel>('sequences').find(id);
    let updated!: SequenceModel;

    await db.write(async () => {
      updated = await model.update((rec) => {
        rec.isFavorite = !model.isFavorite;
      });
    });

    return toSequence(updated);
  },

  /** Delete a sequence and all associated cues */
  async delete(id: string): Promise<void> {
    const db = getDatabase();
    const model = await db.get<SequenceModel>('sequences').find(id);
    const cues = await db
      .get<CueModel>('cues')
      .query(Q.where('sequence_id', id))
      .fetch();

    await db.write(async () => {
      for (const cue of cues) {
        await cue.markAsDeleted();
      }
      await model.markAsDeleted();
    });

    // TODO: queue sync deletion for server
  },

  /** Search sequences by title or description (case-insensitive) */
  async search(query: string): Promise<SequenceDomain[]> {
    const db = getDatabase();
    const lowerQuery = query.toLowerCase();
    const models = await db
      .get<SequenceModel>('sequences')
      .query(
        Q.or(
          Q.where('title', Q.like(`%${Q.sanitizeLikeString(lowerQuery)}%`)),
          Q.where('description', Q.like(`%${Q.sanitizeLikeString(lowerQuery)}%`)),
        ),
        Q.sortBy('updated_at', Q.desc),
      )
      .fetch();

    return models.map(toSequence);
  },

  /** Add a cue to a sequence */
  async addCue(
    sequenceId: string,
    cue: Omit<CueDomain, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>,
  ): Promise<CueDomain> {
    const db = getDatabase();
    let created!: CueModel;

    await db.write(async () => {
      created = await db.get<CueModel>('cues').create((rec) => {
        rec.sequenceId = sequenceId;
        rec.section = cue.section;
        rec.orderIndex = cue.orderIndex;
        rec.poseName = cue.poseName ?? '';
        rec.cueText = cue.cueText;
        rec.breathCount = cue.breathCount ?? 0;
        rec.durationSeconds = cue.durationSeconds ?? 0;
        rec.cueType = cue.cueType;
        rec.notes = cue.notes ?? null;
      });
    });

    return toCue(created);
  },

  /** Update an existing cue by ID */
  async updateCue(id: string, data: Partial<CueDomain>): Promise<CueDomain> {
    const db = getDatabase();
    const model = await db.get<CueModel>('cues').find(id);
    let updated!: CueModel;

    await db.write(async () => {
      updated = await model.update((rec) => {
        if (data.section !== undefined) rec.section = data.section;
        if (data.orderIndex !== undefined) rec.orderIndex = data.orderIndex;
        if (data.poseName !== undefined) rec.poseName = data.poseName ?? '';
        if (data.cueText !== undefined) rec.cueText = data.cueText;
        if (data.breathCount !== undefined) rec.breathCount = data.breathCount ?? 0;
        if (data.durationSeconds !== undefined) rec.durationSeconds = data.durationSeconds ?? 0;
        if (data.cueType !== undefined) rec.cueType = data.cueType;
        if (data.notes !== undefined) rec.notes = data.notes ?? null;
      });
    });

    return toCue(updated);
  },

  /** Delete a single cue by ID */
  async deleteCue(id: string): Promise<void> {
    const db = getDatabase();
    const model = await db.get<CueModel>('cues').find(id);

    await db.write(async () => {
      await model.markAsDeleted();
    });
  },

  /** Reorder cues within a section by writing sequential orderIndex values */
  async reorderCues(
    sequenceId: string,
    section: string,
    orderedIds: string[],
  ): Promise<void> {
    const db = getDatabase();

    await db.write(async () => {
      for (let i = 0; i < orderedIds.length; i++) {
        const model = await db.get<CueModel>('cues').find(orderedIds[i]);
        await model.update((rec) => {
          rec.orderIndex = i;
          rec.section = section as SequenceSection;
        });
      }
    });

    // TODO: batch update for better performance once WatermelonDB batch is integrated
  },
};
