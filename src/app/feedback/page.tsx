"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Copy,
  Download,
  Mic,
  Quote,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

const competencies = [
  { ar: "التقنية", en: "Technical", score: 80, className: "technical" },
  { ar: "السلوك", en: "Behavioral", score: 75, className: "behavioral" },
  { ar: "التواصل", en: "Comm", score: 65, className: "communication" },
  { ar: "الثقافة", en: "Culture", score: 55, className: "culture" },
  { ar: "الثقة", en: "Confidence", score: 70, className: "confidence" },
];

const scoreTarget = 72;
const scoreRadius = 70;
const scoreCircumference = 2 * Math.PI * scoreRadius;

const nextSteps: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: BookOpen,
    title: "مراجعة منهجية STAR",
    description: "Practice framing 3 new stories focusing heavily on the Result metric.",
    href: "/setup",
  },
  {
    icon: Mic,
    title: "مقابلة تجريبية جديدة",
    description: "Start a new mock session focused solely on behavioral questions.",
    href: "/interview",
  },
];

export default function FeedbackPage() {
  const [score, setScore] = useState(0);
  const scoreOffset = useMemo(
    () => scoreCircumference - (score / 100) * scoreCircumference,
    [score],
  );

  useEffect(() => {
    let animationFrame = 0;
    const duration = 1200;
    const start = performance.now();

    const animateScore = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setScore(Math.round(scoreTarget * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animateScore);
      }
    };

    animationFrame = window.requestAnimationFrame(animateScore);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="report-page" dir="rtl">
      <header className="report-header">
        <div className="report-header-inner">
          <div className="report-title-group">
            <Link className="report-close-button" href="/" aria-label="إغلاق التقرير">
              <X size={22} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <div>
              <h1>تقرير مقابلتك</h1>
              <p dir="ltr">Your Interview Report</p>
            </div>
          </div>

          <button className="report-download" type="button">
            <Download size={20} strokeWidth={2.1} aria-hidden="true" />
            <span>
              <span dir="ltr">Download PDF</span> / تحميل
            </span>
          </button>
        </div>
      </header>

      <main className="report-main">
        <section className="report-hero" aria-labelledby="report-hero-title">
          <div className="report-hero-copy">
            <div className="report-badge">
              <Sparkles size={18} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
              <span>واعد · Promising</span>
            </div>

            <div>
              <h2 id="report-hero-title">أداء ممتاز، مع مساحة للنمو.</h2>
              <p dir="ltr">
                Solid performance with room to grow. You demonstrated strong technical knowledge, but could improve how
                you structure complex behavioral answers.
              </p>
            </div>

            <dl className="report-meta">
              <div>
                <dt>مدة المقابلة / DURATION</dt>
                <dd dir="ltr">45 Min</dd>
              </div>
              <div>
                <dt>الدور / ROLE</dt>
                <dd dir="ltr">Product Manager</dd>
              </div>
            </dl>
          </div>

          <div className="score-gauge" aria-label="النتيجة 72 من 100">
            <svg viewBox="0 0 160 160" aria-hidden="true">
              <circle className="score-track" cx="80" cy="80" fill="none" r="70" strokeWidth="8" />
              <circle
                className="score-progress"
                cx="80"
                cy="80"
                fill="none"
                r="70"
                strokeDasharray={scoreCircumference}
                strokeDashoffset={scoreOffset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div>
              <strong dir="ltr">{score}</strong>
              <span dir="ltr">Score / 100</span>
            </div>
          </div>
        </section>

        <section className="report-analysis-grid" aria-label="تحليل الكفاءات والملاحظات">
          <article className="report-card competency-card">
            <header className="section-heading">
              <h2>تحليل الكفاءات</h2>
              <p dir="ltr">Competency Radar</p>
            </header>

            <div className="radar-wrap">
              <svg className="radar-chart" viewBox="0 0 200 200" aria-hidden="true">
                <polygon points="100,10 190,75 155,180 45,180 10,75" />
                <polygon points="100,32.5 167.5,81.25 141.25,160 58.75,160 32.5,81.25" />
                <polygon points="100,55 145,97.5 127.5,140 72.5,140 55,97.5" />
                <line x1="100" x2="100" y1="100" y2="10" />
                <line x1="100" x2="190" y1="100" y2="75" />
                <line x1="100" x2="155" y1="100" y2="180" />
                <line x1="100" x2="45" y1="100" y2="180" />
                <line x1="100" x2="10" y1="100" y2="75" />
                <polygon className="radar-data" points="100,28 172,70 137,162 63,144 28,84" />
                <circle cx="100" cy="28" r="4" />
                <circle cx="172" cy="70" r="4" />
                <circle cx="137" cy="162" r="4" />
                <circle cx="63" cy="144" r="4" />
                <circle cx="28" cy="84" r="4" />
              </svg>

              {competencies.map((item) => (
                <div className={`radar-label ${item.className}`} key={item.en}>
                  <strong>{item.ar}</strong>
                  <span dir="ltr">
                    {item.en} ({item.score})
                  </span>
                </div>
              ))}
            </div>
          </article>

          <div className="feedback-stack">
            <article className="feedback-card strength">
              <div>
                <div className="feedback-kicker">
                  <ThumbsUp size={21} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
                  <span>نقطة قوة / Strength</span>
                </div>
                <h3>وضوح التواصل التقني</h3>
                <p dir="ltr">
                  Your explanation of system architecture was concise. You successfully distilled complex concepts into
                  understandable analogies.
                </p>
              </div>

              <blockquote dir="ltr">
                <Quote size={24} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
                <p>"The way we structured the microservices is similar to a well-organized library..."</p>
              </blockquote>
            </article>

            <article className="feedback-card improvement">
              <div>
                <div className="feedback-kicker">
                  <TrendingUp size={21} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
                  <span>مجال للتحسين / Area to Improve</span>
                </div>
                <h3>هيكلة الإجابات السلوكية</h3>
                <p dir="ltr">
                  You missed the Result phase in the STAR method when discussing team conflicts. Always conclude with
                  measurable outcomes.
                </p>
              </div>

              <div className="star-tags" dir="ltr">
                <span>Situation</span>
                <span>Task</span>
                <span>Action</span>
                <span className="missing">Missing Result</span>
              </div>
            </article>
          </div>
        </section>

        <section className="rewrite-panel" aria-labelledby="rewrite-title">
          <div className="ai-badge" dir="ltr">
            <Sparkles size={16} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
            <span>Enhanced by AI</span>
          </div>

          <header className="section-heading">
            <h2 id="rewrite-title">إعادة صياغة مقترحة</h2>
            <p dir="ltr">Suggested Rewrite for Impact</p>
          </header>

          <div className="rewrite-grid">
            <article className="answer-column">
              <div className="answer-heading">
                <User size={20} strokeWidth={2} aria-hidden="true" />
                <span>إجابتك / Your Answer</span>
              </div>
              <p dir="ltr">
                "I had a disagreement with a designer about the layout. I told him we needed to change it because users
                were confused. We eventually changed it and it was better."
              </p>
            </article>

            <article className="answer-column model-answer">
              <div className="answer-heading">
                <CheckCircle2 size={20} strokeWidth={2.1} fill="currentColor" aria-hidden="true" />
                <span>الإجابة النموذجية / Model Answer</span>
              </div>
              <p dir="ltr">
                "We encountered a UX misalignment on the dashboard project. I initiated a brief sync with the design
                lead, presenting user drop-off metrics to ground our discussion. We collaborated on a revised flow,
                which ultimately increased completion rates by 15%."
              </p>
            </article>
          </div>

          <button className="copy-answer" type="button">
            <span>نسخ للإستفادة / Copy to Clipboard</span>
            <Copy size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </section>

        <section className="next-steps" aria-labelledby="next-steps-title">
          <header className="section-heading">
            <h2 id="next-steps-title">الخطوات التالية</h2>
            <p dir="ltr">Actionable Next Steps</p>
          </header>

          <div className="next-step-grid">
            {nextSteps.map((step) => (
              <Link className="next-step-card" href={step.href} key={step.title}>
                <span className="next-step-icon">
                  <step.icon size={24} strokeWidth={2} aria-hidden="true" />
                </span>
                <span>
                  <strong>{step.title}</strong>
                  <small dir="ltr">{step.description}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-brand-group">
            <div className="footer-brand">Interview Coach</div>
            <p>© 2024 إنترفيو كوتش. جميع الحقوق محفوظة / Interview Coach. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">الخصوصية / Privacy</a>
            <a href="#terms">الشروط / Terms</a>
            <a href="#contact">اتصل بنا / Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
