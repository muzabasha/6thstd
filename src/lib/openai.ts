import lessonsData from "@/data/lessons.json";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface LessonContent {
  what: string;
  example: string;
  points: string[];
  tip: string;
  question: string;
}

const lessons = lessonsData as Record<string, LessonContent>;

export async function explainTopic(subject: string, topic: string, description?: string, topicId?: string): Promise<string> {
  const specific = topicId ? lessons[topicId] : null;

  if (specific) {
    return `
📌 **What is it?**
${specific.what}

🌍 **Real-life Example**
${specific.example}

🔑 **Key Points to Remember**
${specific.points.map(p => `- ${p}`).join('\n')}

✅ **Quick Learning Tip**
${specific.tip} 🌟

**Let's Think:** ${specific.question}
    `.trim();
  }

  // Fallback if not in lessons.json
  const intro = description ? `As we explore ${subject}, let's look at **${topic}**. ${description}` : `Welcome to our ${subject} lesson on **${topic}**!`;

  return `
${intro}

📌 **What is it?**
${topic} is a fundamental concept in ${subject} that helps us understand how the world works. It involves studying the core principles and patterns related to this area.

🌍 **Real-life Example**
You can see ${topic} in action every day! For instance, when you observe ${subject === 'Science' ? 'natural phenomena' : subject === 'Mathematics' ? 'how we count things' : 'how society functions'}, you are witnessing the principles of ${topic} at work.

🔑 **Key Points to Remember**
- **Understanding Fundamentals:** This topic build the foundation for more complex ideas in ${subject}.
- **Practical Application:** Knowing about ${topic} helps us solve real-world problems effectively.
- **Interconnected Learning:** This concept connects with many other chapters we will study this year.

✅ **Quick Learning Tip**
Try to find one example of ${topic} in your own home today and explain it to your family! 🌟

**Let's Think:** How do you think **${topic}** impacts our daily lives?
  `.trim();
}

export async function askTutor(
  subject: string,
  topic: string,
  history: ChatMessage[],
  question: string
): Promise<string> {
  return `That's a great question about ${topic}! As your offline tutor, I encourage you to check your textbook's section on "${topic}" under ${subject} for the most accurate details, or discuss this specific question with your teacher! Keep exploring! 🌟`;
}

export interface QuizQuestion {
  type: "mcq" | "short" | "application";
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export async function generateQuiz(subject: string, topic: string): Promise<QuizQuestion[]> {
  return [
    { type: "mcq", question: `What is the main concept of ${topic}?`, options: ["The primary mechanism described in the chapter", "A completely unrelated detail", "An exception to the rule", "A minor footnote"], answer: "The primary mechanism described in the chapter", explanation: `The main concept of ${topic} focuses on its primary mechanisms.` },
    { type: "mcq", question: `Which of the following is closely related to ${topic}?`, options: ["The key elements discussed in class", "Historical fiction", "Random data", "None of the above"], answer: "The key elements discussed in class", explanation: "Class elements strictly apply here." },
    { type: "mcq", question: `How does ${topic} apply in real life?`, options: ["Through practical daily applications", "It only exists in theory", "It is only valid in space", "It does not apply"], answer: "Through practical daily applications", explanation: `The concept of ${topic} is highly practical.` },
    { type: "mcq", question: `What should you remember when studying ${topic}?`, options: ["The core principles and definitions", "To forget everything else", "Nothing in particular", "Just the dates"], answer: "The core principles and definitions", explanation: "Core principles are essential." },
    { type: "mcq", question: `Which fact is true regarding ${topic} in ${subject}?`, options: ["It is a fundamental topic in the syllabus", "It is excluded from the curriculum", "It does not exist", "It was discovered yesterday"], answer: "It is a fundamental topic in the syllabus", explanation: `As part of the ${subject} syllabus, it is fundamental.` },
    { type: "short", question: `Briefly explain ${topic}.`, answer: `An important aspect of ${subject}.`, explanation: "Self-explanatory." },
    { type: "short", question: `List one key point of ${topic}.`, answer: "One key point is its role in understanding the subject.", explanation: "Self-explanatory." },
    { type: "application", question: `Can you describe a scenario where ${topic} is useful?`, answer: "A practical scenario in everyday problem solving.", explanation: "Self-explanatory." },
  ];
}
