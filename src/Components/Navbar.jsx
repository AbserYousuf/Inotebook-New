import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import data from '../Context/notescontext';
import { useContext } from 'react';
import Addnote from './Addnote';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/react";
import UserProfile from './Userprofile';

export default function Headbar() {
  const location = useLocation();
  const context = useContext(data);
  const { user, isLoggedIn, setIsLoggedIn } = context;

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authtoken"));
  }, []);

  const openTheProfile = () => setOpenUser(true);

  const PlusIcon = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const handleClickOpen = () => setOpen(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .hb-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          color: #5c3d1e;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          transition: all 0.15s;
          letter-spacing: 0.01em;
        }
        .hb-nav-link:hover {
          background: rgba(201,133,74,0.1);
          color: #c9854a;
        }
        .hb-login-btn {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 7px 18px;
          border-radius: 10px;
          border: 1px solid rgba(201,133,74,0.3);
          background: rgba(212,169,106,0.1);
          color: #c9854a;
          cursor: pointer;
          transition: all 0.15s;
          text-decoration: none;
          display: inline-block;
          letter-spacing: 0.02em;
        }
        .hb-login-btn:hover {
          background: rgba(201,133,74,0.18);
          border-color: rgba(201,133,74,0.5);
        }
        .hb-plus-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #c9854a, #e8a96a);
          color: white;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 16px rgba(201,133,74,0.35);
          transition: all 0.15s;
        }
        .hb-plus-btn:hover {
          transform: scale(1.07);
          box-shadow: 0 8px 22px rgba(201,133,74,0.45);
        }
        .hb-hamburger span {
          display: block;
          width: 20px; height: 2px;
          background: #c9854a;
          border-radius: 99px;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }
        .hb-menu-item {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 1rem;
          color: #3d2b1a;
          text-decoration: none;
          display: block;
          padding: 10px 0;
          border-bottom: 1px solid rgba(212,169,106,0.15);
          transition: color 0.15s;
        }
        .hb-menu-item:hover { color: #c9854a; }
      `}</style>

      {location.pathname !== '/' && (
        <>
          <Navbar
            onMenuOpenChange={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            style={{
              background: "rgba(253,248,240,0.88)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "1px solid rgba(212,169,106,0.2)",
              boxShadow: "0 4px 24px rgba(201,133,74,0.08)",
            }}
          >
            {/* ── Left: Hamburger + Brand ── */}
            <NavbarContent>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hb-hamburger sm:hidden"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}
              >
                <span style={{ transform: isMenuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
                <span style={{ opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? "scaleX(0)" : "none" }} />
                <span style={{ transform: isMenuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
              </button>

              {/* Brand */}
              <NavbarBrand>
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                  <img
                    src="/InotebookLogo.PNG"
                    alt="iNotebook Logo"
                    style={{
                      width: 34, height: 34, objectFit: "contain",
                      filter: "drop-shadow(0 3px 8px rgba(201,133,74,0.3))",
                    }}
                  />
                  <span style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    letterSpacing: "-0.2px",
                    background: "linear-gradient(135deg, #8b4513, #c9854a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    iNotebook
                  </span>
                </Link>
              </NavbarBrand>
            </NavbarContent>

            {/* ── Center: Nav links (logged out) ── */}
            <NavbarContent className="hidden sm:flex gap-1" justify="center">
              {!isLoggedIn && (
                <>
                  <NavbarItem>
                    <Link to="/" className="hb-nav-link">Home</Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link to="/about" className="hb-nav-link">About</Link>
                  </NavbarItem>
                </>
              )}
              {isLoggedIn && (
                <NavbarItem>
                  {/* subtle greeting */}
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "#b8956a",
                    letterSpacing: "0.03em",
                  }}>
                    Welcome back, {user?.name?.split(" ")[0] || "there"} ✦
                  </span>
                </NavbarItem>
              )}
            </NavbarContent>

            {/* ── Right: Actions ── */}
            <NavbarContent justify="end">
              {!isLoggedIn && (
                <NavbarItem>
                  {location.pathname !== '/signup' && (
                    <Link to="/login" className="hb-login-btn">
                      Sign in
                    </Link>
                  )}
                </NavbarItem>
              )}

              {isLoggedIn && (
                <>
                  {/* Add note button */}
                  <button
                    className="hb-plus-btn"
                    onClick={handleClickOpen}
                    title="New note"
                  >
                    <PlusIcon sx={{ fontSize: 18 }} />
                  </button>

                  {/* Avatar */}
                  <Stack direction="row" spacing={1}>
                    <Avatar
                      onClick={openTheProfile}
                      sx={{
                        width: 36, height: 36,
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        fontFamily: "'Lora', serif",
                        cursor: "pointer",
                        background: "linear-gradient(135deg, #c9854a, #e8c49a)",
                        boxShadow: "0 4px 14px rgba(201,133,74,0.3)",
                        border: "2px solid rgba(255,255,255,0.8)",
                        transition: "all 0.2s",
                        "&:hover": { transform: "scale(1.08)", boxShadow: "0 6px 18px rgba(201,133,74,0.4)" }
                      }}
                    >
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                  </Stack>
                </>
              )}
            </NavbarContent>

            {/* ── Mobile menu ── */}
            {!isLoggedIn && (
              <NavbarMenu style={{
                background: "rgba(253,248,240,0.96)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(212,169,106,0.15)",
                padding: "16px 20px",
              }}>
                {menuItems.map((item, index) => (
                  <NavbarMenuItem key={index}>
                    <Link
                      to={item.path}
                      className="hb-menu-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </NavbarMenuItem>
                ))}
              </NavbarMenu>
            )}
          </Navbar>

          <UserProfile open={openUser} setOpen={setOpenUser} />
          <Addnote handleClickOpen={handleClickOpen} open={open} setOpen={setOpen} />
        </>
      )}
    </>
  );
}
