import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schema } from './schema';
import { migrations } from './migrations';

import Sequence from './models/Sequence';
import Cue from './models/Cue';
import MeditationScript from './models/MeditationScript';
import Session from './models/Session';
import AISuggestion from './models/AISuggestion';

const modelClasses = [Sequence, Cue, MeditationScript, Session, AISuggestion];

let databaseInstance: Database | null = null;

function createDatabase(): Database {
  const adapter = new SQLiteAdapter({
    schema,
    migrations,
    jsi: true,
    onSetUpError: (error) => {
      console.error('[FlowCue] Database setup error:', error);
    },
  });

  return new Database({
    adapter,
    modelClasses,
  });
}

/**
 * Returns the singleton Database instance.
 * Creates it on first call.
 */
export function getDatabase(): Database {
  if (!databaseInstance) {
    databaseInstance = createDatabase();
  }
  return databaseInstance;
}

/**
 * Resets the singleton so a fresh database can be created.
 * Useful for testing or after a destructive reset.
 */
export async function resetDatabase(): Promise<void> {
  if (databaseInstance) {
    await databaseInstance.write(async () => {
      await databaseInstance!.unsafeResetDatabase();
    });
    databaseInstance = null;
  }
}

export { Sequence, Cue, MeditationScript, Session, AISuggestion };
export default getDatabase;
