import BaseCard from "../components/base-components/BaseCard";
import "./pages.css";
import logo from "../assets/logo.png";
import { logOut } from "../store/actions/Index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  let navigateTo = useNavigate();
  let userName = useSelector((state) => state?.login?.data?.user?.name);

  let backUpUserName = window.localStorage.getItem("userName");
  let handleLogOut = () => {
    logOut()
      .then(() => {
        window.localStorage.clear();
        navigateTo("/login");
      })
      .catch(() => {
        window.localStorage.clear();

        navigateTo("/login");
      });
  };
  return (
    <div className="h-screen">
      <div className="relative bg-img bg-contain w-full h-full flex flex-col justify-start items-start pt-9 px-8">
        <div className="flex justify-start items-start">
          <img
            src={logo}
            alt="logo"
            className="w-44 h-10 max-w-[215px] max-h-[74px]"
          />
        </div>

        <div className="fixed bottom-10 right-0 md:bottom-[60px] md:right-[60px]">
          <BaseCard>
            <h2 className="text-xl md:text-2xl text-black font-medium">
              Hi {userName ? userName : backUpUserName}!
            </h2>
            <p className="text-sm md:text-base text-[#444444]">
              Thank you for using our service
            </p>
            <button
              className="border-none outline-none mt-4 text-[#4834D4] font-medium"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </BaseCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
