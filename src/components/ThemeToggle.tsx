"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
        border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5
        hover:bg-white/10 dark:hover:bg-white/10
        hover:border-blue-400/30 dark:hover:border-blue-400/30
        light:border-slate-200 light:bg-slate-100 light:hover:bg-slate-200
        ${className}`}
      style={{
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(15,23,42,0.12)",
      }}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-12" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600 transition-transform duration-300" />
      )}
    </button>
  );
}
