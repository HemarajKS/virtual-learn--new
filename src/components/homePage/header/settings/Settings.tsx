import React, { useEffect, useState } from "react";
import "./Settings.css";
import {
  closeProfile,
  settings_Icon,
  privacy_icon,
  terms_icon,
  chevron_right,
} from "../../../../utils/svgIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationSection,
  privacySection,
  profileDrawer,
  profileSection,
  settingsSection,
  termsSection,
} from "../../../../redux/reducers/headerProfileOptions";
import Switch from "react-switch";
import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";
import Terms from "../terms/Terms";
import addNotification from 'react-push-notification'
import { NotifyClick } from "../../../../redux/reducers/NotificationsData";
import { notifyState } from "../../../../redux/reducers/myCourseReducer";

const Settings = () => {
  const [checked, setChecked] = useState(false);
  const [checkedSound, setCheckedSound] = useState(false);
  const [toggleSetnotify, settoggleSetnotify] = useState(false);
  const dispatch = useDispatch();
  const privacyPolicyState = useSelector(
    (state: any) => state.headerProfile.privacy
  );
  const TermsState = useSelector((state: any) => state.headerProfile.terms);
  const notifyData = useSelector((state: any) => state.NotifyClick.data);
  const pushState = useSelector((state: any) => state.mycourse.notify);

  const handleChange = () => {
    // setChecked(nextChecked);
    dispatch(notifyState('true'))
  };

  dispatch(notifyState(checked))

  useEffect(() => {
    checked && notifyData &&
      notifyMe()
  }, [checked,notifyData])

  function notifyMe() {
    let notifyMsg = notifyData.data[0].description;
    addNotification({
      title: 'Virtual Learn',
      message: notifyMsg,
      duration: 4000,
      native: true
    })
  }


  const handleChangeSound = (nextChecked: any) => {
    setCheckedSound(nextChecked);
  };

  const handleClick = () => {
    dispatch(profileDrawer(false));
    dispatch(profileSection(false));
    dispatch(notificationSection(false));
    // dispatch(settingsSection(false))
  };
  const handlePrivacyPolicy = () => {
    dispatch(privacySection(true));
  };
  const handleTermsServices = () => {
    dispatch(termsSection(true));
  };
  const handleSetNotify = () => {
    settoggleSetnotify(!toggleSetnotify);
  };
  const renderElements = () => {
    if (privacyPolicyState) {
      return <PrivacyPolicy />;
    } else if (TermsState) {
      return <Terms />;
    } else {
      return (
        <div className="drawer-profile-settings">
          <div className="drawer-profile-header-settings">
            <div
              className="drawer-profile-clear-settings"
              onClick={handleClick}
            >
              {closeProfile}
            </div>
            <div className="mobile-arrow-left-settings">
              <i
                className="fa-solid fa-arrow-left-long arrow-left-long-settings"
                onClick={handleClick}
              ></i>
            </div>
            <div className="settings-settings-text-set">
              <p>Settings</p>
            </div>
          </div>

          <div className="settings-body">
            <div className="settings-notification">
              <div className="settings-notification-text-icon">
                <div className="settings-icon">{settings_Icon}</div>
                <p
                  className="settings-notification-text"
                  onClick={handleSetNotify}
                >
                  Notification Settings
                </p>
              </div>
              {toggleSetnotify ? (
                <div className="settings-notification-container">
                  <div className="settings-push-notification">
                    <p>Push Notification</p>
                    <Switch
                      onChange={handleChange}
                      checked={pushState}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      width={48}
                      height={22}
                      className="react-switch-1"
                    />
                  </div>
                  <div className="settings-notification-sound">
                    <p>Notification Sound</p>
                    <Switch
                      onChange={handleChangeSound}
                      checked={checkedSound}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      width={48}
                      height={22}
                      className="react-switch-2"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              className="settings-privacy-policy"
              onClick={handlePrivacyPolicy}
            >
              <div className="privacy-policy-text-icon">
                <div className="privacy_icon">{privacy_icon}</div>
                <p>Privacy Policy</p>
              </div>
              <div className="settings-chevron-right">{chevron_right}</div>
            </div>

            <div
              className="settings-terms-services"
              onClick={handleTermsServices}
            >
              <div className="terms-text-icon">
                <div className="terms_icon">{terms_icon}</div>
                <p>Terms of Services</p>
              </div>
              <div className="settings-chevron-right">{chevron_right}</div>
            </div>
          </div>
        </div>
      );
    }
  };
  return <>{renderElements()}</>;
};

export default Settings;
