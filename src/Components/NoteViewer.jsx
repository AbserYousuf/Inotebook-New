import { useEffect } from "react";
import { X, BookOpen } from "lucide-react";

export default function NoteViewer({ note, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes backdropIn { from{opacity:0} to{opacity:1} }
        @keyframes modalIn { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .nv-backdrop { animation: backdropIn 0.25s ease forwards; }
        .nv-modal { animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; font-family:'DM Sans',sans-serif; }
        .nv-title { font-family:'Lora',serif; }
        .nv-scrollbar::-webkit-scrollbar { width:4px; }
        .nv-scrollbar::-webkit-scrollbar-track { background:transparent; }
        .nv-scrollbar::-webkit-scrollbar-thumb { background:#d4a96a44; border-radius:99px; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="nv-backdrop absolute inset-0"
        style={{ background: "rgba(20,14,8,0.7)", backdropFilter: "blur(6px)" }}
      />

      {/* Modal */}
      <div
        className="nv-modal relative z-10 w-[95%] md:w-[68%] lg:w-[52%] max-h-[88vh] flex flex-col"
        style={{
          background: "linear-gradient(160deg, #fdf8f0 0%, #fef9f2 50%, #fdf5e8 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(212,169,106,0.25)",
          boxShadow: "0 32px 80px rgba(20,14,8,0.28), 0 0 0 1px rgba(255,255,255,0.6) inset",
        }}
      >
        {/* Decorative top stripe */}
        <div style={{
          height: "3px",
          background: "linear-gradient(90deg, #c9854a, #e8a96a, #c9854a)",
          borderRadius: "20px 20px 0 0",
          flexShrink: 0,
        }} />

        {/* Header */}
        <div
          className="flex items-start justify-between px-8 py-6"
          style={{ borderBottom: "1px solid rgba(212,169,106,0.18)", flexShrink: 0 }}
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0, marginTop: 2,
              background: "linear-gradient(135deg, #c9854a22, #e8a96a22)",
              border: "1px solid rgba(201,133,74,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <BookOpen size={16} color="#c9854a" />
            </div>
            <h2
              className="nv-title break-words"
              style={{ fontSize: "clamp(1.2rem,3vw,1.6rem)", fontWeight: 700, color: "#1a1008", lineHeight: 1.3, margin: 0 }}
            >
              {note.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(212,169,106,0.25)",
              background: "rgba(212,169,106,0.08)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginLeft: 12, transition: "all 0.15s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,133,74,0.15)"; e.currentTarget.style.borderColor = "rgba(201,133,74,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(212,169,106,0.08)"; e.currentTarget.style.borderColor = "rgba(212,169,106,0.25)"; }}
          >
            <X size={16} color="#8b6343" />
          </button>
        </div>

        {/* Body */}
        <div
          className="nv-scrollbar px-8 py-6 overflow-y-auto flex-1"
          style={{ color: "#3d2b1a", lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-wrap", fontFamily: "'DM Sans', sans-serif" }}
        >
          {note.description}
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 32px", borderTop: "1px solid rgba(212,169,106,0.15)",
          display: "flex", justifyContent: "flex-end", flexShrink: 0
        }}>
          <span style={{ fontSize: "11px", color: "#b8956a", letterSpacing: "0.05em" }}>
            Press <kbd style={{ background: "rgba(201,133,74,0.1)", border: "1px solid rgba(201,133,74,0.2)", borderRadius: 4, padding: "1px 5px", fontSize: 10, color: "#8b6343" }}>ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
