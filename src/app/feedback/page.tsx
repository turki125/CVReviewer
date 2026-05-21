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

const nextSteps: {
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  description: string;
  href: string;
}[] = [
  {
    icon: BookOpen,
    titleAr: "مراجعة منهجية STAR",
    titleEn: "Review the STAR method",
    description: "Practice framing 3 new stories focusing heavily on the Result metric.",
    href: "/setup",
  },
  {
    icon: Mic,
    titleAr: "مقابلة تجريبية جديدة",
    titleEn: "Start a new mock interview",
    description: "Start a new mock session focused solely on behavioral questions.",
    href: "/interview",
  },
];

function getReportCopy(isEnglish: boolean) {
  return {
    aiBadge: isEnglish ? "Enhanced by AI" : "محسن بالذكاء الاصطناعي",
    answersLabel: isEnglish ? "ANSWERS" : "عدد الإجابات / ANSWERS",
    answerUnit: isEnglish ? "Answers" : "Answers",
    closeAria: isEnglish ? "Close report" : "إغلاق التقرير",
    competencyAria: isEnglish ? "Competency and feedback analysis" : "تحليل الكفاءات والملاحظات",
    competencyHeading: isEnglish ? "Competency analysis" : "تحليل الكفاءات",
    copyButton: isEnglish ? "Copy to Clipboard" : "نسخ للإستفادة / Copy to Clipboard",
    download: isEnglish ? "Download PDF" : "Download PDF / تحميل",
    footerRights: isEnglish
      ? "© 2024 Interview Coach. All rights reserved."
      : "© 2024 إنترفيو كوتش. جميع الحقوق محفوظة / Interview Coach. All rights reserved.",
    improvementKicker: isEnglish ? "Area to Improve" : "مجال للتحسين / Area to Improve",
    modelAnswer: isEnglish ? "Model Answer" : "الإجابة النموذجية / Model Answer",
    nextSteps: isEnglish ? "Next Steps" : "الخطوات التالية",
    privacy: isEnglish ? "Privacy" : "الخصوصية / Privacy",
    reportTitle: isEnglish ? "Your Interview Report" : "تقرير مقابلتك",
    rewriteHeading: isEnglish ? "Suggested rewrite" : "إعادة صياغة مقترحة",
    rewriteSubheading: isEnglish ? "Suggested Rewrite for Impact" : "Suggested Rewrite for Impact",
    roleLabel: isEnglish ? "ROLE" : "الدور / ROLE",
    scoreAria: (score: number) => (isEnglish ? `Score ${score} out of 100` : `النتيجة ${score} من 100`),
    scoreLabel: isEnglish ? "Score / 100" : "Score / 100",
    strengthKicker: isEnglish ? "Strength" : "نقطة قوة / Strength",
    terms: isEnglish ? "Terms" : "الشروط / Terms",
    contact: isEnglish ? "Contact" : "اتصل بنا / Contact",
    subtitle: isEnglish ? "" : "Your Interview Report",
    yourAnswer: isEnglish ? "Your Answer" : "إجابتك / Your Answer",
  };
}

function createReport(answers: SavedInterviewAnswer[], setup: InterviewSetupInput, isEnglish: boolean) {
  if (answers.length === 0) {
    const emptyAnswer = getEmptyReportAnswer(isEnglish);
    const emptyCompetencies = buildEmptyCompetencyScores();

    return {
      answerCount: 0,
      badge: isEnglish ? "No score" : "لا توجد درجة",
      competencies: emptyCompetencies,
      headline: isEnglish ? "No answers were submitted." : "لم يتم إرسال أي إجابة.",
      improvementTitle: isEnglish ? "No score reason available" : "لا يوجد سبب للدرجة",
      radarCircles: buildRadarCirclePoints(emptyCompetencies.map((item) => item.score)),
      radarPoints: buildRadarPoints(emptyCompetencies.map((item) => item.score)),
      scoreTarget: 0,
      strongest: emptyAnswer,
      strengthTitle: isEnglish ? "No completed answers" : "لا توجد إجابات مكتملة",
      summary: isEnglish
        ? `Your score is 0 because no answers were submitted for the ${setup.company} interview. Answer at least one question to generate a real performance score and feedback.`
        : `درجتك 0 لأنه لم يتم إرسال أي إجابة في مقابلة ${setup.company}. أجب عن سؤال واحد على الأقل حتى يظهر تقييم فعلي وأسباب واضحة للنتيجة.`,
      weakest: emptyAnswer,
    };
  }

  const validAnswers = answers;
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
    badge: getScoreBadge(scoreTarget, isEnglish),
    competencies: competencyScores,
    headline: getHeadline(scoreTarget, isEnglish),
    improvementTitle: isEnglish
      ? `Reason to improve: question scored ${normalizeScore(weakest.evaluation.score)}/10`
      : `سبب الخصم: سؤال بدرجة ${normalizeScore(weakest.evaluation.score)}/10`,
    radarCircles,
    radarPoints,
    scoreTarget,
    strongest,
    strengthTitle: isEnglish
      ? `Best answer: ${normalizeScore(strongest.evaluation.score)}/10`
      : `أفضل إجابة: ${normalizeScore(strongest.evaluation.score)}/10`,
    summary: buildSummary(scoreTarget, setup, weakest, isEnglish),
    weakest,
  };
}

function getEmptyReportAnswer(isEnglish: boolean): SavedInterviewAnswer {
  return {
    question: isEnglish ? "No completed interview answers were found." : "لم يتم العثور على إجابات مكتملة.",
    answer: isEnglish
      ? "No answer was submitted."
      : "لم يتم إرسال أي إجابة.",
    evaluation: {
      score: 0,
      feedback: isEnglish
        ? "There is no performance feedback yet because no answer was submitted."
        : "لا توجد ملاحظات أداء حتى الآن لأنه لم يتم إرسال أي إجابة.",
      improvedAnswer: isEnglish
        ? "Start a new mock interview and submit answers to generate a report based on your real performance."
        : "ابدأ مقابلة تجريبية جديدة وأرسل إجاباتك حتى يظهر تقرير مبني على أدائك الفعلي.",
      tip: isEnglish
        ? "Submit at least one answer before opening the report."
        : "أرسل إجابة واحدة على الأقل قبل فتح التقرير.",
    },
    answeredAt: new Date().toISOString(),
  };
}

function normalizeScore(score: number) {
  return Math.max(1, Math.min(10, Number(score) || 1));
}

function getScoreBadge(score: number, isEnglish: boolean) {
  if (isEnglish) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Strong";
    if (score >= 70) return "Promising";
    if (score >= 50) return "Needs practice";
    return "Needs work";
  }

  if (score >= 90) return "ممتاز · Excellent";
  if (score >= 80) return "قوي · Strong";
  if (score >= 70) return "واعد · Promising";
  if (score >= 50) return "يحتاج تدريب · Needs practice";
  return "يحتاج عمل · Needs work";
}

function getHeadline(score: number, isEnglish: boolean) {
  if (isEnglish) {
    if (score >= 85) return "Very strong performance. You are interview-ready.";
    if (score >= 70) return "Good performance, with clear areas to improve.";
    if (score >= 50) return "Average performance. Your examples need more clarity.";
    return "You need more practice before the interview.";
  }

  if (score >= 85) return "أداء قوي جدا، إجاباتك جاهزة للمقابلة.";
  if (score >= 70) return "أداء جيد، مع نقاط واضحة للتحسين.";
  if (score >= 50) return "أداء متوسط، تحتاج إلى أمثلة أوضح.";
  return "تحتاج إلى تدريب أكثر قبل المقابلة.";
}

function buildSummary(score: number, setup: InterviewSetupInput, weakest: SavedInterviewAnswer, isEnglish: boolean) {
  if (isEnglish) {
    const base = `Your score is based on your actual answers for the ${setup.company} interview in the ${setup.track} track.`;

    if (score >= 85) {
      return `${base} The main reason for the high score is clear structure and strong examples. Remaining note: ${weakest.evaluation.tip}`;
    }
    if (score >= 70) {
      return `${base} Your performance is good, but the score was affected by answers that needed more detail or measurable outcomes. Main reason: ${weakest.evaluation.feedback}`;
    }
    if (score >= 50) {
      return `${base} The report shows that your answers need clearer structure and stronger links to your specialization. Main reason: ${weakest.evaluation.feedback}`;
    }
    return `${base} The score is low because the answers need more specific examples and better structure. Start with this note: ${weakest.evaluation.tip}`;
  }

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

function buildEmptyCompetencyScores() {
  return [
    { ar: "القوة", en: "Best", score: 0, className: "technical" },
    { ar: "المتوسط", en: "Average", score: 0, className: "behavioral" },
    { ar: "التفصيل", en: "Detail", score: 0, className: "communication" },
    { ar: "الثبات", en: "Consistency", score: 0, className: "culture" },
    { ar: "أقل إجابة", en: "Lowest", score: 0, className: "confidence" },
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
  const [answers, setAnswers] = useState<SavedInterviewAnswer[]>([]);
  const [setup, setSetup] = useState<InterviewSetupInput>(fallbackSetup);
  const isEnglish = setup.interviewLanguage === "English";
  const copy = useMemo(() => getReportCopy(isEnglish), [isEnglish]);
  const report = useMemo(() => createReport(answers, setup, isEnglish), [answers, setup, isEnglish]);
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

  function handleDownloadPdf() {
    window.print();
  }

  return (
    <div className="report-page" dir={isEnglish ? "ltr" : "rtl"}>
      <header className="report-header">
        <div className="report-header-inner">
          <div className="report-title-group">
            <Link className="report-close-button" href="/" aria-label={copy.closeAria}>
              <X size={22} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <div>
              <h1>{copy.reportTitle}</h1>
              {copy.subtitle ? <p dir="ltr">{copy.subtitle}</p> : null}
            </div>
          </div>

          <button className="report-download" type="button" onClick={handleDownloadPdf}>
            <Download size={20} strokeWidth={2.1} aria-hidden="true" />
            <span>{copy.download}</span>
          </button>
        </div>
      </header>

      <main className="report-main">
        <section className="report-hero" aria-labelledby="report-hero-title">
          <div className="report-hero-copy">
            <div className="report-badge">
              <Sparkles size={18} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
              <span>{report.badge}</span>
            </div>

            <div>
              <h2 id="report-hero-title">{report.headline}</h2>
              <p>{report.summary}</p>
            </div>

            <dl className="report-meta">
              <div>
                <dt>{copy.answersLabel}</dt>
                <dd dir="ltr">{report.answerCount} {copy.answerUnit}</dd>
              </div>
              <div>
                <dt>{copy.roleLabel}</dt>
                <dd dir="ltr">{setup.track}</dd>
              </div>
            </dl>
          </div>

          <div className="score-gauge" aria-label={copy.scoreAria(report.scoreTarget)}>
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
              <span dir="ltr">{copy.scoreLabel}</span>
            </div>
          </div>
        </section>

        <section className="report-analysis-grid" aria-label={copy.competencyAria}>
          <article className="report-card competency-card">
            <header className="section-heading">
              <h2>{copy.competencyHeading}</h2>
              {!isEnglish ? <p dir="ltr">Competency Radar</p> : null}
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
                  <strong>{isEnglish ? item.en : item.ar}</strong>
                  <span dir="ltr">
                    {!isEnglish ? `${item.en} ` : null}({item.score})
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
                  <span>{copy.strengthKicker}</span>
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
                  <span>{copy.improvementKicker}</span>
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
            <span>{copy.aiBadge}</span>
          </div>

          <header className="section-heading">
            <h2 id="rewrite-title">{copy.rewriteHeading}</h2>
            {!isEnglish ? <p dir="ltr">{copy.rewriteSubheading}</p> : null}
          </header>

          <div className="rewrite-grid">
            <article className="answer-column">
              <div className="answer-heading">
                <User size={20} strokeWidth={2} aria-hidden="true" />
                <span>{copy.yourAnswer}</span>
              </div>
              <p>"{report.weakest.answer}"</p>
            </article>

            <article className="answer-column model-answer">
              <div className="answer-heading">
                <CheckCircle2 size={20} strokeWidth={2.1} fill="currentColor" aria-hidden="true" />
                <span>{copy.modelAnswer}</span>
              </div>
              <p>{report.weakest.evaluation.improvedAnswer}</p>
            </article>
          </div>

          <button className="copy-answer" type="button">
            <span>{copy.copyButton}</span>
            <Copy size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </section>

        <section className="next-steps" aria-labelledby="next-steps-title">
          <header className="section-heading">
            <h2 id="next-steps-title">{copy.nextSteps}</h2>
            {!isEnglish ? <p dir="ltr">Actionable Next Steps</p> : null}
          </header>

          <div className="next-step-grid">
            {nextSteps.map((step) => (
              <Link className="next-step-card" href={step.href} key={step.titleEn}>
                <span className="next-step-icon">
                  <step.icon size={24} strokeWidth={2} aria-hidden="true" />
                </span>
                <span>
                  <strong>{isEnglish ? step.titleEn : step.titleAr}</strong>
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
            <p>{copy.footerRights}</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">{copy.privacy}</a>
            <a href="#terms">{copy.terms}</a>
            <a href="#contact">{copy.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
