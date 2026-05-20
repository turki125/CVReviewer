import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle2,
  Headphones,
  Lightbulb,
  LineChart,
  Mic,
  Radio,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

const companyCards = [
  { name: "أرامكو", label: "Aramco" },
  { name: "إس تي سي", label: "STC" },
  { name: "بنك الرياض", label: "Riyad Bank" },
  { name: "+50 شركة", label: "+50 Companies" },
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

export default function FeaturesPage() {
  return (
    <div className="landing-page features-page" dir="rtl">
      <nav className="landing-nav" aria-label="التنقل الرئيسي">
        <div className="landing-nav-inner">
          <Link className="landing-brand" href="/">
            مدرب المقابلات
          </Link>

          <div className="landing-links" aria-label="روابط الصفحة">
            <Link className="landing-link" href="/">
              الرئيسية
            </Link>
            <Link className="landing-link active" href="/features">
              المميزات
            </Link>
            <a className="landing-link" href="/PricingInterviewCoach.html">
              الأسعار
            </a>
          </div>

          <div className="landing-actions">
            <a className="signin-link" href="#signin">
              تسجيل الدخول
            </a>
            <Link className="small-cta" href="/StartFreeTrialInterviewCoach.html">
              ابدأ مجانا
            </Link>
          </div>
        </div>
      </nav>

      <main className="features-main">
        <section className="features-hero" aria-labelledby="features-title">
          <div className="features-hero-mark" aria-hidden="true">
            <Sparkles size={42} strokeWidth={1.8} />
          </div>
          <h1 id="features-title">
            مميزات مدرب المقابلات
            <span dir="ltr">Interview Coach Features</span>
          </h1>
          <p>
            نستخدم أحدث تقنيات الذكاء الاصطناعي لتمكين الكفاءات السعودية من
            اجتياز أصعب المقابلات الوظيفية في كبرى الشركات العالمية والمحلية.
          </p>
        </section>

        <section className="features-split" aria-labelledby="voice-title">
          <div className="features-copy">
            <div className="feature-pill">
              <Radio size={18} strokeWidth={2} aria-hidden="true" />
              بث مباشر | Live AI
            </div>
            <h2 id="voice-title">مقابلات ذكية بصوتك | AI Voice Interviews</h2>
            <p>
              تفاعل مع مدربنا الذكي بشكل طبيعي كما في المقابلة الحقيقية. حلل
              نبرة صوتك، سرعة حديثك، والقدرة على التعبير عن الأفكار بوضوح
              ودقة عالية باللغتين العربية والإنجليزية.
            </p>
            <ul className="feature-checks">
              <li>
                <CheckCircle2 size={21} strokeWidth={2.2} aria-hidden="true" />
                استجابة فورية وحوار تفاعلي | Real-time voice interaction
              </li>
              <li>
                <CheckCircle2 size={21} strokeWidth={2.2} aria-hidden="true" />
                تحليل نبرة الصوت والثقة | Voice tone & confidence analysis
              </li>
            </ul>
          </div>

          <div className="voice-preview" aria-label="واجهة مقابلة صوتية">
            <div className="voice-orb" />
            <div className="voice-panel">
              <div className="voice-mic">
                <Mic size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="voice-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <strong>جاري الاستماع... | Listening...</strong>
            </div>
          </div>
        </section>

        <section className="features-split company-section" aria-labelledby="company-title">
          <div className="company-grid">
            {companyCards.map((company) => (
              <article className="company-card" key={company.label}>
                <Building2 size={34} strokeWidth={1.8} aria-hidden="true" />
                <h3>{company.name}</h3>
                <p dir="ltr">{company.label}</p>
              </article>
            ))}
          </div>

          <div className="features-copy">
            <div className="feature-pill dark">
              <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
              محتوى مخصص | Targeted Content
            </div>
            <h2 id="company-title">تدريب مخصص لكبرى الشركات | Tailored for Top Companies</h2>
            <p>
              قاعدة بياناتنا تحتوي على آلاف الأسئلة الواقعية من مقابلات الشركات
              الكبرى. تدرب على الثقافة المؤسسية والأسئلة التقنية الخاصة بجهة
              عملك القادمة.
            </p>
            <div className="feature-tags">
              <span>البرامج الوطنية | National Programs</span>
              <span>البنوك | Banking</span>
              <span>الطاقة | Energy</span>
            </div>
          </div>
        </section>

        <section className="features-split" aria-labelledby="analytics-title">
          <div className="features-copy">
            <div className="feature-pill warm">
              <BarChart3 size={18} strokeWidth={2} aria-hidden="true" />
              تحليل دقيق | Insightful Analytics
            </div>
            <h2 id="analytics-title">تقييم شامل ودقيق | Comprehensive Analytics</h2>
            <p>
              لا نكتفي بإنهاء المقابلة، بل نزودك بتقرير تفصيلي يتضمن مخططات
              بيانية لمهاراتك وإجابات نموذجية لكل سؤال تم طرحه.
            </p>
            <div className="analytics-list">
              {analyticsItems.map((item) => (
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
              <span className="radar-label top">اللغة<br />Language</span>
              <span className="radar-label right">الثقة<br />Confidence</span>
              <span className="radar-label bottom-right">المعرفة<br />Knowledge</span>
              <span className="radar-label bottom-left">المنطق<br />Logic</span>
              <span className="radar-label left">التفاعل<br />Engagement</span>
            </div>
            <strong>النتيجة النهائية: 88/100</strong>
          </div>
        </section>

        <section className="features-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">كل ما تحتاجه للنجاح | Everything you need</h2>
          <div className="features-summary-grid">
            {summaryCards.map((card) => (
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
                <p>أكثر من 10,000 خريج حصلوا على وظائفهم بفضل الله ثم بفضل تدريباتنا.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="features-cta" aria-labelledby="features-cta-title">
          <h2 id="features-cta-title">هل أنت مستعد لمقابلتك القادمة؟</h2>
          <p>ابدأ الآن وجرب مقابلة تجريبية مجانية مع مدربنا الذكي.</p>
          <div>
            <Link className="features-cta-button primary" href="/StartFreeTrialInterviewCoach.html">
              سجل الآن مجانا | Register Now
              <ArrowLeft size={21} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <a className="features-cta-button secondary" href="#sales">
              تحدث مع المبيعات | Sales
            </a>
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
