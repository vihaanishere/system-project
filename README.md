# SYSTEM

> Your Personal Real-Life Progression System

A Solo Leveling-inspired productivity application that transforms daily tasks and goals into an RPG progression experience. Track your quests, level up, gain attributes, and watch your real-world progress unfold like a game.

## 🎮 What is SYSTEM?

SYSTEM is a locally-hosted, single-user productivity RPG that gamifies your life:

- 📋 **Quest Management** - Turn tasks into quests with XP rewards
- 📈 **Level System** - Gain XP and level up as you complete activities
- 💪 **Attributes** - Track growth across Intelligence, Strength, Discipline, Creativity, and Vitality
- 🎯 **Goals & Milestones** - Break down long-term objectives into achievable steps
- 🔥 **Streaks & Routines** - Build consistency with daily habits
- 🏆 **Achievements** - Unlock titles and recognition for milestones
- 📊 **Analytics** - Visualize your productivity patterns
- 🤖 **AI Assistant** - Get quest suggestions and planning help (Ollama + Cloud AI)

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS 4
- **Database**: SQLite + Prisma ORM 5
- **UI Components**: Custom components with Tailwind
- **Animations**: Framer Motion (Phase 3)
- **Charts**: Recharts (Phase 3)
- **Notifications**: Sonner (Phase 3)
- **AI**: Ollama (local) + Cloud API (planned for Phase 5)

## 🏗️ Project Status

**Current Phase**: Phase 3 - Goals, Analytics & UI Polish

### ✅ Completed (Phase 1 - Vertical Slice)
- [x] Next.js project initialization with TypeScript
- [x] Prisma + SQLite database setup
- [x] Database schema design (Player, Quests, XP, Attributes, Goals, Achievements, Routines)
- [x] Project structure with modular architecture
- [x] Core progression engine (XP calculation, level-up system, rank progression)
- [x] Basic dashboard interface with player stats
- [x] Quest completion system with API endpoints
- [x] XP and leveling system working end-to-end
- [x] Database seeding for development

### ✅ Completed (Phase 2 - Quest Management & Attributes)
- [x] Quest creation modal with form validation
- [x] Quest editing system
- [x] Quest completion with XP rewards
- [x] Attribute progression system (5 attributes)
- [x] Category-to-attribute mapping (DSA → Intelligence, Gym → Strength, etc.)
- [x] Attribute gains on quest completion
- [x] Full dashboard with player stats, XP progress bar
- [x] Quest cards with difficulty badges
- [x] Edit and Complete buttons on quest cards
- [x] Quest difficulty levels (Easy, Medium, Hard, Epic)
- [x] Quest types (Daily, Weekly, Main, Side, Milestone)

### 🚧 In Progress (Phase 3)
- [ ] Delete and Abandon quest API endpoints
- [ ] Quest filtering and sorting (by category, difficulty, status)
- [ ] Goal creation and milestone tracking system
- [ ] Toast notifications (replacing alerts)
- [ ] Level-up animation with Framer Motion
- [ ] Analytics dashboard with charts
- [ ] XP history visualization
- [ ] Quest statistics (category/difficulty distribution)

## 🎯 Development Roadmap

### Phase 1: Vertical Slice ✅ (Completed Nov 2026)
Build one complete feature loop to validate the stack:
- ✅ Create a quest
- ✅ Complete the quest
- ✅ Award XP
- ✅ Level up when threshold is reached
- ✅ Display everything on a minimal dashboard

### Phase 2: Quest Management & Attributes ✅ (Completed Nov 2026)
- ✅ Quest creation modal with validation
- ✅ Full quest system (daily, weekly, main, side, milestone)
- ✅ Quest editing functionality
- ✅ Attribute progression tied to quest categories
- ✅ Five core attributes (Intelligence, Strength, Discipline, Creativity, Vitality)
- ✅ Category-to-attribute mapping system

### Phase 3: Goals, Analytics & UI Polish 🚧 (In Progress - Nov 2026)
- 🚧 Complete quest management (delete, abandon endpoints)
- 🚧 Quest filtering and sorting system
- 🚧 Goal creation and milestone tracking
- 🚧 Toast notifications (replace alerts)
- 🚧 Animations with Framer Motion (level-up modal)
- 🚧 Analytics dashboard with Recharts
- 🚧 XP history visualization
- 🚧 Quest statistics charts
- 🚧 Solo Leveling-inspired UI refinements

### Phase 4: Advanced Features (Future)
- Achievement system and unlockable titles
- Routine and streak tracking
- Calendar heatmap (GitHub-style activity)
- Quest templates
- Data export/import
- Settings page
- Mobile responsiveness improvements
- PWA support (offline mode)

### Phase 5: AI Integration (Future)
- Ollama local LLM setup
- AI quest suggestions
- Goal breakdown assistance
- Weekly planning recommendations
- Productivity insights and patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vihaanishere/system-project.git
cd system-project

# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your SYSTEM.

## 📁 Project Structure

```
system-project/
├── app/              # Next.js routes and pages
├── prisma/           # Database schema and migrations
├── data/             # SQLite database (local only, not in git)
├── components/       # React UI components
├── modules/          # Business logic (pure TypeScript)
├── lib/              # Utilities and helpers
└── public/           # Static assets
```

## 🔒 Privacy & Data

- **100% Local**: All your data stays on your machine
- **No Analytics**: No tracking, no telemetry
- **Your Data, Your Control**: Easy backup and export
- The `data/` folder (your database) is excluded from git

## 📝 License

This project is personal and educational. Feel free to use it as inspiration for your own productivity system!

## 🙏 Inspiration

Inspired by the manhwa/anime **Solo Leveling** (나 혼자만 레벨업) by Chugong, where the protagonist's life becomes an RPG with quests, levels, and progression.

---

**Status**: Active Development | **Version**: 0.2.0 | **Started**: November 2026 | **Last Updated**: November 17, 2026
