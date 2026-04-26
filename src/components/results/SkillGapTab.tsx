"use client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import type { SkillGapReport, SkillAnalysis } from "@/types";
import { getPriorityColor } from "@/lib/utils";

interface Props { skillGap: SkillGapReport; }

function SkillBar({ skill }: { skill: SkillAnalysis }) {
  const priorityColor = getPriorityColor(skill.priority);
  const gapPct = Math.max(0, skill.requiredLevel - skill.currentLevel);

  return (
    <div className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-white">{skill.skill}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${priorityColor}15`, border: `1px solid ${priorityColor}30`, color: priorityColor }}>
            {skill.priority}
          </span>
        </div>
        <span className="text-xs text-white/40 flex-shrink-0">Market: <span className="text-white/60">{skill.marketRelevance}%</span></span>
      </div>

      {/* Skill bar */}
      <div className="relative h-2 bg-white/6 rounded-full overflow-hidden mb-2">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: `${priorityColor}60` }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.currentLevel}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Required level marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-white/40"
          style={{ left: `${skill.requiredLevel}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-white/40 mb-2">
        <span>Current: <span className="text-white/60">{skill.currentLevel}%</span></span>
        <span>Required: <span className="text-white/60">{skill.requiredLevel}%</span></span>
        {gapPct > 0 && <span className="text-rose-400">Gap: {gapPct}%</span>}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-white/40">{skill.careerROI}</span>
        {skill.estimatedHoursToClose > 0 && (
          <span className="text-white/30">~{skill.estimatedHoursToClose}h to close</span>
        )}
      </div>

      {skill.whyItMatters && (
        <p className="text-xs text-white/40 mt-2 leading-relaxed">{skill.whyItMatters}</p>
      )}
    </div>
  );
}

export default function SkillGapTab({ skillGap }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">Skill Gap Analyzer</h2>
            <p className="text-sm text-white/50 mb-3">{skillGap.summary}</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-white/40">Overall Gap Score</p>
                <p className="text-2xl font-bold" style={{ color: skillGap.overallGapScore >= 70 ? "#10b981" : skillGap.overallGapScore >= 50 ? "#f59e0b" : "#ef4444" }}>
                  {skillGap.overallGapScore}/100
                </p>
              </div>
              <div className="h-10 w-px bg-white/8" />
              <div>
                <p className="text-xs text-white/40">Skills ready</p>
                <p className="text-2xl font-bold text-emerald-400">{skillGap.readySkills?.length ?? 0}</p>
              </div>
              <div className="h-10 w-px bg-white/8" />
              <div>
                <p className="text-xs text-white/40">Gaps identified</p>
                <p className="text-2xl font-bold text-rose-400">{skillGap.gapSkills?.length ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-violet-400" /> Top 3 Highest-ROI Skill Investments Right Now
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {skillGap.topThreeActions?.map((action, i) => (
            <div key={i} className="p-4 rounded-xl bg-violet-500/8 border border-violet-500/20">
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400 mb-2">{i+1}</div>
              <p className="text-sm text-white/80">{action}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Priority order */}
      {skillGap.priorityOrder && skillGap.priorityOrder.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Learn in this order:</h3>
          <div className="flex flex-wrap gap-2">
            {skillGap.priorityOrder.map((skill, i) => (
              <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-xs text-white/70">
                <span className="text-white/30 font-mono">{i+1}</span> {skill}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gap skills */}
      {skillGap.gapSkills && skillGap.gapSkills.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-rose-400" /> Skills to Develop
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillGap.gapSkills.map((s) => <SkillBar key={s.skill} skill={s} />)}
          </div>
        </motion.div>
      )}

      {/* Ready skills */}
      {skillGap.readySkills && skillGap.readySkills.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Skills You Already Have
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillGap.readySkills.map((s) => <SkillBar key={s.skill} skill={s} />)}
          </div>
        </motion.div>
      )}

      {/* Skills to ignore */}
      {skillGap.ignoreSkills && skillGap.ignoreSkills.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white/30" /> Skip / Deprioritize Entirely
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillGap.ignoreSkills.map((s) => (
              <span key={s} className="chip chip-rose line-through opacity-60">{s}</span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
