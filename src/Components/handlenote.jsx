import {  useContext, useEffect, useState } from 'react';
import data from '../Context/notescontext';
import Fetchnote from './fetchnote';
import Skeleton from '@mui/material/Skeleton';
import NoteViewer from './NoteViewer';
import InsertNote from './Insertnote';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
export default function Handlenote() {
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [note,setnote]=useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const Navigate=useNavigate()

const passnote=(note)=>{
  console.log("clicked")
  console.log(note)
   setnote(note)
}
  const handleClose = () => {
    setOpen(false);
  };
  
  const context = useContext(data)
  const {notes,loading,getnotes,userdetails,user} = context
  useEffect(() => {
    const token = localStorage.getItem('authtoken')
    if(token){
      getnotes()
      userdetails()
    }
    else{

      Navigate('/login')
    }
  }, [])
    if(loading){
        return  <div style={{ backgroundColor: "white", minHeight: "100vh" }} className="container py-4">
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{
          background:`
                radial-gradient(circle at 15% 15%, rgba(255,255,255,0.05), transparent 35%),
                radial-gradient(circle at 85% 80%, rgba(255,255,255,0.03), transparent 40%),
                linear-gradient(145deg, #0f0f0f, #1a1a1a)
              `
        }}>
          
          {[...Array(13)].map((_, index) => (
            <div className="col" key={index}>
              <Skeleton
                sx={{background:`#bdbdbd
                ` }}
                variant="rectangular"
                height={180}
                width="100%"
              />
            </div>
          ))}
      
        </div>
      </div>
    }
    if (!loading && notes.length === 0) {
      return (
        <div className="container text-center my-5">
          <h2 style={{color:"white"}}>Sorry, {user.Name?user.Name:"User"}. No Notes Founded.</h2>
          <p style={{color:"white"}}>  Try creating your first note </p>
        </div>
      );
    }
  return (
   <>
   <div className=" container ">
    
    <h1 style={{textAlign:"center",color:"white"}} className='font-bold text-inherit my-3'>Hey {user.Name?user.Name:"User"} !. Your Notes Are Listed Below</h1>
     <div className="row row-cols-3">
     
    {notes.map((note)=>{
      return(
        <Fetchnote
         noteId={note._id}
          note={note} 
          key={note._id}
           title={note.title.slice(0,15)}
            description={note.description.slice(0,15)} 
            handleClickOpen={handleClickOpen}
            passnote={passnote}
            onView={() => setSelectedNote(note)} 
         />
        
        )
      })}
      </div>
  </div>
      <InsertNote note={note} handleClose={handleClose} open={open} />
      <Addnote note ={note}/>
      <NoteViewer
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />
   </>
  )
}
