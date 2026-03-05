import React from 'react'
import { Navigate } from 'react-router-dom'
export default function EmOtpRoute({children}) {
    const emailverified = localStorage.getItem('Emtoken')
    if(!emailverified){        
    return <Navigate to='/forgot-password' replace/>
    }
    return children
}
