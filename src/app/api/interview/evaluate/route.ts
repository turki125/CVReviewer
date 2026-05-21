import { NextResponse } from "next/server";
import type { AnswerEvaluationInput, AnswerEvaluationResponse, InterviewSetupInput } from "@/lib/types";
import { callOpenRouter, parseJsonObject } from "@/lib/openrouter";

function languageInstruction(language: InterviewSetupInput["interviewLanguage"]) {
  if (language === "Arabic") {
    return "Write feedback, the improved answer, and the tip in Modern Standard Arabic only.";
  }
  if (language === "English") {
    return "Write feedback, the improved answer, and the tip in clear professional English only.";
  }
  return "Write each of feedback, improvedAnswer, and tip bilingually: Arabic first, then a newline, then the English version.";
}

export async function POST(request: Request) {
  let answer: AnswerEvaluationInput | undefined;

  try {
    answer = (await request.json()) as AnswerEvaluationInput;

    if (!answer.answer?.trim()) {
      return NextResponse.json({ message: "Answer is required." }, { status: 400 });
    }

    const setup = answer.setup;

    const userPrompt = `Evaluate the candidate's written interview answer in the context of the target company, role track, and specialization. Reward concrete examples, STAR structure, alignment with the company's mission, and domain accuracy for the specialization. Penalize vagueness or generic answers.

Candidate setup:
- Name: ${setup?.name ?? ""}
- Target company: ${setup?.company ?? ""}
- Role track: ${setup?.track ?? ""}
- Field specialization: ${setup?.specialization ?? ""}
- Interview language: ${setup?.interviewLanguage ?? "Bilingual"}

Question:
${answer.question}

Candidate answer:
${answer.answer}

Language rule: ${languageInstruction(setup?.interviewLanguage ?? "Bilingual")}

Return this exact JSON shape and nothing else:
{
  "score": 1,
  "feedback": "clear, specific feedback referencing the company and specialization",
  "improvedAnswer": "a stronger version of the answer, ideally using STAR",
  "tip": "one practical, actionable tip"
}

The score must be a number from 1 to 10.`;

    const content = await callOpenRouter([
      {
        role: "system",
        content:
          "You are a senior interview coach who prepares students and fresh graduates in Saudi Arabia for interviews at major Saudi employers. Be practical, concise, and encouraging while still rigorous. Return only valid JSON.",
      },
      { role: "user", content: userPrompt },
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
  const lang = answer?.setup.interviewLanguage ?? "Bilingual";
  const wordCount = answer?.answer.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const score = Math.max(4, Math.min(8, Math.round(wordCount / 18) + 4));

  const arabic = {
    feedback: "إجابتك واضحة كبداية، لكنها تحتاج إلى مثال محدد يوضح الموقف والإجراء والنتيجة المرتبطة بتخصصك.",
    improvedAnswer:
      "في أحد المشاريع واجهت تحديا واضحا، حللت السبب، قسمت العمل إلى خطوات صغيرة، وتعاونت مع الفريق حتى وصلنا إلى نتيجة قابلة للقياس.",
    tip: "استخدم طريقة STAR: الموقف، المهمة، الإجراء، النتيجة.",
  };
  const english = {
    feedback: "Your answer is a solid start, but it needs a concrete example tied to your specialization with situation, action, and result.",
    improvedAnswer:
      "In one project, I faced a clear challenge, analyzed the root cause, broke the work into smaller steps, and coordinated with the team until we delivered a measurable outcome.",
    tip: "Use the STAR structure: Situation, Task, Action, Result.",
  };

  if (lang === "Arabic") {
    return { score, ...arabic, message: error instanceof Error ? `Using fallback evaluation: ${error.message}` : "Using fallback evaluation" };
  }
  if (lang === "English") {
    return { score, ...english, message: error instanceof Error ? `Using fallback evaluation: ${error.message}` : "Using fallback evaluation" };
  }
  return {
    score,
    feedback: `${arabic.feedback}\n\n${english.feedback}`,
    improvedAnswer: `${arabic.improvedAnswer}\n\n${english.improvedAnswer}`,
    tip: `${arabic.tip}\n\n${english.tip}`,
    message: error instanceof Error ? `Using fallback evaluation: ${error.message}` : "Using fallback evaluation",
  };
}
