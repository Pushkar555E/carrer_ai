"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useCareerStore } from "@/store/careerStore";
import { generateCareerAnalysis } from "@/lib/ai";
import type { UserProfile, SkillLevel, GoalType, TechStack, Timeline } from "@/types";
import { ThemeToggle } from "@/components/ThemeToggle";

const SKILLS_LIST = [
  "HTML","CSS","JavaScript","TypeScript","React","Next.js","Vue","Angular","Svelte",
  "Node.js","Express","FastAPI","Django","Flask","Spring Boot","Laravel","Ruby on Rails",
  "Python","Java","C++","Go","Rust","PHP","Swift","Kotlin","Dart/Flutter",
  "PostgreSQL","MySQL","MongoDB","Redis","Prisma","Supabase","Firebase",
  "AWS","GCP","Azure","Docker","Kubernetes","CI/CD","Terraform","Linux",
  "GraphQL","REST APIs","tRPC","WebSockets","Microservices",
  "TensorFlow","PyTorch","scikit-learn","LangChain","OpenAI API","Pandas","NumPy",
  "Git","GitHub","Figma","Tailwind CSS","Webpack","Vite","Jest","Playwright",
  "Solidity","Web3.js","Unity","Unreal Engine","OpenGL",
];

const INTERESTS = [
  "Web Development","Mobile Apps","AI / ML","DevOps","Blockchain","Game Dev",
  "Data Science","Cybersecurity","Open Source","Freelancing","SaaS","Startups",
  "Design Systems","Developer Tools","Fintech","EdTech","HealthTech","Web3",
];

type Step = "info" | "skills" | "goal" | "context" | "generating";

const STEPS: Step[] = ["info", "skills", "goal", "context"];

export default function OnboardingPage() {
  const router = useRouter();
  const { setCurrentAnalysis, setCurrentProfile, setIsGenerating, setGenerationProgress } = useCareerStore();

  const [step, setStep] = useState<Step>("info");
  const [error, setError] = useState("");
  const [genStep, setGenStep] = useState("");
  const [genProgress, setGenProgress] = useState(0);
  const [customHours, setCustomHours] = useState("");
  const [isCustomHours, setIsCustomHours] = useState(false);
  const [isCustomTimeline, setIsCustomTimeline] = useState(false);
  const [customTimelineVal, setCustomTimelineVal] = useState("");

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    skillLevel: "beginner",
    skills: [],
    interests: [],
    goal: "get-job",
    techStack: "fullstack",
    timeline: "6months",
    hoursPerDay: 2,
    extraContext: "",
    portfolioUrl: "",
    githubUrl: "",
    resumeText: "",
    targetRole: "",
    targetCompanies: [],
  });

  const patch = (k: keyof UserProfile, v: unknown) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const toggleSkill = (s: string) =>
    patch("skills", profile.skills.includes(s)
      ? profile.skills.filter((x) => x !== s)
      : [...profile.skills, s]);

  const toggleInterest = (i: string) =>
    patch("interests", profile.interests.includes(i)
      ? profile.interests.filter((x) => x !== i)
      : [...profile.interests, i]);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex) / (STEPS.length)) * 100;

  const canNext = () => {
    if (step === "info") return profile.name.trim().length > 0;
    if (step === "skills") return profile.skills.length >= 1;
    if (step === "goal") return true;
    return true;
  };

  const next = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const back = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const generate = async () => {
    setStep("generating");
    setIsGenerating(true);
    setError("");
    setGenProgress(0);

    try {
      const analysis = await generateCareerAnalysis(profile, (p, s) => {
        setGenProgress(p);
        setGenStep(s);
        setGenerationProgress(p, s);
      });
      setCurrentProfile(profile);
      setCurrentAnalysis(analysis);
      setIsGenerating(false);
      router.push("/results");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Generation failed";
      setError(msg);
      setStep("context");
      setIsGenerating(false);
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "var(--bg)" }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="flex items-center justify-between w-full max-w-xl mb-8 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>CareerPilot <span style={{ color: "var(--blue)" }}>AI</span></span>
        </div>
        <ThemeToggle />
      </div>

      {step !== "generating" && (
        <div className="w-full max-w-xl mb-6 relative">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/30">
            {["Profile", "Skills", "Goals", "Details"].map((l, i) => (
              <span key={l} className={stepIndex >= i ? "text-violet-400" : ""}>{l}</span>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-xl relative">
        <AnimatePresence mode="wait">
          {/* STEP 1: Info */}
          {step === "info" && (
            <motion.div key="info" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-1">Let's get to know you</h2>
              <p className="text-white/50 text-sm mb-8">A few quick details to personalize your career plan.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Your name</label>
                  <input id="name-input" value={profile.name} onChange={(e) => patch("name", e.target.value)} placeholder="e.g. Alex Chen" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Current skill level</label>
                  <div className="grid grid-cols-2 gap-3">
                    {([["beginner","🌱","Just starting out"],["intermediate","⚡","1-2 years coding"],["advanced","🔥","3-5 years, shipped things"],["expert","🏆","5+ years, senior-level"]] as [SkillLevel,string,string][]).map(([val, emoji, desc]) => (
                      <button key={val} id={`level-${val}`} onClick={() => patch("skillLevel", val)} className={`p-4 rounded-xl border text-left transition-all ${profile.skillLevel === val ? "border-violet-500/60 bg-violet-500/10 text-white" : "border-white/8 bg-white/3 text-white/60 hover:border-white/20"}`}>
                        <div className="text-xl mb-1">{emoji}</div>
                        <div className="text-sm font-medium capitalize">{val}</div>
                        <div className="text-xs text-white/40 mt-0.5">{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Target role <span className="text-white/30">(optional)</span></label>
                  <input value={profile.targetRole || ""} onChange={(e) => patch("targetRole", e.target.value)} placeholder="e.g. Full-Stack Engineer, ML Engineer, DevOps..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Skills */}
          {step === "skills" && (
            <motion.div key="skills" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-1">What do you already know?</h2>
              <p className="text-white/50 text-sm mb-6">Select all skills you're comfortable with. Be honest — this powers your analysis.</p>
              <div className="flex flex-wrap gap-2 mb-6 max-h-72 overflow-y-auto pr-1">
                {SKILLS_LIST.map((s) => (
                  <button key={s} onClick={() => toggleSkill(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${profile.skills.includes(s) ? "bg-violet-500/20 border-violet-500/50 text-violet-300" : "bg-white/4 border-white/8 text-white/50 hover:border-white/20 hover:text-white/80"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">Interests & areas you enjoy</label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <button key={i} onClick={() => toggleInterest(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${profile.interests.includes(i) ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300" : "bg-white/4 border-white/8 text-white/50 hover:border-white/20"}`}>
                      {i}
                    </button>
                  ))}
                </div>
              </div>
              {profile.skills.length > 0 && (
                <p className="mt-4 text-xs text-violet-400">{profile.skills.length} skills selected</p>
              )}
            </motion.div>
          )}

          {/* STEP 3: Goal */}
          {step === "goal" && (
            <motion.div key="goal" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-1">What's your primary goal?</h2>
              <p className="text-white/50 text-sm mb-6">This shapes every recommendation we make.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Goal</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      ["get-job","💼","Get hired (full-time)"],
                      ["internship","🎓","Land an internship"],
                      ["freelance","🌐","Become freelance-ready"],
                      ["saas","🚀","Build & launch SaaS"],
                      ["hackathon","⚡","Win hackathons"],
                      ["faang","🏆","FAANG / top-tier companies"],
                      ["promotion","📈","Get promoted"],
                      ["pivot","🔄","Career pivot into tech"],
                    ] as [GoalType, string, string][]).map(([val, emoji, label]) => (
                      <button key={val} id={`goal-${val}`} onClick={() => patch("goal", val)} className={`p-3 rounded-xl border text-left text-sm transition-all flex items-center gap-2 ${profile.goal === val ? "border-violet-500/60 bg-violet-500/10 text-white" : "border-white/8 bg-white/3 text-white/50 hover:border-white/20"}`}>
                        <span>{emoji}</span> {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Tech stack focus</label>
                  <select value={profile.techStack} onChange={(e) => patch("techStack", e.target.value as TechStack)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 transition-all appearance-none">
                    {[["frontend","Frontend (React, Vue, etc.)"],["backend","Backend (Node, Python, etc.)"],["fullstack","Full-Stack"],["mobile","Mobile (React Native, Flutter)"],["ai-ml","AI / ML Engineering"],["devops","DevOps / Cloud"],["data","Data Engineering"],["blockchain","Blockchain / Web3"],["game-dev","Game Development"],["embedded","Embedded / Systems"]].map(([v,l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-4">
                  {/* ── Available time/day ── */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Available time/day</label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 4, 6, 8].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => { setIsCustomHours(false); patch("hoursPerDay", h); }}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                            !isCustomHours && profile.hoursPerDay === h
                              ? "border-violet-500/60 bg-violet-500/15 text-violet-300"
                              : "border-white/8 bg-white/3 text-white/50 hover:border-white/20 hover:text-white/80"
                          }`}
                        >
                          {h}h
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => { setIsCustomHours(true); setCustomHours(""); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          isCustomHours
                            ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-300"
                            : "border-white/8 bg-white/3 text-white/50 hover:border-white/20 hover:text-white/80"
                        }`}
                      >
                        Custom
                      </button>
                    </div>
                    <AnimatePresence>
                      {isCustomHours && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0.5"
                              max="24"
                              step="0.5"
                              value={customHours}
                              placeholder="e.g. 3"
                              onChange={(e) => {
                                setCustomHours(e.target.value);
                                const n = parseFloat(e.target.value);
                                if (!isNaN(n) && n > 0) patch("hoursPerDay", n);
                              }}
                              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-cyan-500/40 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/70 transition-all"
                            />
                            <span className="text-white/40 text-sm whitespace-nowrap">hrs/day</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Target timeline ── */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Target timeline</label>
                    <select
                      value={isCustomTimeline ? "custom" : profile.timeline}
                      onChange={(e) => {
                        if (e.target.value === "custom") {
                          setIsCustomTimeline(true);
                        } else {
                          setIsCustomTimeline(false);
                          patch("timeline", e.target.value);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    >
                      {[["1month","1 month"],["3months","3 months"],["6months","6 months"],["1year","1 year"],["2years","2 years"],["custom","⌨ Custom..."]].map(([v,l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                    <AnimatePresence>
                      {isCustomTimeline && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <input
                            type="text"
                            value={customTimelineVal}
                            placeholder="e.g. 8 months, 18 months..."
                            onChange={(e) => {
                              setCustomTimelineVal(e.target.value);
                              // Store as a custom string; AI reads it as plain text
                              patch("timeline", e.target.value);
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-violet-500/40 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/70 transition-all"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Context */}
          {step === "context" && (
            <motion.div key="context" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-1">Add extra context <span className="text-white/30 text-base font-normal">(optional)</span></h2>
              <p className="text-white/50 text-sm mb-6">The more you share, the more personalized your plan. All optional.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Portfolio URL</label>
                  <input value={profile.portfolioUrl || ""} onChange={(e) => patch("portfolioUrl", e.target.value)} placeholder="https://yourportfolio.dev" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">GitHub profile URL</label>
                  <input value={profile.githubUrl || ""} onChange={(e) => patch("githubUrl", e.target.value)} placeholder="https://github.com/yourhandle" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Target companies <span className="text-white/30">(comma-separated)</span></label>
                  <input value={(profile.targetCompanies || []).join(", ")} onChange={(e) => patch("targetCompanies", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} placeholder="e.g. Stripe, Linear, Vercel, Google" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Anything else you want the AI to know?</label>
                  <textarea value={profile.extraContext || ""} onChange={(e) => patch("extraContext", e.target.value)} rows={4} placeholder="e.g. I'm a CS student graduating in 6 months. I've built 2 React apps but never deployed anything. I'm targeting mid-size startups, not big tech..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-all resize-none" />
                </div>
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    ⚠️ {error}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* GENERATING */}
          {step === "generating" && (
            <motion.div key="generating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 pulse-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Analyzing your profile...</h2>
              <p className="text-white/50 text-sm mb-8">{genStep || "Preparing your career intelligence report"}</p>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                  animate={{ width: `${genProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-white/30 text-xs">{genProgress}% complete</p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-white/30">
                {["Career Snapshot","Personalized Roadmap","4 Project Ideas","Skill Gap Analysis","Hiring Readiness Score","Resume Intelligence"].map((item) => (
                  <div key={item} className={`flex items-center gap-2 ${genProgress > 20 ? "text-white/60" : ""}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${genProgress > 50 ? "bg-emerald-400" : "bg-white/20"}`} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step !== "generating" && (
        <div className="w-full max-w-xl mt-6 flex items-center justify-between relative">
          <button
            onClick={back}
            disabled={stepIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/8 hover:border-white/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step === "context" ? (
            <button
              id="generate-btn"
              onClick={generate}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate My Career Plan
            </button>
          ) : (
            <button
              id="next-btn"
              onClick={next}
              disabled={!canNext()}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
