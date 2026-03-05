import { Navigate } from "react-router-dom";
export default function PublicRoute({ children }) {
  const token = localStorage.getItem("authtoken");
  if (token) {
    return <Navigate to="/note" replace />;
  }
  return children;
}