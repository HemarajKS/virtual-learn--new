import "./Terms.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { arrowRight } from "../../../../utils/svgIcons";
import { termsSection } from "../../../../redux/reducers/headerProfileOptions";
import axios from "axios";

const Terms = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(termsSection(false));
  };
  const [termsData, setTermsData] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/termsAndConditions`
      )
      .then((res) => {
        setTermsData(res && res.data && res.data.message);
      });
  }, []);
  console.log(termsData);
  return (
    <div className="drawer-profile-terms">
      <div className="drawer-profile-header-terms">
        <div className="drawer-profile-clear-terms" onClick={handleClick}>
          {arrowRight}
        </div>
        <div className="mobile-arrow-left-terms">
          <i
            className="fa-solid fa-arrow-left-long arrow-left-long-terms"
            onClick={handleClick}
          ></i>
        </div>
        <div className="terms-services-text">
          <p>Terms of Services</p>
        </div>
      </div>

      <div className="terms-phrases terms-para">{termsData}</div>
    </div>
  );
};

export default Terms;
