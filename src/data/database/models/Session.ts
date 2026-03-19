import { Model } from '@nozbe/watermelondb';
import { field, date, text, relation } from '@nozbe/watermelondb/decorators';

import type { SessionMode } from '../../../types/domain';

export default class Session extends Model {
  static table = 'sessions';

  static associations = {
    sequences: { type: 'belongs_to' as const, key: 'sequence_id' },
    meditation_scripts: { type: 'belongs_to' as const, key: 'meditation_script_id' },
  };

  @text('sequence_id') sequenceId!: string | null;
  @text('meditation_script_id') meditationScriptId!: string | null;
  @field('started_at') startedAt!: number;
  @field('ended_at') endedAt!: number | null;
  @text('mode') mode!: SessionMode;
  @field('used_ai') usedAi!: boolean;
  @field('offline') offline!: boolean;
  @text('notes') notes!: string | null;

  @relation('sequences', 'sequence_id') sequence!: any;
  @relation('meditation_scripts', 'meditation_script_id') meditationScript!: any;
}
