import React, { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import data from '../Context/notescontext';
export default function ResetPassword() {
    const context = useContext(data)
  const [password, setPassword] = useState('');
  const {resetpassword,alert,showAlert} = context
  const [showPassword, setShowPassword] = useState(false);
  const cardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password)  return showAlert("Please Enter Your New Password ",'error');
    resetpassword(password)
    console.log('New Password:', password);
    
  };
  const [authorized, setAuthorized] = useState(null)

  useEffect(() => {
     const token = localStorage.getItem("token")
     if (!token) {
        navigate("/forgot-password")
     } else {
        setAuthorized(true)
     }
  }, [])
  
  if (!authorized) return null
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 40px rgba(236,72,153,0.4), ${rotateY * 2}px ${-rotateX * 2}px 40px rgba(139,92,246,0.3)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
  };
  return (
    <div className="relative bg-gradient-to-r from-purple-700 to-pink-600 flex items-center justify-center min-h-screen p-4">
  
      {/* 🔥 ALERT AT PAGE LEVEL */}
      {alert.message && (
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm 
          backdrop-blur-lg bg-white/90 border-l-4 rounded-2xl shadow-2xl 
          p-5 flex items-start gap-4 animate-slideDown
          ${alert.type === "success" ? "border-green-500" : "border-red-500"}`}
        >
          <div className="mt-1">
            {alert.type === "success" ? (
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
              </svg>
            )}
          </div>
  
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">
              {alert.message}
            </p>
          </div>
        </div>
      )}
  
      {/* CARD */}
      <div
        ref={cardRef}
        className="card glow w-full max-w-md rounded-3xl shadow-2xl overflow-hidden cursor-pointer card-inner"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-10 bg-white rounded-3xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Reset Password
          </h2>
  
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="New Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full pl-4 pr-12 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
  />

  {/* Eye toggle */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-purple-600 transition"
  >
    {showPassword ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.19-3.344m2.864-2.863A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.11 2.158M3 3l18 18" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )}
  </button>
</div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}