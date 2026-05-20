import { CheckCircle2, Circle, LoaderCircle, Timer } from "lucide-react";

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
  return (
    <main className="evaluating-page" aria-labelledby="evaluating-title">
      <section className="evaluating-shell">
        <div className="evaluating-orb-wrap" aria-hidden="true">
          <div className="evaluating-orb-glow" />
          <div className="evaluating-orb">
            <div className="evaluating-orb-shine" />
            <div className="evaluating-orb-depth" />
          </div>
        </div>

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
            <span>الوقت المقدر: 10 ثواني</span>
            <span aria-hidden="true">·</span>
            <span dir="ltr">Est time: 10 seconds</span>
          </div>
          <div className="evaluating-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>
    </main>
  );
}
