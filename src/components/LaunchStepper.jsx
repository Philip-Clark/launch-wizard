import { useRef, useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Button,
  IconButton,
  Fade,
  CircularProgress,
  Collapse,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdvancedEditor from "./AdvancedEditor";
import InputHint from "./InputHint";
import { steps } from "../data/steps";

/* ── Light-theme style tokens ─────────────────────────────── */
var card = {
  background: "#FFFFFF",
  borderRadius: "1.25rem",
  border: "1px solid #E5E7EB",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
};

var purple = "#7C3AED";
var purpleLight = "#A78BFA";
var primaryBtn = {
  background: purple,
  borderRadius: "999px",
  px: 3,
  fontWeight: 600,
  textTransform: "none",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(124,58,237,0.25)",
  "&:hover": {
    background: "#6D28D9",
    boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
  },
};
var secondaryBtn = {
  borderRadius: "999px",
  px: 3,
  fontWeight: 600,
  textTransform: "none",
  color: "#6B7280",
  borderColor: "#D1D5DB",
  "&:hover": {
    borderColor: purpleLight,
    color: purple,
    background: "#F5F3FF",
  },
};

var inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#1F2937",
    background: "#F9FAFB",
    borderRadius: "0.75rem",
    "& fieldset": { borderColor: "#D1D5DB" },
    "&:hover fieldset": { borderColor: purpleLight },
    "&.Mui-focused fieldset": { borderColor: purple },
  },
  "& .MuiInputBase-input::placeholder": { color: "#9CA3AF", opacity: 1 },
};

var FUN_MESSAGES = [
  "Crafting your perfect headline...",
  "Picking the right words...",
  "Making your brand shine...",
  "Writing copy that converts...",
  "Almost there, polishing the details...",
  "Sprinkling some magic dust...",
  "Your site is going to look amazing...",
  "Good things take a moment...",
];

function CompletionScreen(props) {
  var onLaunch = props.onLaunch;
  var isError = props.isError;
  var advanced = props.advanced;
  var setAdvanced = props.setAdvanced;
  var colors = props.colors;
  var template = props.template;
  var onHighlight = props.onHighlight;
  var focusField = props.focusField;
  var onClearFocusField = props.onClearFocusField;

  var stateOpen = useState(false);
  var fineTuneOpen = stateOpen[0];
  var setFineTuneOpen = stateOpen[1];

  /* Auto-expand when a preview field is clicked */
  useEffect(function () {
    if (focusField) setFineTuneOpen(true);
  }, [focusField]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {isError ? (
        <Box sx={{ textAlign: "center", mb: 3, pt: 4 }}>
          <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 0.5 }}>
            Generation hiccup
          </Typography>
          <Typography variant="body2" color="#9CA3AF" sx={{ fontSize: "0.85rem" }}>
            AI content couldn&apos;t be generated, but you can edit everything manually.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", mb: 3, pt: 4 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 48, color: "#10B981", mb: 1.5 }} />
          <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 0.5 }}>
            Your site is ready!
          </Typography>
          <Typography variant="body2" color="#9CA3AF" sx={{ fontSize: "0.85rem" }}>
            Check the preview, then launch or fine-tune.
          </Typography>
        </Box>
      )}

      {/* Launch CTA */}
      <Box sx={{ width: "100%", maxWidth: 320, mb: 1 }}>
        <Button
          variant="contained"
          onClick={isError ? undefined : onLaunch}
          disabled={isError}
          fullWidth
          sx={{
            background: purple,
            borderRadius: "0.75rem",
            py: 1.5,
            fontWeight: 700,
            fontSize: "0.95rem",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
            "&:hover": { background: "#6D28D9", boxShadow: "0 6px 20px rgba(124,58,237,0.4)" },
            "&.Mui-disabled": { background: "#E5E7EB", color: "#9CA3AF" },
          }}
        >
          Launch now for $15.99/month
        </Button>
      </Box>

      {/* Fine-tune toggle */}
      <Box
        onClick={function () { setFineTuneOpen(function (prev) { return !prev; }); }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          cursor: "pointer",
          py: 1,
          color: "#6B7280",
          transition: "color 0.2s",
          "&:hover": { color: purple },
        }}
      >
        <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.85rem" }}>
          Fine-tune
        </Typography>
        <ExpandMoreIcon
          sx={{
            fontSize: 20,
            transition: "transform 0.2s",
            transform: fineTuneOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Box>

      {/* Inline editor */}
      <Collapse in={fineTuneOpen} sx={{ width: "auto", mx: { xs: -3, sm: -4 }, mb: { xs: -3, sm: -4 } }}>
        <Box sx={{ pt: 1 }}>
          <AdvancedEditor
            advanced={advanced}
            setAdvanced={setAdvanced}
            colors={colors}
            template={template}
            onHighlight={onHighlight}
            focusField={focusField}
            onClearFocusField={onClearFocusField}
          />
        </Box>
      </Collapse>
    </Box>
  );
}

function LoadingScreen() {
  var stateMsg = useState(0);
  var msgIndex = stateMsg[0];
  var setMsgIndex = stateMsg[1];

  useEffect(function () {
    var interval = setInterval(function () {
      setMsgIndex(function (prev) {
        return (prev + 1) % FUN_MESSAGES.length;
      });
    }, 2500);
    return function () { clearInterval(interval); };
  }, []);

  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <CircularProgress sx={{ color: purple, mb: 3 }} />
      <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 1 }}>
        Hold on while we get ready to launch
      </Typography>
      <Fade in key={msgIndex}>
        <Typography variant="body2" color="#9CA3AF" sx={{ fontSize: "0.85rem" }}>
          {FUN_MESSAGES[msgIndex]}
        </Typography>
      </Fade>
    </Box>
  );
}

export default function LaunchStepper({
  activeStep,
  setActiveStep,
  formData,
  setFormData,
  colors,
  setColors,
  images,
  setImages,
  imageDataUrls,
  logoDataUrl,
  setLogoDataUrl,
  onDownload,
  templates,
  onThemeChange,
  generationStatus,
  advanced,
  setAdvanced,
  template,
  onHighlight,
  focusField,
  onClearFocusField,
}) {
  var fileInputRef = useRef(null);
  var logoInputRef = useRef(null);
  var current = activeStep < steps.length ? steps[activeStep] : null;
  var isReview = current && current.type === "review";

  var stateDragIndex = useState(null);
  var dragIndex = stateDragIndex[0];
  var setDragIndex = stateDragIndex[1];

  var stateDragOverIndex = useState(null);
  var dragOverIndex = stateDragOverIndex[0];
  var setDragOverIndex = stateDragOverIndex[1];

  var stateShowHint = useState(false);
  var showHint = stateShowHint[0];
  var setShowHint = stateShowHint[1];

  var stateHintAnchorEl = useState(null);
  var hintAnchorEl = stateHintAnchorEl[0];
  var setHintAnchorEl = stateHintAnchorEl[1];

  var stateActiveHints = useState([]);
  var activeHints = stateActiveHints[0];
  var setActiveHints = stateActiveHints[1];

  var hintTimerRef = useRef(null);

  function getHintsForField(fieldKey) {
    if (!current) return null;
    if (current.fieldHints && current.fieldHints[fieldKey]) return current.fieldHints[fieldKey];
    if (current.hints) return current.hints;
    return null;
  }

  function startHintTimer(fieldKey, inputEl) {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    var hints = getHintsForField(fieldKey);
    if (!hints) return;
    hintTimerRef.current = setTimeout(function () {
      setActiveHints(hints);
      setHintAnchorEl(inputEl);
      setShowHint(true);
    }, 5000);
  }

  function handleHintFocus(fieldKey) {
    return function (e) {
      setShowHint(false);
      startHintTimer(fieldKey, e.target);
    };
  }

  function handleHintBlur() {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    setHintAnchorEl(null);
  }

  function dismissHint() {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
  }

  /* Clear hint state on step change */
  useEffect(function () {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    setHintAnchorEl(null);
    setActiveHints([]);
  }, [activeStep]);

  function handleTextChange(e) {
    setFormData(function (prev) {
      var next = Object.assign({}, prev);
      next[current.key] = e.target.value;
      return next;
    });
  }

  function handleFormField(key, value) {
    setFormData(function (prev) {
      var next = Object.assign({}, prev);
      next[key] = value;
      return next;
    });
  }

  function handleNext() {
    if (current && current.minLength) {
      var val = formData[current.key] || "";
      if (val.length < current.minLength) return;
    }

    setActiveStep(activeStep + 1);
  }

  function handleBack() {
    setActiveStep(function (s) { return s - 1; });
  }

  function handleColorChange(which, value) {
    setColors(function (prev) {
      var next = Object.assign({}, prev);
      next[which] = value;
      return next;
    });
  }

  function handleImageAdd(e) {
    var files = Array.from(e.target.files || []);
    var remaining = 8 - images.length;
    files.slice(0, remaining).forEach(function (file) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        setImages(function (prev) {
          if (prev.length >= 8) return prev;
          return prev.concat({ file: file, dataUrl: ev.target.result });
        });
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleImageRemove(index) {
    setImages(function (prev) {
      return prev.filter(function (_, i) { return i !== index; });
    });
  }

  function handleDragStart(index, e) {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(index, e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  }

  function handleDragLeave() {
    setDragOverIndex(null);
  }

  function handleDrop(dropIndex, e) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    setImages(function (prev) {
      var arr = prev.slice();
      var item = arr.splice(dragIndex, 1)[0];
      arr.splice(dropIndex, 0, item);
      return arr;
    });
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function getImageLabel(index) {
    var slots = template && template.imageSlots ? template.imageSlots : {};
    if (slots.hero && index === 0) return "Hero";
    var featureCount = slots.featureImages || 0;
    if (featureCount > 0 && index >= 1 && index <= featureCount) {
      return "Feature " + index;
    }
    if (slots.hasGallery) {
      var gStart = slots.galleryStartIndex || (featureCount + (slots.hero ? 1 : 0));
      if (index >= gStart) return "Gallery";
    }
    if (slots.hasPortfolio) {
      var pStart = slots.portfolioStartIndex != null ? slots.portfolioStartIndex : 0;
      if (index >= pStart) return "Portfolio";
    }
    return "";
  }

  function handleLogoUpload(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      setLogoDataUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
    if (logoInputRef.current) logoInputRef.current.value = "";
  }

  function handleLogoRemove() {
    setLogoDataUrl("");
  }

  var nextDisabled = false;
  if (current && current.minLength) {
    nextDisabled = (formData[current.key] || "").length < current.minLength;
  }

  /* ── STEPPER SCREEN ────────────────────────────────────── */
  return (
    <Box sx={{ ...card, p: { xs: 3, sm: 4 }, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Stepper dots */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(function (s, index) {
          var isReviewStep = s.type === "review";
          var stepLabelProps = {
            onClick: function () { setActiveStep(index); },
            sx: {
              cursor: "pointer",
              "& .MuiStepLabel-label": { color: "#9CA3AF", fontSize: "0.65rem", cursor: "pointer" },
              "& .MuiStepLabel-label.Mui-active": { color: "#1F2937" },
              "& .MuiStepLabel-label.Mui-completed": { color: purple },
              "& .MuiStepIcon-root": { color: "#E5E7EB", cursor: "pointer" },
              "& .MuiStepIcon-root.Mui-active": { color: purple },
              "& .MuiStepIcon-root.Mui-completed": { color: purpleLight },
            },
          };
          if (isReviewStep) {
            stepLabelProps.StepIconComponent = function () {
              return (
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: activeStep >= index ? purple : "#E5E7EB",
                    color: activeStep >= index ? "#fff" : "#9CA3AF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.45rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  {"\u2713"}
                </Box>
              );
            };
            stepLabelProps.sx["& .MuiStepLabel-label"] = { display: "none" };
          }
          return (
            <Step key={s.id} completed={index < activeStep}>
              <StepLabel {...stepLabelProps} />
            </Step>
          );
        })}
      </Stepper>

      {/* Loading or Completion screen */}
      {isReview && (
        (generationStatus === "done" || generationStatus === "error") ? (
          <CompletionScreen
            onLaunch={onDownload}
            isError={generationStatus === "error"}
            advanced={advanced}
            setAdvanced={setAdvanced}
            colors={colors}
            template={template}
            onHighlight={onHighlight}
            focusField={focusField}
            onClearFocusField={onClearFocusField}
          />
        ) : (
          <LoadingScreen />
        )
      )}

      {/* Step content */}
      {!isReview && current && (
        <Fade in key={activeStep}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: purple, letterSpacing: "0.15em", fontSize: "0.65rem", fontWeight: 600 }}
            >
              Step {activeStep + 1} of {steps.length}
            </Typography>
            <Typography variant="h6" fontWeight={700} color="#1F2937" lineHeight={1.3}>
              {current.title}
            </Typography>
            <Typography variant="body2" color="#6B7280" lineHeight={1.7} sx={{ fontSize: "0.8rem" }}>
              {current.description}
            </Typography>

            {/* ── THEME SELECTOR ────────────── */}
            {current.type === "theme" && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                  gap: 1.5,
                  mt: 1,
                }}
              >
                {(templates || []).map(function (t) {
                  var selected = formData.theme === t.id;
                  return (
                    <Box
                      key={t.id}
                      onClick={function () { onThemeChange(t.id); }}
                      sx={{
                        cursor: "pointer",
                        borderRadius: "0.75rem",
                        border: selected ? "2px solid " + purple : "2px solid #E5E7EB",
                        overflow: "hidden",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                        boxShadow: selected ? "0 0 0 3px #F5F3FF" : "none",
                        "&:hover": { borderColor: selected ? purple : purpleLight },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          aspectRatio: "4/3",
                          background: t.id === "midnight" ? "#0F0F1A" : t.id === "botanica" ? "#FAF7F2" : "#F5F4F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        {selected && (
                          <CheckCircleOutlineIcon
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              fontSize: 18,
                              color: purple,
                              background: "#fff",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        <Box sx={{ textAlign: "center", px: 1 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: t.defaultColors.primary,
                              mx: "auto",
                              mb: 0.5,
                              border: "2px solid rgba(255,255,255,0.3)",
                            }}
                          />
                          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: t.defaultColors.secondary }} />
                            <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: t.defaultColors.tertiary }} />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ p: 1, textAlign: "center" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: selected ? 700 : 600,
                            fontSize: "0.7rem",
                            color: selected ? purple : "#1F2937",
                          }}
                        >
                          {t.name}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* ── BRAND INFO (name + business type) ── */}
            {current.type === "brandInfo" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                  fullWidth
                  placeholder="e.g. AuraLink"
                  label="Brand name"
                  value={formData.brandName || ""}
                  onChange={function (e) {
                    handleFormField("brandName", e.target.value);
                    setShowHint(false);
                    startHintTimer("brandName", e.target);
                  }}
                  onFocus={handleHintFocus("brandName")}
                  onBlur={handleHintBlur}
                  variant="outlined"
                  size="small"
                  autoFocus
                  onKeyDown={function (e) { if (e.key === "Enter") handleNext(); }}
                  sx={inputSx}
                  slotProps={{ inputLabel: { shrink: true, sx: { color: "#6B7280", fontSize: "0.85rem" } } }}
                />
                <TextField
                  fullWidth
                  placeholder="e.g. SaaS, Restaurant, Charity, Fitness Studio"
                  label="What type of business?"
                  value={formData.businessType || ""}
                  onChange={function (e) {
                    handleFormField("businessType", e.target.value);
                    setShowHint(false);
                    startHintTimer("businessType", e.target);
                  }}
                  onFocus={handleHintFocus("businessType")}
                  onBlur={handleHintBlur}
                  variant="outlined"
                  size="small"
                  onKeyDown={function (e) { if (e.key === "Enter") handleNext(); }}
                  sx={inputSx}
                  slotProps={{ inputLabel: { shrink: true, sx: { color: "#6B7280", fontSize: "0.85rem" } } }}
                />
              </Box>
            )}

            {/* ── TEXT INPUT ────────────────── */}
            {current.type === "text" && (
              <TextField
                fullWidth
                placeholder={current.placeholder}
                value={formData[current.key] || ""}
                onChange={function (e) {
                  handleTextChange(e);
                  setShowHint(false);
                  startHintTimer(current.key, e.target);
                }}
                onFocus={handleHintFocus(current.key)}
                onBlur={handleHintBlur}
                variant="outlined"
                size="small"
                autoFocus
                onKeyDown={function (e) { if (e.key === "Enter") handleNext(); }}
                sx={inputSx}
              />
            )}

            {/* ── TEXTAREA INPUT (with optional min-length) ── */}
            {current.type === "textarea" && (
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  placeholder={current.placeholder}
                  value={formData[current.key] || ""}
                  onChange={function (e) {
                    handleTextChange(e);
                    setShowHint(false);
                    startHintTimer(current.key, e.target);
                  }}
                  onFocus={handleHintFocus(current.key)}
                  onBlur={handleHintBlur}
                  variant="outlined"
                  size="small"
                  autoFocus
                  sx={inputSx}
                />
                {current.minLength && (
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      display: "block",
                      color: (formData[current.key] || "").length >= current.minLength ? "#10B981" : "#9CA3AF",
                      fontSize: "0.7rem",
                    }}
                  >
                    {(formData[current.key] || "").length} / {current.minLength} characters minimum
                  </Typography>
                )}
              </Box>
            )}

            {/* ── CONTACT INFO ─────────────── */}
            {current.type === "contact" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                  fullWidth
                  placeholder="hello@yourbrand.com"
                  label="Email"
                  value={formData.contactEmail || ""}
                  onChange={function (e) { handleFormField("contactEmail", e.target.value); }}
                  variant="outlined"
                  size="small"
                  sx={inputSx}
                  slotProps={{ inputLabel: { shrink: true, sx: { color: "#6B7280", fontSize: "0.85rem" } } }}
                />
                <TextField
                  fullWidth
                  placeholder="+1 (555) 123-4567"
                  label="Phone"
                  value={formData.contactPhone || ""}
                  onChange={function (e) { handleFormField("contactPhone", e.target.value); }}
                  variant="outlined"
                  size="small"
                  sx={inputSx}
                  slotProps={{ inputLabel: { shrink: true, sx: { color: "#6B7280", fontSize: "0.85rem" } } }}
                />
                <TextField
                  fullWidth
                  placeholder="https://instagram.com/yourbrand"
                  label="Instagram"
                  value={formData.socialInstagram || ""}
                  onChange={function (e) { handleFormField("socialInstagram", e.target.value); }}
                  variant="outlined"
                  size="small"
                  sx={inputSx}
                  slotProps={{ inputLabel: { shrink: true, sx: { color: "#6B7280", fontSize: "0.85rem" } } }}
                />
                <TextField
                  fullWidth
                  placeholder="https://facebook.com/yourbrand"
                  label="Facebook"
                  value={formData.socialFacebook || ""}
                  onChange={function (e) { handleFormField("socialFacebook", e.target.value); }}
                  variant="outlined"
                  size="small"
                  sx={inputSx}
                  slotProps={{ inputLabel: { shrink: true, sx: { color: "#6B7280", fontSize: "0.85rem" } } }}
                />
                <TextField
                  fullWidth
                  placeholder="https://linkedin.com/company/yourbrand"
                  label="LinkedIn"
                  value={formData.socialLinkedin || ""}
                  onChange={function (e) { handleFormField("socialLinkedin", e.target.value); }}
                  variant="outlined"
                  size="small"
                  sx={inputSx}
                  slotProps={{ inputLabel: { shrink: true, sx: { color: "#6B7280", fontSize: "0.85rem" } } }}
                />
              </Box>
            )}

            {/* ── LOGO UPLOAD ────────────────── */}
            {current.type === "logo" && (
              <Box sx={{ mt: 1 }}>
                {logoDataUrl ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                        border: "2px solid " + purple,
                        width: 80,
                        height: 80,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#F9FAFB",
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={logoDataUrl}
                        alt="Logo"
                        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", p: 0.5 }}
                      />
                      <IconButton
                        size="small"
                        onClick={handleLogoRemove}
                        sx={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          background: "rgba(0,0,0,0.5)",
                          color: "#fff",
                          width: 20,
                          height: 20,
                          "&:hover": { background: "rgba(0,0,0,0.7)" },
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="#1F2937" fontWeight={600} fontSize="0.8rem">
                        Logo uploaded
                      </Typography>
                      <Typography
                        variant="caption"
                        color={purple}
                        sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                        onClick={function () { logoInputRef.current && logoInputRef.current.click(); }}
                      >
                        Replace
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    onClick={function () { logoInputRef.current && logoInputRef.current.click(); }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.75rem",
                      py: 3,
                      border: "2px dashed #D1D5DB",
                      cursor: "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      "&:hover": { borderColor: purple, background: "#F5F3FF" },
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ color: "#9CA3AF", fontSize: 36, mb: 1 }} />
                    <Typography variant="body2" color="#6B7280" fontWeight={500} fontSize="0.8rem">
                      Click to upload your logo
                    </Typography>
                    <Typography variant="caption" color="#9CA3AF" fontSize="0.65rem">
                      PNG, JPG, or SVG
                    </Typography>
                  </Box>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
              </Box>
            )}

            {/* ── COLOR PICKER ─────────────── */}
            {current.type === "colors" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
                {[
                  { key: "primary", label: "Primary (accent)" },
                  { key: "secondary", label: "Secondary (dark)" },
                  { key: "tertiary", label: "Tertiary (muted)" },
                ].map(function (c) {
                  return (
                    <Box key={c.key} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="input"
                        type="color"
                        value={colors[c.key]}
                        onChange={function (e) { handleColorChange(c.key, e.target.value); }}
                        sx={{
                          width: 44,
                          height: 44,
                          border: "2px solid #E5E7EB",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          background: "none",
                          p: 0,
                          "&::-webkit-color-swatch-wrapper": { p: "2px" },
                          "&::-webkit-color-swatch": { borderRadius: "4px", border: "none" },
                        }}
                      />
                      <Box>
                        <Typography variant="body2" color="#1F2937" fontWeight={600} sx={{ fontSize: "0.8rem" }}>
                          {c.label}
                        </Typography>
                        <Typography variant="caption" color="#9CA3AF">
                          {colors[c.key]}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}

                {/* Mini preview strip */}
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Box
                    sx={{
                      px: 2, py: 0.8,
                      borderRadius: "999px",
                      background: colors.primary,
                      color: colors.secondary,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  >
                    Button
                  </Box>
                  <Box
                    sx={{
                      px: 2, py: 0.8,
                      borderRadius: "999px",
                      background: colors.secondary,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  >
                    Footer
                  </Box>
                  <Box
                    sx={{
                      px: 2, py: 0.8,
                      borderRadius: "999px",
                      border: "1px solid",
                      borderColor: colors.tertiary,
                      color: colors.tertiary,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  >
                    Muted
                  </Box>
                </Box>
              </Box>
            )}

            {/* ── IMAGE UPLOAD ──────────────── */}
            {current.type === "images" && (
              <Box sx={{ mt: 1 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {imageDataUrls.map(function (url, i) {
                    var label = getImageLabel(i);
                    var isDragSource = dragIndex === i;
                    var isDragTarget = dragOverIndex === i && dragIndex !== i;
                    var labelBg = purple;
                    if (label.indexOf("Feature") === 0) labelBg = "#3B82F6";
                    else if (label === "Gallery" || label === "Portfolio") labelBg = "rgba(0,0,0,0.5)";

                    return (
                      <Box
                        key={i}
                        draggable
                        onDragStart={function (e) { handleDragStart(i, e); }}
                        onDragOver={function (e) { handleDragOver(i, e); }}
                        onDragLeave={handleDragLeave}
                        onDrop={function (e) { handleDrop(i, e); }}
                        onDragEnd={handleDragEnd}
                        sx={{
                          position: "relative",
                          borderRadius: "0.5rem",
                          overflow: "hidden",
                          aspectRatio: "1",
                          border: isDragTarget
                            ? "2px dashed " + purple
                            : (label === "Hero" ? "2px solid " + purple : "1px solid #E5E7EB"),
                          opacity: isDragSource ? 0.4 : 1,
                          transition: "border 0.15s, opacity 0.15s, transform 0.15s",
                          transform: isDragTarget ? "scale(1.05)" : "scale(1)",
                          cursor: "grab",
                          "&:active": { cursor: "grabbing" },
                        }}
                      >
                        <Box
                          component="img"
                          src={url}
                          alt={"Upload " + (i + 1)}
                          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                        />
                        <IconButton
                          size="small"
                          onClick={function () { handleImageRemove(i); }}
                          sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            background: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            width: 22,
                            height: 22,
                            "&:hover": { background: "rgba(0,0,0,0.7)" },
                          }}
                        >
                          <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                        {label && (
                          <Typography
                            variant="caption"
                            sx={{
                              position: "absolute",
                              bottom: 2,
                              left: 4,
                              fontSize: "0.55rem",
                              color: "#fff",
                              background: labelBg,
                              px: 0.5,
                              borderRadius: "4px",
                              fontWeight: 600,
                              pointerEvents: "none",
                            }}
                          >
                            {label}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}

                  {imageDataUrls.length < 8 && (
                    <Box
                      onClick={function () { fileInputRef.current && fileInputRef.current.click(); }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.5rem",
                        aspectRatio: "1",
                        border: "2px dashed #D1D5DB",
                        cursor: "pointer",
                        transition: "border-color 0.2s, background 0.2s",
                        "&:hover": { borderColor: purple, background: "#F5F3FF" },
                      }}
                    >
                      <AddPhotoAlternateIcon sx={{ color: "#9CA3AF", fontSize: 28 }} />
                      <Typography variant="caption" color="#9CA3AF" sx={{ mt: 0.5, fontSize: "0.6rem" }}>
                        Add ({imageDataUrls.length}/8)
                      </Typography>
                    </Box>
                  )}
                </Box>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageAdd}
                  style={{ display: "none" }}
                />
              </Box>
            )}
          </Box>
        </Fade>
      )}

      {/* Input hint popup */}
      <InputHint
        anchorEl={hintAnchorEl}
        hints={activeHints}
        open={showHint}
        onDismiss={dismissHint}
      />

      {/* Navigation */}
      {!isReview && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={secondaryBtn}
          >
            Back
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
            disabled={nextDisabled}
            sx={Object.assign({}, primaryBtn, nextDisabled ? { opacity: 0.5 } : {})}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
