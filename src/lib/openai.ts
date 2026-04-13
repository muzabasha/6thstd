// lib/openai.ts
// ⚠️ SECURITY NOTE: This app uses client-side API calls.
// The NEXT_PUBLIC_OPENAI_API_KEY is intentionally exposed for this demo.
// For production, route calls through a secure backend proxy.

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function callOpenAI(messages: ChatMessage[], maxTokens = 800): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key not configured. Please add NEXT_PUBLIC_OPENAI_API_KEY to your .env.local file.");
  }

  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `OpenAI API error: ${res.status}`);
  }

  const data = await res.json() as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content ?? "";
}

// ── Tutor system prompt ────────────────────────────────────────────────────
const TUTOR_SYSTEM = `You are a warm, encouraging teacher for a Class 6 CBSE student named Sadiya (age ~11).
Rules:
- Use very simple language, short sentences, and fun real-life examples
- Add emojis to make it friendly 🌟
- Always end with ONE encouraging follow-up question to spark curiosity
- Keep responses under 250 words
- For Math, show step-by-step working`;

export async function explainTopic(subject: string, topic: string): Promise<string> {
  return callOpenAI([
    { role: "system", content: TUTOR_SYSTEM },
    {
      role: "user",
      content: `Explain "${topic}" from ${subject} for a Class 6 CBSE student.
Structure your answer as:
📌 **What is it?** (1-2 sentences)
🌍 **Real-life Example** (1 sentence)
🔑 **Key Points** (3 bullet points)
✅ **Quick Tip** (1 sentence)
Then ask one curiosity question.`,
    },
  ], 600);
}

export async function askTutor(
  subject: string,
  topic: string,
  history: ChatMessage[],
  question: string
): Promise<string> {
  return callOpenAI([
    { role: "system", content: TUTOR_SYSTEM },
    ...history,
    {
      role: "user",
      content: `[Subject: ${subject}, Topic: ${topic}] ${question}`,
    },
  ], 500);
}

// ── Quiz generator ─────────────────────────────────────────────────────────
export interface QuizQuestion {
  type: "mcq" | "short" | "application";
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export async function generateQuiz(subject: string, topic: string): Promise<QuizQuestion[]> {
  const raw = await callOpenAI(
    [
      {
        role: "system",
        content: `You are a CBSE Class 6 quiz creator. Return ONLY valid JSON, no markdown fences.`,
      },
      {
        role: "user",
        content: `Create a quiz on "${topic}" (${subject}) for a Class 6 CBSE student.
Return a JSON array of exactly 8 questions:
- 5 MCQs with 4 options each (type:"mcq")
- 2 short answer questions (type:"short")
- 1 application-based question (type:"application")

Each object: { "type":"mcq"|"short"|"application", "question":"...", "options":["A)...","B)...","C)...","D)..."] (only for mcq), "answer":"...", "explanation":"..." }`,
      },
    ],
    1200
  );

  try {
    // Strip markdown fences if AI added them
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean) as QuizQuestion[];
  } catch {
    return [];
  }
}
