import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import data from '../Context/notescontext';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { useEffect } from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function InsertNote(props) {
    const context = useContext(data)
    const titleLength = 200
    const DescriptionLength = 11000
    const {updatenotes}=context
const {handleClose ,open,note}=props  
const [message,setmessage]= useState("")
      const [showAlert, setShowAlert] = useState(false);
const [currentnotes, setcurrentnotes] = useState({
    id: "",
    title:  "",
    description: ""
});
const handlechange=(event)=>{
  const { name, value } = event.target;
  if (name === "title") {
    if (value.length <= titleLength) {
      setcurrentnotes({ ...currentnotes, title: value });
    }
    else{
      setShowAlert(true)
      setmessage("Title Is Too Long")
      setTimeout(() => {
        setShowAlert(false);
        setmessage("")
      }, 2000);
    }
    return;
  }

  if (name === "description") {
    if (value.length <= DescriptionLength) {
      setcurrentnotes({ ...currentnotes, description: value });
    }
    else{
      setShowAlert(true)
      setmessage("Description is Too Long")
      setTimeout(() => {
        setShowAlert(false);
        setmessage("")
      }, 2000);
    }
    return;
  }

}
useEffect(() => {
    if(open && note){
        setcurrentnotes({
          id: note._id || "",
          title: note.title || "",
          description: note.description || ""
        });
    }
    
  },[open,note]);
  const handleSubmit = (event) => {
    event.preventDefault();
     const sendtitle = currentnotes.title.trim()
     const sendDescription = currentnotes.description.trim()
     updatenotes(currentnotes.id,sendtitle,sendDescription)
    handleClose();
    setcurrentnotes({
      title:"",
      description:""
    })
  };
  return (
    <>
    <React.Fragment>
    <Dialog
  fullScreen
  open={open}
  onClose={handleClose}
  slots={{ transition: Transition }}
  slotProps={{
    paper: {
      sx: {
        background: `
          linear-gradient(
            rgba(255,255,255,0.6),
            rgba(255,255,255,0.5)
          )
        `,
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }
    }
  }}
>
<AppBar
  sx={{
    position: "relative",
    background: `
      linear-gradient(
        rgba(255,255,255,0.7),
        rgba(255,255,255,0.6)
      )
    `,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    color: "#222"
  }}
>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  EditNotes
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                 Update
                </Button>
              </Toolbar>
            </AppBar>
            <List sx={{ position: "relative" }}>
    
    {showAlert && (
      <Alert
        severity="warning"
        sx={{
          position: "absolute",
          top: 16,
          right: 24,
          width: "16em",
          height: "3em",
          display: "flex",
          alignItems: "center",
          zIndex: 1000
        }}
      >
        {message}
      </Alert>
    )}
    
    <Divider />
              <Divider />
              <form  id="subscription-form">
                <TextField
                  margin="dense"
                  multiline
                  id="title"
                  name="title"
                  label="Title:"
                  type="title"
                 onChange={handlechange}
                 value={currentnotes.title}
                  fullWidth
                  rows={8}
                  transitioncomponent={Transition} 
                  maxRows={12}
                  sx={{
                    // Main container
                    '& .MuiInputBase-root': {
                      padding: '12px 16px',          // reasonable padding on all sides
                      fontSize: '1.05rem',
                      minHeight: '120px',           
                      alignItems: 'flex-start',  
                   
                    },
                
                    
                    '& .MuiInputBase-input': {
                      padding: '0 !important',      
                      margin: '0',                  
                      lineHeight: '1.5',             
                    },
                
                    // Label styling
                    '& .MuiInputLabel-root': {
                      fontSize: '1.1rem',
                      transform: 'translate(0, 12px) scale(1)', // better label position
                      '&.Mui-focused': {
                        transform: 'translate(0, -6px) scale(0.75)',
                     
                      },
                    },
                
                    // When focused
                    '& .Mui-focused .MuiInputBase-root': {
                      borderColor: 'primary.main',
                    },
                  }}
                  variant="standard"
                  error={currentnotes.title.length === titleLength }
                  helperText={
                    currentnotes.title.length === titleLength
                      ? `Title too long! Max ${titleLength} characters`
                      : `${currentnotes.title.length}/${titleLength}`
                  }
                />
               <TextField
      style={{position:'relative',top:"1em"}}
      margin="dense"
      id="description"
      name="description"           // ← fixed typo: "desription" → "description"
      label="Description:"
      type="text"
      fullWidth
      variant="standard"
      multiline       
      onChange={handlechange}
      value={currentnotes.description}             // ← enables new lines on Enter
      rows={8}                     // ← initial visible height (adjust as needed)
      maxRows={12} 
      error={currentnotes.description.length === DescriptionLength  }
                  helperText={
                    currentnotes.description.length === DescriptionLength
                      ? `Description too long! Max ${DescriptionLength}} characters`
                      : `${currentnotes.description.length}/${DescriptionLength}`
                  }
      transitioncomponent={Transition}           
      sx={{
        // Main container
        '& .MuiInputBase-root': {
          padding: '12px 16px',          // reasonable padding on all sides
          fontSize: '1.05rem',
          minHeight: '320px',            // total height of the field
          alignItems: 'flex-start', 
        
        },
    
        // The actual input area (where you type)
        '& .MuiInputBase-input': {
          padding: '0 !important',       // remove extra internal padding
          margin: '0',                   // no margin
          lineHeight: '1.5',             // comfortable line spacing
        },
    
        // Label styling
        '& .MuiInputLabel-root': {
          fontSize: '1.1rem',
          transform: 'translate(0, 12px) scale(1)', // better label position
          '&.Mui-focused': {
            transform: 'translate(0, -6px) scale(0.75)',
          },
        },
    
        // When focused
        '& .Mui-focused .MuiInputBase-root': {
          borderColor: 'primary.main',
        },
      }}
    />
                
              </form>
            </List>
          </Dialog>
        </React.Fragment>
       </>
  );
}
