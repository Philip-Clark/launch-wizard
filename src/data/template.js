/* ── Contrast helper ───────────────────────────────────── */
import { getPageType, isCustomPage } from "./pageTypes";

export function getContrastColor(hex) {
  if (!hex || hex.length < 7) return "#1a1a2e";
  var r = parseInt(hex.slice(1, 3), 16) / 255;
  var g = parseInt(hex.slice(3, 5), 16) / 255;
  var b = parseInt(hex.slice(5, 7), 16) / 255;
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  var L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.179 ? "#1a1a2e" : "#ffffff";
}

function isDark(hex) {
  return getContrastColor(hex) === "#ffffff";
}

/* ── Per-element color overrides ──────────────────────── */
function resolveColorValue(val, colorMap) {
  if (val === "primary") return colorMap.primary;
  if (val === "secondary") return colorMap.secondary;
  if (val === "tertiary") return colorMap.tertiary;
  if (val && val.charAt(0) === "#") return val;
  return null;
}

function buildElementOverrideCss(v, colorMap) {
  var rules = [];
  var keys = Object.keys(v);

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var val = v[k];
    if (!val || val === "default") continue;

    // Text color overrides: "<field>__textColor"
    if (k.indexOf("__textColor") !== -1) {
      var fieldName = k.replace("__textColor", "");
      var hex = resolveColorValue(val, colorMap);
      if (hex) {
        rules.push('[data-field="' + fieldName + '"] { color: ' + hex + ' !important; }');
      }
    }

    // Per-section button color overrides: "btn__<section>__colorAssign"
    if (k.indexOf("btn__") === 0 && k.indexOf("__colorAssign") !== -1) {
      var parts = k.split("__");
      if (parts.length === 3) {
        var sectionClass = parts[1];
        var bgHex = (val && val.charAt(0) === "#") ? val : (colorMap[val] || colorMap.primary);
        var textHex = getContrastColor(bgHex);
        rules.push(
          '.' + sectionClass + ' .btn-primary { background: ' + bgHex + ' !important; color: ' + textHex + ' !important; }'
        );
      }
    }
  }

  return rules.length > 0 ? '\n<style id="element-overrides">\n' + rules.join('\n') + '\n</style>' : '';
}

/* ── Custom page utility CSS ──────────────────────────── */
var CUSTOM_PAGE_CSS = `
    .custom-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      max-width: 1060px;
      margin: 0 auto;
      padding: 0 5vw 4rem;
    }
    .custom-card {
      background: var(--bg-card, #fff);
      border-radius: var(--radius, 0.75rem);
      padding: 2rem 1.75rem;
      border: 1px solid #E2E8F0;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .custom-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .custom-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text, #1a1a2e);
    }
    .custom-card p {
      font-size: 0.9rem;
      color: var(--muted, #6b7280);
      line-height: 1.65;
    }
    .faq-item {
      max-width: 860px;
      margin: 0 auto;
      padding: 1.5rem 5vw;
      border-bottom: 1px solid #E2E8F0;
    }
    .faq-item h3 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text, #1a1a2e);
      margin-bottom: 0.5rem;
    }
    .faq-item p {
      font-size: 0.9rem;
      color: var(--muted, #6b7280);
      line-height: 1.7;
    }
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      max-width: 960px;
      margin: 0 auto;
      padding: 0 5vw 4rem;
    }
    .team-member {
      text-align: center;
      padding: 2rem 1.5rem;
    }
    .team-member h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text, #1a1a2e);
      margin-bottom: 0.25rem;
    }
    .team-member p {
      font-size: 0.85rem;
      color: var(--muted, #6b7280);
      line-height: 1.6;
    }
`;

/* ── Apply custom page text overrides ────────────────────── */
function applyCustomTextOverrides(bodyHtml, allValues) {
  if (!bodyHtml || !allValues) return bodyHtml;
  var result = bodyHtml;
  var keys = Object.keys(allValues);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (k.indexOf("cp_") !== 0) continue;
    var val = allValues[k];
    if (!val) continue;
    // Replace text content inside data-field="<k>" elements
    var pattern = new RegExp('(data-field="' + k + '"[^>]*>)[^<]*(<)', 'g');
    result = result.replace(pattern, '$1' + val.replace(/\$/g, '$$$$') + '$2');
  }
  return result;
}

/* ── Fill template ─────────────────────────────────────── */
export function fillTemplate(templateObj, allValues, imageDataUrls, pageId) {
  if (!imageDataUrls) imageDataUrls = [];
  var v = allValues || {};

  /* Resolve which page to render */
  var page = null;
  var htmlTemplate;
  var isCustom = false;
  if (templateObj.pages && templateObj.pages.length > 0) {
    if (pageId) {
      page = templateObj.pages.find(function (p) { return p.id === pageId; });
    }
    // Custom page: not found in template's pages
    if (!page && pageId && isCustomPage(pageId, templateObj.pages)) {
      isCustom = true;
      var customHtml = v["page_" + pageId + "_html"];
      if (customHtml) {
        var bodyWithOverrides = applyCustomTextOverrides(customHtml, v);
        htmlTemplate = templateObj.customPageShell;
        if (!htmlTemplate) return "";
        // We'll inject custom CSS and replace the content token below
        htmlTemplate = htmlTemplate.replace('</style>', CUSTOM_PAGE_CSS + '\n  </style>');
        htmlTemplate = htmlTemplate.replace('{{customPageContent}}', bodyWithOverrides);
      } else {
        // Generation pending — show placeholder
        htmlTemplate = templateObj.customPageShell;
        if (!htmlTemplate) return "";
        var pt = getPageType(pageId);
        var placeholderTitle = pt ? pt.title : pageId;
        var placeholderHtml = '<section class="page-hero"><h1>' + placeholderTitle + '</h1><p>Generating content...</p></section>';
        htmlTemplate = htmlTemplate.replace('{{customPageContent}}', placeholderHtml);
      }
    } else {
      if (!page) page = templateObj.pages[0];
      htmlTemplate = page.htmlTemplate;
    }
  } else {
    htmlTemplate = templateObj.htmlTemplate;
  }

  if (!htmlTemplate) return "";

  var slots = (page && page.imageSlots) || templateObj.imageSlots || {};

  // Color map
  var colorMap = {
    primary: v.colorPrimary || "#D4E157",
    secondary: v.colorSecondary || "#1a1a2e",
    tertiary: v.colorTertiary || "#6b7280",
  };
  function resolve(assign) { return colorMap[assign] || colorMap.primary; }

  // Resolve element colors dynamically from any *ColorAssign keys
  var colorVars = {};
  var btnBg = resolve(v.buttonColorAssign || "primary");
  var footerBg = resolve(v.footerBgColorAssign || "secondary");

  colorVars.btnBg = btnBg;
  colorVars.btnText = getContrastColor(btnBg);
  colorVars.footerBg = footerBg;
  colorVars.footerTextBright = isDark(footerBg) ? "#ffffff" : "#1a1a2e";
  colorVars.footerTextMuted = isDark(footerBg) ? "#999999" : "#6b7280";

  // Generic color assign resolution for any template-specific color elements
  (templateObj.colorElements || []).forEach(function (el) {
    var assignVal = v[el.key] || el.defaultAssign || "primary";
    var resolvedColor = resolve(assignVal);
    // Build CSS var-style tokens based on the key name
    // e.g. badgeColorAssign -> badgeBg, badgeText
    var baseName = el.key.replace("ColorAssign", "");
    colorVars[baseName + "Bg"] = resolvedColor;
    colorVars[baseName + "Text"] = getContrastColor(resolvedColor);
  });

  // Legacy aliases for backward compatibility with existing templates
  colorVars.badgeBg = colorVars.badgeBg || colorVars.btnBg;
  colorVars.badgeText = colorVars.badgeText || colorVars.btnText;
  colorVars.statIconBg = colorVars.statIconBg || colorVars.btnBg;
  colorVars.statIconText = colorVars.statIconText || colorVars.btnText;
  colorVars.quoteBorder = colorVars.quoteBorderBg || colorVars.btnBg;

  // Logo tags
  var brandName = v.brandName || "";
  var logoHomeHref = templateObj.pages && templateObj.pages.length > 1 ? 'index.html' : '#';
  var logoTag = v.logoDataUrl
    ? '<a href="' + logoHomeHref + '" data-page="home"><img class="nav-logo-img" data-field="logo" src="' + v.logoDataUrl + '" alt="' + brandName + '"></a>'
    : '<a href="' + logoHomeHref + '" data-page="home" class="nav-logo" data-field="logo">' + brandName + '</a>';
  var footerLogoTag = v.logoDataUrl
    ? '<img class="footer-logo-img" data-field="logo" src="' + v.logoDataUrl + '" alt="' + brandName + '">'
    : '<div class="logo" data-field="logo">' + brandName + '</div>';

  // Nav links (for multi-page templates)
  var navLinksHtml = "";
  var footerNavLinksHtml = "";
  if (templateObj.pages && templateObj.pages.length > 1) {
    var currentPageId = isCustom ? pageId : (page ? page.id : "home");
    var selectedPages = v.selectedPages || null;
    var visiblePages = selectedPages
      ? templateObj.pages.filter(function (p) { return selectedPages.indexOf(p.id) !== -1; })
      : templateObj.pages;

    // Build nav entries: template pages + custom pages
    var navEntries = visiblePages.map(function (p) {
      return { id: p.id, title: v["navTitle_" + p.id] || p.title, filename: p.filename };
    });
    // Append custom pages
    if (selectedPages) {
      selectedPages.forEach(function (id) {
        if (!isCustomPage(id, templateObj.pages)) return;
        var pt = getPageType(id);
        if (!pt) return;
        navEntries.push({ id: pt.id, title: v["navTitle_" + pt.id] || pt.title, filename: pt.filename });
      });
    }

    navLinksHtml = navEntries.map(function (entry) {
      var activeClass = entry.id === currentPageId ? ' class="nav-active"' : '';
      return '<a href="' + entry.filename + '" data-page="' + entry.id + '"' + activeClass + '>' + entry.title + '</a>';
    }).join("\n      ");
    footerNavLinksHtml = navEntries.map(function (entry) {
      return '<a href="' + entry.filename + '" data-page="' + entry.id + '">' + entry.title + '</a>';
    }).join("\n      ");
  } else {
    // Legacy single-page nav links
    navLinksHtml =
      '<a href="#features">Features</a>\n' +
      '      <a href="#about">About</a>\n' +
      '      <a href="mailto:' + (v.contactEmail || '') + '" data-field="contactEmail">Contact</a>';
    footerNavLinksHtml =
      '<a href="#">About Us</a>\n' +
      '      <a href="#">Careers</a>\n' +
      '      <a href="#">Press</a>';
  }

  // Hero image
  var heroImageTag = "";
  if (slots.hero) {
    heroImageTag = imageDataUrls[0]
      ? '<img class="hero-img" data-field="images" src="' + imageDataUrls[0] + '" alt="Hero">'
      : '<div class="hero-img" data-field="images"></div>';
  }

  // Feature images (individual tokens: featureImage1, featureImage2, featureImage3)
  var featureImageTokens = {};
  if (slots.featureImages) {
    for (var fi = 1; fi <= slots.featureImages; fi++) {
      featureImageTokens["featureImage" + fi] = imageDataUrls[fi]
        ? '<img src="' + imageDataUrls[fi] + '" alt="Feature ' + fi + '">'
        : "";
    }
  }

  // Build placeholder defaults from template field definitions
  var placeholders = {};
  placeholders.brandName = "YourBrand";
  (templateObj.contentFields || []).forEach(function (f) {
    placeholders[f.key] = f.placeholder || "";
  });
  (templateObj.statFields || []).forEach(function (s) {
    placeholders[s.numKey] = s.numPh || "";
    placeholders[s.labelKey] = s.labelPh || "";
  });

  // Gallery section (dynamic count, for Solara-style templates)
  var gallerySection = "";
  if (slots.hasGallery) {
    var gStart = slots.galleryStartIndex || 4;
    var galleryImages = imageDataUrls.slice(gStart).filter(Boolean);
    if (galleryImages.length > 0) {
      var galleryHeading = v.galleryHeading || placeholders.galleryHeading || "Gallery";
      var galleryImgs = galleryImages.map(function (src, i) {
        return '<img src="' + src + '" alt="Gallery ' + (i + 1) + '">';
      }).join("\n      ");
      gallerySection =
        '<section class="gallery"><h2 data-field="galleryHeading">' + galleryHeading + '</h2><div class="gallery-grid" data-field="images">' +
        galleryImgs +
        '</div></section>';
    }
  }

  // Portfolio images (dynamic count, for Prism/Ember-style templates)
  var portfolioImages = "";
  if (slots.hasPortfolio) {
    var pStart = slots.portfolioStartIndex || 0;
    var pImgs = imageDataUrls.slice(pStart).filter(Boolean);
    if (pImgs.length > 0) {
      portfolioImages = pImgs.map(function (src, i) {
        return '<img src="' + src + '" alt="Portfolio ' + (i + 1) + '">';
      }).join("\n      ");
    }
  }

  // Also keep legacy featureCards token for backward compatibility during transition
  var featureLabels = [
    v.featureLabel1 || "Feature One",
    v.featureLabel2 || "Feature Two",
    v.featureLabel3 || "Feature Three",
  ];
  var featureCards = [1, 2, 3].map(function (i) {
    var img = imageDataUrls[i] ? '<img src="' + imageDataUrls[i] + '" alt="Feature ' + i + '">' : "";
    return (
      '<div class="feature-card">' + img +
      '<div class="overlay"><span class="badge" data-field="featureLabel' + i + '">' +
      featureLabels[i - 1] + '</span></div></div>'
    );
  }).join("\n      ");

  // Social link tags for contact pages
  var socialInstagram = v.socialInstagram
    ? '<a href="' + v.socialInstagram + '" target="_blank">Instagram</a>'
    : '';
  var socialFacebook = v.socialFacebook
    ? '<a href="' + v.socialFacebook + '" target="_blank">Facebook</a>'
    : '';
  var socialLinkedin = v.socialLinkedin
    ? '<a href="' + v.socialLinkedin + '" target="_blank">LinkedIn</a>'
    : '';

  // Merge all values
  var merged = Object.assign({}, v, colorVars, featureImageTokens, {
    logoTag: logoTag,
    footerLogoTag: footerLogoTag,
    navLinks: navLinksHtml,
    footerNavLinks: footerNavLinksHtml,
    heroImageTag: heroImageTag,
    featureCards: featureCards,
    gallerySection: gallerySection,
    portfolioImages: portfolioImages,
    heroHeading: v.heroHeading || brandName,
    ctaUrl: v.ctaUrl || (v.contactEmail ? "mailto:" + v.contactEmail : "#"),
    socialInstagram: socialInstagram,
    socialFacebook: socialFacebook,
    socialLinkedin: socialLinkedin,
  });

  var result = htmlTemplate.replace(/\{\{(\w+)\}\}/g, function (_, key) {
    return (merged[key] != null && merged[key] !== "") ? merged[key] : (placeholders[key] || "");
  });

  // Inject per-element CSS overrides before </body>
  var overrideCss = buildElementOverrideCss(v, colorMap);
  if (overrideCss) {
    result = result.replace('</body>', overrideCss + '\n</body>');
  }

  return result;
}
