import "./pages.css";
import { Outlet } from "react-router-dom";
import TheHeader from "../components/TheHeader";

const MyAccount = () => {
  return (
    <div className="min-h-screen overflow-auto bg-img bg-contain ">
      <TheHeader />
      <div className="w-full pt-28 px-2">
        <div className="h-full flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
