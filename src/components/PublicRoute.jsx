import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "student") return <Navigate to="/user" replace />;

  return children;
}

export default PublicRoute;