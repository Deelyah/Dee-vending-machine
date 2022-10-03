import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const BuyersRoute = () => {
  const userRole = useSelector((state) => state?.profile?.role);
  return (
    <>
      {userRole === "buyer" ? (
        <Outlet />
      ) : (
        <Navigate to="/my-account/seller"></Navigate>
      )}
    </>
  );
};

export default BuyersRoute;
