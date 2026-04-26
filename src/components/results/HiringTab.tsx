"use client";
import { motion } from "framer-motion";
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Zap, DollarSign, Briefcase, Building } from "lucide-react";
import type { HiringReadinessReport } from "@/types";
import { getScoreColor } from "@/lib/utils";

interface Props { hiring: HiringReadinessReport; }

const VERDICT_CONFIG = {
  "not-ready":       { color: "#ef4444", bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.25)",    emoji: "🔴" },
  "almost-ready":    { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.25)",   emoji: "🟡" },
  "ready":           { color: "#10b981", bg: "rgba(16,185,129,0.1)",   border: "rgba(16,185,129,0.25)",   emoji: "🟢" },
  "highly-competitive": { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)", emoji: "⭐" },
};

function MiniScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-medium" style={{ color }}>{score}</span>
      </div>
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function HiringTab({ hiring }: Props) {
  const vc = VERDICT_CONFIG[hiring.verdict] || VERDICT_CONFIG["not-ready"];
  const overallColor = getScoreColor(hiring.overallScore);

  return (
    <div className="space-y-6">
      {/* Verdict card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 relative overflow-hidden"
        style={{ border: `1px solid ${vc.border}` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${vc.color}08` }} />
        <div className="relative flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: vc.bg, border: `1px solid ${vc.border}` }}>
                <Shield className="w-5 h-5" style={{ color: vc.color }} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Hiring Readiness Engine</h2>
                <div className="flex items-center gap-2">
                  <span>{vc.emoji}</span>
                  <span className="text-sm font-medium" style={{ color: vc.color }}>{hiring.verdictLabel}</span>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{hiring.summary}</p>
            <div className="p-4 rounded-xl text-sm text-white/70 italic"
              style={{ background: vc.bg, border: `1px solid ${vc.border}` }}>
              <p className="text-xs font-medium mb-1" style={{ color: vc.color }}>Recruiter's 30-second take:</p>
              "{hiring.recruiterTake}"
            </div>
          </div>

          {/* Score breakdown */}
          <div className="w-full lg:w-56 space-y-3 flex-shrink-0">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold mb-1" style={{ color: overallColor }}>{hiring.overallScore}</div>
              <div className="text-xs text-white/40">Overall Score / 100</div>
            </div>
            <MiniScoreBar label="Recruiter Appeal" score={hiring.recruiterScore} color="#a78bfa" />
            <MiniScoreBar label="Technical Depth" score={hiring.technicalScore} color="#38bdf8" />
            <MiniScoreBar label="Portfolio Quality" score={hiring.portfolioScore} color="#34d399" />
            <MiniScoreBar label="Communication" score={hiring.communicationScore} color="#fb923c" />
            <MiniScoreBar label="Market Competitiveness" score={hiring.marketCompetitivenessScore} color="#f472b6" />
          </div>
        </div>
      </motion.div>

      {/* Portfolio signals & Resume gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> What Your Portfolio Signals
          </h3>
          <ul className="space-y-2.5">
            {hiring.portfolioSignals?.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" /> {s}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Resume Gaps
          </h3>
          <ul className="space-y-2.5">
            {hiring.resumeGaps?.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" /> {g}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Quick wins & Long term */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" /> Quick Wins (under 1 week)
          </h3>
          <ul className="space-y-2.5">
            {hiring.quickWins?.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /> {w}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-400" /> Long-Term Moves (1-3 months)
          </h3>
          <ul className="space-y-2.5">
            {hiring.longTermMoves?.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" /> {m}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Jobs & Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-400" /> Job Titles to Target Now
          </h3>
          <div className="flex flex-wrap gap-2">
            {hiring.jobTitlesToTarget?.map((t) => (
              <span key={t} className="chip chip-cyan">{t}</span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Building className="w-4 h-4 text-violet-400" /> Companies That Would Interview You
          </h3>
          <div className="flex flex-wrap gap-2">
            {hiring.companiesThatWouldHire?.map((c) => (
              <span key={c} className="chip chip-violet">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-xs text-white/40 mb-1">Time to Job-Ready</p>
          <p className="text-base font-bold text-white">{hiring.estimatedTimeToReady}</p>
        </div>
        {hiring.salaryRange && (
          <div className="glass-card p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-white/40 mb-1">Realistic Salary Range</p>
            <p className="text-base font-bold text-white">{hiring.salaryRange}</p>
          </div>
        )}
        <div className="glass-card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-xs text-white/40 mb-1">Verdict</p>
          <p className="text-base font-bold" style={{ color: vc.color }}>{hiring.verdictLabel}</p>
        </div>
      </motion.div>
    </div>
  );
}
