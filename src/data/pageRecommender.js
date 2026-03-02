/* Page recommender — keyword-based, no AI dependency */

import { PAGE_TYPES } from "./pageTypes";

/* ── Business type → recommended pages mapping ─────────── */
var BUSINESS_TYPE_PAGES = {
  // Tech / SaaS
  saas: ["pricing", "features", "faq", "testimonials"],
  software: ["pricing", "features", "faq", "testimonials"],
  app: ["pricing", "features", "faq"],
  platform: ["pricing", "features", "faq", "testimonials"],
  startup: ["about", "pricing", "features", "team"],
  tech: ["pricing", "features", "faq"],

  // Services / Professional
  agency: ["services", "portfolio", "team", "about"],
  consulting: ["services", "about", "testimonials", "team"],
  freelance: ["services", "portfolio", "testimonials", "about"],
  coaching: ["services", "about", "testimonials", "faq"],
  marketing: ["services", "portfolio", "team", "testimonials"],
  design: ["services", "portfolio", "team", "about"],
  development: ["services", "portfolio", "team", "faq"],
  accounting: ["services", "about", "team", "faq"],
  legal: ["services", "about", "team", "faq"],
  law: ["services", "about", "team", "faq"],

  // Health / Wellness
  fitness: ["services", "about", "testimonials", "team"],
  gym: ["services", "pricing", "about", "testimonials"],
  yoga: ["services", "about", "testimonials", "team"],
  spa: ["services", "about", "testimonials", "pricing"],
  wellness: ["services", "about", "testimonials", "team"],
  therapy: ["services", "about", "faq", "team"],
  clinic: ["services", "about", "team", "faq"],
  dental: ["services", "about", "team", "faq"],
  medical: ["services", "about", "team", "faq"],

  // Food / Hospitality
  restaurant: ["about", "testimonials", "contact"],
  cafe: ["about", "testimonials", "contact"],
  bakery: ["about", "testimonials", "contact"],
  bar: ["about", "testimonials", "contact"],
  catering: ["services", "about", "testimonials", "contact"],
  hotel: ["services", "about", "testimonials", "faq"],

  // Creative
  photography: ["portfolio", "about", "testimonials", "services"],
  photographer: ["portfolio", "about", "testimonials", "services"],
  studio: ["portfolio", "about", "services", "team"],
  artist: ["portfolio", "about", "testimonials"],
  music: ["portfolio", "about", "testimonials"],
  video: ["portfolio", "services", "about", "testimonials"],

  // Retail / E-commerce
  shop: ["about", "testimonials", "faq", "contact"],
  store: ["about", "testimonials", "faq", "contact"],
  boutique: ["about", "testimonials", "contact"],
  ecommerce: ["about", "faq", "testimonials", "features"],

  // Education
  school: ["about", "team", "faq", "testimonials"],
  tutor: ["services", "about", "testimonials", "faq"],
  course: ["pricing", "features", "faq", "testimonials"],
  training: ["services", "pricing", "about", "testimonials"],
  education: ["about", "services", "team", "faq"],

  // Non-profit
  charity: ["about", "team", "testimonials", "blog"],
  nonprofit: ["about", "team", "testimonials", "blog"],
  foundation: ["about", "team", "testimonials", "blog"],

  // Real estate / Construction
  realestate: ["services", "portfolio", "about", "testimonials"],
  "real estate": ["services", "portfolio", "about", "testimonials"],
  construction: ["services", "portfolio", "about", "team"],
  architect: ["portfolio", "services", "about", "team"],
  contractor: ["services", "portfolio", "about", "testimonials"],

  // Other
  blog: ["blog", "about", "contact"],
  podcast: ["about", "blog", "contact"],
  event: ["services", "about", "faq", "testimonials"],
  wedding: ["services", "portfolio", "testimonials", "faq"],
  plumber: ["services", "about", "testimonials", "faq"],
  cleaning: ["services", "pricing", "testimonials", "faq"],
  repair: ["services", "about", "testimonials", "faq"],
  pet: ["services", "about", "testimonials", "faq"],
  salon: ["services", "about", "testimonials", "team"],
  barber: ["services", "about", "testimonials", "team"],
  insurance: ["services", "about", "faq", "testimonials"],
};

function textContainsAny(text, keywords) {
  var lower = text.toLowerCase();
  for (var i = 0; i < keywords.length; i++) {
    if (lower.indexOf(keywords[i]) !== -1) return true;
  }
  return false;
}

function getBusinessTypePages(businessType) {
  if (!businessType) return [];
  var lower = businessType.toLowerCase().trim();

  // Try exact match first
  if (BUSINESS_TYPE_PAGES[lower]) return BUSINESS_TYPE_PAGES[lower];

  // Try matching each key as a substring of the business type
  var keys = Object.keys(BUSINESS_TYPE_PAGES);
  for (var i = 0; i < keys.length; i++) {
    if (lower.indexOf(keys[i]) !== -1) return BUSINESS_TYPE_PAGES[keys[i]];
  }

  return [];
}

export function recommendPages(formData, template) {
  if (!template || !template.pages) return ["home"];

  var templatePageIds = template.pages.map(function (p) { return p.id; });

  var text = [
    formData.brandName || "",
    formData.businessType || "",
    formData.description || "",
    formData.ctaIntent || "",
  ].join(" ");

  // Always start with home + all template-defined pages
  var recommended = templatePageIds.slice();

  if (!text.trim()) return recommended;

  // 1) Business-type-based suggestions (highest priority)
  var btPages = getBusinessTypePages(formData.businessType);
  for (var b = 0; b < btPages.length; b++) {
    if (recommended.indexOf(btPages[b]) === -1) {
      recommended.push(btPages[b]);
    }
  }

  // 2) Keyword-based suggestions from PAGE_TYPES catalog (fill remaining slots)
  for (var i = 0; i < PAGE_TYPES.length; i++) {
    var pt = PAGE_TYPES[i];
    if (recommended.indexOf(pt.id) !== -1) continue;
    if (textContainsAny(text, pt.keywords)) {
      recommended.push(pt.id);
    }
  }

  // Cap total at 6 pages
  if (recommended.length > 6) {
    recommended = recommended.slice(0, 6);
  }

  return recommended;
}
