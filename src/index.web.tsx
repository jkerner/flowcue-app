import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// ============================================================
// FlowCue Web Preview
// Self-contained web preview — no native module dependencies
// Brand: "Refined sacred minimalism" — dark-only, candle-lit shala
// ============================================================

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; background: #0E1019; overflow: hidden; }
  #root { height: 100vh; display: flex; align-items: center; justify-content: center; }
  input, textarea { color: #EDE8DF; }
  input::placeholder, textarea::placeholder { color: #5A6A5E; }
`;

// Inject global styles
const styleEl = document.createElement('style');
styleEl.textContent = css;
document.head.appendChild(styleEl);

const colors = {
  primary: '#C4907A',      // Rose Ash — accent
  background: '#1A1F2E',   // Deep Indigo — primary bg
  surface: '#141824',       // Night Slate — cards
  surfaceAlt: '#0E1019',   // Deep Shadow — overlays
  border: '#2A2F3E',       // subtle border
  textPrimary: '#EDE8DF',  // Warm Pearl
  textSecondary: '#7A8C7E', // Muted Sage
  textTertiary: '#5A6A5E', // dimmer sage
  accent: '#D4845A',       // Ember — CTAs, timers
  liveBackground: '#0E1019',
  liveCueText: '#EDE8DF',
  liveCueNext: '#7A8C7E',
  liveCuePrev: '#5A6A5E',
  liveAccent: '#C4907A',
  templateBadge: '#7094AA',
  userOwnedBadge: '#7A8C7E',
  duplicatedBadge: '#C4907A',
  aiGeneratedBadge: '#9B7CB0',
};

// -- Mock Data --
const SEQUENCES = [
  { id: '1', title: '90-Minute Vinyasa', style: 'vinyasa', duration: 90, sourceType: 'template', description: 'Full-spectrum vinyasa with pranayama, standing flow, balance, backbends, and savasana.' },
  { id: '2', title: 'Power Vinyasa with Theme', style: 'power vinyasa', duration: 90, sourceType: 'template', description: 'Stronger flow with theme reading, standing peak arc, and optional inversion.' },
  { id: '3', title: 'Gentle Morning Flow', style: 'gentle', duration: 30, sourceType: 'ai_generated', description: 'A lighter flow for quick morning practice.' },
];

const MEDITATIONS = [
  { id: 'm1', title: 'Opening Grounding', category: 'grounding', duration: 3, sourceType: 'template' },
  { id: 'm2', title: 'Savasana Meditation', category: 'savasana', duration: 4, sourceType: 'template' },
  { id: 'm3', title: 'Body Scan', category: 'body_scan', duration: 10, sourceType: 'template' },
  { id: 'm4', title: 'Breath for Clarity', category: 'breathwork', duration: 10, sourceType: 'template' },
  { id: 'm5', title: 'Receiving & Abundance', category: 'visualization', duration: 11, sourceType: 'template' },
  { id: 'm6', title: 'Trusting the Process', category: 'visualization', duration: 13, sourceType: 'template' },
  { id: 'm7', title: 'Exploring the Self', category: 'self_inquiry', duration: 9, sourceType: 'template' },
  { id: 'm8', title: 'Closing Gratitude', category: 'closing', duration: 3, sourceType: 'template' },
];

const CUES = [
  { section: 'Integration', pose: 'Easy Seat', text: 'Find a comfortable seat. Ground through your sit bones. Close your eyes.', type: 'breath', breaths: 3 },
  { section: 'Integration', pose: 'Cleansing Breaths', text: 'Inhale deeply through the nose, exhale with an open mouth. Three rounds.', type: 'breath', breaths: 3 },
  { section: 'Integration', pose: 'Left Nostril Pranayama', text: 'Close the right nostril. Inhale left for 4, exhale left for 4.', type: 'breath', breaths: 8 },
  { section: 'Warm-Up', pose: "Child's Pose", text: 'Walk your hands forward, melt your heart toward the mat.', type: 'grounding', breaths: 5 },
  { section: 'Warm-Up', pose: 'Cat/Cow', text: 'Inhale drop the belly, lift the gaze. Exhale round the spine.', type: 'breath', breaths: 5 },
  { section: 'Warm-Up', pose: 'Down Dog', text: 'Tuck the toes, lift the hips high and back. Pedal out the feet.', type: 'alignment', breaths: 5 },
  { section: 'Warm-Up', pose: 'High Plank', text: 'Shift forward, stack shoulders over wrists. Firm your core.', type: 'alignment', breaths: 3 },
  { section: 'Warm-Up', pose: 'Cobra', text: 'Lower all the way down. Inhale, peel the chest forward and up.', type: 'alignment', breaths: 3 },
  { section: 'Warm-Up', pose: 'Ragdoll', text: 'Walk feet to top of mat. Grab opposite elbows, sway gently.', type: 'grounding', breaths: 5 },
  { section: 'Sun A', pose: 'Mountain Pose', text: 'Rise to stand. Feet hip-width, arms by your sides. Root down.', type: 'alignment', breaths: 2 },
  { section: 'Sun A', pose: 'Sun A Round 1', text: 'Inhale sweep arms up. Exhale fold. Inhale halfway lift. Exhale step back, lower, cobra. Down Dog.', type: 'transition', breaths: 5 },
  { section: 'Sun A', pose: 'Sun A Round 2', text: 'Inhale reach up. Exhale fold. Inhale lengthen. Move with your breath.', type: 'transition', breaths: 5 },
  { section: 'Sun A', pose: 'Sun A Round 3', text: 'One more round. Find your rhythm. Let the breath lead.', type: 'transition', breaths: 5 },
  { section: 'Standing', pose: 'Chair Pose', text: 'Bend the knees, sit the hips back. Arms reach high.', type: 'alignment', breaths: 5 },
  { section: 'Standing', pose: 'Chair Twist R', text: 'Palms to heart. Hook left elbow outside right knee.', type: 'alignment', breaths: 3 },
  { section: 'Standing', pose: 'Warrior I', text: 'Step the left foot back. Bend the front knee. Arms sweep up.', type: 'alignment', breaths: 5 },
  { section: 'Standing', pose: 'Warrior II', text: 'Open the hips and arms to the side. Gaze over front fingertips.', type: 'alignment', breaths: 5 },
  { section: 'Standing', pose: 'Reverse Warrior', text: 'Flip the front palm, lean back. Keep the front knee bent.', type: 'alignment', breaths: 3 },
  { section: 'Standing', pose: 'Vinyasa', text: 'Cartwheel hands down. Step back, lower, cobra, Down Dog.', type: 'transition', breaths: 3 },
  { section: 'Balance', pose: 'Eagle', text: 'Cross right thigh over left. Wrap the arms, right under left.', type: 'alignment', breaths: 5 },
  { section: 'Balance', pose: 'Standing Figure Four', text: 'Bend the standing leg. Cross right ankle over left knee.', type: 'alignment', breaths: 5 },
  { section: 'Balance', pose: 'Tree', text: 'Right foot to inner calf or thigh. Find your drishti.', type: 'alignment', breaths: 5 },
  { section: 'Balance', pose: 'Half Moon', text: 'Shift weight forward. Lift the back leg. Open the hip.', type: 'alignment', breaths: 5 },
  { section: 'Peak', pose: 'Triangle', text: 'Extend forward, tip the torso. Bottom hand to shin or block.', type: 'alignment', breaths: 5 },
  { section: 'Peak', pose: 'Wide-Leg Fold', text: 'Step wide. Hands to hips, hinge forward. Crown toward the floor.', type: 'alignment', breaths: 5 },
  { section: 'Backbends', pose: 'Locust', text: 'Lie on your belly. Arms alongside. Inhale, lift everything.', type: 'alignment', breaths: 3 },
  { section: 'Backbends', pose: 'Bow Pose', text: 'Bend the knees, reach back for ankles. Inhale, kick and lift.', type: 'alignment', breaths: 5 },
  { section: 'Seated', pose: 'Seated Forward Fold', text: 'Legs long. Fold forward over the legs. Let gravity do the work.', type: 'alignment', breaths: 8 },
  { section: 'Seated', pose: 'Pigeon R', text: 'Right shin forward. Square the hips. Fold.', type: 'alignment', breaths: 8 },
  { section: 'Cool Down', pose: 'Bridge', text: 'Feet hip-width, lift the hips. Interlace hands beneath you.', type: 'alignment', breaths: 5 },
  { section: 'Cool Down', pose: 'Happy Baby', text: 'Draw knees wide. Grab outer edges of feet. Rock side to side.', type: 'grounding', breaths: 5 },
  { section: 'Cool Down', pose: 'Supine Twist', text: 'Drop both knees to the right. Open the left arm wide.', type: 'grounding', breaths: 8 },
  { section: 'Savasana', pose: 'Savasana', text: 'Extend your legs long. Arms by your sides, palms up. Close your eyes.', type: 'meditation', breaths: 0 },
  { section: 'Savasana', pose: 'Rest', text: 'There is nothing to do. Nowhere to be. Just rest.', type: 'meditation', breaths: 0 },
  { section: 'Savasana', pose: 'Close', text: 'Deepen the breath. Wiggle fingers and toes. Roll to your right side.', type: 'grounding', breaths: 3 },
];

const MED_CHUNKS = [
  { text: 'Find a comfortable seat. Place your hands gently on your thighs, palms facing down.', pause: 3 },
  { text: 'Lengthen through the spine. Imagine a thread pulling you gently upward from the crown of the head.', pause: 3 },
  { text: 'Inhale slowly through the nose. Exhale through the mouth with a soft sigh.', pause: 4 },
  { text: 'Feel the support beneath you \u2014 the ground, the mat, the earth holding you up.', pause: 5 },
  { text: 'Imagine roots extending down from your sit bones, anchoring you into the earth.', pause: 5 },
  { text: 'Choose a single intention for this practice. Perhaps ease. Perhaps presence. Perhaps curiosity.', pause: 6 },
  { text: 'Hold that intention gently, like something precious in your open palms.', pause: 4 },
  { text: 'Carry it with you as we begin.', pause: 3 },
];

const AI_SUGGESTIONS = [
  { text: 'Try Extended Side Angle \u2014 opens the side body after Warrior II', kind: 'next_cue', confidence: 0.92 },
  { text: 'Add a breath cue: "Inhale length, exhale depth"', kind: 'transition', confidence: 0.85 },
  { text: 'Consider Triangle to continue the lateral opening', kind: 'next_cue', confidence: 0.78 },
];

// -- Helpers --
const badge = (type: string) => {
  const map: Record<string, { bg: string; label: string }> = {
    template: { bg: colors.templateBadge, label: 'Template' },
    user_owned: { bg: colors.userOwnedBadge, label: 'My Content' },
    duplicated: { bg: colors.duplicatedBadge, label: 'Duplicated' },
    ai_generated: { bg: colors.aiGeneratedBadge, label: 'AI Generated' },
  };
  const c = map[type] || map.template;
  return React.createElement('span', { style: { display: 'inline-block', padding: '2px 8px', borderRadius: 10, backgroundColor: c.bg, color: '#EDE8DF', fontSize: 11, fontWeight: 500 } }, c.label);
};

const cueColor: Record<string, string> = { alignment: '#C4907A', transition: '#D4845A', breath: '#7094AA', meditation: '#9B7CB0', grounding: '#7A8C7E' };
const dot = (type: string) => React.createElement('span', { style: { display: 'inline-block', width: 8, height: 8, borderRadius: 4, backgroundColor: cueColor[type] || '#5A6A5E', marginRight: 6 } });

const card = (style?: React.CSSProperties): React.CSSProperties => ({
  backgroundColor: colors.surface, borderRadius: 12, padding: 14, marginBottom: 10,
  border: '1px solid ' + colors.border, cursor: 'pointer', ...style,
});

const btn = (filled: boolean, extra?: React.CSSProperties): React.CSSProperties => ({
  padding: '10px 20px', borderRadius: 10, border: filled ? 'none' : '1px solid ' + colors.primary,
  backgroundColor: filled ? colors.accent : 'transparent', color: filled ? '#EDE8DF' : colors.primary,
  fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', ...extra,
});

const formatTime = (s: number) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');

// == SCREENS ==

function HomeScreen({ nav }: { nav: (s: string) => void }) {
  const actions = [
    { label: 'New Sequence', icon: '\u270D\uFE0F', s: 'SequenceBuilder' },
    { label: 'New Meditation', icon: '\uD83E\uDDD8', s: 'MeditationBuilder' },
    { label: 'Browse Templates', icon: '\uD83D\uDCDA', s: 'Library' },
    { label: 'AI Drafting', icon: '\u2728', s: 'AIDrafting' },
    { label: 'Start Teaching', icon: '\u25B6\uFE0F', s: 'LiveTeach' },
  ];
  return React.createElement('div', { style: { padding: 20, overflowY: 'auto', height: '100%', backgroundColor: colors.background } },
    React.createElement('h1', { style: { fontSize: 32, fontWeight: 700, color: colors.primary, margin: '0 0 4px 0' } }, 'FlowCue'),
    React.createElement('p', { style: { color: colors.textSecondary, fontSize: 15, margin: '0 0 20px 0' } }, 'Your teaching companion'),
    React.createElement('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 } },
      ...actions.map(a => React.createElement('button', {
        key: a.label, onClick: () => nav(a.s),
        style: { flex: '1 1 45%', padding: '14px 12px', backgroundColor: colors.surface, border: '1px solid ' + colors.border, borderRadius: 12, cursor: 'pointer', textAlign: 'left' as const, fontSize: 14, fontWeight: 500, color: colors.primary, fontFamily: 'inherit' }
      }, a.icon + ' ' + a.label))
    ),
    React.createElement('h3', { style: { fontSize: 16, fontWeight: 600, margin: '0 0 12px 0', color: colors.textPrimary } }, 'Recent Content'),
    ...SEQUENCES.slice(0, 2).map(s => React.createElement('div', { key: s.id, onClick: () => nav('SequenceDetail'), style: card() },
      React.createElement('div', { style: { fontWeight: 600, fontSize: 15, marginBottom: 4, color: colors.textPrimary } }, s.title),
      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: colors.textSecondary } },
        s.style, ' \u2022 ', s.duration + ' min ', badge(s.sourceType))
    ))
  );
}

function LibraryScreen({ nav }: { nav: (s: string) => void }) {
  const [tab, setTab] = useState('sequences');
  const tabs = ['sequences', 'meditations', 'templates'];
  return React.createElement('div', { style: { height: '100%', display: 'flex', flexDirection: 'column' as const, backgroundColor: colors.background } },
    React.createElement('div', { style: { display: 'flex', borderBottom: '1px solid ' + colors.border, backgroundColor: colors.surface } },
      ...tabs.map(t => React.createElement('button', {
        key: t, onClick: () => setTab(t),
        style: { flex: 1, padding: '12px 0', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: tab === t ? 600 : 400, color: tab === t ? colors.primary : colors.textSecondary, borderBottom: tab === t ? '2px solid ' + colors.primary : '2px solid transparent', fontFamily: 'inherit' }
      }, t.charAt(0).toUpperCase() + t.slice(1)))
    ),
    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: 16 } },
      tab === 'sequences' && SEQUENCES.map(s => React.createElement('div', { key: s.id, onClick: () => nav('SequenceDetail'), style: card() },
        React.createElement('div', { style: { fontWeight: 600, fontSize: 15, marginBottom: 4, color: colors.textPrimary } }, s.title),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: colors.textSecondary } }, s.style, ' \u2022 ', s.duration + ' min ', badge(s.sourceType))
      )),
      tab === 'meditations' && MEDITATIONS.map(m => React.createElement('div', { key: m.id, onClick: () => nav('MeditationDetail'), style: card() },
        React.createElement('div', { style: { fontWeight: 600, fontSize: 15, marginBottom: 4, color: colors.textPrimary } }, m.title),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: colors.textSecondary } }, m.category, ' \u2022 ', m.duration + ' min ', badge(m.sourceType))
      )),
      tab === 'templates' && [...SEQUENCES.filter(s => s.sourceType === 'template'), ...MEDITATIONS.filter(m => m.sourceType === 'template')].map((t: any, i) => React.createElement('div', { key: i, style: card({ cursor: 'default' }) },
        React.createElement('div', { style: { fontWeight: 600, fontSize: 15, marginBottom: 4, color: colors.textPrimary } }, t.title),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: colors.textSecondary, marginBottom: 8 } }, (t.style || t.category), ' \u2022 ', t.duration + ' min ', badge('template')),
        React.createElement('button', { style: { ...btn(false), fontSize: 13, padding: '6px 14px' } }, 'Duplicate to My Library')
      ))
    )
  );
}

function SequenceDetailScreen({ nav }: { nav: (s: string) => void }) {
  const seq = SEQUENCES[0];
  const sections = [...new Set(CUES.map(c => c.section))];
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', padding: 16, backgroundColor: colors.background } },
    React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, margin: '0 0 6px 0', color: colors.textPrimary } }, seq.title),
    React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: colors.textSecondary, marginBottom: 8 } }, seq.style, ' \u2022 ', seq.duration + ' min ', badge(seq.sourceType)),
    React.createElement('p', { style: { fontSize: 14, color: colors.textSecondary, lineHeight: 1.5, margin: '0 0 12px 0' } }, seq.description),
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
      React.createElement('button', { onClick: () => nav('LiveTeach'), style: { ...btn(true), flex: 1 } }, 'Start Live Teach'),
      React.createElement('button', { style: btn(false) }, 'Duplicate')
    ),
    ...sections.map(section => React.createElement('div', { key: section, style: { marginBottom: 16 } },
      React.createElement('h4', { style: { fontSize: 13, fontWeight: 600, color: colors.primary, marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: 0.5 } }, section),
      ...CUES.filter(c => c.section === section).map((cue, i) => React.createElement('div', { key: i, style: { backgroundColor: colors.surface, borderRadius: 10, padding: 12, marginBottom: 6, border: '1px solid ' + colors.border } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: 4 } },
          dot(cue.type),
          React.createElement('span', { style: { fontWeight: 600, fontSize: 14, color: colors.textPrimary } }, cue.pose),
          cue.breaths > 0 && React.createElement('span', { style: { marginLeft: 'auto', fontSize: 12, color: colors.textTertiary } }, cue.breaths + ' breaths')
        ),
        React.createElement('p', { style: { fontSize: 13, color: colors.textSecondary, lineHeight: 1.4, margin: 0 } }, cue.text)
      ))
    ))
  );
}

function MeditationDetailScreen({ nav }: { nav: (s: string) => void }) {
  const med = MEDITATIONS[0];
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', padding: 16, backgroundColor: colors.background } },
    React.createElement('h2', { style: { fontSize: 20, fontWeight: 700, margin: '0 0 6px 0', color: colors.textPrimary } }, med.title),
    React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: colors.textSecondary, marginBottom: 12 } }, med.category, ' \u2022 ', med.duration + ' min ', badge(med.sourceType)),
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
      React.createElement('button', { onClick: () => nav('MeditationMode'), style: { ...btn(true), flex: 1 } }, 'Start Meditation Mode'),
      React.createElement('button', { style: btn(false) }, 'Duplicate')
    ),
    React.createElement('h4', { style: { fontSize: 14, fontWeight: 600, marginBottom: 10, color: colors.textPrimary } }, 'Script Preview'),
    ...MED_CHUNKS.map((ch, i) => React.createElement('div', { key: i, style: { backgroundColor: colors.surface, borderRadius: 10, padding: 14, marginBottom: 8, border: '1px solid ' + colors.border } },
      React.createElement('p', { style: { fontSize: 14, lineHeight: 1.6, margin: 0, color: colors.textPrimary } }, ch.text),
      React.createElement('span', { style: { fontSize: 11, color: colors.textTertiary, marginTop: 4, display: 'block' } }, 'pause ' + ch.pause + 's')
    ))
  );
}

function LiveTeachScreen({ nav }: { nav: (s: string) => void }) {
  const [idx, setIdx] = useState(9);
  const [elapsed, setElapsed] = useState(0);
  const [showGround, setShowGround] = useState(false);
  const [showAI, setShowAI] = useState(false);
  useEffect(() => { const t = setInterval(() => setElapsed(e => e + 1), 1000); return () => clearInterval(t); }, []);
  const prev = idx > 0 ? CUES[idx - 1] : null;
  const cur = CUES[idx];
  const next = idx < CUES.length - 1 ? CUES[idx + 1] : null;

  return React.createElement('div', { style: { height: '100%', backgroundColor: colors.liveBackground, display: 'flex', flexDirection: 'column' as const, color: colors.liveCueText, position: 'relative' as const } },
    // Header
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '50px 16px 8px' } },
      React.createElement('button', { onClick: () => nav('Home'), style: { background: 'none', border: 'none', color: colors.liveCueNext, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' } }, '\u2190 Exit'),
      React.createElement('span', { style: { fontSize: 12, color: colors.liveCueNext, textTransform: 'uppercase' as const, letterSpacing: 1 } }, cur?.section),
      React.createElement('span', { style: { fontSize: 14, color: colors.liveAccent, fontVariantNumeric: 'tabular-nums' } }, formatTime(elapsed))
    ),
    // Cues
    React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 24px' } },
      prev && React.createElement('p', { style: { fontSize: 15, color: colors.liveCuePrev, textAlign: 'center' as const, marginBottom: 24, opacity: 0.5 } }, prev.text),
      React.createElement('div', { style: { textAlign: 'center' as const, marginBottom: 24 } },
        React.createElement('p', { style: { fontSize: 13, color: colors.liveAccent, marginBottom: 6, fontWeight: 600 } }, cur?.pose),
        React.createElement('p', { style: { fontSize: 26, fontWeight: 600, lineHeight: 1.4, color: colors.liveCueText } }, cur?.text),
        cur && cur.breaths > 0 && React.createElement('p', { style: { fontSize: 14, color: colors.liveCueNext, marginTop: 8 } }, cur.breaths + ' breaths')
      ),
      next && React.createElement('p', { style: { fontSize: 15, color: colors.liveCueNext, textAlign: 'center' as const, opacity: 0.6 } }, next.text)
    ),
    // Ground Me overlay
    showGround && React.createElement('div', { style: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,12,20,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, zIndex: 10 } },
      React.createElement('div', { style: { textAlign: 'center' as const } },
        React.createElement('p', { style: { fontSize: 24, fontWeight: 600, lineHeight: 1.6, marginBottom: 24, color: colors.liveCueText } }, 'Take a breath.\nFeel your feet on the floor.\nYou are here.'),
        React.createElement('button', { onClick: () => setShowGround(false), style: { padding: '12px 32px', borderRadius: 10, border: '1px solid ' + colors.liveAccent, backgroundColor: 'transparent', color: colors.liveAccent, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' } }, "I'm ready")
      )
    ),
    // AI drawer
    showAI && React.createElement('div', { style: { backgroundColor: colors.surface, borderTop: '1px solid ' + colors.border, padding: 16, maxHeight: 180, overflowY: 'auto' } },
      React.createElement('h4', { style: { fontSize: 13, color: colors.liveCueNext, marginBottom: 8, fontWeight: 600 } }, 'AI Suggestions'),
      ...AI_SUGGESTIONS.map((s, i) => React.createElement('div', { key: i, style: { backgroundColor: colors.liveBackground, borderRadius: 8, padding: 10, marginBottom: 6, border: '1px solid ' + colors.border } },
        React.createElement('p', { style: { fontSize: 13, margin: '0 0 4px 0', color: colors.liveCueText } }, s.text),
        React.createElement('span', { style: { fontSize: 11, color: colors.liveAccent } }, s.kind + ' \u2022 ' + Math.round(s.confidence * 100) + '%')
      ))
    ),
    // Controls
    React.createElement('div', { style: { padding: '12px 16px 28px', display: 'flex', gap: 8, alignItems: 'center' } },
      React.createElement('button', { onClick: () => setIdx(Math.max(0, idx - 1)), style: { flex: 1, padding: '12px 0', borderRadius: 10, border: '1px solid ' + colors.border, backgroundColor: 'transparent', color: colors.liveCueText, fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' } }, '\u2190'),
      React.createElement('button', { onClick: () => setShowGround(true), style: { padding: '10px 14px', borderRadius: 10, border: '1px solid ' + colors.liveAccent, backgroundColor: 'rgba(196,144,122,0.12)', color: colors.liveAccent, fontSize: 12, cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' } }, 'Ground Me'),
      React.createElement('button', { onClick: () => setShowAI(!showAI), style: { padding: '10px 14px', borderRadius: 10, border: '1px solid #9B7CB0', backgroundColor: 'rgba(155,124,176,0.12)', color: '#9B7CB0', fontSize: 12, cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' } }, 'AI'),
      React.createElement('button', { onClick: () => setIdx(Math.min(CUES.length - 1, idx + 1)), style: { flex: 1, padding: '12px 0', borderRadius: 10, border: '1px solid ' + colors.border, backgroundColor: 'transparent', color: colors.liveCueText, fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' } }, '\u2192')
    )
  );
}

function MeditationModeScreen({ nav }: { nav: (s: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => { const t = setInterval(() => setElapsed(e => e + 1), 1000); return () => clearInterval(t); }, []);
  const chunk = MED_CHUNKS[idx];
  const prev = idx > 0 ? MED_CHUNKS[idx - 1] : null;
  const next = idx < MED_CHUNKS.length - 1 ? MED_CHUNKS[idx + 1] : null;

  return React.createElement('div', { style: { height: '100%', backgroundColor: colors.background, display: 'flex', flexDirection: 'column' as const } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '50px 16px 8px' } },
      React.createElement('button', { onClick: () => nav('Home'), style: { background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' } }, '\u2190 Exit'),
      React.createElement('span', { style: { fontSize: 12, color: colors.textTertiary } }, 'Grounding Meditation'),
      React.createElement('span', { style: { fontSize: 14, color: colors.primary, fontVariantNumeric: 'tabular-nums' } }, formatTime(elapsed))
    ),
    React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 28px' } },
      prev && React.createElement('p', { style: { fontSize: 15, color: colors.textSecondary, textAlign: 'center' as const, marginBottom: 32, opacity: 0.4 } }, prev.text),
      React.createElement('p', { style: { fontSize: 22, fontWeight: 500, lineHeight: 1.6, color: colors.textPrimary, textAlign: 'center' as const, marginBottom: 32 } }, chunk?.text),
      next && React.createElement('p', { style: { fontSize: 15, color: colors.textSecondary, textAlign: 'center' as const, opacity: 0.5 } }, next.text)
    ),
    React.createElement('div', { style: { padding: '12px 16px 28px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' } },
      React.createElement('button', { onClick: () => setIdx(Math.max(0, idx - 1)), style: { padding: '12px 24px', borderRadius: 10, border: '1px solid ' + colors.border, backgroundColor: colors.surface, color: colors.textPrimary, fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' } }, '\u2190'),
      React.createElement('span', { style: { fontSize: 13, color: colors.textSecondary, minWidth: 60, textAlign: 'center' as const } }, (idx + 1) + ' / ' + MED_CHUNKS.length),
      React.createElement('button', { onClick: () => setIdx(Math.min(MED_CHUNKS.length - 1, idx + 1)), style: { padding: '12px 24px', borderRadius: 10, border: '1px solid ' + colors.border, backgroundColor: colors.surface, color: colors.textPrimary, fontSize: 18, cursor: 'pointer', fontFamily: 'inherit' } }, '\u2192')
    )
  );
}

function AIDraftingScreen() {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('sequence');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const chips = ['45-min grounding vinyasa', '5-min closing meditation', 'Restorative opener'];
  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(mode === 'sequence'
        ? "Generated: 45-Min Grounding Vinyasa\n\nWarm-Up: Child's Pose \u2192 Cat/Cow \u2192 Down Dog\nSun A: 3 rounds with breath\nStanding: Warrior I \u2192 Warrior II \u2192 Triangle\nBalance: Tree \u2192 Eagle\nCool Down: Pigeon \u2192 Supine Twist\nSavasana: 5 min grounding meditation"
        : "Generated: 5-Minute Closing Meditation\n\nDeepen your breath.\nFeel the weight of your body on the mat.\nNotice what has shifted since you arrived.\nGratitude for this body, this breath.\nCarry this steadiness into your day.");
      setLoading(false);
    }, 1500);
  };
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', padding: 16, backgroundColor: colors.background } },
    React.createElement('div', { style: { display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1px solid ' + colors.border, marginBottom: 16 } },
      ...['sequence', 'meditation'].map(m => React.createElement('button', {
        key: m, onClick: () => { setMode(m); setResult(''); },
        style: { flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', backgroundColor: mode === m ? colors.accent : colors.surface, color: mode === m ? '#EDE8DF' : colors.textSecondary }
      }, m === 'sequence' ? 'Generate Sequence' : 'Generate Meditation'))
    ),
    React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 10 } },
      ...chips.map(c => React.createElement('button', { key: c, onClick: () => setPrompt(c), style: { padding: '6px 12px', borderRadius: 16, border: '1px solid ' + colors.border, backgroundColor: colors.surface, fontSize: 12, color: colors.textSecondary, cursor: 'pointer', fontFamily: 'inherit' } }, c))
    ),
    React.createElement('textarea', { value: prompt, onChange: (e: any) => setPrompt(e.target.value), placeholder: 'Describe the class you want to create...', style: { width: '100%', height: 80, padding: 12, borderRadius: 10, border: '1px solid ' + colors.border, fontSize: 14, resize: 'none' as const, fontFamily: 'inherit', backgroundColor: colors.surface, color: colors.textPrimary, boxSizing: 'border-box' as const } }),
    React.createElement('button', { onClick: generate, disabled: loading || !prompt, style: { ...btn(true), width: '100%', marginTop: 12, marginBottom: 16, opacity: loading || !prompt ? 0.5 : 1 } }, loading ? 'Generating...' : 'Generate'),
    result && React.createElement('div', { style: { backgroundColor: colors.surface, borderRadius: 12, padding: 16, border: '1px solid ' + colors.border } },
      React.createElement('h4', { style: { fontSize: 14, fontWeight: 600, marginBottom: 8, color: colors.textPrimary } }, 'Result'),
      React.createElement('pre', { style: { fontSize: 13, lineHeight: 1.6, color: colors.textSecondary, whiteSpace: 'pre-wrap' as const, fontFamily: 'inherit', margin: 0 } }, result),
      React.createElement('button', { style: { ...btn(true), width: '100%', marginTop: 12 } }, 'Save to Library')
    )
  );
}

function SettingsScreen() {
  const items = [
    { title: 'Audio Configuration', desc: 'Agora audio is not configured. Add your App ID to enable live streaming.', icon: '\uD83D\uDD0A' },
    { title: 'AI Provider', desc: 'Current: Mock AI. Claude API integration coming soon.', icon: '\u2728' },
    { title: 'Offline & Storage', desc: 'All content stored locally. Offline-first architecture.', icon: '\uD83D\uDCF1' },
    { title: 'Developer', desc: 'Reset demo data, clear cache, view logs.', icon: '\uD83D\uDD27' },
    { title: 'About', desc: 'FlowCue v0.1.0 \u2014 Built for yoga teachers, by a yoga teacher.', icon: '\uD83D\uDC9A' },
  ];
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', padding: 16, backgroundColor: colors.background } },
    ...items.map(s => React.createElement('div', { key: s.title, style: card({ cursor: 'default' }) },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 } },
        React.createElement('span', { style: { fontSize: 18 } }, s.icon),
        React.createElement('h4', { style: { fontSize: 15, fontWeight: 600, margin: 0, color: colors.textPrimary } }, s.title)),
      React.createElement('p', { style: { fontSize: 13, color: colors.textSecondary, lineHeight: 1.5, margin: 0 } }, s.desc)
    ))
  );
}

function BuilderScreen({ kind }: { kind: string }) {
  return React.createElement('div', { style: { height: '100%', overflowY: 'auto', padding: 16, backgroundColor: colors.background } },
    React.createElement('div', { style: { marginBottom: 16 } },
      React.createElement('label', { style: { fontSize: 13, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 4 } }, 'Title'),
      React.createElement('input', { placeholder: 'My New ' + kind, style: { width: '100%', padding: 12, borderRadius: 10, border: '1px solid ' + colors.border, fontSize: 15, backgroundColor: colors.surface, color: colors.textPrimary, fontFamily: 'inherit', boxSizing: 'border-box' as const } })
    ),
    React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('label', { style: { fontSize: 13, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 4 } }, kind === 'Sequence' ? 'Style' : 'Category'),
        React.createElement('input', { placeholder: kind === 'Sequence' ? 'vinyasa' : 'grounding', style: { width: '100%', padding: 10, borderRadius: 10, border: '1px solid ' + colors.border, fontSize: 14, backgroundColor: colors.surface, color: colors.textPrimary, fontFamily: 'inherit', boxSizing: 'border-box' as const } })
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('label', { style: { fontSize: 13, fontWeight: 500, color: colors.textSecondary, display: 'block', marginBottom: 4 } }, 'Duration (min)'),
        React.createElement('input', { placeholder: '60', type: 'number', style: { width: '100%', padding: 10, borderRadius: 10, border: '1px solid ' + colors.border, fontSize: 14, backgroundColor: colors.surface, color: colors.textPrimary, fontFamily: 'inherit', boxSizing: 'border-box' as const } })
      )
    ),
    React.createElement('textarea', { placeholder: kind === 'Sequence' ? 'Describe your class...' : 'Write your meditation script here...', style: { width: '100%', height: kind === 'Sequence' ? 60 : 150, padding: 12, borderRadius: 10, border: '1px solid ' + colors.border, fontSize: 14, resize: 'none' as const, fontFamily: 'inherit', backgroundColor: colors.surface, color: colors.textPrimary, boxSizing: 'border-box' as const, marginBottom: 16 } }),
    React.createElement('button', { style: { ...btn(true), width: '100%' } }, 'Save ' + kind)
  );
}

// == APP ==
type Screen = 'Home' | 'Library' | 'SequenceDetail' | 'MeditationDetail' | 'LiveTeach' | 'MeditationMode' | 'AIDrafting' | 'Settings' | 'SequenceBuilder' | 'MeditationBuilder';
const TITLES: Record<Screen, string> = { Home: 'FlowCue', Library: 'Library', SequenceDetail: 'Sequence', MeditationDetail: 'Meditation', LiveTeach: '', MeditationMode: '', AIDrafting: 'AI Drafting', Settings: 'Settings', SequenceBuilder: 'Build Sequence', MeditationBuilder: 'Build Meditation' };
const IMMERSIVE: Screen[] = ['Home', 'LiveTeach', 'MeditationMode'];

function App() {
  const [history, setHistory] = useState<{ screen: Screen }[]>([{ screen: 'Home' }]);
  const current = history[history.length - 1].screen;
  const nav = (s: string) => setHistory(h => [...h, { screen: s as Screen }]);
  const back = () => setHistory(h => h.length > 1 ? h.slice(0, -1) : h);

  const screen = (() => {
    switch (current) {
      case 'Home': return React.createElement(HomeScreen, { nav });
      case 'Library': return React.createElement(LibraryScreen, { nav });
      case 'SequenceDetail': return React.createElement(SequenceDetailScreen, { nav });
      case 'MeditationDetail': return React.createElement(MeditationDetailScreen, { nav });
      case 'LiveTeach': return React.createElement(LiveTeachScreen, { nav });
      case 'MeditationMode': return React.createElement(MeditationModeScreen, { nav });
      case 'AIDrafting': return React.createElement(AIDraftingScreen);
      case 'Settings': return React.createElement(SettingsScreen);
      case 'SequenceBuilder': return React.createElement(BuilderScreen, { kind: 'Sequence' });
      case 'MeditationBuilder': return React.createElement(BuilderScreen, { kind: 'Meditation' });
    }
  })();

  const showHeader = !IMMERSIVE.includes(current);
  const showTabs = !['LiveTeach', 'MeditationMode'].includes(current);
  const tabItems: { screen: Screen; icon: string; label: string }[] = [
    { screen: 'Home', icon: '\uD83C\uDFE0', label: 'Home' },
    { screen: 'Library', icon: '\uD83D\uDCDA', label: 'Library' },
    { screen: 'AIDrafting', icon: '\u2728', label: 'AI' },
    { screen: 'Settings', icon: '\u2699\uFE0F', label: 'Settings' },
  ];

  return React.createElement('div', { style: { width: 390, height: 844, backgroundColor: colors.background, borderRadius: 40, overflow: 'hidden', border: '6px solid ' + colors.surfaceAlt, display: 'flex', flexDirection: 'column' as const, boxShadow: '0 10px 40px rgba(0,0,0,0.5)' } },
    showHeader && React.createElement('div', { style: { display: 'flex', alignItems: 'center', padding: '50px 16px 10px', backgroundColor: colors.background, borderBottom: '1px solid ' + colors.border, minHeight: 44 } },
      history.length > 1 ? React.createElement('button', { onClick: back, style: { background: 'none', border: 'none', color: colors.primary, cursor: 'pointer', fontSize: 14, fontWeight: 500, marginRight: 8, fontFamily: 'inherit' } }, '\u2190 Back') : React.createElement('div', { style: { width: 50 } }),
      React.createElement('span', { style: { flex: 1, textAlign: 'center' as const, fontSize: 17, fontWeight: 600, color: colors.textPrimary } }, TITLES[current]),
      React.createElement('div', { style: { width: 50 } })
    ),
    React.createElement('div', { style: { flex: 1, overflow: 'hidden' } }, screen),
    showTabs && React.createElement('div', { style: { display: 'flex', borderTop: '1px solid ' + colors.border, backgroundColor: colors.surface, paddingBottom: 20, paddingTop: 8 } },
      ...tabItems.map(tab => React.createElement('button', {
        key: tab.screen, onClick: () => setHistory([{ screen: tab.screen }]),
        style: { flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }
      },
        React.createElement('span', { style: { fontSize: 20 } }, tab.icon),
        React.createElement('span', { style: { fontSize: 11, color: current === tab.screen ? colors.primary : colors.textSecondary, fontWeight: current === tab.screen ? 600 : 400 } }, tab.label)
      ))
    )
  );
}

// -- Mount --
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(React.createElement(App));
