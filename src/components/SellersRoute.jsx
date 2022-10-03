import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const SellersRoute = () => {
  const userRole = useSelector((state) => state?.profile?.role);
  return (
    <>
      {userRole === "seller" ? (
        <Outlet />
      ) : (
        <Navigate to="/my-account/buyer"></Navigate>
      )}
    </>
  );
};

export default SellersRoute;
