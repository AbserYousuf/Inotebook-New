import React, { useEffect } from 'react'
import { Button } from "@heroui/react";
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import data from '../Context/notescontext';
import { useContext } from 'react';
import Addnote from './Addnote';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/react";
import UserProfile from './Userprofile';
export default function Headbar() {
  const location = useLocation()
  const context = useContext(data)

  const {user,isLoggedIn, setIsLoggedIn}= context
  
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authtoken"));
  }, [])
  const openTheProfile=()=>{
    setOpenUser(true)
  }
  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  const menuItems = [
    
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    
  ];
  const [open,setOpen]=useState(false)
  const [openUser, setOpenUser] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
    {location.pathname!=='/' &&(
      <> 
<Navbar
  onMenuOpenChange={setIsMenuOpen}
  isMenuOpen={isMenuOpen}
  style={{
    background: isLoggedIn
      ? `
        linear-gradient(
          rgba(255,255,255,0.65),
          rgba(255,255,255,0.55)
        ),
        radial-gradient(
          circle at 50% 0%,
          rgba(255,255,255,0.9),
          transparent 70%
        )
      `
      : `
        linear-gradient(
          rgba(255,255,255,0.15),
          rgba(255,255,255,0.05)
        )
      `,
    backdropFilter: isLoggedIn
      ? "blur(22px) saturate(180%)"
      : "blur(12px) saturate(160%)",
    WebkitBackdropFilter: isLoggedIn
      ? "blur(22px) saturate(180%)"
      : "blur(12px) saturate(160%)",
    borderBottom: isLoggedIn
      ? "1px solid rgba(255,255,255,0.8)"
      : "1px solid rgba(255,255,255,0.2)",
    boxShadow: isLoggedIn
      ? "0 8px 30px rgba(0,0,0,0.08)"
      : "0 8px 30px rgba(99,102,241,0.15)",
    transition: "all 0.4s ease"
  }}
>
      <NavbarContent>
      <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="sm:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
>
  <span
    className={`absolute h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 ${
      isMenuOpen ? "rotate-45" : "-translate-y-2"
    }`}
  />
  <span
    className={`absolute h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 ${
      isMenuOpen ? "opacity-0" : "opacity-100"
    }`}
  />
  <span
    className={`absolute h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 ${
      isMenuOpen ? "-rotate-45" : "translate-y-2"
    }`}
  />
</button>
      <NavbarBrand>
  <Link 
  
    style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "10px", 
      textDecoration: "none" 
    }}
  >
    
    {/* LOGO IMAGE */}
    <img
      src="/InotebookLogo.PNG"  // <-- change this to your logo path
      alt="Inotebook Logo"
      style={{
        width: "36px",
        height: "36px",
        objectFit: "contain",
        filter: isLoggedIn 
          ? "drop-shadow(0 4px 12px rgba(0,0,0,0.2))"
          : "drop-shadow(0 4px 12px rgba(99,102,241,0.4))",
        transition: "0.3s"
      }}
    />

    {/* BRAND TEXT */}
    <span
      style={{
        fontWeight: 700,
        fontSize: "1.25rem",
        letterSpacing: "0.5px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      iNotebook
    </span>

  </Link>
</NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {!isLoggedIn &&(
          <>
        <NavbarItem>
          <Link color="foreground" style={{textDecoration:"none"}} to='/' className='font-bold text-inherit my-3'>
           Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" to='/about' style={{textDecoration:"none"}} className='font-bold text-inherit my-3'>
            About
          </Link>
        </NavbarItem>
          </>
        )}
        <NavbarItem isActive>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!isLoggedIn&&(
          <>
        <NavbarItem className="hidden lg:flex">
          
        </NavbarItem>
        <NavbarItem>
        {location.pathname !=='/signup' || location.pathname==='/login' &&(
        <Link to="/login" style={{ textDecoration: "none" }}>
  <Button
    radius="full"
    variant="flat"
    style={{
      fontWeight: 600,
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(10px)"
    }}
  >
    Login
  </Button>
  
</Link>

        )}

        </NavbarItem>
          </>
        )}
        { isLoggedIn &&(
          <>
     
     <Button
  isIconOnly
  radius="full"
  variant="flat"
  onPress={handleClickOpen}
  style={{
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    boxShadow: "0 6px 18px rgba(102,126,234,0.3)",
    transition: "0.3s"
  }}
>
  <PlusIcon />
</Button>
          <Stack direction="row" spacing={2}>
          <Avatar
  onClick={openTheProfile}
  sx={{
    width: 38,
    height: 38,
    fontSize: "0.95rem",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.08)"
    }
  }}
>
  {user?.Name?.[0] || "U"}
</Avatar>
      </Stack>
          </>
        )}
      </NavbarContent>
      {!isLoggedIn&&(
      <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={index}>
          <Link
            to={item.path}
            style={{ textDecoration: "none" }}
            className="w-full font-bold text-inherit"
            onClick={() => setIsMenuOpen(false)} // close menu on click
          >
            {item.name}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
      )}
    </Navbar> 
    <UserProfile open={openUser} setOpen={setOpenUser}/>
    <Addnote handleClickOpen={handleClickOpen} open={open} setOpen={setOpen}/> 
      </>
    )}
   </>
  )
}
