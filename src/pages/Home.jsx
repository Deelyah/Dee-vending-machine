import BaseCard from "../components/base-components/BaseCard";
import "./pages.css";
import { logOut } from "../store/actions/Index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TheHeader from "../components/TheHeader";

const Home = () => {
  const navigateTo = useNavigate();
  const userName = useSelector((state) => state?.profile?.username);
  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    logOut(token)
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
    <div className="min-h-screen">
      <div className="bg-img bg-contain w-full h-full flex flex-col justify-start items-start pt-9 px-8">
        <TheHeader />

        <div className="min-h-screen flex justify-center items-center w-full">
          <BaseCard>
            <h2 className="text-xl md:text-2xl text-black font-medium">
              Hi {userName}!
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
