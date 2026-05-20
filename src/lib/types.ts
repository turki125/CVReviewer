export type InterviewLanguage = "Arabic" | "English";

export type InterviewSetupInput = {
  name: string;
  major: string;
  targetRole: string;
  companyType: string;
  experienceLevel: string;
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
