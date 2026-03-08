import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { Button } from "@heroui/react";
import data from '../Context/notescontext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function UserProfile(props) {
  const navigate=useNavigate()
  const context = useContext(data)
  const {user,setIsLoggedIn}=context
  const callLogout=()=>{
    console.log('called')
    setOpen(false); 
    localStorage.removeItem("authtoken")
    setIsLoggedIn(false)
    navigate('/login')
  }
  const {open,setOpen,} =props

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
 
  return (
    <div>
    

     <Drawer
  open={open}
  onClose={toggleDrawer(false)}
  sx={{
    '& .MuiDrawer-paper': {
      width: 300,
      padding: 3,
      background: `
        linear-gradient(
          rgba(255,255,255,0.65),
          rgba(255,255,255,0.55)
        ),
        radial-gradient(
          circle at 50% 0%,
          rgba(255,255,255,0.9),
          transparent 70%
        )
      `,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderLeft: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
    },
  }}
>
  <Box sx={{ p: 2 }} >
  <Stack direction="row" spacing={2} justifyContent="center" my={3}>
  <Avatar
    sx={{
      width: 70,
      height: 70,
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      fontSize: "1.5rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    }}
  >
    {user?.name?.charAt(0) || "U"}
  </Avatar>
</Stack>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    {[
    { label: "Name", value: user.name || "No Name" },
    { label: "Username", value: user.username || "No Username" },
    { label: "Email", value: user.email || "No Email" },
  ].map((item, index) => (
    <Box key={index}>
      <Box sx={{ fontWeight: 600, fontSize: "0.9rem", opacity: 0.7 }}>
        {item.label}
      </Box>
      <Box sx={{ fontSize: "1rem", fontWeight: 500 }}>
        {item.value}
      </Box>
    </Box>
  ))}
</Box>
<Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
  <Button
    onPress={callLogout}
    radius="full"
    variant="solid"
    style={{
      background: "linear-gradient(135deg, #ff4d4d, #ff1a1a)",
      color: "white",
      padding: "10px 30px",
      fontWeight: 600,
      boxShadow: "0 10px 20px rgba(255,0,0,0.3)"
    }}
  >
    Log Out
  </Button>
</Box>
  </Box>
</Drawer>
      
      </div>
  );
}
