# FlowCue — Product & Architecture Planning Document

---

## 1. Product Summary

FlowCue is a mobile teaching companion for yoga instructors, meditation facilitators, and breathwork guides. It provides real-time, karaoke-style cueing so teachers can stay present, confident, and grounded while teaching — without memorizing every line or relying on static notes.

Teachers can build their own sequences and meditations, duplicate and customize starter templates, or use AI assistance to draft content and get live adaptive suggestions during class. The app works offline-first, stores everything locally, and is designed for glanceable, one-handed use mid-class.

FlowCue is a **creator tool for teachers**, not a consumer wellness app for students.

---

## 2. Problem Statement

Yoga and meditation teachers are expected to teach fluidly from memory while simultaneously managing timing, pacing, energy, student needs, class structure, and their own presence. When they blank on a cue, lose their place in a meditation, or fumble a transition, the moment breaks — for them and for the room.

Existing tools fail them:

- **Notes apps** are static, hard to glance at, and not designed for live delivery.
- **Paper notes** get lost, can't adapt, and break flow.
- **Memorization** works until it doesn't — and the failure mode is visible and awkward.
- **No tool exists** that combines sequence building, meditation scripting, live cueing, and AI assistance in a single mobile-first experience purpose-built for teaching.

FlowCue closes this gap by giving teachers a calm, discreet, in-the-moment support system that reduces cognitive load without making them feel robotic or dependent on a script.

---

## 3. User Personas & Jobs to Be Done

### Persona 1: The Experienced Studio Instructor

**Who:** Teaches 8–15 classes per week across multiple styles. Has been teaching for 3+ years.

**Pain:** Repeating the same transitions, going blank during a meditation she's taught 50 times, accidentally skipping a section when tired.

**Jobs to be done:**
- Quickly build and reuse class sequences across styles
- Glance at upcoming cues without losing eye contact with the room
- Get a nudge when she blanks, not a full script to read

### Persona 2: The New Teacher / Trainee

**Who:** Recently completed a 200-hour teacher training. Teaching 1–3 classes per week. Still building confidence.

**Pain:** Anxiety about forgetting cues. Over-scripting classes and then reading from a phone awkwardly. Unsure how to structure sequences.

**Jobs to be done:**
- Start from templates instead of a blank page
- Get AI help drafting a class when stuck
- Have a safety net during class so nerves don't derail the flow

### Persona 3: The Meditation / Breathwork Facilitator

**Who:** Leads guided meditations, breathwork sessions, or sound healing. May not teach physical yoga.

**Pain:** Meditations are heavily scripted. Losing a line mid-meditation breaks the container. Reading from a phone looks unprofessional.

**Jobs to be done:**
- Break meditation scripts into glanceable chunks
- Auto-advance through a script with pacing support
- Get alternative lines suggested if the current one doesn't land

### Persona 4: The Substitute / Traveling Teacher

**Who:** Fills in at studios or teaches workshops in unfamiliar settings. Needs to adapt quickly.

**Pain:** Doesn't know the regular teacher's style. Needs to build something quickly. No time to memorize.

**Jobs to be done:**
- Duplicate a template and customize it for the setting in 10 minutes
- Use AI to generate a sequence from a prompt like "45-minute gentle flow, hip openers, grounding theme"
- Teach confidently from the app without prior rehearsal

---

## 4. Core Product Modes

### Mode 1: Create Your Own

Teachers build sequences or meditations from scratch. This is the manual authoring path.

- Create a sequence → add sections → add cues per section
- Create a meditation → write script → break into paced chunks
- Full control over content, timing, breath counts, modifications, notes
- All content saved locally, owned by the user

### Mode 2: Templates + Duplicate & Modify

The app ships with seeded starter content. Users browse, preview, and duplicate templates into their own library.

- Templates are read-only baseline content
- Duplicating creates a user-owned, editable copy
- Source reference is preserved (`source_type: duplicated`, `source_sequence_id`)
- Duplicated content lives in the user's library and behaves like any user-created content
- Templates cannot be overwritten or deleted by the user

**Architecture note:** This is designed as a foundation for future sharing. The content ownership model supports `template → duplicated → user_owned` lineage. A future marketplace or community sharing feature can extend this without schema changes.

### Mode 3A: AI Drafting / Generative Assist

Used **before class**. Helps teachers generate or refine content.

- Generate a sequence from a natural language prompt
- Generate a meditation script from a prompt
- Improve transitions, tone, or pacing of existing content
- Suggest modifications for accessibility
- Results are always reviewed, edited, and explicitly saved by the teacher

**Key principle:** AI is a collaborator, not an autopublisher. Nothing goes into the library without the teacher's approval.

### Mode 3B: AI Live Adaptive Assist

Used **during class**. Suggests the next likely cue or support prompt based on real-time context.

- Suggests what comes next based on delivered cues, section, elapsed time, and style
- Offers grounding lines, transitions, breath cues, or shorter alternatives
- Accessible via a pull-up drawer in Live Teach Mode
- Includes an emergency "Ground Me" button for instant fallback cues
- Feels like a calm sidekick, not a chatbot interrupting class

**Key principle:** These two AI modes solve fundamentally different problems (prep vs. live), have different latency requirements, different UI surfaces, and different trust models. They must remain separate in the service layer, UI, and product model.

---

## 5. MVP Scope

### In Scope for MVP

| Feature Area | What Ships |
|---|---|
| **Home** | Quick actions, recent content, offline status indicator |
| **Sequence Builder** | Create, edit, reorder. Sections, cues, timing, breath counts, notes, modifications |
| **Meditation Builder** | Create, edit. Chunked script, pacing notes |
| **Content Library** | My Sequences, My Meditations, Templates tab, favorites, search/filter |
| **Template Gallery** | Seeded starter content, preview, duplicate into library |
| **Live Teach Mode** | Karaoke-style cue display (current/next/previous), timer, manual advance, auto-advance toggle, screen wake lock, offline indicator |
| **Meditation Mode** | Chunked display, manual/auto-advance, pacing timer |
| **AI Drafting** | Prompt-based generation for sequences and meditations, tone/style options, edit-before-save |
| **AI Live Assist** | Next-cue suggestions drawer in Live Teach Mode, "Ground Me" button |
| **Settings** | Audio placeholder, AI provider placeholder, offline cache info, theme placeholder, dev seed reset |
| **Offline** | Full offline-first. All content stored locally. App boots and functions without network |

### Not in MVP (see Section 13)

Social sharing, marketplace, multi-device sync, cloud backup, audio playback/recording, student-facing features, analytics dashboard, payment/subscription.

---

## 6. Information Architecture

```
FlowCue
├── Home
│   ├── Quick Actions
│   │   ├── New Sequence
│   │   ├── New Meditation
│   │   ├── Browse Templates
│   │   ├── AI Drafting
│   │   └── Start Live Session
│   ├── Continue Recent
│   └── Offline Status
│
├── Library
│   ├── My Sequences (filterable, searchable)
│   ├── My Meditations (filterable, searchable)
│   ├── Templates
│   │   ├── Sequence Templates
│   │   └── Meditation Templates
│   └── Favorites
│
├── Create / Edit
│   ├── Sequence Builder
│   │   ├── Sequence Metadata (title, style, duration, description)
│   │   ├── Section Manager (add/reorder sections)
│   │   └── Cue Editor (per section: pose, text, breath, timing, notes, mods)
│   └── Meditation Builder
│       ├── Script Metadata (title, category, duration)
│       ├── Chunk Editor (break script into display chunks)
│       └── Pacing Notes
│
├── Live Modes
│   ├── Live Teach Mode (sequences)
│   │   ├── Karaoke Cue Display
│   │   ├── Timer / Progress
│   │   ├── Navigation Controls
│   │   ├── Auto-Advance Toggle
│   │   ├── AI Suggestions Drawer
│   │   └── Ground Me Button
│   └── Meditation Mode (scripts)
│       ├── Chunked Script Display
│       ├── Pacing Timer
│       ├── Navigation Controls
│       ├── Auto-Scroll Toggle
│       └── AI Line Suggestions
│
├── AI Drafting
│   ├── Prompt Input
│   ├── Style / Tone Options
│   ├── Generated Preview
│   ├── Edit Interface
│   └── Save to Library
│
└── Settings
    ├── Audio Setup (placeholder)
    ├── AI Provider (placeholder)
    ├── Offline / Cache
    ├── Theme (placeholder)
    └── Developer (seed reset)
```

---

## 7. Data Model

### sequences

| Column | Type | Notes |
|---|---|---|
| id | string (UUID) | Primary key |
| title | string | Required |
| style | string | e.g., vinyasa, restorative, gentle, yin |
| duration_minutes | integer | Estimated total duration |
| description | string | Optional |
| source_type | enum | `template`, `user_owned`, `duplicated`, `ai_generated` |
| source_sequence_id | string? | FK to original sequence if duplicated |
| is_favorite | boolean | Default false |
| created_at | timestamp | |
| updated_at | timestamp | |

### cues

| Column | Type | Notes |
|---|---|---|
| id | string (UUID) | Primary key |
| sequence_id | string | FK to sequences |
| section | string | e.g., arrival, warm_up, sun_salutations, standing, peak, cool_down, savasana, meditation |
| order_index | integer | Sort order within section |
| pose_name | string? | Optional structured pose reference |
| cue_text | string | The display text shown in Live Teach Mode |
| breath_count | integer? | Number of breaths to hold |
| duration_seconds | integer? | Timed hold duration |
| cue_type | enum | `alignment`, `transition`, `breath`, `meditation`, `modification`, `grounding` |
| notes | string? | Teacher-only notes (not shown in live mode by default) |
| created_at | timestamp | |
| updated_at | timestamp | |

**Index:** `(sequence_id, section, order_index)` — this is the primary query path for live mode.

### meditation_scripts

| Column | Type | Notes |
|---|---|---|
| id | string (UUID) | Primary key |
| title | string | Required |
| category | string | e.g., grounding, body_scan, breathwork, loving_kindness |
| duration_minutes | integer | Estimated duration |
| source_type | enum | `template`, `user_owned`, `duplicated`, `ai_generated` |
| source_script_id | string? | FK to original if duplicated |
| is_favorite | boolean | Default false |
| created_at | timestamp | |
| updated_at | timestamp | |

### meditation_chunks

| Column | Type | Notes |
|---|---|---|
| id | string (UUID) | Primary key |
| script_id | string | FK to meditation_scripts |
| order_index | integer | Sort order |
| chunk_text | string | The display text for this chunk |
| pause_seconds | integer? | Suggested pause after this chunk |
| pacing_note | string? | e.g., "slow down here", "whisper" |
| created_at | timestamp | |
| updated_at | timestamp | |

**Design decision:** The spec listed `script_text` as a single field on `meditation_scripts`. I've broken this into a `meditation_chunks` table because the core UX (chunked display, per-chunk pacing, per-chunk AI suggestions) requires chunk-level granularity. Storing a single blob and parsing it at render time is fragile and limits editing. The `meditation_scripts` table holds metadata; `meditation_chunks` holds the content.

### sessions

| Column | Type | Notes |
|---|---|---|
| id | string (UUID) | Primary key |
| sequence_id | string? | FK to sequences (null if meditation-only) |
| meditation_script_id | string? | FK to meditation_scripts (null if sequence-only) |
| started_at | timestamp | |
| ended_at | timestamp? | Null if in progress |
| mode | enum | `live_teach`, `meditation`, `practice` |
| used_ai | boolean | Whether AI suggestions were requested |
| offline | boolean | Whether the session was offline |
| notes | string? | Post-session teacher notes |

### ai_suggestions

| Column | Type | Notes |
|---|---|---|
| id | string (UUID) | Primary key |
| session_id | string? | FK to sessions (null if from drafting mode) |
| parent_type | enum | `sequence`, `meditation_script`, `cue`, `meditation_chunk` |
| parent_id | string | FK to the parent entity |
| suggestion_text | string | The suggested content |
| suggestion_kind | enum | `next_cue`, `transition`, `grounding`, `breath`, `alternative_line`, `full_sequence`, `full_meditation`, `improvement` |
| context_snapshot_json | string? | Serialized context at time of suggestion (for debugging/training) |
| accepted | boolean | Default false |
| edited_before_save | boolean | Default false |
| created_at | timestamp | |

### Entity Relationship Summary

```
sequences 1──∞ cues
sequences 1──∞ sessions
meditation_scripts 1──∞ meditation_chunks
meditation_scripts 1──∞ sessions
sessions 1──∞ ai_suggestions
sequences ──? sequences (source_sequence_id, self-referencing for duplicates)
meditation_scripts ──? meditation_scripts (source_script_id, self-referencing for duplicates)
```

---

## 8. Service Boundaries

### Repository Layer (Local Data Access)

Repositories abstract WatermelonDB/SQLite access. Screen components never query the database directly.

```
SequenceRepository
├── createSequence(data) → Sequence
├── updateSequence(id, data) → Sequence
├── deleteSequence(id) → void
├── getSequence(id) → Sequence (with cues)
├── listUserSequences(filters?) → Sequence[]
├── listTemplates() → Sequence[]
├── duplicateSequence(id) → Sequence (deep copy with new IDs, source_type: duplicated)
├── toggleFavorite(id) → Sequence
└── searchSequences(query) → Sequence[]

CueRepository
├── createCue(sequenceId, data) → Cue
├── updateCue(id, data) → Cue
├── deleteCue(id) → void
├── reorderCues(sequenceId, section, orderedIds) → void
└── getCuesForSequence(sequenceId) → Cue[] (ordered by section, order_index)

MeditationRepository
├── createMeditation(data) → MeditationScript (with initial chunks)
├── updateMeditation(id, data) → MeditationScript
├── deleteMeditation(id) → void
├── getMeditation(id) → MeditationScript (with chunks)
├── listUserMeditations(filters?) → MeditationScript[]
├── listTemplates() → MeditationScript[]
├── duplicateMeditation(id) → MeditationScript (deep copy)
├── toggleFavorite(id) → MeditationScript
└── searchMeditations(query) → MeditationScript[]

MeditationChunkRepository
├── createChunk(scriptId, data) → MeditationChunk
├── updateChunk(id, data) → MeditationChunk
├── deleteChunk(id) → void
└── reorderChunks(scriptId, orderedIds) → void

SessionRepository
├── startSession(data) → Session
├── endSession(id, notes?) → Session
├── getSession(id) → Session
└── listRecentSessions(limit?) → Session[]

AISuggestionRepository
├── saveSuggestion(data) → AISuggestion
├── markAccepted(id) → AISuggestion
├── saveAsSuggestionAsCue(suggestionId, sequenceId, section, orderIndex) → Cue
├── saveSuggestionAsMeditationChunk(suggestionId, scriptId, orderIndex) → MeditationChunk
└── listSuggestionsForSession(sessionId) → AISuggestion[]
```

### AI Service Layer

Abstract AI provider behind an interface. MVP can use a single provider (Claude API). The abstraction allows swapping providers or running local models later.

```
AIRecommendationService (interface)
│
├── Drafting Methods (before class)
│   ├── generateSequenceFromPrompt(prompt, options) → GeneratedSequence
│   ├── generateMeditationFromPrompt(prompt, options) → GeneratedMeditation
│   ├── improveSequence(sequence, options) → SequenceImprovements
│   └── improveMeditation(script, options) → MeditationImprovements
│
├── Live Assist Methods (during class)
│   ├── getNextCueSuggestions(context: LiveTeachContext) → CueSuggestion[]
│   └── getMeditationLineSuggestions(context: MeditationContext) → LineSuggestion[]
│
└── Shared Types
    ├── LiveTeachContext { currentCueIndex, deliveredCues, section, elapsedTime, style, sequenceMetadata }
    ├── MeditationContext { currentChunkIndex, deliveredChunks, elapsedTime, category, scriptMetadata }
    ├── GenerationOptions { style?, tone?, duration?, level?, focus? }
    └── CueSuggestion { text, cueType, confidence, reasoning? }
```

**Implementation:** `ClaudeAIRecommendationService` implements the interface. A `MockAIRecommendationService` ships for offline/dev use that returns canned suggestions.

### Audio Service Layer

```
AudioService (interface)
├── initialize() → void
├── joinChannel(channelName, token?) → void
├── leaveChannel() → void
├── muteLocalAudio() → void
├── unmuteLocalAudio() → void
├── getConnectionState() → ConnectionState
├── onConnectionStateChange(callback) → unsubscribe
└── destroy() → void
```

**Implementation:** `AgoraAudioService` implements the interface. A `NoopAudioService` ships as default so the app works without audio configuration.

### Seed Service

```
SeedService
├── shouldSeed() → boolean (checks if first launch)
├── runSeed() → void (inserts template sequences, meditations, chunks)
├── resetSeed() → void (developer option: clears and re-seeds)
└── getSeedManifest() → SeedManifest (lists what will be seeded)
```

**Resilience:** Seed failure must not prevent app boot. Wrap in try/catch, log the error, and let the user proceed with an empty library. Surface a non-blocking banner: "Starter templates couldn't be loaded. You can reset them in Settings."

---

## 9. File & Folder Architecture

```
flowcue-app/
├── docs/
│   └── PRODUCT_AND_ARCHITECTURE.md
│
├── src/
│   ├── app/                          # App entry, providers, navigation
│   │   ├── App.tsx
│   │   ├── NavigationContainer.tsx
│   │   └── providers/
│   │       ├── DatabaseProvider.tsx
│   │       └── ServiceProvider.tsx
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── HomeStack.tsx
│   │   ├── LibraryStack.tsx
│   │   ├── LiveStack.tsx
│   │   └── SettingsStack.tsx
│   │
│   ├── screens/
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── library/
│   │   │   ├── LibraryScreen.tsx
│   │   │   ├── SequenceListScreen.tsx
│   │   │   ├── MeditationListScreen.tsx
│   │   │   └── TemplateGalleryScreen.tsx
│   │   ├── builder/
│   │   │   ├── SequenceBuilderScreen.tsx
│   │   │   ├── CueEditorScreen.tsx
│   │   │   ├── MeditationBuilderScreen.tsx
│   │   │   └── ChunkEditorScreen.tsx
│   │   ├── live/
│   │   │   ├── LiveTeachScreen.tsx
│   │   │   └── MeditationModeScreen.tsx
│   │   ├── ai/
│   │   │   └── AIDraftingScreen.tsx
│   │   └── settings/
│   │       └── SettingsScreen.tsx
│   │
│   ├── components/
│   │   ├── shared/                   # Reusable UI primitives
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Typography.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── OfflineIndicator.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── sequence/
│   │   │   ├── SequenceCard.tsx
│   │   │   ├── CueRow.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── CueTypeIcon.tsx
│   │   ├── meditation/
│   │   │   ├── MeditationCard.tsx
│   │   │   └── ChunkDisplay.tsx
│   │   ├── live/
│   │   │   ├── KaraokeCueDisplay.tsx
│   │   │   ├── CueNavigationControls.tsx
│   │   │   ├── SessionTimer.tsx
│   │   │   ├── AutoAdvanceToggle.tsx
│   │   │   ├── AISuggestionsDrawer.tsx
│   │   │   └── GroundMeButton.tsx
│   │   └── ai/
│   │       ├── PromptInput.tsx
│   │       ├── GeneratedPreview.tsx
│   │       └── ToneStylePicker.tsx
│   │
│   ├── domain/                       # Domain models (plain TypeScript)
│   │   ├── Sequence.ts
│   │   ├── Cue.ts
│   │   ├── MeditationScript.ts
│   │   ├── MeditationChunk.ts
│   │   ├── Session.ts
│   │   ├── AISuggestion.ts
│   │   └── enums.ts                  # SourceType, CueType, SuggestionKind, etc.
│   │
│   ├── database/                     # WatermelonDB setup
│   │   ├── schema.ts                 # WatermelonDB schema definition
│   │   ├── migrations.ts
│   │   ├── index.ts                  # Database initialization
│   │   └── models/                   # WatermelonDB Model classes
│   │       ├── SequenceModel.ts
│   │       ├── CueModel.ts
│   │       ├── MeditationScriptModel.ts
│   │       ├── MeditationChunkModel.ts
│   │       ├── SessionModel.ts
│   │       └── AISuggestionModel.ts
│   │
│   ├── repositories/                 # Data access layer
│   │   ├── SequenceRepository.ts
│   │   ├── CueRepository.ts
│   │   ├── MeditationRepository.ts
│   │   ├── MeditationChunkRepository.ts
│   │   ├── SessionRepository.ts
│   │   └── AISuggestionRepository.ts
│   │
│   ├── services/                     # External service abstractions
│   │   ├── ai/
│   │   │   ├── AIRecommendationService.ts          # Interface
│   │   │   ├── ClaudeAIRecommendationService.ts    # Claude implementation
│   │   │   └── MockAIRecommendationService.ts      # Offline/dev mock
│   │   ├── audio/
│   │   │   ├── AudioService.ts                     # Interface
│   │   │   ├── AgoraAudioService.ts                # Agora implementation
│   │   │   └── NoopAudioService.ts                 # Default no-op
│   │   └── seed/
│   │       ├── SeedService.ts
│   │       └── seedData/
│   │           ├── beginnerVinyasa.ts
│   │           ├── restorativeFlow.ts
│   │           ├── gentleMorningFlow.ts
│   │           ├── groundingMeditation.ts
│   │           ├── bodyScanMeditation.ts
│   │           ├── breathworkScript.ts
│   │           └── editableTemplates.ts
│   │
│   ├── store/                        # Zustand stores
│   │   ├── useSequenceStore.ts
│   │   ├── useMeditationStore.ts
│   │   ├── useLiveSessionStore.ts
│   │   ├── useAIDraftingStore.ts
│   │   └── useSettingsStore.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useSequences.ts
│   │   ├── useMeditations.ts
│   │   ├── useLiveTeach.ts
│   │   ├── useMeditationMode.ts
│   │   ├── useAIDrafting.ts
│   │   ├── useAILiveAssist.ts
│   │   ├── useOfflineStatus.ts
│   │   └── useKeepAwake.ts
│   │
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── uuid.ts
│   │   ├── time.ts
│   │   └── validation.ts
│   │
│   └── types/                        # Shared TypeScript types
│       ├── navigation.ts
│       └── ai.ts
│
├── __tests__/
│   ├── repositories/
│   ├── services/
│   ├── screens/
│   └── components/
│
├── android/
├── ios/
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── babel.config.js
├── jest.config.js
├── package.json
└── README.md
```

### Key Architectural Decisions

**Why `domain/` is separate from `database/models/`:**
WatermelonDB models are ORM-coupled classes. Domain models are plain TypeScript types/interfaces that screens and hooks consume. Repositories map between them. This prevents WatermelonDB from leaking into the UI layer and makes testing straightforward.

**Why Zustand stores exist alongside repositories:**
Repositories handle persistence (read/write to SQLite). Stores handle UI state (current editing session, live mode progress, draft state). A store might call a repository to persist, but the store is what the screen subscribes to.

**Why `services/` uses interfaces:**
Every external dependency (AI, audio, seeding) has an interface and at least two implementations. This means the app works in all degraded states: no network, no AI key, no audio config.

---

## 10. Seeded Templates & Sample Content

### Sequence Templates

#### 1. Beginner Vinyasa Flow (45 min)

**Style:** Vinyasa | **Level:** Beginner | **source_type:** template

| Section | Sample Cues |
|---|---|
| Arrival | "Find a comfortable seat. Close your eyes. Begin to notice your breath." |
| Warm-Up | Cat-Cow (5 breaths), Tabletop circles, Child's Pose |
| Sun Salutations | 3 rounds Sun Sal A (modified: knees down in chaturanga) |
| Standing | Warrior I → Warrior II → Reverse Warrior (right side, then left) |
| Peak | Chair Pose → Twisted Chair → Standing Forward Fold |
| Cool Down | Seated Forward Fold, Supine Twist, Happy Baby |
| Savasana | "Let your body be heavy. There's nothing to do, nowhere to be." |

#### 2. Restorative Sequence (60 min)

**Style:** Restorative | **Level:** All levels | **source_type:** template

| Section | Sample Cues |
|---|---|
| Arrival | Supported Child's Pose (5 min), breathwork landing |
| Main | Supported Fish (7 min), Legs Up the Wall (7 min), Supported Twist R/L (5 min each), Supported Bridge (7 min) |
| Cool Down | Reclined Butterfly (7 min) |
| Savasana | Bolster under knees, eye pillow, 10 min silence |

#### 3. Gentle Morning Flow (30 min)

**Style:** Gentle | **Level:** All levels | **source_type:** template

| Section | Sample Cues |
|---|---|
| Arrival | Supine, knees-to-chest circles, gentle twist |
| Warm-Up | Cat-Cow, Thread the Needle, Downward Dog (pedal out feet) |
| Standing | Sun Sal A (slow, 2 rounds), Low Lunge → Half Splits alternating |
| Cool Down | Seated side stretch, Seated twist, Forward fold |
| Savasana | Brief 3-min savasana with gratitude prompt |

### Meditation Templates

#### 4. Five-Minute Grounding Meditation

**Category:** Grounding | **Duration:** 5 min | **source_type:** template

Sample chunks:
1. "Close your eyes. Feel where your body meets the ground beneath you." (pause 5s)
2. "Notice the weight of your hands in your lap. The warmth of your palms." (pause 5s)
3. "Bring your attention to the sounds around you. Not judging. Just noticing." (pause 8s)
4. "Now draw your awareness inward. To the rhythm of your breath." (pause 10s)
5. "Breathing in, you are here. Breathing out, you are enough." (pause 8s)
6. "When you're ready, gently open your eyes." (pause 5s)

#### 5. Ten-Minute Body Scan

**Category:** Body Scan | **Duration:** 10 min | **source_type:** template

Chunks progress through: feet → legs → hips → belly → chest → hands → arms → shoulders → neck → face → whole body. Each chunk includes a brief awareness prompt and a 10–15s pause.

#### 6. Short Breathwork Script (7 min)

**Category:** Breathwork | **Duration:** 7 min | **source_type:** template

Box breathing format: 4-count inhale, 4-count hold, 4-count exhale, 4-count hold. Guided through 5 rounds with progressive relaxation cues between rounds.

### Editable Templates

#### 7. "My Custom Vinyasa" — Blank Vinyasa Template

**source_type:** template | Pre-populated sections (arrival, warm-up, sun salutations, standing, peak, cool down, savasana) with placeholder cues like "[Add your opening cue]". Designed to be duplicated and filled in.

#### 8. "My Custom Meditation" — Blank Meditation Template

**source_type:** template | 6 empty chunks with pacing notes like "[Opening — settle the room]", "[Body — main theme]", "[Closing — return to awareness]".

---

## 11. Key Risks & Implementation Considerations

### Technical Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **WatermelonDB complexity** | Medium | WatermelonDB has a learning curve and its own sync protocol. For MVP (local-only, no sync), it's overkill but pays off later. If it blocks progress, fallback to raw SQLite via `expo-sqlite` or `react-native-sqlite-storage`. |
| **AI latency in live mode** | High | Live suggestions need sub-2-second response times. Pre-fetch suggestions for the next 2–3 cues. Cache aggressively. Design the UI so suggestions feel optional, not blocking. If the API is slow, the teacher keeps going — they just don't see suggestions. |
| **Offline AI** | Medium | AI features require network. The app must clearly communicate when AI is unavailable. All non-AI features must work fully offline. Consider on-device models (e.g., a small local LLM) as a future enhancement, not an MVP blocker. |
| **Screen wake lock reliability** | Low | React Native's `useKeepAwake` from `expo-keep-awake` or `react-native-keep-awake` is reliable on both platforms. Test on actual devices early. |
| **Large cue sets and reorder performance** | Low | WatermelonDB lazy-loads and batches well. For sequences with 50+ cues, reordering should use batch updates, not individual writes. |

### Product Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **AI suggestions feel intrusive during class** | High | Default AI drawer to collapsed. Teacher pulls it up deliberately. Never auto-surface suggestions over the main cue display. "Ground Me" is a push action, not an interruption. |
| **Teachers become script-dependent** | Medium | This is a design tone issue, not a technical one. Frame AI as "support" and "suggestions," never "scripts." Encourage teachers to customize and internalize. Consider a future "fade mode" that progressively hides cues as confidence builds. |
| **Content quality of AI-generated sequences** | Medium | Anatomically incorrect or unsafe cue suggestions are a liability. Add a disclaimer. Consider a validation layer that flags unusual pose sequences. For MVP, rely on the teacher's review-before-save flow. |
| **Seed content feels generic** | Low | Invest in writing high-quality seed content. Partner with 2–3 real teachers to review seed sequences. Bad seed content sets a bad first impression. |

### Implementation Considerations

- **Start with the Sequence Builder and Live Teach Mode.** These are the core value loop. If a teacher can build a sequence and teach from it, the app is useful. Everything else extends that.
- **WatermelonDB setup is a one-time cost but it's not trivial.** Budget time for schema definition, model classes, and the repository layer. Once it's in, adding new entities is fast.
- **AI integration should be the last feature wired up.** Build the full create → store → teach loop first. AI drafting and live assist are enhancements to a flow that must work without them.
- **Test on a real phone held in one hand.** Every live mode screen must pass the "glanceability test": can a teacher standing in front of a class, phone in one hand, read the current cue in under 1 second?
- **Theme and styling should be set up early.** A shared theme (colors, typography, spacing) applied from day one prevents expensive rework later. The calm/serene tone is load-bearing — it affects trust.

---

## 12. What to Build First

Build in this order. Each phase produces a usable, testable increment.

### Phase 1: Foundation (Week 1–2)

- [ ] React Native project init with TypeScript
- [ ] ESLint, Prettier, Husky, lint-staged configuration
- [ ] Theme system (colors, typography, spacing)
- [ ] Shared UI primitives (Card, Button, Typography, Badge)
- [ ] WatermelonDB setup: schema, models, database initialization
- [ ] Repository layer: SequenceRepository, CueRepository
- [ ] Navigation skeleton (tab navigator, stack navigators, placeholder screens)
- [ ] Seed service + beginner vinyasa seed data

### Phase 2: Core Authoring (Week 2–3)

- [ ] Sequence Builder screen (create, edit, sections, cues)
- [ ] Cue Editor (add/edit/delete/reorder cues within sections)
- [ ] Content Library screen (list sequences, favorites, search)
- [ ] Home screen with quick actions and recent content

### Phase 3: Live Teach Mode (Week 3–4)

- [ ] Live Teach screen with karaoke cue display
- [ ] Current/next/previous cue rendering
- [ ] Manual navigation controls
- [ ] Session timer
- [ ] Auto-advance toggle
- [ ] Screen wake lock
- [ ] Offline indicator
- [ ] "Ground Me" button (initially with canned grounding cues, no AI)
- [ ] Session tracking (start, end, save)

### Phase 4: Meditation (Week 4–5)

- [ ] MeditationRepository, MeditationChunkRepository
- [ ] Meditation Builder screen
- [ ] Chunk Editor
- [ ] Meditation Mode screen (chunked display, pacing, auto-scroll)
- [ ] Meditation seed data (grounding, body scan, breathwork)

### Phase 5: Templates (Week 5)

- [ ] Template Gallery screen
- [ ] Template preview
- [ ] Duplicate-to-library flow
- [ ] All seed data loaded as templates
- [ ] Editable blank templates

### Phase 6: AI Drafting (Week 6)

- [ ] AIRecommendationService interface + Claude implementation
- [ ] MockAIRecommendationService for dev/offline
- [ ] AI Drafting screen (prompt → generate → preview → edit → save)
- [ ] Tone/style picker
- [ ] Settings: AI provider configuration

### Phase 7: AI Live Assist (Week 7)

- [ ] LiveTeachContext builder (gather current state for AI)
- [ ] AI Suggestions Drawer in Live Teach Mode
- [ ] Next-cue suggestion rendering
- [ ] "Ground Me" button wired to AI fallback
- [ ] AI line suggestions in Meditation Mode
- [ ] Suggestion acceptance tracking (AISuggestionRepository)

### Phase 8: Polish & Hardening (Week 8)

- [ ] Error boundaries on all screens
- [ ] Offline-mode testing pass
- [ ] Seed failure resilience
- [ ] Accessibility pass (font scaling, VoiceOver basics)
- [ ] Performance testing with large sequences (50+ cues)
- [ ] Device testing (iPhone SE through Pro Max, representative Android)
- [ ] Settings screen completion

---

## 13. What to Defer Until Later

These are real features but they are not MVP. Do not build them yet. Do not architect around them unless the cost is near-zero.

| Feature | Why Defer | When to Revisit |
|---|---|---|
| **Cloud sync / multi-device** | Adds enormous complexity (conflict resolution, auth, backend). Local-first MVP validates the core product without it. | After MVP launch, when teachers ask for it on a second device. |
| **User accounts / authentication** | No cloud = no auth needed. The app is single-user, single-device for now. | When cloud sync or sharing ships. |
| **Social sharing / marketplace** | The content ownership model supports it, but the social layer (profiles, discovery, permissions, moderation) is a separate product surface. | After validating that teachers actually want to share content. |
| **Audio playback / recording** | Agora integration is abstracted but not needed for MVP. Teachers teach with their own voice. Audio is a "nice to have" for ambient sound or playback. | After core teaching flow is validated. V2 feature. |
| **Analytics dashboard** | Session tracking captures the raw data. A dashboard to visualize teaching patterns, most-used sequences, etc. is valuable but not launch-critical. | Post-launch, when there's enough session data to be meaningful. |
| **Payment / subscription** | Premature. Validate the product first. | After 100+ active teachers using the app. |
| **On-device AI / local LLM** | Exciting but technically complex and model quality is still limited for domain-specific tasks on mobile. | When on-device model quality is sufficient for yoga/meditation domain. |
| **Student-facing mode** | FlowCue is a teacher tool. A student-facing companion (follow along, receive sequences) is a different product. | Only if the teacher product succeeds and teachers request it. |
| **Class music integration** | Spotify/Apple Music integration is a common request but adds platform complexity and licensing concerns. | V2, and likely as a simple "open Spotify" deep link, not an embedded player. |
| **Pose image library** | Visual pose references in cues would be great but requires licensing or creating a full pose illustration set. | After MVP, possibly via a partnership or AI-generated illustrations. |
| **Import/export** | Importing from other apps or exporting sequences as PDFs/files. Useful but not launch-critical. | When teachers ask for interoperability. |
| **Apple Watch companion** | A glanceable watch app for live mode would be incredible. But it's a full second platform. | V2/V3, after the phone app is solid. |

---

## Assumptions

1. **Single-user, single-device for MVP.** No accounts, no sync, no multi-device.
2. **Claude API for AI.** The AI abstraction allows swapping, but MVP implementation targets Claude.
3. **iOS-first, Android soon after.** React Native supports both, but real-device testing and polish will likely start with iOS.
4. **No backend for MVP.** All data is local. AI calls go directly to the provider API from the device. This is acceptable for MVP but a backend will be needed for sync, sharing, and API key management.
5. **Teachers have their own AI API key for now.** This is a developer/power-user assumption. For a real consumer launch, a backend proxy that manages API keys will be needed.
6. **Seed content is hardcoded in the app bundle.** No remote seed fetching for MVP.
7. **The "Ground Me" button in Phase 3 uses canned content.** It becomes AI-powered in Phase 7. This means the feature is useful from day one without AI.

---

*This document is the source of truth for FlowCue's product definition and technical architecture. Update it as decisions evolve.*
