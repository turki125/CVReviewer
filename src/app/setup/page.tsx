"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Fuel,
  RadioTower,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";
import type { InterviewSetupInput } from "@/lib/types";

type Company = {
  value: string;
  name: string;
  label: string;
  icon: LucideIcon;
  defaultChecked?: boolean;
};

const companies: Company[] = [
  { value: "riyad", name: "بنك الرياض", label: "Riyad Bank", icon: Banknote },
  { value: "aramco", name: "أرامكو", label: "Aramco", icon: Fuel, defaultChecked: true },
  { value: "stc", name: "STC", label: "STC", icon: RadioTower },
];

const tracks = [
  { value: "technical", label: "تقني · Technical", icon: Code2, defaultChecked: true },
  { value: "business", label: "أعمال · Business", icon: BriefcaseBusiness },
];

const languages = [
  {
    value: "bilingual",
    name: "ثنائية اللغة",
    label: "Bilingual",
    recommended: true,
    defaultChecked: true,
  },
  { value: "arabic", name: "العربية", label: "Arabic Only" },
  { value: "english", name: "English", label: "English Only" },
];

export default function SetupPage() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const companyLabels: Record<string, string> = {
      riyad: "Riyad Bank",
      aramco: "Aramco",
      stc: "STC",
    };
    const roleLabels: Record<string, string> = {
      technical: "Software Engineer",
      business: "Business Analyst",
    };
    const language = formData.get("language");
    const setup: InterviewSetupInput = {
      name: String(formData.get("firstName") || "فهد"),
      major: formData.get("track") === "business" ? "Business" : "Computer Science",
      targetRole: roleLabels[String(formData.get("track"))] ?? "Software Engineer",
      companyType: companyLabels[String(formData.get("company"))] ?? "Saudi company",
      experienceLevel: "Fresh graduate",
      interviewLanguage: language === "english" ? "English" : "Arabic",
    };

    window.localStorage.setItem("interviewSetup", JSON.stringify(setup));
    router.push("/interview");
  }

  return (
    <div className="landing-page setup-app-page" dir="rtl">
      <nav className="landing-nav" aria-label="التنقل الرئيسي">
        <div className="landing-nav-inner">
          <Link className="landing-brand" href="/">
            مدرب المقابلات
          </Link>

          <div className="landing-links" aria-label="روابط الصفحة">
            <Link className="landing-link" href="/">
              الرئيسية
            </Link>
            <Link className="landing-link active" href="/setup">
              الإعداد
            </Link>
            <Link className="landing-link" href="/interview">
              المقابلة
            </Link>
          </div>

          <div className="landing-actions">
            <a className="signin-link" href="#signin">
              تسجيل الدخول
            </a>
            <Link className="small-cta" href="/setup">
              ابدأ مجانا
            </Link>
          </div>
        </div>
      </nav>

      <main className="setup-page" dir="ltr">
        <section className="setup-card" aria-labelledby="setup-title">
          <div className="setup-card-accent" />
          <div className="setup-content">
            <header className="setup-header">
              <h1 id="setup-title">جهّز مقابلتك</h1>
              <p dir="ltr">Set up your interview</p>
            </header>

            <form className="setup-form" onSubmit={handleSubmit}>
              <fieldset className="setup-fieldset">
                <div className="setup-section-title">
                  <h2>الشركة المستهدفة</h2>
                  <span dir="ltr">Target Company</span>
                </div>

                <div className="company-grid">
                  {companies.map((company) => (
                    <label className="company-option" key={company.value}>
                      <input
                        type="radio"
                        name="company"
                        value={company.value}
                        defaultChecked={company.defaultChecked}
                      />
                      <span className="company-option-surface" />
                      <CheckCircle2 className="option-check" size={22} strokeWidth={2.2} aria-hidden="true" />
                      <span className="company-option-content">
                        <company.icon size={34} strokeWidth={1.8} aria-hidden="true" />
                        <strong>{company.name}</strong>
                        <small dir="ltr">{company.label}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="setup-fieldset">
                <div className="setup-section-title">
                  <h2>المسار الوظيفي</h2>
                  <span dir="ltr">Role Track</span>
                </div>

                <div className="track-options">
                  {tracks.map((track) => (
                    <label className="track-option" key={track.value}>
                      <input
                        type="radio"
                        name="track"
                        value={track.value}
                        defaultChecked={track.defaultChecked}
                      />
                      <span>
                        <track.icon size={20} strokeWidth={2.1} aria-hidden="true" />
                        {track.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="setup-fieldset">
                <div className="setup-section-title">
                  <h2>لغة المقابلة</h2>
                  <span dir="ltr">Language</span>
                </div>

                <div className="language-options">
                  {languages.map((language) => (
                    <label
                      className={`language-option${language.recommended ? " language-option-wide" : ""}`}
                      key={language.value}
                    >
                      <input
                        type="radio"
                        name="language"
                        value={language.value}
                        defaultChecked={language.defaultChecked}
                      />
                      <span className="language-option-surface" />
                      <span className="language-copy">
                        <span className="radio-mark" aria-hidden="true" />
                        <span>
                          <strong>{language.name}</strong>
                          <small dir="ltr">{language.label}</small>
                        </span>
                      </span>
                      {language.recommended ? (
                        <span className="recommended-badge" dir="ltr">
                          <Star size={14} strokeWidth={2.3} aria-hidden="true" />
                          Recommended
                        </span>
                      ) : null}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="setup-fieldset first-name-fieldset">
                <div className="setup-section-title setup-section-title-plain">
                  <label htmlFor="firstName">الاسم الأول</label>
                  <span dir="ltr">First Name</span>
                </div>

                <div className="name-input-wrap">
                  <input id="firstName" name="firstName" placeholder="فهد / Fahad" type="text" dir="rtl" />
                  <User size={22} strokeWidth={1.9} aria-hidden="true" />
                </div>
              </fieldset>

              <div className="setup-actions">
                <div className="setup-note">
                  <User size={18} strokeWidth={2} aria-hidden="true" />
                  <span>ستكتب إجاباتك أثناء المقابلة</span>
                  <span aria-hidden="true">·</span>
                  <span dir="ltr">Answers are typed, no microphone needed</span>
                </div>

                <button className="setup-start-button" type="submit">
                  <span>ابدأ المقابلة</span>
                  <span dir="ltr">· Start Interview Now</span>
                  <ArrowRight size={24} strokeWidth={2.3} aria-hidden="true" />
                </button>
              </div>
            </form>
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
