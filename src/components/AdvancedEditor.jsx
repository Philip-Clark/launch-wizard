import { useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
} from "@mui/material";
import ColorPicker from "./ColorPicker";
import { getPageType, isCustomPage } from "../data/pageTypes";

var purple = "#7C3AED";

var inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#1F2937",
    background: "#F9FAFB",
    borderRadius: "0.75rem",
    fontSize: "0.8rem",
    "& fieldset": { borderColor: "#D1D5DB" },
    "&:hover fieldset": { borderColor: "#A78BFA" },
    "&.Mui-focused fieldset": { borderColor: purple },
  },
  "& .MuiInputBase-input::placeholder": { color: "#9CA3AF", opacity: 1 },
};

export default function AdvancedEditor({
  advanced,
  setAdvanced,
  colors,
  template,
  onHighlight,
  selectedElement,
  setSelectedElement,
  activePage,
  setActivePage,
  selectedPages,
}) {
  /* ── memos ───────────────────────────────────── */

  var navPages = useMemo(function () {
    if (!template || !template.pages || template.pages.length <= 1) return null;
    var pages = template.pages;
    if (selectedPages) {
      pages = pages.filter(function (p) { return selectedPages.indexOf(p.id) !== -1; });
    }
    // Append custom pages from selectedPages
    var result = pages.slice();
    if (selectedPages) {
      selectedPages.forEach(function (id) {
        if (!isCustomPage(id, template.pages)) return;
        var pt = getPageType(id);
        if (pt) result.push({ id: pt.id, title: pt.title, filename: pt.filename });
      });
    }
    return result.length > 1 ? result : null;
  }, [template, selectedPages]);

  var elements = useMemo(function () {
    if (!template) return [];
    return (template.colorElements || []).map(function (e) {
      return { key: e.key, label: e.label, selector: e.selector };
    });
  }, [template]);

  /* Find the field definition for the selected element */
  var selectedFieldDef = useMemo(function () {
    if (!selectedElement || !template) return null;
    var field = selectedElement.field;

    // Check contentFields across all pages
    var pages = template.pages || [];
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      var found = (page.contentFields || []).find(function (f) { return f.key === field; });
      if (found) return { type: "content", def: found, page: page };
      // Check statFields
      var statFound = (page.statFields || []).find(function (s) {
        return s.numKey === field || s.labelKey === field;
      });
      if (statFound) return { type: "stat", def: statFound, page: page };
    }

    // Check top-level contentFields (aggregated)
    var topFound = (template.contentFields || []).find(function (f) { return f.key === field; });
    if (topFound) return { type: "content", def: topFound, page: null };

    // Special fields
    if (field === "brandName") {
      return { type: "content", def: { key: "brandName", label: "Brand Name", placeholder: "e.g. AuraLink" }, page: null };
    }
    if (field === "contactEmail") {
      return { type: "content", def: { key: "contactEmail", label: "Contact Email", placeholder: "hello@yourbrand.com" }, page: null };
    }
    if (field === "contactPhone") {
      return { type: "content", def: { key: "contactPhone", label: "Contact Phone", placeholder: "+1 (555) 000-0000" }, page: null };
    }
    if (field === "logo") {
      return { type: "logo", def: { key: "logo", label: "Logo" }, page: null };
    }
    if (field === "images") {
      return { type: "images", def: { key: "images", label: "Images" }, page: null };
    }
    // Custom page fields (cp_{pageId}_{n})
    if (field.indexOf("cp_") === 0) {
      var parts = field.split("_");
      var cpPageId = parts.length >= 3 ? parts[1] : "unknown";
      var pt = getPageType(cpPageId);
      var label = pt ? pt.title + " text" : field;
      return { type: "content", def: { key: field, label: label, placeholder: "Edit text..." }, page: null };
    }
    return null;
  }, [selectedElement, template]);

  /* Find colorElements whose selector matches the selected element's section */
  var matchingColorElements = useMemo(function () {
    if (!selectedElement || !selectedElement.section || !template) return [];
    var section = selectedElement.section;
    return (template.colorElements || []).filter(function (el) {
      var sel = el.selector;
      if (sel.charAt(0) === ".") sel = sel.slice(1);
      return sel === section;
    });
  }, [selectedElement, template]);

  var colorChoices = [
    { value: "primary", hex: colors.primary },
    { value: "secondary", hex: colors.secondary },
    { value: "tertiary", hex: colors.tertiary },
  ];

  /* ── handlers ────────────────────────────────── */

  function handleText(key, value) {
    setAdvanced(function (prev) {
      var next = Object.assign({}, prev);
      next[key] = value;
      return next;
    });
  }

  function handleColorAssign(key, value) {
    setAdvanced(function (prev) {
      var next = Object.assign({}, prev);
      next[key] = value;
      return next;
    });
  }

  /* ── color pickers ───────────────────────────── */

  var resetLinkSx = {
    cursor: "pointer",
    color: "#9CA3AF",
    fontSize: "0.7rem",
    mt: 0.75,
    "&:hover": { color: purple },
    transition: "color 0.15s",
  };

  function renderTextColorPicker(fieldKey) {
    var current = advanced[fieldKey + "__textColor"];
    var hasOverride = current && current !== "default" && current.charAt(0) === "#";
    var displayValue = hasOverride ? current : "#1a1a2e";
    return (
      <Box>
        <ColorPicker
          value={displayValue}
          onChange={function (hex) { handleText(fieldKey + "__textColor", hex); }}
        />
        {hasOverride && (
          <Typography
            variant="caption"
            onClick={function () { handleText(fieldKey + "__textColor", "default"); }}
            sx={resetLinkSx}
          >
            Reset to default
          </Typography>
        )}
      </Box>
    );
  }

  function renderButtonColorPicker(section) {
    var key = "btn__" + section + "__colorAssign";
    var current = advanced[key];
    var hasOverride = current && current.charAt(0) === "#";
    var globalDefault = advanced.buttonColorAssign || "primary";
    var displayValue = hasOverride ? current : (colors[globalDefault] || colors.primary);
    return (
      <Box>
        <ColorPicker
          value={displayValue}
          onChange={function (hex) { handleColorAssign(key, hex); }}
        />
        {hasOverride && (
          <Typography
            variant="caption"
            onClick={function () { handleColorAssign(key, ""); }}
            sx={resetLinkSx}
          >
            Reset to default
          </Typography>
        )}
      </Box>
    );
  }

  function renderSectionColorRow(el) {
    var current = advanced[el.key] || "primary";
    return (
      <Box
        key={el.key}
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="body2" color="#1F2937" fontWeight={600} fontSize="0.8rem">
          {el.label}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {colorChoices.map(function (c) {
            var selected = current === c.value;
            return (
              <Box
                key={c.value}
                onClick={function () { handleColorAssign(el.key, c.value); }}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: c.hex,
                  cursor: "pointer",
                  border: selected ? "3px solid " + purple : "2px solid #E5E7EB",
                  boxShadow: selected ? "0 0 0 2px #EDE9FE" : "none",
                  transition: "all 0.15s",
                  "&:hover": { transform: "scale(1.15)" },
                }}
              />
            );
          })}
        </Box>
      </Box>
    );
  }

  /* ── Selected element view ───────────────────── */

  function renderSelectedView() {
    var field = selectedElement.field;
    var label = selectedFieldDef ? selectedFieldDef.def.label : field;
    var isContent = selectedFieldDef && selectedFieldDef.type === "content";
    var isStat = selectedFieldDef && selectedFieldDef.type === "stat";
    var isSkip = field === "images" || field === "logo";

    return (
      <>
        {/* Back button */}
        <Box
          onClick={function () { setSelectedElement(null); }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 2.5,
            py: 1.5,
            cursor: "pointer",
            borderBottom: "1px solid #F3F4F6",
            color: "#6B7280",
            "&:hover": { color: purple, background: "#F5F3FF" },
            transition: "all 0.15s",
          }}
        >
          <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
            &#8592; All options
          </Typography>
        </Box>

        {/* Element label */}
        <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: "0.7rem",
              color: purple,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {label}
          </Typography>
          {selectedElement.section && (
            <Typography variant="caption" color="#9CA3AF" fontSize="0.65rem" sx={{ ml: 1 }}>
              in {selectedElement.section.replace(/-/g, " ")}
            </Typography>
          )}
        </Box>

        {/* Text editing field */}
        {isContent && (
          <Box sx={{ px: 2.5, pb: 2 }}>
            <TextField
              fullWidth
              size="small"
              multiline={selectedFieldDef.def.type === "textarea"}
              rows={selectedFieldDef.def.type === "textarea" ? 3 : undefined}
              placeholder={selectedFieldDef.def.placeholder}
              value={advanced[field] || ""}
              onChange={function (e) { handleText(field, e.target.value); }}
              onMouseEnter={function () { if (onHighlight) onHighlight(field); }}
              onMouseLeave={function () { if (onHighlight) onHighlight(null); }}
              sx={inputSx}
              autoFocus
            />
          </Box>
        )}

        {isStat && (
          <Box sx={{ px: 2.5, pb: 2, display: "flex", gap: 1 }}>
            <TextField
              size="small"
              placeholder={selectedFieldDef.def.numPh}
              value={advanced[selectedFieldDef.def.numKey] || ""}
              onChange={function (e) { handleText(selectedFieldDef.def.numKey, e.target.value); }}
              sx={Object.assign({}, inputSx, { width: 100 })}
            />
            <TextField
              fullWidth
              size="small"
              placeholder={selectedFieldDef.def.labelPh}
              value={advanced[selectedFieldDef.def.labelKey] || ""}
              onChange={function (e) { handleText(selectedFieldDef.def.labelKey, e.target.value); }}
              sx={inputSx}
            />
          </Box>
        )}

        {/* Divider */}
        <Box sx={{ borderTop: "1px solid #F3F4F6" }} />

        {/* Text color override (for non-button, non-image elements) */}
        {!selectedElement.isButton && !isSkip && (
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="body2" color="#1F2937" fontWeight={600} fontSize="0.8rem" sx={{ mb: 1 }}>
              Text Color
            </Typography>
            {renderTextColorPicker(field)}
          </Box>
        )}

        {/* Button color override (for buttons) */}
        {selectedElement.isButton && selectedElement.section && (
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="body2" color="#1F2937" fontWeight={600} fontSize="0.8rem" sx={{ mb: 1 }}>
              Button Color
            </Typography>
            {renderButtonColorPicker(selectedElement.section)}
          </Box>
        )}

        {/* Parent section color (if inside a colorElement-matched section) */}
        {matchingColorElements.length > 0 && (
          <Box sx={{ px: 2.5, py: 2, borderTop: "1px solid #F3F4F6" }}>
            <Typography variant="body2" color="#1F2937" fontWeight={600} fontSize="0.8rem" sx={{ mb: 1.5 }}>
              Section Color
            </Typography>
            {matchingColorElements.map(function (el) {
              return renderSectionColorRow(el);
            })}
          </Box>
        )}
      </>
    );
  }

  /* ── Default view (nothing selected) ─────────── */

  function renderDefaultView() {
    return (
      <>
        {/* Prompt */}
        <Box sx={{ textAlign: "center", py: 3, px: 2 }}>
          <Typography variant="body2" color="#9CA3AF" fontSize="0.85rem">
            Click any element in the preview to edit its text and colors.
          </Typography>
        </Box>

        {/* Navigation links */}
        {navPages && navPages.length > 0 && (
          <Box sx={{ px: 2.5, pb: 2.5, borderTop: "1px solid #F3F4F6", pt: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#1F2937" fontSize="0.85rem" sx={{ mb: 1 }}>
              Navigation
            </Typography>
            <Typography variant="caption" color="#9CA3AF" fontSize="0.7rem" sx={{ mb: 1.5, display: "block" }}>
              Rename the links shown in the nav bar and footer.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {navPages.map(function (page) {
                var fieldKey = "navTitle_" + page.id;
                return (
                  <Box key={page.id}>
                    <Typography variant="caption" color="#6B7280" fontWeight={600} sx={{ mb: 0.5, display: "block", fontSize: "0.7rem" }}>
                      {page.title}
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={page.title}
                      value={advanced[fieldKey] || ""}
                      onChange={function (e) { handleText(fieldKey, e.target.value); }}
                      sx={inputSx}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Element Colors */}
        {elements.length > 0 && (
          <Box sx={{ px: 2.5, pb: 2.5, borderTop: "1px solid #F3F4F6", pt: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#1F2937" fontSize="0.85rem" sx={{ mb: 1 }}>
              Element Colors
            </Typography>
            <Typography variant="caption" color="#9CA3AF" fontSize="0.7rem" sx={{ mb: 2, display: "block" }}>
              Pick which brand color each element uses.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {elements.map(function (el) {
                var current = advanced[el.key] || "primary";
                return (
                  <Box
                    key={el.key}
                    onMouseEnter={function () { if (onHighlight) onHighlight(el.key); }}
                    onMouseLeave={function () { if (onHighlight) onHighlight(null); }}
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="#1F2937" fontWeight={600} fontSize="0.8rem">
                      {el.label}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {colorChoices.map(function (c) {
                        var selected = current === c.value;
                        return (
                          <Box
                            key={c.value}
                            onClick={function () { handleColorAssign(el.key, c.value); }}
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: c.hex,
                              cursor: "pointer",
                              border: selected ? "3px solid " + purple : "2px solid #E5E7EB",
                              boxShadow: selected ? "0 0 0 2px #EDE9FE" : "none",
                              transition: "all 0.15s",
                              "&:hover": { transform: "scale(1.15)" },
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </>
    );
  }

  /* ── main render ─────────────────────────────── */

  return (
    <Box
      sx={{
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ overflowY: "auto", flex: 1 }}>
        {selectedElement ? renderSelectedView() : renderDefaultView()}
      </Box>
    </Box>
  );
}
