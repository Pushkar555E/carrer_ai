"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Star, Clock, Target, DollarSign, FileText, ChevronDown, ChevronUp, Zap } from "lucide-react";
import type { ProjectIdea } from "@/types";
import { getDifficultyLabel, getDifficultyColor } from "@/lib/utils";

interface Props { projects: ProjectIdea[]; }

function DiffBar({ d }: { d: number }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((n) => (
        <div key={n} className="w-4 h-1.5 rounded-full transition-all"
          style={{ background: n <= d ? getDifficultyColor(d) : "rgba(255,255,255,0.08)" }} />
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectIdea; index: number }) {
  const [open, setOpen] = useState(false);
  const colors = ["#a78bfa", "#38bdf8", "#34d399", "#fb923c"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card overflow-hidden card-hover"
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: `${color}18`, border: `1px solid ${color}28`, color }}>
                Project {index + 1}
              </span>
              <DiffBar d={project.difficulty} />
              <span className="text-xs" style={{ color: getDifficultyColor(project.difficulty) }}>
                {getDifficultyLabel(project.difficulty)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/40 flex-shrink-0">
            <Clock className="w-3 h-3" /> {project.buildTime}
          </div>
        </div>

        <p className="text-white/60 text-sm italic mb-4">"{project.hook}"</p>

        <div className="p-3 rounded-xl bg-white/3 border border-white/6 mb-4">
          <p className="text-xs text-white/40 mb-1">Why this project for you:</p>
          <p className="text-sm text-white/70">{project.whyThisProject}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((t) => (
            <span key={t} className="chip chip-violet text-xs">{t}</span>
          ))}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-2.5 rounded-lg bg-white/3 border border-white/6 text-center">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
            <p className="text-xs text-white/40 leading-tight">Monetization</p>
            <p className="text-xs text-white/70 mt-0.5 truncate">{project.monetizationPotential}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/3 border border-white/6 text-center">
            <FileText className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-white/40 leading-tight">Resume Value</p>
            <p className="text-xs text-white/70 mt-0.5 truncate">{project.resumeValue?.split(".")[0]}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-white/3 border border-white/6 text-center">
            <Star className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
            <p className="text-xs text-white/40 leading-tight">Portfolio Impact</p>
            <p className="text-xs text-white/70 mt-0.5 truncate">{project.portfolioImpact?.split(".")[0]}</p>
          </div>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 py-3 text-xs text-white/40 hover:text-white/70 border-t border-white/5 hover:bg-white/2 transition-all"
      >
        {open ? <><ChevronUp className="w-3.5 h-3.5" /> Show less</> : <><ChevronDown className="w-3.5 h-3.5" /> Full project details</>}
      </button>

      {/* Expanded content */}
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 pb-6 space-y-5 border-t border-white/5">
          {/* MVP Scope */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">MVP Scope</h4>
            <div className="p-3 rounded-xl bg-cyan-500/6 border border-cyan-500/15">
              <p className="text-sm text-white/70">{project.mvpScope}</p>
            </div>
          </div>

          {/* Core features */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Core Features</h4>
            <ul className="space-y-1.5">
              {project.coreFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                  <Zap className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Build roadmap */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Build Roadmap</h4>
            <div className="space-y-2">
              {project.buildRoadmap.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-xs text-violet-400 flex-shrink-0">{i+1}</div>
                  <p className="text-sm text-white/60 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resume bullets */}
          {project.resumeBullets && project.resumeBullets.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Resume Bullets (ATS-optimized)</h4>
              <div className="space-y-2">
                {project.resumeBullets.map((b, i) => (
                  <div key={i} className="p-3 rounded-lg bg-emerald-500/6 border border-emerald-500/15 text-sm text-white/70 font-mono text-xs leading-relaxed">
                    • {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SaaS upgrade */}
          {project.saasUpgradePath && (
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">💰 SaaS Upgrade Path</h4>
              <div className="p-3 rounded-xl bg-amber-500/6 border border-amber-500/15">
                <p className="text-sm text-white/70">{project.saasUpgradePath}</p>
              </div>
            </div>
          )}

          {/* Market info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/3 border border-white/6">
              <p className="text-xs text-white/40 mb-1">Target Audience</p>
              <p className="text-sm text-white/70">{project.targetAudience}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/6">
              <p className="text-xs text-white/40 mb-1">Similar Products</p>
              <p className="text-sm text-white/70">{project.similarProducts?.join(", ")}</p>
            </div>
          </div>

          {project.uniqueAngle && (
            <div className="p-3 rounded-xl bg-violet-500/8 border border-violet-500/20">
              <p className="text-xs text-violet-400 font-medium mb-1">Your Unique Angle:</p>
              <p className="text-sm text-white/70">{project.uniqueAngle}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ProjectsTab({ projects }: Props) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Project Strategy Engine</h2>
            <p className="text-sm text-white/50">{projects.length} high-impact projects — strategic, career-relevant, worth shipping</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </div>
  );
}
