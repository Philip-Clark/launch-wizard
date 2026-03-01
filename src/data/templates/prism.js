export var name = "Prism";
export var defaultColors = { primary: "#8B5CF6", secondary: "#2E1065", tertiary: "#6B7280" };

export var contentFields = [
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
];

export var statFields = [];

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "serviceAccentColorAssign", label: "Service Cards", selector: ".service-card" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

export var imageSlots = {
  hero: false,
  featureImages: 0,
  hasGallery: false,
  hasPortfolio: true,
  portfolioStartIndex: 0,
};

export var sections = [
  { heading: "Hero", purpose: "Creative, bold hero with a gradient background to set the tone", fields: ["heroHeading", "tagline", "ctaText"] },
  { heading: "Services", purpose: "3 service offerings explaining what the business does", fields: ["servicesHeading", "serviceTitle1", "serviceDesc1", "serviceTitle2", "serviceDesc2", "serviceTitle3", "serviceDesc3"] },
  { heading: "Portfolio", purpose: "Showcase of work or projects", fields: ["portfolioHeading"] },
  { heading: "Testimonial", purpose: "A client testimonial that builds credibility", fields: ["testimonialQuote", "testimonialAuthor"] },
  { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
];

export var htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{brandName}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
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
      --bg: #0A0A0A;
      --bg-card: #171717;
      --text: #FAFAFA;
      --muted: #A1A1AA;
      --radius: 0.75rem;
    }
    body { font-family: 'Space Grotesk', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    img { display: block; max-width: 100%; height: auto; }
    a { text-decoration: none; color: inherit; }

    nav { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 5vw; position: sticky; top: 0; z-index: 50; background: rgba(10,10,10,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); }
    .nav-logo { font-weight: 700; font-size: 1.15rem; color: #fff; }
    .nav-logo-img { height: 34px; width: auto; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { font-size: 0.875rem; font-weight: 500; color: var(--muted); transition: color 0.2s; }
    .nav-links a:hover { color: #fff; }

    .hero { text-align: center; padding: 8rem 5vw 6rem; background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 50%, var(--tertiary) 100%); position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 60%); }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 1.25rem; color: #fff; position: relative; }
    .hero p { font-size: 1.1rem; color: rgba(255,255,255,0.75); max-width: 520px; margin: 0 auto 2.5rem; line-height: 1.7; position: relative; }

    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.95rem; border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; min-height: 44px; position: relative; }
    .btn-primary { background: var(--btn-bg); color: var(--btn-text); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.3); }

    .services { padding: 5rem 5vw; }
    .services h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; text-align: center; margin-bottom: 3rem; }
    .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1000px; margin: 0 auto; }
    .service-card { background: var(--bg-card); border-radius: var(--radius); padding: 2rem; border: 1px solid rgba(255,255,255,0.06); border-left: 3px solid var(--service-accent-bg); }
    .service-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; color: #fff; }
    .service-card p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }

    .portfolio { padding: 5rem 5vw; }
    .portfolio h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; text-align: center; margin-bottom: 3rem; }
    .portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .portfolio-grid img { border-radius: var(--radius); width: 100%; aspect-ratio: 4/3; object-fit: cover; transition: transform 0.3s; }
    .portfolio-grid img:hover { transform: scale(1.03); }

    .testimonial { padding: 5rem 5vw; max-width: 700px; margin: 0 auto; text-align: center; }
    .testimonial blockquote { font-size: 1.25rem; font-style: italic; line-height: 1.8; color: var(--text); margin-bottom: 1.5rem; }
    .testimonial .author { font-weight: 700; font-size: 0.95rem; color: var(--text); }

    .bottom-cta { padding: 6rem 5vw; text-align: center; background: var(--bg-card); border-radius: var(--radius) var(--radius) 0 0; margin: 0 2vw; }
    .bottom-cta h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; max-width: 640px; margin: 0 auto 1rem; }
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
      .services-grid { grid-template-columns: 1fr; }
      .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
      .hero { padding: 5rem 5vw 4rem; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
    @media (max-width: 480px) {
      .nav-links { gap: 1rem; }
      .portfolio-grid { grid-template-columns: 1fr; }
      .bottom-cta { padding: 4rem 5vw; margin: 0; }
    }
  </style>
</head>
<body>

  <nav>
    {{logoTag}}
    <div class="nav-links">
      <a href="#services">Services</a>
      <a href="#portfolio">Portfolio</a>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Contact</a>
    </div>
  </nav>

  <section class="hero">
    <h1 data-field="heroHeading">{{heroHeading}}</h1>
    <p data-field="tagline">{{tagline}}</p>
    <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>
  </section>

  <section class="services" id="services">
    <h2 data-field="servicesHeading">{{servicesHeading}}</h2>
    <div class="services-grid">
      <div class="service-card">
        <h3 data-field="serviceTitle1">{{serviceTitle1}}</h3>
        <p data-field="serviceDesc1">{{serviceDesc1}}</p>
      </div>
      <div class="service-card">
        <h3 data-field="serviceTitle2">{{serviceTitle2}}</h3>
        <p data-field="serviceDesc2">{{serviceDesc2}}</p>
      </div>
      <div class="service-card">
        <h3 data-field="serviceTitle3">{{serviceTitle3}}</h3>
        <p data-field="serviceDesc3">{{serviceDesc3}}</p>
      </div>
    </div>
  </section>

  <section class="portfolio" id="portfolio">
    <h2 data-field="portfolioHeading">{{portfolioHeading}}</h2>
    <div class="portfolio-grid" data-field="images">
      {{portfolioImages}}
    </div>
  </section>

  <section class="testimonial">
    <blockquote data-field="testimonialQuote">&ldquo;{{testimonialQuote}}&rdquo;</blockquote>
    <div class="author" data-field="testimonialAuthor">{{testimonialAuthor}}</div>
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
      <h4>Services</h4>
      <a href="#services">Our Work</a>
      <a href="#portfolio">Portfolio</a>
      <a href="#">Careers</a>
    </div>
    <div class="footer-links">
      <h4>Connect</h4>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Email</a>
      <a href="#">Dribbble</a>
      <a href="#">Instagram</a>
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
