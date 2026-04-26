"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCareerStore } from "@/store/careerStore";
import { Sparkles, Trash2, Pin, ArrowRight, Clock, Target, BarChart3, Plus } from "lucide-react";
import { formatDate, getScoreColor } from "@/lib/utils";

const GOAL_LABELS: Record<string, string> = {
  "get-job": "Get Hired",
  "internship": "Internship",
  "freelance": "Freelance",
  "saas": "Build SaaS",
  "hackathon": "Hackathon",
  "faang": "FAANG",
  "promotion": "Promotion",
  "pivot": "Career Pivot",
};

export default function DashboardPage() {
  const router = useRouter();
  const { savedAnalyses, deleteSavedAnalysis, pinSavedAnalysis, setCurrentAnalysis, setActiveTab } = useCareerStore();

  const pinned = savedAnalyses.filter((a) => a.pinned);
  const unpinned = savedAnalyses.filter((a) => !a.pinned);
  const sorted = [...pinned, ...unpinned];

  const openAnalysis = (id: string) => {
    const found = savedAnalyses.find((a) => a.id === id);
    if (found) {
      setCurrentAnalysis(found.analysis);
      setActiveTab("snapshot");
      router.push("/results");
    }
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/6 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="glass border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white">CareerPilot <span className="text-violet-400">AI</span></span>
          </button>
          <button onClick={() => router.push("/onboarding")} className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Analysis
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Saved Plans</h1>
          <p className="text-white/50">{savedAnalyses.length} career intelligence reports saved</p>
        </div>

        {savedAnalyses.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No saved plans yet</h2>
            <p className="text-white/40 text-sm mb-6 max-w-sm mx-auto">
              Generate your first career intelligence report and save it to track your progress over time.
            </p>
            <button onClick={() => router.push("/onboarding")} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Generate My First Plan
            </button>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } }, hidden: {} }}>
            {sorted.map((save) => {
              const { analysis } = save;
              const { snapshot, hiring, userProfile } = analysis;
              const hiringColor = getScoreColor(hiring.overallScore);

              return (
                <motion.div key={save.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  className="glass-card p-5 card-hover relative group">
                  {save.pinned && (
                    <div className="absolute top-3 right-3">
                      <Pin className="w-3.5 h-3.5 text-violet-400 fill-violet-400" />
                    </div>
                  )}

                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">{save.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-white/40 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {formatDate(save.createdAt)}
                        <span className="chip chip-violet py-0 px-1.5 text-xs">{GOAL_LABELS[userProfile.goal] || userProfile.goal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-white/3 border border-white/6 text-center">
                      <p className="text-xs text-white/40">Readiness</p>
                      <p className="text-sm font-bold" style={{ color: getScoreColor(snapshot.hiringReadiness) }}>
                        {snapshot.hiringReadiness}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/3 border border-white/6 text-center">
                      <p className="text-xs text-white/40">Market</p>
                      <p className="text-sm font-bold" style={{ color: getScoreColor(snapshot.marketScore) }}>
                        {snapshot.marketScore}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/3 border border-white/6 text-center">
                      <p className="text-xs text-white/40">Hiring</p>
                      <p className="text-sm font-bold" style={{ color: hiringColor }}>{hiring.overallScore}</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 mb-4 line-clamp-2">{snapshot.summary}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => openAnalysis(save.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium hover:bg-violet-500/20 transition-all">
                      View Report <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => pinSavedAnalysis(save.id)} className="p-2 rounded-lg bg-white/4 border border-white/8 text-white/40 hover:text-white hover:border-white/20 transition-all" title={save.pinned ? "Unpin" : "Pin"}>
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteSavedAnalysis(save.id)} className="p-2 rounded-lg bg-white/4 border border-white/8 text-white/40 hover:text-rose-400 hover:border-rose-500/20 transition-all" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
