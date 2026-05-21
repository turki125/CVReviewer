"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle2,
  Headphones,
  Keyboard,
  Lightbulb,
  LineChart,
  MessageSquare,
  Users,
  type LucideIcon,
} from "lucide-react";

type WebsiteLanguage = "ar" | "en";

const companyCards = [
  { ar: "أرامكو", en: "Aramco", label: "Aramco" },
  { ar: "إس تي سي", en: "STC", label: "STC" },
  { ar: "بنك الرياض", en: "Riyad Bank", label: "Riyad Bank" },
  { ar: "+50 شركة", en: "+50 Companies", label: "+50 Companies" },
];

const analyticsItems: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BarChart3,
    title: "مخطط الكفاءات | Competency Map",
    description: "تقييم واضح لمهاراتك القيادية والتقنية والشخصية.",
  },
  {
    icon: Lightbulb,
    title: "الإجابة النموذجية | Model Answers",
    description: "اقتراحات ذكية لصياغة إجابتك بشكل أكثر احترافية.",
  },
];

const englishAnalyticsItems: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BarChart3,
    title: "Competency Map",
    description: "Clear scoring for your leadership, technical, and communication skills.",
  },
  {
    icon: Lightbulb,
    title: "Model Answers",
    description: "Smart suggestions that help you rewrite your answer more professionally.",
  },
];

const summaryCards = [
  {
    className: "features-summary-card primary",
    icon: LineChart,
    title: "تقارير فورية بالذكاء الاصطناعي",
    description: "نحلل مقابلتك لحظة بلحظة ونقدم لك نصائح دقيقة ومباشرة.",
  },
  {
    className: "features-summary-card mint",
    icon: Building2,
    title: "بوابات توظيف",
    description: "ربط مباشر مع مسؤولي التوظيف في الجهات الشريكة.",
  },
  {
    className: "features-summary-card neutral",
    icon: Headphones,
    title: "دعم فني 24/7",
    description: "فريقنا جاهز لمساعدتك في أي وقت خلال رحلتك.",
  },
];

const englishSummaryCards = [
  {
    className: "features-summary-card primary",
    icon: LineChart,
    title: "Instant AI reports",
    description: "We analyze your interview and give you precise, direct improvement notes.",
  },
  {
    className: "features-summary-card mint",
    icon: Building2,
    title: "Hiring pathways",
    description: "Practice for the expectations of major employers and partner hiring programs.",
  },
  {
    className: "features-summary-card neutral",
    icon: Headphones,
    title: "24/7 support",
    description: "Our support team is ready to help throughout your preparation journey.",
  },
];

export default function FeaturesPage() {
  const [websiteLanguage, setWebsiteLanguage] = useState<WebsiteLanguage>("ar");
  const isEnglish = websiteLanguage === "en";
  const activeAnalyticsItems = isEnglish ? englishAnalyticsItems : analyticsItems;
  const activeSummaryCards = isEnglish ? englishSummaryCards : summaryCards;

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("websiteLanguage");
    if (savedLanguage === "en" || savedLanguage === "ar") {
      setWebsiteLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="landing-page features-page" dir={isEnglish ? "ltr" : "rtl"}>
      <nav className="landing-nav" aria-label={isEnglish ? "Main navigation" : "التنقل الرئيسي"}>
        <div className="landing-nav-inner">
          <Link className="landing-brand" href="/">
            تاهيل Taaheel
          </Link>

          <div className="landing-links" aria-label={isEnglish ? "Page links" : "روابط الصفحة"}>
            <Link className="landing-link" href="/">
              {isEnglish ? "Home" : "الرئيسية"}
            </Link>
            <Link className="landing-link active" href="/features">
              {isEnglish ? "Features" : "المميزات"}
            </Link>
            <a className="landing-link" href="/PricingInterviewCoach.html">
              {isEnglish ? "Pricing" : "الأسعار"}
            </a>
          </div>

          <div className="landing-actions">
            <a className="signin-link" href="/SignInInterviewCoach.html">
              {isEnglish ? "Sign in" : "تسجيل الدخول"}
            </a>
            <Link className="small-cta" href="/StartFreeTrialInterviewCoach.html">
              {isEnglish ? "Start free" : "ابدأ مجانا"}
            </Link>
          </div>
        </div>
      </nav>

      <main className="features-main">
        <section className="features-hero" aria-labelledby="features-title">
          <h1 id="features-title">
            {isEnglish ? "Taaheel Features" : "مميزات تاهيل"}
            {!isEnglish ? <span dir="ltr">Taaheel Features</span> : null}
          </h1>
          <p>
            {isEnglish
              ? "We use AI to help Saudi talent prepare for demanding interviews at leading local and global companies."
              : "نستخدم أحدث تقنيات الذكاء الاصطناعي لتمكين الكفاءات السعودية من اجتياز أصعب المقابلات الوظيفية في كبرى الشركات العالمية والمحلية."}
          </p>
        </section>

        <section className="features-split" aria-labelledby="chat-title">
          <div className="features-copy">
            <div className="feature-pill">
              <MessageSquare size={18} strokeWidth={2} aria-hidden="true" />
              {isEnglish ? "Text Chat AI" : "محادثة نصية فورية | Text Chat AI"}
            </div>
            <h2 id="chat-title">{isEnglish ? "AI Chat Interviews" : "مقابلات نصية بالذكاء الاصطناعي | AI Chat Interviews"}</h2>
            <p>
              {isEnglish
                ? "Interact with the AI coach through instant text chat. Write your answers and the system analyzes clarity, reasoning, and persuasion."
                : "تفاعل مع مدربنا الذكي من خلال المحادثة النصية الفورية. اكتب إجاباتك وسيقوم النظام بتحليل أسلوب الرد، التفكير، والقدرة على الإقناع باللغتين العربية والإنجليزية."}
            </p>
            <ul className="feature-checks">
              <li>
                <CheckCircle2 size={21} strokeWidth={2.2} aria-hidden="true" />
                {isEnglish ? "Real-time text interaction" : "تفاعل نصي فوري | Real-time text interaction"}
              </li>
              <li>
                <CheckCircle2 size={21} strokeWidth={2.2} aria-hidden="true" />
                {isEnglish ? "Content and clarity analysis" : "تحليل التفكير والوضوح | Content & clarity analysis"}
              </li>
            </ul>
          </div>

          <div className="voice-preview chat-preview" aria-label="واجهة مقابلة نصية">
            <img
              className="chat-preview-image"
              alt=""
              aria-hidden="true"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZalanMwBWx-UIuoEVpVVxuvQKeD6bAbQxsIDYsUeE8HHrbca-lfQlW81IR26tfhWkyCy9xHsIWx3fbdaUDPFuXBOubQGua4IHWQeGzyJvMT8eoyysUbP5Ab0Bu0YU2O1Ur3wGVX0i1n3kOSOZrbXuy8WMgMHCBgq9PaQSHv5ggCmxvIBWWT4dR4i2s8n7G-1rQEBpAKXV5_xkBrVUnEXetCgKVDh3cMzUxVjkYhFtA1PJaNw9MB2p5nrjOsaL9U0CffoYwmlXwQ4"
            />
            <div className="voice-orb" />
            <div className="voice-panel">
              <div className="voice-mic">
                <Keyboard size={26} strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="voice-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <strong>يتم تحليل الإجابة... | Analyzing...</strong>
            </div>
          </div>
        </section>

        <section className="features-split company-section" aria-labelledby="company-title">
          <div className="company-grid">
            {companyCards.map((company) => (
              <article className="company-card" key={company.label}>
                <Building2 size={34} strokeWidth={1.8} aria-hidden="true" />
                <h3>{isEnglish ? company.en : company.ar}</h3>
                <p dir="ltr">{company.label}</p>
              </article>
            ))}
          </div>

          <div className="features-copy">
            <div className="feature-pill dark">
              <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
              {isEnglish ? "Targeted Content" : "محتوى مخصص | Targeted Content"}
            </div>
            <h2 id="company-title">{isEnglish ? "Tailored for Top Companies" : "تدريب مخصص لكبرى الشركات | Tailored for Top Companies"}</h2>
            <p>
              {isEnglish
                ? "Practice realistic questions shaped around major employers, company culture, and the role you are targeting."
                : "قاعدة بياناتنا تحتوي على آلاف الأسئلة الواقعية من مقابلات الشركات الكبرى. تدرب على الثقافة المؤسسية والأسئلة التقنية الخاصة بجهة عملك القادمة."}
            </p>
            <div className="feature-tags">
              <span>{isEnglish ? "National Programs" : "البرامج الوطنية | National Programs"}</span>
              <span>{isEnglish ? "Banking" : "البنوك | Banking"}</span>
              <span>{isEnglish ? "Energy" : "الطاقة | Energy"}</span>
            </div>
          </div>
        </section>

        <section className="features-split" aria-labelledby="analytics-title">
          <div className="features-copy">
            <div className="feature-pill warm">
              <BarChart3 size={18} strokeWidth={2} aria-hidden="true" />
              {isEnglish ? "Insightful Analytics" : "تحليل دقيق | Insightful Analytics"}
            </div>
            <h2 id="analytics-title">{isEnglish ? "Comprehensive Analytics" : "تقييم شامل ودقيق | Comprehensive Analytics"}</h2>
            <p>
              {isEnglish
                ? "After the interview, you receive a detailed report with skill insights and stronger model answers."
                : "لا نكتفي بإنهاء المقابلة، بل نزودك بتقرير تفصيلي يتضمن مخططات بيانية لمهاراتك وإجابات نموذجية لكل سؤال تم طرحه."}
            </p>
            <div className="analytics-list">
              {activeAnalyticsItems.map((item) => (
                <article key={item.title}>
                  <span>
                    <item.icon size={24} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="radar-card" aria-label="مخطط تقييم الكفاءات">
            <div className="radar-visual">
              <svg viewBox="0 0 100 100" role="img" aria-label="نتيجة المهارات">
                <polygon points="50,5 95,35 78,90 22,90 5,35" />
                <polygon points="50,17 83,40 70,78 30,78 17,40" />
                <polygon points="50,29 70,45 62,66 38,66 30,45" />
                <polygon className="radar-score" points="50,10 85,38 72,82 40,75 20,40" />
              </svg>
              <span className="radar-label top">{isEnglish ? "Language" : <>اللغة<br />Language</>}</span>
              <span className="radar-label right">{isEnglish ? "Confidence" : <>الثقة<br />Confidence</>}</span>
              <span className="radar-label bottom-right">{isEnglish ? "Knowledge" : <>المعرفة<br />Knowledge</>}</span>
              <span className="radar-label bottom-left">{isEnglish ? "Logic" : <>المنطق<br />Logic</>}</span>
              <span className="radar-label left">{isEnglish ? "Engagement" : <>التفاعل<br />Engagement</>}</span>
            </div>
            <strong>{isEnglish ? "Final score: 88/100" : "النتيجة النهائية: 88/100"}</strong>
          </div>
        </section>

        <section className="features-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">{isEnglish ? "Everything you need to succeed" : "كل ما تحتاجه للنجاح | Everything you need"}</h2>
          <div className="features-summary-grid">
            {activeSummaryCards.map((card) => (
              <article className={card.className} key={card.title}>
                <card.icon size={34} strokeWidth={1.8} aria-hidden="true" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
            <article className="features-summary-card community">
              <Users size={34} strokeWidth={1.8} aria-hidden="true" />
              <div>
                <h3>انضم لآلاف المتدربين</h3>
                <p>{isEnglish ? "Thousands of graduates use Taaheel to prepare with confidence." : "أكثر من 10,000 خريج حصلوا على وظائفهم بفضل الله ثم بفضل تدريباتنا."}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="features-cta" aria-labelledby="features-cta-title">
          <h2 id="features-cta-title">{isEnglish ? "Ready for your next interview?" : "هل أنت مستعد لمقابلتك القادمة؟"}</h2>
          <p>{isEnglish ? "Start now and try a free mock interview with the AI coach." : "ابدأ الآن وجرب مقابلة تجريبية مجانية مع مدربنا الذكي."}</p>
          <div>
            <Link className="features-cta-button primary" href="/StartFreeTrialInterviewCoach.html">
              {isEnglish ? "Register now" : "سجل الآن مجانا | Register Now"}
              <ArrowLeft size={21} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-brand-group">
            <div className="footer-brand">تاهيل Taaheel</div>
            <p>{isEnglish ? "© 2024 Taaheel. All rights reserved." : "© 2024 تاهيل Taaheel. جميع الحقوق محفوظة."}</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">{isEnglish ? "Privacy" : "الخصوصية"}</a>
            <a href="#terms">{isEnglish ? "Terms" : "الشروط"}</a>
            <a href="#contact">{isEnglish ? "Contact" : "اتصل بنا"}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
