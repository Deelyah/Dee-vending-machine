import BaseCard from "../components/base-components/BaseCard";
import "./pages.css";
import { logOut } from "../store/actions/Index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../assets/user.png";
import cancel from "../assets/cancel.png";
import { useState } from "react";

const Home = () => {
  let navigateTo = useNavigate();
  let userName = useSelector((state) => state?.profile?.username);
  let [dropdownIsVisible, setDropdownIsVisible] = useState(false);

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
    <div className="min-h-screen">
      <div className="relative bg-img bg-contain w-full h-full flex flex-col justify-start items-start pt-9 px-8">
        <div className="relative flex justify-start items-start w-full">
          <Link to="/my-account/all-users" className="text-white">
            View All users
          </Link>
          <div className="ml-auto">
            <button
              onClick={() => {
                setDropdownIsVisible(!dropdownIsVisible);
              }}
            >
              <img src={avatar} alt="" />
            </button>
            {dropdownIsVisible && (
              <ul className="bg-white absolute top-8 -right-5 rounded-md w-1/6">
                <li className="flex justify-end pt-4 pr-4">
                  <button
                    className="p-2 hover:bg-[#13113f30] rounded"
                    onClick={() => {
                      setDropdownIsVisible(false);
                    }}
                  >
                    <img src={cancel} alt="" className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <Link to="/" className="px-7 py-4 block hover:bg-[#13113f30]">
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" className="px-7 py-4 block hover:bg-[#13113f30]">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="px-7 py-4 block hover:bg-red-600 rounded hover:text-white"
                  >
                    Delete Account
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

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
