import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, text, relation } from '@nozbe/watermelondb/decorators';

import type { SuggestionKind } from '../../../types/domain';

export default class AISuggestion extends Model {
  static table = 'ai_suggestions';

  static associations = {
    sessions: { type: 'belongs_to' as const, key: 'session_id' },
  };

  @text('session_id') sessionId!: string;
  @text('parent_type') parentType!: string;
  @text('parent_id') parentId!: string;
  @text('suggestion_text') suggestionText!: string;
  @text('suggestion_kind') suggestionKind!: SuggestionKind;
  @text('context_snapshot_json') contextSnapshotJson!: string;
  @field('accepted') accepted!: boolean;
  @field('edited_before_save') editedBeforeSave!: boolean;
  @readonly @date('created_at') createdAt!: Date;

  @relation('sessions', 'session_id') session!: any;
}
