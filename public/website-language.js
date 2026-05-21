(function () {
  const language = window.localStorage.getItem("websiteLanguage");

  if (language !== "en") return;

  const replacements = new Map([
    ["مدرب المقابلات", "Interview Coach"],
    ["الرئيسية", "Home"],
    ["المميزات", "Features"],
    ["الأسعار", "Pricing"],
    ["تسجيل الدخول", "Sign In"],
    ["ابدأ مجانا", "Start Free"],
    ["ابدأ مجاناً", "Start Free"],
    ["ابدأ الآن", "Start Now"],
    ["ابدأ المقابلة", "Start Interview"],
    ["شوف كيف يشتغل", "See how it works"],
    ["الخصوصية", "Privacy"],
    ["الشروط", "Terms"],
    ["اتصل بنا", "Contact"],
    ["تواصل معنا", "Contact Us"],
    ["سجل الآن", "Sign Up"],
    ["تحميل", "Download"],
    ["اختر خطتك وابدأ التدريب", "Choose your plan and start practicing"],
    ["ابدأ تجربة ٣ أيام مجانية", "Start your 3-day free trial"],
    ["ليش تشترك؟", "Why subscribe?"],
    ["لماذا تختار باقة برو؟", "Why choose Pro?"],
    ["جاهز لتجربة أول مقابلة؟", "Ready to try your first interview?"],
    ["كيف يعمل", "How it works"],
    ["مميزات مدرب المقابلات", "Interview Coach Features"],
    ["هل أنت مستعد لمقابلتك القادمة؟", "Ready for your next interview?"],
    ["ابدأ الآن وجرب مقابلة تجريبية مجانية مع مدربنا الذكي.", "Start now and try a free mock interview with our AI coach."],
    ["ابدأ الآن وجرب مقابلة تجريبية مجانية تماماً مع مدربنا الذكي وطوّر مهاراتك اليوم.", "Start now with a free mock interview and improve your skills today."],
    ["جميع الحقوق محفوظة.", "All rights reserved."],
    ["شهري", "Monthly"],
    ["سنوي", "Yearly"],
    ["وفر 20%", "Save 20%"],
    ["تجربة ٣ أيام مجانية", "3-day free trial"],
    ["/ ريال", "/ SAR"],
    ["/ ريال شهرياً", "/ SAR monthly"],
    ["مقابلة تجريبية واحدة", "One mock interview"],
    ["تقييم أساسي للأداء", "Basic performance evaluation"],
    ["الأكثر شيوعاً", "Most popular"],
    ["الاحترافي", "Professional"],
    ["مقابلات غير محدودة", "Unlimited interviews"],
    ["تقارير ذكاء اصطناعي مفصلة", "Detailed AI reports"],
    ["مخططات الكفاءة (Radar Charts)", "Competency radar charts"],
    ["دعم فني متميز", "Premium support"],
    ["للشركات والجامعات", "For companies and universities"],
    ["حلول مخصصة", "Custom solutions"],
    ["لوحة تحكم للإدارة", "Admin dashboard"],
    ["تحليلات الأداء الجماعي", "Group performance analytics"],
    ["تكامل مع الأنظمة الحالية (API)", "Integration with existing systems (API)"],
    ["تحليل المهارات المتقدم", "Advanced skill analysis"],
    ["تقارير تعتمد على رؤية ٢٠٣٠ لقياس مهارات التواصل والقيادة.", "Reports aligned with Vision 2030 skill expectations for communication and leadership."],
    ["شهادة إتمام", "Completion certificate"],
    ["نقدم لك شهادة رقمية تثبت جاهزيتك للمقابلة.", "Receive a digital certificate that shows your interview readiness."],
    ["نسبة نجاح المشتركين في تجاوز المقابلات الحقيقية.", "Subscriber success rate in passing real interviews."],
    ["أهلاً بك مجدداً في مدرب المقابلات", "Welcome back to Interview Coach"],
    ["البريد الإلكتروني", "Email"],
    ["كلمة المرور", "Password"],
    ["هل نسيت كلمة المرور؟", "Forgot password?"],
    ["دخول", "Login"],
    ["أو", "Or"],
    ["المتابعة باستخدام جوجل", "Continue with Google"],
    ["ليس لديك حساب؟", "Don't have an account?"],
    ["لا يتطلب بطاقة ائتمان", "No credit card required"],
    ["الاسم الكامل", "Full Name"],
    ["بالتسجيل، فإنك توافق على", "By signing up, you agree to"],
    ["الشروط والأحكام", "Terms and Conditions"],
    ["تدريب غير محدود", "Unlimited practice"],
    ["تمرّن على مئات السيناريوهات المختلفة في أي وقت.", "Practice hundreds of different scenarios anytime."],
    ["ذكاء اصطناعي فوري", "Instant AI feedback"],
    ["احصل على ملاحظات فورية على لغة جسدك ونبرة صوتك.", "Get instant feedback on your delivery and answer quality."],
    ["تقارير احترافية", "Professional reports"],
    ["تمكين الكفاءات السعودية لمستقبل ٢٠٣٠", "Empowering Saudi talent for Vision 2030."],
    ["كيف يعمل مدرب المقابلات؟", "How does Interview Coach work?"],
    ["رحلتك نحو الوظيفة الحلم في ٣ خطوات بسيطة.", "Your path to your dream job in 3 simple steps."],
    ["١. جهّز جلستك", "1. Set up your session"],
    ["اختر الشركة المستهدفة، المسار الوظيفي، وتخصصك الدقيق.", "Choose your target company, role track, and field specialization."],
    ["٢. خض المقابلة", "2. Take the interview"],
    ["مقابلة نصية تفاعلية مع ذكاء اصطناعي يحاكي مسؤولي التوظيف في كبرى الشركات السعودية.", "A text-based AI mock interview that simulates recruiters at major Saudi companies."],
    ["٣. احصل على تقييمك", "3. Get your evaluation"],
    ["تقرير مفصل يوضح نقاط قوتك، مجالات التحسين، وإجابة نموذجية مقترحة.", "A detailed report showing strengths, improvement areas, and a suggested model answer."],
    ["الشركة المستهدفة", "Target Company"],
    ["المسار الوظيفي", "Role Track"],
    ["لغة المقابلة", "Interview Language"],
    ["الاسم الأول", "First Name"],
    ["جهّز مقابلتك", "Set up your interview"],
    ["الاسم مطلوب للمتابعة", "First name is required"],
  ]);

  function toEnglish(text) {
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!normalized) return text;

    if (replacements.has(normalized)) return preserveSpacing(text, replacements.get(normalized));

    const pipeParts = normalized.split(/\s*[|]\s*/);
    if (pipeParts.length > 1) return preserveSpacing(text, pipeParts[pipeParts.length - 1]);

    const slashParts = normalized.split(/\s+\/\s+/);
    if (slashParts.length > 1) return preserveSpacing(text, slashParts[slashParts.length - 1]);

    const dotParts = normalized.split(/\s*·\s*/);
    if (dotParts.length > 1 && /[A-Za-z]/.test(dotParts[dotParts.length - 1])) {
      return preserveSpacing(text, dotParts[dotParts.length - 1]);
    }

    return text;
  }

  function preserveSpacing(original, replacement) {
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${replacement}${trailing}`;
  }

  function translateTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      node.nodeValue = toEnglish(node.nodeValue || "");
    });
  }

  function translateMetadata() {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.body?.setAttribute("dir", "ltr");
    document.title = toEnglish(document.title);

    document.querySelectorAll("[aria-label], [placeholder], [title]").forEach((element) => {
      ["aria-label", "placeholder", "title"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value) element.setAttribute(attribute, toEnglish(value));
      });
    });
  }

  function applyWebsiteLanguage() {
    translateMetadata();
    translateTextNodes(document.body);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyWebsiteLanguage);
  } else {
    applyWebsiteLanguage();
  }
})();
