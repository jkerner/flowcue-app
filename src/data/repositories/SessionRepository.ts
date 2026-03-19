import { Q } from '@nozbe/watermelondb';
import { getDatabase } from '../database';
import type SessionModel from '../database/models/Session';
import type { Session as SessionDomain, SessionMode } from '../../types/domain';

// TODO: Add sync logic for session data
// TODO: Add analytics event tracking on session start/end

/** Convert a WatermelonDB Session model to a plain Session domain object */
function toSession(model: SessionModel): SessionDomain {
  return {
    id: model.id,
    sequenceId: model.sequenceId ?? undefined,
    meditationScriptId: model.meditationScriptId ?? undefined,
    startedAt: model.startedAt,
    endedAt: model.endedAt ?? undefined,
    mode: model.mode,
    usedAi: model.usedAi,
    offline: model.offline,
    notes: model.notes ?? undefined,
  };
}

export const SessionRepository = {
  /** Start a new session — sets startedAt to the current time */
  async start(
    data: Omit<SessionDomain, 'id' | 'startedAt' | 'endedAt'>,
  ): Promise<SessionDomain> {
    const db = getDatabase();
    let created!: SessionModel;

    await db.write(async () => {
      created = await db.get<SessionModel>('sessions').create((rec) => {
        rec.sequenceId = data.sequenceId ?? null;
        rec.meditationScriptId = data.meditationScriptId ?? null;
        rec.startedAt = Date.now();
        rec.mode = data.mode;
        rec.usedAi = data.usedAi;
        rec.offline = data.offline;
        rec.notes = data.notes ?? null;
      });
    });

    return toSession(created);
  },

  /** End an active session — sets endedAt to the current time and optional notes */
  async end(id: string, notes?: string): Promise<SessionDomain> {
    const db = getDatabase();
    const model = await db.get<SessionModel>('sessions').find(id);
    let updated!: SessionModel;

    await db.write(async () => {
      updated = await model.update((rec) => {
        rec.endedAt = Date.now();
        if (notes !== undefined) {
          rec.notes = notes;
        }
      });
    });

    return toSession(updated);
  },

  /** Fetch a session by ID */
  async getById(id: string): Promise<SessionDomain> {
    const db = getDatabase();
    const model = await db.get<SessionModel>('sessions').find(id);
    return toSession(model);
  },

  /** List the most recent sessions, ordered by startedAt descending */
  async listRecent(limit: number = 10): Promise<SessionDomain[]> {
    const db = getDatabase();
    const models = await db
      .get<SessionModel>('sessions')
      .query(Q.sortBy('started_at', Q.desc), Q.take(limit))
      .fetch();

    return models.map(toSession);
  },
};
