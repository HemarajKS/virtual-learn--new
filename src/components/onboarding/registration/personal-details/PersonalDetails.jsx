import React, { useEffect, useState } from "react";
import { info_btn } from "../../../../utils/svgIcons";
import "./PersonalDetails.css";
import { signupSchema } from "./schema";
import { Formik, useFormik } from "formik";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerOtp,
  registerPersonalDetails,
  registerSuccess,
} from "../../../../redux/reducers/Conditions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../../utils/loading/Loading";

const PersonalDetails = () => {
  const [personaldata, setpersonaldata] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, handleChange, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        UserName: "",
        password: "",
        ConfirmPassword: "",
        fullName: "",
        mobileNumber: sessionStorage.getItem("regMobileNum"),
      },
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        console.log(values);
        setpersonaldata(values);
        // dispatch(registerSuccess(false))
        // navigate('/accountCreatedSuccessfully')
        const data = {
          mobileNumber: sessionStorage.getItem("regMobileNum"),
          fullName: values.fullName,
          userName: values.UserName,
          email: values.email,
          password: values.password,
        };

        sendUserdata(data);
      },
    });

  useEffect(() => {
    dispatch(registerOtp(false));
  }, []);

  const sendUserdata = (data) => {
    setLoading(true);
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/newUser/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        console.log("res", res);
        if (res.message === "User Created") {
          dispatch(registerSuccess(true));
          navigate("/accountCreatedSuccessfully");
        }
      })
      .catch((err) => {
        showError("Some error occured");
        setLoading(false);
      });
  };

  const showError = (msg) => {
    toast(
      <div className="loginAuth-showError">
        <div className="loginAuth-showErrorIcon">
          <img
            src={require("../../../../assets/icons/icn_invalid error.png")}
            alt="invalid"
          />
        </div>
        <div className="loginAuth-showErrorMessage">{msg}</div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <div className="personaldetails-outerRectangle">
      <div className="personaldetails-innerRect">
        <div className="personalDetails-heading">Personal Details</div>
        <div className="personalDetails-heading2">
          Please fill out the fields below so we can learn some information
          about you.
        </div>
      </div>
      <div className="inputFields">
        <form onSubmit={handleSubmit} className="personal-details-form">
          <div className="personal-input">
            <input
              type="text"
              className="PeronsalDetailsInput"
              id="mobileNumber"
              name="mobileNumber"
              placeholder=" "
              value={sessionStorage.getItem("regMobileNum")}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              // maxLength={10}
            />
            <label htmlFor="mobileNumber">Mobile Number</label>
            {errors.mobileNumber && touched.mobileNumber ? (
              <>
                <div className="personal-error-line"></div>
                <p className="personaldetail-form-error">
                  {errors.mobileNumber}
                </p>
              </>
            ) : null}
          </div>
          <div className="personal-input">
            <input
              type="text"
              className="PeronsalDetailsInput"
              id="fullName"
              name="fullName"
              placeholder=" "
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <label htmlFor="fullName">Full Name</label>
            {errors.fullName && touched.fullName ? (
              <>
                <div className="personal-error-line"></div>
                <p className="personaldetail-form-error">{errors.fullName}</p>
              </>
            ) : null}
          </div>

          <div className="personal-input">
            <input
              type="text"
              className="PeronsalDetailsInput"
              id="UserName"
              name="UserName"
              placeholder=" "
              value={values.UserName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <label htmlFor="UserName">User Name</label>
            {errors.UserName && touched.UserName ? (
              <>
                <div className="personal-error-line"></div>
                <p className="personaldetail-form-error">{errors.UserName}</p>
              </>
            ) : null}
          </div>

          <div className="personal-input">
            <input
              type="email"
              className="PeronsalDetailsInput"
              id="email"
              name="email"
              placeholder=" "
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <label htmlFor="email">Email Id</label>
            {errors.email && touched.email ? (
              <>
                <div className="personal-error-line"></div>
                <p className="personaldetail-form-error">{errors.email}</p>
              </>
            ) : null}
          </div>

          <div className="personal-input">
            <input
              type="password"
              className="PeronsalDetailsInput"
              id="password"
              name="password"
              placeholder=" "
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <label htmlFor="password">
              Password
              <div
                data-tip="React-tooltip"
                data-for="sadFace"
                className="personalDetailtooltip"
              >
                {info_btn}
              </div>
              <ReactTooltip
                id="sadFace"
                type="light"
                effect="solid"
                place="right"
              >
                <span>
                  <p>Our minimum Requirment</p>
                  At least 8 characters long with one number, one uppercase
                  letter, and one lowercase letter.
                </span>
              </ReactTooltip>
            </label>

            {errors.password && touched.password ? (
              <>
                <div className="personal-error-line"></div>
                <p className="personaldetail-form-error">{errors.password}</p>
              </>
            ) : null}
          </div>
          <div className="personal-input">
            <input
              type="password"
              className="PeronsalDetailsInput"
              id="ConfirmPassword"
              name="ConfirmPassword"
              placeholder=" "
              value={values.ConfirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            {errors.ConfirmPassword && touched.ConfirmPassword ? (
              <>
                <div className="personal-error-line"></div>
                <p className="personaldetail-form-error">
                  {errors.ConfirmPassword}
                </p>
              </>
            ) : null}
          </div>

          <button type="submit" className="persondetails-button">
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
      {loading && <Loading />}
    </div>
  );
};

export default PersonalDetails;
