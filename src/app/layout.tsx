import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerPilot AI — Your AI Roadmap to Get Hired in Tech",
  description:
    "CareerPilot AI is an intelligent developer growth platform that helps students, self-taught developers, and job seekers figure out what to learn, what to build, and what to focus on next. Get a personalized career roadmap, skill gap analysis, and hiring readiness score powered by AI.",
  keywords: [
    "career roadmap",
    "developer career",
    "AI career coach",
    "learn to code",
    "get hired tech",
    "skill gap analysis",
    "project ideas",
    "hiring readiness",
    "developer roadmap",
    "CareerPilot",
  ],
  authors: [{ name: "CareerPilot AI" }],
  openGraph: {
    title: "CareerPilot AI — Your AI Roadmap to Get Hired in Tech",
    description:
      "Get a personalized AI-powered career strategy, roadmap, project ideas, and hiring analysis in minutes.",
    type: "website",
    siteName: "CareerPilot AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerPilot AI",
    description:
      "Your AI roadmap to get hired in tech. Personalized career strategy, projects, and skill analysis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#08101c] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
