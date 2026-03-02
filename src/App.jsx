import { useState, useMemo, useEffect, useRef } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from "@mui/material";
import JSZip from "jszip";
import LaunchStepper from "./components/LaunchStepper";
import PreviewPanel from "./components/PreviewPanel";
import { steps } from "./data/steps";
import { fillTemplate } from "./data/template";
import { templates } from "./data/templates/index";
import { FIELD_TO_STEP, getPageForField } from "./data/fieldMappings";
import { generateSiteContent, suggestPages } from "./services/gemini";
import { getPageType, isCustomPage } from "./data/pageTypes";

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

  var stateSelectedElement = useState(null);
  var selectedElement = stateSelectedElement[0];
  var setSelectedElement = stateSelectedElement[1];

  var stateGenerationStatus = useState(
    saved && saved.generationStatus === "done" ? "done" : "idle"
  );
  var generationStatus = stateGenerationStatus[0];
  var setGenerationStatus = stateGenerationStatus[1];

  var stateActivePage = useState(saved && saved.activePage ? saved.activePage : "home");
  var activePage = stateActivePage[0];
  var setActivePage = stateActivePage[1];

  var stateSuggestedPages = useState(null);
  var suggestedPages = stateSuggestedPages[0];
  var setSuggestedPages = stateSuggestedPages[1];

  var pageSuggestStatusRef = useRef("idle");

  var lastGenInputsRef = useRef("");
  var genInputs = [formData.brandName, formData.businessType, formData.ctaIntent, formData.description].join("|");

  /* Seed fingerprint ref on initial load so a restored "done" session doesn't re-generate */
  useEffect(function () {
    if (generationStatus === "done" || generationStatus === "error") {
      lastGenInputsRef.current = genInputs;
    }
  }, []);

  /* Trigger AI page suggestions when entering step 5+ (after theme is selected) */
  useEffect(function () {
    if (activeStep >= 5 && pageSuggestStatusRef.current === "idle" && !formData.selectedPages) {
      pageSuggestStatusRef.current = "loading";
      suggestPages(
        formData.brandName,
        formData.businessType,
        formData.ctaIntent,
        formData.description,
        selectedTemplate
      ).then(function (pages) {
        pageSuggestStatusRef.current = "done";
        setSuggestedPages(pages);
      }).catch(function () {
        pageSuggestStatusRef.current = "error";
      });
    }
  }, [activeStep]);

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
      return Object.assign({}, prev, { theme: themeId, selectedPages: null });
    });
    var t = templates.find(function (t) { return t.id === themeId; });
    if (t) {
      setColors(Object.assign({}, t.defaultColors));
    }
    setAdvanced(defaultAdvanced);
    setGenerationStatus("idle");
    setActivePage("home");
    setSuggestedPages(null);
    pageSuggestStatusRef.current = "idle";
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
      formData.businessType,
      formData.selectedPages
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

  /* Auto-trigger generation when navigating past the pages step */
  useEffect(function () {
    if (activeStep >= 7) {
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
      activePage: activePage,
    });
  }, [activeStep, formData, colors, logoDataUrl, imageDataUrls, advanced, generationStatus, activePage]);

  function handleDownload() {
    var pages = selectedTemplate.pages;
    var selectedPages = formData.selectedPages;

    // Filter to selected pages
    var activePages = pages;
    if (selectedPages && pages && pages.length > 1) {
      activePages = pages.filter(function (p) { return selectedPages.indexOf(p.id) !== -1; });
    }

    // Append custom pages
    var customEntries = [];
    if (selectedPages) {
      selectedPages.forEach(function (id) {
        if (!isCustomPage(id, pages)) return;
        var pt = getPageType(id);
        if (pt) customEntries.push({ id: pt.id, filename: pt.filename, title: pt.title });
      });
    }

    var allPages = (activePages || []).concat(customEntries);

    if (!allPages || allPages.length <= 1) {
      // Single page download
      var pageId = allPages && allPages.length === 1 ? allPages[0].id : "home";
      var html = fillTemplate(selectedTemplate, allValues, imageDataUrls, pageId);
      var blob = new Blob([html], { type: "text/html" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = (formData.brandName || "site") + ".html";
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    // Multi-page: create ZIP
    var zip = new JSZip();
    allPages.forEach(function (page) {
      var pageHtml = fillTemplate(selectedTemplate, allValues, imageDataUrls, page.id);
      zip.file(page.filename, pageHtml);
    });

    zip.generateAsync({ type: "blob" }).then(function (zipBlob) {
      var url = URL.createObjectURL(zipBlob);
      var a = document.createElement("a");
      a.href = url;
      a.download = (formData.brandName || "site") + ".zip";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function handleRestart() {
    setActiveStep(0);
    setFormData(defaultForm);
    setColors(defaultColors);
    setImages([]);
    setLogoDataUrl("");
    setAdvanced(defaultAdvanced);
    setGenerationStatus("idle");
    setActivePage("home");
    setSuggestedPages(null);
    pageSuggestStatusRef.current = "idle";
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  function handleFieldClick(selection) {
    if (!selection) {
      setSelectedElement(null);
      return;
    }
    var field = selection.field;
    var stepIndex = FIELD_TO_STEP[field];
    if (activeStep === steps.length - 1) {
      if ((field === "images" || field === "logo") && stepIndex !== undefined) {
        setActiveStep(stepIndex);
      } else {
        var fieldPage = getPageForField(selectedTemplate, field);
        if (fieldPage && fieldPage.id !== activePage) {
          setActivePage(fieldPage.id);
        }
        // Handle cp_ fields — switch to the custom page
        if (field.indexOf("cp_") === 0) {
          var parts = field.split("_");
          if (parts.length >= 3) {
            var cpPageId = parts[1];
            if (cpPageId !== activePage) setActivePage(cpPageId);
          }
        }
        setSelectedElement(selection);
      }
    } else {
      if ((field === "images" || field === "logo") && stepIndex !== undefined) {
        setActiveStep(stepIndex);
      } else {
        setActiveStep(steps.length - 1);
        var fieldPage2 = getPageForField(selectedTemplate, field);
        if (fieldPage2 && fieldPage2.id !== activePage) {
          setActivePage(fieldPage2.id);
        }
        if (field.indexOf("cp_") === 0) {
          var parts2 = field.split("_");
          if (parts2.length >= 3) {
            var cpPageId2 = parts2[1];
            if (cpPageId2 !== activePage) setActivePage(cpPageId2);
          }
        }
        setSelectedElement(selection);
      }
    }
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
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              activePage={activePage}
              setActivePage={setActivePage}
              suggestedPages={suggestedPages}
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
              selectedElement={selectedElement}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
