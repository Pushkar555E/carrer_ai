// ============================================================
// cn utility — merge tailwind classes
// ============================================================
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}

export function getDifficultyLabel(d: number): string {
  const labels = ["", "Beginner", "Easy", "Intermediate", "Advanced", "Expert"];
  return labels[d] || "Unknown";
}

export function getDifficultyColor(d: number): string {
  const colors = ["", "#10b981", "#22d3ee", "#f59e0b", "#f97316", "#ef4444"];
  return colors[d] || "#9ca3af";
}

export function getPriorityColor(p: string): string {
  switch (p) {
    case "critical": return "#ef4444";
    case "high": return "#f97316";
    case "medium": return "#f59e0b";
    case "low": return "#10b981";
    default: return "#6b7280";
  }
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.substring(0, n - 1) + "…" : str;
}
