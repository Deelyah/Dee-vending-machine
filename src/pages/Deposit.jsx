import BaseCard from "../components/base-components/BaseCard";
import BaseSpinner from "../components/base-components/BaseSpinner";
import { useState } from "react";
import { fundAccount, getUserProfile } from "../store/actions/Index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Deposit = () => {
  const token = localStorage.getItem("token");
  const [fundingDetails, setFundingDetails] = useState({
    token: token,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFundingDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fundAccount(fundingDetails)
      .then((res) => {
        getUserProfile(token).then(() => {
          setIsLoading(false);
          dispatch({ type: "PROFILE", payload: res.data });
          navigateTo("/my-account/vending-machine");
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error);
      });
  };
  return (
    <div>
      <BaseCard>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center justify-center"
        >
          <h2 className="font-semibold text-lg">Fund Your Account</h2>
          <div className="mt-6">
            <label htmlFor="deposit">Amount</label>
            <input
              required
              type="number"
              className="focus:outline-none w-full border rounded px-3 py-2"
              name="amount"
              id="amount"
              placeholder="$1000000"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>

          <button className="bg-[#13113f] hover:bg-[#13113fe5] text-white px-4 py-2 mt-6 rounded-sm">
            {isLoading ? <BaseSpinner /> : "Deposit"}
          </button>
        </form>
      </BaseCard>
    </div>
  );
};

export default Deposit;
