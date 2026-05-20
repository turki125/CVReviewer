import { NextResponse } from "next/server";
import type { InterviewSetupInput } from "@/lib/types";
import { callOpenRouter, parseJsonObject } from "@/lib/openrouter";

export async function POST(request: Request) {
  let setup: InterviewSetupInput | undefined;

  try {
    setup = (await request.json()) as InterviewSetupInput;
    const content = await callOpenRouter([
      {
        role: "system",
        content:
          "You are a professional interview coach for students and fresh graduates in Saudi Arabia. Return only valid JSON.",
      },
      {
        role: "user",
        content: `Generate one realistic interview question for this candidate.

Candidate setup:
${JSON.stringify(setup, null, 2)}

Return this exact JSON shape:
{
  "question": "one question in the candidate's selected interview language"
}`,
      },
    ]);

    const data = parseJsonObject<{ question: string }>(content);

    if (!data.question) {
      return NextResponse.json({ message: "The model did not return a question." }, { status: 502 });
    }

    return NextResponse.json({ question: data.question });
  } catch (error) {
    // If the external model fails (API key missing, account issues, etc.),
    // provide a local fallback so the UI can still show a question.
    const fallbackQuestion = generateFallbackQuestion(setup);

    // Return a successful response with a fallback question so the client
    // doesn't display the raw error message.
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
  // Basic, deterministic fallback questions in English/Arabic depending on setup
  const englishSamples = [
    "Tell me about a time you solved a difficult technical problem.",
    "Describe a project you contributed to and your role in it.",
    "How do you approach debugging a production issue?",
    "Explain a data structure you often use and why.",
  ];

  const arabicSamples = [
    "حدثني عن مرة حليت فيها مشكلة تقنية صعبة.",
    "صف مشروعًا عملت عليه وما كان دورك فيه.",
    "كيف تتعامل مع خطأ يظهر في بيئة الإنتاج؟",
    "اشرح بنية بيانات تستخدمها كثيرًا ولماذا.",
  ];

  const useArabic = setup?.interviewLanguage === "Arabic";
  const samples = useArabic ? arabicSamples : englishSamples;

  // Pick a question based on current time to vary output.
  const idx = Math.abs(Date.now()) % samples.length;
  return samples[idx];
}
