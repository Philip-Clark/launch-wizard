export var name = "Prism";
export var defaultColors = { primary: "#8B5CF6", secondary: "#2E1065", tertiary: "#6B7280" };

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "serviceAccentColorAssign", label: "Service Cards", selector: ".service-card" },
  { key: "testimonialColorAssign", label: "Testimonial Section", selector: ".testimonial", defaultAssign: "secondary" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

/* ── Shared HTML fragments ─────────────────────────────── */

var fontLinks =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">';

var sharedCss = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: {{colorPrimary}};
      --secondary: {{colorSecondary}};
      --tertiary: {{colorTertiary}};
      --btn-bg: {{btnBg}};
      --btn-text: {{btnText}};
      --service-accent-bg: {{serviceAccentBg}};
      --service-accent-text: {{serviceAccentText}};
      --footer-bg: {{footerBg}};
      --footer-text-bright: {{footerTextBright}};
      --footer-text-muted: {{footerTextMuted}};
      --testimonial-bg: {{testimonialBg}};
      --testimonial-text: {{testimonialText}};
      --bg: #0A0A0A;
      --bg-card: #171717;
      --text: #FAFAFA;
      --muted: #A1A1AA;
      --radius: 0.75rem;
    }

    body {
      font-family: 'Space Grotesk', system-ui, sans-serif;
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
      background: rgba(10,10,10,0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .nav-logo { font-weight: 700; font-size: 1.15rem; color: #fff; }
    .nav-logo-img { height: 34px; width: auto; }
    .nav-links { display: flex; gap: 2rem; align-items: center; }
    .nav-links a {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--muted);
      transition: color 0.2s;
    }
    .nav-links a:hover { color: #fff; }
    .nav-links a.nav-active { color: #fff; font-weight: 600; }

    /* ── CTA BUTTON ──────────────────────────── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.95rem;
      font-family: inherit;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      min-height: 44px;
      position: relative;
    }
    .btn-primary { background: var(--btn-bg); color: var(--btn-text); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.3); }

    /* ── HERO ────────────────────────────────── */
    .hero {
      text-align: center;
      padding: 8rem 5vw 6rem;
      background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 50%, var(--tertiary) 100%);
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 60%);
    }
    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 1.25rem;
      color: #fff;
      position: relative;
    }
    .hero p {
      font-size: 1.1rem;
      color: rgba(255,255,255,0.75);
      max-width: 520px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
      position: relative;
    }

    /* ── SERVICES ─────────────────────────────── */
    .services { padding: 5rem 5vw; }
    .services h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    .service-card {
      background: var(--bg-card);
      border-radius: var(--radius);
      padding: 2rem;
      border: 1px solid rgba(255,255,255,0.06);
      border-left: 3px solid var(--service-accent-bg);
    }
    .service-card h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #fff;
    }
    .service-card p {
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.7;
    }

    /* ── PORTFOLIO ────────────────────────────── */
    .portfolio { padding: 5rem 5vw; }
    .portfolio h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
    }
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .portfolio-grid img {
      border-radius: var(--radius);
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      transition: transform 0.3s;
    }
    .portfolio-grid img:hover { transform: scale(1.03); }

    /* ── TESTIMONIAL ─────────────────────────── */
    .testimonial {
      padding: 5rem 5vw;
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
      background: var(--testimonial-bg);
      color: var(--testimonial-text);
      border-radius: var(--radius);
    }
    .testimonial blockquote {
      font-size: 1.25rem;
      font-style: italic;
      line-height: 1.8;
      color: var(--testimonial-text);
      margin-bottom: 1.5rem;
    }
    .testimonial .author {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--testimonial-text);
    }

    /* ── BOTTOM CTA ──────────────────────────── */
    .bottom-cta {
      padding: 6rem 5vw;
      text-align: center;
      background: var(--bg-card);
      border-radius: var(--radius) var(--radius) 0 0;
      margin: 0 2vw;
    }
    .bottom-cta h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      max-width: 640px;
      margin: 0 auto 1rem;
    }
    .bottom-cta p {
      color: var(--muted);
      max-width: 520px;
      margin: 0 auto 2rem;
      line-height: 1.7;
    }

    /* ── PAGE HERO (inner pages) ─────────────── */
    .page-hero {
      padding: 5rem 5vw 3rem;
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
      color: var(--text);
    }
    .page-hero h1 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      color: #FAFAFA;
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
      color: #FAFAFA;
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
      border: 1px solid rgba(255,255,255,0.06);
    }
    .value-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #fff;
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
      border: 1px solid rgba(255,255,255,0.06);
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
      color: #fff;
      margin-bottom: 0.4rem;
    }
    .contact-card p, .contact-card a {
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.6;
    }
    .contact-card a:hover { color: #fff; }

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
      border: 1px solid rgba(255,255,255,0.1);
      transition: border-color 0.2s, color 0.2s;
    }
    .contact-social a:hover { border-color: var(--btn-bg); color: #fff; }

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
      font-weight: 700;
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
      border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 1.5rem;
      margin-top: 1rem;
      font-size: 0.75rem;
    }

    /* ── RESPONSIVE 768px ────────────────────── */
    @media (max-width: 768px) {
      .services-grid { grid-template-columns: 1fr; }
      .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
      .hero { padding: 5rem 5vw 4rem; }
      .values-grid { grid-template-columns: 1fr; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }

    /* ── RESPONSIVE 480px ────────────────────── */
    @media (max-width: 480px) {
      .nav-links { gap: 1rem; }
      .portfolio-grid { grid-template-columns: 1fr; }
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
  '      <a href="#">Dribbble</a>\n' +
  '      <a href="#">Instagram</a>\n' +
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
    { key: "tagline", label: "Tagline", type: "text", placeholder: "One catchy sentence about your agency" },
    { key: "heroHeading", label: "Hero Heading", type: "text", placeholder: "Bold attention-grabbing headline" },
    { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "View Our Work" },
    { key: "ctaUrl", label: "Button Link URL", type: "text", placeholder: "https://yoursite.com/portfolio", skipGenerate: true },
    { key: "contactEmail", label: "Contact Email", type: "text", placeholder: "hello@yourbrand.com" },
    { key: "servicesHeading", label: "Services Heading", type: "text", placeholder: "What We Do" },
    { key: "serviceTitle1", label: "Service 1 Title", type: "text", placeholder: "Brand Strategy" },
    { key: "serviceDesc1", label: "Service 1 Description", type: "text", placeholder: "Description of service one" },
    { key: "serviceTitle2", label: "Service 2 Title", type: "text", placeholder: "Web Design" },
    { key: "serviceDesc2", label: "Service 2 Description", type: "text", placeholder: "Description of service two" },
    { key: "serviceTitle3", label: "Service 3 Title", type: "text", placeholder: "Digital Marketing" },
    { key: "serviceDesc3", label: "Service 3 Description", type: "text", placeholder: "Description of service three" },
    { key: "portfolioHeading", label: "Portfolio Heading", type: "text", placeholder: "Selected Work" },
    { key: "testimonialQuote", label: "Testimonial Quote", type: "textarea", placeholder: "A glowing review from a client" },
    { key: "testimonialAuthor", label: "Testimonial Author", type: "text", placeholder: "Jane Doe" },
    { key: "ctaSectionHeading", label: "CTA Heading", type: "text", placeholder: "Let's Create Something Amazing" },
  ],
  statFields: [],
  sections: [
    { heading: "Hero", purpose: "Creative, bold hero with a gradient background to set the tone", fields: ["heroHeading", "tagline", "ctaText"] },
    { heading: "Services", purpose: "3 service offerings explaining what the business does", fields: ["servicesHeading", "serviceTitle1", "serviceDesc1", "serviceTitle2", "serviceDesc2", "serviceTitle3", "serviceDesc3"] },
    { heading: "Portfolio", purpose: "Showcase of work or projects", fields: ["portfolioHeading"] },
    { heading: "Testimonial", purpose: "A client testimonial that builds credibility", fields: ["testimonialQuote", "testimonialAuthor"] },
    { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
  ],
  imageSlots: {
    hero: false,
    featureImages: 0,
    hasGallery: false,
    hasPortfolio: true,
    portfolioStartIndex: 0,
  },
  htmlTemplate: makePage(
    '  <!-- HERO -->\n' +
    '  <section class="hero">\n' +
    '    <h1 data-field="heroHeading">{{heroHeading}}</h1>\n' +
    '    <p data-field="tagline">{{tagline}}</p>\n' +
    '    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>\n' +
    '  </section>\n\n' +

    '  <!-- SERVICES -->\n' +
    '  <section class="services" id="services">\n' +
    '    <h2 data-field="servicesHeading">{{servicesHeading}}</h2>\n' +
    '    <div class="services-grid">\n' +
    '      <div class="service-card">\n' +
    '        <h3 data-field="serviceTitle1">{{serviceTitle1}}</h3>\n' +
    '        <p data-field="serviceDesc1">{{serviceDesc1}}</p>\n' +
    '      </div>\n' +
    '      <div class="service-card">\n' +
    '        <h3 data-field="serviceTitle2">{{serviceTitle2}}</h3>\n' +
    '        <p data-field="serviceDesc2">{{serviceDesc2}}</p>\n' +
    '      </div>\n' +
    '      <div class="service-card">\n' +
    '        <h3 data-field="serviceTitle3">{{serviceTitle3}}</h3>\n' +
    '        <p data-field="serviceDesc3">{{serviceDesc3}}</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>\n\n' +

    '  <!-- PORTFOLIO -->\n' +
    '  <section class="portfolio" id="portfolio">\n' +
    '    <h2 data-field="portfolioHeading">{{portfolioHeading}}</h2>\n' +
    '    <div class="portfolio-grid" data-field="images">\n' +
    '      {{portfolioImages}}\n' +
    '    </div>\n' +
    '  </section>\n\n' +

    '  <!-- TESTIMONIAL -->\n' +
    '  <section class="testimonial">\n' +
    '    <blockquote data-field="testimonialQuote">&ldquo;{{testimonialQuote}}&rdquo;</blockquote>\n' +
    '    <div class="author" data-field="testimonialAuthor">{{testimonialAuthor}}</div>\n' +
    '  </section>\n\n' +

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
    { key: "aboutPageIntro", label: "About Introduction", type: "textarea", placeholder: "A few sentences introducing your creative story" },
    { key: "aboutMissionHeading", label: "Mission Heading", type: "text", placeholder: "Our Mission" },
    { key: "aboutMissionText", label: "Mission Text", type: "textarea", placeholder: "Describe your creative mission and vision" },
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
    { key: "contactPageSubheading", label: "Contact Subheading", type: "text", placeholder: "Let's discuss your next project" },
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

/* Aggregated fields across all pages (for Gemini schema / AdvancedEditor) */
export var contentFields = [].concat(homePage.contentFields, aboutPage.contentFields, contactPage.contentFields);
export var statFields = [];
export var sections = [].concat(homePage.sections, aboutPage.sections, contactPage.sections);
export var imageSlots = homePage.imageSlots;
