import "./pages.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import avatar from "../assets/user.png";
import cancel from "../assets/cancel.png";
import { useState } from "react";

const MyAccount = () => {
  let [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  return (
    <div className="min-h-screen overflow-auto bg-img bg-contain ">
      <div className="fixed top-0 right-0 left-0 pt-9 px-8 bg-purple-900">
        <div className="relative flex justify-start items-start w-full">
          <Link to="/" className="text-white">
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
      </div>
      <div className="w-full h-full flex flex-col justify-start items-start pt-28 px-2">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
