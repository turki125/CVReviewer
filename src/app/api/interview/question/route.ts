import { NextResponse } from "next/server";
import type { InterviewSetupInput } from "@/lib/types";
import { callOpenRouter, parseJsonObject } from "@/lib/openrouter";

function languageInstruction(language: InterviewSetupInput["interviewLanguage"]) {
  if (language === "Arabic") {
    return "Write the question in Modern Standard Arabic. Do not include English.";
  }
  if (language === "English") {
    return "Write the question in clear professional English. Do not include Arabic.";
  }
  return "Write the question bilingually: first in Modern Standard Arabic, then a blank line, then the same question in English.";
}

export async function POST(request: Request) {
  let setup: InterviewSetupInput | undefined;

  try {
    setup = (await request.json()) as InterviewSetupInput;

    const userPrompt = `Generate one realistic, role-specific interview question for the following candidate. The question must reflect the target company's culture and the candidate's specialization. Vary question type across behavioral, situational, and technical so repeated calls feel different. Avoid generic openers like "tell me about yourself".

Candidate setup:
- Name: ${setup?.name ?? ""}
- Target company: ${setup?.company ?? ""}
- Role track: ${setup?.track ?? ""}
- Field specialization: ${setup?.specialization ?? ""}
- Interview language: ${setup?.interviewLanguage ?? "Bilingual"}

Language rule: ${languageInstruction(setup?.interviewLanguage ?? "Bilingual")}

Return this exact JSON shape and nothing else:
{
  "question": "the interview question, following the language rule above"
}`;

    const content = await callOpenRouter([
      {
        role: "system",
        content:
          "You are a senior interview coach who prepares students and fresh graduates in Saudi Arabia for interviews at major Saudi employers (Aramco, PIF, NEOM, SABIC, stc, banks, hospitals, hospitality, etc.). You tailor questions to the candidate's company, track, and specialization. Return only valid JSON.",
      },
      { role: "user", content: userPrompt },
    ]);

    const data = parseJsonObject<{ question: string }>(content);

    if (!data.question) {
      return NextResponse.json({ message: "The model did not return a question." }, { status: 502 });
    }

    return NextResponse.json({ question: data.question });
  } catch (error) {
    const fallbackQuestion = generateFallbackQuestion(setup);

    return NextResponse.json(
      {
        question: fallbackQuestion,
        message: error instanceof Error ? `Using fallback question: ${error.message}` : "Using fallback question",
      },
      { status: 200 },
    );
  }
}

function generateFallbackQuestion(setup?: InterviewSetupInput) {
  const company = setup?.company || "this company";
  const specialization = setup?.specialization || "your field";

  const englishSamples = [
    `Walk me through a project in ${specialization} where you delivered a measurable outcome.`,
    `Why ${company}? What about its mission aligns with your goals?`,
    `Describe a time you handled disagreement on a team. What did you do?`,
    `What is a recent challenge in ${specialization} you find interesting, and how would you approach it?`,
  ];

  const arabicSamples = [
    `حدثني عن مشروع في ${specialization} حققت فيه نتيجة ملموسة.`,
    `لماذا ${company} تحديدًا؟ وما الذي يجذبك في رسالتها؟`,
    `صف موقفًا اختلفت فيه مع زميل في الفريق، وكيف تصرفت؟`,
    `ما تحدٍّ حديث في ${specialization} يثير اهتمامك، وكيف ستتعامل معه؟`,
  ];

  const lang = setup?.interviewLanguage ?? "Bilingual";
  const idx = Math.abs(Date.now()) % englishSamples.length;

  if (lang === "Arabic") return arabicSamples[idx];
  if (lang === "English") return englishSamples[idx];
  return `${arabicSamples[idx]}\n\n${englishSamples[idx]}`;
}
