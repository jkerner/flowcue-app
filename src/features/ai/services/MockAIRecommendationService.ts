import type { AIRecommendationService } from '../types';
import type {
  GenerationOptions,
  LiveTeachContext,
  MeditationContext,
  CueSuggestion,
  LineSuggestion,
  GeneratedSequence,
  GeneratedMeditation,
} from '../../../types/api';
import type { Cue, MeditationChunk, SequenceSection, CueType } from '../../../types/domain';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Simulate network latency (300-800 ms) */
function delay(): Promise<void> {
  const ms = 300 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Build a partial Cue (the fields repositories expect for creation) */
function cue(
  section: SequenceSection,
  orderIndex: number,
  poseName: string,
  cueText: string,
  cueType: CueType = 'alignment',
  breathCount?: number,
  durationSeconds?: number,
): Omit<Cue, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'> {
  return { section, orderIndex, poseName, cueText, cueType, breathCount, durationSeconds };
}

/** Build a MeditationChunk */
function chunk(
  text: string,
  pauseSeconds?: number,
  pacingNote?: string,
): MeditationChunk {
  return { text, pauseSeconds, pacingNote };
}

// ---------------------------------------------------------------------------
// Keyword detection helpers
// ---------------------------------------------------------------------------

function promptContains(prompt: string, ...keywords: string[]): boolean {
  const lower = prompt.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

// ---------------------------------------------------------------------------
// Sequence content banks
// ---------------------------------------------------------------------------

const VINYASA_CUES: Omit<Cue, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[] = [
  cue('warm_up', 0, 'Child\'s Pose', 'Begin in Child\'s Pose. Let the forehead rest heavy. Take three deep breaths here, arriving on your mat.', 'grounding', 3, 30),
  cue('warm_up', 1, 'Tabletop', 'Rise to all fours, wrists under shoulders, knees under hips. Find a neutral spine.', 'transition', undefined, 15),
  cue('warm_up', 2, 'Cat/Cow', 'Inhale, drop the belly and lift the gaze for Cow. Exhale, round the spine, tuck the chin for Cat. Move with your breath.', 'breath', 5, 40),
  cue('sun_a', 3, 'Forward Fold', 'Walk the hands to the feet. Uttanasana. Relax the neck, bend the knees as much as you need.', 'alignment', 3, 20),
  cue('sun_a', 4, 'Halfway Lift', 'Inhale, lengthen the spine forward. Fingertips to shins or thighs. Flat back.', 'alignment', 1, 10),
  cue('sun_a', 5, 'High Plank', 'Plant the palms, step back to Plank. Shoulders over wrists, one long line from crown to heels.', 'alignment', 2, 15),
  cue('sun_a', 6, 'Chaturanga', 'Exhale, bend the elbows straight back, lower halfway. Keep the elbows hugging in.', 'alignment', 1, 8),
  cue('sun_a', 7, 'Upward-Facing Dog', 'Inhale, press through the hands, roll over the toes, lift the chest. Thighs off the mat.', 'alignment', 1, 10),
  cue('sun_a', 8, 'Downward-Facing Dog', 'Exhale, lift the hips high and back. Pedal the feet out. Five breaths here.', 'alignment', 5, 40),
  cue('standing', 9, 'Chair Pose', 'Inhale, bend the knees and sweep the arms overhead. Utkatasana. Sit low, lift the heart.', 'alignment', 3, 25),
  cue('standing', 10, 'Warrior I', 'Step the right foot back. Square the hips forward, arms reach high. Front knee over ankle.', 'alignment', 3, 25),
  cue('standing', 11, 'Warrior II', 'Open to the side. Arms extend long, gaze over the front fingertips. Sink into the front leg.', 'alignment', 3, 25),
  cue('standing', 12, 'Triangle', 'Straighten the front leg. Reach forward, then tilt. Bottom hand to shin, top arm skyward. Trikonasana.', 'alignment', 3, 25),
  cue('cool_down', 13, 'Seated Forward Fold', 'Come to a seat, extend the legs. Inhale to lengthen, exhale to fold. Paschimottanasana.', 'alignment', 5, 45),
  cue('savasana', 14, 'Savasana', 'Release everything. Arms by your sides, palms up. Close the eyes. Let the mat hold you completely.', 'grounding', undefined, 300),
];

const GENTLE_CUES: Omit<Cue, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[] = [
  cue('warm_up', 0, 'Supported Child\'s Pose', 'Place a bolster lengthwise on the mat. Drape your torso over it. Turn the head to one side and breathe.', 'grounding', 5, 60),
  cue('warm_up', 1, 'Cat/Cow', 'Come to tabletop. Inhale for Cow, letting the belly soften. Exhale for Cat, rounding gently. Move slowly.', 'breath', 5, 45),
  cue('warm_up', 2, 'Puppy Pose', 'Walk the hands forward, melt the chest toward the mat. Keep the hips over the knees. Open the shoulders.', 'alignment', 3, 30),
  cue('standing', 3, 'Downward-Facing Dog', 'Tuck the toes, lift the hips. Generous bend in the knees. Let the head hang heavy.', 'alignment', 5, 40),
  cue('standing', 4, 'Low Lunge', 'Step the right foot forward between the hands. Lower the back knee. Inhale, arms sweep up. Anjaneyasana.', 'alignment', 3, 30),
  cue('standing', 5, 'Low Lunge (Left)', 'Switch sides. Left foot forward, right knee down. Breathe into the hip flexor.', 'alignment', 3, 30),
  cue('seated', 6, 'Seated Twist', 'Find a comfortable cross-legged seat. Inhale lengthen, exhale twist to the right. Left hand to right knee.', 'alignment', 3, 30),
  cue('seated', 7, 'Seated Twist (Left)', 'Unwind and twist to the left. Gentle and easy. Let the breath lead the movement.', 'alignment', 3, 30),
  cue('hip_openers', 8, 'Reclined Pigeon', 'Lie on your back. Cross the right ankle over the left thigh. Draw the left knee toward the chest.', 'alignment', 5, 45),
  cue('hip_openers', 9, 'Reclined Pigeon (Left)', 'Switch sides. Left ankle over right thigh. Breathe into the outer left hip.', 'alignment', 5, 45),
  cue('cool_down', 10, 'Supine Twist', 'Hug the knees in, then drop them to the right. Extend the arms wide. Gaze left.', 'alignment', 5, 40),
  cue('cool_down', 11, 'Supine Twist (Left)', 'Bring the knees back through center and drop them to the left.', 'alignment', 5, 40),
  cue('savasana', 12, 'Savasana', 'Extend the legs, arms by your sides. Close the eyes. Let go of all effort. Rest.', 'grounding', undefined, 300),
];

const RESTORATIVE_CUES: Omit<Cue, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[] = [
  cue('warm_up', 0, 'Supported Child\'s Pose', 'Kneel with a bolster between the thighs. Fold forward, turning the head to one side. Soften completely.', 'grounding', 5, 300),
  cue('prone', 1, 'Supported Fish', 'Place a block under the upper back and one under the head. Open the arms wide. Let the chest expand.', 'alignment', undefined, 300),
  cue('warm_up', 2, 'Breath Awareness', 'Without changing anything, simply notice the breath. Where do you feel it most vividly? Nostrils, chest, or belly?', 'breath', 5, 60),
  cue('hip_openers', 3, 'Reclined Butterfly', 'Soles of the feet together, knees fall open. Place blocks or blankets under the knees for support. Arms rest by your sides.', 'alignment', undefined, 300),
  cue('standing', 4, 'Legs Up the Wall', 'Swing the legs up the wall. Hips as close to the wall as comfortable. Arms in a T or cactus shape.', 'alignment', undefined, 300),
  cue('seated', 5, 'Supported Seated Forward Fold', 'Sit with legs extended. Place a bolster across the thighs. Drape your torso over the bolster and rest.', 'alignment', undefined, 300),
  cue('cool_down', 6, 'Side-Lying Rest', 'Roll to your right side in a fetal position. Rest the head on the arm. Take a few breaths here before Savasana.', 'transition', 3, 60),
  cue('savasana', 7, 'Supported Savasana', 'Place a bolster under the knees. Cover the eyes with a towel. Arms by your sides, palms up. Stay as long as you like.', 'grounding', undefined, 600),
];

// ---------------------------------------------------------------------------
// Meditation content banks
// ---------------------------------------------------------------------------

const GROUNDING_MEDITATION: GeneratedMeditation = {
  title: 'Earth Connection Meditation',
  category: 'grounding',
  durationMinutes: 7,
  scriptText: [
    'Find a comfortable seat or lie down. Close your eyes and let the weight of your body settle.',
    'Begin to notice where your body makes contact with the surface beneath you. The backs of the legs, the sitting bones, the palms of the hands.',
    'Imagine roots extending from the base of your spine deep into the earth. With each exhale, they grow longer and wider.',
    'Feel the steady, unshakable support of the ground. You do not need to hold yourself up. The earth is holding you.',
    'Bring your awareness to the breath. Inhale through the nose for four counts. Pause. Exhale through the nose for six counts.',
    'With every inhale, draw in stability and calm. With every exhale, release tension and distraction.',
    'If the mind wanders, notice it without judgment and guide your attention back to the felt sense of gravity.',
    'Begin to deepen the breath. Wiggle the fingers and toes. When you are ready, open the eyes.',
  ].join('\n\n'),
  chunks: [
    chunk('Find a comfortable seat or lie down. Close your eyes and let the weight of your body settle.', 5, 'slow, soft tone'),
    chunk('Begin to notice where your body makes contact with the surface beneath you. The backs of the legs, the sitting bones, the palms of the hands.', 8, 'pause between body parts'),
    chunk('Imagine roots extending from the base of your spine deep into the earth. With each exhale, they grow longer and wider.', 10, 'allow time for visualization'),
    chunk('Feel the steady, unshakable support of the ground. You do not need to hold yourself up. The earth is holding you.', 8),
    chunk('Bring your awareness to the breath. Inhale through the nose for four counts. Pause. Exhale through the nose for six counts.', 15, 'count along silently'),
    chunk('With every inhale, draw in stability and calm. With every exhale, release tension and distraction.', 10),
    chunk('If the mind wanders, notice it without judgment and guide your attention back to the felt sense of gravity.', 8),
    chunk('Begin to deepen the breath. Wiggle the fingers and toes. When you are ready, open the eyes.', 5, 'gradually raise energy'),
  ],
};

const SAVASANA_MEDITATION: GeneratedMeditation = {
  title: 'Savasana Closing Meditation',
  category: 'savasana',
  durationMinutes: 5,
  scriptText: [
    'Allow the body to become completely still. The practice is done. There is nothing left to do.',
    'Let the breath return to its natural rhythm. No need to control it any longer.',
    'Feel the body becoming heavier with each exhale. The muscles of the face soften. The jaw unclenches. The space between the eyebrows smooths.',
    'Release the shoulders away from the ears. Let the arms fall open, palms facing up, a gesture of receiving.',
    'Let go of the sequence, the shapes, the effort. Let go of any thoughts about what comes next.',
    'Rest in the stillness. This moment is enough.',
    'Begin to invite small movements back. A gentle roll of the wrists. A stretch through the fingers and toes.',
    'When you are ready, draw the knees into the chest and roll to your right side. Rest here for a breath before pressing up to a comfortable seat.',
  ].join('\n\n'),
  chunks: [
    chunk('Allow the body to become completely still. The practice is done. There is nothing left to do.', 8, 'whisper-quiet'),
    chunk('Let the breath return to its natural rhythm. No need to control it any longer.', 6),
    chunk('Feel the body becoming heavier with each exhale. The muscles of the face soften. The jaw unclenches. The space between the eyebrows smooths.', 10, 'name each area slowly'),
    chunk('Release the shoulders away from the ears. Let the arms fall open, palms facing up, a gesture of receiving.', 6),
    chunk('Let go of the sequence, the shapes, the effort. Let go of any thoughts about what comes next.', 10, 'long pause after'),
    chunk('Rest in the stillness. This moment is enough.', 15, 'extended silence'),
    chunk('Begin to invite small movements back. A gentle roll of the wrists. A stretch through the fingers and toes.', 8, 'gradually louder'),
    chunk('When you are ready, draw the knees into the chest and roll to your right side. Rest here for a breath before pressing up to a comfortable seat.', 5),
  ],
};

const BREATH_MEDITATION: GeneratedMeditation = {
  title: 'Breath Awareness Practice',
  category: 'breathwork',
  durationMinutes: 6,
  scriptText: [
    'Settle into a position where you can be both alert and relaxed. Sit tall or lie down.',
    'Close the eyes or soften the gaze. Bring your full attention to the breath.',
    'Notice the cool air entering the nostrils on the inhale. Notice the warmth of the air leaving on the exhale.',
    'Begin to count the breath. Inhale for a count of four. Hold gently at the top for two. Exhale for a count of six.',
    'If you lose the count, simply begin again at one. No judgment, just a fresh start.',
    'Now release the counting. Let the breath move at its own pace. Simply observe, like watching waves arrive and retreat on a shore.',
    'Notice the tiny pause at the end of each exhale, that still point before the next inhale arises on its own.',
    'Slowly let your awareness expand outward. Hear the sounds around you. Feel the air on your skin. Open the eyes when you are ready.',
  ].join('\n\n'),
  chunks: [
    chunk('Settle into a position where you can be both alert and relaxed. Sit tall or lie down.', 5),
    chunk('Close the eyes or soften the gaze. Bring your full attention to the breath.', 5),
    chunk('Notice the cool air entering the nostrils on the inhale. Notice the warmth of the air leaving on the exhale.', 8),
    chunk('Begin to count the breath. Inhale for a count of four. Hold gently at the top for two. Exhale for a count of six.', 20, 'count along for 3-4 rounds'),
    chunk('If you lose the count, simply begin again at one. No judgment, just a fresh start.', 5),
    chunk('Now release the counting. Let the breath move at its own pace. Simply observe, like watching waves arrive and retreat on a shore.', 15),
    chunk('Notice the tiny pause at the end of each exhale, that still point before the next inhale arises on its own.', 10),
    chunk('Slowly let your awareness expand outward. Hear the sounds around you. Feel the air on your skin. Open the eyes when you are ready.', 5),
  ],
};

const GENERAL_MEDITATION: GeneratedMeditation = {
  title: 'Mindfulness Meditation',
  category: 'grounding',
  durationMinutes: 5,
  scriptText: [
    'Find a comfortable position. Close the eyes and take three deep, cleansing breaths.',
    'Let the breath settle into its natural rhythm. There is nowhere to go and nothing to fix.',
    'Scan your attention from the crown of the head down to the soles of the feet. Notice any areas of tension and breathe into them.',
    'When thoughts arise, acknowledge them like clouds passing across an open sky. Then return to the breath.',
    'Bring to mind one word that captures what you need right now. Ease, clarity, courage, softness. Let that word rest in the center of your awareness.',
    'Sit with that intention for the next few breaths.',
    'Gently release the word. Return to the simple sensation of breathing.',
    'When you are ready, deepen the breath and slowly open the eyes.',
  ].join('\n\n'),
  chunks: [
    chunk('Find a comfortable position. Close the eyes and take three deep, cleansing breaths.', 10, 'breathe with them'),
    chunk('Let the breath settle into its natural rhythm. There is nowhere to go and nothing to fix.', 6),
    chunk('Scan your attention from the crown of the head down to the soles of the feet. Notice any areas of tension and breathe into them.', 15, 'slow body scan'),
    chunk('When thoughts arise, acknowledge them like clouds passing across an open sky. Then return to the breath.', 8),
    chunk('Bring to mind one word that captures what you need right now. Ease, clarity, courage, softness. Let that word rest in the center of your awareness.', 10),
    chunk('Sit with that intention for the next few breaths.', 15, 'extended silence'),
    chunk('Gently release the word. Return to the simple sensation of breathing.', 8),
    chunk('When you are ready, deepen the breath and slowly open the eyes.', 5),
  ],
};

// ---------------------------------------------------------------------------
// Live-teach suggestion banks
// ---------------------------------------------------------------------------

interface CueSuggestionEntry extends CueSuggestion {
  after?: string[];
  section?: string[];
}

const LIVE_CUE_BANK: CueSuggestionEntry[] = [
  // After Warrior II
  { text: 'Extended Side Angle — front forearm to thigh, top arm reaches overhead. Create one long line from back heel to fingertips.', cueType: 'alignment', confidence: 0.92, reasoning: 'Natural progression from Warrior II that deepens the lateral stretch', after: ['warrior ii', 'virabhadrasana ii'] },
  { text: 'Reverse Warrior — flip the front palm, reach back. Let the back hand slide down the back leg. Open the side body.', cueType: 'alignment', confidence: 0.88, reasoning: 'Common Warrior II variation that creates a backbend through the side body', after: ['warrior ii', 'virabhadrasana ii'] },
  { text: 'Triangle Pose — straighten the front leg, reach forward and tilt. Bottom hand to shin, top arm to sky.', cueType: 'alignment', confidence: 0.85, reasoning: 'Classic standing pose that pairs well after Warrior II', after: ['warrior ii', 'virabhadrasana ii'] },

  // After standing poses
  { text: 'Standing Forward Fold — hinge at the hips, release the crown of the head toward the mat. Bend the knees as needed.', cueType: 'transition', confidence: 0.80, reasoning: 'Grounding transition to reset between standing sequences', after: ['triangle', 'extended side angle', 'warrior i', 'warrior iii'] },
  { text: 'Vinyasa transition — plant the palms, step or hop back to Chaturanga. Inhale Up Dog, exhale Down Dog.', cueType: 'transition', confidence: 0.78, reasoning: 'Standard flow transition to reset and switch sides', after: ['triangle', 'extended side angle', 'warrior i', 'chair'] },

  // Cool-down
  { text: 'Happy Baby — draw the knees wide, grab the outer edges of the feet. Rock gently side to side.', cueType: 'alignment', confidence: 0.85, reasoning: 'Gentle hip and low-back release for the cool-down', section: ['cool_down'] },
  { text: 'Supine Twist — hug the right knee to the chest, guide it across the body to the left. Extend the right arm wide.', cueType: 'alignment', confidence: 0.82, reasoning: 'Spinal release to neutralize before Savasana', section: ['cool_down'] },
  { text: 'Savasana setup — extend the legs long, let the feet fall open. Arms away from the body, palms up. Close the eyes.', cueType: 'grounding', confidence: 0.90, reasoning: 'Transition into final rest', section: ['cool_down'] },

  // Warm-up
  { text: 'Cat/Cow — inhale drop the belly, exhale round the spine. Match each movement to a breath.', cueType: 'breath', confidence: 0.90, reasoning: 'Foundational warm-up that wakes up the spine', section: ['warm_up'] },
  { text: 'Downward-Facing Dog — tuck the toes, lift the hips high. Pedal the feet, shake the head yes and no.', cueType: 'alignment', confidence: 0.88, reasoning: 'Transition from tabletop into first full-body stretch', section: ['warm_up'] },
  { text: 'Child\'s Pose — big toes together, knees wide. Walk the hands forward and let the forehead rest.', cueType: 'grounding', confidence: 0.85, reasoning: 'Centering posture to begin or rest during warm-up', section: ['warm_up'] },

  // Sun salutations
  { text: 'Mountain Pose at the top of the mat. Feet hip-width, arms by your sides. Stand tall, root down through all four corners of the feet.', cueType: 'alignment', confidence: 0.90, reasoning: 'Starting position for Sun Salutation A', section: ['sun_a', 'sun_b'] },
  { text: 'Inhale, sweep the arms overhead, Urdhva Hastasana. Gaze up between the palms.', cueType: 'alignment', confidence: 0.88, reasoning: 'Second movement of Sun Salutation A', section: ['sun_a', 'sun_b'] },
  { text: 'Exhale, fold forward. Uttanasana. Release the head and neck.', cueType: 'alignment', confidence: 0.87, reasoning: 'Forward fold in the Sun Salutation sequence', section: ['sun_a', 'sun_b'] },

  // Default breath/grounding cues
  { text: 'Pause here. Take one full breath cycle — a deep inhale and a slow, complete exhale.', cueType: 'breath', confidence: 0.70, reasoning: 'Moment of stillness between transitions' },
  { text: 'Ground through the feet. Feel the four corners of each foot pressing evenly into the mat.', cueType: 'grounding', confidence: 0.65, reasoning: 'Grounding cue to build awareness between poses' },
];

// ---------------------------------------------------------------------------
// Meditation line suggestion banks
// ---------------------------------------------------------------------------

const MEDITATION_LINE_BANK: Record<string, LineSuggestion[]> = {
  grounding: [
    { text: 'Feel the support of the earth beneath you. It has always been here.', confidence: 0.90, reasoning: 'Reinforces connection to the ground' },
    { text: 'Notice where your body meets the surface you are resting on. Let gravity do its work.', confidence: 0.85, reasoning: 'Somatic awareness of contact points' },
    { text: 'Imagine your body growing heavier, sinking gently into the mat like a stone settling into sand.', confidence: 0.82, reasoning: 'Deepens the sense of grounding through imagery' },
  ],
  savasana: [
    { text: 'Let everything soften. There is nothing to hold, nothing to fix, nothing to become.', confidence: 0.92, reasoning: 'Classic savasana language of release' },
    { text: 'Release any last threads of effort. The practice is complete. You have done enough.', confidence: 0.88, reasoning: 'Affirming closure for the practice' },
    { text: 'Rest in the spaciousness between thoughts. That quiet gap is always available to you.', confidence: 0.80, reasoning: 'Invites awareness of stillness' },
  ],
  body_scan: [
    { text: 'Bring your attention to the left foot. Notice any sensation — warmth, tingling, pressure, or nothing at all.', confidence: 0.88, reasoning: 'Sequential body scan starting from extremities' },
    { text: 'Move your awareness up through the shin, the knee, the thigh. Breathe into each area before moving on.', confidence: 0.85, reasoning: 'Guides the scan upward with breath integration' },
    { text: 'Notice the belly rising and falling. Let it be soft. There is no need to hold it in.', confidence: 0.82, reasoning: 'Common area of held tension' },
  ],
  breathwork: [
    { text: 'Inhale slowly for four counts. One... two... three... four.', confidence: 0.90, pauseSeconds: 6, reasoning: 'Structured breath count for regulation' },
    { text: 'Let the exhale be twice as long as the inhale. This activates your body\'s natural calming response.', confidence: 0.87, reasoning: 'Extended exhale engages the parasympathetic nervous system' },
    { text: 'At the bottom of the exhale, rest in the pause. Do not rush the next breath. Let it arise on its own.', confidence: 0.83, pauseSeconds: 5, reasoning: 'Natural pause awareness between breath cycles' },
  ],
  default: [
    { text: 'Bring your attention back to this moment. Right here, right now.', confidence: 0.75, reasoning: 'General mindfulness anchor' },
    { text: 'If the mind has wandered, that is perfectly natural. Gently guide it back to the breath.', confidence: 0.72, reasoning: 'Non-judgmental redirect for distraction' },
    { text: 'Notice what is present without trying to change it. Simply observe.', confidence: 0.70, reasoning: 'Core mindfulness instruction' },
  ],
};

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export class MockAIRecommendationService implements AIRecommendationService {
  async generateSequenceFromPrompt(
    prompt: string,
    _options?: GenerationOptions,
  ): Promise<GeneratedSequence> {
    await delay();

    if (promptContains(prompt, 'vinyasa', 'flow', 'power')) {
      return {
        title: 'Vinyasa Flow',
        style: 'vinyasa',
        durationMinutes: 45,
        description: 'A dynamic vinyasa flow building from Sun Salutations through standing poses to a grounding cool-down.',
        cues: VINYASA_CUES,
      };
    }

    if (promptContains(prompt, 'restorative', 'yin', 'supported')) {
      return {
        title: 'Restorative Rest',
        style: 'restorative',
        durationMinutes: 60,
        description: 'A deeply restful restorative practice using props for full support in every pose.',
        cues: RESTORATIVE_CUES,
      };
    }

    if (promptContains(prompt, 'gentle', 'morning', 'beginner', 'easy')) {
      return {
        title: 'Gentle Morning Flow',
        style: 'gentle',
        durationMinutes: 30,
        description: 'A soft, accessible flow to wake up the body gently. Great for beginners or low-energy days.',
        cues: GENTLE_CUES,
      };
    }

    // Default: mixed gentle flow
    return {
      title: 'Balanced Flow',
      style: 'mixed',
      durationMinutes: 35,
      description: 'A balanced practice blending gentle movement with grounding holds.',
      cues: GENTLE_CUES,
    };
  }

  async generateMeditationFromPrompt(
    prompt: string,
    _options?: GenerationOptions,
  ): Promise<GeneratedMeditation> {
    await delay();

    if (promptContains(prompt, 'grounding', 'earth', 'root')) {
      return GROUNDING_MEDITATION;
    }

    if (promptContains(prompt, 'savasana', 'closing', 'rest', 'final')) {
      return SAVASANA_MEDITATION;
    }

    if (promptContains(prompt, 'breath', 'pranayama', 'inhale', 'exhale')) {
      return BREATH_MEDITATION;
    }

    return GENERAL_MEDITATION;
  }

  async improveSequence(
    _sequenceId: string,
    _options?: GenerationOptions,
  ): Promise<CueSuggestion[]> {
    await delay();

    return [
      {
        text: 'Add a hip opener like Lizard Pose or Low Lunge before Pigeon to prepare the hip joint.',
        cueType: 'alignment',
        confidence: 0.88,
        reasoning: 'The transition into Pigeon is abrupt without a preparatory hip opener.',
      },
      {
        text: 'Consider holding Triangle Pose for five breaths instead of three to build endurance and focus.',
        cueType: 'alignment',
        confidence: 0.80,
        reasoning: 'Longer holds in standing poses deepen the experience for intermediate practitioners.',
      },
      {
        text: 'Insert a grounding breath cue between the standing pose series and the balance poses.',
        cueType: 'breath',
        confidence: 0.85,
        reasoning: 'A pause helps students recenter before balance work, improving stability.',
      },
      {
        text: 'Add a neck release (ear to shoulder, both sides) in the cool-down before Savasana.',
        cueType: 'alignment',
        confidence: 0.75,
        reasoning: 'Many students carry tension in the neck and shoulders throughout the practice.',
      },
    ];
  }

  async improveMeditation(
    _scriptId: string,
    _options?: GenerationOptions,
  ): Promise<LineSuggestion[]> {
    await delay();

    return [
      {
        text: 'Add a longer pause (10-15 seconds of silence) after the body scan section to let awareness settle.',
        confidence: 0.87,
        pauseSeconds: 12,
        reasoning: 'The transition from active scanning to passive rest needs more space.',
      },
      {
        text: 'Soften the language in the third section. Replace "Focus your attention" with "Gently guide your awareness."',
        confidence: 0.82,
        reasoning: 'Directive language can create tension. Invitational language supports deeper relaxation.',
      },
      {
        text: 'Add a breath cue between the visualization and the return to awareness: "Take three slow breaths here."',
        confidence: 0.80,
        pauseSeconds: 8,
        reasoning: 'Breath cues serve as gentle transitions between meditation phases.',
      },
      {
        text: 'End with an affirmation like "Carry this stillness with you as you move back into your day."',
        confidence: 0.75,
        reasoning: 'A closing intention helps students bridge the practice into daily life.',
      },
    ];
  }

  async getNextCueSuggestions(context: LiveTeachContext): Promise<CueSuggestion[]> {
    await delay();

    const lastCue = context.deliveredCues[context.deliveredCues.length - 1];
    const lastPoseLower = lastCue?.poseName?.toLowerCase() ?? '';
    const section = context.section.toLowerCase();
    const results: CueSuggestion[] = [];

    // First, check for pose-specific follow-ups
    for (const entry of LIVE_CUE_BANK) {
      if (entry.after && entry.after.some((a) => lastPoseLower.includes(a))) {
        results.push({
          text: entry.text,
          cueType: entry.cueType,
          confidence: entry.confidence,
          reasoning: entry.reasoning,
        });
      }
    }

    // Then, check for section-specific suggestions
    if (results.length < 3) {
      for (const entry of LIVE_CUE_BANK) {
        if (
          entry.section &&
          entry.section.some((s) => section.includes(s)) &&
          !results.some((r) => r.text === entry.text)
        ) {
          results.push({
            text: entry.text,
            cueType: entry.cueType,
            confidence: entry.confidence,
            reasoning: entry.reasoning,
          });
        }
      }
    }

    // Fall back to default breath/grounding cues
    if (results.length < 2) {
      const defaults = LIVE_CUE_BANK.filter(
        (e) => !e.after && !e.section,
      );
      for (const d of defaults) {
        if (!results.some((r) => r.text === d.text)) {
          results.push({
            text: d.text,
            cueType: d.cueType,
            confidence: d.confidence,
            reasoning: d.reasoning,
          });
        }
      }
    }

    // Return top 3
    return results.slice(0, 3);
  }

  async getMeditationLineSuggestions(
    context: MeditationContext,
  ): Promise<LineSuggestion[]> {
    await delay();

    const category = context.category.toLowerCase();
    const bank =
      MEDITATION_LINE_BANK[category] ?? MEDITATION_LINE_BANK.default;

    // Return all suggestions from the matching category, plus one default if available
    const suggestions = [...bank];
    if (category !== 'default' && MEDITATION_LINE_BANK.default.length > 0) {
      suggestions.push(pick(MEDITATION_LINE_BANK.default));
    }

    return suggestions.slice(0, 3);
  }
}
