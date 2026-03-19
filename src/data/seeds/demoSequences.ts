import type { SourceType, CueType, SequenceSection } from '../../types/domain';

export interface SeedCue {
  section: SequenceSection;
  orderIndex: number;
  poseName: string;
  cueText: string;
  breathCount: number;
  durationSeconds: number;
  cueType: CueType;
  notes?: string;
}

export interface SeedSequence {
  title: string;
  style: string;
  durationMinutes: number;
  description: string;
  sourceType: SourceType;
  isFavorite: boolean;
  cues: SeedCue[];
}

// ---------------------------------------------------------------------------
// A. FlowCue Template: 90-Minute Vinyasa
// ---------------------------------------------------------------------------

const vinyasa90Cues: SeedCue[] = [
  // --- integration ---
  { section: 'integration', orderIndex: 0, poseName: 'Easy Seat / Seated Rock Pose', cueText: 'Find a comfortable seat. Ground through your sit bones. Close your eyes.', breathCount: 3, durationSeconds: 30, cueType: 'breath' },
  { section: 'integration', orderIndex: 1, poseName: '3 Cleansing Breaths', cueText: 'Inhale deeply through the nose, exhale with an open mouth. Three rounds.', breathCount: 3, durationSeconds: 30, cueType: 'breath' },
  { section: 'integration', orderIndex: 2, poseName: 'Left Nostril Pranayama', cueText: 'Close the right nostril with your thumb. Inhale left for 4, exhale left for 4. Continue for 2 minutes.', breathCount: 8, durationSeconds: 120, cueType: 'breath' },

  // --- warm_up ---
  { section: 'warm_up', orderIndex: 3, poseName: "Child's Pose", cueText: 'Walk your hands forward, melt your heart toward the mat. Rest your forehead down.', breathCount: 5, durationSeconds: 45, cueType: 'grounding' },
  { section: 'warm_up', orderIndex: 4, poseName: 'Cat/Cow', cueText: 'Inhale, drop the belly, lift the gaze. Exhale, round the spine, tuck the chin.', breathCount: 5, durationSeconds: 40, cueType: 'breath' },
  { section: 'warm_up', orderIndex: 5, poseName: 'Down Dog', cueText: 'Tuck the toes, lift the hips high and back. Pedal out the feet.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'warm_up', orderIndex: 6, poseName: 'High Plank', cueText: 'Shift forward, stack shoulders over wrists. Firm your core.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'warm_up', orderIndex: 7, poseName: 'Cobra', cueText: 'Lower all the way down. Inhale, peel the chest forward and up.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'warm_up', orderIndex: 8, poseName: 'Down Dog', cueText: 'Press back to Downward-Facing Dog. Settle in.', breathCount: 5, durationSeconds: 40, cueType: 'transition' },
  { section: 'warm_up', orderIndex: 9, poseName: 'Ragdoll', cueText: 'Walk your feet to the top of the mat. Grab opposite elbows, sway.', breathCount: 5, durationSeconds: 40, cueType: 'grounding' },

  // --- sun_a ---
  { section: 'sun_a', orderIndex: 10, poseName: 'Mountain Pose', cueText: 'Rise to stand. Feet hip-width, arms by your sides. Root down through all four corners.', breathCount: 2, durationSeconds: 20, cueType: 'alignment' },
  { section: 'sun_a', orderIndex: 11, poseName: 'Sun A Round 1', cueText: 'Inhale sweep the arms up. Exhale fold forward. Inhale halfway lift. Exhale plant and step back to plank. Lower to cobra. Inhale lift. Exhale Down Dog.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },
  { section: 'sun_a', orderIndex: 12, poseName: 'Sun A Round 2', cueText: 'Inhale reach up. Exhale fold. Inhale lengthen. Exhale step back, lower, cobra. Inhale press up to Down Dog.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },
  { section: 'sun_a', orderIndex: 13, poseName: 'Sun A Round 3', cueText: 'One more round. Move with your breath. Find your rhythm.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },

  // --- standing ---
  { section: 'standing', orderIndex: 14, poseName: 'Chair Pose', cueText: 'From Mountain, bend the knees, sit the hips back. Arms reach high.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 15, poseName: 'Chair Twist Right', cueText: 'Bring palms to heart. Hook left elbow outside right knee.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 16, poseName: 'Chair Twist Left', cueText: 'Back to center. Hook right elbow outside left knee.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 17, poseName: 'Forward Fold', cueText: 'Release the hands down. Straighten the legs as much as feels good.', breathCount: 3, durationSeconds: 25, cueType: 'transition' },
  { section: 'standing', orderIndex: 18, poseName: 'Warrior I Right', cueText: 'Step the left foot back. Bend the front knee. Arms sweep up.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 19, poseName: 'Warrior II Right', cueText: 'Open the hips and arms to the side. Gaze over the front fingertips.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 20, poseName: 'Reverse Warrior Right', cueText: 'Flip the front palm, lean back. Keep the front knee bent.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 21, poseName: 'Vinyasa', cueText: 'Cartwheel the hands down. Step back, lower, cobra or up dog, Down Dog.', breathCount: 3, durationSeconds: 30, cueType: 'transition' },
  { section: 'standing', orderIndex: 22, poseName: 'Warrior I Left', cueText: 'Step the right foot forward. Rise up, arms overhead.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 23, poseName: 'Warrior II Left', cueText: 'Open to the side. Sink into the front knee.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 24, poseName: 'Reverse Warrior Left', cueText: 'Reach back. Breathe length into the side body.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 25, poseName: 'Vinyasa', cueText: 'Flow through your vinyasa. Meet in Down Dog.', breathCount: 3, durationSeconds: 30, cueType: 'transition' },

  // --- balance ---
  { section: 'balance', orderIndex: 26, poseName: 'Knee to Nose Right', cueText: 'From Down Dog, sweep the right leg high. Round and draw knee to nose.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'balance', orderIndex: 27, poseName: 'Low Lunge Twist Right', cueText: 'Step the right foot through. Drop the back knee. Twist toward the front leg.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 28, poseName: 'Extended Side Angle Right', cueText: 'Straighten the back leg. Forearm to thigh or hand to the floor.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 29, poseName: 'Half Moon Right', cueText: 'Shift weight forward. Lift the back leg. Open the hip.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 30, poseName: 'Eagle Right', cueText: 'Step back to Mountain. Cross right thigh over left. Wrap the arms, right under left.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 31, poseName: 'Standing Figure Four Right', cueText: 'Unwind. Bend the standing leg. Cross right ankle over left knee.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 32, poseName: 'Tree Right', cueText: 'Place the right foot to inner calf or thigh. Find your drishti.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 33, poseName: 'Vinyasa to Other Side', cueText: 'Release. Flow through to Down Dog and take the left side.', breathCount: 3, durationSeconds: 30, cueType: 'transition' },
  { section: 'balance', orderIndex: 34, poseName: 'Half Moon Left', cueText: 'Open up through the left side. Stack the hips.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 35, poseName: 'Eagle Left', cueText: 'Left over right. Sink low. Find your balance.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 36, poseName: 'Tree Left', cueText: 'Ground through the right foot. Left foot to calf or thigh.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- peak ---
  { section: 'peak', orderIndex: 37, poseName: 'Pyramid Right', cueText: 'Step the right foot forward, straighten both legs. Fold over the front leg.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 38, poseName: 'Reverse Triangle Right', cueText: 'Open the chest, reach the top arm up and back.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'peak', orderIndex: 39, poseName: 'Triangle Right', cueText: 'Extend forward, tip the torso. Bottom hand to shin or block.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 40, poseName: 'Star Pose', cueText: 'Step wide. Turn toes out slightly. Arms wide, stand tall.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'peak', orderIndex: 41, poseName: 'Wide-Legged Fold', cueText: 'Hands to hips, hinge forward. Crown of the head toward the floor.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 42, poseName: 'Yogi Toe Lock', cueText: 'Peace fingers around big toes. Pull gently, lengthen the spine.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 43, poseName: 'Gorilla Pose', cueText: 'Slide your hands under your feet, palms up. Fold.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 44, poseName: 'Triangle Left', cueText: 'Extend through the left side. Open the chest.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- prone ---
  { section: 'prone', orderIndex: 45, poseName: 'Locust', cueText: 'Lie on your belly. Arms alongside. Inhale, lift everything.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'prone', orderIndex: 46, poseName: 'Bound Locust', cueText: 'Interlace the hands behind your back. Lift and open the chest.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'prone', orderIndex: 47, poseName: 'Bow Pose', cueText: 'Bend the knees, reach back for the ankles. Inhale, kick and lift.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- seated ---
  { section: 'seated', orderIndex: 48, poseName: 'Paschimottanasana', cueText: 'Swing around to sit. Legs long. Fold forward over the legs.', breathCount: 8, durationSeconds: 60, cueType: 'alignment' },
  { section: 'seated', orderIndex: 49, poseName: 'Janu Sirsasana Right', cueText: 'Bend the right knee, sole of foot to inner left thigh. Fold over the left leg.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'seated', orderIndex: 50, poseName: 'Janu Sirsasana Left', cueText: 'Switch sides. Right leg long, left knee bent.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- hip_openers ---
  { section: 'hip_openers', orderIndex: 51, poseName: 'Pigeon Right', cueText: 'From Down Dog, sweep the right shin forward. Square the hips. Fold.', breathCount: 8, durationSeconds: 60, cueType: 'alignment' },
  { section: 'hip_openers', orderIndex: 52, poseName: 'Pigeon Left', cueText: 'Switch sides. Left shin forward.', breathCount: 8, durationSeconds: 60, cueType: 'alignment' },
  { section: 'hip_openers', orderIndex: 53, poseName: 'Bridge Pose', cueText: 'Roll onto your back. Feet hip-width, lift the hips.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- cool_down ---
  { section: 'cool_down', orderIndex: 54, poseName: 'Happy Baby', cueText: 'Draw knees wide. Grab the outer edges of your feet. Rock side to side.', breathCount: 5, durationSeconds: 40, cueType: 'grounding' },
  { section: 'cool_down', orderIndex: 55, poseName: 'Supine Twist Right', cueText: 'Drop both knees to the right. Open the left arm wide.', breathCount: 8, durationSeconds: 60, cueType: 'grounding' },
  { section: 'cool_down', orderIndex: 56, poseName: 'Supine Twist Left', cueText: 'Knees to the left. Right arm reaches.', breathCount: 8, durationSeconds: 60, cueType: 'grounding' },
  { section: 'cool_down', orderIndex: 57, poseName: 'Waterfall', cueText: 'Legs up the wall or toward the sky. Let the blood flow reverse.', breathCount: 10, durationSeconds: 80, cueType: 'grounding' },

  // --- savasana ---
  { section: 'savasana', orderIndex: 58, poseName: 'Savasana Setup', cueText: 'Extend your legs long. Arms by your sides, palms up. Close your eyes.', breathCount: 3, durationSeconds: 25, cueType: 'meditation' },
  { section: 'savasana', orderIndex: 59, poseName: 'Savasana Hold', cueText: 'There is nothing to do. Nowhere to be. Just rest.', breathCount: 0, durationSeconds: 300, cueType: 'meditation' },
  { section: 'savasana', orderIndex: 60, poseName: 'Savasana Close', cueText: 'Begin to deepen the breath. Wiggle fingers and toes. Roll to your right side.', breathCount: 3, durationSeconds: 30, cueType: 'grounding' },
];

// ---------------------------------------------------------------------------
// B. FlowCue Template: Power Vinyasa with Theme
// ---------------------------------------------------------------------------

const powerVinyasaCues: SeedCue[] = [
  // --- integration ---
  { section: 'integration', orderIndex: 0, poseName: 'Seated Centering', cueText: 'Find your seat. Hands on knees. Close the eyes and arrive.', breathCount: 3, durationSeconds: 30, cueType: 'breath' },
  { section: 'integration', orderIndex: 1, poseName: '4-in / 7-out Pranayama', cueText: 'Inhale for a count of 4. Exhale for a count of 7. Let the exhale be twice the effort of the inhale. Continue for 2 minutes.', breathCount: 8, durationSeconds: 120, cueType: 'breath' },
  { section: 'integration', orderIndex: 2, poseName: 'Theme Reading', cueText: 'Today we practice with the theme of resilience. The ability to bend without breaking. Notice where you hold on and where you can release.', breathCount: 3, durationSeconds: 45, cueType: 'meditation' },

  // --- warm_up ---
  { section: 'warm_up', orderIndex: 3, poseName: "Child's Pose", cueText: 'Reach the arms long. Breathe into the back body. Feel the ribs expand with each inhale.', breathCount: 5, durationSeconds: 45, cueType: 'grounding' },
  { section: 'warm_up', orderIndex: 4, poseName: 'Cat/Cow', cueText: 'Move through the full range of the spine. Exaggerate the arch and the round.', breathCount: 5, durationSeconds: 40, cueType: 'breath' },
  { section: 'warm_up', orderIndex: 5, poseName: 'Down Dog', cueText: 'Tuck and lift. Press the mat away. Let the head hang heavy between the arms.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- sun_a ---
  { section: 'sun_a', orderIndex: 6, poseName: 'Sun A Round 1', cueText: 'Inhale arms up. Exhale fold. Inhale halfway. Exhale chaturanga. Inhale up dog. Exhale Down Dog.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },
  { section: 'sun_a', orderIndex: 7, poseName: 'Sun A Round 2', cueText: 'Again. Find the breath-to-movement connection. Let it be seamless.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },
  { section: 'sun_a', orderIndex: 8, poseName: 'Sun A Round 3', cueText: 'Third round. Add intention. Every reach is purposeful.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },

  // --- standing ---
  { section: 'standing', orderIndex: 9, poseName: 'Chair Pose', cueText: 'Sit deep. Weight in the heels. Arms fire up. Engage everything.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 10, poseName: 'Chair Twist Right', cueText: 'Palms together at heart. Left elbow hooks outside right knee. Squeeze.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 11, poseName: 'Chair Twist Left', cueText: 'Switch. Right elbow outside left knee. Keep the knees level.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 12, poseName: 'Warrior I Right', cueText: 'Step back. Left foot grounds at 45 degrees. Bend deep. Arms high.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 13, poseName: 'Warrior II Right', cueText: 'Open wide. Hips square to the side. Front knee tracks over ankle. Gaze forward.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 14, poseName: 'Extended Side Angle Right', cueText: 'Forearm to thigh or hand down. Top arm reaches long. One line of energy.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 15, poseName: 'Reverse Warrior Right', cueText: 'Flip the front palm. Reach back. Breathe into the side body.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 16, poseName: 'Vinyasa', cueText: 'Hands down. Step back, chaturanga, up dog, Down Dog.', breathCount: 3, durationSeconds: 30, cueType: 'transition' },
  { section: 'standing', orderIndex: 17, poseName: 'Warrior I Left', cueText: 'Right foot steps forward. Ground the back foot. Rise strong.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 18, poseName: 'Warrior II Left', cueText: 'Open to Warrior II. Settle in. This is your pose.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 19, poseName: 'Extended Side Angle Left', cueText: 'Lengthen through the left side. Reach and ground simultaneously.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 20, poseName: 'Reverse Warrior Left', cueText: 'Lift and lean. Side body long. Breath expansive.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'standing', orderIndex: 21, poseName: 'Vinyasa', cueText: 'Flow through center. Meet in Down Dog.', breathCount: 3, durationSeconds: 30, cueType: 'transition' },

  // --- balance ---
  { section: 'balance', orderIndex: 22, poseName: 'Standing Split Right', cueText: 'From fold, lift the right leg high. Hands frame the standing foot. Find stillness.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 23, poseName: 'Warrior III Right', cueText: 'Hips level. Arms reach forward or hands at heart. One long line from fingers to toes.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 24, poseName: 'Half Moon Right', cueText: 'Open the hip. Stack. Bottom hand to the floor or block. Top arm lifts.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 25, poseName: 'Vinyasa', cueText: 'Step back and flow. Switch sides.', breathCount: 3, durationSeconds: 30, cueType: 'transition' },
  { section: 'balance', orderIndex: 26, poseName: 'Standing Split Left', cueText: 'Left leg lifts. Fold deep over the right leg.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 27, poseName: 'Warrior III Left', cueText: 'Find your line. Engage the standing leg. Breathe steadily.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'balance', orderIndex: 28, poseName: 'Half Moon Left', cueText: 'Open and expand. Trust the balance.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- peak ---
  { section: 'peak', orderIndex: 29, poseName: 'Pyramid Right', cueText: 'Step the right foot forward. Straighten both legs. Fold with a long spine.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 30, poseName: 'Pyramid to Standing Split Right', cueText: 'Walk the hands forward. Lift the back leg. Flow between the two shapes.', breathCount: 5, durationSeconds: 40, cueType: 'transition' },
  { section: 'peak', orderIndex: 31, poseName: 'Triangle Right', cueText: 'Step back to Triangle. Extend and tip. Find length over depth.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 32, poseName: 'Vinyasa', cueText: 'Through center. Other side.', breathCount: 3, durationSeconds: 30, cueType: 'transition' },
  { section: 'peak', orderIndex: 33, poseName: 'Pyramid Left', cueText: 'Left foot forward. Hinge and fold. Hamstrings release.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'peak', orderIndex: 34, poseName: 'Triangle Left', cueText: 'Open to Triangle. Reach long. Breathe into the spaces.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- prone ---
  { section: 'prone', orderIndex: 35, poseName: 'Locust', cueText: 'Belly down. Arms alongside. Inhale, everything lifts. Exhale, lower.', breathCount: 3, durationSeconds: 25, cueType: 'alignment' },
  { section: 'prone', orderIndex: 36, poseName: 'Bow Pose', cueText: 'Bend knees. Grab ankles. Kick into the hands and lift. Open the chest.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- hip_openers ---
  { section: 'hip_openers', orderIndex: 37, poseName: 'Pigeon Right', cueText: 'Right shin forward. Walk the hands out. Surrender into the hip.', breathCount: 8, durationSeconds: 60, cueType: 'alignment' },
  { section: 'hip_openers', orderIndex: 38, poseName: 'Pigeon Left', cueText: 'Switch. Left shin forward. Let the breath carry you deeper.', breathCount: 8, durationSeconds: 60, cueType: 'alignment' },
  { section: 'hip_openers', orderIndex: 39, poseName: 'Wheel or Bridge', cueText: 'Feet hip-width. Press into the feet and lift. Option for Wheel: hands by ears, press up into the full backbend.', breathCount: 5, durationSeconds: 45, cueType: 'alignment', notes: 'Offer Bridge as the baseline. Wheel for those who want it.' },
  { section: 'hip_openers', orderIndex: 40, poseName: 'Shoulder Stand', cueText: 'Roll onto the back. Lift the legs and hips. Support the low back with hands. Option to extend into Plow, feet over the head.', breathCount: 8, durationSeconds: 60, cueType: 'alignment', notes: 'Offer legs-up-the-wall as an alternative.' },

  // --- cool_down ---
  { section: 'cool_down', orderIndex: 41, poseName: 'Happy Baby', cueText: 'Knees wide. Grab the feet. Rock gently.', breathCount: 5, durationSeconds: 40, cueType: 'grounding' },
  { section: 'cool_down', orderIndex: 42, poseName: 'Supine Twist Right', cueText: 'Both knees fall to the right. Left arm extends. Let gravity do the work.', breathCount: 8, durationSeconds: 60, cueType: 'grounding' },
  { section: 'cool_down', orderIndex: 43, poseName: 'Supine Twist Left', cueText: 'Switch sides. Knees left. Right arm wide. Soften.', breathCount: 8, durationSeconds: 60, cueType: 'grounding' },

  // --- savasana ---
  { section: 'savasana', orderIndex: 44, poseName: 'Savasana Setup', cueText: 'Stretch the legs long. Arms at your sides, palms face up. Let everything go.', breathCount: 3, durationSeconds: 25, cueType: 'meditation' },
  { section: 'savasana', orderIndex: 45, poseName: 'Savasana Hold', cueText: 'Rest completely. The practice has already happened. You have done enough.', breathCount: 0, durationSeconds: 300, cueType: 'meditation' },
  { section: 'savasana', orderIndex: 46, poseName: 'Savasana Close', cueText: 'Deepen the breath. Move the fingers and toes. Roll gently to the right side. Press up to a comfortable seat.', breathCount: 3, durationSeconds: 30, cueType: 'grounding' },
];

// ---------------------------------------------------------------------------
// C. Gentle Morning Flow
// ---------------------------------------------------------------------------

const gentleMorningCues: SeedCue[] = [
  // --- integration ---
  { section: 'integration', orderIndex: 0, poseName: 'Easy Seat', cueText: 'Good morning. Find a comfortable seat. Rest your hands on your thighs and close your eyes.', breathCount: 3, durationSeconds: 30, cueType: 'breath' },
  { section: 'integration', orderIndex: 1, poseName: 'Morning Breath', cueText: 'Take three deep breaths. Inhale through the nose, filling the belly, ribs, chest. Exhale slowly, letting it all go.', breathCount: 3, durationSeconds: 30, cueType: 'breath' },

  // --- warm_up ---
  { section: 'warm_up', orderIndex: 2, poseName: "Child's Pose", cueText: 'Come to hands and knees. Sink the hips back to the heels. Arms reach forward. Rest here.', breathCount: 5, durationSeconds: 45, cueType: 'grounding' },
  { section: 'warm_up', orderIndex: 3, poseName: 'Cat/Cow', cueText: 'Gently begin to move the spine. Inhale, let the belly drop. Exhale, round. Move slowly — no rush.', breathCount: 5, durationSeconds: 40, cueType: 'breath' },
  { section: 'warm_up', orderIndex: 4, poseName: 'Down Dog', cueText: 'Tuck the toes, lift the hips. Keep a generous bend in the knees. Ease into the shape.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- sun_a ---
  { section: 'sun_a', orderIndex: 5, poseName: 'Gentle Sun A Round 1', cueText: 'Walk to the top. Inhale sweep up. Exhale fold. Inhale halfway. Exhale step back to plank, lower to the belly, cobra. Down Dog.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },
  { section: 'sun_a', orderIndex: 6, poseName: 'Gentle Sun A Round 2', cueText: 'One more round at your own pace. Let the breath lead. No need to keep up with anyone.', breathCount: 5, durationSeconds: 60, cueType: 'transition' },

  // --- standing ---
  { section: 'standing', orderIndex: 7, poseName: 'Low Lunge Right', cueText: 'Step the right foot between the hands. Lower the back knee. Inhale, sweep the arms up.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 8, poseName: 'Warrior II Right', cueText: 'Spin the back foot down. Rise to Warrior II. Soft gaze over the front hand.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'standing', orderIndex: 9, poseName: 'Low Lunge Left', cueText: 'Cartwheel down, step back, switch sides. Left foot forward, low lunge.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- seated ---
  { section: 'seated', orderIndex: 10, poseName: 'Seated Forward Fold', cueText: 'Have a seat. Extend the legs. Inhale lengthen, exhale fold. Let the head be heavy.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },
  { section: 'seated', orderIndex: 11, poseName: 'Seated Twist', cueText: 'Bend the right knee. Hug it in. Twist to the right. Then switch. Easy and gentle.', breathCount: 5, durationSeconds: 40, cueType: 'alignment' },

  // --- savasana ---
  { section: 'savasana', orderIndex: 12, poseName: 'Savasana', cueText: 'Lie back. Arms at your sides. Close the eyes. Rest for a few minutes.', breathCount: 0, durationSeconds: 180, cueType: 'meditation' },
  { section: 'savasana', orderIndex: 13, poseName: 'Closing', cueText: 'Gently deepen the breath. Wiggle the fingers and toes. Roll to one side and press up. Carry this calm into your morning.', breathCount: 3, durationSeconds: 30, cueType: 'grounding' },
];

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const demoSequences: SeedSequence[] = [
  {
    title: 'FlowCue Template: 90-Minute Vinyasa',
    style: 'vinyasa',
    durationMinutes: 90,
    description:
      'A full-spectrum vinyasa class moving from grounding pranayama through sun salutations, standing poses, balancing series, peak poses, backbends, hip openers, and a long savasana. Suitable for intermediate to advanced practitioners.',
    sourceType: 'template',
    isFavorite: false,
    cues: vinyasa90Cues,
  },
  {
    title: 'FlowCue Template: Power Vinyasa with Theme',
    style: 'power vinyasa',
    durationMinutes: 90,
    description:
      'An energizing power vinyasa built around the theme of resilience. Features 4-in/7-out pranayama, standing split transitions, Wheel option, and Shoulder Stand/Plow. Designed for strong practitioners ready to explore edges.',
    sourceType: 'template',
    isFavorite: false,
    cues: powerVinyasaCues,
  },
  {
    title: 'Gentle Morning Flow',
    style: 'gentle flow',
    durationMinutes: 30,
    description:
      'A soft, accessible morning flow to wake the body gently. Two sun salutations, light standing work, seated stretches, and a brief savasana. Perfect for all levels.',
    sourceType: 'ai_generated',
    isFavorite: false,
    cues: gentleMorningCues,
  },
];
