import {
  schemaMigrations,
  createTable,
} from '@nozbe/watermelondb/Schema/migrations';

export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 1,
      steps: [
        createTable({
          name: 'sequences',
          columns: [
            { name: 'title', type: 'string' },
            { name: 'style', type: 'string' },
            { name: 'duration_minutes', type: 'number' },
            { name: 'description', type: 'string' },
            { name: 'source_type', type: 'string' },
            { name: 'source_sequence_id', type: 'string', isOptional: true },
            { name: 'is_favorite', type: 'boolean' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'cues',
          columns: [
            { name: 'sequence_id', type: 'string', isIndexed: true },
            { name: 'section', type: 'string' },
            { name: 'order_index', type: 'number' },
            { name: 'pose_name', type: 'string' },
            { name: 'cue_text', type: 'string' },
            { name: 'breath_count', type: 'number' },
            { name: 'duration_seconds', type: 'number' },
            { name: 'cue_type', type: 'string' },
            { name: 'notes', type: 'string', isOptional: true },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'meditation_scripts',
          columns: [
            { name: 'title', type: 'string' },
            { name: 'category', type: 'string' },
            { name: 'duration_minutes', type: 'number' },
            { name: 'source_type', type: 'string' },
            { name: 'source_script_id', type: 'string', isOptional: true },
            { name: 'script_text', type: 'string' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'sessions',
          columns: [
            { name: 'sequence_id', type: 'string', isOptional: true, isIndexed: true },
            { name: 'meditation_script_id', type: 'string', isOptional: true, isIndexed: true },
            { name: 'started_at', type: 'number' },
            { name: 'ended_at', type: 'number', isOptional: true },
            { name: 'mode', type: 'string' },
            { name: 'used_ai', type: 'boolean' },
            { name: 'offline', type: 'boolean' },
            { name: 'notes', type: 'string', isOptional: true },
          ],
        }),
        createTable({
          name: 'ai_suggestions',
          columns: [
            { name: 'session_id', type: 'string', isIndexed: true },
            { name: 'parent_type', type: 'string' },
            { name: 'parent_id', type: 'string' },
            { name: 'suggestion_text', type: 'string' },
            { name: 'suggestion_kind', type: 'string' },
            { name: 'context_snapshot_json', type: 'string' },
            { name: 'accepted', type: 'boolean' },
            { name: 'edited_before_save', type: 'boolean' },
            { name: 'created_at', type: 'number' },
          ],
        }),
      ],
    },
  ],
});
