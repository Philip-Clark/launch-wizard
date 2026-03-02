export var FIELD_TO_STEP = {
  brandName: 0,
  businessType: 0,
  ctaIntent: 1,
  description: 2,
  contact: 3,
  contactEmail: 3,
  contactPhone: 3,
  theme: 4,
  colors: 5,
  pages: 6,
  logo: 7,
  images: 8,
};

export function getAdvancedFieldKeys(template) {
  var keys = ["brandName"];
  (template.contentFields || []).forEach(function (f) { keys.push(f.key); });
  (template.statFields || []).forEach(function (s) { keys.push(s.numKey); keys.push(s.labelKey); });
  (template.colorElements || []).forEach(function (e) { keys.push(e.key); });
  return keys;
}

export function getFieldSelectorMap(template) {
  var map = {};
  (template.colorElements || []).forEach(function (e) {
    map[e.key] = e.selector;
  });
  return map;
}

export function getFieldsByPage(template) {
  if (!template.pages || template.pages.length <= 1) {
    return null;
  }
  return template.pages.map(function (page) {
    return {
      pageId: page.id,
      pageTitle: page.title,
      contentFields: page.contentFields || [],
      statFields: page.statFields || [],
    };
  });
}

export function getPageForField(template, fieldKey) {
  if (!template.pages) return null;
  for (var i = 0; i < template.pages.length; i++) {
    var page = template.pages[i];
    var found = (page.contentFields || []).some(function (f) { return f.key === fieldKey; }) ||
                (page.statFields || []).some(function (s) { return s.numKey === fieldKey || s.labelKey === fieldKey; });
    if (found) return page;
  }
  // Custom page fields (cp_{pageId}_{n})
  if (fieldKey.indexOf("cp_") === 0) {
    var parts = fieldKey.split("_");
    if (parts.length >= 3) {
      var cpPageId = parts[1];
      return { id: cpPageId, title: cpPageId, filename: cpPageId + ".html" };
    }
  }
  return null;
}
