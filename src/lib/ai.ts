import type { UserProfile, CareerAnalysis } from "@/types";
import { generateId } from "./utils";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function getApiKey(): string {
  const key =
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    "";
  return key;
}

function buildSystemPrompt(): string {
  return `You are CareerPilot AI — a world-class career intelligence system that combines the expertise of:
- A senior engineer at a FAANG company who has mentored 200+ developers
- A technical recruiter who has reviewed 50,000+ developer profiles
- A startup founder and SaaS advisor who has built and shipped 10+ products
- A career strategist who specializes in fast-tracking developer careers

Your job is to provide brutally honest, deeply personalized, and strategically useful career intelligence.
NEVER give generic advice. NEVER recommend todo apps, calculators, or weather app clones.
ALWAYS tailor every recommendation to the specific user's level, goals, timeline, and constraints.
Prioritize practical, high-ROI actions that will visibly move the needle in the shortest time.
Be direct, specific, and actionable. Think like a strategist, not a cheerleader.`;
}

function buildUserPrompt(profile: UserProfile): string {
  return `Analyze this developer profile and generate a complete, deeply personalized career intelligence report.

## Developer Profile
- **Name**: ${profile.name || "Developer"}
- **Skill Level**: ${profile.skillLevel}
- **Current Skills**: ${profile.skills.join(", ") || "None specified"}
- **Interests**: ${profile.interests.join(", ") || "General development"}
- **Primary Goal**: ${profile.goal}
- **Tech Stack Focus**: ${profile.techStack}
- **Available Time**: ${profile.hoursPerDay} hours/day
- **Timeline**: ${profile.timeline}
- **Target Role**: ${profile.targetRole || "Not specified"}
- **Target Companies**: ${profile.targetCompanies?.join(", ") || "Open"}
${profile.extraContext ? `- **Extra Context**: ${profile.extraContext}` : ""}
${profile.portfolioUrl ? `- **Portfolio**: ${profile.portfolioUrl}` : ""}
${profile.githubUrl ? `- **GitHub**: ${profile.githubUrl}` : ""}
${profile.resumeText ? `- **Resume Notes**: ${profile.resumeText.substring(0, 500)}` : ""}

## Required Output Format (respond ONLY with valid JSON, no markdown fences):

{
  "snapshot": {
    "currentLevel": "string - honest 1-line assessment of their current level",
    "strongestSkill": "string - their most valuable current skill",
    "weakestGap": "string - the single biggest thing holding them back",
    "hiringReadiness": number (0-100),
    "marketScore": number (0-100),
    "summary": "string - 3-4 sentence honest assessment",
    "recruiterTake": "string - exactly what a recruiter would think seeing their profile",
    "technicalMentorTake": "string - what a senior engineer would say about their skill set",
    "keyStrengths": ["array of 3-5 specific strengths"],
    "keyWeaknesses": ["array of 3-5 specific gaps"],
    "immediateActions": ["array of 3 things to do THIS WEEK"],
    "timeToGoal": "string - realistic estimate to reach their stated goal"
  },
  "roadmap": {
    "title": "string - personalized roadmap title",
    "totalDuration": "string",
    "approach": "string - the overall strategy in 2 sentences",
    "phases": [
      {
        "phase": 1,
        "title": "string",
        "duration": "string e.g. Week 1-3",
        "focus": "string - one-line focus area",
        "description": "string - 2-3 sentences",
        "topics": [
          {
            "name": "string",
            "priority": "critical|important|optional",
            "estimatedHours": number,
            "why": "string - why this matters for their specific goal"
          }
        ],
        "milestones": ["array of 3-4 checkpoints"],
        "weeklyGoals": ["array of weekly targets"],
        "resources": [
          {
            "title": "string",
            "type": "course|book|doc|project|video|tool",
            "url": "string optional",
            "free": boolean,
            "why": "string"
          }
        ],
        "checkpoints": ["array of things to verify before moving on"],
        "outcomeBy": "string - what they will have built/learned"
      }
    ],
    "skillsToIgnore": ["skills that are low-ROI for their goal right now"],
    "criticalTools": ["top 5 tools they must master"],
    "weeklySchedule": "string - suggested daily/weekly time allocation",
    "progressMarkers": ["string milestones that prove progress"]
  },
  "projects": [
    {
      "id": "string",
      "title": "string - strong startup-style title",
      "hook": "string - one powerful line that makes them want to build it",
      "whyThisProject": "string - specific reason it fits this user's goal",
      "difficulty": number (1-5),
      "buildTime": "string e.g. 2-3 weeks",
      "mvpScope": "string - exactly what the MVP is",
      "coreFeatures": ["array of 5-7 specific features"],
      "techStack": ["array of specific technologies"],
      "monetizationPotential": "string",
      "resumeValue": "string - what it proves to employers",
      "portfolioImpact": "string - how it stands out",
      "buildRoadmap": ["array of 5 build steps in order"],
      "targetAudience": "string",
      "marketSize": "string",
      "similarProducts": ["string - real products in this space"],
      "uniqueAngle": "string - what makes this version interesting",
      "resumeBullets": ["array of 2-3 ATS-optimized resume bullet points"],
      "saasUpgradePath": "string - how to turn this into a paid product"
    }
  ],
  "skillGap": {
    "overallGapScore": number (0-100, 100 = no gap),
    "readySkills": [
      {
        "skill": "string",
        "currentLevel": number (0-100),
        "requiredLevel": number (0-100),
        "gap": number,
        "priority": "critical|high|medium|low|skip",
        "marketRelevance": number (0-100),
        "careerROI": "string - e.g. High — opens 60% more roles",
        "estimatedHoursToClose": number,
        "resourceToLearn": "string - specific resource",
        "whyItMatters": "string"
      }
    ],
    "gapSkills": [
      {
        "skill": "string",
        "currentLevel": number (0-100),
        "requiredLevel": number (0-100),
        "gap": number,
        "priority": "critical|high|medium|low|skip",
        "marketRelevance": number (0-100),
        "careerROI": "string",
        "estimatedHoursToClose": number,
        "resourceToLearn": "string",
        "whyItMatters": "string"
      }
    ],
    "ignoreSkills": ["skills to avoid or deprioritize entirely"],
    "priorityOrder": ["ordered list of skills to learn"],
    "topThreeActions": ["3 most impactful skill investments right now"],
    "summary": "string - 2-3 sentence skill gap summary"
  },
  "hiring": {
    "overallScore": number (0-100),
    "recruiterScore": number (0-100),
    "technicalScore": number (0-100),
    "portfolioScore": number (0-100),
    "communicationScore": number (0-100),
    "marketCompetitivenessScore": number (0-100),
    "verdict": "not-ready|almost-ready|ready|highly-competitive",
    "verdictLabel": "string - human-friendly label",
    "summary": "string - blunt honest 3-4 sentence assessment",
    "recruiterTake": "string - what a recruiter would say in 30 seconds",
    "portfolioSignals": ["what their current portfolio communicates"],
    "resumeGaps": ["specific things missing from their resume"],
    "quickWins": ["changes that take <1 week but boost score significantly"],
    "longTermMoves": ["strategic 1-3 month improvements"],
    "estimatedTimeToReady": "string",
    "salaryRange": "string - realistic salary range for their target role/location",
    "jobTitlesToTarget": ["specific job titles to apply for now"],
    "companiesThatWouldHire": ["types/names of companies that would interview them now"]
  }
}

CRITICAL RULES:
1. Generate exactly 4 roadmap phases
2. Generate exactly 4 project ideas — all must be non-trivial, impressive, and career-relevant
3. Include 3-5 ready skills and 4-7 gap skills in skillGap
4. All numbers must be realistic and based on the actual profile
5. Projects must NOT be: todo apps, calculators, weather apps, simple CRUD, or clone projects without unique angles
6. Every recommendation must directly serve the user's stated goal: ${profile.goal}
7. Be honest — if they are not ready, say so clearly`;
}

export async function generateCareerAnalysis(
  profile: UserProfile,
  onProgress?: (p: number, step: string) => void
): Promise<CareerAnalysis> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "Gemini API key is not set. Add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local"
    );
  }

  onProgress?.(10, "Analyzing your profile...");

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { text: buildSystemPrompt() + "\n\n" + buildUserPrompt(profile) },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  };

  onProgress?.(25, "Generating career roadmap...");

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  onProgress?.(60, "Analyzing skill gaps...");

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  onProgress?.(80, "Building hiring analysis...");

  const rawText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  let parsed: Omit<CareerAnalysis, "generatedAt" | "userProfile">;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    // Try to extract JSON from the text
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error("Failed to parse AI response. Please try again.");
    }
  }

  onProgress?.(95, "Finalizing your intelligence report...");

  // Inject IDs into projects
  parsed.projects = parsed.projects.map((p) => ({
    ...p,
    id: p.id || generateId(),
  }));

  const analysis: CareerAnalysis = {
    ...parsed,
    generatedAt: new Date().toISOString(),
    userProfile: profile,
  };

  onProgress?.(100, "Done!");
  return analysis;
}
