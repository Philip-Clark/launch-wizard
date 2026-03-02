export var name = "Solara";
export var defaultColors = { primary: "#D4E157", secondary: "#1a1a2e", tertiary: "#6b7280" };

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "badgeColorAssign", label: "Feature Badges", selector: ".badge" },
  { key: "statIconColorAssign", label: "Stat Icons", selector: ".stat .icon" },
  { key: "ctaSectionColorAssign", label: "CTA Section", selector: ".bottom-cta", defaultAssign: "primary" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
  { key: "quoteBorderColorAssign", label: "Quote Accent", selector: ".about-quote" },
];

/* ── Shared HTML fragments ─────────────────────────────── */

var fontLinks =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

var sharedCss = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: {{colorPrimary}};
      --secondary: {{colorSecondary}};
      --tertiary: {{colorTertiary}};
      --btn-bg: {{btnBg}};
      --btn-text: {{btnText}};
      --badge-bg: {{badgeBg}};
      --badge-text: {{badgeText}};
      --stat-icon-bg: {{statIconBg}};
      --stat-icon-text: {{statIconText}};
      --footer-bg: {{footerBg}};
      --footer-text-bright: {{footerTextBright}};
      --footer-text-muted: {{footerTextMuted}};
      --quote-border: {{quoteBorder}};
      --cta-section-bg: {{ctaSectionBg}};
      --cta-section-text: {{ctaSectionText}};
      --bg: #F9FAFB;
      --bg-card: #FFFFFF;
      --text: #111827;
      --muted: #6b7280;
      --radius: 1rem;
    }

    body {
      font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    img { display: block; max-width: 100%; height: auto; }
    a { text-decoration: none; color: inherit; }

    /* ── NAV ─────────────────────────────────── */
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 5vw;
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(249,250,251,0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .nav-logo {
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
    }
    .nav-logo-img { height: 34px; width: auto; }
    .nav-links { display: flex; gap: 2rem; align-items: center; }
    .nav-links a {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--muted);
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text); }
    .nav-links a.nav-active { color: var(--text); font-weight: 600; }

    /* ── CTA BUTTON ──────────────────────────── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 2rem;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.95rem;
      font-family: inherit;
      border: none;
      cursor: pointer;
      min-height: 44px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary {
      background: var(--btn-bg);
      color: var(--btn-text);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(0,0,0,0.12);
    }
    .btn-primary .arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px; height: 28px;
      border-radius: 50%;
      background: var(--btn-text);
      color: var(--btn-bg);
      font-size: 0.85rem;
    }

    /* ── HERO ────────────────────────────────── */
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      padding: 5rem 5vw 4rem;
      max-width: 1280px;
      margin: 0 auto;
      min-height: 80vh;
    }
    .hero-text h1 {
      font-size: clamp(2.25rem, 5vw, 3.75rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 1.25rem;
      color: var(--secondary);
    }
    .hero-text p {
      font-size: clamp(1rem, 1.5vw, 1.125rem);
      color: var(--muted);
      max-width: 480px;
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    .hero-img {
      border-radius: var(--radius);
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      background: linear-gradient(135deg, var(--bg-card), #e5e7eb);
      box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    }

    /* ── FEATURES ─────────────────────────────── */
    .features {
      padding: 5rem 5vw;
      text-align: center;
      max-width: 1280px;
      margin: 0 auto;
    }
    .features h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      color: var(--secondary);
    }
    .features .subtitle {
      color: var(--muted);
      font-size: clamp(0.95rem, 1.25vw, 1.05rem);
      margin-bottom: 3rem;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .feature-card {
      position: relative;
      border-radius: var(--radius);
      overflow: hidden;
      aspect-ratio: 4/3;
      background: linear-gradient(135deg, var(--bg-card), #e5e7eb);
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.1);
    }
    .feature-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .feature-card .overlay {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 1.25rem;
      background: linear-gradient(transparent, rgba(0,0,0,0.6));
      color: #fff;
    }
    .feature-card .overlay .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: var(--badge-bg);
      color: var(--badge-text);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      margin-bottom: 0.5rem;
    }
    .feature-card .overlay p {
      font-size: 0.85rem;
      font-weight: 500;
      line-height: 1.5;
    }

    /* ── ABOUT ────────────────────────────────── */
    .about {
      padding: 5rem 5vw;
      max-width: 860px;
      margin: 0 auto;
    }
    .about-quote {
      font-size: clamp(1.1rem, 1.8vw, 1.3rem);
      font-weight: 500;
      line-height: 1.85;
      color: var(--text);
      border-left: 4px solid var(--quote-border);
      padding-left: 1.5rem;
      font-style: italic;
    }

    /* ── STATS ────────────────────────────────── */
    .stats {
      padding: 3.5rem 5vw;
      display: flex;
      justify-content: center;
      gap: 4rem;
      flex-wrap: wrap;
      max-width: 1280px;
      margin: 0 auto;
      border-top: 1px solid rgba(0,0,0,0.06);
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .stat { text-align: center; }
    .stat .icon {
      width: 44px; height: 44px;
      border-radius: 50%;
      background: var(--stat-icon-bg);
      color: var(--stat-icon-text);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.6rem;
      font-size: 1.1rem;
    }
    .stat .number {
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--secondary);
    }
    .stat .label {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 0.2rem;
    }

    /* ── GALLERY ──────────────────────────────── */
    .gallery {
      padding: 5rem 5vw;
      max-width: 1280px;
      margin: 0 auto;
    }
    .gallery h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 2rem;
      color: var(--secondary);
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1rem;
    }
    .gallery-grid img {
      border-radius: var(--radius);
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      transition: transform 0.3s;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    }
    .gallery-grid img:hover { transform: scale(1.03); }

    /* ── BOTTOM CTA ──────────────────────────── */
    .bottom-cta {
      padding: 6rem 5vw;
      text-align: center;
      background: var(--cta-section-bg);
      color: var(--cta-section-text);
      border-radius: var(--radius) var(--radius) 0 0;
      margin: 0 2vw;
      box-shadow: 0 -4px 30px rgba(0,0,0,0.04);
    }
    .bottom-cta h2 {
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      font-weight: 800;
      line-height: 1.12;
      letter-spacing: -0.03em;
      max-width: 640px;
      margin: 0 auto 1rem;
      color: var(--cta-section-text);
    }
    .bottom-cta p {
      color: var(--muted);
      max-width: 520px;
      margin: 0 auto 2rem;
      line-height: 1.7;
      font-size: clamp(0.95rem, 1.25vw, 1.05rem);
    }

    /* ── PAGE HERO (inner pages) ─────────────── */
    .page-hero {
      padding: 5rem 5vw 3rem;
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
    }
    .page-hero h1 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      color: var(--secondary);
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
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      color: var(--secondary);
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
      gap: 2rem;
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
    }
    .value-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--secondary);
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
      color: var(--secondary);
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
    footer {
      background: var(--footer-bg);
      color: var(--footer-text-muted);
      padding: 3.5rem 5vw 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 2rem;
    }
    .footer-brand { max-width: 260px; }
    .footer-brand .logo {
      font-weight: 800;
      font-size: 1.15rem;
      color: var(--footer-text-bright);
      margin-bottom: 0.75rem;
    }
    .footer-logo-img { height: 28px; width: auto; margin-bottom: 0.75rem; }
    .footer-brand p {
      font-size: 0.8rem;
      line-height: 1.7;
    }
    .footer-links h4 {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--footer-text-bright);
      margin-bottom: 0.75rem;
    }
    .footer-links a {
      display: block;
      font-size: 0.8rem;
      margin-bottom: 0.4rem;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--footer-text-bright); }
    .footer-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(128,128,128,0.15);
      padding-top: 1.5rem;
      margin-top: 1rem;
      font-size: 0.75rem;
    }

    /* ── RESPONSIVE 768px ────────────────────── */
    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        text-align: center;
        padding-top: 3rem;
        min-height: auto;
      }
      .hero-text p { margin-left: auto; margin-right: auto; }
      .hero-text { order: 1; }
      .hero-img-wrap { order: 2; }
      .features-grid { grid-template-columns: 1fr; }
      .about { padding: 3rem 5vw; }
      .stats { gap: 2rem; }
      .gallery-grid { grid-template-columns: 1fr; }
      .values-grid { grid-template-columns: 1fr; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }

    /* ── RESPONSIVE 480px ────────────────────── */
    @media (max-width: 480px) {
      nav { padding: 1rem 4vw; }
      .nav-links { display: none; }
      .hero { padding: 2rem 4vw 2.5rem; gap: 2rem; }
      .features { padding: 3rem 4vw; }
      .stats { padding: 2.5rem 4vw; gap: 1.5rem; }
      .gallery { padding: 3rem 4vw; }
      .bottom-cta { padding: 4rem 4vw; margin: 0; border-radius: 0; }
      footer { padding: 2.5rem 4vw 1.5rem; }
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
    { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "Get Started" },
    { key: "ctaUrl", label: "Button Link URL", type: "text", placeholder: "https://yoursite.com/signup", skipGenerate: true },
    { key: "contactEmail", label: "Contact Email", type: "text", placeholder: "hello@yourbrand.com" },
    { key: "aboutCopy", label: "About Copy", type: "textarea", placeholder: "2-3 sentences about your business" },
    { key: "featureSectionHeading", label: "Features Heading", type: "text", placeholder: "Welcome to a Smarter Way of Living" },
    { key: "featureSectionSubtitle", label: "Features Subtitle", type: "text", placeholder: "Transforming everyday living" },
    { key: "featureLabel1", label: "Feature 1 Label", type: "text", placeholder: "Smart, Safe, and Secure" },
    { key: "featureDesc1", label: "Feature 1 Description", type: "text", placeholder: "Short description of feature one" },
    { key: "featureLabel2", label: "Feature 2 Label", type: "text", placeholder: "Seamless Integration" },
    { key: "featureDesc2", label: "Feature 2 Description", type: "text", placeholder: "Short description of feature two" },
    { key: "featureLabel3", label: "Feature 3 Label", type: "text", placeholder: "Built for You" },
    { key: "featureDesc3", label: "Feature 3 Description", type: "text", placeholder: "Short description of feature three" },
    { key: "ctaSectionHeading", label: "CTA Heading", type: "text", placeholder: "Your Journey Starts with One Click." },
    { key: "galleryHeading", label: "Gallery Heading", type: "text", placeholder: "Discover More" },
  ],
  statFields: [
    { numKey: "stat1Number", labelKey: "stat1Label", numPh: "80M+", labelPh: "Products Launched" },
    { numKey: "stat2Number", labelKey: "stat2Label", numPh: "50+", labelPh: "Countries Connected" },
    { numKey: "stat3Number", labelKey: "stat3Label", numPh: "$120M+", labelPh: "Raised in Funding" },
  ],
  sections: [
    { heading: "Hero", purpose: "Bold opening to grab attention and communicate the core value proposition", fields: ["heroHeading", "tagline", "ctaText"] },
    { heading: "Features", purpose: "3 feature cards showcasing key product or service strengths", fields: ["featureSectionHeading", "featureSectionSubtitle", "featureLabel1", "featureDesc1", "featureLabel2", "featureDesc2", "featureLabel3", "featureDesc3"] },
    { heading: "About", purpose: "Brand story or mission statement as a pull-quote", fields: ["aboutCopy"] },
    { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
  ],
  imageSlots: {
    hero: true,
    featureImages: 3,
    galleryStartIndex: 4,
    hasGallery: true,
    hasPortfolio: false,
  },
  htmlTemplate: makePage(
    '  <!-- HERO -->\n' +
    '  <section class="hero">\n' +
    '    <div class="hero-text">\n' +
    '      <h1 data-field="heroHeading">{{heroHeading}}</h1>\n' +
    '      <p data-field="tagline">{{tagline}}</p>\n' +
    '      <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">\n' +
    '        {{ctaText}} <span class="arrow">&rarr;</span>\n' +
    '      </a>\n' +
    '    </div>\n' +
    '    <div class="hero-img-wrap">\n' +
    '      {{heroImageTag}}\n' +
    '    </div>\n' +
    '  </section>\n\n' +

    '  <!-- FEATURES -->\n' +
    '  <section class="features" id="features">\n' +
    '    <h2 data-field="featureSectionHeading">{{featureSectionHeading}}</h2>\n' +
    '    <p class="subtitle" data-field="featureSectionSubtitle">{{featureSectionSubtitle}}</p>\n' +
    '    <div class="features-grid">\n' +
    '      <div class="feature-card">\n' +
    '        {{featureImage1}}\n' +
    '        <div class="overlay">\n' +
    '          <span class="badge" data-field="featureLabel1">{{featureLabel1}}</span>\n' +
    '          <p data-field="featureDesc1">{{featureDesc1}}</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="feature-card">\n' +
    '        {{featureImage2}}\n' +
    '        <div class="overlay">\n' +
    '          <span class="badge" data-field="featureLabel2">{{featureLabel2}}</span>\n' +
    '          <p data-field="featureDesc2">{{featureDesc2}}</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="feature-card">\n' +
    '        {{featureImage3}}\n' +
    '        <div class="overlay">\n' +
    '          <span class="badge" data-field="featureLabel3">{{featureLabel3}}</span>\n' +
    '          <p data-field="featureDesc3">{{featureDesc3}}</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n\n' +

    '  <!-- ABOUT -->\n' +
    '  <section class="about" id="about">\n' +
    '    <blockquote class="about-quote" data-field="aboutCopy">\n' +
    '      &ldquo;{{aboutCopy}}&rdquo;\n' +
    '    </blockquote>\n' +
    '  </section>\n\n' +

    '  <!-- STATS -->\n' +
    '  <div class="stats">\n' +
    '    <div class="stat">\n' +
    '      <div class="icon">&#9733;</div>\n' +
    '      <div class="number" data-field="stat1Number">{{stat1Number}}</div>\n' +
    '      <div class="label" data-field="stat1Label">{{stat1Label}}</div>\n' +
    '    </div>\n' +
    '    <div class="stat">\n' +
    '      <div class="icon">&#9872;</div>\n' +
    '      <div class="number" data-field="stat2Number">{{stat2Number}}</div>\n' +
    '      <div class="label" data-field="stat2Label">{{stat2Label}}</div>\n' +
    '    </div>\n' +
    '    <div class="stat">\n' +
    '      <div class="icon">&#10003;</div>\n' +
    '      <div class="number" data-field="stat3Number">{{stat3Number}}</div>\n' +
    '      <div class="label" data-field="stat3Label">{{stat3Label}}</div>\n' +
    '    </div>\n' +
    '  </div>\n\n' +

    '  <!-- GALLERY -->\n' +
    '  {{gallerySection}}\n\n' +

    '  <!-- BOTTOM CTA -->\n' +
    '  <section class="bottom-cta">\n' +
    '    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>\n' +
    '    <p data-field="tagline">{{tagline}}</p>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">\n' +
    '      {{ctaText}} <span class="arrow">&rarr;</span>\n' +
    '    </a>\n' +
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
    { key: "aboutValueTitle2", label: "Value 2 Title", type: "text", placeholder: "Innovation" },
    { key: "aboutValueDesc2", label: "Value 2 Description", type: "text", placeholder: "Always pushing boundaries" },
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
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">\n' +
    '      {{ctaText}} <span class="arrow">&rarr;</span>\n' +
    '    </a>\n' +
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
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">\n' +
    '      {{ctaText}} <span class="arrow">&rarr;</span>\n' +
    '    </a>\n' +
    '  </section>'
  ),
};

/* ── Exports ───────────────────────────────────────────── */

export var pages = [homePage, aboutPage, contactPage];

/* Aggregated fields across all pages (for Gemini schema / AdvancedEditor) */
export var contentFields = [].concat(homePage.contentFields, aboutPage.contentFields, contactPage.contentFields);
export var statFields = homePage.statFields;
export var sections = [].concat(homePage.sections, aboutPage.sections, contactPage.sections);
export var imageSlots = homePage.imageSlots;
