export var name = "Midnight";
export var defaultColors = { primary: "#FF6B4A", secondary: "#181824", tertiary: "#8e8da0" };

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "featureAccentColorAssign", label: "Feature Accents", selector: ".feature-card" },
  { key: "socialProofColorAssign", label: "Social Proof Bar", selector: ".social-proof", defaultAssign: "secondary" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

/* ── Shared HTML fragments ─────────────────────────────── */

var fontLinks =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

var sharedCss = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: {{colorPrimary}};
      --secondary: {{colorSecondary}};
      --tertiary: {{colorTertiary}};
      --btn-bg: {{btnBg}};
      --btn-text: {{btnText}};
      --feature-accent-bg: {{featureAccentBg}};
      --feature-accent-text: {{featureAccentText}};
      --social-proof-bg: {{socialProofBg}};
      --social-proof-text: {{socialProofText}};
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
    .nav-links a.nav-active { color: #fff; font-weight: 600; }

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

    .social-proof { padding: 3rem 5vw; text-align: center; background: var(--social-proof-bg); color: var(--social-proof-text); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
    .social-proof p { font-size: 1rem; font-weight: 600; color: var(--social-proof-text); letter-spacing: 0.02em; }

    .faq { padding: 5rem 5vw; max-width: 700px; margin: 0 auto; }
    .faq h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; text-align: center; margin-bottom: 3rem; }
    .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.5rem 0; }
    .faq-item h3 { font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem; }
    .faq-item p { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }

    .bottom-cta { padding: 6rem 5vw; text-align: center; background: var(--bg-card); border-radius: var(--radius) var(--radius) 0 0; margin: 0 2vw; }
    .bottom-cta h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; margin: 0 auto 1rem; max-width: 640px; }
    .bottom-cta p { color: var(--muted); max-width: 520px; margin: 0 auto 2rem; line-height: 1.7; }

    .page-hero { padding: 5rem 5vw 3rem; max-width: 860px; margin: 0 auto; text-align: center; }
    .page-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1rem; color: #fff; }
    .page-hero p { font-size: clamp(1rem, 1.5vw, 1.125rem); color: var(--muted); max-width: 560px; margin: 0 auto; line-height: 1.7; }

    .content-section { padding: 4rem 5vw; max-width: 860px; margin: 0 auto; }
    .content-section h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 700; margin-bottom: 1rem; color: #fff; }
    .content-section p { font-size: 1rem; color: var(--muted); line-height: 1.8; }

    .pricing { padding: 0 5vw 5rem; }
    .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1100px; margin: 0 auto; align-items: start; }
    .price-card { background: var(--bg-card); border-radius: var(--radius); padding: 2.5rem 2rem; border: 1px solid rgba(255,255,255,0.06); text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
    .price-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
    .price-card.featured { background: var(--feature-accent-bg); color: var(--feature-accent-text); border-color: transparent; transform: scale(1.05); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .price-card.featured:hover { transform: scale(1.05) translateY(-4px); }
    .price-card .tier-name { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; opacity: 0.8; }
    .price-card .tier-price { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.75rem; line-height: 1.1; }
    .price-card .tier-desc { font-size: 0.9rem; line-height: 1.6; opacity: 0.75; margin-bottom: 1.5rem; }
    .price-card .features { list-style: none; padding: 0; margin-bottom: 2rem; text-align: left; }
    .price-card .features li { font-size: 0.875rem; color: var(--muted); padding: 0.4rem 0; padding-left: 1.5rem; position: relative; }
    .price-card .features li::before { content: '\\2713'; position: absolute; left: 0; color: var(--feature-accent-bg); font-weight: 700; }
    .price-card.featured .features li { color: var(--feature-accent-text); opacity: 0.85; }
    .price-card.featured .features li::before { color: var(--feature-accent-text); }
    .price-card .btn { width: 100%; justify-content: center; }
    .price-card.featured .btn-primary { background: var(--feature-accent-text); color: var(--feature-accent-bg); }

    .contact-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; padding: 0 5vw 4rem; max-width: 900px; margin: 0 auto; }
    .contact-card { background: var(--bg-card); border-radius: var(--radius); padding: 2rem; text-align: center; border: 1px solid rgba(255,255,255,0.06); }
    .contact-card .contact-icon { width: 48px; height: 48px; border-radius: 50%; background: var(--btn-bg); color: var(--btn-text); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.2rem; }
    .contact-card h3 { font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem; }
    .contact-card p, .contact-card a { font-size: 0.875rem; color: var(--muted); line-height: 1.6; }
    .contact-card a:hover { color: #fff; }

    .contact-social { display: flex; justify-content: center; gap: 1rem; padding: 0 5vw 4rem; max-width: 900px; margin: 0 auto; }
    .contact-social a { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 1.2rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; color: var(--muted); border: 1px solid rgba(255,255,255,0.1); transition: border-color 0.2s, color 0.2s; }
    .contact-social a:hover { border-color: var(--btn-bg); color: #fff; }

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
      .pricing-grid { grid-template-columns: 1fr; }
      .price-card.featured { transform: none; }
      .price-card.featured:hover { transform: translateY(-4px); }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
    @media (max-width: 480px) {
      .nav-links { gap: 1rem; }
      .bottom-cta { padding: 4rem 5vw; margin: 0; }
      .page-hero { padding: 3rem 4vw 2rem; }
      .content-section { padding: 2rem 4vw; }
      .contact-cards { padding: 0 4vw 3rem; }
      .contact-social { padding: 0 4vw 3rem; }
    }
`;

var navHtml =
  '<nav>\n' +
  '    {{logoTag}}\n' +
  '    <div class="nav-links">\n' +
  '      {{navLinks}}\n' +
  '    </div>\n' +
  '  </nav>';

var footerHtml =
  '<footer>\n' +
  '    <div class="footer-brand">\n' +
  '      {{footerLogoTag}}\n' +
  '      <p data-field="tagline">{{tagline}}</p>\n' +
  '    </div>\n' +
  '    <div class="footer-links">\n' +
  '      <h4>Company</h4>\n' +
  '      {{footerNavLinks}}\n' +
  '    </div>\n' +
  '    <div class="footer-links">\n' +
  '      <h4>Connect</h4>\n' +
  '      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Email</a>\n' +
  '      <a href="#">Twitter</a>\n' +
  '      <a href="#">GitHub</a>\n' +
  '    </div>\n' +
  '    <div class="footer-links">\n' +
  '      <h4>Legal</h4>\n' +
  '      <a href="#">Privacy</a>\n' +
  '      <a href="#">Terms</a>\n' +
  '    </div>\n' +
  '    <div class="footer-bottom">\n' +
  '      <span>Privacy Policy &middot; Terms</span>\n' +
  '      <span>&copy; {{brandName}} 2025</span>\n' +
  '    </div>\n' +
  '  </footer>';

function makePage(bodyHtml, extraCss) {
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    '  <title>{{brandName}}</title>\n' +
    '  ' + fontLinks + '\n' +
    '  <style>' + sharedCss + (extraCss || '') + '\n  </style>\n' +
    '</head>\n<body>\n\n  ' +
    navHtml + '\n\n' +
    bodyHtml + '\n\n  ' +
    footerHtml + '\n\n</body>\n</html>';
}

export var customPageShell = makePage('  {{customPageContent}}');

/* ── Page definitions ──────────────────────────────────── */

var homePage = {
  id: "home",
  title: "Home",
  filename: "index.html",
  contentFields: [
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
  ],
  statFields: [],
  sections: [
    { heading: "Hero", purpose: "Bold, high-contrast hero to create intrigue and urgency", fields: ["heroHeading", "tagline", "ctaText"] },
    { heading: "Features", purpose: "3 feature cards with concise labels and descriptions", fields: ["featureSectionHeading", "featureLabel1", "featureDesc1", "featureLabel2", "featureDesc2", "featureLabel3", "featureDesc3"] },
    { heading: "Social Proof", purpose: "A single trust-building statement with a metric or endorsement", fields: ["socialProofText"] },
    { heading: "FAQ", purpose: "3 frequently asked questions that address common visitor concerns", fields: ["faqHeading", "faqQuestion1", "faqAnswer1", "faqQuestion2", "faqAnswer2", "faqQuestion3", "faqAnswer3"] },
    { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
  ],
  imageSlots: { hero: true, featureImages: 0, hasGallery: false, hasPortfolio: false },
  htmlTemplate: makePage(
    '  <section class="hero">\n' +
    '    <h1 data-field="heroHeading">{{heroHeading}}</h1>\n' +
    '    <p data-field="tagline">{{tagline}}</p>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '    {{heroImageTag}}\n' +
    '  </section>\n\n' +
    '  <section class="features" id="features">\n' +
    '    <h2 data-field="featureSectionHeading">{{featureSectionHeading}}</h2>\n' +
    '    <div class="features-grid">\n' +
    '      <div class="feature-card">\n' +
    '        <h3 data-field="featureLabel1">{{featureLabel1}}</h3>\n' +
    '        <p data-field="featureDesc1">{{featureDesc1}}</p>\n' +
    '      </div>\n' +
    '      <div class="feature-card">\n' +
    '        <h3 data-field="featureLabel2">{{featureLabel2}}</h3>\n' +
    '        <p data-field="featureDesc2">{{featureDesc2}}</p>\n' +
    '      </div>\n' +
    '      <div class="feature-card">\n' +
    '        <h3 data-field="featureLabel3">{{featureLabel3}}</h3>\n' +
    '        <p data-field="featureDesc3">{{featureDesc3}}</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n\n' +
    '  <section class="social-proof">\n' +
    '    <p data-field="socialProofText">{{socialProofText}}</p>\n' +
    '  </section>\n\n' +
    '  <section class="faq" id="faq">\n' +
    '    <h2 data-field="faqHeading">{{faqHeading}}</h2>\n' +
    '    <div class="faq-item">\n' +
    '      <h3 data-field="faqQuestion1">{{faqQuestion1}}</h3>\n' +
    '      <p data-field="faqAnswer1">{{faqAnswer1}}</p>\n' +
    '    </div>\n' +
    '    <div class="faq-item">\n' +
    '      <h3 data-field="faqQuestion2">{{faqQuestion2}}</h3>\n' +
    '      <p data-field="faqAnswer2">{{faqAnswer2}}</p>\n' +
    '    </div>\n' +
    '    <div class="faq-item">\n' +
    '      <h3 data-field="faqQuestion3">{{faqQuestion3}}</h3>\n' +
    '      <p data-field="faqAnswer3">{{faqAnswer3}}</p>\n' +
    '    </div>\n' +
    '  </section>\n\n' +
    '  <section class="bottom-cta">\n' +
    '    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>\n' +
    '    <p data-field="tagline">{{tagline}}</p>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '  </section>'
  ),
};

var pricingPage = {
  id: "pricing",
  title: "Pricing",
  filename: "pricing.html",
  contentFields: [
    { key: "pricingPageHeading", label: "Pricing Heading", type: "text", placeholder: "Simple, Transparent Pricing" },
    { key: "pricingPageSubheading", label: "Pricing Subheading", type: "text", placeholder: "Choose the plan that works for you" },
    { key: "priceTier1Name", label: "Tier 1 Name", type: "text", placeholder: "Starter" },
    { key: "priceTier1Price", label: "Tier 1 Price", type: "text", placeholder: "$9/mo" },
    { key: "priceTier1Desc", label: "Tier 1 Description", type: "text", placeholder: "For individuals getting started" },
    { key: "priceTier1Feature1", label: "Tier 1 Feature 1", type: "text", placeholder: "1 user" },
    { key: "priceTier1Feature2", label: "Tier 1 Feature 2", type: "text", placeholder: "Basic analytics" },
    { key: "priceTier1Feature3", label: "Tier 1 Feature 3", type: "text", placeholder: "Email support" },
    { key: "priceTier2Name", label: "Tier 2 Name", type: "text", placeholder: "Pro" },
    { key: "priceTier2Price", label: "Tier 2 Price", type: "text", placeholder: "$29/mo" },
    { key: "priceTier2Desc", label: "Tier 2 Description", type: "text", placeholder: "For growing teams" },
    { key: "priceTier2Feature1", label: "Tier 2 Feature 1", type: "text", placeholder: "10 users" },
    { key: "priceTier2Feature2", label: "Tier 2 Feature 2", type: "text", placeholder: "Advanced analytics" },
    { key: "priceTier2Feature3", label: "Tier 2 Feature 3", type: "text", placeholder: "Priority support" },
    { key: "priceTier3Name", label: "Tier 3 Name", type: "text", placeholder: "Enterprise" },
    { key: "priceTier3Price", label: "Tier 3 Price", type: "text", placeholder: "Custom" },
    { key: "priceTier3Desc", label: "Tier 3 Description", type: "text", placeholder: "For large organizations" },
    { key: "priceTier3Feature1", label: "Tier 3 Feature 1", type: "text", placeholder: "Unlimited users" },
    { key: "priceTier3Feature2", label: "Tier 3 Feature 2", type: "text", placeholder: "Custom integrations" },
    { key: "priceTier3Feature3", label: "Tier 3 Feature 3", type: "text", placeholder: "Dedicated account manager" },
  ],
  statFields: [],
  sections: [
    { heading: "Pricing", purpose: "3 pricing tiers from basic to enterprise with feature lists", fields: ["pricingPageHeading", "pricingPageSubheading", "priceTier1Name", "priceTier1Price", "priceTier1Desc", "priceTier1Feature1", "priceTier1Feature2", "priceTier1Feature3", "priceTier2Name", "priceTier2Price", "priceTier2Desc", "priceTier2Feature1", "priceTier2Feature2", "priceTier2Feature3", "priceTier3Name", "priceTier3Price", "priceTier3Desc", "priceTier3Feature1", "priceTier3Feature2", "priceTier3Feature3"] },
  ],
  imageSlots: {},
  htmlTemplate: makePage(
    '  <section class="page-hero">\n' +
    '    <h1 data-field="pricingPageHeading">{{pricingPageHeading}}</h1>\n' +
    '    <p data-field="pricingPageSubheading">{{pricingPageSubheading}}</p>\n' +
    '  </section>\n\n' +
    '  <section class="pricing">\n' +
    '    <div class="pricing-grid">\n' +
    '      <div class="price-card">\n' +
    '        <div class="tier-name" data-field="priceTier1Name">{{priceTier1Name}}</div>\n' +
    '        <div class="tier-price" data-field="priceTier1Price">{{priceTier1Price}}</div>\n' +
    '        <div class="tier-desc" data-field="priceTier1Desc">{{priceTier1Desc}}</div>\n' +
    '        <ul class="features">\n' +
    '          <li data-field="priceTier1Feature1">{{priceTier1Feature1}}</li>\n' +
    '          <li data-field="priceTier1Feature2">{{priceTier1Feature2}}</li>\n' +
    '          <li data-field="priceTier1Feature3">{{priceTier1Feature3}}</li>\n' +
    '        </ul>\n' +
    '        <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '      </div>\n' +
    '      <div class="price-card featured">\n' +
    '        <div class="tier-name" data-field="priceTier2Name">{{priceTier2Name}}</div>\n' +
    '        <div class="tier-price" data-field="priceTier2Price">{{priceTier2Price}}</div>\n' +
    '        <div class="tier-desc" data-field="priceTier2Desc">{{priceTier2Desc}}</div>\n' +
    '        <ul class="features">\n' +
    '          <li data-field="priceTier2Feature1">{{priceTier2Feature1}}</li>\n' +
    '          <li data-field="priceTier2Feature2">{{priceTier2Feature2}}</li>\n' +
    '          <li data-field="priceTier2Feature3">{{priceTier2Feature3}}</li>\n' +
    '        </ul>\n' +
    '        <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '      </div>\n' +
    '      <div class="price-card">\n' +
    '        <div class="tier-name" data-field="priceTier3Name">{{priceTier3Name}}</div>\n' +
    '        <div class="tier-price" data-field="priceTier3Price">{{priceTier3Price}}</div>\n' +
    '        <div class="tier-desc" data-field="priceTier3Desc">{{priceTier3Desc}}</div>\n' +
    '        <ul class="features">\n' +
    '          <li data-field="priceTier3Feature1">{{priceTier3Feature1}}</li>\n' +
    '          <li data-field="priceTier3Feature2">{{priceTier3Feature2}}</li>\n' +
    '          <li data-field="priceTier3Feature3">{{priceTier3Feature3}}</li>\n' +
    '        </ul>\n' +
    '        <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n\n' +
    '  <section class="bottom-cta">\n' +
    '    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>\n' +
    '    <p data-field="tagline">{{tagline}}</p>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '  </section>'
  ),
};

var contactPage = {
  id: "contact",
  title: "Contact",
  filename: "contact.html",
  contentFields: [
    { key: "contactPageHeading", label: "Contact Heading", type: "text", placeholder: "Get In Touch" },
    { key: "contactPageSubheading", label: "Contact Subheading", type: "text", placeholder: "We'd love to hear from you" },
  ],
  statFields: [],
  sections: [
    { heading: "Contact Header", purpose: "Warm, inviting heading for the contact page", fields: ["contactPageHeading", "contactPageSubheading"] },
  ],
  imageSlots: {},
  htmlTemplate: makePage(
    '  <section class="page-hero">\n' +
    '    <h1 data-field="contactPageHeading">{{contactPageHeading}}</h1>\n' +
    '    <p data-field="contactPageSubheading">{{contactPageSubheading}}</p>\n' +
    '  </section>\n\n' +
    '  <div class="contact-cards">\n' +
    '    <div class="contact-card">\n' +
    '      <div class="contact-icon">&#9993;</div>\n' +
    '      <h3>Email</h3>\n' +
    '      <a href="mailto:{{contactEmail}}" data-field="contactEmail">{{contactEmail}}</a>\n' +
    '    </div>\n' +
    '    <div class="contact-card">\n' +
    '      <div class="contact-icon">&#9742;</div>\n' +
    '      <h3>Phone</h3>\n' +
    '      <p data-field="contactPhone">{{contactPhone}}</p>\n' +
    '    </div>\n' +
    '  </div>\n\n' +
    '  <div class="contact-social">\n' +
    '    {{socialInstagram}}\n' +
    '    {{socialFacebook}}\n' +
    '    {{socialLinkedin}}\n' +
    '  </div>\n\n' +
    '  <section class="bottom-cta">\n' +
    '    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '  </section>'
  ),
};

/* ── Exports ───────────────────────────────────────────── */

export var pages = [homePage, pricingPage, contactPage];

export var contentFields = [].concat(homePage.contentFields, pricingPage.contentFields, contactPage.contentFields);
export var statFields = [];
export var sections = [].concat(homePage.sections, pricingPage.sections, contactPage.sections);
export var imageSlots = homePage.imageSlots;
