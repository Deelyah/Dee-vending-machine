import { Link } from "react-router-dom";
import avatar from "../assets/user.png";
import cancel from "../assets/cancel.png";
import { useState } from "react";

const TheHeader = () => {
  let [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  return (
    <div className="fixed top-0 right-0 left-0 pt-9 px-8 bg-purple-900">
      <div className="relative flex justify-start items-start w-full">
        <Link to="/" className="text-white">
          Home
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
              <li
                onClick={() => {
                  setDropdownIsVisible(false);
                }}
              >
                <Link
                  to="/my-account/view-profile"
                  className="px-7 py-4 block hover:bg-[#13113f30]"
                >
                  View Profile
                </Link>
              </li>
              <li
                onClick={() => {
                  setDropdownIsVisible(false);
                }}
              >
                <Link to="/" className="px-7 py-4 block hover:bg-[#13113f30]">
                  Update Profile
                </Link>
              </li>
              <li
                onClick={() => {
                  setDropdownIsVisible(false);
                }}
              >
                <Link
                  to="/my-account/all-users"
                  className="px-7 py-4 block hover:bg-[#13113f30]"
                >
                  View All Users
                </Link>
              </li>
              <li
                onClick={() => {
                  setDropdownIsVisible(false);
                }}
              >
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
  );
};

export default TheHeader;
