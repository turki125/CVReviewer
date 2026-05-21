"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  LoaderCircle,
  Pause,
  Play,
  RotateCcw,
  Send,
  SkipForward,
  StopCircle,
} from "lucide-react";
import type { AnswerEvaluationResponse, InterviewSetupInput, InterviewLanguage } from "@/lib/types";

const totalQuestions = 5;

type SavedInterviewAnswer = {
  question: string;
  answer: string;
  evaluation: AnswerEvaluationResponse;
  answeredAt: string;
};

const defaultSetup: InterviewSetupInput = {
  name: "فهد",
  company: "Aramco",
  track: "Information Technology",
  specialization: "Software Engineering",
  interviewLanguage: "Bilingual",
};

function getInterviewCopy(language: InterviewLanguage) {
  const isEnglish = language === "English";

  return {
    answerAria: isEnglish ? "Candidate answer" : "إجابة المتقدم",
    clear: isEnglish ? "Clear" : "مسح",
    endEarly: isEnglish ? "End early" : "إنهاء مبكر",
    evaluating: isEnglish ? "Evaluating" : "جاري التقييم",
    improvedAnswer: isEnglish ? "Stronger answer" : "إجابة أقوى",
    loadingQuestion: isEnglish ? "Preparing your question..." : "جاري تجهيز السؤال...",
    next: isEnglish ? "Next" : "التالي",
    progressAria: (current: number, total: number) =>
      isEnglish ? `Question ${current} of ${total}` : `السؤال ${current} من ${total}`,
    progressLabel: (current: number, total: number) =>
      isEnglish ? `Question ${current} of ${total}` : `السؤال ${current} من ${total}`,
    questionHelp: isEnglish
      ? "Type your answer below. No microphone or speech capture is used."
      : "اكتب إجابتك في الأسفل. لا يتم استخدام الميكروفون أو تسجيل الصوت.",
    questionLoadingHelp: isEnglish
      ? "Preparing your next interview question..."
      : "نجهز لك سؤال المقابلة التالي...",
    report: isEnglish ? "View report" : "عرض التقرير",
    submit: isEnglish ? "Submit answer" : "إرسال الإجابة",
    timerPauseAria: isEnglish ? "Pause timer" : "إيقاف المؤقت مؤقتا",
    timerPlayAria: isEnglish ? "Start timer" : "تشغيل المؤقت",
    transcript: isEnglish ? "Text" : "النص",
    transcriptAria: isEnglish ? "Open interview transcript" : "فتح نص المقابلة",
    coachAria: isEnglish ? "Interview coach indicator" : "مؤشر مدرب المقابلة",
    unableToLoad: isEnglish ? "Could not load the question" : "تعذر تحميل السؤال",
    writePlaceholder: isEnglish ? "Type your answer here..." : "اكتب إجابتك هنا...",
  };
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function InterviewPage() {
  const router = useRouter();
  const [setup, setSetup] = useState<InterviewSetupInput>(defaultSetup);
  const [isSetupReady, setIsSetupReady] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<AnswerEvaluationResponse | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState("");
  const [isFlashing, setIsFlashing] = useState(false);
  const [isTimerStoppedFeedback, setIsTimerStoppedFeedback] = useState(false);
  const progress = useMemo(
    () =>
      Array.from({ length: totalQuestions }, (_, index) => {
        if (index < currentQuestion) return "complete";
        if (index === currentQuestion) return "active";
        return "upcoming";
      }),
    [currentQuestion],
  );
  const isFinalQuestion = currentQuestion === totalQuestions - 1;
  const isReportReady = isFinalQuestion && Boolean(evaluation);
  const copy = useMemo(() => getInterviewCopy(setup.interviewLanguage), [setup.interviewLanguage]);
  const isEnglishInterview = setup.interviewLanguage === "English";

  useEffect(() => {
    if (!isTimerRunning) return undefined;

    const timer = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    const savedSetup = window.localStorage.getItem("interviewSetup");

    if (!savedSetup) {
      setIsSetupReady(true);
      return;
    }

    try {
      const parsedSetup = JSON.parse(savedSetup) as Partial<InterviewSetupInput>;
      setSetup({
        ...defaultSetup,
        ...parsedSetup,
        interviewLanguage: normalizeInterviewLanguage(parsedSetup.interviewLanguage),
      });
    } catch {
      window.localStorage.removeItem("interviewSetup");
    } finally {
      setIsSetupReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isSetupReady) return;

    void loadQuestion();
  }, [currentQuestion, setup, isSetupReady]);

  async function loadQuestion() {
    setIsLoadingQuestion(true);
    setIsTimerRunning(false);
    setIsTimerStoppedFeedback(false);
    setSeconds(0);
    setError("");
    setEvaluation(null);
    setAnswer("");

    try {
      const response = await fetch("/api/interview/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setup),
      });
      const data = (await response.json()) as { question?: string; message?: string };

      if (!response.ok || !data.question) {
        throw new Error(data.message ?? "Could not generate the next question.");
      }

      setQuestion(data.question);
    } catch (loadError) {
      setQuestion("");
      setError(loadError instanceof Error ? loadError.message : "Could not generate the next question.");
    } finally {
      setIsLoadingQuestion(false);
    }
  }

  async function handleSubmitAnswer() {
    if (!answer.trim() || !question || isEvaluating || evaluation) return;

    setIsTimerRunning(false);
    setIsTimerStoppedFeedback(true);
    window.setTimeout(() => setIsTimerStoppedFeedback(false), 5000);
    setIsEvaluating(true);
    setError("");

    try {
      const response = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          setup,
          question,
          answer,
        }),
      });
      const data = (await response.json()) as (AnswerEvaluationResponse & { message?: string });

      if (!response.ok) {
        throw new Error(data.message ?? "Could not evaluate the answer.");
      }

      setEvaluation(data);
      saveEvaluatedAnswer({
        question,
        answer,
        evaluation: data,
        answeredAt: new Date().toISOString(),
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not evaluate the answer.");
    } finally {
      setIsEvaluating(false);
    }
  }

  function handleNextQuestion() {
    if (isReportReady) {
      router.push("/feedback");
      return;
    }

    setIsFlashing(true);
    window.setTimeout(() => setIsFlashing(false), 500);
    setCurrentQuestion((value) => (value + 1) % totalQuestions);
  }

  function handleRepeat() {
    setIsTimerRunning(false);
    setIsTimerStoppedFeedback(false);
    setSeconds(0);
    setAnswer("");
    setEvaluation(null);
  }

  function handleAnswerChange(value: string) {
    setAnswer(value);

    if (!isTimerRunning && value.length > 0 && question && !isLoadingQuestion) {
      setIsTimerStoppedFeedback(false);
      setIsTimerRunning(true);
    }
  }

  return (
    <div className={`interview-room${isFlashing ? " interview-room-flash" : ""}`} dir={isEnglishInterview ? "ltr" : "rtl"}>
      <header className="interview-topbar" aria-label={isEnglishInterview ? "Interview tools" : "أدوات المقابلة"}>
        <div className="interview-timer-tools">
          <button
            className={`interview-timer${isTimerStoppedFeedback ? " timer-stopped-feedback" : ""}`}
            type="button"
            onClick={() => setIsTimerRunning((value) => !value)}
            aria-label={isTimerRunning ? copy.timerPauseAria : copy.timerPlayAria}
          >
            <span className="timer-toggle" aria-hidden="true">
              {isTimerRunning ? <Pause size={22} strokeWidth={2.4} /> : <Play size={22} strokeWidth={2.4} />}
            </span>
            <span className="timer-value" dir="ltr">
              {formatTime(seconds)}
            </span>
          </button>

          <button className="clear-answer-button" type="button" onClick={handleRepeat}>
            <RotateCcw size={20} strokeWidth={2.1} aria-hidden="true" />
            <span>{copy.clear}</span>
          </button>
        </div>

        <div className="interview-progress" aria-label={copy.progressAria(currentQuestion + 1, totalQuestions)}>
          <div className="progress-pills" aria-hidden="true">
            {progress.map((status, index) => (
              <span className={`progress-pill ${status}`} key={index}>
                {status === "active" ? <span /> : null}
              </span>
            ))}
          </div>
          <div className="progress-label">
            <span>{copy.progressLabel(currentQuestion + 1, totalQuestions)}</span>
            {!isEnglishInterview ? (
              <>
                <span aria-hidden="true">·</span>
                <span dir="ltr">Question {currentQuestion + 1} of {totalQuestions}</span>
              </>
            ) : null}
          </div>
        </div>

        <Link className="end-early-button" href="/evaluating">
          <StopCircle size={22} strokeWidth={2.1} aria-hidden="true" />
          <span>
            <strong>{copy.endEarly}</strong>
            <small dir="ltr">End early</small>
          </span>
        </Link>
      </header>

      <main className="interview-stage" aria-labelledby="interview-question">
        <div className="interview-ambient" aria-hidden="true" />

        <section className="coach-orb-wrap" aria-label={copy.coachAria}>
          <div className="orb-pulse orb-pulse-one" aria-hidden="true" />
          <div className="orb-pulse orb-pulse-two" aria-hidden="true" />
          <div className="coach-orb">
            <div className="orb-stripes" aria-hidden="true" />
            <div className="orb-light" aria-hidden="true" />
            <span className="orb-core" aria-hidden="true" />
          </div>

        </section>

        <section className="question-panel">
          <h1 id="interview-question">
            {isLoadingQuestion ? copy.loadingQuestion : question || copy.unableToLoad}
          </h1>
          <p dir={isEnglishInterview ? "ltr" : "rtl"}>
            {isLoadingQuestion ? copy.questionLoadingHelp : copy.questionHelp}
          </p>
        </section>

        <section className="answer-panel" aria-label={copy.answerAria}>
          <textarea
            value={answer}
            onChange={(event) => handleAnswerChange(event.target.value)}
            placeholder={copy.writePlaceholder}
            dir={setup.interviewLanguage === "Arabic" ? "rtl" : "ltr"}
            disabled={isLoadingQuestion || isEvaluating}
          />

          {error ? <p className="interview-error">{error}</p> : null}

          {evaluation ? (
            <article className="evaluation-card">
              <header>
                <CheckCircle2 size={22} strokeWidth={2.2} aria-hidden="true" />
                <strong dir="ltr">Score {evaluation.score}/10</strong>
              </header>
              <p>{evaluation.feedback}</p>
              <div>
                <span>{copy.improvedAnswer}</span>
                <p>{evaluation.improvedAnswer}</p>
              </div>
              <small>{evaluation.tip}</small>
            </article>
          ) : null}
        </section>
      </main>

      <div className="interview-dock text-answer-dock" aria-label={isEnglishInterview ? "Controls" : "أزرار التحكم"}>
        <button
          className={`dock-button${isReportReady ? " report-ready-button" : ""}`}
          type="button"
          onClick={handleNextQuestion}
          disabled={isLoadingQuestion || (isFinalQuestion && !evaluation)}
        >
          {isReportReady ? (
            <CheckCircle2 size={30} strokeWidth={2.1} aria-hidden="true" />
          ) : (
            <SkipForward size={30} strokeWidth={2.1} aria-hidden="true" />
          )}
          <span>{isReportReady ? copy.report : copy.next}</span>
        </button>

        <button
          className="submit-answer-button"
          type="button"
          onClick={handleSubmitAnswer}
          disabled={!answer.trim() || isLoadingQuestion || isEvaluating || Boolean(evaluation)}
        >
          {isEvaluating ? (
            <LoaderCircle className="evaluation-spinner" size={26} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Send size={26} strokeWidth={2.3} aria-hidden="true" />
          )}
          <span>{isEvaluating ? copy.evaluating : copy.submit}</span>
        </button>
      </div>

      <button className="transcript-tab" type="button" aria-label={copy.transcriptAria}>
        <FileText size={25} strokeWidth={2} aria-hidden="true" />
        <span aria-hidden="true" />
        <strong>{copy.transcript}</strong>
      </button>
    </div>
  );
}

function saveEvaluatedAnswer(answer: SavedInterviewAnswer) {
  const storedAnswers = window.localStorage.getItem("interviewAnswers");

  try {
    const previousAnswers = storedAnswers ? (JSON.parse(storedAnswers) as SavedInterviewAnswer[]) : [];
    window.localStorage.setItem("interviewAnswers", JSON.stringify([...previousAnswers, answer]));
  } catch {
    window.localStorage.setItem("interviewAnswers", JSON.stringify([answer]));
  }
}

function normalizeInterviewLanguage(language: unknown): InterviewLanguage {
  if (language === "English") return "English";
  if (language === "Arabic") return "Arabic";
  return "Bilingual";
}
