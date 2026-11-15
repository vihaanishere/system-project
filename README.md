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

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Database**: SQLite + Prisma ORM
- **AI**: Ollama (local) + Cloud API (optional)
- **Charts**: Recharts
- **Animations**: Framer Motion

## 🏗️ Project Status

**Current Phase**: Phase 2 - Core Features Expansion

### ✅ Completed (Phase 1 - Vertical Slice)
- [x] Next.js project initialization
- [x] Prisma + SQLite database setup
- [x] Database schema design (Player, Quests, XP, Goals, Achievements, Routines)
- [x] Project structure with modular architecture
- [x] Core progression engine (XP calculation, level-up system, rank progression)
- [x] Basic dashboard interface with player stats
- [x] Quest completion system with API endpoints
- [x] XP and leveling system working end-to-end
- [x] Database seeding for development

### 🚧 In Progress (Phase 2)
- [ ] Quest creation and management UI
- [ ] Attribute progression system
- [ ] Goal creation and milestone tracking
- [ ] Solo Leveling-inspired UI polish
- [ ] Enhanced dashboard with animations
- [ ] Analytics and visualizations

## 🎯 Development Roadmap

### Phase 1: Vertical Slice (In Progress)
Build one complete feature loop to validate the stack:
- Create a quest
- Complete the quest
- Award XP
- Level up when threshold is reached
- Display everything on a minimal dashboard

### Phase 2: Core Features
- Player profile management
- Full quest system (daily, weekly, main, side)
- Goal creation and milestone tracking
- Attribute progression
- Basic analytics

### Phase 3: Advanced Features
- Achievement system
- Routine and streak tracking
- Calendar integration
- Advanced analytics and charts
- Solo Leveling-style UI polish

### Phase 4: AI Integration
- Ollama local LLM setup
- Quest generation
- Goal breakdown assistance
- Weekly planning
- Productivity insights

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

**Status**: Active Development | **Version**: 0.1.0 | **Started**: November 2026
