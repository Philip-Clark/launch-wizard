/* ── Contrast helper ───────────────────────────────────── */
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

/* ── Fill template ─────────────────────────────────────── */
export function fillTemplate(templateObj, allValues, imageDataUrls) {
  if (!imageDataUrls) imageDataUrls = [];
  var v = allValues || {};
  var slots = templateObj.imageSlots || {};

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
    var assignVal = v[el.key] || "primary";
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
  var logoTag = v.logoDataUrl
    ? '<img class="nav-logo-img" data-field="logo" src="' + v.logoDataUrl + '" alt="' + brandName + '">'
    : '<span class="nav-logo" data-field="logo">' + brandName + '</span>';
  var footerLogoTag = v.logoDataUrl
    ? '<img class="footer-logo-img" data-field="logo" src="' + v.logoDataUrl + '" alt="' + brandName + '">'
    : '<div class="logo" data-field="logo">' + brandName + '</div>';

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

  // Merge all values
  var merged = Object.assign({}, v, colorVars, featureImageTokens, {
    logoTag: logoTag,
    footerLogoTag: footerLogoTag,
    heroImageTag: heroImageTag,
    featureCards: featureCards,
    gallerySection: gallerySection,
    portfolioImages: portfolioImages,
    heroHeading: v.heroHeading || brandName,
    ctaUrl: v.ctaUrl || (v.contactEmail ? "mailto:" + v.contactEmail : "#"),
  });

  return templateObj.htmlTemplate.replace(/\{\{(\w+)\}\}/g, function (_, key) {
    return (merged[key] != null && merged[key] !== "") ? merged[key] : (placeholders[key] || "");
  });
}
