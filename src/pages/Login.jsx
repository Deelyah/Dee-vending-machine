import BaseCard from "../components/base-components/BaseCard";
import "./pages.css";
import logo from "../assets/logo.png";
import visible from "../assets/open.png";
import hidden from "../assets/close.png";
import { login } from "../store/actions/Index";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import BaseSpinner from "../components/base-components/BaseSpinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  let dispatch = useDispatch();
  let navigateTo = useNavigate();
  let [pswdIsVisible, setPswdIsVisible] = useState(false);
  let [userDetails, setUserDetails] = useState({});
  let [isLoading, setIsLoading] = useState(false);

  let handleInputChange = (e) => {
    setUserDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(userDetails)
      .then((res) => {
        window.localStorage.setItem("IS_AUTHENTICATED", true);
        setIsLoading(false);
        dispatch({ type: "LOGIN", payload: { ...res.data } });
        window.localStorage.setItem("userName", res.data.data.user.name);
        navigateTo("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="bg-img bg-contain w-full min-h-screen flex flex-col justify-center items-center sm:pt-10">
        <div className="flex justify-center mt-6">
          <img
            src={logo}
            alt="logo"
            className="w-44 h-10 max-w-[215px] max-h-[74px]"
          />
        </div>

        <BaseCard>
          <h2 className="text-xl md:text-2xl text-black font-medium text-center">
            Welcome Back!
          </h2>
          <p className="text-sm md:text-base text-[#444444] text-center">
            Log into your account
          </p>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="py-[26px]"
          >
            <div>
              <label htmlFor="username" className="text-[#13113f]">
                Username
              </label>
              <input
                required
                type="username"
                name="username"
                id="username"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                className="w-full py-3 md:py-4 rounded-lg bg-[#9a9fbf20] px-3 md:px-4 focus:outline-none"
                placeholder="username"
              />
            </div>
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
            <div className="flex justify-end w-full">
              <Link
                to="/forgot-password"
                className="text-[#13113F] text-xs font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <button className="w-full flex justify-center items-center text-white bg-[#4834D4] py-3 md:py-4 mt-11 rounded-lg">
              {isLoading ? <BaseSpinner /> : "Login"}
            </button>
            <div className="flex justify-end mt-4">
              <p className="text-xs text-[#13113f] text-left">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </BaseCard>
      </div>
    </div>
  );
};

export default Login;
