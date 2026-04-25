import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sadiya's Learning Hub – Class 6 CBSE AI Tutor",
  description:
    "An AI-powered learning platform for Class 6 CBSE students. Learn Maths, Science, English, Social Science, Hindi and more with interactive lessons, quizzes and a personal AI tutor.",
  keywords: ["CBSE Class 6", "AI tutor", "learn online", "Sadiya", "kids learning", "quiz"],
  authors: [{ name: "Sadiya's Learning Hub" }],
  openGraph: {
    title: "Sadiya's Learning Hub",
    description: "AI-powered Class 6 CBSE learning platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Background orbs — sized with min() so they scale on mobile */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
