"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Target, Map, Zap, TrendingUp,
  Code2, Star, CheckCircle, ChevronRight, Brain, Rocket,
  BarChart3, Users, Clock, Shield
} from "lucide-react";

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
    role: "Got hired at a Series-B startup",
    avatar: "AM",
    text: "CareerPilot told me to stop learning 5 things at once and focus on Next.js + PostgreSQL. 3 months later I had my first offer. The roadmap was frighteningly accurate.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Self-taught → Freelance developer",
    avatar: "PS",
    text: "The project ideas section alone is worth it. I built the SaaS it suggested, and I'm already making $800/month from it. Not what I expected from a 'career tool'.",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    role: "CS student, landed internship at Microsoft",
    avatar: "JO",
    text: "I showed the hiring readiness report to my university advisor and she was shocked at how accurate it was. It told me exactly what to fix and I fixed it. Interview rate tripled.",
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
    <div className="min-h-screen bg-[#08101c] text-white overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            CareerPilot<span className="text-violet-400"> AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
        </div>
        <button
          id="nav-cta"
          onClick={() => router.push("/onboarding")}
          className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          Get Started Free
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 grid-bg hero-glow">
        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/30 text-sm text-violet-300 mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Gemini AI · Built for developers
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Your AI Roadmap
            <br />
            <span className="gradient-text">to Get Hired in Tech</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Stop guessing what to learn next. CareerPilot AI analyzes your skills, goals, and timeline to give you a deeply personalized career strategy, roadmap, and project plan — in minutes.
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
              Generate My Career Plan
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-cta-secondary"
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 rounded-xl text-base font-semibold text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all flex items-center gap-2"
            >
              View Dashboard
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

      {/* ── Problem Section ── */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
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

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
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
      <section id="how-it-works" className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
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
      <section id="testimonials" className="py-24 px-6 max-w-5xl mx-auto">
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
            <motion.div key={t.name} variants={fadeUp} className="glass-card p-6 card-hover">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
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
            background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Ready to finally know<br />
              <span className="gradient-text">what to do next?</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Join thousands of developers who stopped guessing and started executing. Your personalized career plan is 2 minutes away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="final-cta"
                onClick={() => router.push("/onboarding")}
                className="btn-primary px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Generate My Career Plan — Free
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-white/30">
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> No account needed</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Takes 2 minutes</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 100% personalized</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-white/80 text-sm">CareerPilot AI</span>
          </div>
          <p className="text-white/30 text-sm">
            Built for developers who are serious about their career.
          </p>
          <div className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-white/30 text-xs">Powered by Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
