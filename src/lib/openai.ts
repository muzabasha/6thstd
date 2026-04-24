import lessonsData from "@/data/lessons.json";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface Example {
  question: string;
  steps: string[];
  illustration?: string;
}

interface QA {
  q: string;
  a: string;
}

interface Activity {
  title: string;
  instructions: string[];
  materials?: string[];
  outcome?: string;
}

interface LessonContent {
  what: string;
  example: string;
  points: string[];
  tip: string;
  question: string;
  examples?: Example[];
  textbookContent?: string;
  qa?: QA[];
  scenarios?: QA[];
  activity?: Activity;
  thinkDiscuss?: string[];
  tryIt?: string[];
}

const lessons = (lessonsData as unknown) as Record<string, LessonContent>;

export async function explainTopic(subject: string, topic: string, description?: string, topicId?: string): Promise<string> {
  const specific = topicId ? lessons[topicId] : null;

  if (specific) {
    const examplesMd = specific.examples ? `
📚 **Practice Examples**
${specific.examples.map((ex, i) => `
**Example ${i + 1}: ${ex.question}**
${ex.steps.map((s, j) => `${j + 1}. ${s}`).join('\n')}
${ex.illustration ? `\n*Illustration:* ${ex.illustration}` : ''}
`).join('\n---\n')}
` : '';

    const textbookMd = specific.textbookContent ? `
📖 **Textbook Summary**
${specific.textbookContent}
` : '';

    const qaMd = specific.qa ? `
❓ **Questions & Answers**
${specific.qa.map((item, i) => `
**Q${i + 1}: ${item.q}**
*Ans:* ${item.a}
`).join('\n')}
` : '';

    const scenariosMd = specific.scenarios ? `
🌟 **Scenario-Based Learning**
${specific.scenarios.map((item, i) => `
**Scenario ${i + 1}: ${item.q}**
*Solution:* ${item.a}
`).join('\n')}
` : '';

    const activityMd = specific.activity ? `
🛠️ **Hands-On Activity: ${specific.activity.title}**
${specific.activity.materials ? `*You will need:* ${specific.activity.materials.join(', ')}` : ''}
${specific.activity.instructions.map((s, i) => `**Step ${i + 1}:** ${s}`).join('\n')}
${specific.activity.outcome ? `\n✨ *What you will observe:* ${specific.activity.outcome}` : ''}
` : '';

    const thinkMd = specific.thinkDiscuss ? `
💬 **Think & Discuss**
${specific.thinkDiscuss.map((q, i) => `${i + 1}. ${q}`).join('\n')}
` : '';

    const tryItMd = specific.tryIt ? `
🎯 **Try It Yourself**
${specific.tryIt.map((t, i) => `${i + 1}. ${t}`).join('\n')}
` : '';

    return `
📌 **What is it?**
${specific.what}

🌍 **Real-life Example**
${specific.example}

${textbookMd}

${examplesMd}

${activityMd}

${tryItMd}

${thinkMd}

${qaMd}

${scenariosMd}

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
${topic} is a fundamental concept in ${subject} that helps us understand how the world works.

🌍 **Real-life Example**
You can see ${topic} in action every day! For instance, when you observe ${subject === 'Science' ? 'natural phenomena' : subject === 'Mathematics' ? 'how we count things' : 'how society functions'}, you are witnessing the principles of ${topic} at work.

🎯 **Try It Yourself**
1. Look around your home and find one example of ${topic}.
2. Write down what you observe in your notebook.
3. Share your finding with a classmate or family member.

💬 **Think & Discuss**
1. How does ${topic} connect to something you already know?
2. Can you think of a problem that ${topic} helps solve?

🔑 **Key Points to Remember**
- **Understanding Fundamentals:** This topic builds the foundation for more complex ideas in ${subject}.
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

export async function generateQuiz(subject: string, topic: string, topicId?: string): Promise<QuizQuestion[]> {
  const specific = topicId ? (lessons as Record<string, LessonContent>)[topicId] : null;

  if (specific) {
    const questions: QuizQuestion[] = [];

    // Q1: from 'what'
    questions.push({
      type: "mcq",
      question: `What is the main idea of "${topic}"?`,
      options: [
        specific.what.slice(0, 80).split('.')[0],
        "It is about memorising facts without understanding",
        "It only applies to advanced students",
        "It has no real-world use"
      ],
      answer: specific.what.slice(0, 80).split('.')[0],
      explanation: specific.what
    });

    // Q2: from points[0]
    if (specific.points[0]) {
      questions.push({
        type: "mcq",
        question: `Which of the following is a key point about ${topic}?`,
        options: [
          specific.points[0],
          "It is unrelated to daily life",
          "It was discovered only recently",
          "It applies only in laboratories"
        ],
        answer: specific.points[0],
        explanation: `Key point: ${specific.points[0]}`
      });
    }

    // Q3: from qa if available
    if (specific.qa && specific.qa[0]) {
      questions.push({
        type: "mcq",
        question: specific.qa[0].q,
        options: [
          specific.qa[0].a,
          "None of the above",
          "It depends on the situation",
          "This is not covered in the syllabus"
        ],
        answer: specific.qa[0].a,
        explanation: specific.qa[0].a
      });
    } else {
      questions.push({
        type: "mcq",
        question: `Which real-life example best illustrates ${topic}?`,
        options: [
          specific.example.slice(0, 70),
          "A completely unrelated scenario",
          "Only in science labs",
          "Only in history books"
        ],
        answer: specific.example.slice(0, 70),
        explanation: specific.example
      });
    }

    // Q4: from points[1]
    questions.push({
      type: "mcq",
      question: `What should you remember most about ${topic}?`,
      options: [
        specific.points[specific.points.length - 1],
        "To skip this chapter",
        "That it has no practical use",
        "That it only applies to adults"
      ],
      answer: specific.points[specific.points.length - 1],
      explanation: `Remember: ${specific.points[specific.points.length - 1]}`
    });

    // Q5: from tip
    questions.push({
      type: "mcq",
      question: `Which learning tip helps you remember ${topic} better?`,
      options: [
        specific.tip.slice(0, 80),
        "Avoid practising it",
        "Read it once and forget",
        "Only study it the night before exams"
      ],
      answer: specific.tip.slice(0, 80),
      explanation: specific.tip
    });

    // Q6: from qa[1] or points[1]
    if (specific.qa && specific.qa[1]) {
      questions.push({
        type: "mcq",
        question: specific.qa[1].q,
        options: [
          specific.qa[1].a,
          "This is incorrect",
          "Not mentioned in the lesson",
          "Only applies in special cases"
        ],
        answer: specific.qa[1].a,
        explanation: specific.qa[1].a
      });
    } else if (specific.points[1]) {
      questions.push({
        type: "mcq",
        question: `Which statement is true about ${topic}?`,
        options: [
          specific.points[1],
          "It has no practical application",
          "It is only theoretical",
          "It is outdated knowledge"
        ],
        answer: specific.points[1],
        explanation: `Key point: ${specific.points[1]}`
      });
    }

    // Q7: short answer from question field
    questions.push({
      type: "short",
      question: specific.question,
      answer: specific.points[0] ?? "Refer to the lesson for details.",
      explanation: `Think about: ${specific.what}`
    });

    // Q8: short from qa[2] or generic
    if (specific.qa && specific.qa[2]) {
      questions.push({
        type: "short",
        question: specific.qa[2].q,
        answer: specific.qa[2].a,
        explanation: specific.qa[2].a
      });
    } else {
      questions.push({
        type: "short",
        question: `List two key points you learned about ${topic}.`,
        answer: specific.points.slice(0, 2).join('; '),
        explanation: "Review the key points section of the lesson."
      });
    }

    // Q9: application from scenario or activity
    if (specific.scenarios && specific.scenarios[0]) {
      questions.push({
        type: "application",
        question: specific.scenarios[0].q,
        answer: specific.scenarios[0].a,
        explanation: specific.scenarios[0].a
      });
    } else if (specific.activity) {
      questions.push({
        type: "application",
        question: `Describe how you would do the activity: "${specific.activity.title}"`,
        answer: specific.activity.instructions.join(' → '),
        explanation: specific.activity.outcome ?? "Follow the steps in the activity."
      });
    } else {
      questions.push({
        type: "application",
        question: `Describe a real-life situation where you would use what you learned about ${topic}.`,
        answer: specific.example,
        explanation: specific.example
      });
    }

    // Q10: application from scenario[1] or thinkDiscuss
    if (specific.scenarios && specific.scenarios[1]) {
      questions.push({
        type: "application",
        question: specific.scenarios[1].q,
        answer: specific.scenarios[1].a,
        explanation: specific.scenarios[1].a
      });
    } else if (specific.thinkDiscuss && specific.thinkDiscuss[0]) {
      questions.push({
        type: "application",
        question: specific.thinkDiscuss[0],
        answer: "Think critically and provide your own reasoned answer based on the lesson.",
        explanation: "This is a critical thinking question. Discuss your answer with your teacher or classmates."
      });
    } else {
      questions.push({
        type: "application",
        question: `How can you apply the concept of ${topic} to solve a problem in your daily life?`,
        answer: "Apply the key principles you learned to a real-world situation.",
        explanation: "Use the lesson's examples and key points to guide your answer."
      });
    }

    return questions;
  }

  // Generic fallback - 10 questions
  return [
    { type: "mcq", question: `What is the main concept of ${topic}?`, options: ["The primary mechanism described in the chapter", "A completely unrelated detail", "An exception to the rule", "A minor footnote"], answer: "The primary mechanism described in the chapter", explanation: `The main concept of ${topic} focuses on its primary mechanisms.` },
    { type: "mcq", question: `Which of the following is closely related to ${topic}?`, options: ["The key elements discussed in class", "Historical fiction", "Random data", "None of the above"], answer: "The key elements discussed in class", explanation: "Class elements strictly apply here." },
    { type: "mcq", question: `How does ${topic} apply in real life?`, options: ["Through practical daily applications", "It only exists in theory", "It is only valid in space", "It does not apply"], answer: "Through practical daily applications", explanation: `The concept of ${topic} is highly practical.` },
    { type: "mcq", question: `What should you remember when studying ${topic}?`, options: ["The core principles and definitions", "To forget everything else", "Nothing in particular", "Just the dates"], answer: "The core principles and definitions", explanation: "Core principles are essential." },
    { type: "mcq", question: `Which fact is true regarding ${topic} in ${subject}?`, options: ["It is a fundamental topic in the syllabus", "It is excluded from the curriculum", "It does not exist", "It was discovered yesterday"], answer: "It is a fundamental topic in the syllabus", explanation: `As part of the ${subject} syllabus, it is fundamental.` },
    { type: "mcq", question: `Why is ${topic} important in ${subject}?`, options: ["It builds foundational understanding", "It is not important", "It only matters for exams", "It has no relevance"], answer: "It builds foundational understanding", explanation: "Foundational topics are crucial for learning." },
    { type: "short", question: `Briefly explain ${topic}.`, answer: `An important aspect of ${subject}.`, explanation: "Self-explanatory." },
    { type: "short", question: `List one key point of ${topic}.`, answer: "One key point is its role in understanding the subject.", explanation: "Self-explanatory." },
    { type: "application", question: `Can you describe a scenario where ${topic} is useful?`, answer: "A practical scenario in everyday problem solving.", explanation: "Self-explanatory." },
    { type: "application", question: `How would you teach ${topic} to a younger student?`, answer: "Use simple examples and relate it to their daily experiences.", explanation: "Teaching others helps reinforce your own understanding." },
  ];
}
