"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, LoaderCircle, Timer } from "lucide-react";

const countdownSeconds = 10;

const evaluationSteps = [
  {
    ar: "استلام الإجابة المكتوبة",
    en: "Reading typed answer",
    status: "complete",
  },
  {
    ar: "تقييم الإجابات",
    en: "Scoring",
    status: "active",
  },
  {
    ar: "إنشاء التوصيات",
    en: "Generating recommendations",
    status: "upcoming",
  },
];

export default function EvaluatingPage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(countdownSeconds);
  const [isLeaving, setIsLeaving] = useState(false);
  const progress = useMemo(
    () => ((countdownSeconds - secondsLeft) / countdownSeconds) * 100,
    [secondsLeft],
  );

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
    <main className={`evaluating-page${isLeaving ? " is-leaving" : ""}`} aria-labelledby="evaluating-title">
      <section className="evaluating-shell">
        <Link className="evaluating-orb-wrap" href="/feedback" aria-label="Open evaluation dashboard">
          <div className="evaluating-orb-glow" />
          <div className="evaluating-orb">
            <div className="evaluating-orb-shine" />
            <div className="evaluating-orb-depth" />
          </div>
        </Link>

        <div className="evaluating-heading">
          <h1 id="evaluating-title">جاري تحليل أدائك...</h1>
          <p dir="ltr">Analyzing your performance...</p>
        </div>

        <div className="evaluation-steps" aria-label="حالة التقييم">
          {evaluationSteps.map((step) => (
            <article className={`evaluation-step ${step.status}`} key={step.en}>
              <div>
                <h2>{step.ar}</h2>
                <p dir="ltr">{step.en}</p>
              </div>

              {step.status === "complete" ? (
                <CheckCircle2 size={28} strokeWidth={2.4} aria-hidden="true" />
              ) : null}
              {step.status === "active" ? (
                <LoaderCircle className="evaluation-spinner" size={28} strokeWidth={2.4} aria-hidden="true" />
              ) : null}
              {step.status === "upcoming" ? <Circle size={28} strokeWidth={1.9} aria-hidden="true" /> : null}
            </article>
          ))}
        </div>

        <div className="evaluating-time">
          <div className="evaluating-time-copy">
            <Timer size={18} strokeWidth={2.1} aria-hidden="true" />
            <span>الوقت المتبقي: {secondsLeft} ثواني</span>
            <span aria-hidden="true">·</span>
            <span dir="ltr">{secondsLeft} seconds remaining</span>
          </div>
          <div
            className="evaluating-progress"
            aria-label={`الوقت المتبقي ${secondsLeft} ثواني`}
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
