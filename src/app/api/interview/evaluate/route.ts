import { NextResponse } from "next/server";
import type { AnswerEvaluationInput, AnswerEvaluationResponse } from "@/lib/types";
import { callOpenRouter, parseJsonObject } from "@/lib/openrouter";

export async function POST(request: Request) {
  let answer: AnswerEvaluationInput | undefined;

  try {
    answer = (await request.json()) as AnswerEvaluationInput;

    if (!answer.answer?.trim()) {
      return NextResponse.json({ message: "Answer is required." }, { status: 400 });
    }

    const content = await callOpenRouter([
      {
        role: "system",
        content:
          "You are a professional interview coach for students and fresh graduates in Saudi Arabia. Be practical, concise, and encouraging. Return only valid JSON.",
      },
      {
        role: "user",
        content: `Evaluate the user's written interview answer.

Candidate setup:
${JSON.stringify(answer.setup, null, 2)}

Question:
${answer.question}

User answer:
${answer.answer}

Return this exact JSON shape:
{
  "score": 1,
  "feedback": "clear feedback in the interview language",
  "improvedAnswer": "a stronger version of the answer in the interview language",
  "tip": "one practical tip in the interview language"
}

The score must be a number from 1 to 10.`,
      },
    ]);

    const data = parseJsonObject<{
      score: number;
      feedback: string;
      improvedAnswer: string;
      tip: string;
    }>(content);

    return NextResponse.json({
      score: Math.max(1, Math.min(10, Number(data.score) || 1)),
      feedback: data.feedback,
      improvedAnswer: data.improvedAnswer,
      tip: data.tip,
    });
  } catch (error) {
    return NextResponse.json(generateFallbackEvaluation(answer, error), { status: 200 });
  }
}

function generateFallbackEvaluation(
  answer: AnswerEvaluationInput | undefined,
  error: unknown,
): AnswerEvaluationResponse & { message: string } {
  const isArabic = answer?.setup.interviewLanguage === "Arabic";
  const wordCount = answer?.answer.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const score = Math.max(4, Math.min(8, Math.round(wordCount / 18) + 4));

  if (isArabic) {
    return {
      score,
      feedback: "إجابتك واضحة كبداية، لكنها تحتاج إلى مثال محدد يوضح الموقف والإجراء والنتيجة.",
      improvedAnswer:
        "في أحد المشاريع واجهت تحديا واضحا، فحللت السبب، قسمت العمل إلى خطوات صغيرة، وتعاونت مع الفريق حتى وصلنا إلى نتيجة قابلة للقياس.",
      tip: "استخدم طريقة STAR: الموقف، المهمة، الإجراء، النتيجة.",
      message: error instanceof Error ? `Using fallback evaluation: ${error.message}` : "Using fallback evaluation",
    };
  }

  return {
    score,
    feedback: "Your answer is a solid start, but it needs a specific example with the situation, action, and result.",
    improvedAnswer:
      "In one project, I faced a clear challenge, analyzed the root cause, broke the work into smaller steps, and coordinated with the team until we delivered a measurable outcome.",
    tip: "Use the STAR structure: situation, task, action, result.",
    message: error instanceof Error ? `Using fallback evaluation: ${error.message}` : "Using fallback evaluation",
  };
}
