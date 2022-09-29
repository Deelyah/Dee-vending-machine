import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getUserProfile } from "../store/actions/Index";
const ProtectedRoute = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    let userToken = localStorage.getItem("token");
    getUserProfile(userToken)
      .then((res) => {
        dispatch({ type: "PROFILE", payload: res.data });
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  });
  let isAuthenticated = window.localStorage.getItem("IS_AUTHENTICATED");
  return (
    <>{isAuthenticated ? <Outlet /> : <Navigate to="/login"></Navigate>}</>
  );
};
export default ProtectedRoute;
