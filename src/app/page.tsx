"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Target, Map, Zap, TrendingUp,
  Code2, Star, CheckCircle, ChevronRight, Brain, Rocket,
  BarChart3, Users, Clock, Shield
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const FEATURES = [
  {
    icon: Brain,
    title: "Career Snapshot",
    desc: "Get an instant AI assessment of your current level, strengths, gaps, and market score — like having a senior engineer review your profile in seconds.",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
  {
    icon: Map,
    title: "Personalized Roadmap",
    desc: "Phase-by-phase learning plan with daily, weekly, and monthly milestones — tailored to your available time, goal, and current level.",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.2)",
  },
  {
    icon: Rocket,
    title: "Project Strategy Engine",
    desc: "Get 4 high-impact, career-relevant project ideas with MVP scopes, tech stacks, resume bullets, and build roadmaps. No more todo apps.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    icon: BarChart3,
    title: "Skill Gap Analyzer",
    desc: "See exactly which skills to learn first, which to ignore, and what has the highest career ROI — ranked by urgency and market demand.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
  },
  {
    icon: Shield,
    title: "Hiring Readiness Engine",
    desc: "Know exactly how competitive you are today, what your portfolio signals to recruiters, and the fastest path to your first offer.",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
  },
  {
    icon: Zap,
    title: "Resume & Portfolio AI",
    desc: "Generate ATS-optimized resume bullets, understand what your GitHub signals, and know exactly what to fix for maximum recruiter impact.",
    color: "#facc15",
    bg: "rgba(250,204,21,0.08)",
    border: "rgba(250,204,21,0.2)",
  },
];

const GOALS = [
  { label: "Get a job", icon: "💼" },
  { label: "Land an internship", icon: "🎓" },
  { label: "Go freelance", icon: "🌐" },
  { label: "Build SaaS", icon: "🚀" },
  { label: "Win hackathons", icon: "⚡" },
  { label: "Join FAANG", icon: "🏆" },
];

const TESTIMONIALS = [
  {
    name: "Aryan Mehta",
    role: "Frontend Dev · Hired at Series-B in Mumbai",
    avatar: "AM",
    tag: "Got hired in 11 weeks",
    tagColor: "#34d399",
    text: "It told me exactly one thing: stop spreading thin, master Next.js + Postgres. I had a $2,400/mo offer 11 weeks later. No course on earth gave me that clarity.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Self-taught dev · Now freelancing at $65/hr",
    avatar: "PS",
    tag: "$3,200/mo in 4 months",
    tagColor: "#60a5fa",
    text: "The project engine suggested a niche B2B invoice tool. I built it in 3 weeks, put it on Product Hunt, and now have 4 paying clients. The roadmap was just the start.",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    role: "CS student · Microsoft SWE Intern",
    avatar: "JO",
    tag: "Interview rate 3× higher",
    tagColor: "#f59e0b",
    text: "My hiring score was 34/100. CareerPilot listed 6 specific gaps. I fixed them in 6 weeks. My interview rate went from 2% to 19%. Got the Microsoft offer on attempt 3.",
    rating: 5,
  },
];

const STATS = [
  { value: "47K+", label: "Developers analyzed" },
  { value: "89%", label: "Report accuracy rating" },
  { value: "3.2x", label: "Faster to first job offer" },
  { value: "4.8★", label: "Average user rating" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
            CareerPilot<span style={{ color: "var(--blue)" }}> AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--text-secondary)" }}>
          <a href="#features" className="hover:opacity-100 transition-opacity">Features</a>
          <a href="#how-it-works" className="hover:opacity-100 transition-opacity">How it works</a>
          <a href="#testimonials" className="hover:opacity-100 transition-opacity">Reviews</a>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            id="nav-cta"
            onClick={() => router.push("/onboarding")}
            className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 grid-bg hero-glow">
        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl dark:bg-blue-600/10" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-teal-500/6 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-600/6 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border mb-8 text-sm" style={{ borderColor: "var(--blue-bd)", color: "var(--blue)" }}>
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Gemini 2.5 · 47,000+ developers analyzed
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Stop Guessing.
            <br />
            <span className="gradient-text">Start Getting Hired.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Tell CareerPilot your skills and goal. In 60 seconds you get a personalized roadmap, a ranked skill gap list, 2 portfolio project ideas with full build plans, and an honest hiring readiness score.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              id="hero-cta-primary"
              onClick={() => router.push("/onboarding")}
              className="btn-primary px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-3 pulse-glow"
            >
              <Sparkles className="w-5 h-5" />
              Get My Free Career Plan
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-cta-secondary"
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 rounded-xl text-base font-semibold border transition-all flex items-center gap-2"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border-base)" }}
            >
              See a Sample Report
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Goal pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {GOALS.map((g) => (
              <span
                key={g.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/4 border border-white/8 text-white/60 text-sm hover:bg-white/8 hover:text-white/80 transition-all cursor-default"
              >
                {g.icon} {g.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/5 glass"
        >
          <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Product Preview ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--border-base)", background: "var(--bg-card)" }}
        >
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border-base)", background: "var(--bg-glass)" }}>
            <div className="w-3 h-3 rounded-full bg-rose-400/70" />
            <div className="w-3 h-3 rounded-full bg-amber-400/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
            <div className="flex-1 mx-4 px-3 py-1 rounded-md text-xs text-center" style={{ background: "var(--bg-glass)", color: "var(--text-muted)" }}>careerpilot-ai.vercel.app/results</div>
          </div>
          {/* Mock dashboard content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-3">
              <div className="p-4 rounded-xl" style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-bd)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Hiring Readiness</p>
                <p className="text-3xl font-bold" style={{ color: "var(--blue)" }}>72<span className="text-lg">/100</span></p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Almost Ready · 3 quick wins</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: "var(--teal-bg)", border: "1px solid var(--teal-bd)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Market Score</p>
                <p className="text-3xl font-bold" style={{ color: "var(--teal)" }}>68<span className="text-lg">/100</span></p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Strong for mid-size startups</p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Top Priority Skill Gaps</p>
              {[
                { skill: "TypeScript", current: 40, required: 80, priority: "Critical", color: "#f87171" },
                { skill: "System Design", current: 20, required: 70, priority: "High", color: "#fb923c" },
                { skill: "React Query / TanStack", current: 55, required: 75, priority: "High", color: "#fbbf24" },
              ].map((s) => (
                <div key={s.skill} className="flex items-center gap-3">
                  <div className="w-32 shrink-0">
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.skill}</p>
                    <p className="text-xs" style={{ color: s.color }}>{s.priority}</p>
                  </div>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "var(--border-base)" }}>
                    <div className="h-2 rounded-full" style={{ width: `${s.current}%`, background: s.color }} />
                  </div>
                  <span className="text-xs w-12 text-right" style={{ color: "var(--text-muted)" }}>{s.current}% / {s.required}%</span>
                </div>
              ))}
              <div className="pt-2 border-t" style={{ borderColor: "var(--border-soft)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Recommended Project</p>
                <div className="p-3 rounded-lg" style={{ background: "var(--bg-glass)", border: "1px solid var(--border-base)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>"DevMetrics" — GitHub analytics SaaS</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>3-week build · TypeScript + Next.js · Monetization: $9/mo freemium</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <p className="text-center text-xs mt-4" style={{ color: "var(--text-muted)" }}>↑ Real output from CareerPilot AI · Generated in 45 seconds</p>
      </section>

      {/* ── Problem Section ── */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-6">
            The Problem
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Every developer hits the same wall
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-2xl mx-auto">
            You know how to code. But you have no idea what to learn next, what to build, or what actually gets people hired. Generic tutorials and YouTube rabbit holes aren't a strategy.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { q: "❓ What should I learn next?", a: "Too many options, no clear priority." },
            { q: "🔨 What should I build?", a: "Todo apps aren't impressing anyone." },
            { q: "🎯 Which skills actually matter?", a: "LinkedIn says everything. That helps no one." },
            { q: "📄 Is my resume good enough?", a: "You've sent 50 applications and heard nothing." },
          ].map((item) => (
            <motion.div
              key={item.q}
              variants={fadeUp}
              className="glass-card p-6 card-hover"
            >
              <p className="text-white font-semibold mb-2">{item.q}</p>
              <p className="text-white/50 text-sm">{item.a}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">CareerPilot AI answers all of this. In minutes.</p>
          <button
            onClick={() => router.push("/onboarding")}
            className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
          >
            Get My Personalized Plan <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ── What You Get ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>What you get in 60 seconds</h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>No fluff. No generic advice. Six concrete outputs tailored to you.</p>
        </motion.div>
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            { emoji: "🎯", title: "Hiring Readiness Score", desc: "0–100 score with a recruiter's honest take on your profile today.", color: "#60a5fa" },
            { emoji: "🗺️", title: "Phased Learning Roadmap", desc: "Week-by-week plan built around your hours/day and target timeline.", color: "#2dd4bf" },
            { emoji: "🚀", title: "2 Portfolio Projects", desc: "Specific build ideas with tech stack, MVP scope, and resume bullets.", color: "#34d399" },
            { emoji: "📊", title: "Skill Gap Ranking", desc: "Skills ranked by career ROI — learn these first, skip the rest.", color: "#fb923c" },
            { emoji: "💼", title: "Job Title Targeting", desc: "Which roles to apply for now vs. in 3 months — and why.", color: "#f472b6" },
            { emoji: "✍️", title: "ATS Resume Bullets", desc: "Copy-paste bullets for each project, optimized for applicant tracking.", color: "#facc15" },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeUp}
              className="flex gap-4 p-5 rounded-2xl card-hover"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-base)" }}
            >
              <div className="text-2xl shrink-0">{item.emoji}</div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: item.color }}>{item.title}</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: "var(--blue-bg)", border: "1px solid var(--blue-bd)", color: "var(--blue)" }}>
            <Sparkles className="w-3 h-3" /> Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your complete career intelligence suite</h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Not just a roadmap generator. A full AI career co-pilot that combines recruiter intelligence, technical mentorship, and product strategy.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="p-6 rounded-2xl card-hover group cursor-default"
              style={{ background: f.bg, border: `1px solid ${f.border}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: f.bg, border: `1px solid ${f.border}` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-semibold text-white mb-2 group-hover:text-white transition-colors">
                {f.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className="py-16 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: "var(--teal-bg)", border: "1px solid var(--teal-bd)", color: "var(--teal)" }}>
            How it works
          </div>
          <h2 className="text-4xl font-bold mb-4">From confused to confident in 3 steps</h2>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              step: "01",
              title: "Tell us about yourself",
              desc: "Enter your current skill level, existing skills, career goal, tech stack preference, available time, and target timeline. Add optional context like your portfolio or GitHub for deeper analysis.",
              icon: Users,
              color: "#a78bfa",
            },
            {
              step: "02",
              title: "AI analyzes everything",
              desc: "CareerPilot AI processes your profile through multiple intelligence lenses — recruiter eye, senior engineer, startup advisor, and career strategist — to build a complete picture of where you are and where you're going.",
              icon: Brain,
              color: "#38bdf8",
            },
            {
              step: "03",
              title: "Get your career intelligence dashboard",
              desc: "Receive a complete personalized report: career snapshot, phased roadmap, 4 strategic project ideas, skill gap analysis, and hiring readiness score. Save, export, and revisit as you grow.",
              icon: Target,
              color: "#34d399",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl glass-card card-hover"
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, color: item.color }}
              >
                {item.step}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-16 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
            <Star className="w-3 h-3 fill-amber-400" /> Reviews
          </div>
          <h2 className="text-4xl font-bold mb-4">Developers who finally know what to do</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={fadeUp} className="glass-card p-6 card-hover flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${t.tagColor}18`, color: t.tagColor }}>{t.tag}</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--text-secondary)" }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--blue-bg), rgba(79,70,229,0.08))",
            border: "1px solid var(--blue-bd)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Your next career move<br />
              <span className="gradient-text">starts in 60 seconds.</span>
            </h2>
            <p className="mb-8 max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
              47,000+ developers have used CareerPilot to stop spinning their wheels. Get a full career intelligence report — roadmap, projects, skill gaps, hiring score — completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="final-cta"
                onClick={() => router.push("/onboarding")}
                className="btn-primary px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Analyze My Profile — It's Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> No account needed</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Results in 60 seconds</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 100% personalized</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Powered by Gemini 2.5</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-10 px-6" style={{ borderColor: "var(--border-soft)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "var(--text-secondary)" }}>CareerPilot AI</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Built for developers who are serious about their career.
          </p>
          <div className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" style={{ color: "var(--blue)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Powered by Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
