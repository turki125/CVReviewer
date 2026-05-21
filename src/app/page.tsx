"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Building2,
  ChartNoAxesColumnIncreasing,
  Languages,
  Mic,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";

const trustedCompanies = ["RIYAD BANK", "aramco", "stc", "SABIC", "NEOM"];

type WebsiteLanguage = "ar" | "en";

const content = {
  ar: {
    brand: "مدرب المقابلات",
    navAria: "التنقل الرئيسي",
    linksAria: "روابط الصفحة",
    home: "الرئيسية",
    features: "المميزات",
    pricing: "الأسعار",
    signIn: "تسجيل الدخول",
    startFree: "ابدأ مجانا",
    heroTitle: "تدرّب على مقابلتك قبل ما تدخلها",
    heroText:
      "محاكي مقابلات مدعوم بالذكاء الاصطناعي، مصمم خصيصا لتدريب الخريجين السعوديين على معايير التوظيف في كبرى الشركات الوطنية والعالمية.",
    startInterview: "ابدأ المقابلة",
    howItWorks: "شوف كيف يشتغل",
    trusted: "يثق بنا خريجون يعملون في",
    featuresAria: "مميزات مدرب المقابلات",
    footerRights: "© 2024 مدرب المقابلات. جميع الحقوق محفوظة.",
    privacy: "الخصوصية",
    terms: "الشروط",
    contact: "اتصل بنا",
    toggleLabel: "English",
    toggleAria: "Switch website language to English",
    featureCards: [
      {
        icon: Mic,
        title: "مقابلة صوتية",
        description:
          "تحدث مباشرة مع الذكاء الاصطناعي في بيئة محاكية للواقع لكسر حاجز الرهبة وبناء الثقة قبل المقابلة الحقيقية.",
      },
      {
        icon: Building2,
        title: "مخصصة للشركات",
        description:
          "أسئلة ومواقف مبنية على ثقافة واحتياجات كبرى الشركات السعودية، لتضمن أن إجاباتك تتوافق مع توقعاتهم.",
      },
      {
        icon: ChartNoAxesColumnIncreasing,
        title: "تقييم مفصل",
        description:
          "احصل على تقرير شامل وفوري يحلل أسلوبك، مستوى ثقتك، وقوة إجاباتك مع اقتراحات للتحسين.",
      },
    ],
  },
  en: {
    brand: "Interview Coach",
    navAria: "Main navigation",
    linksAria: "Page links",
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    signIn: "Sign in",
    startFree: "Start free",
    heroTitle: "Practice your interview before you walk in",
    heroText:
      "An AI-powered mock interview coach built for Saudi graduates preparing for hiring standards at leading national and global companies.",
    startInterview: "Start interview",
    howItWorks: "See how it works",
    trusted: "Trusted by graduates working at",
    featuresAria: "Interview Coach features",
    footerRights: "© 2024 Interview Coach. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    toggleLabel: "العربية",
    toggleAria: "Switch website language to Arabic",
    featureCards: [
      {
        icon: Mic,
        title: "Voice-style practice",
        description:
          "Practice in a realistic AI interview environment so you can reduce anxiety and build confidence before the real interview.",
      },
      {
        icon: Building2,
        title: "Company-focused",
        description:
          "Questions and scenarios are shaped around major Saudi employers, helping your answers match what recruiters expect.",
      },
      {
        icon: ChartNoAxesColumnIncreasing,
        title: "Detailed feedback",
        description:
          "Get an instant report that analyzes your answer quality, clarity, confidence, and practical ways to improve.",
      },
    ],
  },
} satisfies Record<
  WebsiteLanguage,
  {
    brand: string;
    navAria: string;
    linksAria: string;
    home: string;
    features: string;
    pricing: string;
    signIn: string;
    startFree: string;
    heroTitle: string;
    heroText: string;
    startInterview: string;
    howItWorks: string;
    trusted: string;
    featuresAria: string;
    footerRights: string;
    privacy: string;
    terms: string;
    contact: string;
    toggleLabel: string;
    toggleAria: string;
    featureCards: {
      icon: LucideIcon;
      title: string;
      description: string;
    }[];
  }
>;

export default function HomePage() {
  const [websiteLanguage, setWebsiteLanguage] = useState<WebsiteLanguage>("ar");
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);
  const copy = content[websiteLanguage];
  const isEnglish = websiteLanguage === "en";

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("websiteLanguage");

    if (savedLanguage === "en" || savedLanguage === "ar") {
      setWebsiteLanguage(savedLanguage);
    }
  }, []);

  function toggleWebsiteLanguage() {
    setIsLanguageSwitching(true);

    window.setTimeout(() => {
      setWebsiteLanguage((currentLanguage) => {
        const nextLanguage = currentLanguage === "ar" ? "en" : "ar";
        window.localStorage.setItem("websiteLanguage", nextLanguage);
        return nextLanguage;
      });
    }, 80);

    window.setTimeout(() => {
      setIsLanguageSwitching(false);
    }, 240);
  }

  return (
    <div
      className={`landing-page language-swap${isLanguageSwitching ? " is-switching" : ""}`}
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <nav className="landing-nav" aria-label={copy.navAria}>
        <div className="landing-nav-inner">
          <Link className="landing-brand" href="/">
            {copy.brand}
          </Link>

          <div className="landing-links" aria-label={copy.linksAria}>
            <Link className="landing-link active" href="/">
              {copy.home}
            </Link>
            <Link className="landing-link" href="/features">
              {copy.features}
            </Link>
            <a className="landing-link" href="/PricingInterviewCoach.html">
              {copy.pricing}
            </a>
          </div>

          <div className="landing-actions">
            <button
              className="language-toggle-button"
              type="button"
              onClick={toggleWebsiteLanguage}
              aria-label={copy.toggleAria}
            >
              <Languages size={18} strokeWidth={2.1} aria-hidden="true" />
              <span>{copy.toggleLabel}</span>
            </button>
            <a className="signin-link" href="/SignInInterviewCoach.html">
              {copy.signIn}
            </a>
            <Link className="small-cta" href="/StartFreeTrialInterviewCoach.html">
              {copy.startFree}
            </Link>
          </div>
        </div>
      </nav>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="ai-mark" aria-hidden="true">
            <BrainCircuit size={50} strokeWidth={1.8} />
          </div>

          <div className="hero-copy">
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroText}</p>
          </div>

          <div className="hero-actions">
            <Link className="hero-button primary" href="/SetupwithSpecificRolesInterviewCoach.html">
              <span>{copy.startInterview}</span>
              <ArrowLeft size={22} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <a className="hero-button secondary" href="/HowItWorksInterviewCoach.html">
              <span>{copy.howItWorks}</span>
              <PlayCircle size={22} strokeWidth={2.1} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="trusted-strip" aria-labelledby="trusted-title">
          <p id="trusted-title">{copy.trusted}</p>
          <div className="trusted-logos">
            {trustedCompanies.map((company) => (
              <span key={company}>{company}</span>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="feature-section"
          aria-label={copy.featuresAria}
        >
          <div className="feature-grid">
            {copy.featureCards.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <feature.icon size={28} strokeWidth={1.9} aria-hidden="true" />
                </div>
                <div className="feature-heading">
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-brand-group">
            <div className="footer-brand">{copy.brand}</div>
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
