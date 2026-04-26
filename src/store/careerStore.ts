"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CareerAnalysis,
  SavedAnalysis,
  UserProfile,
} from "@/types";
import { generateId } from "@/lib/utils";

interface CareerStore {
  // Current session
  currentAnalysis: CareerAnalysis | null;
  currentProfile: UserProfile | null;
  isGenerating: boolean;
  generationProgress: number;
  generationStep: string;
  activeTab: string;

  // Saved analyses
  savedAnalyses: SavedAnalysis[];

  // Actions
  setCurrentAnalysis: (analysis: CareerAnalysis) => void;
  setCurrentProfile: (profile: UserProfile) => void;
  setIsGenerating: (v: boolean) => void;
  setGenerationProgress: (p: number, step?: string) => void;
  setActiveTab: (tab: string) => void;
  saveCurrentAnalysis: (title?: string) => void;
  deleteSavedAnalysis: (id: string) => void;
  pinSavedAnalysis: (id: string) => void;
  clearCurrent: () => void;
}

export const useCareerStore = create<CareerStore>()(
  persist(
    (set, get) => ({
      currentAnalysis: null,
      currentProfile: null,
      isGenerating: false,
      generationProgress: 0,
      generationStep: "",
      activeTab: "snapshot",
      savedAnalyses: [],

      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
      setCurrentProfile: (profile) => set({ currentProfile: profile }),

      setIsGenerating: (v) =>
        set({ isGenerating: v, generationProgress: v ? 0 : 100 }),

      setGenerationProgress: (p, step) =>
        set({ generationProgress: p, generationStep: step ?? "" }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      saveCurrentAnalysis: (title) => {
        const { currentAnalysis, savedAnalyses } = get();
        if (!currentAnalysis) return;
        const newSave: SavedAnalysis = {
          id: generateId(),
          title:
            title ||
            `${currentAnalysis.userProfile.goal} Plan — ${new Date().toLocaleDateString()}`,
          createdAt: new Date().toISOString(),
          analysis: currentAnalysis,
        };
        set({ savedAnalyses: [newSave, ...savedAnalyses] });
      },

      deleteSavedAnalysis: (id) =>
        set({
          savedAnalyses: get().savedAnalyses.filter((a) => a.id !== id),
        }),

      pinSavedAnalysis: (id) =>
        set({
          savedAnalyses: get().savedAnalyses.map((a) =>
            a.id === id ? { ...a, pinned: !a.pinned } : a
          ),
        }),

      clearCurrent: () =>
        set({
          currentAnalysis: null,
          currentProfile: null,
          generationProgress: 0,
          generationStep: "",
          activeTab: "snapshot",
        }),
    }),
    {
      name: "careerpilot-store",
      partialize: (state) => ({
        savedAnalyses: state.savedAnalyses,
      }),
    }
  )
);
