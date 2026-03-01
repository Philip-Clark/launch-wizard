import { GoogleGenAI } from "@google/genai";

var apiKey = import.meta.env.VITE_GEMINI_API_KEY;
var ai = apiKey ? new GoogleGenAI({ apiKey: apiKey }) : null;

function buildSchema(template) {
  var properties = {};
  var required = [];

  properties.brandName = { type: "STRING" };
  required.push("brandName");

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

  return {
    type: "OBJECT",
    properties: properties,
    required: required,
  };
}

function buildPrompt(brandName, ctaIntent, description, template, businessType) {
  var lines = [
    "You are a website copywriter. Generate all text content for a single-page landing site.",
    "",
    "Brand name: " + brandName,
  ];

  if (businessType) {
    lines.push("Business type: " + businessType);
  }

  lines.push("What visitors should do: " + ctaIntent);
  lines.push("Business description: " + description);
  lines.push("");
  lines.push("The page uses the \"" + template.name + "\" template with these sections (in order):");
  lines.push("");

  /* Build a lookup from field key → field definition */
  var fieldMap = {};
  (template.contentFields || []).forEach(function (f) {
    fieldMap[f.key] = f;
  });

  /* List sections with grouped fields */
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

  /* Stats section (from statFields) */
  if (template.statFields && template.statFields.length) {
    lines.push("## Stats");
    lines.push("Purpose: Impressive but believable metrics that build credibility");
    (template.statFields).forEach(function (s) {
      lines.push("  - " + s.numKey + ": stat number (e.g. " + s.numPh + ")");
      lines.push("  - " + s.labelKey + ": short label (e.g. " + s.labelPh + ")");
    });
    lines.push("");
  }

  /* Global fields not in any section */
  lines.push("## Global");
  lines.push("  - contactEmail: a professional email for the brand (e.g. hello@brand.com)");
  lines.push("");

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

  return lines.join("\n");
}

export function generateSiteContent(brandName, ctaIntent, description, template, businessType) {
  if (!ai) {
    return Promise.reject(new Error("No API key configured. Set VITE_GEMINI_API_KEY in .env"));
  }

  var schema = buildSchema(template);
  var prompt = buildPrompt(brandName, ctaIntent, description, template, businessType);

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
