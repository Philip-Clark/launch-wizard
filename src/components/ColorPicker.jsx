import { useRef, useCallback, useEffect, useState } from "react";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";

var purple = "#7C3AED";

/* ── HSV ↔ Hex conversions ────────────────────────────── */

function hsvToRgb(h, s, v) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  v = Math.max(0, Math.min(1, v));
  var c = v * s;
  var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  var m = v - c;
  var r, g, b;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var d = max - min;
  var h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * (((b - r) / d) + 2);
    else h = 60 * (((r - g) / d) + 4);
  }
  if (h < 0) h += 360;
  var s = max === 0 ? 0 : d / max;
  return [h, s, max];
}

function hsvToHex(h, s, v) {
  var rgb = hsvToRgb(h, s, v);
  return "#" +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
      .toString(16).slice(1).toUpperCase();
}

function hexToHsv(hex) {
  if (!hex || hex.length < 7) return [0, 1, 1];
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return rgbToHsv(r, g, b);
}

function isValidHex(hex) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function normalizeHex(hex) {
  if (hex.length === 4) {
    return "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex.toUpperCase();
}

/* ── Saturation-Brightness Square ─────────────────────── */

var SQ_SIZE = 160;

function drawSatBright(canvas, hue) {
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;

  // White → hue gradient (horizontal)
  var gradH = ctx.createLinearGradient(0, 0, w, 0);
  var pureColor = "hsl(" + hue + ", 100%, 50%)";
  gradH.addColorStop(0, "#fff");
  gradH.addColorStop(1, pureColor);
  ctx.fillStyle = gradH;
  ctx.fillRect(0, 0, w, h);

  // Transparent → black gradient (vertical)
  var gradV = ctx.createLinearGradient(0, 0, 0, h);
  gradV.addColorStop(0, "rgba(0,0,0,0)");
  gradV.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = gradV;
  ctx.fillRect(0, 0, w, h);
}

function SatBrightSquare(props) {
  var hue = props.hue;
  var sat = props.sat;
  var bright = props.bright;
  var onChange = props.onChange;

  var canvasRef = useRef(null);
  var dragging = useRef(false);

  useEffect(function () {
    if (canvasRef.current) drawSatBright(canvasRef.current, hue);
  }, [hue]);

  var handlePointer = useCallback(function (e) {
    var rect = canvasRef.current.getBoundingClientRect();
    var x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    var y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onChange(x, 1 - y);
  }, [onChange]);

  function handleDown(e) {
    e.preventDefault();
    dragging.current = true;
    handlePointer(e);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  function handleMove(e) {
    if (dragging.current) handlePointer(e);
  }

  function handleUp() {
    dragging.current = false;
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  }

  var dotX = sat * 100;
  var dotY = (1 - bright) * 100;

  return (
    <Box sx={{ position: "relative", width: SQ_SIZE, height: SQ_SIZE, borderRadius: "8px", overflow: "hidden", cursor: "crosshair" }}>
      <canvas
        ref={canvasRef}
        width={SQ_SIZE}
        height={SQ_SIZE}
        onPointerDown={handleDown}
        style={{ display: "block", width: SQ_SIZE, height: SQ_SIZE }}
      />
      <Box
        sx={{
          position: "absolute",
          left: dotX + "%",
          top: dotY + "%",
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "2px solid #fff",
          boxShadow: "0 0 3px rgba(0,0,0,0.5)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

/* ── Hue Slider ───────────────────────────────────────── */

function drawHue(canvas) {
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var grad = ctx.createLinearGradient(0, 0, w, 0);
  for (var i = 0; i <= 6; i++) {
    grad.addColorStop(i / 6, "hsl(" + (i * 60) + ", 100%, 50%)");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function HueSlider(props) {
  var hue = props.hue;
  var onChange = props.onChange;

  var canvasRef = useRef(null);
  var dragging = useRef(false);

  useEffect(function () {
    if (canvasRef.current) drawHue(canvasRef.current);
  }, []);

  var handlePointer = useCallback(function (e) {
    var rect = canvasRef.current.getBoundingClientRect();
    var x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onChange(x * 360);
  }, [onChange]);

  function handleDown(e) {
    e.preventDefault();
    dragging.current = true;
    handlePointer(e);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  function handleMove(e) {
    if (dragging.current) handlePointer(e);
  }

  function handleUp() {
    dragging.current = false;
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
  }

  var thumbX = (hue / 360) * 100;

  return (
    <Box sx={{ position: "relative", width: SQ_SIZE, height: 14, borderRadius: "7px", overflow: "hidden", cursor: "pointer", mt: 0.75 }}>
      <canvas
        ref={canvasRef}
        width={SQ_SIZE}
        height={14}
        onPointerDown={handleDown}
        style={{ display: "block", width: SQ_SIZE, height: 14 }}
      />
      <Box
        sx={{
          position: "absolute",
          left: thumbX + "%",
          top: "50%",
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "2px solid #fff",
          boxShadow: "0 0 3px rgba(0,0,0,0.5)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

/* ── Main ColorPicker ─────────────────────────────────── */

export default function ColorPicker(props) {
  var value = props.value;
  var onChange = props.onChange;
  var label = props.label;

  var stateHsv = useState(function () { return hexToHsv(value); });
  var hsv = stateHsv[0];
  var setHsv = stateHsv[1];

  var stateHexInput = useState(value);
  var hexInput = stateHexInput[0];
  var setHexInput = stateHexInput[1];

  var stateHexError = useState(false);
  var hexError = stateHexError[0];
  var setHexError = stateHexError[1];

  // Sync from external value changes
  var skipSync = useRef(false);
  useEffect(function () {
    if (skipSync.current) {
      skipSync.current = false;
      return;
    }
    setHsv(hexToHsv(value));
    setHexInput(value);
    setHexError(false);
  }, [value]);

  function emitChange(h, s, v) {
    var hex = hsvToHex(h, s, v);
    skipSync.current = true;
    setHsv([h, s, v]);
    setHexInput(hex);
    setHexError(false);
    onChange(hex);
  }

  function handleSatBright(s, v) {
    emitChange(hsv[0], s, v);
  }

  function handleHue(h) {
    emitChange(h, hsv[1], hsv[2]);
  }

  function handleHexInputChange(e) {
    var raw = e.target.value;
    if (raw.length > 0 && raw[0] !== "#") raw = "#" + raw;
    if (raw.length > 7) raw = raw.slice(0, 7);
    setHexInput(raw);

    if (isValidHex(raw)) {
      var normalized = normalizeHex(raw);
      setHexError(false);
      skipSync.current = true;
      setHsv(hexToHsv(normalized));
      onChange(normalized);
    } else {
      setHexError(raw.length >= 4);
    }
  }

  function handleHexBlur() {
    if (isValidHex(hexInput)) {
      var normalized = normalizeHex(hexInput);
      onChange(normalized);
      setHexError(false);
    } else {
      setHexInput(value);
      setHexError(false);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {label && (
        <Typography variant="body2" fontWeight={600} color="#1F2937" sx={{ fontSize: "0.8rem", mb: 0.3 }}>
          {label}
        </Typography>
      )}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        <Box>
          <SatBrightSquare hue={hsv[0]} sat={hsv[1]} bright={hsv[2]} onChange={handleSatBright} />
          <HueSlider hue={hsv[0]} onChange={handleHue} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, pt: 0.5 }}>
          {/* Color preview swatch */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "8px",
              background: value,
              border: "1px solid #D1D5DB",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          />
          {/* Hex input */}
          <TextField
            size="small"
            value={hexInput}
            onChange={handleHexInputChange}
            onBlur={handleHexBlur}
            onKeyDown={function (e) { if (e.key === "Enter") e.target.blur(); }}
            error={hexError}
            placeholder="#000000"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: "3px",
                        background: value,
                        border: "1px solid #D1D5DB",
                      }}
                    />
                  </InputAdornment>
                ),
                sx: {
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  height: 30,
                  borderRadius: "0.5rem",
                  background: "#F9FAFB",
                  "& fieldset": { borderColor: hexError ? "#EF4444" : "#D1D5DB" },
                  "&:hover fieldset": { borderColor: hexError ? "#EF4444" : purple },
                  "&.Mui-focused fieldset": { borderColor: hexError ? "#EF4444" : purple },
                },
              },
            }}
            sx={{ width: 100 }}
          />
        </Box>
      </Box>
    </Box>
  );
}
