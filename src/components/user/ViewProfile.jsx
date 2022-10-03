import BaseCard from "../base-components/BaseCard";
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import { useSelector } from "react-redux";
import BaseSpinner from "../base-components/BaseSpinner";
import { Link } from "react-router-dom";
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
            <p className="font-medium">Role: {profile?.role}</p>
            {profile.role === "buyer" && (
              <p className="text-sm">Balance: ${profile?.deposit}</p>
            )}

            <Link
              to="/my-account/update-profile"
              className="bg-[#13113f] hover:bg-[#13113fe5] text-white px-4 py-2 mt-4 rounded-sm"
            >
              Edit Profile
            </Link>
          </div>
        )}
      </BaseCard>
    </div>
  );
};

export default ViewProfile;
