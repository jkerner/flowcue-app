import { demoSequences } from './demoSequences';
import { demoMeditations } from './demoMeditations';

export interface TemplateMeta {
  title: string;
  tags: string[];
  isFeatured: boolean;
}

/**
 * Combined manifest of all template seed content.
 * Maps template titles to metadata for discoverability and display.
 */
export const templateManifest: {
  sequences: TemplateMeta[];
  meditations: TemplateMeta[];
} = {
  sequences: [
    {
      title: 'FlowCue Template: 90-Minute Vinyasa',
      tags: ['vinyasa', 'full-spectrum', '90min', 'intermediate', 'advanced', 'template'],
      isFeatured: true,
    },
    {
      title: 'FlowCue Template: Power Vinyasa with Theme',
      tags: ['power', 'vinyasa', 'themed', '90min', 'advanced', 'resilience', 'template'],
      isFeatured: true,
    },
    {
      title: 'Gentle Morning Flow',
      tags: ['gentle', 'morning', '30min', 'beginner', 'all-levels', 'ai-generated'],
      isFeatured: false,
    },
  ],
  meditations: [
    {
      title: 'Opening Grounding Meditation',
      tags: ['opening', 'grounding', 'short', '3min', 'template'],
      isFeatured: true,
    },
    {
      title: 'Savasana Meditation',
      tags: ['savasana', 'closing', '4min', 'template'],
      isFeatured: true,
    },
    {
      title: 'Body Scan Meditation',
      tags: ['body-scan', 'relaxation', '10min', 'template'],
      isFeatured: true,
    },
    {
      title: 'Breath Practice for Clarity',
      tags: ['breathwork', 'pranayama', 'clarity', '10min', 'template'],
      isFeatured: true,
    },
    {
      title: 'Closing Gratitude Meditation',
      tags: ['closing', 'gratitude', 'short', '3min', 'template'],
      isFeatured: true,
    },
    {
      title: 'Receiving & Abundance Meditation',
      tags: ['visualization', 'abundance', 'receiving', '11min', 'template'],
      isFeatured: false,
    },
    {
      title: 'Trusting the Process Heart Visualization',
      tags: ['visualization', 'trust', 'heart', '13min', 'template'],
      isFeatured: false,
    },
    {
      title: 'Exploring the Self',
      tags: ['self-inquiry', 'introspection', '9min', 'template'],
      isFeatured: false,
    },
  ],
};

/** Re-export raw seed data for convenience */
export { demoSequences, demoMeditations };
