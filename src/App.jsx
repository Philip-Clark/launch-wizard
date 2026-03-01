import { useState, useMemo, useEffect, useRef } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from "@mui/material";
import LaunchStepper from "./components/LaunchStepper";
import PreviewPanel from "./components/PreviewPanel";
import { steps } from "./data/steps";
import { fillTemplate } from "./data/template";
import { templates } from "./data/templates/index";
import { FIELD_TO_STEP } from "./data/fieldMappings";
import { generateSiteContent } from "./services/gemini";

var theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#7C3AED" },
    background: { default: "#F9FAFB", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  shape: { borderRadius: 12 },
});

var defaultForm = { theme: "solara" };
steps.forEach(function (s) {
  if (s.type === "text" || s.type === "textarea") {
    defaultForm[s.key] = "";
  }
});
defaultForm.businessType = "";
defaultForm.contactEmail = "";
defaultForm.contactPhone = "";
defaultForm.socialInstagram = "";
defaultForm.socialFacebook = "";
defaultForm.socialLinkedin = "";

var defaultColors = {
  primary: "#D4E157",
  secondary: "#1a1a2e",
  tertiary: "#6b7280",
};

var defaultAdvanced = {};

var STORAGE_KEY = "launch-wizard-state";

function loadSaved() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function saveState(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) { /* ignore quota errors */ }
}

var saved = loadSaved();

export default function App() {
  var stateActiveStep = useState(saved ? saved.activeStep : 0);
  var activeStep = stateActiveStep[0];
  var setActiveStep = stateActiveStep[1];

  var stateFormData = useState(saved ? saved.formData : defaultForm);
  var formData = stateFormData[0];
  var setFormData = stateFormData[1];

  var stateColors = useState(saved ? saved.colors : defaultColors);
  var colors = stateColors[0];
  var setColors = stateColors[1];

  var stateImages = useState(function () {
    if (saved && saved.imageDataUrls && saved.imageDataUrls.length) {
      return saved.imageDataUrls.map(function (url) { return { file: null, dataUrl: url }; });
    }
    return [];
  });
  var images = stateImages[0];
  var setImages = stateImages[1];

  var stateLogoDataUrl = useState(saved ? saved.logoDataUrl || "" : "");
  var logoDataUrl = stateLogoDataUrl[0];
  var setLogoDataUrl = stateLogoDataUrl[1];

  var stateAdvanced = useState(saved && saved.advanced ? saved.advanced : defaultAdvanced);
  var advanced = stateAdvanced[0];
  var setAdvanced = stateAdvanced[1];

  var stateHighlightedField = useState(null);
  var highlightedField = stateHighlightedField[0];
  var setHighlightedField = stateHighlightedField[1];

  var stateFocusField = useState(null);
  var focusField = stateFocusField[0];
  var setFocusField = stateFocusField[1];

  var stateGenerationStatus = useState(
    saved && saved.generationStatus === "done" ? "done" : "idle"
  );
  var generationStatus = stateGenerationStatus[0];
  var setGenerationStatus = stateGenerationStatus[1];

  var lastGenInputsRef = useRef("");
  var genInputs = [formData.brandName, formData.businessType, formData.ctaIntent, formData.description].join("|");

  /* Seed fingerprint ref on initial load so a restored "done" session doesn't re-generate */
  useEffect(function () {
    if (generationStatus === "done" || generationStatus === "error") {
      lastGenInputsRef.current = genInputs;
    }
  }, []);

  var imageDataUrls = useMemo(function () {
    return images.map(function (img) { return img.dataUrl; });
  }, [images]);

  /* Look up the selected template object */
  var selectedTemplate = useMemo(function () {
    var t = templates.find(function (t) { return t.id === formData.theme; });
    return t || templates[0];
  }, [formData.theme]);

  /* Merge all values for template rendering */
  var allValues = useMemo(function () {
    return Object.assign({}, formData, advanced, {
      colorPrimary: colors.primary,
      colorSecondary: colors.secondary,
      colorTertiary: colors.tertiary,
      logoDataUrl: logoDataUrl,
    });
  }, [formData, advanced, colors, logoDataUrl]);

  function handleThemeChange(themeId) {
    setFormData(function (prev) {
      return Object.assign({}, prev, { theme: themeId });
    });
    var t = templates.find(function (t) { return t.id === themeId; });
    if (t) {
      setColors(Object.assign({}, t.defaultColors));
    }
    setAdvanced(defaultAdvanced);
    setGenerationStatus("idle");
  }

  function handleTriggerGeneration() {
    if (generationStatus === "loading" || generationStatus === "done") return;
    lastGenInputsRef.current = genInputs;
    setGenerationStatus("loading");

    generateSiteContent(
      formData.brandName,
      formData.ctaIntent,
      formData.description,
      selectedTemplate,
      formData.businessType
    ).then(function (result) {
      var generated = Object.assign({}, result);
      if (formData.brandName) {
        generated.brandName = formData.brandName;
      }
      if (formData.contactEmail) {
        generated.contactEmail = formData.contactEmail;
      }
      setAdvanced(generated);
      setGenerationStatus("done");
    }).catch(function (err) {
      console.error("Gemini generation failed:", err);
      setGenerationStatus("error");
    });
  }

  /* Auto-trigger generation when navigating past the theme step */
  useEffect(function () {
    if (activeStep >= 5) {
      if (generationStatus === "idle") {
        handleTriggerGeneration();
      } else if (
        (generationStatus === "done" || generationStatus === "error") &&
        genInputs !== lastGenInputsRef.current
      ) {
        setGenerationStatus("idle");
      }
    }
  }, [activeStep, generationStatus, genInputs]);

  /* Persist state to localStorage */
  useEffect(function () {
    saveState({
      activeStep: activeStep,
      formData: formData,
      colors: colors,
      logoDataUrl: logoDataUrl,
      imageDataUrls: imageDataUrls,
      advanced: advanced,
      generationStatus: generationStatus === "loading" ? "idle" : generationStatus,
    });
  }, [activeStep, formData, colors, logoDataUrl, imageDataUrls, advanced, generationStatus]);

  function handleDownload() {
    var html = fillTemplate(selectedTemplate, allValues, imageDataUrls);
    var blob = new Blob([html], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (formData.brandName || "site") + ".html";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleRestart() {
    setActiveStep(0);
    setFormData(defaultForm);
    setColors(defaultColors);
    setImages([]);
    setLogoDataUrl("");
    setAdvanced(defaultAdvanced);
    setGenerationStatus("idle");
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  function handleFieldClick(field) {
    var stepIndex = FIELD_TO_STEP[field];
    if (activeStep === steps.length - 1) {
      // On review: navigate to wizard step for non-editable fields (images, logo),
      // focus fine tuner for text content fields
      if ((field === "images" || field === "logo") && stepIndex !== undefined) {
        setActiveStep(stepIndex);
      } else {
        setFocusField(field);
      }
    } else {
      if (stepIndex !== undefined) {
        setActiveStep(stepIndex);
      } else {
        setActiveStep(steps.length - 1);
        setFocusField(field);
      }
    }
  }

  function handleClearFocusField() {
    setFocusField(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: { xs: "auto", md: "100vh" },
          minHeight: "100vh",
          width: "100vw",
          background: "#F9FAFB",
          display: "flex",
          flexDirection: "column",
          overflow: { xs: "auto", md: "hidden" },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            flexShrink: 0,
            textAlign: "center",
            py: { xs: 2, sm: 2.5 },
            borderBottom: "1px solid #E5E7EB",
            background: "#fff",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.25em",
              color: "#7C3AED",
              fontSize: "0.6rem",
              display: "block",
              mb: 0.25,
              fontWeight: 600,
            }}
          >
            Site Builder
          </Typography>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              color: "#1F2937",
              fontSize: { xs: "1.4rem", sm: "1.75rem" },
              lineHeight: 1.15,
            }}
          >
            5 Mins Until Launch
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 0.5, fontSize: "0.8rem", color: "#9CA3AF" }}
          >
            {activeStep === steps.length - 1
              ? "Review your site, then launch or fine-tune."
              : "Answer a few questions and get a ready-to-go website."}
          </Typography>
        </Box>

        {/* Main split pane */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            minHeight: { xs: "auto", md: 0 },
            display: "flex",
            gap: 2.5,
            p: { xs: 1.5, sm: 2, md: 2.5 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT: Stepper form or Advanced Editor */}
          <Box
            sx={{
              width: { xs: "100%", md: 420 },
              flexShrink: 0,
              overflowY: { xs: "visible", md: "auto" },
              "&::-webkit-scrollbar": { width: 5 },
              "&::-webkit-scrollbar-thumb": {
                background: "#D1D5DB",
                borderRadius: 3,
              },
            }}
          >
            <LaunchStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              formData={formData}
              setFormData={setFormData}
              colors={colors}
              setColors={setColors}
              images={images}
              setImages={setImages}
              imageDataUrls={imageDataUrls}
              logoDataUrl={logoDataUrl}
              setLogoDataUrl={setLogoDataUrl}
              onDownload={handleDownload}
              templates={templates}
              onThemeChange={handleThemeChange}
              generationStatus={generationStatus}
              advanced={advanced}
              setAdvanced={setAdvanced}
              template={selectedTemplate}
              onHighlight={setHighlightedField}
              focusField={focusField}
              onClearFocusField={handleClearFocusField}
            />
          </Box>

          {/* RIGHT: Preview panel */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#9CA3AF",
                mb: 0.75,
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Live Preview
            </Typography>
            <PreviewPanel
              allValues={allValues}
              imageDataUrls={imageDataUrls}
              template={selectedTemplate}
              onFieldClick={handleFieldClick}
              highlightedField={highlightedField}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
