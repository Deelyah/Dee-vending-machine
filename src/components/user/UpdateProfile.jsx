import BaseCard from "../base-components/BaseCard";
import { useState } from "react";
import avatar from "../../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseSpinner from "../base-components/BaseSpinner";
import hidden from "../../assets/close.png";
import visible from "../../assets/open.png";
import { getUserProfile, updateUserProfile } from "../../store/actions/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [pswdIsVisible, setPswdIsVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const userId = useSelector((state) => state?.profile?.id);

  const handleInputChange = (e) => {
    setUserDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let userToken = localStorage.getItem("token");
    updateUserProfile({
      userId: userId,
      userToken: userToken,
      userDetails: userDetails,
    })
      .then(() => {
        getUserProfile(userToken).then((res) => {
          setIsLoading(false);
          dispatch({ type: "PROFILE", payload: res.data });
          toast.success("Profile Updated", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <div>
      <BaseCard>
        <ToastContainer />
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 mb-3 h-24 rounded-full bg-[#13113f30] flex justify-center items-center">
            <img src={avatar} alt="avatar" />
          </div>
          <h2 className="text-2xl font-medium">Update Profile</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="py-[26px]"
          >
            {!enterPassword && (
              <>
                {" "}
                <div>
                  <label htmlFor="username" className="text-[#13113f]">
                    New Username
                  </label>
                  <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="w-full py-3 md:py-4 rounded-lg bg-[#9a9fbf20] px-3 md:px-4 focus:outline-none"
                    placeholder="username"
                  />
                </div>
                <button
                  className="w-full flex justify-center items-center text-white bg-[#4834D4] py-3 md:py-4 mt-11 rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    if (userDetails.username) {
                      setEnterPassword(true);
                    } else {
                      return;
                    }
                  }}
                >
                  Next
                </button>{" "}
              </>
            )}

            {enterPassword && (
              <div className="mt-6">
                <label htmlFor="password" className="text-[#13113f]">
                  Password
                </label>
                <div className="flex items-center w-full rounded-lg bg-[#9a9fbf20] pr-2">
                  <input
                    required
                    type={pswdIsVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="bg-transparent rounded-lg px-3 md:px-4 py-3 md:py-4 w-11/12 focus:outline-none"
                  />
                  <div className="">
                    {pswdIsVisible && (
                      <button
                        onClick={() => {
                          setPswdIsVisible(false);
                        }}
                      >
                        <img src={visible} alt="open eye icon" />
                      </button>
                    )}
                    {!pswdIsVisible && (
                      <button
                        onClick={() => {
                          setPswdIsVisible(true);
                        }}
                      >
                        <img src={hidden} alt="closed eye icon" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {enterPassword && (
              <button className="w-full flex justify-center items-center text-white bg-[#4834D4] py-3 md:py-4 mt-11 rounded-lg">
                {isLoading ? <BaseSpinner /> : "Save"}
              </button>
            )}
          </form>
        </div>
      </BaseCard>
    </div>
  );
};

export default UpdateProfile;
