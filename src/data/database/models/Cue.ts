import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, text, relation } from '@nozbe/watermelondb/decorators';

import type { CueType, SequenceSection } from '../../../types/domain';

export default class Cue extends Model {
  static table = 'cues';

  static associations = {
    sequences: { type: 'belongs_to' as const, key: 'sequence_id' },
  };

  @text('sequence_id') sequenceId!: string;
  @text('section') section!: SequenceSection;
  @field('order_index') orderIndex!: number;
  @text('pose_name') poseName!: string;
  @text('cue_text') cueText!: string;
  @field('breath_count') breathCount!: number;
  @field('duration_seconds') durationSeconds!: number;
  @text('cue_type') cueType!: CueType;
  @text('notes') notes!: string | null;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @relation('sequences', 'sequence_id') sequence!: any;
}
