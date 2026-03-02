/* Page types catalog — defines all possible page types for the wizard */

export var PAGE_TYPES = [
  {
    id: "about",
    title: "About",
    filename: "about.html",
    description: "Company story, mission, and values",
    promptHint: "An about page with a hero heading and subheading, a mission statement section, and 3 core values in a card grid. Use .page-hero for the header, .content-section for the mission, and .custom-grid + .custom-card for the values.",
    keywords: [
      "about", "story", "mission", "team", "who we are", "our journey",
      "history", "founded", "founder", "values", "culture",
      "bakery", "restaurant", "studio", "agency", "shop", "boutique",
      "wellness", "fitness", "coaching", "consulting", "charity",
      "nonprofit", "craft", "artisan", "handmade", "local",
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    filename: "pricing.html",
    description: "Pricing tiers and plans",
    promptHint: "A pricing page with a hero heading and subheading, then 3 pricing tiers in a .custom-grid. Each .custom-card shows tier name (h3), price (bold paragraph), description, and 3 bullet features. The middle card is the recommended option.",
    keywords: [
      "price", "pricing", "cost", "plan", "tier", "subscription",
      "fee", "rate", "package", "billing", "pay", "afford",
      "saas", "software", "app", "platform", "tool",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    filename: "contact.html",
    description: "Contact information and social links",
    promptHint: "A contact page with hero heading and subheading, then contact cards in a .custom-grid: email card and phone card, each with an HTML entity icon, heading, and contact detail.",
    keywords: [
      "contact", "reach", "email", "call", "phone", "touch",
      "visit", "location", "address", "appointment", "book",
      "consultation", "inquiry", "quote",
    ],
  },
  {
    id: "services",
    title: "Services",
    filename: "services.html",
    description: "Detailed list of services or offerings",
    promptHint: "A services page with hero heading and subheading, then 4-6 service cards in a .custom-grid. Each .custom-card has an HTML entity icon, service title (h3), and 2-sentence description. Make services specific to the business.",
    keywords: [
      "service", "services", "offering", "what we do", "solutions",
      "consulting", "agency", "freelance", "contractor", "repair",
      "cleaning", "design", "development", "marketing", "coaching",
      "training", "workshop", "therapy", "treatment", "spa",
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    filename: "faq.html",
    description: "Frequently asked questions",
    promptHint: "A FAQ page with hero heading and subheading, then 6-8 question/answer pairs. Each pair is a .faq-item div containing an h3 (question) and p (answer). Questions should address real concerns specific to this business type.",
    keywords: [
      "faq", "question", "help", "support", "how does", "what is",
      "return", "refund", "shipping", "warranty", "policy",
      "subscription", "cancel", "trial",
    ],
  },
  {
    id: "team",
    title: "Team",
    filename: "team.html",
    description: "Team members and leadership",
    promptHint: "A team page with hero heading and subheading, then 4-6 team member cards in a .team-grid. Each .team-member has a name (h3) and role/bio (p). Use realistic names and roles relevant to the business type.",
    keywords: [
      "team", "staff", "people", "leadership", "founder", "crew",
      "employees", "management", "director", "partner",
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    filename: "portfolio.html",
    description: "Portfolio or project showcase",
    promptHint: "A portfolio page with hero heading and subheading, then 4-6 project cards in a .custom-grid. Each .custom-card has a project title (h3), category label, and short description. Projects should be relevant to the business type.",
    keywords: [
      "portfolio", "work", "projects", "case study", "showcase",
      "gallery", "photography", "design", "creative", "art",
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    filename: "testimonials.html",
    description: "Customer reviews and testimonials",
    promptHint: "A testimonials page with hero heading and subheading, then 4-6 testimonial cards in a .custom-grid. Each .custom-card has a blockquote with the testimonial text, then author name (h3) and role/company (p). Quotes should feel authentic and specific.",
    keywords: [
      "testimonial", "review", "feedback", "customer", "client",
      "success story", "case study", "results", "rating",
    ],
  },
  {
    id: "features",
    title: "Features",
    filename: "features.html",
    description: "Product or service features in detail",
    promptHint: "A features page with hero heading and subheading, then 6 feature cards in a .custom-grid. Each .custom-card has an HTML entity icon, feature title (h3), and 2-sentence description. Features should be specific to the product/service.",
    keywords: [
      "feature", "capabilities", "benefits", "advantages", "why us",
      "comparison", "integration", "automation", "analytics", "dashboard",
    ],
  },
  {
    id: "blog",
    title: "Blog",
    filename: "blog.html",
    description: "Blog post listing page",
    promptHint: "A blog page with hero heading and subheading, then 3-4 blog post preview cards in a .custom-grid. Each .custom-card has a date (small text), post title (h3), 2-sentence excerpt (p), and a 'Read More' text link. Topics should be relevant to the business.",
    keywords: [
      "blog", "news", "article", "post", "update", "journal",
      "insights", "tips", "resource", "guide",
    ],
  },
];

export function getPageType(id) {
  for (var i = 0; i < PAGE_TYPES.length; i++) {
    if (PAGE_TYPES[i].id === id) return PAGE_TYPES[i];
  }
  return null;
}

export function isCustomPage(pageId, templatePages) {
  var templateIds = (templatePages || []).map(function (p) { return p.id; });
  return templateIds.indexOf(pageId) === -1;
}
