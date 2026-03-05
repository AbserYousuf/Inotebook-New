import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from "@heroui/react";
import Handlecontext from './Context/handlecontext.jsx';
import {BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <HeroUIProvider>
     <Handlecontext>
    <App />
     </Handlecontext>
    </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,

    

)

