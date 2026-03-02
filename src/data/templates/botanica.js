export var name = "Botanica";
export var defaultColors = { primary: "#8B7355", secondary: "#2D3727", tertiary: "#9CAF88" };

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "benefitAccentColorAssign", label: "Benefit Cards", selector: ".benefit-card" },
  { key: "testimonialColorAssign", label: "Testimonial Section", selector: ".testimonial", defaultAssign: "secondary" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

/* ── Shared HTML fragments ─────────────────────────────── */

var fontLinks =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';

var sharedCss = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: {{colorPrimary}};
      --secondary: {{colorSecondary}};
      --tertiary: {{colorTertiary}};
      --btn-bg: {{btnBg}};
      --btn-text: {{btnText}};
      --benefit-accent-bg: {{benefitAccentBg}};
      --benefit-accent-text: {{benefitAccentText}};
      --testimonial-bg: {{testimonialBg}};
      --testimonial-text: {{testimonialText}};
      --footer-bg: {{footerBg}};
      --footer-text-bright: {{footerTextBright}};
      --footer-text-muted: {{footerTextMuted}};
      --bg: #FAF7F2;
      --bg-card: #FFFFFF;
      --text: #2D3727;
      --muted: #7A7A6D;
      --radius: 0.75rem;
    }
    body { font-family: 'DM Sans', system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    img { display: block; max-width: 100%; height: auto; }
    a { text-decoration: none; color: inherit; }

    /* ── NAV ─────────────────────────────────── */
    nav { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 5vw; position: sticky; top: 0; z-index: 50; background: rgba(250,247,242,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(0,0,0,0.06); }
    .nav-logo { font-weight: 700; font-size: 1.15rem; letter-spacing: -0.02em; }
    .nav-logo-img { height: 34px; width: auto; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { font-size: 0.875rem; font-weight: 500; color: var(--muted); transition: color 0.2s; }
    .nav-links a:hover { color: var(--text); }
    .nav-links a.nav-active { color: var(--text); font-weight: 600; }

    /* ── HERO ────────────────────────────────── */
    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; padding: 5rem 5vw 4rem; min-height: 80vh; }
    .hero-text h1 { font-size: clamp(2.5rem, 5vw, 3.75rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.25rem; }
    .hero-text p { font-size: 1.05rem; color: var(--muted); max-width: 480px; line-height: 1.7; margin-bottom: 2rem; }
    .hero-img { border-radius: var(--radius); width: 100%; aspect-ratio: 4/3; object-fit: cover; background: linear-gradient(135deg, var(--bg-card), #e8e4db); }

    /* ── CTA BUTTON ──────────────────────────── */
    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.95rem; border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; min-height: 44px; }
    .btn-primary { background: var(--btn-bg); color: var(--btn-text); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.10); }

    /* ── BENEFITS ─────────────────────────────── */
    .benefits { padding: 5rem 5vw; }
    .benefits h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; letter-spacing: -0.02em; text-align: center; margin-bottom: 3rem; }
    .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .benefit-card { background: var(--bg-card); border-radius: var(--radius); padding: 2rem; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 12px rgba(0,0,0,0.04); border-top: 3px solid var(--benefit-accent-bg); }
    .benefit-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text); }
    .benefit-card p { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }

    /* ── TESTIMONIAL ─────────────────────────── */
    .testimonial { padding: 5rem 5vw; max-width: 800px; margin: 0 auto; text-align: center; background: var(--testimonial-bg); color: var(--testimonial-text); border-radius: var(--radius); }
    .testimonial blockquote { font-size: 1.25rem; font-style: italic; line-height: 1.8; color: var(--testimonial-text); margin-bottom: 1.5rem; }
    .testimonial .author { font-weight: 700; font-size: 0.95rem; color: var(--testimonial-text); }
    .testimonial .role { font-size: 0.8rem; color: var(--testimonial-text); opacity: 0.7; margin-top: 0.25rem; }

    /* ── STATS ────────────────────────────────── */
    .stats { padding: 3rem 5vw; display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); }
    .stat { text-align: center; }
    .stat .number { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.02em; color: var(--secondary); }
    .stat .label { font-size: 0.75rem; color: var(--muted); margin-top: 0.15rem; }

    /* ── BOTTOM CTA ──────────────────────────── */
    .bottom-cta { padding: 6rem 5vw; text-align: center; background: var(--bg-card); border-radius: var(--radius) var(--radius) 0 0; margin: 0 2vw; }
    .bottom-cta h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.03em; max-width: 640px; margin: 0 auto 1rem; }
    .bottom-cta p { color: var(--muted); max-width: 520px; margin: 0 auto 2rem; line-height: 1.7; }

    /* ── PAGE HERO (inner pages) ─────────────── */
    .page-hero {
      padding: 5rem 5vw 3rem;
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
    }
    .page-hero h1 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      color: var(--text);
    }
    .page-hero p {
      font-size: clamp(1rem, 1.5vw, 1.125rem);
      color: var(--muted);
      max-width: 560px;
      margin: 0 auto;
      line-height: 1.7;
    }

    /* ── CONTENT SECTIONS (inner pages) ──────── */
    .content-section {
      padding: 4rem 5vw;
      max-width: 860px;
      margin: 0 auto;
    }
    .content-section h2 {
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      color: var(--text);
    }
    .content-section p {
      font-size: 1rem;
      color: var(--muted);
      line-height: 1.8;
    }

    /* ── VALUES GRID (about page) ────────────── */
    .values-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      padding: 0 5vw 4rem;
      max-width: 1100px;
      margin: 0 auto;
    }
    .value-card {
      background: var(--bg-card);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.06);
      border-top: 3px solid var(--benefit-accent-bg);
    }
    .value-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    .value-card p {
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.7;
    }

    /* ── CONTACT CARDS ───────────────────────── */
    .contact-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 0 5vw 4rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .contact-card {
      background: var(--bg-card);
      border-radius: var(--radius);
      padding: 2rem;
      text-align: center;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.06);
    }
    .contact-card .contact-icon {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: var(--btn-bg);
      color: var(--btn-text);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
    .contact-card h3 {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.4rem;
    }
    .contact-card p, .contact-card a {
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.6;
    }
    .contact-card a:hover { color: var(--text); }

    .contact-social {
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 0 5vw 4rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .contact-social a {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.6rem 1.2rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--muted);
      border: 1px solid rgba(0,0,0,0.1);
      transition: border-color 0.2s, color 0.2s;
    }
    .contact-social a:hover { border-color: var(--btn-bg); color: var(--text); }

    /* ── FOOTER ───────────────────────────────── */
    footer { background: var(--footer-bg); color: var(--footer-text-muted); padding: 3.5rem 5vw 2rem; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; }
    .footer-brand { max-width: 260px; }
    .footer-brand .logo { font-weight: 700; font-size: 1.15rem; color: var(--footer-text-bright); margin-bottom: 0.75rem; }
    .footer-logo-img { height: 28px; width: auto; margin-bottom: 0.75rem; }
    .footer-brand p { font-size: 0.8rem; line-height: 1.7; }
    .footer-links h4 { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--footer-text-bright); margin-bottom: 0.75rem; }
    .footer-links a { display: block; font-size: 0.8rem; margin-bottom: 0.4rem; transition: color 0.2s; }
    .footer-links a:hover { color: var(--footer-text-bright); }
    .footer-bottom { width: 100%; display: flex; justify-content: space-between; border-top: 1px solid rgba(128,128,128,0.15); padding-top: 1.5rem; margin-top: 1rem; font-size: 0.75rem; }

    /* ── RESPONSIVE ───────────────────────────── */
    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; text-align: center; padding-top: 3rem; }
      .hero-text { order: 2; }
      .hero-text p { margin: 0 auto 2rem; }
      .hero-img { order: 1; }
      .benefits-grid { grid-template-columns: 1fr; }
      .stats { gap: 2rem; }
      .values-grid { grid-template-columns: 1fr; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
    @media (max-width: 480px) {
      .nav-links { gap: 1rem; }
      .hero { padding: 3rem 5vw 2rem; }
      .benefits { padding: 3rem 5vw; }
      .bottom-cta { padding: 4rem 5vw; margin: 0; }
      .page-hero { padding: 3rem 4vw 2rem; }
      .content-section { padding: 2rem 4vw; }
      .values-grid { padding: 0 4vw 3rem; }
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
  '      <a href="#">Newsletter</a>\n' +
  '    </div>\n' +
  '    <div class="footer-bottom">\n' +
  '      <span>Privacy Policy &middot; Terms</span>\n' +
  '      <span>All rights reserved &copy; {{brandName}} 2025</span>\n' +
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
    { key: "tagline", label: "Tagline", type: "text", placeholder: "One catchy sentence about your brand" },
    { key: "heroHeading", label: "Hero Heading", type: "text", placeholder: "Bold attention-grabbing headline" },
    { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "Shop Now" },
    { key: "ctaUrl", label: "Button Link URL", type: "text", placeholder: "https://yoursite.com/shop", skipGenerate: true },
    { key: "contactEmail", label: "Contact Email", type: "text", placeholder: "hello@yourbrand.com" },
    { key: "benefitHeading", label: "Benefits Heading", type: "text", placeholder: "Why Choose Us" },
    { key: "benefitTitle1", label: "Benefit 1 Title", type: "text", placeholder: "100% Natural" },
    { key: "benefitDesc1", label: "Benefit 1 Description", type: "text", placeholder: "Description of benefit one" },
    { key: "benefitTitle2", label: "Benefit 2 Title", type: "text", placeholder: "Sustainably Sourced" },
    { key: "benefitDesc2", label: "Benefit 2 Description", type: "text", placeholder: "Description of benefit two" },
    { key: "benefitTitle3", label: "Benefit 3 Title", type: "text", placeholder: "Handcrafted Quality" },
    { key: "benefitDesc3", label: "Benefit 3 Description", type: "text", placeholder: "Description of benefit three" },
    { key: "testimonialQuote", label: "Testimonial Quote", type: "textarea", placeholder: "A glowing review from a customer" },
    { key: "testimonialAuthor", label: "Testimonial Author", type: "text", placeholder: "Jane Doe" },
    { key: "testimonialRole", label: "Testimonial Role", type: "text", placeholder: "Loyal Customer" },
    { key: "ctaSectionHeading", label: "CTA Heading", type: "text", placeholder: "Ready to Experience the Difference?" },
  ],
  statFields: [
    { numKey: "stat1Number", labelKey: "stat1Label", numPh: "10K+", labelPh: "Happy Customers" },
    { numKey: "stat2Number", labelKey: "stat2Label", numPh: "50+", labelPh: "Product Varieties" },
    { numKey: "stat3Number", labelKey: "stat3Label", numPh: "100%", labelPh: "Organic Ingredients" },
  ],
  sections: [
    { heading: "Hero", purpose: "Warm, inviting introduction with the brand promise", fields: ["heroHeading", "tagline", "ctaText"] },
    { heading: "Benefits", purpose: "3 key benefits or unique selling points", fields: ["benefitHeading", "benefitTitle1", "benefitDesc1", "benefitTitle2", "benefitDesc2", "benefitTitle3", "benefitDesc3"] },
    { heading: "Testimonial", purpose: "A customer testimonial that builds trust and authenticity", fields: ["testimonialQuote", "testimonialAuthor", "testimonialRole"] },
    { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
  ],
  imageSlots: {
    hero: true,
    featureImages: 0,
    hasGallery: false,
    hasPortfolio: false,
  },
  htmlTemplate: makePage(
    '  <!-- HERO -->\n' +
    '  <section class="hero">\n' +
    '    {{heroImageTag}}\n' +
    '    <div class="hero-text">\n' +
    '      <h1 data-field="heroHeading">{{heroHeading}}</h1>\n' +
    '      <p data-field="tagline">{{tagline}}</p>\n' +
    '      <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '    </div>\n' +
    '  </section>\n\n' +

    '  <!-- BENEFITS -->\n' +
    '  <section class="benefits" id="benefits">\n' +
    '    <h2 data-field="benefitHeading">{{benefitHeading}}</h2>\n' +
    '    <div class="benefits-grid">\n' +
    '      <div class="benefit-card">\n' +
    '        <h3 data-field="benefitTitle1">{{benefitTitle1}}</h3>\n' +
    '        <p data-field="benefitDesc1">{{benefitDesc1}}</p>\n' +
    '      </div>\n' +
    '      <div class="benefit-card">\n' +
    '        <h3 data-field="benefitTitle2">{{benefitTitle2}}</h3>\n' +
    '        <p data-field="benefitDesc2">{{benefitDesc2}}</p>\n' +
    '      </div>\n' +
    '      <div class="benefit-card">\n' +
    '        <h3 data-field="benefitTitle3">{{benefitTitle3}}</h3>\n' +
    '        <p data-field="benefitDesc3">{{benefitDesc3}}</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n\n' +

    '  <!-- TESTIMONIAL -->\n' +
    '  <section class="testimonial" id="testimonial">\n' +
    '    <blockquote data-field="testimonialQuote">&ldquo;{{testimonialQuote}}&rdquo;</blockquote>\n' +
    '    <div class="author" data-field="testimonialAuthor">{{testimonialAuthor}}</div>\n' +
    '    <div class="role" data-field="testimonialRole">{{testimonialRole}}</div>\n' +
    '  </section>\n\n' +

    '  <!-- STATS -->\n' +
    '  <div class="stats">\n' +
    '    <div class="stat">\n' +
    '      <div class="number" data-field="stat1Number">{{stat1Number}}</div>\n' +
    '      <div class="label" data-field="stat1Label">{{stat1Label}}</div>\n' +
    '    </div>\n' +
    '    <div class="stat">\n' +
    '      <div class="number" data-field="stat2Number">{{stat2Number}}</div>\n' +
    '      <div class="label" data-field="stat2Label">{{stat2Label}}</div>\n' +
    '    </div>\n' +
    '    <div class="stat">\n' +
    '      <div class="number" data-field="stat3Number">{{stat3Number}}</div>\n' +
    '      <div class="label" data-field="stat3Label">{{stat3Label}}</div>\n' +
    '    </div>\n' +
    '  </div>\n\n' +

    '  <!-- BOTTOM CTA -->\n' +
    '  <section class="bottom-cta">\n' +
    '    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>\n' +
    '    <p data-field="tagline">{{tagline}}</p>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '  </section>'
  ),
};

var aboutPage = {
  id: "about",
  title: "About",
  filename: "about.html",
  contentFields: [
    { key: "aboutPageHeading", label: "About Heading", type: "text", placeholder: "About Us" },
    { key: "aboutPageIntro", label: "About Introduction", type: "textarea", placeholder: "A few sentences introducing your brand story" },
    { key: "aboutMissionHeading", label: "Mission Heading", type: "text", placeholder: "Our Mission" },
    { key: "aboutMissionText", label: "Mission Text", type: "textarea", placeholder: "Describe your brand's mission and purpose" },
    { key: "aboutValueTitle1", label: "Value 1 Title", type: "text", placeholder: "Quality" },
    { key: "aboutValueDesc1", label: "Value 1 Description", type: "text", placeholder: "We never compromise on quality" },
    { key: "aboutValueTitle2", label: "Value 2 Title", type: "text", placeholder: "Sustainability" },
    { key: "aboutValueDesc2", label: "Value 2 Description", type: "text", placeholder: "Caring for the planet" },
    { key: "aboutValueTitle3", label: "Value 3 Title", type: "text", placeholder: "Community" },
    { key: "aboutValueDesc3", label: "Value 3 Description", type: "text", placeholder: "Building something bigger together" },
  ],
  statFields: [],
  sections: [
    { heading: "About Hero", purpose: "Welcoming heading and introduction for the about page", fields: ["aboutPageHeading", "aboutPageIntro"] },
    { heading: "Mission", purpose: "The brand's mission, purpose, and driving philosophy", fields: ["aboutMissionHeading", "aboutMissionText"] },
    { heading: "Values", purpose: "3 core values or principles the brand stands for", fields: ["aboutValueTitle1", "aboutValueDesc1", "aboutValueTitle2", "aboutValueDesc2", "aboutValueTitle3", "aboutValueDesc3"] },
  ],
  imageSlots: {},
  htmlTemplate: makePage(
    '  <!-- PAGE HERO -->\n' +
    '  <section class="page-hero">\n' +
    '    <h1 data-field="aboutPageHeading">{{aboutPageHeading}}</h1>\n' +
    '    <p data-field="aboutPageIntro">{{aboutPageIntro}}</p>\n' +
    '  </section>\n\n' +

    '  <!-- MISSION -->\n' +
    '  <section class="content-section">\n' +
    '    <h2 data-field="aboutMissionHeading">{{aboutMissionHeading}}</h2>\n' +
    '    <p data-field="aboutMissionText">{{aboutMissionText}}</p>\n' +
    '  </section>\n\n' +

    '  <!-- VALUES -->\n' +
    '  <div class="values-grid">\n' +
    '    <div class="value-card">\n' +
    '      <h3 data-field="aboutValueTitle1">{{aboutValueTitle1}}</h3>\n' +
    '      <p data-field="aboutValueDesc1">{{aboutValueDesc1}}</p>\n' +
    '    </div>\n' +
    '    <div class="value-card">\n' +
    '      <h3 data-field="aboutValueTitle2">{{aboutValueTitle2}}</h3>\n' +
    '      <p data-field="aboutValueDesc2">{{aboutValueDesc2}}</p>\n' +
    '    </div>\n' +
    '    <div class="value-card">\n' +
    '      <h3 data-field="aboutValueTitle3">{{aboutValueTitle3}}</h3>\n' +
    '      <p data-field="aboutValueDesc3">{{aboutValueDesc3}}</p>\n' +
    '    </div>\n' +
    '  </div>\n\n' +

    '  <!-- BOTTOM CTA -->\n' +
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
    '  <!-- PAGE HERO -->\n' +
    '  <section class="page-hero">\n' +
    '    <h1 data-field="contactPageHeading">{{contactPageHeading}}</h1>\n' +
    '    <p data-field="contactPageSubheading">{{contactPageSubheading}}</p>\n' +
    '  </section>\n\n' +

    '  <!-- CONTACT DETAILS -->\n' +
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

    '  <!-- SOCIAL -->\n' +
    '  <div class="contact-social">\n' +
    '    {{socialInstagram}}\n' +
    '    {{socialFacebook}}\n' +
    '    {{socialLinkedin}}\n' +
    '  </div>\n\n' +

    '  <!-- BOTTOM CTA -->\n' +
    '  <section class="bottom-cta">\n' +
    '    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '  </section>'
  ),
};

/* ── Exports ───────────────────────────────────────────── */

export var pages = [homePage, aboutPage, contactPage];

export var contentFields = [].concat(homePage.contentFields, aboutPage.contentFields, contactPage.contentFields);
export var statFields = homePage.statFields;
export var sections = [].concat(homePage.sections, aboutPage.sections, contactPage.sections);
export var imageSlots = homePage.imageSlots;
