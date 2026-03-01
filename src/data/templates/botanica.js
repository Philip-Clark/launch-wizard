export var name = "Botanica";
export var defaultColors = { primary: "#8B7355", secondary: "#2D3727", tertiary: "#9CAF88" };

export var contentFields = [
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
];

export var statFields = [
  { numKey: "stat1Number", labelKey: "stat1Label", numPh: "10K+", labelPh: "Happy Customers" },
  { numKey: "stat2Number", labelKey: "stat2Label", numPh: "50+", labelPh: "Product Varieties" },
  { numKey: "stat3Number", labelKey: "stat3Label", numPh: "100%", labelPh: "Organic Ingredients" },
];

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "benefitAccentColorAssign", label: "Benefit Cards", selector: ".benefit-card" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

export var imageSlots = {
  hero: true,
  featureImages: 0,
  hasGallery: false,
  hasPortfolio: false,
};

export var sections = [
  { heading: "Hero", purpose: "Warm, inviting introduction with the brand promise", fields: ["heroHeading", "tagline", "ctaText"] },
  { heading: "Benefits", purpose: "3 key benefits or unique selling points", fields: ["benefitHeading", "benefitTitle1", "benefitDesc1", "benefitTitle2", "benefitDesc2", "benefitTitle3", "benefitDesc3"] },
  { heading: "Testimonial", purpose: "A customer testimonial that builds trust and authenticity", fields: ["testimonialQuote", "testimonialAuthor", "testimonialRole"] },
  { heading: "CTA", purpose: "Final call to action to convert visitors", fields: ["ctaSectionHeading"] },
];

export var htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{brandName}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: {{colorPrimary}};
      --secondary: {{colorSecondary}};
      --tertiary: {{colorTertiary}};
      --btn-bg: {{btnBg}};
      --btn-text: {{btnText}};
      --benefit-accent-bg: {{benefitAccentBg}};
      --benefit-accent-text: {{benefitAccentText}};
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

    nav { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 5vw; position: sticky; top: 0; z-index: 50; background: rgba(250,247,242,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(0,0,0,0.06); }
    .nav-logo { font-weight: 700; font-size: 1.15rem; letter-spacing: -0.02em; }
    .nav-logo-img { height: 34px; width: auto; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { font-size: 0.875rem; font-weight: 500; color: var(--muted); transition: color 0.2s; }
    .nav-links a:hover { color: var(--text); }

    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; padding: 5rem 5vw 4rem; min-height: 80vh; }
    .hero-text h1 { font-size: clamp(2.5rem, 5vw, 3.75rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.25rem; }
    .hero-text p { font-size: 1.05rem; color: var(--muted); max-width: 480px; line-height: 1.7; margin-bottom: 2rem; }
    .hero-img { border-radius: var(--radius); width: 100%; aspect-ratio: 4/3; object-fit: cover; background: linear-gradient(135deg, var(--bg-card), #e8e4db); }

    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.95rem; border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; min-height: 44px; }
    .btn-primary { background: var(--btn-bg); color: var(--btn-text); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.10); }

    .benefits { padding: 5rem 5vw; }
    .benefits h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; letter-spacing: -0.02em; text-align: center; margin-bottom: 3rem; }
    .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .benefit-card { background: var(--bg-card); border-radius: var(--radius); padding: 2rem; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 12px rgba(0,0,0,0.04); border-top: 3px solid var(--benefit-accent-bg); }
    .benefit-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text); }
    .benefit-card p { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }

    .testimonial { padding: 5rem 5vw; max-width: 800px; margin: 0 auto; text-align: center; }
    .testimonial blockquote { font-size: 1.25rem; font-style: italic; line-height: 1.8; color: var(--text); margin-bottom: 1.5rem; }
    .testimonial .author { font-weight: 700; font-size: 0.95rem; color: var(--text); }
    .testimonial .role { font-size: 0.8rem; color: var(--muted); margin-top: 0.25rem; }

    .stats { padding: 3rem 5vw; display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); }
    .stat { text-align: center; }
    .stat .number { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.02em; color: var(--secondary); }
    .stat .label { font-size: 0.75rem; color: var(--muted); margin-top: 0.15rem; }

    .bottom-cta { padding: 6rem 5vw; text-align: center; background: var(--bg-card); border-radius: var(--radius) var(--radius) 0 0; margin: 0 2vw; }
    .bottom-cta h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.03em; max-width: 640px; margin: 0 auto 1rem; }
    .bottom-cta p { color: var(--muted); max-width: 520px; margin: 0 auto 2rem; line-height: 1.7; }

    footer { background: var(--footer-bg); color: var(--footer-text-muted); padding: 3.5rem 5vw 2rem; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; }
    .footer-brand { max-width: 260px; }
    .footer-brand .logo { font-weight: 700; font-size: 1.15rem; color: var(--footer-text-bright); margin-bottom: 0.75rem; }
    .footer-logo-img { height: 28px; width: auto; margin-bottom: 0.75rem; }
    .footer-brand p { font-size: 0.8rem; line-height: 1.7; }
    .footer-links h4 { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--footer-text-bright); margin-bottom: 0.75rem; }
    .footer-links a { display: block; font-size: 0.8rem; margin-bottom: 0.4rem; transition: color 0.2s; }
    .footer-links a:hover { color: var(--footer-text-bright); }
    .footer-bottom { width: 100%; display: flex; justify-content: space-between; border-top: 1px solid rgba(128,128,128,0.15); padding-top: 1.5rem; margin-top: 1rem; font-size: 0.75rem; }

    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; text-align: center; padding-top: 3rem; }
      .hero-text { order: 2; }
      .hero-text p { margin: 0 auto 2rem; }
      .hero-img { order: 1; }
      .benefits-grid { grid-template-columns: 1fr; }
      .stats { gap: 2rem; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
    @media (max-width: 480px) {
      .nav-links { gap: 1rem; }
      .hero { padding: 3rem 5vw 2rem; }
      .benefits { padding: 3rem 5vw; }
      .bottom-cta { padding: 4rem 5vw; margin: 0; }
    }
  </style>
</head>
<body>

  <nav>
    {{logoTag}}
    <div class="nav-links">
      <a href="#benefits">Benefits</a>
      <a href="#testimonial">About</a>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Contact</a>
    </div>
  </nav>

  <section class="hero">
    {{heroImageTag}}
    <div class="hero-text">
      <h1 data-field="heroHeading">{{heroHeading}}</h1>
      <p data-field="tagline">{{tagline}}</p>
      <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">{{ctaText}}</a>
    </div>
  </section>

  <section class="benefits" id="benefits">
    <h2 data-field="benefitHeading">{{benefitHeading}}</h2>
    <div class="benefits-grid">
      <div class="benefit-card">
        <h3 data-field="benefitTitle1">{{benefitTitle1}}</h3>
        <p data-field="benefitDesc1">{{benefitDesc1}}</p>
      </div>
      <div class="benefit-card">
        <h3 data-field="benefitTitle2">{{benefitTitle2}}</h3>
        <p data-field="benefitDesc2">{{benefitDesc2}}</p>
      </div>
      <div class="benefit-card">
        <h3 data-field="benefitTitle3">{{benefitTitle3}}</h3>
        <p data-field="benefitDesc3">{{benefitDesc3}}</p>
      </div>
    </div>
  </section>

  <section class="testimonial" id="testimonial">
    <blockquote data-field="testimonialQuote">&ldquo;{{testimonialQuote}}&rdquo;</blockquote>
    <div class="author" data-field="testimonialAuthor">{{testimonialAuthor}}</div>
    <div class="role" data-field="testimonialRole">{{testimonialRole}}</div>
  </section>

  <div class="stats">
    <div class="stat">
      <div class="number" data-field="stat1Number">{{stat1Number}}</div>
      <div class="label" data-field="stat1Label">{{stat1Label}}</div>
    </div>
    <div class="stat">
      <div class="number" data-field="stat2Number">{{stat2Number}}</div>
      <div class="label" data-field="stat2Label">{{stat2Label}}</div>
    </div>
    <div class="stat">
      <div class="number" data-field="stat3Number">{{stat3Number}}</div>
      <div class="label" data-field="stat3Label">{{stat3Label}}</div>
    </div>
  </div>

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
      <h4>Company</h4>
      <a href="#">About Us</a>
      <a href="#">Careers</a>
      <a href="#">Press</a>
    </div>
    <div class="footer-links">
      <h4>Connect</h4>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Email</a>
      <a href="#">Newsletter</a>
      <a href="#">Social</a>
    </div>
    <div class="footer-links">
      <h4>Support</h4>
      <a href="#">FAQ</a>
      <a href="mailto:{{contactEmail}}">Contact</a>
      <a href="#">Privacy Policy</a>
    </div>
    <div class="footer-bottom">
      <span>Privacy Policy &middot; Terms</span>
      <span>All rights reserved &copy; {{brandName}} 2025</span>
    </div>
  </footer>

</body>
</html>`;
