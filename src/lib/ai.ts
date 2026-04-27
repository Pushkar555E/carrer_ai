import type { UserProfile, CareerAnalysis } from "@/types";
import { jsonrepair } from "jsonrepair";
import { generateId } from "./utils";

// ── Free-tier Gemini models (confirmed working model IDs) ──
const MODELS = [
  "gemini-2.5-flash-preview-04-17", // Best quality (also try stable alias below)
  "gemini-2.5-flash",               // Stable alias
  "gemini-2.0-flash",               // 200 RPD free
  "gemini-2.0-flash-lite",          // 1500 RPD free — very generous
  "gemini-1.5-flash",               // 1500 RPD free
  "gemini-1.5-flash-8b",            // 1500 RPD free — smallest, fastest
] as const;

const GEMINI_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";

// ── Multi-key support ──────────────────────────────────────
// Add NEXT_PUBLIC_GEMINI_API_KEY_2, _3, etc. in Vercel env vars
// to multiply your daily quota. Free keys from: aistudio.google.com
function getApiKeys(): string[] {
  const keys: string[] = [];
  const primary =
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    "";
  if (primary) keys.push(primary);

  // Support up to 5 additional keys
  for (let i = 2; i <= 6; i++) {
    const k =
      process.env[`NEXT_PUBLIC_GEMINI_API_KEY_${i}`] ||
      process.env[`GEMINI_API_KEY_${i}`] ||
      "";
    if (k && k !== primary) keys.push(k);
  }
  return keys;
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
        "milestones": ["array of 2 checkpoints"],
        "weeklyGoals": ["array of 2 weekly targets"],
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
      "coreFeatures": ["array of 3-4 specific features"],
      "techStack": ["array of 3 specific technologies"],
      "monetizationPotential": "string",
      "resumeValue": "string - what it proves to employers",
      "portfolioImpact": "string - how it stands out",
      "buildRoadmap": ["array of 3 build steps in order"],
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
1. Generate EXACTLY 2 roadmap phases to avoid max token limits.
2. Generate EXACTLY 2 project ideas.
3. Include exactly 2 ready skills and 2 gap skills in skillGap.
4. Ensure NO ARRAY has more than 3 items to save space.
5. Keep every string under 10 words. Be ruthlessly brief.
6. CRITICAL: NEVER use unescaped double quotes inside your string values. Return strictly valid JSON.
7. Projects must NOT be: todo apps, calculators, weather apps, simple CRUD, or clone projects without unique angles.
8. Every recommendation must directly serve the user's stated goal: ${profile.goal}`;
}

export async function generateCareerAnalysis(
  profile: UserProfile,
  onProgress?: (p: number, step: string) => void
): Promise<CareerAnalysis> {
  const apiKeys = getApiKeys();

  if (apiKeys.length === 0) {
    throw new Error(
      "Gemini API key not set. Add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local or Vercel environment variables."
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
      maxOutputTokens: 4096, // Reduced from 8192 to halve quota usage per request
      responseMimeType: "application/json",
    },
  };

  onProgress?.(25, "Generating career roadmap...");

  // ── Key × Model waterfall ──────────────────────────────────────────────
  // Iterates every (API key × model) combination.
  // - 429 (quota exhausted on this key+model) → try next combination instantly
  // - 503 (overloaded) → 1 retry with 1.5s, then next combination
  // - 404 (bad model name) → skip immediately
  let response: Response | null = null;
  let lastError = "";
  let attemptCount = 0;

  outer:
  for (const apiKey of apiKeys) {
    for (let mi = 0; mi < MODELS.length; mi++) {
      const model = MODELS[mi];
      const endpoint = `${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`;
      const keyLabel = apiKeys.length > 1
        ? `Key${apiKeys.indexOf(apiKey) + 1}/${model}`
        : model;

      attemptCount++;
      if (attemptCount > 1) {
        onProgress?.(
          25 + Math.min(attemptCount * 4, 30),
          `Trying ${keyLabel}...`
        );
      }

      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) break outer;

      const status = response.status;

      if (status === 404) {
        lastError = `${model}: not found (404)`;
        continue;
      }

      if (status === 429) {
        lastError = `${model}: quota exhausted (429)`;
        onProgress?.(
          25 + Math.min(attemptCount * 4, 30),
          `${model} quota full — trying next...`
        );
        continue;
      }

      if (status === 503) {
        lastError = `${model}: overloaded (503)`;
        await new Promise((r) => setTimeout(r, 1500));
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (response.ok) break outer;
        lastError = `${model}: still overloaded`;
        continue;
      }

      const errText = await response.text().catch(() => String(status));
      lastError = `${model}: ${status}`;
      console.error(`[CareerPilot] ${model} HTTP ${status}:`, errText.slice(0, 200));
    }
  }

  onProgress?.(60, "Analyzing skill gaps...");

  if (!response || !response.ok) {
    throw new Error(
      `All AI models are currently unavailable. Last error: ${lastError}. Please try again in a moment.`
    );
  }

  const data = await response.json();
  onProgress?.(80, "Building hiring analysis...");

  const rawText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  let parsed: any;
  try {
    parsed = JSON.parse(rawText);
  } catch (e) {
    // Try to extract JSON from the text and repair it
    const match = rawText.match(/\{[\s\S]*/);
    if (match) {
      try {
        const repaired = jsonrepair(match[0]);
        parsed = JSON.parse(repaired);
      } catch(e2) {
        console.error("Repair failed", e2);
        throw new Error("Failed to parse AI response. Please try again.");
      }
    } else {
      throw new Error("Failed to parse AI response. Please try again.");
    }
  }

  onProgress?.(95, "Finalizing your intelligence report...");

  // Safe fallbacks for truncated properties
  parsed.projects = (parsed.projects || []).map((p: any) => ({
    ...p,
    id: p.id || generateId(),
  }));
  parsed.roadmap = parsed.roadmap || { phases: [] };
  parsed.skillGap = parsed.skillGap || { readySkills: [], gapSkills: [] };
  parsed.hiring = parsed.hiring || { portfolioSignals: [], resumeGaps: [], quickWins: [], longTermMoves: [], jobTitlesToTarget: [], companiesThatWouldHire: [] };

  const analysis: CareerAnalysis = {
    ...parsed,
    generatedAt: new Date().toISOString(),
    userProfile: profile,
  };

  onProgress?.(100, "Done!");
  return analysis;
}
