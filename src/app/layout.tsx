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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Background orbs */}
        <div className="orb" style={{ width: 600, height: 600, top: -200, left: -150, background: "#4f8ef7" }} />
        <div className="orb" style={{ width: 400, height: 400, top: 400, right: -100, background: "#a78bfa" }} />
        <div className="orb" style={{ width: 300, height: 300, bottom: 100, left: "30%", background: "#34d399" }} />
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
