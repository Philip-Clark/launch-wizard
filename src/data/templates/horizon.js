export var name = "Horizon";
export var defaultColors = { primary: "#4F46E5", secondary: "#1E293B", tertiary: "#64748B" };

export var contentFields = [
  { key: "tagline", label: "Tagline", type: "text", placeholder: "One catchy sentence about your product" },
  { key: "heroHeading", label: "Hero Heading", type: "text", placeholder: "Bold attention-grabbing headline" },
  { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "Start Free Trial" },
  { key: "ctaUrl", label: "Button Link URL", type: "text", placeholder: "https://yoursite.com/signup", skipGenerate: true },
  { key: "contactEmail", label: "Contact Email", type: "text", placeholder: "hello@yourbrand.com" },
  { key: "howItWorksHeading", label: "How It Works Heading", type: "text", placeholder: "How It Works" },
  { key: "stepTitle1", label: "Step 1 Title", type: "text", placeholder: "Sign Up" },
  { key: "stepDesc1", label: "Step 1 Description", type: "text", placeholder: "Create your account in seconds" },
  { key: "stepTitle2", label: "Step 2 Title", type: "text", placeholder: "Configure" },
  { key: "stepDesc2", label: "Step 2 Description", type: "text", placeholder: "Set up your workspace" },
  { key: "stepTitle3", label: "Step 3 Title", type: "text", placeholder: "Launch" },
  { key: "stepDesc3", label: "Step 3 Description", type: "text", placeholder: "Go live and start growing" },
  { key: "featureSectionHeading", label: "Features Heading", type: "text", placeholder: "Powerful Features" },
  { key: "featureTitle1", label: "Feature 1 Title", type: "text", placeholder: "Analytics Dashboard" },
  { key: "featureDesc1", label: "Feature 1 Description", type: "text", placeholder: "Description of feature one" },
  { key: "featureTitle2", label: "Feature 2 Title", type: "text", placeholder: "Automation Tools" },
  { key: "featureDesc2", label: "Feature 2 Description", type: "text", placeholder: "Description of feature two" },
  { key: "featureTitle3", label: "Feature 3 Title", type: "text", placeholder: "Team Management" },
  { key: "featureDesc3", label: "Feature 3 Description", type: "text", placeholder: "Description of feature three" },
  { key: "testimonialsHeading", label: "Testimonials Heading", type: "text", placeholder: "What Our Customers Say" },
  { key: "testimonial1Quote", label: "Testimonial 1 Quote", type: "text", placeholder: "This product changed our workflow" },
  { key: "testimonial1Author", label: "Testimonial 1 Author", type: "text", placeholder: "Alex Johnson" },
  { key: "testimonial1Role", label: "Testimonial 1 Role", type: "text", placeholder: "CEO, TechCorp" },
  { key: "testimonial2Quote", label: "Testimonial 2 Quote", type: "text", placeholder: "Best tool we have ever used" },
  { key: "testimonial2Author", label: "Testimonial 2 Author", type: "text", placeholder: "Sarah Chen" },
  { key: "testimonial2Role", label: "Testimonial 2 Role", type: "text", placeholder: "CTO, StartupXYZ" },
  { key: "pricingHeading", label: "Pricing Heading", type: "text", placeholder: "Simple, Transparent Pricing" },
  { key: "priceTier1Name", label: "Tier 1 Name", type: "text", placeholder: "Starter" },
  { key: "priceTier1Price", label: "Tier 1 Price", type: "text", placeholder: "$9/mo" },
  { key: "priceTier1Desc", label: "Tier 1 Description", type: "text", placeholder: "For individuals getting started" },
  { key: "priceTier2Name", label: "Tier 2 Name", type: "text", placeholder: "Pro" },
  { key: "priceTier2Price", label: "Tier 2 Price", type: "text", placeholder: "$29/mo" },
  { key: "priceTier2Desc", label: "Tier 2 Description", type: "text", placeholder: "For growing teams" },
  { key: "priceTier3Name", label: "Tier 3 Name", type: "text", placeholder: "Enterprise" },
  { key: "priceTier3Price", label: "Tier 3 Price", type: "text", placeholder: "Custom" },
  { key: "priceTier3Desc", label: "Tier 3 Description", type: "text", placeholder: "For large organizations" },
  { key: "ctaSectionHeading", label: "CTA Heading", type: "text", placeholder: "Ready to Transform Your Business?" },
];

export var statFields = [];

export var colorElements = [
  { key: "buttonColorAssign", label: "Buttons", selector: ".btn-primary" },
  { key: "stepAccentColorAssign", label: "Step Numbers", selector: ".step-number" },
  { key: "pricingHighlightColorAssign", label: "Pricing Highlight", selector: ".price-card.featured" },
  { key: "footerBgColorAssign", label: "Footer Background", selector: "footer" },
];

export var imageSlots = {
  hero: true,
  featureImages: 0,
  hasGallery: false,
  hasPortfolio: false,
};

export var sections = [
  { heading: "Hero", purpose: "Clean, professional hero for a SaaS or business product", fields: ["heroHeading", "tagline", "ctaText"] },
  { heading: "How It Works", purpose: "3 numbered steps explaining the user journey or onboarding process", fields: ["howItWorksHeading", "stepTitle1", "stepDesc1", "stepTitle2", "stepDesc2", "stepTitle3", "stepDesc3"] },
  { heading: "Features", purpose: "3 feature cards highlighting key product capabilities", fields: ["featureSectionHeading", "featureTitle1", "featureDesc1", "featureTitle2", "featureDesc2", "featureTitle3", "featureDesc3"] },
  { heading: "Testimonials", purpose: "2 customer testimonials from different personas", fields: ["testimonialsHeading", "testimonial1Quote", "testimonial1Author", "testimonial1Role", "testimonial2Quote", "testimonial2Author", "testimonial2Role"] },
  { heading: "Pricing", purpose: "3 pricing tiers from basic to enterprise", fields: ["pricingHeading", "priceTier1Name", "priceTier1Price", "priceTier1Desc", "priceTier2Name", "priceTier2Price", "priceTier2Desc", "priceTier3Name", "priceTier3Price", "priceTier3Desc"] },
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
      --step-accent-bg: {{stepAccentBg}};
      --step-accent-text: {{stepAccentText}};
      --pricing-highlight-bg: {{pricingHighlightBg}};
      --pricing-highlight-text: {{pricingHighlightText}};
      --footer-bg: {{footerBg}};
      --footer-text-bright: {{footerTextBright}};
      --footer-text-muted: {{footerTextMuted}};
      --bg: #F8FAFC;
      --bg-card: #FFFFFF;
      --text: #1E293B;
      --muted: #64748B;
      --radius: 0.75rem;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.03);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.05);
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }

    img { display: block; max-width: 100%; height: auto; }
    a { text-decoration: none; color: inherit; }

    /* ── NAV ─────────────────────────────────── */
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 5vw;
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(248,250,252,0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #E2E8F0;
    }
    .nav-logo {
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
      color: var(--text);
    }
    .nav-logo-img { height: 34px; width: auto; }
    .nav-links { display: flex; gap: 2rem; align-items: center; }
    .nav-links a {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--muted);
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text); }

    /* ── HERO ────────────────────────────────── */
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 5rem 5vw 4rem;
    }
    .hero-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 720px;
      margin-bottom: 3rem;
    }
    .hero-text h1 {
      font-size: clamp(2.5rem, 5vw, 3.75rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.03em;
      margin-bottom: 1.25rem;
      color: var(--text);
    }
    .hero-text p {
      font-size: 1.15rem;
      color: var(--muted);
      max-width: 560px;
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    .hero-img {
      border-radius: var(--radius);
      width: 100%;
      max-width: 960px;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: linear-gradient(135deg, #EEF2FF, #E0E7FF);
      box-shadow: var(--shadow-md);
      border: 1px solid #E2E8F0;
    }

    /* ── CTA BUTTON ──────────────────────────── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.95rem;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      min-height: 44px;
    }
    .btn-primary {
      background: var(--btn-bg);
      color: var(--btn-text);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(79,70,229,0.3);
    }
    .btn-primary .arrow {
      display: inline-flex;
      align-items: center;
      font-size: 1rem;
      transition: transform 0.2s;
    }
    .btn-primary:hover .arrow { transform: translateX(3px); }

    /* ── HOW IT WORKS ────────────────────────── */
    .how-it-works {
      padding: 5rem 5vw;
      text-align: center;
    }
    .how-it-works h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 3rem;
      color: var(--text);
    }
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .step-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem 1.5rem;
    }
    .step-number {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--step-accent-bg);
      color: var(--step-accent-text);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.1rem;
      margin-bottom: 1.25rem;
      flex-shrink: 0;
    }
    .step-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    .step-card p {
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.65;
    }

    /* ── FEATURES ─────────────────────────────── */
    .features {
      padding: 5rem 5vw;
      text-align: center;
      background: var(--bg-card);
      border-top: 1px solid #E2E8F0;
      border-bottom: 1px solid #E2E8F0;
    }
    .features h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 3rem;
      color: var(--text);
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      max-width: 1060px;
      margin: 0 auto;
    }
    .feature-card {
      background: var(--bg);
      border-radius: var(--radius);
      padding: 2rem 1.75rem;
      text-align: left;
      border: 1px solid #E2E8F0;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .feature-card .card-icon {
      width: 40px;
      height: 40px;
      border-radius: 0.5rem;
      background: var(--step-accent-bg);
      color: var(--step-accent-text);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    .feature-card p {
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.65;
    }

    /* ── TESTIMONIALS ─────────────────────────── */
    .testimonials {
      padding: 5rem 5vw;
      text-align: center;
    }
    .testimonials h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 3rem;
      color: var(--text);
    }
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .testimonial-card {
      background: var(--bg-card);
      border-radius: var(--radius);
      padding: 2.5rem 2rem;
      text-align: left;
      box-shadow: var(--shadow-sm);
      border: 1px solid #E2E8F0;
    }
    .testimonial-card .quote-mark {
      font-size: 2.5rem;
      line-height: 1;
      color: var(--primary);
      opacity: 0.3;
      margin-bottom: 0.5rem;
    }
    .testimonial-card blockquote {
      font-size: 0.95rem;
      color: var(--text);
      line-height: 1.7;
      margin-bottom: 1.5rem;
      font-style: italic;
    }
    .testimonial-card .author {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text);
    }
    .testimonial-card .role {
      font-size: 0.8rem;
      color: var(--muted);
    }

    /* ── PRICING ──────────────────────────────── */
    .pricing {
      padding: 5rem 5vw;
      text-align: center;
      background: var(--bg-card);
      border-top: 1px solid #E2E8F0;
      border-bottom: 1px solid #E2E8F0;
    }
    .pricing h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 3rem;
      color: var(--text);
    }
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      max-width: 960px;
      margin: 0 auto;
      align-items: start;
    }
    .price-card {
      background: var(--bg);
      border-radius: var(--radius);
      padding: 2.5rem 2rem;
      border: 1px solid #E2E8F0;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .price-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .price-card.featured {
      background: var(--pricing-highlight-bg);
      color: var(--pricing-highlight-text);
      border-color: transparent;
      transform: scale(1.05);
      box-shadow: var(--shadow-md);
    }
    .price-card.featured:hover {
      transform: scale(1.05) translateY(-4px);
    }
    .price-card .tier-name {
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.75rem;
      opacity: 0.8;
    }
    .price-card .tier-price {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 0.75rem;
      line-height: 1.1;
    }
    .price-card .tier-desc {
      font-size: 0.9rem;
      line-height: 1.6;
      opacity: 0.75;
      margin-bottom: 2rem;
    }
    .price-card .btn {
      width: 100%;
      justify-content: center;
    }
    .price-card.featured .btn-primary {
      background: var(--pricing-highlight-text);
      color: var(--pricing-highlight-bg);
    }

    /* ── BOTTOM CTA ──────────────────────────── */
    .bottom-cta {
      padding: 6rem 5vw;
      text-align: center;
      background: var(--primary);
      color: #FFFFFF;
      margin: 0 2vw;
      border-radius: var(--radius) var(--radius) 0 0;
    }
    .bottom-cta h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      max-width: 640px;
      margin: 0 auto 1rem;
      color: #FFFFFF;
    }
    .bottom-cta p {
      color: rgba(255,255,255,0.8);
      max-width: 520px;
      margin: 0 auto 2rem;
      line-height: 1.7;
    }
    .bottom-cta .btn-primary {
      background: #FFFFFF;
      color: var(--primary);
    }
    .bottom-cta .btn-primary:hover {
      box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    }

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
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 1.5rem;
      margin-top: 1rem;
      font-size: 0.75rem;
    }

    /* ── RESPONSIVE ───────────────────────────── */
    @media (max-width: 768px) {
      .hero { padding: 3rem 5vw 2.5rem; }
      .hero-text h1 { font-size: 2rem; }
      .steps-grid { grid-template-columns: 1fr; gap: 1rem; }
      .step-card { padding: 1.5rem; }
      .features-grid { grid-template-columns: 1fr; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .pricing-grid { grid-template-columns: 1fr; }
      .price-card.featured { transform: none; }
      .price-card.featured:hover { transform: translateY(-4px); }
      .bottom-cta { margin: 0; border-radius: 0; padding: 4rem 5vw; }
      footer { flex-direction: column; }
      .footer-bottom { flex-direction: column; gap: 0.5rem; }
    }

    @media (max-width: 480px) {
      .nav-links { gap: 1rem; }
      .nav-links a { font-size: 0.8rem; }
      .hero-text p { font-size: 1rem; }
      .price-card .tier-price { font-size: 2rem; }
    }
  </style>
</head>
<body>

  <nav>
    {{logoTag}}
    <div class="nav-links">
      <a href="#how-it-works">How It Works</a>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
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
    {{heroImageTag}}
  </section>

  <!-- HOW IT WORKS -->
  <section class="how-it-works" id="how-it-works">
    <h2 data-field="howItWorksHeading">{{howItWorksHeading}}</h2>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-number">1</div>
        <h3 data-field="stepTitle1">{{stepTitle1}}</h3>
        <p data-field="stepDesc1">{{stepDesc1}}</p>
      </div>
      <div class="step-card">
        <div class="step-number">2</div>
        <h3 data-field="stepTitle2">{{stepTitle2}}</h3>
        <p data-field="stepDesc2">{{stepDesc2}}</p>
      </div>
      <div class="step-card">
        <div class="step-number">3</div>
        <h3 data-field="stepTitle3">{{stepTitle3}}</h3>
        <p data-field="stepDesc3">{{stepDesc3}}</p>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features" id="features">
    <h2 data-field="featureSectionHeading">{{featureSectionHeading}}</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="card-icon">&#9881;</div>
        <h3 data-field="featureTitle1">{{featureTitle1}}</h3>
        <p data-field="featureDesc1">{{featureDesc1}}</p>
      </div>
      <div class="feature-card">
        <div class="card-icon">&#9889;</div>
        <h3 data-field="featureTitle2">{{featureTitle2}}</h3>
        <p data-field="featureDesc2">{{featureDesc2}}</p>
      </div>
      <div class="feature-card">
        <div class="card-icon">&#9733;</div>
        <h3 data-field="featureTitle3">{{featureTitle3}}</h3>
        <p data-field="featureDesc3">{{featureDesc3}}</p>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonials" id="testimonials">
    <h2 data-field="testimonialsHeading">{{testimonialsHeading}}</h2>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <div class="quote-mark">&ldquo;</div>
        <blockquote data-field="testimonial1Quote">{{testimonial1Quote}}</blockquote>
        <div class="author" data-field="testimonial1Author">{{testimonial1Author}}</div>
        <div class="role" data-field="testimonial1Role">{{testimonial1Role}}</div>
      </div>
      <div class="testimonial-card">
        <div class="quote-mark">&ldquo;</div>
        <blockquote data-field="testimonial2Quote">{{testimonial2Quote}}</blockquote>
        <div class="author" data-field="testimonial2Author">{{testimonial2Author}}</div>
        <div class="role" data-field="testimonial2Role">{{testimonial2Role}}</div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section class="pricing" id="pricing">
    <h2 data-field="pricingHeading">{{pricingHeading}}</h2>
    <div class="pricing-grid">
      <div class="price-card">
        <div class="tier-name" data-field="priceTier1Name">{{priceTier1Name}}</div>
        <div class="tier-price" data-field="priceTier1Price">{{priceTier1Price}}</div>
        <div class="tier-desc" data-field="priceTier1Desc">{{priceTier1Desc}}</div>
        <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">
          {{ctaText}} <span class="arrow">&rarr;</span>
        </a>
      </div>
      <div class="price-card featured">
        <div class="tier-name" data-field="priceTier2Name">{{priceTier2Name}}</div>
        <div class="tier-price" data-field="priceTier2Price">{{priceTier2Price}}</div>
        <div class="tier-desc" data-field="priceTier2Desc">{{priceTier2Desc}}</div>
        <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">
          {{ctaText}} <span class="arrow">&rarr;</span>
        </a>
      </div>
      <div class="price-card">
        <div class="tier-name" data-field="priceTier3Name">{{priceTier3Name}}</div>
        <div class="tier-price" data-field="priceTier3Price">{{priceTier3Price}}</div>
        <div class="tier-desc" data-field="priceTier3Desc">{{priceTier3Desc}}</div>
        <a class="btn btn-primary" data-field="ctaText" href="{{ctaUrl}}">
          {{ctaText}} <span class="arrow">&rarr;</span>
        </a>
      </div>
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
      <h4>Product</h4>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#how-it-works">How It Works</a>
    </div>
    <div class="footer-links">
      <h4>Connect</h4>
      <a href="mailto:{{contactEmail}}" data-field="contactEmail">Email</a>
      <a href="#">Newsletter</a>
      <a href="#">Social</a>
    </div>
    <div class="footer-links">
      <h4>Support</h4>
      <a href="#">Help Center</a>
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
