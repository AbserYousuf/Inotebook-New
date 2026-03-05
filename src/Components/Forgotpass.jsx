import React, {  useState } from 'react'
import { Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Otpverify from './Otpverify'
import data from '../Context/notescontext'
import { useContext } from 'react'
export default function Forgotpass() {
    const context = useContext(data)
    const [Email, setEmail] = useState('') 
const {error,setError,msg,Forgotpassword} = context
 
    const handleChange = (e) => {
      setEmail(e.target.value)
      setError('')
    }
  
  const navigate = useNavigate()
const forgotpassword=async(e)=>{
  e.preventDefault()
 if(!Email){
    setError("Enter The Email ")
    return
 }
  Forgotpassword(Email)
}
  return (
    <>
  <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 overflow-hidden">

    {/* Background Glow Circles */}
    <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
    <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

    {/* Card */}
    <div className="relative w-full max-w-md p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105">

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-400 to-pink-500 shadow-lg text-3xl">
          ⚡
        </div>
      </div>

      <h2 className="text-center text-3xl font-bold text-white mb-2">
        Forgot Password?
      </h2>
      <p className="text-center text-white/70 text-sm mb-8">
        Enter your email to receive a secure OTP
      </p>

      <form>
        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/80 mb-2">
            Email Address
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
              <Mail size={20} />
            </span>

            <input
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                error ? "border-red-400 ring-red-300" : "border-white/30"
              }`}
            />
          </div>

          {msg && (
            <p className="mt-2 text-sm text-green-300 animate-fadeIn">
              {msg}
            </p>
          )}

          {error && (
            <p className="mt-2 text-sm text-red-300 animate-fadeIn">
              {error}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={forgotpassword}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-yellow-400 shadow-lg hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300"
        >
         Send OTP
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-white/50 text-xs">OR</span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          to="/login"
          className="text-sm font-medium text-white hover:text-yellow-300 transition"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  </div>
</>
  )
}
