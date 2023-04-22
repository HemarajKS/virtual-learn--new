import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { arrowRight, warningIcon } from "../../../../utils/svgIcons";
import {
  editProfileSection,
  profileDrawer,
  showChangePasswordSection,
} from "../../../../redux/reducers/headerProfileOptions";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const [newpassword, setNewPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [currentPass, setCurrentPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch(profileDrawer(false));
    dispatch(editProfileSection(false));
    dispatch(showChangePasswordSection(false));
  };

  // Toast-Error
  const PasswordMatch = () =>
    toast.error((w) => (
      <div className="toast-div-password">
        Password Doesn't Match
        <div
          className="toast-close-password"
          onClick={() => toast.dismiss(w.id)}
        >
          X
        </div>
      </div>
    ));
//Toast-CurrentNew
  const CurrentNew = () =>
    toast.error((w) => (
      <div className="toast-div-password">
        New Password is same as Current Password
        <div
          className="toast-close-password"
          onClick={() => toast.dismiss(w.id)}
        >
          X
        </div>
      </div>
    ));
  // Toast-Success
  const successPassword = () =>
    toast.success((w) => (
      <div className="toast-div-password">
        Password Change Successfully
        <div
          className="toast-close-password"
          onClick={() => toast.dismiss(w.id)}
        >
          X
        </div>
      </div>
    ));
  
    const ErrorPassword = () =>
      toast.error((w) => (
        <div className="toast-div-password">
          Password Change Failed
          <div
            className="toast-close-password"
            onClick={() => toast.dismiss(w.id)}
          >
            X
          </div>
        </div>
      ));

  const handleChangePassword = (e) => {
    e.preventDefault();
    const NewPassword = document.getElementById("newPassword").value;
    const ConfirmPassword = document.getElementById("confirmPassword").value;
    const CurrentPassword = document.getElementById("currentPassword").value;
    if (NewPassword === ConfirmPassword && NewPassword !== CurrentPassword) {
      axios
        .request(
          ` http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/changePassword`,
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
            },
            data: {
              currentPassword: currentPass,
              newPassword: newpassword,
            },
          }
        ).then((res)=>{
          successPassword();
        })
        .catch((Err) => {
          console.log(Err);
          ErrorPassword();
        });
      
      setNewPassword("");
      setCpassword("");
      setCurrentPassword("");
      console.log(newpassword);
    } else {
      if (NewPassword !== ConfirmPassword) {
        PasswordMatch();
      }
      else {
        CurrentNew();
      }
    }
  };

  return (
    <>
      <div className="drawer-profile-change-conpass">
        <div className="drawer-profile-header-change-conpass">
          <div
            className="drawer-profile-clear-change-conpass"
            onClick={handleClick}
          >
            {arrowRight}
          </div>
          <div className="change-change-password">
            <p>Change your Password</p>
            <div className="changePass-span">
              Your password must have at least 6 or more characters
            </div>
          </div>
        </div>

        <div className="change-changePass-Container">
          <form
            className="change-password-form"
            onSubmit={handleChangePassword}
          >
            {/*Current Password*/}
            <input
              className="change-password-form-input"
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPass}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              placeholder=" "
            />
            <label className="change-password-form-label" for="currentPassword">
              Current Password
            </label>
            {/*Current Password*/}

            {/*New Password*/}
            <input
              className="change-password-form-input"
              type="password"
              id="newPassword"
              name="newPassword"
              value={newpassword}
              placeholder=" "
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              required
            />
            <label className="change-password-form-label" for="newPassword">
              New Password
            </label>
            {/*New Password*/}

            {/*Confirm Password*/}
            <input
              className="change-password-form-input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={cPassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              placeholder=" "
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              required
            />
            <label className="change-password-form-label" for="confirmPassword">
              Confirm Password
            </label>
            {/*Confirm Password*/}

            <button type="submit" className="change-password-reset-btn">
              Reset Password
            </button>
          </form>
        </div>

        {/* <div className="toast">
                    <div className="warning-content">
                        {warningIcon}
                        <p>Invalid password, please try again</p>
                    </div>
                </div> */}

        {/* <div className="toast">add toast here</div> */}
      </div>
      <Toaster
        position="bottom-center" 
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          className: "",
          success: {
            duration: 1500,
            style: {
              border: "1px solid #AAFF00",
              padding: "10px",
              color: "green",
              width: "350px",
            },
          },
          error: {
            duration: 1500,
            style: {
              border: "1px solid #ee5c4d",
              padding: "10px",
              color: "#ee5c4d",
              width: "350px",
            },
          },
        }}
      />
    </>
  );
};

export default ChangePassword;
