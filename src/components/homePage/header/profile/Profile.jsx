import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  closeProfile,
  editProfile,
  privacyIcon,
  rightArrowPrivacy,
} from "../../../../utils/svgIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfileSection,
  notificationSection,
  privacySection,
  profileDrawer,
  profileSection,
  settingsSection,
  showChangePasswordSection,
  termsSection,
} from "../../../../redux/reducers/headerProfileOptions";
import ChangePassword from "../changePassword/ChangePassword";
import EditProfile from "../edit-profile/EditProfile";
import profileData from "../../../../api-results/ProfileResults.json";
import axios from "axios";
import { ProfileClick } from "../../../../redux/reducers/EditProfileData";
import { MobileNotifyClick } from "../../../../redux/reducers/MobileNotification";

const Profile = () => {
  const dispatch = useDispatch();
  const handleProfileClose = () => {
    dispatch(profileDrawer(false));
    dispatch(notificationSection(false));
    dispatch(settingsSection(false));
    dispatch(termsSection(false));
    dispatch(privacySection(false));
    dispatch(MobileNotifyClick());
  };

  const [profileData1, setProfileData] = useState("");
  const showChangePassword = () => {
    dispatch(showChangePasswordSection(true));
  };
  const handleEditSection = () => {
    dispatch(editProfileSection(true));
  };

  const changePasswordState = useSelector(
    (state) => state.headerProfile.showChangePassword
  );
  const editState = useSelector((state) => state.headerProfile.editSection);

  const profileData = useSelector((state) => state.ProfileClick.data);

  useEffect(() => {
    dispatch(ProfileClick());
    // axios
    //   .get(
    //     `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/myProfile`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(profileData);
    //     setProfileData(res.data);
    //   });
  }, []);

  const renderElement = () => {
    if (changePasswordState) {
      return <ChangePassword />;
    }
    if (editState) {
      return <EditProfile />;
    } else {
      return (
        <div className="drawer-profile">
          <div className="drawer-profile-header">
            <div className="drawer-profile-clear" onClick={handleProfileClose}>
              {closeProfile}
            </div>

            <div className="drawer-profile-name">
              <p className="drawer-profile-profile">Profile</p>
              <div className="drawer-profile-edit" onClick={handleEditSection}>
                {editProfile}
              </div>
            </div>

            <div className="profile-logo-name">
              <div className="profile-img-frame">
                <img
                  src={
                    profileData &&
                    profileData.data &&
                    profileData.data.profilePhoto
                      ? profileData.data.profilePhoto
                      : require("../../../../assets/images/start-courses-image/profilepic.jpg")
                  }
                />
              </div>
              <div className="profile-image-name">
                <p className="name">
                  {profileData && profileData.data && profileData.data.fullName}
                </p>
                <p className="role">
                  {profileData &&
                    profileData.data &&
                    profileData.data.occupation}
                </p>
              </div>
            </div>
          </div>
          <div className="drawer-profile-body">
            <div className="progress-details">
              <div className="progress-1">
                <p className="progress-digit">
                  {profileData &&
                    profileData.data &&
                    profileData.data.courseCompleted}
                </p>
                <p className="progress-content">Courses</p>
              </div>
              <div className="progress-1">
                <p className="progress-digit">
                  {profileData &&
                    profileData.data &&
                    profileData.data.chaptersCompleted}
                </p>
                <p className="progress-content">Chapters</p>
              </div>
              <div className="progress-1">
                <p className="progress-digit">
                  {profileData &&
                    profileData.data &&
                    profileData.data.testsCompleted}
                </p>
                <p className="progress-content">Test</p>
              </div>
            </div>

            <div className="personal-details-section">
              <p className="personal-details-title">Personal Details</p>
              <div className="personal-section-1">
                <div className="personal-detail-section">
                  <p className="pd-title">Name</p>
                  <p className="pd-value">
                    {profileData &&
                      profileData.data &&
                      profileData.data.fullName}
                  </p>
                </div>
                <div className="personal-detail-section">
                  <p className="pd-title">Username</p>
                  <p className="pd-value">
                    {profileData &&
                      profileData.data &&
                      profileData.data.userName}
                  </p>
                </div>
                <div className="personal-detail-section">
                  <p className="pd-title">Email ID</p>
                  <p className="pd-value">
                    {profileData && profileData.data && profileData.data.email}
                  </p>
                </div>
                <div className="personal-detail-section">
                  <p className="pd-title">Mobile Number</p>
                  <p className="pd-value">
                    {profileData &&
                      profileData.data &&
                      profileData.data.mobileNumber}
                  </p>
                </div>
                <div className="personal-detail-section">
                  <p className="pd-title">Occupation</p>
                  <p className="pd-value">
                    {profileData &&
                      profileData.data &&
                      profileData.data.occupation}
                  </p>
                </div>
                {profileData &&
                  profileData.data &&
                  profileData.data.dateOfBirth && (
                    <div className="personal-detail-section">
                      <p className="pd-title">Date of Birth</p>
                      <p className="pd-value">
                        {profileData &&
                          profileData.data &&
                          profileData.data.dateOfBirth}
                      </p>
                    </div>
                  )}
                <div
                  className="personal-detail-section  password-chng"
                  onClick={showChangePassword}
                >
                  <div className="personal-detail-section-1">
                    <div className="privacy-icon">{privacyIcon}</div>
                    <div className="privacy-icon-detail">
                      <p className="privacy-privacy">Privacy</p>
                      <p className="privacy-password-title">Change Password</p>
                    </div>
                  </div>
                  <div className="personal-detail-section-2">
                    {rightArrowPrivacy}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return <>{renderElement()}</>;
};

export default Profile;
