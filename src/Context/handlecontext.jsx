import { useEffect, useState } from "react";
import data from "./notescontext";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Login";

export default function Handlecontext({children}) {
    const [notes,setnotes] = useState([])
    const [loading,setloading]=useState(false)
    const [user,setuser]=useState([])
    const navigate = useNavigate()
    const [msg,setmsg]=useState(null)
    const [alert, setAlert] = useState({ message: '', type: '' });
   
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("authtoken")
      );
      const [error,setError]= useState(null)
      const [UserEmail,setUserEmail]=useState(null)
    const deletenotes =async(id)=>{
        const token = localStorage.getItem('authtoken')
        const URL =  'http://localhost:3000'
        try {
            const response = await fetch(`${URL}/api/notes/deletenotes/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    authtoken:token
                }
            })
            if(!response.ok){
                throw new Error("http Error Status",response.status)
            }
            const json= await response.json() 
            console.log(json)
            setnotes(notes.filter((note)=>note._id !== id))
            
        } catch (error) {
            console.error(error)
        }
    }
    
    const addnotes =async(title,description)=>{
      const token = localStorage.getItem('authtoken')
        const Url = 'http://localhost:3000'
        try {
            const response = await fetch(`${Url}/api/notes/createnotes`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    authtoken:token
                },
                body:JSON.stringify({title,description})
            })
            const json = await response.json()
            if(!response.ok){
                throw new Error("http status error",response.status)
            }
            setnotes((prev) => [...prev, json.note]);
             
        } catch (error) {
            console.error(error)
           
        }
    }
    const updatenotes=async(id, title,description)=>{
        const token = localStorage.getItem('authtoken')
        console.log(title,description)
        const Url = "http://localhost:3000"
        try {
            const response = await fetch(`${Url}/api/notes/updatenotes/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    authtoken:token
                },
                body:JSON.stringify({title,description})
            })
            const json = await response.json()
            if(!response.ok){
                throw new Error("http status error",response.status)
            }
          
            setnotes(
                prevNotes =>
                    prevNotes.map(n =>
                        n._id === id
                            ? { ...n, title, description }   // merge new values
                            : n
                    )
            )
            
        } catch (error) {
            console.error(error)
        }

    }
    const Forgotpassword = async(Email)=>{
        const email = Email.trim()
        console.log("USER EMAIL FROM RESEND",Email)
        console.log("USER EMAIL FROM FIRST REQ",email)
    const checkemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if(!checkemail){
      setError("Enter The Correct Email")
      return
    }
    const Url='http://localhost:3000'
    try {       
    const response = await fetch( `${Url}/api/auth/forgotpassword`,{
        method:"POST",
           headers:{
            "Content-Type":'application/json'
           },
        body:JSON.stringify({email})
    })
    if(!response.ok){
        console.log(`http Error ${response.status}`)
        return;
    }
    const json = await response.json()
    if(!json.success){
         setError(json.error?json.error:json.msg)
         return;
    }
    else{
   setmsg(json.message)
  localStorage.setItem('Emtoken',json.Emtoken)
     setUserEmail(email)
  setTimeout(() => {
    setmsg(null)
    navigate('/otp')

  }, 3000);
     return
    }
    } catch (error) {
        console.error(error)
    }
    }
    
   const getnotes =async()=>{
    setloading(true)
            const token = localStorage.getItem('authtoken')
            const URL = 'http://localhost:3000'
            try {
                const response = await fetch(`${URL}/api/notes/getnotes`,{
                    method:"GET",
                    headers:{
                       "Content-Type":"application/json",
                        'authtoken':token
                    }
                })
                if(! response.ok){
                    throw new Error("Http Error status !",response.status)
                }
                const json = await response.json()
                const NotesArray = Array.isArray(json)?json:json &&Array.isArray(json.notes)?json.notes:[]
                setnotes(NotesArray)
                setloading(false)
                console.log(json)
                console.log(NotesArray)
                
            } catch (error) {
                console.error(error)
            }
        }
        const alertColors = {
            success: 'bg-green-100 border-green-400 text-green-700',
            error: 'bg-red-100 border-red-400 text-red-700',
            info: 'bg-blue-100 border-blue-400 text-blue-700',
          };
        const showAlert = (message, type = 'info') => {
            setAlert({ message, type });
            setTimeout(() => setAlert({ message: '', type: '' }), 3000); // auto hide after 3s
          };
        const otpverify=async(otp)=>{
            const emtoken = localStorage.getItem('Emtoken')
            if(!emtoken){
                navigate('/login')
                return
            }
             const Url ='http://localhost:3000'
             try {
                const response = await fetch(`${Url}/api/auth/otpverify`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Emtoken:emtoken
                    },
                    body:JSON.stringify({otp})
                })
                const json= await response.json()
                if(!response.ok){
                    showAlert(json.error?json.error:json.msg?json.msg:"http Status Error")
                    localStorage.removeItem("Emtoken")
                    return;
                }
                
                if(!json.success){
                    showAlert(json.msg?json.msg:json.message,"error")
                    return;
                }
                else{
                    showAlert(json.message?json.message:"OTp Verified",'success')
                    localStorage.setItem('token', json.token);
                
                    setTimeout(() => {
                        navigate('/reset')
                      }, 5000);
                      
                  }
             } catch (error) {
                console.error(error)
             }
        }
        const resetpassword=async(password)=>{
            const Url='http://localhost:3000'
            const token = localStorage.getItem('token')
            if(!token ){
                navigate('forgot-password')
                return
            }
       try {
          const response = await fetch(`${Url}/api/auth/updatepassword`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({password})
          })
          const json = await response.json()
          if(response.status===401){
            showAlert(json.msg?json.msg:"Session Expired")
            setTimeout(() => {
               navigate('/forgot-password')
               localStorage.removeItem("token")
               localStorage.removeItem("Emtoken")
            }, 3000);
            return
          }
          if(!response.ok){
           console.log(`Http Error ${response.status}`)
           showAlert(json.msg?json.msg:"Some Error Occured")
           return
          }
          if(!json.success){
            showAlert(
                json.msg,
                "error"
            )
      
          }
          else{

            showAlert(
                json.message,
                "success"
            )

            setTimeout(() => {
           localStorage.removeItem("Emtoken")
              localStorage.removeItem('token')
            navigate('/login')
          }, 5000);
          }
       } catch (error) {
          console.error(error)
       }
        }
    const userdetails=async()=>{
          const token = localStorage.getItem('authtoken')
          if(!token){
            throw new Error("Access Denied")
          }
          const Url = 'http://localhost:3000'
          try {
            const response = await fetch(`${Url}/api/auth/getuser`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    authtoken:token
                }
            })
            const json = await response.json()
          const User = json.user 
          setuser(User)
         
          } catch (error) {
            console.error(error)
          }
    }
  return (
   <data.Provider value={{resetpassword,alertColors,showAlert,notes,alert,setAlert, deletenotes,updatenotes,addnotes,getnotes,isLoggedIn, setIsLoggedIn,userdetails,user,loading,error,UserEmail,msg,setError,Forgotpassword,otpverify}}>
    {children}
   </data.Provider>
  )
}
