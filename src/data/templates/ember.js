export var name = "Ember";
export var defaultColors = { primary: "#C2410C", secondary: "#292524", tertiary: "#78716C" };

export var contentFields = [
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
];

export var statFields = [];

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "processAccentColorAssign", label: "Process Steps", selector: ".process-number" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

export var imageSlots = {
  hero: true,
  featureImages: 0,
  hasGallery: false,
  hasPortfolio: true,
  portfolioStartIndex: 1,
};

export var sections = [
  { heading: "Hero", purpose: "Elegant, editorial-style hero with serif typography", fields: ["heroHeading", "tagline", "ctaText"] },
  { heading: "About", purpose: "Brand story and mission told in the brand's own voice", fields: ["aboutHeading", "aboutParagraph"] },
  { heading: "Process", purpose: "3 steps showing the creative or service delivery process", fields: ["processHeading", "processTitle1", "processDesc1", "processTitle2", "processDesc2", "processTitle3", "processDesc3"] },
  { heading: "Portfolio", purpose: "Showcase of work, products, or projects", fields: ["portfolioHeading"] },
  { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
];

export var htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{brandName}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
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
      background: var(--secondary);
      color: var(--bg);
    }
    .bottom-cta h2 {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.02em;
      max-width: 640px;
      margin: 0 auto 1.25rem;
      color: var(--bg);
    }
    .bottom-cta p {
      color: #A8A29E;
      max-width: 520px;
      margin: 0 auto 2.5rem;
      line-height: 1.8;
      font-size: 1.05rem;
    }

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
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    {{logoTag}}
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#portfolio">Work</a>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Contact</a>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-text">
      <h1 data-field="heroHeading">{{heroHeading}}</h1>
      <p data-field="tagline">{{tagline}}</p>
      <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">
        {{ctaText}} <span class="arrow">&rarr;</span>
      </a>
    </div>
    <div class="hero-img-wrap">
      {{heroImageTag}}
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about" id="about">
    <span class="section-label">About</span>
    <h2 data-field="aboutHeading">{{aboutHeading}}</h2>
    <hr class="about-divider" />
    <p data-field="aboutParagraph">{{aboutParagraph}}</p>
  </section>

  <!-- PROCESS -->
  <section class="process" id="process">
    <div class="process-header">
      <span class="section-label">How We Work</span>
      <h2 data-field="processHeading">{{processHeading}}</h2>
    </div>
    <div class="process-steps">
      <div class="process-step">
        <div class="process-number">1</div>
        <h3 data-field="processTitle1">{{processTitle1}}</h3>
        <p data-field="processDesc1">{{processDesc1}}</p>
      </div>
      <div class="process-step">
        <div class="process-number">2</div>
        <h3 data-field="processTitle2">{{processTitle2}}</h3>
        <p data-field="processDesc2">{{processDesc2}}</p>
      </div>
      <div class="process-step">
        <div class="process-number">3</div>
        <h3 data-field="processTitle3">{{processTitle3}}</h3>
        <p data-field="processDesc3">{{processDesc3}}</p>
      </div>
    </div>
  </section>

  <!-- PORTFOLIO -->
  <section class="portfolio" id="portfolio">
    <div class="portfolio-header">
      <span class="section-label">Selected Work</span>
      <h2 data-field="portfolioHeading">{{portfolioHeading}}</h2>
    </div>
    <div class="portfolio-grid">
      {{portfolioImages}}
    </div>
  </section>

  <!-- BOTTOM CTA -->
  <section class="bottom-cta">
    <h2 data-field="ctaSectionHeading">{{ctaSectionHeading}}</h2>
    <p data-field="tagline">{{tagline}}</p>
    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">
      {{ctaText}} <span class="arrow">&rarr;</span>
    </a>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-brand">
      {{footerLogoTag}}
      <p data-field="tagline">{{tagline}}</p>
    </div>
    <div class="footer-links">
      <h4>Navigation</h4>
      <a href="#about">About</a>
      <a href="#process">Process</a>
      <a href="#portfolio">Work</a>
    </div>
    <div class="footer-links">
      <h4>Connect</h4>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Email</a>
      <a href="#">Newsletter</a>
      <a href="#">Social</a>
    </div>
    <div class="footer-links">
      <h4>Legal</h4>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </div>
    <div class="footer-bottom">
      <span>Privacy Policy &middot; Terms</span>
      <span>&copy; {{brandName}} 2025. All rights reserved.</span>
    </div>
  </footer>

</body>
</html>`;
