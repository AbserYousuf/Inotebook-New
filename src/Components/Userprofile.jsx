import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Button } from "@heroui/react";
import data from '../Context/notescontext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile(props) {
  const navigate = useNavigate();
  const context = useContext(data);
  const { user, setIsLoggedIn } = context;

  const callLogout = () => {
    setOpen(false);
    localStorage.removeItem("authtoken");
    setIsLoggedIn(false);
    navigate('/login');
  };

  const { open, setOpen } = props;
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const fields = [
    { label: "Full Name", value: user?.name || "—" },
    { label: "Username", value: user?.username ? `@${user.username}` : "—" },
    { label: "Email", value: user?.email || "—" },
  ];

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            background: "linear-gradient(180deg, #fdf8f0 0%, #fef5e4 100%)",
            borderLeft: "1px solid rgba(212,169,106,0.2)",
            boxShadow: "-20px 0 60px rgba(20,14,8,0.18)",
          },
        }}
      >
        {/* Top accent */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #c9854a, #e8a96a, #c9854a)" }} />

        <Box sx={{ p: 3, fontFamily: "'DM Sans', sans-serif" }}>

          {/* Avatar */}
          <Stack direction="row" justifyContent="center" sx={{ my: 3 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 72, height: 72,
                  background: "linear-gradient(135deg, #c9854a, #e8a96a)",
                  fontSize: "1.6rem", fontWeight: 700,
                  fontFamily: "'Lora', serif",
                  boxShadow: "0 12px 30px rgba(201,133,74,0.35)",
                  border: "3px solid rgba(255,255,255,0.8)",
                }}
              >
                {user?.name?.[0]?.toUpperCase() || "U"}
              </Avatar>
              {/* Online dot */}
              <Box sx={{
                position: "absolute", bottom: 4, right: 4,
                width: 12, height: 12, borderRadius: "50%",
                background: "#4ade80",
                border: "2px solid white",
                boxShadow: "0 0 8px #4ade8099"
              }} />
            </Box>
          </Stack>

          {/* Name headline */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box sx={{ fontFamily: "'Lora', serif", fontSize: "1.15rem", fontWeight: 700, color: "#1a1008" }}>
              {user?.name || "User"}
            </Box>
            <Box sx={{ fontSize: "0.8rem", color: "#b8956a", mt: 0.5, letterSpacing: "0.05em" }}>
              iNotebook Member
            </Box>
          </Box>

          {/* Divider */}
          <Box sx={{ height: "1px", background: "rgba(212,169,106,0.2)", mb: 3 }} />

          {/* Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {fields.map((item, i) => (
              <Box
                key={i}
                sx={{
                  background: "rgba(212,169,106,0.07)",
                  border: "1px solid rgba(212,169,106,0.15)",
                  borderRadius: "12px",
                  p: "10px 14px",
                }}
              >
                <Box sx={{ fontSize: "10px", fontWeight: 600, color: "#b8956a", letterSpacing: "1.5px", textTransform: "uppercase", mb: 0.5 }}>
                  {item.label}
                </Box>
                <Box sx={{ fontSize: "0.9rem", fontWeight: 500, color: "#2d1f10", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.value}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Logout */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <button
              onClick={callLogout}
              style={{
                width: "100%", padding: "11px 0", borderRadius: "12px",
                border: "1px solid rgba(239,68,68,0.25)",
                background: "rgba(239,68,68,0.06)",
                color: "#dc2626", fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)"; }}
            >
              Sign out
            </button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
