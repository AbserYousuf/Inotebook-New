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
    const {note,noteId, title,description ,handleClickOpen,passnote,onView}=props 
    const context = useContext(data)
    const {deletenotes}=context
const removenotes =()=>{
    console.log("clicked")
     deletenotes(noteId)
}
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >  
        </Box>
      );
  return (
    <Box sx={{ minWidth: 200, maxWidth: 320, mx: 'auto', mt: 4 }} className="col">
  <Card
    sx={{
      position: "relative",
      borderRadius: "20px",
      padding: 2,
      background: `
        linear-gradient(
          rgba(255,255,255,0.6),
          rgba(255,255,255,0.5)
        )
      `,
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
      }
    }}
  >
        <Box
  sx={{
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
    gap: 1,
  }}
>
  <DeleteIcon
    onClick={removenotes}
    sx={{
      cursor: "pointer",
      color: "#ff4d4d",
      "&:hover": { transform: "scale(1.2)" },
      transition: "0.2s"
    }}
  />
  <BorderColorIcon
    onClick={() => {
      handleClickOpen();
      passnote(note);
    }}
    sx={{
      cursor: "pointer",
      color: "#555",
      "&:hover": { transform: "scale(1.2)" },
      transition: "0.2s"
    }}
  />
</Box>
<CardContent sx={{ mt: 3 }}>
  <Typography
    variant="h6"
    sx={{ fontWeight: 600, mb: 1 }}
  >
    {title || "Untitled"}
  </Typography>

  <Typography
    variant="body2"
    sx={{ opacity: 0.8 }}
  >
    {description || "No description"}
  </Typography>
</CardContent>
<CardActions sx={{ justifyContent: "flex-end" }}>
  <Button size="small" sx={{ textTransform: "none" }} onClick={onView}>
    View
  </Button>
</CardActions>
      </Card>
    </Box>
  )
}
