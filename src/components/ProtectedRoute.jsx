import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  let isAuthenticated = window.localStorage.getItem("IS_AUTHENTICATED");
  return (
    <>{isAuthenticated ? <Outlet /> : <Navigate to="/login"></Navigate>}</>
  );
};
export default ProtectedRoute;
