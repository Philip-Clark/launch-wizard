import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  focusField,
  onClearFocusField,
}) {
  var textFields = useMemo(function () {
    if (!template) return [];
    var fields = [{ key: "brandName", label: "Brand Name", placeholder: "e.g. AuraLink", multiline: false }];
    (template.contentFields || []).forEach(function (f) {
      fields.push({
        key: f.key,
        label: f.label,
        placeholder: f.placeholder || "",
        multiline: f.type === "textarea",
      });
    });
    return fields;
  }, [template]);

  var statFields = useMemo(function () {
    if (!template) return [];
    return template.statFields || [];
  }, [template]);

  var elements = useMemo(function () {
    if (!template) return [];
    return (template.colorElements || []).map(function (e) {
      return { key: e.key, label: e.label };
    });
  }, [template]);

  var stateTextExpanded = useState(false);
  var textExpanded = stateTextExpanded[0];
  var setTextExpanded = stateTextExpanded[1];

  var stateColorsExpanded = useState(false);
  var colorsExpanded = stateColorsExpanded[0];
  var setColorsExpanded = stateColorsExpanded[1];

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

  // Focus navigation when a preview element is clicked
  useEffect(function () {
    if (!focusField) return;

    var inText = textFields.some(function (f) { return f.key === focusField; }) ||
                 statFields.some(function (s) { return s.numKey === focusField || s.labelKey === focusField; });
    var inColors = elements.some(function (e) { return e.key === focusField; });

    if (inText) setTextExpanded(true);
    if (inColors) setColorsExpanded(true);

    var timer = setTimeout(function () {
      var el = document.getElementById("editor-field-" + focusField);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        var input = el.querySelector("input, textarea");
        if (input) input.focus();
      }
      if (onClearFocusField) onClearFocusField();
    }, 350);

    return function () { clearTimeout(timer); };
  }, [focusField, textFields, statFields, elements]);

  var colorChoices = [
    { value: "primary", hex: colors.primary },
    { value: "secondary", hex: colors.secondary },
    { value: "tertiary", hex: colors.tertiary },
  ];

  return (
    <Box
      sx={{
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Scrollable accordions */}
      <Box sx={{ overflowY: "auto", flex: 1 }}>
        {/* ── TEXT CONTENT ──────────────────────── */}
        <Accordion expanded={textExpanded} onChange={function () { setTextExpanded(!textExpanded); }} disableGutters elevation={0} sx={accordionSx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2" fontWeight={700} color="#1F2937" fontSize="0.85rem">
              Text Content
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 3 }}>
            {textFields.map(function (f) {
              return (
                <Box
                  key={f.key}
                  id={"editor-field-" + f.key}
                  onMouseEnter={function () { if (onHighlight) onHighlight(f.key); }}
                  onMouseLeave={function () { if (onHighlight) onHighlight(null); }}
                >
                  <Typography variant="caption" color="#6B7280" fontWeight={600} sx={{ mb: 0.5, display: "block", fontSize: "0.7rem" }}>
                    {f.label}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    multiline={!!f.multiline}
                    rows={f.multiline ? 3 : undefined}
                    placeholder={f.placeholder}
                    value={advanced[f.key] || ""}
                    onChange={function (e) { handleText(f.key, e.target.value); }}
                    sx={inputSx}
                  />
                </Box>
              );
            })}

            {statFields.length > 0 && (
              <Typography variant="caption" color="#6B7280" fontWeight={600} sx={{ mt: 1, display: "block", fontSize: "0.7rem" }}>
                Stats
              </Typography>
            )}
            {statFields.map(function (s) {
              return (
                <Box key={s.numKey} sx={{ display: "flex", gap: 1 }}>
                  <Box
                    id={"editor-field-" + s.numKey}
                    onMouseEnter={function () { if (onHighlight) onHighlight(s.numKey); }}
                    onMouseLeave={function () { if (onHighlight) onHighlight(null); }}
                    sx={{ flexShrink: 0 }}
                  >
                    <TextField
                      size="small"
                      placeholder={s.numPh}
                      value={advanced[s.numKey] || ""}
                      onChange={function (e) { handleText(s.numKey, e.target.value); }}
                      sx={Object.assign({}, inputSx, { width: 100 })}
                    />
                  </Box>
                  <Box
                    id={"editor-field-" + s.labelKey}
                    onMouseEnter={function () { if (onHighlight) onHighlight(s.labelKey); }}
                    onMouseLeave={function () { if (onHighlight) onHighlight(null); }}
                    sx={{ flex: 1 }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={s.labelPh}
                      value={advanced[s.labelKey] || ""}
                      onChange={function (e) { handleText(s.labelKey, e.target.value); }}
                      sx={inputSx}
                    />
                  </Box>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>

        {/* ── ELEMENT COLORS ────────────────────── */}
        {elements.length > 0 && (
          <Accordion expanded={colorsExpanded} onChange={function () { setColorsExpanded(!colorsExpanded); }} disableGutters elevation={0} sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" fontWeight={700} color="#1F2937" fontSize="0.85rem">
                Element Colors
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2.5, pb: 3 }}>
              <Typography variant="caption" color="#9CA3AF" fontSize="0.7rem">
                Pick which brand color each element uses. Text contrast adjusts automatically.
              </Typography>
              {elements.map(function (el) {
                var current = advanced[el.key] || "primary";
                return (
                  <Box
                    key={el.key}
                    id={"editor-field-" + el.key}
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
                              boxShadow: selected ? "0 0 0 2px #F5F3FF" : "none",
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
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    </Box>
  );
}

var accordionSx = {
  borderBottom: "1px solid #F3F4F6",
  "&:before": { display: "none" },
  "& .MuiAccordionSummary-root": { px: 2.5, minHeight: 48 },
  "& .MuiAccordionDetails-root": { px: 2.5 },
};
