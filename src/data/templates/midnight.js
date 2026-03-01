export var name = "Midnight";
export var defaultColors = { primary: "#FF6B4A", secondary: "#181824", tertiary: "#8e8da0" };

export var contentFields = [
  { key: "tagline", label: "Tagline", type: "text", placeholder: "One catchy sentence about your product" },
  { key: "heroHeading", label: "Hero Heading", type: "text", placeholder: "Bold attention-grabbing headline" },
  { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "Get Early Access" },
  { key: "ctaUrl", label: "Button Link URL", type: "text", placeholder: "https://yoursite.com/signup", skipGenerate: true },
  { key: "contactEmail", label: "Contact Email", type: "text", placeholder: "hello@yourbrand.com" },
  { key: "featureSectionHeading", label: "Features Heading", type: "text", placeholder: "Everything You Need" },
  { key: "featureLabel1", label: "Feature 1 Label", type: "text", placeholder: "Lightning Fast" },
  { key: "featureDesc1", label: "Feature 1 Description", type: "text", placeholder: "Description of feature one" },
  { key: "featureLabel2", label: "Feature 2 Label", type: "text", placeholder: "Rock Solid Security" },
  { key: "featureDesc2", label: "Feature 2 Description", type: "text", placeholder: "Description of feature two" },
  { key: "featureLabel3", label: "Feature 3 Label", type: "text", placeholder: "Team Collaboration" },
  { key: "featureDesc3", label: "Feature 3 Description", type: "text", placeholder: "Description of feature three" },
  { key: "socialProofText", label: "Social Proof Text", type: "text", placeholder: "Trusted by 10,000+ teams worldwide" },
  { key: "faqHeading", label: "FAQ Heading", type: "text", placeholder: "Frequently Asked Questions" },
  { key: "faqQuestion1", label: "FAQ Question 1", type: "text", placeholder: "How does it work?" },
  { key: "faqAnswer1", label: "FAQ Answer 1", type: "text", placeholder: "Answer to question one" },
  { key: "faqQuestion2", label: "FAQ Question 2", type: "text", placeholder: "Is there a free trial?" },
  { key: "faqAnswer2", label: "FAQ Answer 2", type: "text", placeholder: "Answer to question two" },
  { key: "faqQuestion3", label: "FAQ Question 3", type: "text", placeholder: "What support do you offer?" },
  { key: "faqAnswer3", label: "FAQ Answer 3", type: "text", placeholder: "Answer to question three" },
  { key: "ctaSectionHeading", label: "CTA Heading", type: "text", placeholder: "Ready to Get Started?" },
];

export var statFields = [];

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "featureAccentColorAssign", label: "Feature Accents", selector: ".feature-card" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

export var imageSlots = {
  hero: true,
  featureImages: 0,
  hasGallery: false,
  hasPortfolio: false,
};

export var sections = [
  { heading: "Hero", purpose: "Bold, high-contrast hero to create intrigue and urgency", fields: ["heroHeading", "tagline", "ctaText"] },
  { heading: "Features", purpose: "3 feature cards with concise labels and descriptions", fields: ["featureSectionHeading", "featureLabel1", "featureDesc1", "featureLabel2", "featureDesc2", "featureLabel3", "featureDesc3"] },
  { heading: "Social Proof", purpose: "A single trust-building statement with a metric or endorsement", fields: ["socialProofText"] },
  { heading: "FAQ", purpose: "3 frequently asked questions that address common visitor concerns", fields: ["faqHeading", "faqQuestion1", "faqAnswer1", "faqQuestion2", "faqAnswer2", "faqQuestion3", "faqAnswer3"] },
  { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
];

export var htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{brandName}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: {{colorPrimary}};
      --secondary: {{colorSecondary}};
      --tertiary: {{colorTertiary}};
      --btn-bg: {{btnBg}};
      --btn-text: {{btnText}};
      --feature-accent-bg: {{featureAccentBg}};
      --feature-accent-text: {{featureAccentText}};
      --footer-bg: {{footerBg}};
      --footer-text-bright: {{footerTextBright}};
      --footer-text-muted: {{footerTextMuted}};
      --bg: #0F172A;
      --bg-card: #1E293B;
      --text: #F1F5F9;
      --muted: #94A3B8;
      --radius: 0.75rem;
    }
    body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    img { display: block; max-width: 100%; height: auto; }
    a { text-decoration: none; color: inherit; }

    nav { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 5vw; position: sticky; top: 0; z-index: 50; background: rgba(15,23,42,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); }
    .nav-logo { font-weight: 700; font-size: 1.15rem; color: #fff; }
    .nav-logo-img { height: 34px; width: auto; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { font-size: 0.875rem; font-weight: 500; color: var(--muted); transition: color 0.2s; }
    .nav-links a:hover { color: #fff; }

    .hero { text-align: center; padding: 6rem 5vw 3rem; max-width: 800px; margin: 0 auto; }
    .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.25rem; }
    .hero p { font-size: 1.1rem; color: var(--muted); max-width: 560px; margin: 0 auto 2rem; line-height: 1.7; }
    .hero-img { border-radius: var(--radius); width: 100%; max-width: 700px; margin: 3rem auto 0; aspect-ratio: 16/9; object-fit: cover; background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); }

    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.95rem; border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; min-height: 44px; }
    .btn-primary { background: var(--btn-bg); color: var(--btn-text); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.3); }

    .features { padding: 5rem 5vw; }
    .features h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; text-align: center; margin-bottom: 3rem; }
    .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1000px; margin: 0 auto; }
    .feature-card { background: var(--bg-card); border-radius: var(--radius); padding: 2rem; border: 1px solid rgba(255,255,255,0.06); border-top: 3px solid var(--feature-accent-bg); }
    .feature-card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: #fff; }
    .feature-card p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }

    .social-proof { padding: 3rem 5vw; text-align: center; background: var(--bg-card); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
    .social-proof p { font-size: 1rem; font-weight: 600; color: var(--muted); letter-spacing: 0.02em; }

    .faq { padding: 5rem 5vw; max-width: 700px; margin: 0 auto; }
    .faq h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; text-align: center; margin-bottom: 3rem; }
    .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.5rem 0; }
    .faq-item h3 { font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem; }
    .faq-item p { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }

    .bottom-cta { padding: 6rem 5vw; text-align: center; background: var(--bg-card); border-radius: var(--radius) var(--radius) 0 0; margin: 0 2vw; }
    .bottom-cta h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; margin: 0 auto 1rem; max-width: 640px; }
    .bottom-cta p { color: var(--muted); max-width: 520px; margin: 0 auto 2rem; line-height: 1.7; }

    footer { background: var(--footer-bg); color: var(--footer-text-muted); padding: 3.5rem 5vw 2rem; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; }
    .footer-brand { max-width: 260px; }
    .footer-brand .logo { font-weight: 700; font-size: 1.15rem; color: var(--footer-text-bright); margin-bottom: 0.75rem; }
    .footer-logo-img { height: 28px; width: auto; margin-bottom: 0.75rem; }
    .footer-brand p { font-size: 0.8rem; line-height: 1.7; }
    .footer-links h4 { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--footer-text-bright); margin-bottom: 0.75rem; }
    .footer-links a { display: block; font-size: 0.8rem; margin-bottom: 0.4rem; transition: color 0.2s; }
    .footer-links a:hover { color: var(--footer-text-bright); }
    .footer-bottom { width: 100%; display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; margin-top: 1rem; font-size: 0.75rem; }

    @media (max-width: 768px) {
      .features-grid { grid-template-columns: 1fr; }
      .hero { padding: 4rem 5vw 2rem; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
    @media (max-width: 480px) {
      .nav-links { gap: 1rem; }
      .bottom-cta { padding: 4rem 5vw; margin: 0; }
    }
  </style>
</head>
<body>

  <nav>
    {{logoTag}}
    <div class="nav-links">
      <a href="#features">Features</a>
      <a href="#faq">FAQ</a>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Contact</a>
    </div>
  </nav>

  <section class="hero">
    <h1 data-field="heroHeading">{{heroHeading}}</h1>
    <p data-field="tagline">{{tagline}}</p>
    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>
    {{heroImageTag}}
  </section>

  <section class="features" id="features">
    <h2 data-field="featureSectionHeading">{{featureSectionHeading}}</h2>
    <div class="features-grid">
      <div class="feature-card">
        <h3 data-field="featureLabel1">{{featureLabel1}}</h3>
        <p data-field="featureDesc1">{{featureDesc1}}</p>
      </div>
      <div class="feature-card">
        <h3 data-field="featureLabel2">{{featureLabel2}}</h3>
        <p data-field="featureDesc2">{{featureDesc2}}</p>
      </div>
      <div class="feature-card">
        <h3 data-field="featureLabel3">{{featureLabel3}}</h3>
        <p data-field="featureDesc3">{{featureDesc3}}</p>
      </div>
    </div>
  </section>

  <section class="social-proof">
    <p data-field="socialProofText">{{socialProofText}}</p>
  </section>

  <section class="faq" id="faq">
    <h2 data-field="faqHeading">{{faqHeading}}</h2>
    <div class="faq-item">
      <h3 data-field="faqQuestion1">{{faqQuestion1}}</h3>
      <p data-field="faqAnswer1">{{faqAnswer1}}</p>
    </div>
    <div class="faq-item">
      <h3 data-field="faqQuestion2">{{faqQuestion2}}</h3>
      <p data-field="faqAnswer2">{{faqAnswer2}}</p>
    </div>
    <div class="faq-item">
      <h3 data-field="faqQuestion3">{{faqQuestion3}}</h3>
      <p data-field="faqAnswer3">{{faqAnswer3}}</p>
    </div>
  </section>

  <section class="bottom-cta">
    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>
    <p data-field="tagline">{{tagline}}</p>
    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>
  </section>

  <footer>
    <div class="footer-brand">
      {{footerLogoTag}}
      <p data-field="tagline">{{tagline}}</p>
    </div>
    <div class="footer-links">
      <h4>Product</h4>
      <a href="#features">Features</a>
      <a href="#faq">FAQ</a>
      <a href="#">Changelog</a>
    </div>
    <div class="footer-links">
      <h4>Connect</h4>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Email</a>
      <a href="#">Twitter</a>
      <a href="#">GitHub</a>
    </div>
    <div class="footer-links">
      <h4>Legal</h4>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </div>
    <div class="footer-bottom">
      <span>Privacy Policy &middot; Terms</span>
      <span>&copy; {{brandName}} 2025</span>
    </div>
  </footer>

</body>
</html>`;
