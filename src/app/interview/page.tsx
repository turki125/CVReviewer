"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

const defaultSetup: InterviewSetupInput = {
  name: "فهد",
  company: "Aramco",
  track: "Information Technology",
  specialization: "Software Engineering",
  interviewLanguage: "Bilingual",
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function InterviewPage() {
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
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not evaluate the answer.");
    } finally {
      setIsEvaluating(false);
    }
  }

  function handleNextQuestion() {
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
    <div className={`interview-room${isFlashing ? " interview-room-flash" : ""}`} dir="rtl">
      <header className="interview-topbar" aria-label="أدوات المقابلة">
        <div className="interview-timer-tools">
          <button
            className={`interview-timer${isTimerStoppedFeedback ? " timer-stopped-feedback" : ""}`}
            type="button"
            onClick={() => setIsTimerRunning((value) => !value)}
            aria-label={isTimerRunning ? "إيقاف المؤقت مؤقتا" : "تشغيل المؤقت"}
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
            <span>مسح</span>
          </button>
        </div>

        <div className="interview-progress" aria-label={`السؤال ${currentQuestion + 1} من ${totalQuestions}`}>
          <div className="progress-pills" aria-hidden="true">
            {progress.map((status, index) => (
              <span className={`progress-pill ${status}`} key={index}>
                {status === "active" ? <span /> : null}
              </span>
            ))}
          </div>
          <div className="progress-label">
            <span>السؤال {currentQuestion + 1} من {totalQuestions}</span>
            <span aria-hidden="true">·</span>
            <span dir="ltr">Question {currentQuestion + 1} of {totalQuestions}</span>
          </div>
        </div>

        <Link className="end-early-button" href="/evaluating">
          <StopCircle size={22} strokeWidth={2.1} aria-hidden="true" />
          <span>
            <strong>إنهاء مبكر</strong>
            <small dir="ltr">End early</small>
          </span>
        </Link>
      </header>

      <main className="interview-stage" aria-labelledby="interview-question">
        <div className="interview-ambient" aria-hidden="true" />

        <section className="coach-orb-wrap" aria-label="مؤشر مدرب المقابلة">
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
            {isLoadingQuestion ? "جاري تجهيز السؤال..." : question || "تعذر تحميل السؤال"}
          </h1>
          <p dir="ltr">
            {isLoadingQuestion
              ? "Preparing your next interview question..."
              : "Type your answer below. No microphone or speech capture is used."}
          </p>
        </section>

        <section className="answer-panel" aria-label="إجابة المتقدم">
          <textarea
            value={answer}
            onChange={(event) => handleAnswerChange(event.target.value)}
            placeholder="اكتب إجابتك هنا..."
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
                <span>إجابة أقوى</span>
                <p>{evaluation.improvedAnswer}</p>
              </div>
              <small>{evaluation.tip}</small>
            </article>
          ) : null}
        </section>
      </main>

      <div className="interview-dock text-answer-dock" aria-label="أزرار التحكم">
        <button className="dock-button" type="button" onClick={handleNextQuestion} disabled={isLoadingQuestion}>
          <SkipForward size={30} strokeWidth={2.1} aria-hidden="true" />
          <span>التالي</span>
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
          <span>{isEvaluating ? "جاري التقييم" : "إرسال الإجابة"}</span>
        </button>
      </div>

      <button className="transcript-tab" type="button" aria-label="فتح نص المقابلة">
        <FileText size={25} strokeWidth={2} aria-hidden="true" />
        <span aria-hidden="true" />
        <strong>النص</strong>
      </button>
    </div>
  );
}

function normalizeInterviewLanguage(language: unknown): InterviewLanguage {
  if (language === "English") return "English";
  if (language === "Arabic") return "Arabic";
  return "Bilingual";
}
