"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCareerStore } from "@/store/careerStore";
import { Sparkles, ArrowLeft, Save, RefreshCw } from "lucide-react";
import SnapshotTab from "@/components/results/SnapshotTab";
import RoadmapTab from "@/components/results/RoadmapTab";
import ProjectsTab from "@/components/results/ProjectsTab";
import SkillGapTab from "@/components/results/SkillGapTab";
import HiringTab from "@/components/results/HiringTab";

const TABS = [
  { id: "snapshot", label: "Career Snapshot", emoji: "🎯" },
  { id: "roadmap", label: "Roadmap", emoji: "🗺️" },
  { id: "projects", label: "Projects", emoji: "🚀" },
  { id: "skills", label: "Skill Gap", emoji: "📊" },
  { id: "hiring", label: "Hiring", emoji: "💼" },
];

export default function ResultsPage() {
  const router = useRouter();
  const { currentAnalysis, activeTab, setActiveTab, saveCurrentAnalysis } = useCareerStore();

  useEffect(() => {
    if (!currentAnalysis) router.push("/onboarding");
  }, [currentAnalysis, router]);

  if (!currentAnalysis) return null;

  const { snapshot, roadmap, projects, skillGap, hiring, userProfile } = currentAnalysis;

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/")} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                CareerPilot AI
              </span>
            </button>
            <span className="text-white/20">›</span>
            <span className="text-sm text-white/60">
              {userProfile.name ? `${userProfile.name}'s` : "Your"} Career Intelligence Report
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => saveCurrentAnalysis()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <Save className="w-3.5 h-3.5" /> Save Plan
            </button>
            <button
              onClick={() => router.push("/onboarding")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium btn-primary"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Regenerate
            </button>
          </div>
        </div>

        {/* Score bar */}
        <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-6 overflow-x-auto">
          <div className="flex items-center gap-2 text-xs text-white/40 flex-shrink-0">
            <span>Overall Readiness:</span>
            <span className="font-bold text-lg" style={{ color: snapshot.hiringReadiness >= 70 ? "#10b981" : snapshot.hiringReadiness >= 50 ? "#f59e0b" : "#ef4444" }}>
              {snapshot.hiringReadiness}/100
            </span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>Market Score: <span className="text-white/70">{snapshot.marketScore}/100</span></span>
            <span>Time to Goal: <span className="text-white/70">{snapshot.timeToGoal}</span></span>
            <span>Hiring Score: <span className="text-white/70">{hiring.overallScore}/100</span></span>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto pb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? "border-violet-500 text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              <span>{tab.emoji}</span> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === "snapshot" && <SnapshotTab snapshot={snapshot} profile={userProfile} />}
          {activeTab === "roadmap" && <RoadmapTab roadmap={roadmap} />}
          {activeTab === "projects" && <ProjectsTab projects={projects} />}
          {activeTab === "skills" && <SkillGapTab skillGap={skillGap} />}
          {activeTab === "hiring" && <HiringTab hiring={hiring} />}
        </motion.div>
      </div>
    </div>
  );
}
