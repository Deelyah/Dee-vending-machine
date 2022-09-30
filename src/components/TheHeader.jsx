import { Link, useNavigate } from "react-router-dom";
import menu from "../assets/menu.png";
import cancel from "../assets/cancel.png";
import { useState } from "react";
import { deleteAccount } from "../store/actions/Index";
import { useSelector } from "react-redux";

const TheHeader = () => {
  let [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const userId = useSelector((state) => state?.profile?.id);
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  let deleteUserAccount = (res) => {
    console.log(res);
    deleteAccount([userId, token])
      .then(() => {
        localStorage.clear();
        navigateTo("/register");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="fixed top-0 right-0 left-0 pt-9 px-8 bg-[#130F40]">
      <div className="relative flex justify-start items-start w-full">
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/my-account/my-products" className="ml-4 text-white">
          My Products
        </Link>
        <div className="ml-auto">
          <button
            onClick={() => {
              setDropdownIsVisible(!dropdownIsVisible);
            }}
          >
            <img src={menu} alt="menu" />
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
                <Link
                  to="/my-account/update-profile"
                  className="px-7 py-4 block hover:bg-[#13113f30]"
                >
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
                  deleteUserAccount();
                  setDropdownIsVisible(false);
                }}
                className="px-7 py-4 block cursor-pointer hover:bg-red-600 rounded-b hover:text-white"
              >
                Delete Account
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TheHeader;
