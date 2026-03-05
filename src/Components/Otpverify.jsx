import React, { useContext, useEffect, useRef, useState } from 'react';
import data from '../Context/notescontext';
export default function Otpverify() {
  const context = useContext(data);
  const { UserEmail, otpverify, alert, showAlert, alertColors,Forgotpassword} = context;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };
  const [authorized, setAuthorized] = useState(null)

  useEffect(() => {
     const token = localStorage.getItem("Emtoken")
     if (!token) {
        navigate("/forgot-password")
     } else {
        setAuthorized(true)
     }
  }, [])
  
  if (!authorized) return null
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 0) {
      showAlert('Please enter The OTP', 'error');
      return;
    }

    const finalOtp = otp.join('');
    if (finalOtp.length < 6) {
      showAlert('Please enter all 6 digits', 'error');
      return;
    } else {
      otpverify(finalOtp);

    }
  };

  const handleResend = () => {
  
    showAlert("Otp Has Been Resend To The Email","info")
   Forgotpassword(UserEmail)
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col justify-center items-center min-h-screen px-4">
      {/* Header */}
      <div className="text-center mb-6 max-w-md">
        <h1 className="text-xl font-medium mb-2">
          Enter the OTP sent to <span className="font-semibold">{UserEmail}</span>
        </h1>
        <p className="text-gray-600 text-sm">
          If you don't see it, check your spam folder.
        </p>
      </div>

      {/* OTP Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm relative">
        {/* Alert */}
        {alert.message && (
          <div
            className={`absolute -top-16 left-1/2 transform -translate-x-1/2 w-full max-w-xs border-l-4 p-4 rounded shadow-md transition duration-300 ${alertColors[alert.type]}`}
          >
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 sm:w-14 h-12 sm:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-md transition duration-150"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white py-3 px-6 rounded-lg w-full font-semibold shadow-md mb-3"
        >
          Verify OTP
        </button>

        <div className="text-center text-sm text-gray-500">
          Didn't receive OTP?{' '}
          <button
            onClick={handleResend}
            className="text-indigo-500 font-medium hover:underline"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}