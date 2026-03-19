import { Q } from '@nozbe/watermelondb';
import { getDatabase } from '../database';
import type MeditationScriptModel from '../database/models/MeditationScript';
import type {
  MeditationScript as MeditationScriptDomain,
  MeditationCategory,
} from '../../types/domain';

// TODO: Add sync conflict resolution logic
// TODO: Add optimistic updates for offline support

/** Convert a WatermelonDB MeditationScript model to a plain domain object */
function toMeditationScript(model: MeditationScriptModel): MeditationScriptDomain {
  return {
    id: model.id,
    title: model.title,
    category: model.category,
    durationMinutes: model.durationMinutes,
    sourceType: model.sourceType,
    sourceScriptId: model.sourceScriptId ?? undefined,
    scriptText: model.scriptText,
    createdAt: model.createdAt.getTime(),
    updatedAt: model.updatedAt.getTime(),
  };
}

export const MeditationRepository = {
  /** Fetch a meditation script by ID */
  async getById(id: string): Promise<MeditationScriptDomain> {
    const db = getDatabase();
    const model = await db.get<MeditationScriptModel>('meditation_scripts').find(id);
    return toMeditationScript(model);
  },

  /** List all user-created meditation scripts (excludes templates) */
  async listUserMeditations(): Promise<MeditationScriptDomain[]> {
    const db = getDatabase();
    const models = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .query(
        Q.where('source_type', Q.notEq('template')),
        Q.sortBy('updated_at', Q.desc),
      )
      .fetch();

    return models.map(toMeditationScript);
  },

  /** List all template meditation scripts */
  async listTemplates(): Promise<MeditationScriptDomain[]> {
    const db = getDatabase();
    const models = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .query(Q.where('source_type', 'template'), Q.sortBy('title', Q.asc))
      .fetch();

    return models.map(toMeditationScript);
  },

  /** Create a new meditation script */
  async create(
    data: Omit<MeditationScriptDomain, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<MeditationScriptDomain> {
    const db = getDatabase();
    let created!: MeditationScriptModel;

    await db.write(async () => {
      created = await db
        .get<MeditationScriptModel>('meditation_scripts')
        .create((rec) => {
          rec.title = data.title;
          rec.category = data.category as MeditationCategory;
          rec.durationMinutes = data.durationMinutes;
          rec.sourceType = data.sourceType;
          rec.sourceScriptId = data.sourceScriptId ?? null;
          rec.scriptText = data.scriptText;
        });
    });

    return toMeditationScript(created);
  },

  /** Update an existing meditation script by ID */
  async update(
    id: string,
    data: Partial<MeditationScriptDomain>,
  ): Promise<MeditationScriptDomain> {
    const db = getDatabase();
    const model = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .find(id);
    let updated!: MeditationScriptModel;

    await db.write(async () => {
      updated = await model.update((rec) => {
        if (data.title !== undefined) rec.title = data.title;
        if (data.category !== undefined) rec.category = data.category as MeditationCategory;
        if (data.durationMinutes !== undefined) rec.durationMinutes = data.durationMinutes;
        if (data.sourceType !== undefined) rec.sourceType = data.sourceType;
        if (data.sourceScriptId !== undefined) rec.sourceScriptId = data.sourceScriptId ?? null;
        if (data.scriptText !== undefined) rec.scriptText = data.scriptText;
      });
    });

    return toMeditationScript(updated);
  },

  /**
   * Deep-copy a meditation script.
   * The duplicate gets source_type = 'duplicated' and source_script_id pointing to the original.
   */
  async duplicate(id: string): Promise<MeditationScriptDomain> {
    const db = getDatabase();
    const original = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .find(id);
    let duplicated!: MeditationScriptModel;

    await db.write(async () => {
      duplicated = await db
        .get<MeditationScriptModel>('meditation_scripts')
        .create((rec) => {
          rec.title = `${original.title} (Copy)`;
          rec.category = original.category;
          rec.durationMinutes = original.durationMinutes;
          rec.sourceType = 'duplicated';
          rec.sourceScriptId = original.id;
          rec.scriptText = original.scriptText;
        });
    });

    return toMeditationScript(duplicated);
  },

  /** Toggle favorite status on a meditation script */
  async toggleFavorite(id: string): Promise<MeditationScriptDomain> {
    // Note: MeditationScript domain type does not include isFavorite.
    // TODO: Add isFavorite to MeditationScript model and domain type if needed.
    // For now returns the script unchanged.
    const db = getDatabase();
    const model = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .find(id);
    return toMeditationScript(model);
  },

  /** Delete a meditation script by ID */
  async delete(id: string): Promise<void> {
    const db = getDatabase();
    const model = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .find(id);

    await db.write(async () => {
      await model.markAsDeleted();
    });

    // TODO: queue sync deletion for server
  },

  /** Search meditation scripts by title or script text (case-insensitive) */
  async search(query: string): Promise<MeditationScriptDomain[]> {
    const db = getDatabase();
    const lowerQuery = query.toLowerCase();
    const models = await db
      .get<MeditationScriptModel>('meditation_scripts')
      .query(
        Q.or(
          Q.where('title', Q.like(`%${Q.sanitizeLikeString(lowerQuery)}%`)),
          Q.where('script_text', Q.like(`%${Q.sanitizeLikeString(lowerQuery)}%`)),
        ),
        Q.sortBy('updated_at', Q.desc),
      )
      .fetch();

    return models.map(toMeditationScript);
  },
};
