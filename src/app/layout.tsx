import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sadiya's Learning Hub – Class 6 CBSE",
  description:
    "An AI-powered learning platform for Class 6 CBSE students covering Maths, Science, English, Social Science, Hindi, Computer and more.",
  keywords: ["CBSE Class 6", "AI tutor", "learn online", "kids learning", "quiz"],
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
        {/* Ambient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* ── Sticky navigation bar ── */}
          <nav className="site-nav">
            <Link href="/" className="nav-logo">
              🌟 <span>Sadiya&apos;s Hub</span>
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">🏠 Home</Link>
              <Link href="/quiz" className="nav-link">🧠 Quiz</Link>
            </div>
          </nav>

          {/* ── Page content ── */}
          <main style={{ flex: 1 }}>
            {children}
          </main>

          {/* ── Footer ── */}
          <footer style={{
            borderTop: "1px solid var(--glass-border)",
            padding: "1rem 1.5rem",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            background: "rgba(15,12,41,0.6)",
          }}>
            Class 6 CBSE · NEP 2020 · Learn by Doing 🚀
          </footer>
        </div>
      </body>
    </html>
  );
}
