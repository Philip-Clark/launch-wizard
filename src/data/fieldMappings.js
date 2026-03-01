export var FIELD_TO_STEP = {
  brandName: 0,
  businessType: 0,
  ctaIntent: 1,
  contact: 2,
  contactEmail: 2,
  contactPhone: 2,
  description: 3,
  theme: 4,
  colors: 5,
  logo: 6,
  images: 7,
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
