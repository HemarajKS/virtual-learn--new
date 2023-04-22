import "./PrivacyPolicy.css";
import React, { useEffect, useState } from "react";
import { arrowRight } from "../../../../utils/svgIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  privacySection,
  profileDrawer,
} from "../../../../redux/reducers/headerProfileOptions";
import axios from "axios";

const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(privacySection(false));
  };
  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/privacyPolicy`
      )
      .then((res) => {
        setPrivacyData(res && res.data && res.data.message);
      });
  }, []);
  console.log(privacyData);

  return (
    <div className="drawer-profile-privacy">
      <div className="drawer-profile-header-privacy">
        <div className="drawer-profile-clear-privacy" onClick={handleClick}>
          {arrowRight}
        </div>
        <div className="mobile-arrow-left-privacy">
          <i
            className="fa-solid fa-arrow-left-long arrow-left-long-privacy"
            onClick={handleClick}
          ></i>
        </div>
        <div className="privacy-policy-text">
          <p>Privacy Policy</p>
        </div>
      </div>
      <div className="privacy-policy-phrases para">{privacyData}</div>
    </div>
  );
};

export default PrivacyPolicy;
