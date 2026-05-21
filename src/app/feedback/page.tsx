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
import type { AnswerEvaluationResponse, InterviewSetupInput } from "@/lib/types";

const scoreRadius = 70;
const scoreCircumference = 2 * Math.PI * scoreRadius;

type SavedInterviewAnswer = {
  question: string;
  answer: string;
  evaluation: AnswerEvaluationResponse;
  answeredAt: string;
};

const fallbackSetup: InterviewSetupInput = {
  name: "فهد",
  company: "Aramco",
  track: "Product Manager",
  specialization: "Software Engineering",
  interviewLanguage: "Bilingual",
};

const fallbackAnswers: SavedInterviewAnswer[] = [
  {
    question: "No completed interview answers were found.",
    answer: "ابدأ مقابلة جديدة حتى يظهر تقرير مبني على إجاباتك الفعلية.",
    evaluation: {
      score: 7,
      feedback:
        "هذا تقرير تجريبي. بعد إرسال إجاباتك في المقابلة، سيتم حساب النتيجة النهائية من تقييماتك الفعلية.",
      improvedAnswer:
        "Start a new mock interview and submit answers to generate a report based on your real performance.",
      tip: "أكمل سؤالا واحدا على الأقل ثم افتح التقرير.",
    },
    answeredAt: new Date().toISOString(),
  },
];

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

function createReport(answers: SavedInterviewAnswer[], setup: InterviewSetupInput) {
  const validAnswers = answers.length > 0 ? answers : fallbackAnswers;
  const sortedByScore = [...validAnswers].sort((a, b) => a.evaluation.score - b.evaluation.score);
  const weakest = sortedByScore[0];
  const strongest = sortedByScore[sortedByScore.length - 1];
  const averageScore =
    validAnswers.reduce((total, item) => total + normalizeScore(item.evaluation.score), 0) / validAnswers.length;
  const scoreTarget = Math.round(averageScore * 10);
  const competencyScores = buildCompetencyScores(validAnswers, scoreTarget);
  const radarPoints = buildRadarPoints(competencyScores.map((item) => item.score));
  const radarCircles = buildRadarCirclePoints(competencyScores.map((item) => item.score));

  return {
    answerCount: validAnswers.length,
    competencies: competencyScores,
    headline: getHeadline(scoreTarget),
    improvementTitle: `سبب الخصم: سؤال بدرجة ${normalizeScore(weakest.evaluation.score)}/10`,
    radarCircles,
    radarPoints,
    scoreTarget,
    strongest,
    strengthTitle: `أفضل إجابة: ${normalizeScore(strongest.evaluation.score)}/10`,
    summary: buildSummary(scoreTarget, setup, weakest),
    weakest,
  };
}

function normalizeScore(score: number) {
  return Math.max(1, Math.min(10, Number(score) || 1));
}

function getHeadline(score: number) {
  if (score >= 85) return "أداء قوي جدا، إجاباتك جاهزة للمقابلة.";
  if (score >= 70) return "أداء جيد، مع نقاط واضحة للتحسين.";
  if (score >= 50) return "أداء متوسط، تحتاج إلى أمثلة أوضح.";
  return "تحتاج إلى تدريب أكثر قبل المقابلة.";
}

function buildSummary(score: number, setup: InterviewSetupInput, weakest: SavedInterviewAnswer) {
  const base = `نتيجتك مبنية على إجاباتك الفعلية في مقابلة ${setup.company} لمسار ${setup.track}.`;

  if (score >= 85) {
    return `${base} السبب الرئيسي للنتيجة المرتفعة هو وضوح الإجابات وقوة الأمثلة. أهم ملاحظة متبقية: ${weakest.evaluation.tip}`;
  }
  if (score >= 70) {
    return `${base} أداؤك جيد، لكن الدرجة تأثرت بالإجابات التي تحتاج تفاصيل أكثر أو نتيجة قابلة للقياس. أهم سبب: ${weakest.evaluation.feedback}`;
  }
  if (score >= 50) {
    return `${base} التقرير يظهر أنك تحتاج إلى تنظيم الإجابات بطريقة أوضح وربطها بتخصصك. أهم سبب: ${weakest.evaluation.feedback}`;
  }
  return `${base} الدرجة منخفضة لأن الإجابات تحتاج أمثلة محددة وهيكلة أفضل. ابدأ من هذه الملاحظة: ${weakest.evaluation.tip}`;
}

function buildCompetencyScores(answers: SavedInterviewAnswer[], scoreTarget: number) {
  const average = scoreTarget;
  const best = Math.round(Math.max(...answers.map((item) => normalizeScore(item.evaluation.score))) * 10);
  const lowest = Math.round(Math.min(...answers.map((item) => normalizeScore(item.evaluation.score))) * 10);
  const answerLengthAverage =
    answers.reduce((total, item) => total + item.answer.trim().split(/\s+/).filter(Boolean).length, 0) / answers.length;
  const detailScore = Math.max(35, Math.min(100, Math.round(answerLengthAverage * 4)));

  return [
    { ar: "القوة", en: "Best", score: best, className: "technical" },
    { ar: "المتوسط", en: "Average", score: average, className: "behavioral" },
    { ar: "التفصيل", en: "Detail", score: detailScore, className: "communication" },
    { ar: "الثبات", en: "Consistency", score: Math.max(30, 100 - (best - lowest)), className: "culture" },
    { ar: "أقل إجابة", en: "Lowest", score: lowest, className: "confidence" },
  ];
}

function buildRadarPoints(scores: number[]) {
  return scores
    .map((score, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / scores.length;
      const radius = 18 + (Math.max(0, Math.min(100, score)) / 100) * 72;
      const x = 100 + Math.cos(angle) * radius;
      const y = 100 + Math.sin(angle) * radius;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildRadarCirclePoints(scores: number[]) {
  return scores.map((score, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / scores.length;
    const radius = 18 + (Math.max(0, Math.min(100, score)) / 100) * 72;
    return {
      x: Number((100 + Math.cos(angle) * radius).toFixed(1)),
      y: Number((100 + Math.sin(angle) * radius).toFixed(1)),
    };
  });
}

export default function FeedbackPage() {
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<SavedInterviewAnswer[]>(fallbackAnswers);
  const [setup, setSetup] = useState<InterviewSetupInput>(fallbackSetup);
  const report = useMemo(() => createReport(answers, setup), [answers, setup]);
  const scoreOffset = useMemo(
    () => scoreCircumference - (score / 100) * scoreCircumference,
    [score],
  );

  useEffect(() => {
    const savedAnswers = window.localStorage.getItem("interviewAnswers");
    const savedSetup = window.localStorage.getItem("interviewSetup");

    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers) as SavedInterviewAnswer[];
        if (Array.isArray(parsedAnswers) && parsedAnswers.length > 0) {
          setAnswers(parsedAnswers);
        }
      } catch {
        window.localStorage.removeItem("interviewAnswers");
      }
    }

    if (savedSetup) {
      try {
        setSetup({ ...fallbackSetup, ...(JSON.parse(savedSetup) as Partial<InterviewSetupInput>) });
      } catch {
        window.localStorage.removeItem("interviewSetup");
      }
    }
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    const duration = 1200;
    const start = performance.now();

    const animateScore = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setScore(Math.round(report.scoreTarget * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animateScore);
      }
    };

    animationFrame = window.requestAnimationFrame(animateScore);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [report.scoreTarget]);

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
              <h2 id="report-hero-title">{report.headline}</h2>
              <p>{report.summary}</p>
            </div>

            <dl className="report-meta">
              <div>
                <dt>عدد الإجابات / ANSWERS</dt>
                <dd dir="ltr">{report.answerCount} Answers</dd>
              </div>
              <div>
                <dt>الدور / ROLE</dt>
                <dd dir="ltr">{setup.track}</dd>
              </div>
            </dl>
          </div>

          <div className="score-gauge" aria-label={`النتيجة ${report.scoreTarget} من 100`}>
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
                <polygon className="radar-data" points={report.radarPoints} />
                {report.radarCircles.map((point) => (
                  <circle cx={point.x} cy={point.y} key={`${point.x}-${point.y}`} r="4" />
                ))}
              </svg>

              {report.competencies.map((item) => (
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
                <h3>{report.strengthTitle}</h3>
                <p>{report.strongest.evaluation.feedback}</p>
              </div>

              <blockquote>
                <Quote size={24} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
                <p>"{report.strongest.answer}"</p>
              </blockquote>
            </article>

            <article className="feedback-card improvement">
              <div>
                <div className="feedback-kicker">
                  <TrendingUp size={21} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
                  <span>مجال للتحسين / Area to Improve</span>
                </div>
                <h3>{report.improvementTitle}</h3>
                <p>{report.weakest.evaluation.feedback}</p>
              </div>

              <div className="star-tags" dir="ltr">
                <span>Situation</span>
                <span>Task</span>
                <span>Action</span>
                <span className="missing">{report.weakest.evaluation.tip}</span>
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
              <p>"{report.weakest.answer}"</p>
            </article>

            <article className="answer-column model-answer">
              <div className="answer-heading">
                <CheckCircle2 size={20} strokeWidth={2.1} fill="currentColor" aria-hidden="true" />
                <span>الإجابة النموذجية / Model Answer</span>
              </div>
              <p>{report.weakest.evaluation.improvedAnswer}</p>
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
