import Home from "./Components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Headbar from "./Components/Navbar";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import "./index.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import OtpRoute from "./Components/OtpRoute";
import PublicRoute from "./Components/PublicRoute";
import Handlenote from "./Components/handlenote";
import Login from "./Components/Login";
import Forgotpass from "./Components/Forgotpass";
import Otpverify from "./Components/Otpverify";
import EmOtpRoute from "./Components/EmOtpRoute";
import ResetPassword from "./Components/Resetpassword";
import Signup from "./Components/Signup";
import { useContext, useEffect } from "react";
import About from "./Components/About";
import data from "./Context/notescontext";
import Error404 from "./Components/Error404";
function App() {
  const navigate = useNavigate()
  const {isLoggedIn,setIsLoggedIn} = useContext(data)
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("authtoken");
  
    if (token) {
      localStorage.setItem("lastRoute", location.pathname);
             
    }

  }, [location.pathname]);
 
  useEffect(() => {
  const ONE_HOUR = 60 * 10*1000
    if (!isLoggedIn) return;  
    const resetTimer = () => {
      localStorage.setItem("loginTime", Date.now());
    };
    const checkSession = () => {
      console.log(interval)
      const loginTime = localStorage.getItem("loginTime");
      if (!loginTime) return;
  
      const now = Date.now();
      const diff = now - parseInt(loginTime);
  
      if (diff >= ONE_HOUR) {
        localStorage.removeItem("authtoken");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("lastRoute");
        localStorage.removeItem("emailVerify");
        localStorage.removeItem("otpVerified");
        setIsLoggedIn(false)
        navigate("/login", { replace: true });
      }
    };
  
    window.addEventListener("click", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("scroll", resetTimer);
    const interval = setInterval(checkSession, 60000);
  
    return () => {
      clearInterval(interval);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    const lastRoute = localStorage.getItem("lastRoute");
  
    if (token) {
      if (lastRoute && lastRoute !== location.pathname) {
        navigate(lastRoute, { replace: true });
      } else if (!lastRoute) {
        navigate("/note", { replace: true });
      }
     
    }
  }, []);
  return (

      <Box
        sx={{
          minHeight: "100vh",
          background:
          location.pathname === "/login"
            ? "white"
            : `
              radial-gradient(800px circle at 50% 30%, rgba(79,70,229,0.15), transparent 60%),
              #0f0f0f
            `,
        }}
      >
        <Headbar />
        <Routes>
          {/* Logged-in only */}
          <Route
            path="/note"
            element={
              <ProtectedRoute>
                <Handlenote />
              </ProtectedRoute>
            }
          />
            <Route path='*' element={<Error404/>}></Route>

         
          {/* Logged-out only */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <Forgotpass />
              </PublicRoute>
            }
          />
           <Route
            path="/"
            element={
             <PublicRoute>
               <Home />
             </PublicRoute>
              
            }
          />
           <Route
            path="/about"
            element={
             <PublicRoute>
               <About />
             </PublicRoute>
              
            }
          />

{/* Otp ROute*/}
          <Route
            path="/otp"
            element={
              <EmOtpRoute>
                <Otpverify />
              </EmOtpRoute>
            }
          />

<Route
  path="/reset"
  element={
    <OtpRoute>
      <ResetPassword />
    </OtpRoute>
  }
/>
        </Routes>
      </Box>
   
  );
}

export default App;