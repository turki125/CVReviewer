"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, LoaderCircle, Timer } from "lucide-react";
import type { InterviewSetupInput } from "@/lib/types";

const countdownSeconds = 10;

const evaluationSteps = [
  {
    ar: "استلام الإجابة المكتوبة",
    en: "Reading typed answer",
  },
  {
    ar: "تقييم الإجابات",
    en: "Scoring",
  },
  {
    ar: "إنشاء التوصيات",
    en: "Generating recommendations",
  },
];

function getEvaluatingCopy(isEnglish: boolean) {
  return {
    dashboardAria: isEnglish ? "Open evaluation dashboard" : "فتح لوحة التقييم",
    heading: isEnglish ? "Analyzing your performance..." : "جاري تحليل أدائك...",
    progressAria: (secondsLeft: number) =>
      isEnglish ? `${secondsLeft} seconds remaining` : `الوقت المتبقي ${secondsLeft} ثواني`,
    stepsAria: isEnglish ? "Evaluation status" : "حالة التقييم",
    subheading: isEnglish ? "Building your interview report..." : "نبني تقرير مقابلتك...",
    timeRemaining: (secondsLeft: number) =>
      isEnglish ? `${secondsLeft} seconds remaining` : `الوقت المتبقي: ${secondsLeft} ثواني`,
  };
}

export default function EvaluatingPage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(countdownSeconds);
  const [isLeaving, setIsLeaving] = useState(false);
  const copy = getEvaluatingCopy(isEnglish);
  const progress = useMemo(
    () => ((countdownSeconds - secondsLeft) / countdownSeconds) * 100,
    [secondsLeft],
  );
  const stepDuration = countdownSeconds / evaluationSteps.length;
  const elapsedSeconds = countdownSeconds - secondsLeft;

  function getStepStatus(index: number) {
    if (secondsLeft <= 0 || elapsedSeconds >= stepDuration * (index + 1)) {
      return "complete";
    }

    if (elapsedSeconds >= stepDuration * index) {
      return "active";
    }

    return "upcoming";
  }

  useEffect(() => {
    const savedSetup = window.localStorage.getItem("interviewSetup");

    if (!savedSetup) return;

    try {
      const parsedSetup = JSON.parse(savedSetup) as Partial<InterviewSetupInput>;
      setIsEnglish(parsedSetup.interviewLanguage === "English");
    } catch {
      window.localStorage.removeItem("interviewSetup");
    }
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsLeaving(true);
      const transitionTimer = window.setTimeout(() => {
        router.push("/feedback");
      }, 450);

      return () => window.clearTimeout(transitionTimer);
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [router, secondsLeft]);

  return (
    <main
      className={`evaluating-page${isLeaving ? " is-leaving" : ""}`}
      dir={isEnglish ? "ltr" : "rtl"}
      aria-labelledby="evaluating-title"
    >
      <Link className="page-corner-brand" href="/">
        تاهيل Taaheel
      </Link>

      <section className="evaluating-shell">
        <Link className="evaluating-orb-wrap" href="/feedback" aria-label={copy.dashboardAria}>
          <div className="evaluating-orb-glow" />
          <div className="evaluating-orb">
            <div className="evaluating-orb-shine" />
            <div className="evaluating-orb-depth" />
          </div>
        </Link>

        <div className="evaluating-heading">
          <h1 id="evaluating-title">{copy.heading}</h1>
          <p dir={isEnglish ? "ltr" : "rtl"}>{copy.subheading}</p>
        </div>

        <div className="evaluation-steps" aria-label={copy.stepsAria}>
          {evaluationSteps.map((step, index) => {
            const status = getStepStatus(index);

            return (
            <article className={`evaluation-step ${status}`} key={step.en}>
              <div>
                <h2>{isEnglish ? step.en : step.ar}</h2>
                {!isEnglish ? <p dir="ltr">{step.en}</p> : null}
              </div>

              {status === "complete" ? (
                <CheckCircle2 size={28} strokeWidth={2.4} aria-hidden="true" />
              ) : null}
              {status === "active" ? (
                <LoaderCircle className="evaluation-spinner" size={28} strokeWidth={2.4} aria-hidden="true" />
              ) : null}
              {status === "upcoming" ? <Circle size={28} strokeWidth={1.9} aria-hidden="true" /> : null}
            </article>
            );
          })}
        </div>

        <div className="evaluating-time">
          <div className="evaluating-time-copy">
            <Timer size={18} strokeWidth={2.1} aria-hidden="true" />
            <span>{copy.timeRemaining(secondsLeft)}</span>
            {!isEnglish ? (
              <>
                <span aria-hidden="true">·</span>
                <span dir="ltr">{secondsLeft} seconds remaining</span>
              </>
            ) : null}
          </div>
          <div
            className="evaluating-progress"
            aria-label={copy.progressAria(secondsLeft)}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={countdownSeconds}
            aria-valuenow={countdownSeconds - secondsLeft}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>
    </main>
  );
}
