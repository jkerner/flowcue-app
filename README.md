# FlowCue

A React Native app for yoga teachers that provides real-time, karaoke-style cueing for sequences and guided meditations, with offline-first storage, reusable templates, and AI-assisted recommendations.

## The Problem

Yoga teachers are expected to teach fluidly from memory while managing timing, energy, pacing, student needs, and their own presence. When they blank on a cue, lose their place in a meditation, or fumble a transition, the moment breaks — for them and for the room.

Notes apps are too static. Paper gets lost. Memorization works until it doesn't.

FlowCue gives teachers a calm, discreet, in-the-moment support system that reduces cognitive load without making them feel robotic.

## Who Is This For

- Yoga instructors
- Meditation facilitators
- Breathwork guides
- Teacher trainees
- Studio instructors who want reusable class support

**This is a creator tool for teachers, not a consumer wellness app for students.**

## Core Content Modes

### 1. Create Your Own
Build sequences and meditations from scratch with sections, cues, breath counts, timing, modifications, and notes.

### 2. Templates + Duplicate & Modify
Browse seeded starter templates. Duplicate any template into your library to customize. Originals stay unchanged.

### 3. AI Assistance (Two Distinct Modes)

**AI Drafting (Pre-Class)**
Generate or refine sequences and meditations from a prompt. Review, edit, and save. AI is a collaborator, not an autopublisher.

**AI Live Adaptive Assist (During Class)**
Get next-cue suggestions based on your current position, section, style, and elapsed time. Pull up a suggestions drawer when needed. Hit "Ground Me" for an instant calming cue.

## Starter Content

This app ships with seeded content based on the founder's real class plans and meditation transcripts:

**Sequences:**
- 90-Minute Vinyasa (full-spectrum template)
- Power Vinyasa with Theme (stronger flow template)
- Gentle Morning Flow (shorter demo)

**Meditations:**
- Opening Grounding Meditation
- Savasana Meditation
- Body Scan Meditation
- Breath Practice for Clarity
- Closing Gratitude Meditation
- Receiving & Abundance Meditation
- Trusting the Process Heart Visualization
- Exploring the Self

Templates are duplicated before editing — the originals are preserved.

## Tech Stack

| Tool | Purpose |
|---|---|
| React Native | Mobile framework |
| TypeScript | Type safety |
| React Navigation | Screen routing |
| Zustand | State management |
| WatermelonDB | Offline-first local database |
| SQLite | WatermelonDB storage adapter |
| React Native Reanimated | Animations |
| React Native Gesture Handler | Touch interactions |
| React Hook Form + Zod | Form handling and validation |
| Jest + React Native Testing Library | Testing |
| ESLint + Prettier | Code quality |
| Husky + lint-staged | Pre-commit hooks |

**Scaffolded (not yet active):**
- Agora React Native SDK (audio streaming)
- AI provider integration (currently mocked)

## Architecture

```
src/
├── app/              # App entry, navigation, providers
├── screens/          # Screen components
├── components/       # Shared UI components
├── features/         # Feature-specific code (sequences, meditations, AI, audio, etc.)
├── data/
│   ├── database/     # WatermelonDB schema, models, migrations, seed
│   ├── repositories/ # Data access layer
│   └── seeds/        # Demo/template seed data
├── store/            # Zustand state management
├── hooks/            # Shared React hooks
├── lib/              # Utilities, constants, logger, env
├── theme/            # Colors, spacing, typography
└── types/            # Domain types, navigation types, API types
```

**Key architectural decisions:**
- Domain types are plain TypeScript interfaces, separate from WatermelonDB model classes
- Repositories abstract all database access — screens never query WatermelonDB directly
- AI and Audio services use interface abstractions with mock/noop implementations
- App boots and functions fully without AI credentials or audio configuration
- Seed failure does not prevent app boot

## Local Setup

### Prerequisites
- Node.js 18+
- React Native CLI (`npm install -g react-native-cli`)
- Xcode 15+ (for iOS)
- Android Studio (for Android)
- CocoaPods (`gem install cocoapods`)

### Installation

```bash
# Clone the repo
git clone https://github.com/jkerner/flowcue-app.git
cd flowcue-app

# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..

# Copy environment file
cp .env.example .env

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Environment Variables

Copy `.env.example` to `.env`. All variables are optional for local development:

| Variable | Required | Description |
|---|---|---|
| `AGORA_APP_ID` | No | Agora.io app ID for audio features |
| `AGORA_TOKEN` | No | Agora authentication token |
| `AGORA_CHANNEL_PREFIX` | No | Channel name prefix (default: flowcue) |
| `AI_PROVIDER` | No | AI provider to use (default: mock) |

The app runs fully with `AI_PROVIDER=mock` and no Agora credentials.

### WatermelonDB Notes

WatermelonDB requires native module linking:
- iOS: pods are installed via `pod install`
- Android: native modules are auto-linked

The database is created on first launch. Seed data is inserted automatically on first boot. If seeding fails, the app continues with an empty library — check logs for errors.

To reset seed data, go to Settings → Developer → Reset Demo Data.

### Agora Setup (Optional)

Audio features are scaffolded but not active. To enable:
1. Create an account at [agora.io](https://www.agora.io/)
2. Create a project and get your App ID
3. Add `AGORA_APP_ID` to your `.env`
4. Audio service will initialize on next app boot

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start Metro bundler |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm test` | Run tests |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run format` | Format with Prettier |

## Roadmap

### Now (MVP)
- [x] Project scaffold and architecture
- [x] Domain models and database schema
- [x] Seed content from real class plans
- [x] Navigation and screen shells
- [x] Mock AI service
- [ ] Full sequence builder with persistence
- [ ] Full meditation builder with persistence
- [ ] Live teach mode polish
- [ ] Meditation mode polish

### Next
- [ ] Real AI provider integration (Claude API)
- [ ] Agora audio streaming
- [ ] Full template gallery with search/filter
- [ ] Session history and stats
- [ ] Accessibility pass

### Later
- [ ] Cloud sync and multi-device support
- [ ] User accounts and authentication
- [ ] Community template sharing
- [ ] Apple Watch companion
- [ ] Class music integration
- [ ] Import/export sequences

## Known Limitations

- **AI is mocked.** The mock service returns realistic but static suggestions. Real AI integration (Claude API) is planned.
- **Audio is scaffolded only.** Agora SDK is included as a dependency but not wired up.
- **No cloud sync.** All data is local to the device. Multi-device support requires a backend.
- **No user accounts.** Single-user, single-device for now.
- **Screens use mock data.** Repository integration is in progress. Screens demonstrate flow with inline data.

## Content Note

Starter sequences and meditations are based on the founder's real class plans and teaching notes. They represent actual yoga and meditation instruction, not generic placeholder content.

## License

Private — All rights reserved.
