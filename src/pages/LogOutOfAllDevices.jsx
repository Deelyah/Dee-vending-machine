import { useState } from "react";
import { logOutFromAllDevices } from "../store/actions/Index";

const LogOutOfAllDevices = ({ closePopup }) => {
  const [username, setUsername] = useState(null);
  const clearActiveSessions = (e) => {
    e.preventDefault();
    logOutFromAllDevices({ username: username })
      .then(() => {
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="absolute inset-0 bg-[#0000003a] backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white h-fit p-5 rounded-lg">
        <h5 className="font-medium text-xl mb-5">
          Enter Username to Log out of all devices
        </h5>
        <form
          onSubmit={(e) => {
            clearActiveSessions(e);
          }}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="border py-2 px-4 rounded-md mb-4 focus:outline-none"
          />
          <button className="w-1/2 bg-[#13113F] text-white rounded-md py-2 px-4">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogOutOfAllDevices;
