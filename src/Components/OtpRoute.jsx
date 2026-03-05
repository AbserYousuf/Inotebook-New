import { Navigate } from "react-router-dom";
export default function OtpRoute({ children }) {
  const resetToken = localStorage.getItem("token");

  if (!resetToken) {
    return <Navigate to="/forgot-password" replace />;
  }

  return children;
}