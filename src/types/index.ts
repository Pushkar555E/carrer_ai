// ============================================================
// CareerPilot AI — Core Types
// ============================================================

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type GoalType =
  | "get-job"
  | "internship"
  | "freelance"
  | "saas"
  | "hackathon"
  | "faang"
  | "promotion"
  | "pivot";

export type TechStack =
  | "frontend"
  | "backend"
  | "fullstack"
  | "mobile"
  | "ai-ml"
  | "devops"
  | "data"
  | "blockchain"
  | "game-dev"
  | "embedded";

export type Timeline = "1month" | "3months" | "6months" | "1year" | "2years";

export type HoursPerDay = number;

export interface UserProfile {
  // Core Info
  name: string;
  skillLevel: SkillLevel;
  skills: string[];
  interests: string[];
  goal: GoalType;
  techStack: TechStack;
  timeline: Timeline;
  hoursPerDay: HoursPerDay;
  // Optional Deep Context
  extraContext?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  resumeText?: string;
  targetCompanies?: string[];
  targetRole?: string;
}

// ─── AI Output Types ──────────────────────────────────────

export interface CareerSnapshot {
  currentLevel: string;
  strongestSkill: string;
  weakestGap: string;
  hiringReadiness: number; // 0-100
  marketScore: number; // 0-100
  summary: string;
  recruiterTake: string;
  technicalMentorTake: string;
  keyStrengths: string[];
  keyWeaknesses: string[];
  immediateActions: string[];
  timeToGoal: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  focus: string;
  description: string;
  topics: RoadmapTopic[];
  milestones: string[];
  weeklyGoals: string[];
  resources: Resource[];
  checkpoints: string[];
  outcomeBy: string;
}

export interface RoadmapTopic {
  name: string;
  priority: "critical" | "important" | "optional";
  estimatedHours: number;
  why: string;
}

export interface Resource {
  title: string;
  type: "course" | "book" | "doc" | "project" | "video" | "tool";
  url?: string;
  free: boolean;
  why: string;
}

export interface CareerRoadmap {
  title: string;
  totalDuration: string;
  approach: string;
  phases: RoadmapPhase[];
  skillsToIgnore: string[];
  criticalTools: string[];
  weeklySchedule: string;
  progressMarkers: string[];
}

export interface ProjectIdea {
  id: string;
  title: string;
  hook: string;
  whyThisProject: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  buildTime: string;
  mvpScope: string;
  coreFeatures: string[];
  techStack: string[];
  monetizationPotential: string;
  resumeValue: string;
  portfolioImpact: string;
  buildRoadmap: string[];
  targetAudience: string;
  marketSize: string;
  similarProducts: string[];
  uniqueAngle: string;
  resumeBullets: string[];
  saasUpgradePath?: string;
}

export interface SkillAnalysis {
  skill: string;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  gap: number;
  priority: "critical" | "high" | "medium" | "low" | "skip";
  marketRelevance: number; // 0-100
  careerROI: string;
  estimatedHoursToClose: number;
  resourceToLearn: string;
  whyItMatters: string;
  isCurrentlyLow?: boolean;
}

export interface SkillGapReport {
  overallGapScore: number;
  readySkills: SkillAnalysis[];
  gapSkills: SkillAnalysis[];
  ignoreSkills: string[];
  priorityOrder: string[];
  topThreeActions: string[];
  summary: string;
}

export interface HiringReadinessReport {
  overallScore: number; // 0-100
  recruiterScore: number;
  technicalScore: number;
  portfolioScore: number;
  communicationScore: number;
  marketCompetitivenessScore: number;
  verdict: "not-ready" | "almost-ready" | "ready" | "highly-competitive";
  verdictLabel: string;
  summary: string;
  recruiterTake: string;
  portfolioSignals: string[];
  resumeGaps: string[];
  quickWins: string[];
  longTermMoves: string[];
  estimatedTimeToReady: string;
  salaryRange?: string;
  jobTitlesToTarget: string[];
  companiesThatWouldHire: string[];
}

export interface CareerAnalysis {
  snapshot: CareerSnapshot;
  roadmap: CareerRoadmap;
  projects: ProjectIdea[];
  skillGap: SkillGapReport;
  hiring: HiringReadinessReport;
  generatedAt: string;
  userProfile: UserProfile;
}

// ─── App Store Types ─────────────────────────────────────

export interface SavedAnalysis {
  id: string;
  title: string;
  createdAt: string;
  analysis: CareerAnalysis;
  pinned?: boolean;
}

export interface AppState {
  savedAnalyses: SavedAnalysis[];
  currentAnalysis: CareerAnalysis | null;
  isGenerating: boolean;
  generationProgress: number;
  generationStep: string;
  activeTab: string;
}
