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

function nameInstruction(name?: string) {
  const candidateName = name?.trim();

  if (!candidateName) {
    return "Ask the question directly to the candidate.";
  }

  return `Address the candidate naturally by name at the beginning. For example, use "Hi ${candidateName}," in English or "${candidateName}،" in Arabic, then ask the question.`;
}

export async function POST(request: Request) {
  let setup: InterviewSetupInput | undefined;

  try {
    setup = (await request.json()) as InterviewSetupInput;

    const userPrompt = `Generate ONE realistic, domain-specific interview question for this candidate.

Candidate setup:
- Name: ${setup?.name ?? ""}
- Target company: ${setup?.company ?? ""}
- Role track: ${setup?.track ?? ""}
- Field specialization: ${setup?.specialization ?? ""}
- Interview language: ${setup?.interviewLanguage ?? "Bilingual"}

HARD CONSTRAINTS (do not violate):
1. The question MUST be specific to the field specialization above. It must use vocabulary, tools, concepts, problems, or scenarios that only a practitioner of that exact specialization would face. A reader should be able to identify the specialization from the question alone.
2. The question MUST be plausible coming from a recruiter or hiring manager at the target company, reflecting that company's industry (energy, banking, telecom, real estate, tourism, mining, etc.) and Saudi/Vision 2030 context where relevant.
3. Do NOT ask generic questions like "tell me about yourself", "what are your strengths/weaknesses", "where do you see yourself in 5 years", or any question that could be asked of any candidate in any field. Reject hobbies, personality, or life-story prompts.
4. Vary the question type across calls: behavioral STAR (about a past project in the specialization), situational/case (a problem typical for the specialization at this company), or technical (a concept/tool/scenario from the specialization). Pick one type only for this call.
5. Keep the question concise (1-3 sentences) and answerable in 1-3 minutes.

Language rule: ${languageInstruction(setup?.interviewLanguage ?? "Bilingual")}
Personalization rule: ${nameInstruction(setup?.name)}

Return this exact JSON shape and nothing else:
{
  "question": "the interview question, following the language rule above"
}`;

    const content = await callOpenRouter([
      {
        role: "system",
        content:
          "You are a senior interview coach preparing students and fresh graduates in Saudi Arabia for interviews at major Saudi employers (Aramco, PIF, NEOM, Qiddiya, Red Sea Global, ROSHN, Misk, SABIC, Ma'aden, stc, SNB, Riyad Bank, Saudia Airlines, Almarai). Every question you produce must be tightly bound to the candidate's declared field specialization and to the target company's industry. Never produce generic interview filler. Return only valid JSON.",
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
  const name = setup?.name?.trim();
  const englishGreeting = name ? `Hi ${name}, ` : "";
  const arabicGreeting = name ? `${name}، ` : "";

  const englishSamples = [
    `Walk me through a recent project in ${specialization} where you delivered a measurable outcome relevant to ${company}'s work.`,
    `Describe a technical or domain-specific challenge you faced in ${specialization}. What was your approach and the result?`,
    `Give a situation where you applied a core concept from ${specialization} to solve a real problem similar to one ${company} might face.`,
    `What is a current trend or hard problem in ${specialization}, and how would you address it at ${company}?`,
  ];

  const arabicSamples = [
    `حدثني عن مشروع حديث في ${specialization} حققت فيه نتيجة قابلة للقياس وذو صلة بعمل ${company}.`,
    `صف تحديًا تقنيًا أو مهنيًا في ${specialization} واجهته. ما الذي فعلته وما كانت النتيجة؟`,
    `اذكر موقفًا طبقت فيه مفهومًا أساسيًا من ${specialization} لحل مشكلة واقعية قد تواجه ${company}.`,
    `ما هو اتجاه حديث أو تحدٍّ صعب في ${specialization}، وكيف ستعالجه في ${company}؟`,
  ];

  const lang = setup?.interviewLanguage ?? "Bilingual";
  const idx = Math.abs(Date.now()) % englishSamples.length;

  if (lang === "Arabic") return arabicSamples[idx];
  if (lang === "English") return englishSamples[idx];
  return `${arabicSamples[idx]}\n\n${englishSamples[idx]}`;
}
