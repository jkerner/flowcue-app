import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, children, text } from '@nozbe/watermelondb/decorators';

import type { SourceType } from '../../../types/domain';

export default class Sequence extends Model {
  static table = 'sequences';

  static associations = {
    cues: { type: 'has_many' as const, foreignKey: 'sequence_id' },
  };

  @text('title') title!: string;
  @text('style') style!: string;
  @field('duration_minutes') durationMinutes!: number;
  @text('description') description!: string;
  @text('source_type') sourceType!: SourceType;
  @text('source_sequence_id') sourceSequenceId!: string | null;
  @field('is_favorite') isFavorite!: boolean;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @children('cues') cues!: any;
}
