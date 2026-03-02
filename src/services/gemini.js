import { GoogleGenAI } from "@google/genai";
import { PAGE_TYPES, getPageType, isCustomPage } from "../data/pageTypes";

var apiKey = import.meta.env.VITE_GEMINI_API_KEY;
var ai = apiKey ? new GoogleGenAI({ apiKey: apiKey }) : null;

function getActivePages(template, selectedPages) {
  if (!template.pages || template.pages.length <= 1) return null;
  if (!selectedPages) return template.pages;
  return template.pages.filter(function (p) {
    return selectedPages.indexOf(p.id) !== -1;
  });
}

function getCustomPageIds(template, selectedPages) {
  if (!selectedPages || !template.pages) return [];
  return selectedPages.filter(function (id) {
    return isCustomPage(id, template.pages);
  });
}

function buildSchema(template, selectedPages) {
  var properties = {};
  var required = [];

  properties.brandName = { type: "STRING" };
  required.push("brandName");

  var activePages = getActivePages(template, selectedPages);

  if (activePages) {
    // Multi-page: only include fields from selected pages
    activePages.forEach(function (page) {
      (page.contentFields || []).forEach(function (f) {
        if (f.skipGenerate) return;
        properties[f.key] = { type: "STRING" };
        required.push(f.key);
      });
      (page.statFields || []).forEach(function (s) {
        properties[s.numKey] = { type: "STRING" };
        properties[s.labelKey] = { type: "STRING" };
        required.push(s.numKey);
        required.push(s.labelKey);
      });
    });
  } else {
    // Single-page fallback
    (template.contentFields || []).forEach(function (f) {
      if (f.skipGenerate) return;
      properties[f.key] = { type: "STRING" };
      required.push(f.key);
    });
    (template.statFields || []).forEach(function (s) {
      properties[s.numKey] = { type: "STRING" };
      properties[s.labelKey] = { type: "STRING" };
      required.push(s.numKey);
      required.push(s.labelKey);
    });
  }

  // Custom page HTML fields
  var customIds = getCustomPageIds(template, selectedPages);
  customIds.forEach(function (id) {
    var key = "page_" + id + "_html";
    properties[key] = { type: "STRING" };
    required.push(key);
  });

  return {
    type: "OBJECT",
    properties: properties,
    required: required,
  };
}

function buildPrompt(brandName, ctaIntent, description, template, businessType, selectedPages) {
  var activePages = getActivePages(template, selectedPages);
  var hasPages = activePages && activePages.length > 1;

  var lines = [
    "You are a website copywriter. Generate all text content for a " +
      (hasPages ? "multi-page website" : "single-page landing site") + ".",
    "",
    "Brand name: " + brandName,
  ];

  if (businessType) {
    lines.push("Business type: " + businessType);
  }

  lines.push("What visitors should do: " + ctaIntent);
  lines.push("Business description: " + description);
  lines.push("");

  if (hasPages) {
    lines.push("The site uses the \"" + template.name + "\" template with " + activePages.length + " pages:");
    lines.push("");

    activePages.forEach(function (page) {
      lines.push("# Page: " + page.title + " (" + page.filename + ")");

      /* Build a lookup from field key → field definition for this page */
      var pageFieldMap = {};
      (page.contentFields || []).forEach(function (f) {
        pageFieldMap[f.key] = f;
      });

      (page.sections || []).forEach(function (section) {
        lines.push("## " + section.heading);
        lines.push("Purpose: " + section.purpose);

        (section.fields || []).forEach(function (key) {
          var f = pageFieldMap[key];
          if (!f || f.skipGenerate) return;
          var hint = f.placeholder || f.label;

          if (key.match(/Heading$/)) {
            lines.push("  - " + key + ": Section heading — tailor it to this specific business (see guidelines below)");
          } else if (f.type === "textarea") {
            lines.push("  - " + key + ": 2-3 engaging sentences (" + hint + ")");
          } else {
            lines.push("  - " + key + ": " + hint);
          }
        });

        lines.push("");
      });

      /* Stats section for this page */
      if (page.statFields && page.statFields.length) {
        lines.push("## Stats");
        lines.push("Purpose: Impressive but believable metrics that build credibility");
        (page.statFields).forEach(function (s) {
          lines.push("  - " + s.numKey + ": stat number (e.g. " + s.numPh + ")");
          lines.push("  - " + s.labelKey + ": short label (e.g. " + s.labelPh + ")");
        });
        lines.push("");
      }
    });
  } else {
    /* Legacy single-page prompt */
    var singlePages = activePages || [];
    var singlePage = singlePages.length === 1 ? singlePages[0] : null;

    if (singlePage) {
      lines.push("The page uses the \"" + template.name + "\" template with these sections:");
      lines.push("");

      var pageFieldMap2 = {};
      (singlePage.contentFields || []).forEach(function (f) {
        pageFieldMap2[f.key] = f;
      });

      (singlePage.sections || []).forEach(function (section) {
        lines.push("## " + section.heading);
        lines.push("Purpose: " + section.purpose);
        (section.fields || []).forEach(function (key) {
          var f = pageFieldMap2[key];
          if (!f || f.skipGenerate) return;
          var hint = f.placeholder || f.label;
          if (key.match(/Heading$/)) {
            lines.push("  - " + key + ": Section heading — tailor it to this specific business (see guidelines below)");
          } else if (f.type === "textarea") {
            lines.push("  - " + key + ": 2-3 engaging sentences (" + hint + ")");
          } else {
            lines.push("  - " + key + ": " + hint);
          }
        });
        lines.push("");
      });

      if (singlePage.statFields && singlePage.statFields.length) {
        lines.push("## Stats");
        lines.push("Purpose: Impressive but believable metrics that build credibility");
        (singlePage.statFields).forEach(function (s) {
          lines.push("  - " + s.numKey + ": stat number (e.g. " + s.numPh + ")");
          lines.push("  - " + s.labelKey + ": short label (e.g. " + s.labelPh + ")");
        });
        lines.push("");
      }
    } else {
      lines.push("The page uses the \"" + template.name + "\" template with these sections (in order):");
      lines.push("");

      var fieldMap = {};
      (template.contentFields || []).forEach(function (f) {
        fieldMap[f.key] = f;
      });

      (template.sections || []).forEach(function (section) {
        lines.push("## " + section.heading);
        lines.push("Purpose: " + section.purpose);

        (section.fields || []).forEach(function (key) {
          var f = fieldMap[key];
          if (!f || f.skipGenerate) return;
          var hint = f.placeholder || f.label;

          if (key.match(/Heading$/)) {
            lines.push("  - " + key + ": Section heading — tailor it to this specific business (see guidelines below)");
          } else if (f.type === "textarea") {
            lines.push("  - " + key + ": 2-3 engaging sentences (" + hint + ")");
          } else {
            lines.push("  - " + key + ": " + hint);
          }
        });

        lines.push("");
      });

      if (template.statFields && template.statFields.length) {
        lines.push("## Stats");
        lines.push("Purpose: Impressive but believable metrics that build credibility");
        (template.statFields).forEach(function (s) {
          lines.push("  - " + s.numKey + ": stat number (e.g. " + s.numPh + ")");
          lines.push("  - " + s.labelKey + ": short label (e.g. " + s.labelPh + ")");
        });
        lines.push("");
      }
    }
  }

  /* Global fields not in any section */
  lines.push("## Global");
  lines.push("  - contactEmail: a professional email for the brand (e.g. hello@brand.com)");
  lines.push("");

  /* Custom (AI-generated) pages */
  var customIds = getCustomPageIds(template, selectedPages);
  if (customIds.length > 0) {
    lines.push("# AI-Generated Pages");
    lines.push("");
    lines.push("For each page below, generate the HTML body content only — do NOT include <html>, <head>, <body>, <nav>, or <footer> tags.");
    lines.push("The CSS + nav + footer are provided by the template shell automatically.");
    lines.push("");
    lines.push("Available CSS classes you should use:");
    lines.push("  .page-hero — full-width centered header section (contains h1 + p)");
    lines.push("  .content-section — padded content block with max-width (contains h2 + p)");
    lines.push("  .custom-grid — responsive CSS grid for cards (use inside a section)");
    lines.push("  .custom-card — card with padding, border, rounded corners, hover effect");
    lines.push("  .faq-item — FAQ question/answer block (contains h3 question + p answer)");
    lines.push("  .team-grid — grid layout for team member cards");
    lines.push("  .team-member — team member card (contains h3 name + p role/bio)");
    lines.push("  .btn .btn-primary — styled call-to-action button");
    lines.push("");
    lines.push("Available CSS variables: var(--primary), var(--text), var(--muted), var(--bg), var(--bg-card), var(--btn-bg), var(--btn-text), var(--radius)");
    lines.push("");
    lines.push("IMPORTANT: Add data-field attributes to all editable text elements using the pattern data-field=\"cp_{pageId}_{n}\" where {pageId} is the page ID and {n} is a sequential number starting at 1.");
    lines.push("Example: <h1 data-field=\"cp_faq_1\">Frequently Asked Questions</h1>");
    lines.push("");

    customIds.forEach(function (id) {
      var pt = getPageType(id);
      if (!pt) return;
      lines.push("## page_" + id + "_html — " + pt.title + " Page");
      lines.push("Hint: " + pt.promptHint);
      lines.push("");
    });
  }

  /* Guidelines */
  lines.push("IMPORTANT guidelines:");
  lines.push("- Section headings (any field ending in 'Heading') MUST be tailored to the specific business type and description. Do NOT use generic defaults like 'Features' or 'About Us'.");
  lines.push("  Examples:");
  lines.push("  * Charity → 'Our Mission' instead of 'About Us', 'How We Help' instead of 'Our Services'");
  lines.push("  * Restaurant → 'Our Specialties' instead of 'Features', 'What Diners Say' instead of 'Testimonials'");
  lines.push("  * Tech startup → 'How It Works' while a spa → 'The Experience'");
  lines.push("  * Fitness brand → 'Real Results' instead of 'Testimonials', 'Your Transformation' instead of 'Our Process'");
  lines.push("- CTA button text should be 2-4 words and action-oriented, specific to the business.");
  lines.push("- All copy should be professional, concise, and compelling.");
  lines.push("- Testimonial quotes should feel authentic and specific to the business type — include concrete details.");
  lines.push("- FAQ answers should directly address real concerns a visitor would have about this specific business.");
  lines.push("- Pricing tier names and descriptions should fit the business model (not every business uses Starter/Pro/Enterprise).");

  if (hasPages) {
    lines.push("- Ensure content for EACH page is complete, cohesive, and unique — avoid repeating the same copy across pages.");
    lines.push("- About page content should tell the brand's authentic story, mission, and values.");
    lines.push("- Contact page headings should be warm and inviting.");
    lines.push("- Pricing page tiers (if applicable) should have realistic names and prices for the business type.");
  }

  return lines.join("\n");
}

export function suggestPages(brandName, businessType, ctaIntent, description, template) {
  if (!ai) {
    return Promise.reject(new Error("No API key configured. Set VITE_GEMINI_API_KEY in .env"));
  }

  var templatePageIds = (template && template.pages || []).map(function (p) { return p.id; });
  var allPageIds = PAGE_TYPES.map(function (pt) { return pt.id; });
  var catalogDesc = PAGE_TYPES.map(function (pt) {
    var isTemplate = templatePageIds.indexOf(pt.id) !== -1;
    return "- " + pt.id + ": " + pt.description + (isTemplate ? " (template built-in)" : " (AI-generated)");
  }).join("\n");

  var prompt = [
    "You are a website strategist. Given a business description, recommend which pages their website should have.",
    "",
    "Brand name: " + (brandName || "Unknown"),
    "Business type: " + (businessType || "General"),
    "What visitors should do: " + (ctaIntent || "Learn more"),
    "Business description: " + (description || "A business website"),
    "",
    "Available page types:",
    catalogDesc,
    "",
    "Rules:",
    "- Always include \"home\" as the first page.",
    "- Recommend 3-6 total pages (including home).",
    "- Choose pages most relevant to this specific business type and goals.",
    "- Template built-in pages are higher quality, prefer them when relevant.",
    "- Only include pages that make sense for this business.",
  ].join("\n");

  var schema = {
    type: "OBJECT",
    properties: {
      pages: {
        type: "ARRAY",
        items: {
          type: "STRING",
          enum: ["home"].concat(allPageIds),
        },
      },
    },
    required: ["pages"],
  };

  return ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  }).then(function (response) {
    var result = JSON.parse(response.text);
    var pages = result.pages || [];
    // Ensure home is always first
    if (pages.indexOf("home") === -1) pages.unshift("home");
    // Filter to valid IDs only
    var validIds = ["home"].concat(allPageIds);
    return pages.filter(function (id) { return validIds.indexOf(id) !== -1; });
  });
}

export function generateSiteContent(brandName, ctaIntent, description, template, businessType, selectedPages) {
  if (!ai) {
    return Promise.reject(new Error("No API key configured. Set VITE_GEMINI_API_KEY in .env"));
  }

  var schema = buildSchema(template, selectedPages);
  var prompt = buildPrompt(brandName, ctaIntent, description, template, businessType, selectedPages);

  return ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  }).then(function (response) {
    return JSON.parse(response.text);
  });
}
