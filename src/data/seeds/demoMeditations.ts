import type { MeditationCategory, SourceType } from '../../types/domain';
import type { MeditationChunk } from '../../types/domain';

export interface SeedMeditation {
  title: string;
  category: MeditationCategory;
  durationMinutes: number;
  sourceType: SourceType;
  scriptText: string;
  chunks: MeditationChunk[];
}

// ---------------------------------------------------------------------------
// A. Opening Grounding Meditation (3 min)
// ---------------------------------------------------------------------------

const openingGrounding: SeedMeditation = {
  title: 'Opening Grounding Meditation',
  category: 'grounding',
  durationMinutes: 3,
  sourceType: 'template',
  scriptText:
    'Find a comfortable seat. Place your hands gently on your thighs, palms facing down. Lengthen through the spine. Imagine a thread pulling you gently upward from the crown of the head. Inhale slowly through the nose. Exhale through the mouth with a soft sigh. Feel the support beneath you — the ground, the mat, the earth holding you up. Imagine roots extending down from your sit bones, anchoring you into the earth. As you settle, choose a single intention for this practice. Perhaps ease. Perhaps presence. Perhaps curiosity. Hold that intention gently, like something precious in your open palms. Carry it with you as we begin.',
  chunks: [
    { text: 'Find a comfortable seat. Place your hands gently on your thighs, palms facing down.', pauseSeconds: 3 },
    { text: 'Lengthen through the spine. Imagine a thread pulling you gently upward from the crown of the head.', pauseSeconds: 3 },
    { text: 'Inhale slowly through the nose. Exhale through the mouth with a soft sigh.', pauseSeconds: 4 },
    { text: 'Feel the support beneath you — the ground, the mat, the earth holding you up.', pauseSeconds: 5 },
    { text: 'Imagine roots extending down from your sit bones, anchoring you into the earth.', pauseSeconds: 5 },
    { text: 'As you settle, choose a single intention for this practice. Perhaps ease. Perhaps presence. Perhaps curiosity.', pauseSeconds: 6 },
    { text: 'Hold that intention gently, like something precious in your open palms.', pauseSeconds: 4 },
    { text: 'Carry it with you as we begin.', pauseSeconds: 3 },
  ],
};

// ---------------------------------------------------------------------------
// B. Savasana Meditation (4 min)
// ---------------------------------------------------------------------------

const savasanaMeditation: SeedMeditation = {
  title: 'Savasana Meditation',
  category: 'savasana',
  durationMinutes: 4,
  sourceType: 'template',
  scriptText:
    'Begin to settle into the mat. Let your body be heavy. Arms rest by your sides, palms turned gently upward. A posture of receiving. Take one deep breath in... and sigh it all out. Soften the muscles of your face. Release the jaw. Let the tongue rest. Let the shoulders melt away from the ears. Feel them widen and release. Notice the rhythm of your breath like gentle waves — rising and falling without effort. There is nothing to do. Nowhere to go. Just this breath. Just this moment. Rest in the quiet space between your breaths. When you are ready, begin to deepen the breath. There is no rush.',
  chunks: [
    { text: 'Begin to settle into the mat. Let your body be heavy.', pauseSeconds: 4 },
    { text: 'Arms rest by your sides, palms turned gently upward. A posture of receiving.', pauseSeconds: 4 },
    { text: 'Take one deep breath in... and sigh it all out.', pauseSeconds: 5 },
    { text: 'Soften the muscles of your face. Release the jaw. Let the tongue rest.', pauseSeconds: 5 },
    { text: 'Let the shoulders melt away from the ears. Feel them widen and release.', pauseSeconds: 5 },
    { text: 'Notice the rhythm of your breath like gentle waves — rising and falling without effort.', pauseSeconds: 6 },
    { text: 'There is nothing to do. Nowhere to go. Just this breath. Just this moment.', pauseSeconds: 8 },
    { text: 'Rest in the quiet space between your breaths.', pauseSeconds: 10 },
    { text: 'When you are ready, begin to deepen the breath. There is no rush.', pauseSeconds: 5 },
  ],
};

// ---------------------------------------------------------------------------
// C. Body Scan Meditation (10 min)
// ---------------------------------------------------------------------------

const bodyScan: SeedMeditation = {
  title: 'Body Scan Meditation',
  category: 'body_scan',
  durationMinutes: 10,
  sourceType: 'template',
  scriptText:
    'Allow yourself to arrive. There is nothing to fix, nothing to change. Simply notice. Bring your attention to the forehead. If there is tension there, imagine it softening like warm wax. Let the eyes rest behind closed lids. No need to focus on anything. The jaw — often the first place we hold stress. Let it release. Let the lips part slightly. The tongue rests on the floor of the mouth. Feel the shoulders. They may have crept up toward the ears. Invite them to drop. Feel the weight of the arms resting at your sides. The hands are open, fingers gently curled. Notice the chest rising and falling. Each inhale a gift. Each exhale a release. The belly softens with each exhale. Let it be round. Let it be soft. No holding. Feel the hips releasing into the ground beneath you. Heavy. Supported. The legs are heavy. The muscles of the thighs, the calves — they let go. Feel the feet. The toes. The soles of the feet. Everything releasing. Now sense the body as one whole experience. From the crown of the head to the tips of the toes — one connected, breathing, living form. Rest in this wholeness. There is nothing else to do. Begin to return. Notice the sounds around you. Feel the air on your skin. Deepen the breath slowly. There is no rush to move.',
  chunks: [
    { text: 'Allow yourself to arrive. There is nothing to fix, nothing to change. Simply notice.', pauseSeconds: 5 },
    { text: 'Bring your attention to the forehead. If there is tension there, imagine it softening like warm wax.', pauseSeconds: 5 },
    { text: 'Let the eyes rest behind closed lids. No need to focus on anything.', pauseSeconds: 4 },
    { text: 'The jaw — often the first place we hold stress. Let it release. Let the lips part slightly. The tongue rests on the floor of the mouth.', pauseSeconds: 5 },
    { text: 'Feel the shoulders. They may have crept up toward the ears. Invite them to drop.', pauseSeconds: 5 },
    { text: 'Feel the weight of the arms resting at your sides. The hands are open, fingers gently curled.', pauseSeconds: 5 },
    { text: 'Notice the chest rising and falling. Each inhale a gift. Each exhale a release.', pauseSeconds: 6 },
    { text: 'The belly softens with each exhale. Let it be round. Let it be soft. No holding.', pauseSeconds: 5 },
    { text: 'Feel the hips releasing into the ground beneath you. Heavy. Supported.', pauseSeconds: 5 },
    { text: 'The legs are heavy. The muscles of the thighs, the calves — they let go.', pauseSeconds: 5 },
    { text: 'Feel the feet. The toes. The soles of the feet. Everything releasing.', pauseSeconds: 5 },
    { text: 'Now sense the body as one whole experience. From the crown of the head to the tips of the toes — one connected, breathing, living form.', pauseSeconds: 6 },
    { text: 'Rest in this wholeness. There is nothing else to do.', pauseSeconds: 8 },
    { text: 'Begin to return. Notice the sounds around you. Feel the air on your skin. Deepen the breath slowly. There is no rush to move.', pauseSeconds: 5 },
  ],
};

// ---------------------------------------------------------------------------
// D. Breath Practice for Clarity (10 min)
// ---------------------------------------------------------------------------

const breathClarity: SeedMeditation = {
  title: 'Breath Practice for Clarity',
  category: 'breathwork',
  durationMinutes: 10,
  sourceType: 'template',
  scriptText:
    'Begin with the eyes open. Find a focal point — something still and steady in front of you. Notice what is to the right of that point. What is above. What is beneath. What is to the left. Now gently close the eyes. Set a clear intention. What do you want to feel when you leave this mat? On your next inhale, draw the breath up to the space between the brows — your third eye center. Exhale, let it soften down through the heart to the belly. Inhale to the third eye — clarity and vision. Exhale through the heart — compassion and warmth. Down to the belly — grounding and stability. Now reverse: inhale from the belly upward. Feel the energy rise through the body. Breathe in clarity. Breathe out what no longer serves. Continue this rhythm for several rounds. Let the pattern dissolve into natural breath. Rest in the clarity you have created.',
  chunks: [
    { text: 'Begin with the eyes open. Find a focal point — something still and steady in front of you.', pauseSeconds: 4 },
    { text: 'Notice what is to the right of that point. What is above. What is beneath. What is to the left.', pauseSeconds: 5 },
    { text: 'Now gently close the eyes.', pauseSeconds: 3 },
    { text: 'Set a clear intention. What do you want to feel when you leave this mat?', pauseSeconds: 6 },
    { text: 'On your next inhale, draw the breath up to the space between the brows — your third eye center.', pauseSeconds: 5 },
    { text: 'Exhale, let it soften down through the heart to the belly.', pauseSeconds: 5 },
    { text: 'Inhale to the third eye — clarity and vision.', pauseSeconds: 4 },
    { text: 'Exhale through the heart — compassion and warmth.', pauseSeconds: 4 },
    { text: 'Down to the belly — grounding and stability.', pauseSeconds: 4 },
    { text: 'Now reverse: inhale from the belly upward. Feel the energy rise through the body.', pauseSeconds: 5 },
    { text: 'Breathe in clarity. Breathe out what no longer serves.', pauseSeconds: 5 },
    { text: 'Continue this rhythm for several rounds.', pauseSeconds: 8 },
    { text: 'Let the pattern dissolve into natural breath.', pauseSeconds: 5 },
    { text: 'Rest in the clarity you have created.', pauseSeconds: 5 },
  ],
};

// ---------------------------------------------------------------------------
// E. Closing Gratitude Meditation (3 min)
// ---------------------------------------------------------------------------

const closingGratitude: SeedMeditation = {
  title: 'Closing Gratitude Meditation',
  category: 'closing',
  durationMinutes: 3,
  sourceType: 'template',
  scriptText:
    'Begin to deepen the breath. Let each inhale bring a little more awareness back into the body. Wiggle the fingers and toes, awakening gently. Roll gently to one side — whichever side feels right — and rest there for a moment. Notice what has shifted since you arrived on the mat. Something is different, even if you cannot name it. Gratitude for the body that carried you through this practice — every muscle, every breath, every moment of effort and surrender. Gratitude for the breath that anchored you, that stayed constant even when the poses challenged you. Gratitude for the choice to show up. That is always the hardest part, and you did it. Bow the head gently. Carry this steadiness forward into your day.',
  chunks: [
    { text: 'Begin to deepen the breath. Let each inhale bring a little more awareness back into the body.', pauseSeconds: 4 },
    { text: 'Wiggle the fingers and toes, awakening gently.', pauseSeconds: 3 },
    { text: 'Roll gently to one side — whichever side feels right — and rest there for a moment.', pauseSeconds: 5 },
    { text: 'Notice what has shifted since you arrived on the mat. Something is different, even if you cannot name it.', pauseSeconds: 5 },
    { text: 'Gratitude for the body that carried you through this practice — every muscle, every breath, every moment of effort and surrender.', pauseSeconds: 5 },
    { text: 'Gratitude for the breath that anchored you, that stayed constant even when the poses challenged you.', pauseSeconds: 5 },
    { text: 'Gratitude for the choice to show up. That is always the hardest part, and you did it.', pauseSeconds: 4 },
    { text: 'Bow the head gently. Carry this steadiness forward into your day.', pauseSeconds: 3 },
  ],
};

// ---------------------------------------------------------------------------
// F. Receiving & Abundance Meditation (11 min)
// ---------------------------------------------------------------------------

const receivingAbundance: SeedMeditation = {
  title: 'Receiving & Abundance Meditation',
  category: 'visualization',
  durationMinutes: 11,
  sourceType: 'template',
  scriptText:
    'Turn your palms upward in your lap or on your knees. This is a posture of receiving — an open invitation. Close the right nostril with your right thumb. Breathe in through the left nostril slowly for a count of 4. Exhale through the left for a count of 6. Left nostril breathing is cooling, calming, receptive. Continue for a few rounds. Now release the hand and breathe naturally. Bring your attention to the crown of the head. Silently say: I receive. Move down to the forehead: I receive. The throat: I receive. The heart: I receive. The belly: I receive. The hips: I receive. The soles of the feet: I receive. You are worthy of rest. You are worthy of abundance. You are worthy of ease. Prosperity is not just financial — it is fullness of life. It is time well spent, love freely given, presence without distraction. Imagine blocks of golden energy sinking gently from your body into the earth — old beliefs about scarcity, unworthiness, not-enoughness. Let the earth take them. Sit with the feeling of already having enough. Not needing this moment to be anything other than what it is. You are full. You are held. You are enough.',
  chunks: [
    { text: 'Turn your palms upward in your lap or on your knees. This is a posture of receiving — an open invitation.', pauseSeconds: 4 },
    { text: 'Close the right nostril with your right thumb. Breathe in through the left nostril slowly for a count of 4. Exhale through the left for a count of 6.', pauseSeconds: 6 },
    { text: 'Left nostril breathing is cooling, calming, receptive. Continue for a few rounds.', pauseSeconds: 8 },
    { text: 'Now release the hand and breathe naturally.', pauseSeconds: 4 },
    { text: 'Bring your attention to the crown of the head. Silently say: I receive. Move down to the forehead: I receive. The throat: I receive. The heart: I receive. The belly: I receive. The hips: I receive. The soles of the feet: I receive.', pauseSeconds: 10 },
    { text: 'You are worthy of rest. You are worthy of abundance. You are worthy of ease.', pauseSeconds: 6 },
    { text: 'Prosperity is not just financial — it is fullness of life. It is time well spent, love freely given, presence without distraction.', pauseSeconds: 6 },
    { text: 'Imagine blocks of golden energy sinking gently from your body into the earth — old beliefs about scarcity, unworthiness, not-enoughness. Let the earth take them.', pauseSeconds: 8 },
    { text: 'Sit with the feeling of already having enough. Not needing this moment to be anything other than what it is.', pauseSeconds: 8 },
    { text: 'You are full. You are held. You are enough.', pauseSeconds: 5 },
  ],
};

// ---------------------------------------------------------------------------
// G. Trusting the Process Heart Visualization (13 min)
// ---------------------------------------------------------------------------

const trustingProcess: SeedMeditation = {
  title: 'Trusting the Process Heart Visualization',
  category: 'visualization',
  durationMinutes: 13,
  sourceType: 'template',
  scriptText:
    'Place one hand on the belly and one on the heart. Begin with belly breathing — feel the hand rise and fall. Now expand the breath into the ribs. Feel them widen like an accordion. Let the breath fill all the way up into the chest, lifting the heart hand slightly. Root down through the sit bones into the earth. Feel yourself held. Imagine energy rising from the earth through the base of the spine, up through the belly, the heart, the throat, the crown — and out into the sky above. Visualize a warm, rose-gold light at the center of your heart. With each breath, it grows. It is warm. It is steady. It is yours. See your life unfolding in front of you — career aligned with purpose, relationships nourishing and real, health vibrant, creativity flowing. You do not need to know the how. Invite trust: I trust the timing. I trust the process. I trust myself. Possibility is not naive — it is brave. It takes courage to believe that things can be good. Let the rose-gold light pulse with that courage. Feel it in your chest. Feel it in your belly. Feel it in your bones. Now gently draw the light back to the center of the heart. Seal it in with three slow breaths. This trust lives in you now. It goes where you go.',
  chunks: [
    { text: 'Place one hand on the belly and one on the heart. Begin with belly breathing — feel the hand rise and fall.', pauseSeconds: 5 },
    { text: 'Now expand the breath into the ribs. Feel them widen like an accordion.', pauseSeconds: 5 },
    { text: 'Let the breath fill all the way up into the chest, lifting the heart hand slightly.', pauseSeconds: 5 },
    { text: 'Root down through the sit bones into the earth. Feel yourself held.', pauseSeconds: 5 },
    { text: 'Imagine energy rising from the earth through the base of the spine, up through the belly, the heart, the throat, the crown — and out into the sky above.', pauseSeconds: 8 },
    { text: 'Visualize a warm, rose-gold light at the center of your heart. With each breath, it grows. It is warm. It is steady. It is yours.', pauseSeconds: 8 },
    { text: 'See your life unfolding in front of you — career aligned with purpose, relationships nourishing and real, health vibrant, creativity flowing.', pauseSeconds: 8 },
    { text: 'You do not need to know the how.', pauseSeconds: 4 },
    { text: 'Invite trust: I trust the timing. I trust the process. I trust myself.', pauseSeconds: 6 },
    { text: 'Possibility is not naive — it is brave. It takes courage to believe that things can be good.', pauseSeconds: 6 },
    { text: 'Let the rose-gold light pulse with that courage. Feel it in your chest. Feel it in your belly. Feel it in your bones.', pauseSeconds: 8 },
    { text: 'Now gently draw the light back to the center of the heart. Seal it in with three slow breaths.', pauseSeconds: 8 },
    { text: 'This trust lives in you now. It goes where you go.', pauseSeconds: 5 },
  ],
};

// ---------------------------------------------------------------------------
// H. Exploring the Self (9 min)
// ---------------------------------------------------------------------------

const exploringSelf: SeedMeditation = {
  title: 'Exploring the Self',
  category: 'self_inquiry',
  durationMinutes: 9,
  sourceType: 'template',
  scriptText:
    'Trust the process of turning inward. It takes practice to sit with yourself — and that is exactly what this is. Practice. Begin with a body scan. Start at the crown of the head and move slowly down. What do you notice? Not what you think you should notice — what do you actually feel? How are you showing up today, honestly? Not the version you present to the world, but the one sitting here right now. What does your body need this week? Not what you think it should need. Listen deeper. What does your mind need? Space? Stimulation? Rest? Permission? What does your soul need? Connection? Solitude? Adventure? Stillness? Visualize meeting those needs. See yourself doing the thing — resting, creating, reaching out, pulling back. See it clearly. Carry this awareness forward. You have asked the questions. The answers will continue to arrive.',
  chunks: [
    { text: 'Trust the process of turning inward. It takes practice to sit with yourself — and that is exactly what this is. Practice.', pauseSeconds: 5 },
    { text: 'Begin with a body scan. Start at the crown of the head and move slowly down. What do you notice?', pauseSeconds: 6 },
    { text: 'Not what you think you should notice — what do you actually feel?', pauseSeconds: 5 },
    { text: 'How are you showing up today, honestly? Not the version you present to the world, but the one sitting here right now.', pauseSeconds: 6 },
    { text: 'What does your body need this week? Not what you think it should need. Listen deeper.', pauseSeconds: 6 },
    { text: 'What does your mind need? Space? Stimulation? Rest? Permission?', pauseSeconds: 6 },
    { text: 'What does your soul need? Connection? Solitude? Adventure? Stillness?', pauseSeconds: 6 },
    { text: 'Visualize meeting those needs. See yourself doing the thing — resting, creating, reaching out, pulling back. See it clearly.', pauseSeconds: 8 },
    { text: 'Carry this awareness forward. You have asked the questions. The answers will continue to arrive.', pauseSeconds: 5 },
  ],
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const demoMeditations: SeedMeditation[] = [
  openingGrounding,
  savasanaMeditation,
  bodyScan,
  breathClarity,
  closingGratitude,
  receivingAbundance,
  trustingProcess,
  exploringSelf,
];
