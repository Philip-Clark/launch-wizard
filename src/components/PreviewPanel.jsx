import { useMemo, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { fillTemplate } from "../data/template";
import { FIELD_TO_STEP, getAdvancedFieldKeys, getFieldSelectorMap } from "../data/fieldMappings";

function clearHighlights(doc) {
  var old = doc.querySelectorAll(".field-highlight");
  for (var i = 0; i < old.length; i++) {
    old[i].classList.remove("field-highlight");
  }
}

function clearSelection(doc) {
  var old = doc.querySelectorAll(".field-selected");
  for (var i = 0; i < old.length; i++) {
    old[i].classList.remove("field-selected");
  }
}

function applyHighlight(doc, field, selectorMap) {
  var els = doc.querySelectorAll('[data-field="' + field + '"]');
  if (els.length === 0 && selectorMap[field]) {
    els = doc.querySelectorAll(selectorMap[field]);
  }
  for (var j = 0; j < els.length; j++) {
    els[j].classList.add("field-highlight");
  }
}

function applySelection(doc, selectedElement) {
  if (!selectedElement || !selectedElement.field) return;
  var field = selectedElement.field;
  var els = doc.querySelectorAll('[data-field="' + field + '"]');
  // For buttons with section context, narrow to the section
  if (selectedElement.isButton && selectedElement.section) {
    var sectionContainer = doc.querySelector("." + selectedElement.section);
    if (sectionContainer) {
      var scoped = sectionContainer.querySelectorAll('[data-field="' + field + '"]');
      if (scoped.length > 0) els = scoped;
    }
  }
  for (var k = 0; k < els.length; k++) {
    els[k].classList.add("field-selected");
  }
  if (els.length > 0) {
    els[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

var BADGE_CSS =
  ".field-badge {" +
  "  position: fixed; z-index: 9999; display: none;" +
  "  background: #7C3AED; color: #fff;" +
  "  font-size: 10px; font-weight: 700; font-family: system-ui, sans-serif;" +
  "  width: 24px; height: 24px; border-radius: 50%;" +
  "  pointer-events: auto; cursor: pointer;" +
  "  box-shadow: 0 2px 8px rgba(124,58,237,0.35);" +
  "  transition: transform 0.1s, box-shadow 0.1s;" +
  "  display: none; align-items: center; justify-content: center;" +
  "}" +
  ".field-badge:hover {" +
  "  transform: scale(1.15);" +
  "  box-shadow: 0 3px 12px rgba(124,58,237,0.5);" +
  "}";

var PENCIL_SVG =
  '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-1px;flex-shrink:0">' +
  '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>' +
  '</svg>';

export default function PreviewPanel({ allValues, imageDataUrls, template, onFieldClick, highlightedField, selectedElement, activePage, setActivePage }) {
  var iframeRef = useRef(null);
  var scrollByPage = useRef({});
  var onFieldClickRef = useRef(null);
  var setActivePageRef = useRef(null);
  var selectedElementRef = useRef(null);
  onFieldClickRef.current = onFieldClick;
  setActivePageRef.current = setActivePage;
  selectedElementRef.current = selectedElement;

  var advancedOnlyFields = useMemo(function () {
    return template ? getAdvancedFieldKeys(template) : [];
  }, [template]);

  var fieldSelectorMap = useMemo(function () {
    return template ? getFieldSelectorMap(template) : {};
  }, [template]);

  var html = useMemo(function () {
    if (!template) return "";
    return fillTemplate(template, allValues, imageDataUrls, activePage || "home");
  }, [template, allValues, imageDataUrls, activePage]);

  function handleLoad() {
    var iframe = iframeRef.current;
    if (!iframe) return;
    var doc;
    try { doc = iframe.contentDocument; } catch (e) { return; }
    if (!doc) return;

    // Restore scroll position for this page
    var pageKey = activePage || "home";
    doc.documentElement.scrollTop = scrollByPage.current[pageKey] || 0;

    // Track scroll position continuously
    doc.addEventListener("scroll", function () {
      scrollByPage.current[pageKey] = doc.documentElement.scrollTop;
    });

    // Inject styles
    var style = doc.createElement("style");
    style.textContent =
      "[data-field] { cursor: pointer; }" +
      "[data-field]:hover { outline: 1px dashed rgba(124,58,237,0.3); outline-offset: 2px; }" +
      ".field-highlight { outline: 2px dashed #7C3AED !important; outline-offset: 4px; transition: outline-color 0.15s; }" +
      ".field-selected { outline: 2px solid #7C3AED !important; outline-offset: 3px; border-radius: 4px; transition: outline-color 0.15s; }" +
      BADGE_CSS;
    doc.head.appendChild(style);

    // Create floating badge element
    var badge = doc.createElement("div");
    badge.className = "field-badge";
    doc.body.appendChild(badge);

    var currentField = null;

    // Show/hide badge on hover
    doc.addEventListener("mouseover", function (e) {
      if (e.target.closest(".field-badge")) return;

      var target = e.target.closest("[data-field]");
      if (!target) {
        badge.style.display = "none";
        currentField = null;
        return;
      }

      var field = target.getAttribute("data-field");
      if (field === currentField) return;
      currentField = field;

      var isAdvanced = advancedOnlyFields.indexOf(field) !== -1;
      var stepIndex = FIELD_TO_STEP[field];
      var isCustomField = field.indexOf("cp_") === 0;

      if (isAdvanced || stepIndex !== undefined || isCustomField) {
        badge.innerHTML = PENCIL_SVG;
      } else {
        badge.style.display = "none";
        currentField = null;
        return;
      }

      badge.setAttribute("data-field", field);

      var rect = target.getBoundingClientRect();
      badge.style.display = "flex";
      var badgeW = badge.offsetWidth;
      badge.style.top = Math.max(0, rect.top - 6) + "px";
      badge.style.left = Math.max(0, rect.right - badgeW + 4) + "px";
    });

    // Click-to-jump (page nav + field click + deselect)
    doc.addEventListener("click", function (e) {
      // Page navigation interception
      var pageLink = e.target.closest("[data-page]");
      if (pageLink && !pageLink.hasAttribute("data-field")) {
        e.preventDefault();
        e.stopPropagation();
        var targetPage = pageLink.getAttribute("data-page");
        if (setActivePageRef.current && targetPage) {
          setActivePageRef.current(targetPage);
        }
        return;
      }

      // Field click
      var target = e.target.closest("[data-field]");
      if (target && onFieldClickRef.current) {
        e.preventDefault();
        e.stopPropagation();
        // If the data-field element also has data-page, handle page nav
        if (target.hasAttribute("data-page")) {
          var pageDest = target.getAttribute("data-page");
          if (setActivePageRef.current && pageDest) {
            setActivePageRef.current(pageDest);
          }
          return;
        }

        var field = target.getAttribute("data-field");

        // Detect if this is a button
        var isButton = !!target.closest(".btn, .btn-primary, .btn-secondary");

        // Find closest section-level parent for context
        var sectionEl = target.closest("section, footer, nav");
        var section = null;
        if (sectionEl) {
          var classes = sectionEl.className.split(/\s+/);
          section = classes[0] || null;
        }

        onFieldClickRef.current({ field: field, section: section, isButton: isButton });
        return;
      }

      // Click on empty space -> deselect
      if (onFieldClickRef.current) {
        onFieldClickRef.current(null);
      }
    });

    // Reapply current highlight after reload
    if (highlightedField) {
      applyHighlight(doc, highlightedField, fieldSelectorMap);
    }

    // Reapply selection after reload
    if (selectedElementRef.current) {
      applySelection(doc, selectedElementRef.current);
    }
  }

  // React to highlight changes from editor hover
  useEffect(function () {
    var iframe = iframeRef.current;
    if (!iframe) return;
    var doc;
    try { doc = iframe.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;

    clearHighlights(doc);
    if (highlightedField) {
      applyHighlight(doc, highlightedField, fieldSelectorMap);
    }
  }, [highlightedField, fieldSelectorMap]);

  // React to selection changes
  useEffect(function () {
    var iframe = iframeRef.current;
    if (!iframe) return;
    var doc;
    try { doc = iframe.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;

    clearSelection(doc);
    applySelection(doc, selectedElement);
  }, [selectedElement]);

  return (
    <Box
      sx={{
        flex: { xs: "none", md: 1 },
        height: { xs: "85vh", md: "auto" },
        borderRadius: "0.75rem",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
        background: "#fff",
      }}
    >
      <iframe
        ref={iframeRef}
        title="Site Preview"
        srcDoc={html}
        sandbox="allow-same-origin"
        onLoad={handleLoad}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </Box>
  );
}
