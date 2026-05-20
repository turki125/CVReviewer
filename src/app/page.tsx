import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Building2,
  ChartNoAxesColumnIncreasing,
  Mic,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";

const trustedCompanies = ["RIYAD BANK", "aramco", "stc", "SABIC", "NEOM"];

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
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
];

export default function HomePage() {
  return (
    <div className="landing-page" dir="rtl">
      <nav className="landing-nav" aria-label="التنقل الرئيسي">
        <div className="landing-nav-inner">
          <Link className="landing-brand" href="/">
            مدرب المقابلات
          </Link>

          <div className="landing-links" aria-label="روابط الصفحة">
            <Link className="landing-link active" href="/">
              الرئيسية
            </Link>
            <Link className="landing-link" href="/features">
              المميزات
            </Link>
            <a className="landing-link" href="/PricingInterviewCoach.html">
              الأسعار
            </a>
          </div>

          <div className="landing-actions">
            <a className="signin-link" href="/SignInInterviewCoach.html">
              تسجيل الدخول
            </a>
            <Link className="small-cta" href="/StartFreeTrialInterviewCoach.html">
              ابدأ مجانا
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
            <h1>تدرّب على مقابلتك قبل ما تدخلها</h1>
            <p>
              محاكي مقابلات مدعوم بالذكاء الاصطناعي، مصمم خصيصا لتدريب
              الخريجين السعوديين على معايير التوظيف في كبرى الشركات الوطنية
              والعالمية.
            </p>
          </div>

          <div className="hero-actions">
            <Link className="hero-button primary" href="/setup">
              <span>ابدأ المقابلة</span>
              <ArrowLeft size={22} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <a className="hero-button secondary" href="/HowItWorksInterviewCoach.html">
              <span>شوف كيف يشتغل</span>
              <PlayCircle size={22} strokeWidth={2.1} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="trusted-strip" aria-labelledby="trusted-title">
          <p id="trusted-title">يثق بنا خريجون يعملون في</p>
          <div className="trusted-logos">
            {trustedCompanies.map((company) => (
              <span key={company}>{company}</span>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="feature-section"
          aria-label="مميزات مدرب المقابلات"
        >
          <div className="feature-grid">
            {features.map((feature) => (
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
            <div className="footer-brand">مدرب المقابلات</div>
            <p>© 2024 مدرب المقابلات. جميع الحقوق محفوظة.</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">الخصوصية</a>
            <a href="#terms">الشروط</a>
            <a href="#contact">اتصل بنا</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
