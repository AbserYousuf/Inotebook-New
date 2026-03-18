import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import data from '../Context/notescontext';

export default function Fetchnote(props) {
  const { note, noteId, title, description, handleClickOpen, passnote, onView } = props;
  const context = useContext(data);
  const { deletenotes } = context;

  const removenotes = () => deletenotes(noteId);

  // Generate a soft warm accent per card (deterministic from title)
  const accents = [
    { bg: "#fff8f0", border: "#e8c49a", dot: "#c9854a" },
    { bg: "#f0f7ff", border: "#9abfe8", dot: "#4a85c9" },
    { bg: "#f0fff5", border: "#9ae8b8", dot: "#4ac97a" },
    { bg: "#fdf0ff", border: "#d49ae8", dot: "#a94ac9" },
    { bg: "#fffff0", border: "#e8e09a", dot: "#c9b84a" },
  ];
  const accent = accents[(title?.charCodeAt(0) || 0) % accents.length];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .fn-card { transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .fn-card:hover { transform: translateY(-5px); }
        .fn-action-btn { transition: all 0.15s; }
        .fn-action-btn:hover { transform: scale(1.15); }
      `}</style>

      <Box sx={{ minWidth: 200, maxWidth: 320, mx: 'auto', mt: 4 }} className="col">
        <Card
          className="fn-card"
          sx={{
            position: "relative",
            borderRadius: "18px",
            background: accent.bg,
            border: `1px solid ${accent.border}44`,
            boxShadow: `0 8px 30px ${accent.dot}18, 0 2px 8px rgba(0,0,0,0.06)`,
            overflow: "visible",
            p: 0,
          }}
        >
          {/* Color dot accent */}
          <Box sx={{
            position: "absolute", top: -6, left: 20,
            width: 12, height: 12, borderRadius: "50%",
            background: accent.dot,
            boxShadow: `0 0 10px ${accent.dot}66`,
            border: "2px solid white",
          }} />

          {/* Top line accent */}
          <Box sx={{
            height: "2px",
            background: `linear-gradient(90deg, ${accent.dot}88, ${accent.dot}22, transparent)`,
            borderRadius: "18px 18px 0 0",
          }} />

          {/* Action icons */}
          <Box sx={{
            position: "absolute", top: 12, right: 14,
            display: "flex", gap: 1, zIndex: 2,
          }}>
            <Box
              className="fn-action-btn"
              onClick={() => { handleClickOpen(); passnote(note); }}
              sx={{
                width: 28, height: 28, borderRadius: "8px",
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(0,0,0,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <BorderColorIcon sx={{ fontSize: 14, color: "#666" }} />
            </Box>
            <Box
              className="fn-action-btn"
              onClick={removenotes}
              sx={{
                width: 28, height: 28, borderRadius: "8px",
                background: "rgba(255,240,240,0.9)",
                border: "1px solid rgba(239,68,68,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <DeleteIcon sx={{ fontSize: 14, color: "#ef4444" }} />
            </Box>
          </Box>

          {/* Content */}
          <CardContent sx={{ pt: 3, pb: 1, px: 2.5 }}>
            <Typography
              sx={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#1a1008",
                mb: 1,
                pr: 7,
                lineHeight: 1.4,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {title || "Untitled"}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "#6b5040",
                lineHeight: 1.65,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                opacity: 0.85,
              }}
            >
              {description || "No content yet..."}
            </Typography>
          </CardContent>

          {/* Footer */}
          <CardActions sx={{ px: 2.5, pb: 2, pt: 0.5, justifyContent: "flex-end" }}>
            <button
              onClick={onView}
              style={{
                padding: "5px 14px", borderRadius: "8px",
                border: `1px solid ${accent.border}`,
                background: `${accent.dot}12`,
                color: accent.dot, fontWeight: 600, fontSize: "0.78rem",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${accent.dot}22`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${accent.dot}12`; }}
            >
              Read note →
            </button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
