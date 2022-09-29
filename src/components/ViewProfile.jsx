import BaseCard from "./base-components/BaseCard";
import { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import BaseSpinner from "./base-components/BaseSpinner";
const ViewProfile = () => {
  let [profile, setProfile] = useState(null);
  let userProfile = useSelector((state) => state?.profile);

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    } else {
      return;
    }
  }, [userProfile]);
  return (
    <div>
      <BaseCard>
        {!profile && <BaseSpinner></BaseSpinner>}
        {profile && (
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 mb-3 h-24 rounded-full bg-[#13113f30] flex justify-center items-center">
              <img src={avatar} alt="avatar" />
            </div>
            <h2 className="font-semibold text-lg">
              Username: {profile?.username}
            </h2>
            <p>Role: {profile?.role}</p>
          </div>
        )}
      </BaseCard>
    </div>
  );
};

export default ViewProfile;
