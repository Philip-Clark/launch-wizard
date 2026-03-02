export var name = "Ember";
export var defaultColors = { primary: "#C2410C", secondary: "#292524", tertiary: "#78716C" };

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "processAccentColorAssign", label: "Process Steps", selector: ".process-number" },
  { key: "ctaSectionColorAssign", label: "CTA Section", selector: ".bottom-cta", defaultAssign: "secondary" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

/* ── Shared HTML fragments ─────────────────────────────── */

var fontLinks =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">';

var sharedCss = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: {{colorPrimary}};
      --secondary: {{colorSecondary}};
      --tertiary: {{colorTertiary}};
      --btn-bg: {{btnBg}};
      --btn-text: {{btnText}};
      --process-accent-bg: {{processAccentBg}};
      --process-accent-text: {{processAccentText}};
      --footer-bg: {{footerBg}};
      --footer-text-bright: {{footerTextBright}};
      --footer-text-muted: {{footerTextMuted}};
      --cta-section-bg: {{ctaSectionBg}};
      --cta-section-text: {{ctaSectionText}};
      --bg: #FFFAF5;
      --bg-card: #FFFFFF;
      --text: #292524;
      --muted: #78716C;
      --radius: 0.625rem;
      --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
      --font-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
    }

    body {
      font-family: var(--font-sans);
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
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
      background: rgba(255,250,245,0.92);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    .nav-logo {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 1.3rem;
      color: var(--text);
      letter-spacing: -0.01em;
    }
    .nav-logo-img { height: 36px; width: auto; }
    .nav-links { display: flex; gap: 2.5rem; align-items: center; }
    .nav-links a {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--muted);
      transition: color 0.25s ease;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    .nav-links a:hover { color: var(--text); }
    .nav-links a.nav-active { color: var(--text); font-weight: 600; }

    /* ── HERO ────────────────────────────────── */
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      padding: 6rem 5vw;
      max-width: 1280px;
      margin: 0 auto;
    }
    .hero-text h1 {
      font-family: var(--font-serif);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--text);
      margin-bottom: 1.5rem;
    }
    .hero-text p {
      font-size: 1.05rem;
      color: var(--muted);
      max-width: 480px;
      margin-bottom: 2.5rem;
      line-height: 1.8;
    }
    .hero-img-wrap {
      position: relative;
    }
    .hero-img-wrap img,
    .hero-img {
      border-radius: var(--radius);
      width: 100%;
      aspect-ratio: 4/5;
      object-fit: cover;
      background: linear-gradient(135deg, #F5EDE3, #E8DDD0);
    }

    /* ── CTA BUTTON ──────────────────────────── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.9rem 2.25rem;
      border-radius: 0.375rem;
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
      letter-spacing: 0.02em;
      min-height: 44px;
    }
    .btn-primary {
      background: var(--btn-bg);
      color: var(--btn-text);
    }
    .btn-primary:hover {
      filter: brightness(0.9);
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    }
    .btn-primary .arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      margin-left: 0.15rem;
      transition: transform 0.2s ease;
    }
    .btn-primary:hover .arrow {
      transform: translateX(3px);
    }

    /* ── SECTION SHARED ──────────────────────── */
    .section-label {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--primary);
      margin-bottom: 1rem;
    }

    /* ── ABOUT ────────────────────────────────── */
    .about {
      padding: 7rem 5vw;
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
    }
    .about h2 {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 3.5vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--text);
      margin-bottom: 1.75rem;
      line-height: 1.2;
    }
    .about p {
      font-size: 1.1rem;
      color: var(--muted);
      line-height: 1.9;
      max-width: 680px;
      margin: 0 auto;
    }
    .about-divider {
      width: 60px;
      height: 2px;
      background: var(--primary);
      margin: 0 auto 2rem;
      border: none;
    }

    /* ── PROCESS ─────────────────────────────── */
    .process {
      padding: 7rem 5vw;
      max-width: 1100px;
      margin: 0 auto;
    }
    .process-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .process-header h2 {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 3.5vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--text);
      line-height: 1.2;
    }
    .process-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }
    .process-step {
      text-align: left;
      padding: 2.5rem 2rem;
      background: var(--bg-card);
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: var(--radius);
      position: relative;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .process-step:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.06);
    }
    .process-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--process-accent-bg);
      color: var(--process-accent-text);
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .process-step h3 {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.65rem;
      line-height: 1.3;
    }
    .process-step p {
      font-size: 0.925rem;
      color: var(--muted);
      line-height: 1.75;
    }

    /* ── PORTFOLIO ────────────────────────────── */
    .portfolio {
      padding: 7rem 5vw;
      max-width: 1200px;
      margin: 0 auto;
    }
    .portfolio-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .portfolio-header h2 {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 3.5vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--text);
      line-height: 1.2;
    }
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .portfolio-grid img {
      border-radius: var(--radius);
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      transition: transform 0.35s ease, box-shadow 0.35s ease;
      cursor: pointer;
    }
    .portfolio-grid img:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 35px rgba(0,0,0,0.1);
    }

    /* ── BOTTOM CTA ──────────────────────────── */
    .bottom-cta {
      padding: 7rem 5vw;
      text-align: center;
      background: var(--cta-section-bg);
      color: var(--cta-section-text);
    }
    .bottom-cta h2 {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.02em;
      max-width: 640px;
      margin: 0 auto 1.25rem;
      color: var(--cta-section-text);
    }
    .bottom-cta p {
      color: var(--cta-section-text); opacity: 0.7;
      max-width: 520px;
      margin: 0 auto 2.5rem;
      line-height: 1.8;
      font-size: 1.05rem;
    }

    /* ── PAGE HERO (inner pages) ─────────────── */
    .page-hero {
      padding: 5rem 5vw 3rem;
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
    }
    .page-hero h1 {
      font-family: var(--font-serif);
      font-size: clamp(2.25rem, 4vw, 3.25rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      color: var(--text);
      line-height: 1.15;
    }
    .page-hero p {
      font-size: 1.1rem;
      color: var(--muted);
      max-width: 560px;
      margin: 0 auto;
      line-height: 1.8;
    }

    /* ── CONTENT SECTIONS (inner pages) ──────── */
    .content-section {
      padding: 4rem 5vw;
      max-width: 860px;
      margin: 0 auto;
    }
    .content-section h2 {
      font-family: var(--font-serif);
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 700;
      letter-spacing: -0.01em;
      margin-bottom: 1rem;
      color: var(--text);
      line-height: 1.2;
    }
    .content-section p {
      font-size: 1.05rem;
      color: var(--muted);
      line-height: 1.9;
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
      padding: 2.25rem;
      box-shadow: 0 2px 16px rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.05);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .value-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.06);
    }
    .value-card h3 {
      font-family: var(--font-serif);
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
      color: var(--text);
    }
    .value-card p {
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.75;
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
      padding: 2.25rem;
      text-align: center;
      box-shadow: 0 2px 16px rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.05);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .contact-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.06);
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
      font-family: var(--font-serif);
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.4rem;
    }
    .contact-card p, .contact-card a {
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.7;
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
      transition: border-color 0.25s ease, color 0.25s ease;
    }
    .contact-social a:hover { border-color: var(--btn-bg); color: var(--text); }

    /* ── FOOTER ───────────────────────────────── */
    footer {
      background: var(--footer-bg);
      color: var(--footer-text-muted);
      padding: 4.5rem 5vw 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 2.5rem;
    }
    .footer-brand { max-width: 300px; }
    .footer-brand .logo {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--footer-text-bright);
      margin-bottom: 0.85rem;
    }
    .footer-logo-img { height: 30px; width: auto; margin-bottom: 0.85rem; }
    .footer-brand p {
      font-size: 0.85rem;
      line-height: 1.75;
    }
    .footer-links h4 {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--footer-text-bright);
      margin-bottom: 0.85rem;
    }
    .footer-links a {
      display: block;
      font-size: 0.85rem;
      margin-bottom: 0.55rem;
      transition: color 0.25s ease;
    }
    .footer-links a:hover { color: var(--footer-text-bright); }
    .footer-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 1.5rem;
      margin-top: 1rem;
      font-size: 0.75rem;
    }

    /* ── RESPONSIVE 768px ────────────────────── */
    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding: 3.5rem 5vw;
        text-align: center;
      }
      .hero-text p { margin-left: auto; margin-right: auto; }
      .hero-img-wrap { order: -1; }
      .hero-img-wrap img,
      .hero-img { aspect-ratio: 16/10; }
      .about { padding: 5rem 5vw; }
      .process { padding: 5rem 5vw; }
      .process-steps { grid-template-columns: 1fr; gap: 1.5rem; }
      .portfolio { padding: 5rem 5vw; }
      .portfolio-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
      .bottom-cta { padding: 5rem 5vw; }
      .values-grid { grid-template-columns: 1fr; }
      .contact-cards { grid-template-columns: 1fr; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }

    /* ── RESPONSIVE 480px ────────────────────── */
    @media (max-width: 480px) {
      nav { padding: 1rem 4vw; }
      .nav-links { display: none; }
      .hero { padding: 2.5rem 4vw; gap: 2rem; }
      .about { padding: 3.5rem 4vw; }
      .process { padding: 3.5rem 4vw; }
      .process-steps { gap: 1rem; }
      .process-step { padding: 2rem 1.5rem; }
      .portfolio { padding: 3.5rem 4vw; }
      .portfolio-grid { grid-template-columns: 1fr; }
      .bottom-cta { padding: 3.5rem 4vw; }
      footer { padding: 3rem 4vw 1.5rem; }
      .btn { min-height: 48px; padding: 0.9rem 1.75rem; }
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
  '      <h4>Navigation</h4>\n' +
  '      {{footerNavLinks}}\n' +
  '    </div>\n' +
  '    <div class="footer-links">\n' +
  '      <h4>Connect</h4>\n' +
  '      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Email</a>\n' +
  '      <a href="#">Newsletter</a>\n' +
  '      <a href="#">Social</a>\n' +
  '    </div>\n' +
  '    <div class="footer-links">\n' +
  '      <h4>Legal</h4>\n' +
  '      <a href="#">Privacy Policy</a>\n' +
  '      <a href="#">Terms of Service</a>\n' +
  '    </div>\n' +
  '    <div class="footer-bottom">\n' +
  '      <span>Privacy Policy &middot; Terms</span>\n' +
  '      <span>&copy; {{brandName}} 2025. All rights reserved.</span>\n' +
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
    { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "Explore" },
    { key: "ctaUrl", label: "Button Link URL", type: "text", placeholder: "https://yoursite.com/explore", skipGenerate: true },
    { key: "contactEmail", label: "Contact Email", type: "text", placeholder: "hello@yourbrand.com" },
    { key: "aboutHeading", label: "About Heading", type: "text", placeholder: "Our Story" },
    { key: "aboutParagraph", label: "About Paragraph", type: "textarea", placeholder: "A detailed paragraph about your brand and mission" },
    { key: "processHeading", label: "Process Heading", type: "text", placeholder: "Our Process" },
    { key: "processTitle1", label: "Step 1 Title", type: "text", placeholder: "Discover" },
    { key: "processDesc1", label: "Step 1 Description", type: "text", placeholder: "We learn about your vision" },
    { key: "processTitle2", label: "Step 2 Title", type: "text", placeholder: "Design" },
    { key: "processDesc2", label: "Step 2 Description", type: "text", placeholder: "We craft the experience" },
    { key: "processTitle3", label: "Step 3 Title", type: "text", placeholder: "Deliver" },
    { key: "processDesc3", label: "Step 3 Description", type: "text", placeholder: "We bring it to life" },
    { key: "portfolioHeading", label: "Portfolio Heading", type: "text", placeholder: "Our Work" },
    { key: "ctaSectionHeading", label: "CTA Heading", type: "text", placeholder: "Let's Begin Your Journey" },
  ],
  statFields: [],
  sections: [
    { heading: "Hero", purpose: "Elegant, editorial-style hero with serif typography", fields: ["heroHeading", "tagline", "ctaText"] },
    { heading: "About", purpose: "Brand story and mission told in the brand's own voice", fields: ["aboutHeading", "aboutParagraph"] },
    { heading: "Process", purpose: "3 steps showing the creative or service delivery process", fields: ["processHeading", "processTitle1", "processDesc1", "processTitle2", "processDesc2", "processTitle3", "processDesc3"] },
    { heading: "Portfolio", purpose: "Showcase of work, products, or projects", fields: ["portfolioHeading"] },
    { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
  ],
  imageSlots: {
    hero: true,
    featureImages: 0,
    hasGallery: false,
    hasPortfolio: true,
    portfolioStartIndex: 1,
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

    '  <!-- ABOUT -->\n' +
    '  <section class="about" id="about">\n' +
    '    <span class="section-label">About</span>\n' +
    '    <h2 data-field="aboutHeading">{{aboutHeading}}</h2>\n' +
    '    <hr class="about-divider" />\n' +
    '    <p data-field="aboutParagraph">{{aboutParagraph}}</p>\n' +
    '  </section>\n\n' +

    '  <!-- PROCESS -->\n' +
    '  <section class="process" id="process">\n' +
    '    <div class="process-header">\n' +
    '      <span class="section-label">How We Work</span>\n' +
    '      <h2 data-field="processHeading">{{processHeading}}</h2>\n' +
    '    </div>\n' +
    '    <div class="process-steps">\n' +
    '      <div class="process-step">\n' +
    '        <div class="process-number">1</div>\n' +
    '        <h3 data-field="processTitle1">{{processTitle1}}</h3>\n' +
    '        <p data-field="processDesc1">{{processDesc1}}</p>\n' +
    '      </div>\n' +
    '      <div class="process-step">\n' +
    '        <div class="process-number">2</div>\n' +
    '        <h3 data-field="processTitle2">{{processTitle2}}</h3>\n' +
    '        <p data-field="processDesc2">{{processDesc2}}</p>\n' +
    '      </div>\n' +
    '      <div class="process-step">\n' +
    '        <div class="process-number">3</div>\n' +
    '        <h3 data-field="processTitle3">{{processTitle3}}</h3>\n' +
    '        <p data-field="processDesc3">{{processDesc3}}</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n\n' +

    '  <!-- PORTFOLIO -->\n' +
    '  <section class="portfolio" id="portfolio">\n' +
    '    <div class="portfolio-header">\n' +
    '      <span class="section-label">Selected Work</span>\n' +
    '      <h2 data-field="portfolioHeading">{{portfolioHeading}}</h2>\n' +
    '    </div>\n' +
    '    <div class="portfolio-grid">\n' +
    '      {{portfolioImages}}\n' +
    '    </div>\n' +
    '  </section>\n\n' +

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
    { key: "aboutPageHeading", label: "About Heading", type: "text", placeholder: "Our Story" },
    { key: "aboutPageIntro", label: "About Introduction", type: "textarea", placeholder: "A few sentences introducing your brand story" },
    { key: "aboutMissionHeading", label: "Mission Heading", type: "text", placeholder: "Our Mission" },
    { key: "aboutMissionText", label: "Mission Text", type: "textarea", placeholder: "Describe your brand's mission" },
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
    '    <span class="section-label">About Us</span>\n' +
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
    '    <span class="section-label">Contact</span>\n' +
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
export var statFields = [];
export var sections = [].concat(homePage.sections, aboutPage.sections, contactPage.sections);
export var imageSlots = homePage.imageSlots;
