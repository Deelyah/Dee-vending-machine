import { Link, useNavigate } from "react-router-dom";
import menu from "../assets/menu.png";
import cancel from "../assets/cancel.png";
import { useEffect, useState } from "react";
import { deleteAccount, getUserProfile } from "../store/actions/Index";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TheHeader = () => {
  let [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const profile = useSelector((state) => state?.profile);
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const deleteUserAccount = () => {
    deleteAccount([profile?.id, token])
      .then(() => {
        localStorage.clear();
        toast.success("Account Deleted", {
          position: toast.POSITION.TOP_RIGHT,
        });

        navigateTo("/register");
      })
      .catch((e) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    getUserProfile(token).then((res) => {
      dispatch({ type: "PROFILE", payload: res.data });
    });
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 py-3 md:pt-9 px-3 md:px-8 bg-[#130F40] ">
      <ToastContainer />

      <div className="relative flex justify-start items-center w-full">
        <Link
          to="/"
          className="text-white border rounded-md text-sm md:text-base px-3 py-2 border-transparent hover:border-gray-700"
        >
          Home
        </Link>
        {profile?.role === "seller" ? (
          <>
            <Link
              to="/my-account/seller/my-products"
              className="ml-2 md:ml-5 text-white text-sm md:text-base border rounded-md px-3 py-2 border-transparent hover:border-gray-700"
            >
              {profile?.role ? "My Products" : ""}
            </Link>
            <Link
              to="/my-account/seller/add-product"
              className="hidden md:inline ml-2 md:ml-5 text-white text-sm md:text-base border rounded-md px-3 py-2 border-transparent hover:border-gray-700"
            >
              {profile?.role ? "Create new product" : ""}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/my-account/vending-machine"
              className="ml-2 md:ml-5 text-white text-sm md:text-base border rounded-md px-3 py-2 border-transparent hover:border-gray-700"
            >
              {profile?.role ? "Start Shopping" : ""}
            </Link>
          </>
        )}

        <div className="ml-auto">
          <button
            onClick={() => {
              setDropdownIsVisible(!dropdownIsVisible);
            }}
          >
            <img src={menu} alt="menu" />
          </button>
          {dropdownIsVisible && (
            <ul className="bg-white absolute top-8 right-0 md:-right-5 rounded-md w-fit z-90">
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
                  className="pl-7 pr-16  py-4 block hover:bg-[#13113f30]"
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
                  className="pl-7 pr-16  py-4 block hover:bg-[#13113f30]"
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
                  className="pl-7 pr-16  py-4 block hover:bg-[#13113f30]"
                >
                  View All Users
                </Link>
              </li>
              <li
                className="md:hidden"
                onClick={() => {
                  setDropdownIsVisible(false);
                }}
              >
                <Link
                  to="/my-account/seller/add-product"
                  className="pl-7 pr-16  py-4 block hover:bg-[#13113f30]"
                >
                  Create product
                </Link>
              </li>
              <li
                onClick={() => {
                  setDropdownIsVisible(false);
                }}
              >
                <Link
                  to="/my-account/vending-machine"
                  className="pl-7 pr-16  py-4 block hover:bg-[#13113f30]"
                >
                  View All Products
                </Link>
              </li>
              <li
                onClick={() => {
                  deleteUserAccount();
                  setDropdownIsVisible(false);
                }}
                className="pl-7 pr-16  py-4 block cursor-pointer hover:bg-red-600 rounded-b hover:text-white"
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
