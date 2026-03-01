import { Popper, Fade, Paper, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

var purple = "#7C3AED";

export default function InputHint(props) {
  var anchorEl = props.anchorEl;
  var hints = props.hints;
  var open = props.open;
  var onDismiss = props.onDismiss;

  if (!hints || hints.length === 0) return null;

  return (
    <Popper
      open={open && Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="bottom-start"
      transition
      modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
      sx={{ zIndex: 1300 }}
    >
      {function (params) {
        var TransitionProps = params.TransitionProps;
        return (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={4}
              sx={{
                maxWidth: 320,
                p: 2,
                borderRadius: "0.75rem",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <LightbulbIcon sx={{ fontSize: 18, color: "#F59E0B" }} />
                  <Typography variant="body2" fontWeight={700} color="#1F2937" sx={{ fontSize: "0.8rem" }}>
                    Try something like:
                  </Typography>
                </Box>
                <IconButton size="small" onClick={onDismiss} sx={{ p: 0.25 }}>
                  <CloseIcon sx={{ fontSize: 14, color: "#9CA3AF" }} />
                </IconButton>
              </Box>
              <Box component="ul" sx={{ m: 0, pl: 2, listStyle: "none" }}>
                {hints.map(function (hint, i) {
                  return (
                    <Box
                      component="li"
                      key={i}
                      sx={{
                        position: "relative",
                        pl: 1.5,
                        mb: i < hints.length - 1 ? 0.75 : 0,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: "0.55em",
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: purple,
                        },
                      }}
                    >
                      <Typography variant="body2" color="#4B5563" sx={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                        {hint}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Fade>
        );
      }}
    </Popper>
  );
}
