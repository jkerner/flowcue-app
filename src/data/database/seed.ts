import { Database } from '@nozbe/watermelondb';

import { demoSequences } from '../seeds/demoSequences';
import { demoMeditations } from '../seeds/demoMeditations';
import Sequence from './models/Sequence';
import Cue from './models/Cue';
import MeditationScript from './models/MeditationScript';

/**
 * Check whether seed data has already been inserted.
 * Returns true if no template sequences exist yet.
 */
export async function shouldSeed(database: Database): Promise<boolean> {
  const sequencesCollection = database.get<Sequence>('sequences');
  const count = await sequencesCollection.query().fetchCount();
  return count === 0;
}

/**
 * Insert all demo sequences (with cues) and meditation scripts.
 * Uses a single database.write() batch for atomicity and performance.
 */
export async function runSeed(database: Database): Promise<void> {
  const needsSeed = await shouldSeed(database);
  if (!needsSeed) {
    console.log('[FlowCue] Seed data already exists — skipping.');
    return;
  }

  try {
    await database.write(async () => {
      const batchOps: any[] = [];
      const now = Date.now();

      // --- Sequences and their Cues ---
      for (const seq of demoSequences) {
        const sequenceRecord = database.get<Sequence>('sequences').prepareCreate((record) => {
          record.title = seq.title;
          record.style = seq.style;
          record.durationMinutes = seq.durationMinutes;
          record.description = seq.description;
          record.sourceType = seq.sourceType;
          record.sourceSequenceId = null;
          record.isFavorite = seq.isFavorite;
        });

        batchOps.push(sequenceRecord);

        for (const cue of seq.cues) {
          const cueRecord = database.get<Cue>('cues').prepareCreate((record) => {
            record.sequenceId = sequenceRecord.id;
            record.section = cue.section;
            record.orderIndex = cue.orderIndex;
            record.poseName = cue.poseName;
            record.cueText = cue.cueText;
            record.breathCount = cue.breathCount;
            record.durationSeconds = cue.durationSeconds;
            record.cueType = cue.cueType;
            record.notes = cue.notes ?? null;
          });
          batchOps.push(cueRecord);
        }
      }

      // --- Meditation Scripts ---
      for (const med of demoMeditations) {
        const scriptText = JSON.stringify(med.chunks);
        const meditationRecord = database
          .get<MeditationScript>('meditation_scripts')
          .prepareCreate((record) => {
            record.title = med.title;
            record.category = med.category;
            record.durationMinutes = med.durationMinutes;
            record.sourceType = med.sourceType;
            record.sourceScriptId = null;
            record.scriptText = scriptText;
          });
        batchOps.push(meditationRecord);
      }

      await database.batch(...batchOps);
    });

    console.log('[FlowCue] Seed data inserted successfully.');
  } catch (error) {
    console.error('[FlowCue] Failed to seed database:', error);
    // Do not re-throw — the app should still start even if seeding fails.
  }
}

/**
 * Remove all seeded data so it can be re-inserted.
 * Deletes every record in sequences, cues, and meditation_scripts.
 */
export async function resetSeed(database: Database): Promise<void> {
  try {
    await database.write(async () => {
      const sequences = await database.get<Sequence>('sequences').query().fetch();
      const cues = await database.get<Cue>('cues').query().fetch();
      const meditations = await database
        .get<MeditationScript>('meditation_scripts')
        .query()
        .fetch();

      const batchOps = [
        ...sequences.map((r) => r.prepareDestroyPermanently()),
        ...cues.map((r) => r.prepareDestroyPermanently()),
        ...meditations.map((r) => r.prepareDestroyPermanently()),
      ];

      await database.batch(...batchOps);
    });

    console.log('[FlowCue] Seed data reset complete.');
  } catch (error) {
    console.error('[FlowCue] Failed to reset seed data:', error);
  }
}
