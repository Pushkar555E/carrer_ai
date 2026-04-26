"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ChevronDown, ChevronUp, BookOpen, Clock, CheckCircle, AlertCircle, Star } from "lucide-react";
import type { CareerRoadmap, RoadmapPhase } from "@/types";

interface Props { roadmap: CareerRoadmap; }

const PRIORITY_COLORS = { critical: "#ef4444", important: "#f59e0b", optional: "#6b7280" };
const TYPE_ICONS: Record<string, string> = { course: "🎓", book: "📚", doc: "📄", project: "🔨", video: "🎬", tool: "🛠️" };

function PhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const [open, setOpen] = useState(index === 0);

  const phaseColors = ["#a78bfa", "#38bdf8", "#34d399", "#fb923c"];
  const color = phaseColors[index % phaseColors.length];

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/2 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold"
          style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
          {phase.phase}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white">{phase.title}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}>{phase.duration}</span>
          </div>
          <p className="text-sm text-white/50 mt-0.5">{phase.focus}</p>
        </div>
        <div className="flex-shrink-0">
          {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-white/5 pt-6">
              <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>

              {/* Topics */}
              <div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Topics</h4>
                <div className="space-y-2">
                  {phase.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: PRIORITY_COLORS[topic.priority] }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-white">{topic.name}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${PRIORITY_COLORS[topic.priority]}15`, color: PRIORITY_COLORS[topic.priority] }}>
                            {topic.priority}
                          </span>
                        </div>
                        <p className="text-xs text-white/40 mt-0.5">{topic.why}</p>
                      </div>
                      <span className="text-xs text-white/30 flex-shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {topic.estimatedHours}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two cols: milestones + weekly */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Milestones</h4>
                  <ul className="space-y-2">
                    {phase.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Weekly Goals</h4>
                  <ul className="space-y-2">
                    {phase.weeklyGoals.map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                        <Star className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" /> {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resources */}
              {phase.resources && phase.resources.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.resources.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-xs text-white/60">
                        <span>{TYPE_ICONS[r.type] || "📌"}</span>
                        <span>{r.title}</span>
                        {r.free && <span className="text-emerald-400">free</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcome */}
              <div className="p-4 rounded-xl bg-violet-500/8 border border-violet-500/20">
                <p className="text-xs text-violet-400 font-medium mb-1">By end of this phase:</p>
                <p className="text-sm text-white/80">{phase.outcomeBy}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RoadmapTab({ roadmap }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Map className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{roadmap.title}</h2>
            <p className="text-sm text-white/50 mb-4">{roadmap.approach}</p>
            <div className="flex flex-wrap gap-4 text-xs text-white/40">
              <span>⏱ Total: <span className="text-white/70">{roadmap.totalDuration}</span></span>
              <span>📅 Schedule: <span className="text-white/70">{roadmap.weeklySchedule}</span></span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tools & Ignore */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-emerald-400">🔑</span> Must-Master Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {roadmap.criticalTools?.map((t) => (
              <span key={t} className="chip chip-emerald">{t}</span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Skip These For Now
          </h3>
          <div className="flex flex-wrap gap-2">
            {roadmap.skillsToIgnore?.map((t) => (
              <span key={t} className="chip chip-rose">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {roadmap.phases.map((phase, i) => (
          <motion.div key={phase.phase} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <PhaseCard phase={phase} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Progress markers */}
      {roadmap.progressMarkers && roadmap.progressMarkers.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-400" /> Progress Markers (proof you're on track)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roadmap.progressMarkers.map((m, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/60">
                <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs text-violet-400 flex-shrink-0 mt-0.5">{i + 1}</div>
                {m}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
