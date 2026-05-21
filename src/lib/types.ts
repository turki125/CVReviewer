export type InterviewLanguage = "Arabic" | "English" | "Bilingual";

export type InterviewSetupInput = {
  name: string;
  company: string;
  track: string;
  specialization: string;
  interviewLanguage: InterviewLanguage;
};

export type InterviewQuestionResponse = {
  question: string;
};

export type AnswerEvaluationInput = {
  setup: InterviewSetupInput;
  question: string;
  answer: string;
};

export type AnswerEvaluationResponse = {
  score: number;
  feedback: string;
  improvedAnswer: string;
  tip: string;
};
