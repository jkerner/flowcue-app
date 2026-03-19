import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators';

import type { MeditationCategory, SourceType } from '../../../types/domain';

export default class MeditationScript extends Model {
  static table = 'meditation_scripts';

  @text('title') title!: string;
  @text('category') category!: MeditationCategory;
  @field('duration_minutes') durationMinutes!: number;
  @text('source_type') sourceType!: SourceType;
  @text('source_script_id') sourceScriptId!: string | null;
  @text('script_text') scriptText!: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
