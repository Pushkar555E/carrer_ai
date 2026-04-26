# 🚀 CareerPilot AI

**Your AI Roadmap to Get Hired in Tech**

CareerPilot AI is a premium, full-stack AI career intelligence platform built for developers who want to know exactly what to learn, what to build, and what to focus on to reach their career goals faster.

---

## ✨ Features

| Module | Description |
|---|---|
| 🎯 Career Snapshot | Instant AI assessment of your current level, strengths, market score & hiring readiness |
| 🗺️ Personalized Roadmap | Phase-by-phase learning plan with milestones, resources, and weekly goals |
| 🚀 Project Strategy Engine | 4 high-impact career-relevant project ideas with MVP scopes, resume bullets & SaaS paths |
| 📊 Skill Gap Analyzer | Skills ranked by priority, market relevance, and career ROI |
| 💼 Hiring Readiness Engine | Blunt recruiter simulation with score breakdown, quick wins & job targets |
| 💾 Saved Plans Dashboard | Save, pin, and revisit multiple analyses over time |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + custom CSS design system
- **Animations**: Framer Motion
- **State**: Zustand (with persistence)
- **AI**: Google Gemini 2.0 Flash API
- **Icons**: Lucide React

---

## ⚡ Quick Start

### 1. Get a Gemini API Key (Free)

Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a free API key.

### 2. Configure Environment

Edit `.env.local` in the project root:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_key_here
```

### 3. Run the App

```bash
cd careerpilot-ai
npm install        # already done if you followed setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Design system + custom utilities
│   ├── onboarding/page.tsx   # 4-step onboarding flow
│   ├── results/page.tsx      # Career intelligence dashboard
│   └── dashboard/page.tsx    # Saved plans manager
├── components/
│   └── results/
│       ├── SnapshotTab.tsx   # Career snapshot + score rings
│       ├── RoadmapTab.tsx    # Expandable phase roadmap
│       ├── ProjectsTab.tsx   # Project cards with details
│       ├── SkillGapTab.tsx   # Animated skill gap bars
│       └── HiringTab.tsx     # Hiring readiness breakdown
├── lib/
│   ├── ai.ts                 # Gemini API integration + prompts
│   └── utils.ts              # Helpers (cn, colors, formatting)
├── store/
│   └── careerStore.ts        # Zustand store with persistence
└── types/
    └── index.ts              # All TypeScript types
```

---

## 🎨 Design Philosophy

Built to feel like a **Vercel × Linear × Notion AI** hybrid:
- Dark glassmorphism with violet/cyan/emerald accent palette
- Framer Motion micro-animations on every interaction
- Score rings, animated progress bars, expandable cards
- Premium typography with Inter font
- Custom scrollbar, chip, button, and glass utilities

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key |

---

## 🚢 Deploy

```bash
# Vercel (recommended)
npx vercel --prod

# Or build locally
npm run build && npm start
```

Set `NEXT_PUBLIC_GEMINI_API_KEY` in your Vercel environment variables.

---

Built with ❤️ using Next.js + Gemini AI
