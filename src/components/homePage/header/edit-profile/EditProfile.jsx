import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import "../profile/Profile";
import {
  editProfileSection,
  profileDrawer,
  profileSection,
  showChangePasswordSection,
} from "../../../../redux/reducers/headerProfileOptions";
import { useDispatch, useSelector } from "react-redux";
import { arrowRight } from "../../../../utils/svgIcons";
import { editProfile } from "./../../../../utils/svgIcons";
import { type } from "./../../../../redux/store/store";
import { useFormik } from "formik";
import { editSchema } from "./edit-schema";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ProfileClick } from "../../../../redux/reducers/EditProfileData";
import { headerCarousel } from "../../../../redux/reducers/HomeCarouseldata";

const EditProfile = () => {
  const [editProfileData, setEditProfileData] = useState({});
  const [occupationData, setOccupationData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(editProfileSection(false));
    dispatch(ProfileClick());
    dispatch(headerCarousel())
  };
  const handleProfilePic = (e) => {
    var image = document.getElementById("ProfileImage");
    image.src = URL.createObjectURL(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  // Toast-Success-Edit
  const successEditData = () =>
    toast.success((w) => (
      <div className="toast-div-password">
        Profile Edited Successfully
        <div
          className="toast-close-password"
          onClick={() => toast.dismiss(w.id)}
        >
          X
        </div>
      </div>
    ));

  // console.log(selectedFile);
  const { errors, values, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        editPfullname: editProfileData?.fullName ?? "",
        editPUsername: editProfileData?.userName ?? "",
        editPEmail: editProfileData?.email ?? "",
        MobileNo: editProfileData?.mobileNumber ?? "",
        gender: editProfileData?.gender ?? "prefer not to say",
        editPDOB: editProfileData.dateOfBirth
          ? editProfileData.dateOfBirth
          : "",
        editPOccupation: editProfileData?.occupation ?? "",
        TwitterURL: editProfileData?.twitterLink ?? "",
        FacebookURL: editProfileData?.faceBookLink ?? "",
      },
      // validationSchema: editSchema,
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append(
          "twitterLink",
          values.TwitterURL ? values.TwitterURL : "empty"
        );
        formData.append(
          "faceBookLink",
          values.FacebookURL ? values.FacebookURL : "empty"
        );
        formData.append("occupation", values.editPOccupation);
        formData.append("gender", values.gender);
        formData.append(
          "dateOfBirth",
          values.editPDOB ? values.editPDOB : "empty"
        );
        if (selectedFile == null) {
          // console.log("No image been uploaded");
        } else {
          formData.append("profilePhoto", selectedFile);
        }
        // formData.forEach((value, key) => {
        //   console.log("key %s: value %s", key, value);
        // });

        axios
          .request(
            ` http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/save`,
            {
              method: "put",
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
              },
              data: formData,
            }
          )
          .then((res) => {
            // console.log("res", res);
            successEditData();
            dispatch(ProfileClick());
          })
          .catch((Err) => {
            console.log(Err);
            dispatch(ProfileClick());
          });
      },
    });

  /*EditProfileData Fetch By Mamatha */
  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/myProfile`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
        }
      )
      .then((res) => {
        setEditProfileData(res.data);
      });
  }, []);
  /*EditProfileData Fetch By Mamatha */

  /*Occupation Data Fetch By Mamatha*/
  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/allSubCategoriesWP`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
        }
      )
      .then((res) => {
        setOccupationData(res.data);
      });
  }, []);
  /*Occupation Data Fetch By Mamatha*/

  // console.log("EditData", editProfileData);
  /*Changed Profile Pic*/
  return (
    <div className="drawer-profile">
      <div className="drawer-profile-header">
        <div className="drawer-profile-clear" onClick={handleClick}>
          {arrowRight}
        </div>
        <div className="editprofiletext">Edit Profile</div>
        <div className="editProfileImage">
          <img
            id="ProfileImage"
            src={
              editProfileData && editProfileData.profilePhoto
                ? editProfileData.profilePhoto
                : require("../../../../assets/images/start-courses-image/profilepic.jpg")
            }
            alt=""
          />
          <input
            type="file"
            id="file"
            onChange={handleProfilePic}
            className="custom-file-input"
          />
        </div>
      </div>
      <div className="EditForm">
        <form className="editProfileForm" onSubmit={handleSubmit}>
          <div className="edit-error-input">
            <input
              type="text"
              id="editPfullname"
              name="editPfullname"
              placeholder=""
              className="editPInput"
              value={values.editPfullname}
              autoComplete="off"
            />
            <label htmlFor="" className="editprofilelabel">
              Full Name
            </label>

            {errors.editPfullname && touched.editPfullname ? (
              <>
                <div className="edit-error-line"></div>
                <p className="edit-form-error">{errors.editPfullname}</p>
              </>
            ) : null}
          </div>

          <div className="edit-error-input">
            <input
              type="text"
              id="editPUsername"
              name="editPUsername"
              placeholder=" "
              className="editPInput"
              onBlur={handleBlur}
              value={values.editPUsername}
              autoComplete="off"
            />
            <label htmlFor="" className="editprofilelabel">
              Username
            </label>
            {errors.editPUsername && touched.editPUsername ? (
              <>
                <div className="edit-error-line"></div>
                <p className="edit-form-error">{errors.editPUsername}</p>
              </>
            ) : null}
          </div>

          <div className="edit-error-input">
            <input
              type="email"
              id="editPEmail"
              name="editPEmail"
              placeholder=" "
              className="editPInput"
              onBlur={handleBlur}
              value={values.editPEmail}
              autoComplete="off"
            />
            <label htmlFor="" className="editprofilelabel">
              Email Id
            </label>
            {errors.editPEmail && touched.editPEmail ? (
              <>
                <div className="edit-error-line"></div>
                <p className="edit-form-error">{errors.editPEmail}</p>
              </>
            ) : null}
          </div>

          <div className="edit-error-input">
            <input
              type="text"
              id="editPmobile"
              name="MobileNo"
              placeholder=" "
              className="editPInput"
              onBlur={handleBlur}
              value={values.MobileNo}
              autoComplete="off"
            />
            <label htmlFor="" className="editprofilelabel">
              Mobile Number
            </label>
            {errors.MobileNo && touched.MobileNo ? (
              <>
                <div className="edit-error-line"></div>
                <p className="edit-form-error">{errors.MobileNo}</p>
              </>
            ) : null}
          </div>

          <div className="occupationSection">
            <label htmlFor="occupation">Occupation</label>
            <select
              id="editPOccupation"
              name="editPOccupation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.editPOccupation}
            >
              {occupationData &&
                occupationData.map((ele) => {
                  return (
                    <option value={ele.subCategoryName}>
                      {ele.subCategoryName}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="genderSection">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="prefer not to say" selected>
                prefer not to say
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <input
            type="date"
            id="editPDOB"
            name="editPDOB"
            value={values.editPDOB}
            placeholder=" "
            className="editPInput"
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          <label htmlFor="" className="editprofilelabel">
            Date Of Birth
          </label>

          <div className="edit-error-input">
            <input
              type="url"
              id="editPTwitter"
              name="TwitterURL"
              placeholder=" "
              className="editPInput"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.TwitterURL}
              autoComplete="off"
            />
            <label htmlFor="" className="editprofilelabel">
              Twitter Link
            </label>
            {errors.TwitterURL && touched.TwitterURL ? (
              <>
                <div className="edit-error-line"></div>
                <p className="edit-form-error">{errors.TwitterURL}</p>
              </>
            ) : null}
          </div>

          <div className="edit-error-input">
            <input
              type="url"
              id="editPFacebook"
              name="FacebookURL"
              placeholder=" "
              className="editPInput"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.FacebookURL}
              autoComplete="off"
            />
            <label htmlFor="" className="editprofilelabel">
              Facebook Link
            </label>
            {errors.FacebookURL && touched.FacebookURL ? (
              <>
                <div className="edit-error-line"></div>
                <p className="edit-form-error">{errors.FacebookURL}</p>
              </>
            ) : null}
          </div>
          <button type="submit" className="editPbtn">
            Save
          </button>
        </form>
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
              width: "300px",
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
    </div>
  );
};

export default EditProfile;
