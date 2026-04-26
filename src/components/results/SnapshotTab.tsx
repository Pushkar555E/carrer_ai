"use client";
import { motion } from "framer-motion";
import { Target, TrendingUp, AlertTriangle, CheckCircle, Zap, Clock, Star } from "lucide-react";
import type { CareerSnapshot, UserProfile } from "@/types";
import { getScoreColor } from "@/lib/utils";

interface Props { snapshot: CareerSnapshot; profile: UserProfile; }

function ScoreRing({ score, color, label }: { score: number; color: string; label: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle
            cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
      <span className="text-xs text-white/50 text-center">{label}</span>
    </div>
  );
}

export default function SnapshotTab({ snapshot, profile }: Props) {
  const hiringColor = getScoreColor(snapshot.hiringReadiness);
  const marketColor = getScoreColor(snapshot.marketScore);

  return (
    <div className="space-y-6">
      {/* Hero summary */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Career Snapshot</h2>
                <p className="text-xs text-white/40">AI assessment for {profile.name || "you"}</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed text-sm mb-6">{snapshot.summary}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                <p className="text-xs text-white/40 mb-1">Current Level</p>
                <p className="text-sm font-medium text-white">{snapshot.currentLevel}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <p className="text-xs text-white/40 mb-1">Strongest Skill</p>
                <p className="text-sm font-medium text-emerald-300">{snapshot.strongestSkill}</p>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15">
                <p className="text-xs text-white/40 mb-1">Biggest Gap</p>
                <p className="text-sm font-medium text-rose-300">{snapshot.weakestGap}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 justify-center lg:justify-end items-center">
            <ScoreRing score={snapshot.hiringReadiness} color={hiringColor} label="Hiring Readiness" />
            <ScoreRing score={snapshot.marketScore} color={marketColor} label="Market Score" />
          </div>
        </div>
      </motion.div>

      {/* Recruiter take */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-white text-sm">Recruiter's Take</h3>
          </div>
          <p className="text-white/60 text-sm leading-relaxed italic">"{snapshot.recruiterTake}"</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-white text-sm">Senior Engineer's Take</h3>
          </div>
          <p className="text-white/60 text-sm leading-relaxed italic">"{snapshot.technicalMentorTake}"</p>
        </motion.div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-white text-sm">Key Strengths</h3>
          </div>
          <ul className="space-y-2.5">
            {snapshot.keyStrengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-white text-sm">Key Weaknesses</h3>
          </div>
          <ul className="space-y-2.5">
            {snapshot.keyWeaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Immediate actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-violet-400" />
          <h3 className="font-semibold text-white text-sm">Do These This Week</h3>
          <span className="ml-auto text-xs text-white/40">Estimated time to goal: <span className="text-violet-400">{snapshot.timeToGoal}</span></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {snapshot.immediateActions.map((action, i) => (
            <div key={i} className="p-4 rounded-xl bg-violet-500/8 border border-violet-500/20">
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400 mb-2">{i + 1}</div>
              <p className="text-sm text-white/80">{action}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
