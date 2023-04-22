import React, { useState, useEffect } from "react";
import { closeProfile, editProfile } from "../../../../utils/svgIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationSection,
  profileDrawer,
  profileSection,
  settingsSection,
} from "../../../../redux/reducers/headerProfileOptions";
import Switch from "react-switch";
import "./Notification.css";
import axios from "axios";
import TimeAgo from "timeago-react";
import { NotifyClick } from "../../../../redux/reducers/NotificationsData";
import { MobileNotifyClick } from "../../../../redux/reducers/MobileNotification";

const Notification = () => {
  const [notifyData1, setNotifyData] = useState([]); /*Changed*/
  const [notId, setNotId] = useState("");
  const [changeNotId, setChangeNotId] = useState(false);
  const dispatch = useDispatch();
  const notifyData = useSelector((state) => state.NotifyClick.data);

  const handleClick = () => {
    dispatch(profileDrawer(false));
    dispatch(profileSection(false));
    // dispatch(notificationSection(false))
    dispatch(settingsSection(false));
    dispatch(NotifyClick());
    dispatch(MobileNotifyClick());
  };

  useEffect(() => {
    dispatch(NotifyClick());
  }, [notId]);

  return (
    <div className="drawer-profile-notify">
      <div className="drawer-profile-header-notify">
        <div className="drawer-profile-clear-notify" onClick={handleClick}>
          {closeProfile}
        </div>
        <div className="arrow-left-notify-mobile">
          <i
            className="fa-solid fa-arrow-left-long arrow-left-long-notify"
            onClick={handleClick}
          ></i>
        </div>

        <div className="drawer-profile-name-notify">
          <p className="drawer-profile-profile-notify">Notifications</p>
        </div>
      </div>
      {notifyData && notifyData.data && notifyData.data.length > 0 ? (
        <div className="drawer-profile-body-notify">
          {notifyData &&
            notifyData.data &&
            notifyData.data.length > 0 &&
            notifyData.data.map((ele) => {
              return (
                <div
                  className={
                    ele.readStatus ? "notificationRead" : "notificationUnread"
                  }
                  onClick={() => {
                    axios
                      .request(
                        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/readNotification`,
                        {
                          method: "put",
                          headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                              "Token"
                            )}`,
                          },
                          data: {
                            notificationId: ele.notificationId,
                          },
                        }
                      )
                      .then((res) => {
                        if (res.data.message === "Successfully") {
                          setNotId(ele.notificationId);
                        }
                      });
                  }}
                >
                  <div className="notifyImage">
                    <img src={ele.notificationUrl} alt="" />
                  </div>
                  <div className="notifycontainer">
                    <div className="notifydata">{ele.description}</div>
                    <div className="notifiedTime">
                      <TimeAgo datetime={ele.timeStamp} locale="en" />
                    </div>
                  </div>
                  <div
                    className={
                      ele.readStatus ? "unread-dot-read" : "unread-dot"
                    }
                  ></div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="noNotification-section">
          <p>No Notifications</p>
        </div>
      )}

    </div>
  );
};

export default Notification;
