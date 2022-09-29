import BaseCard from "../components/base-components/BaseCard";
import "./pages.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen">
      <div className="relative bg-img bg-contain w-full h-full flex flex-col justify-start items-start pt-9 px-8">
        <div className="flex justify-start items-start">
          <img
            src={logo}
            alt="logo"
            className="w-44 h-10 max-w-[215px] max-h-[74px]"
          />
        </div>

        <div className="w-full min-h-screen flex flex-col justify-center items-center sm:pt-10">
          <BaseCard>
            <h2 className="text-base md:text-2xl text-black font-medium">
              Forgot your password?
            </h2>
            <p className="text-sm md:text-base text-[#444444] py-3">
              Oops!!! There's nothing we can do about it for now.
              <br />
              Please try recalling
            </p>
            <div className="flex justify-end">
              <Link to="/login" className="text-[#4834D4] text-sm font-medium">
                Login
              </Link>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
