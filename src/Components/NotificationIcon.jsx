import React, { useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";
import { userStore } from "../stores/UserStore";
import NotificationMsg from "./NotificationMsg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import translations from "../Translation/translation";


const NotificationIcon = ({ count }) => {
  const [isOpen, setIsOpen] = useState(false);
  const notification = userStore((state) => state.notification);
  const token = userStore((state) => state.token);
  const navigate = useNavigate();
  const notificationWindowRef = useRef(null);
  const loginUser = userStore((state) => state.loginUser);
  const username = loginUser.username;
  const updateNotification = userStore((state) => state.updateNotification);
  const updateNotCheckedNotification = userStore(
    (state) => state.updateNotCheckedNotification
  );
  const language = userStore((state) => state.language);
  const { Ivealreadyreadit} = translations[language];

  const closeNotificationWindow = () => {
    fetch(
      "http://localhost:8080/projecto5backend/rest/notif/checkNotification",
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    ).then((response) => {
      if (response.status === 403) {
        alert("User with this token is not found");
      } else if (response.status === 200) {
        console.log("Notifications are checked");
        updateNotCheckedNotification([]);
      } else if (response.status === 401) {
        alert("Token timer expired, please login again.");
        navigate("/goBackInitialPage", { replace: true });
      }
    });
    setIsOpen(false);
  }

  const toggleNotificationWindow = () => {
    setIsOpen(true);
    fetch("http://localhost:8080/projecto5backend/rest/notif/notifications", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
        username: username,
      },
    }).then(async (response) => {
      if (response.status === 403) {
        alert("User with this token is not found");
      } else if (response.status === 200) {
        console.log("Notifications are fetched");
        const notifications = await response.json();
        updateNotification(notifications);
      } else if (response.status === 401) {
        alert("Token timer expired, please login again.");
        navigate("/goBackInitialPage", { replace: true });
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      notificationWindowRef.current.scrollTop =
        notificationWindowRef.current.scrollHeight;
    }
  }, [notification, isOpen]);

  return (
    <div>
      <FaBell size={24} color="gray" onClick={toggleNotificationWindow} />
      {count > 0 && <span className="notification-count">{count}</span>}
      {isOpen && (
        <div className="notification-window" ref={notificationWindowRef}>
          {notification.length === 0 ? (
            <p>No notifications</p>
          ) : (
            <>
              {notification
                .filter((ntf) => ntf.checked)
                .slice(-5)
                .map((ntf) => (
                  <NotificationMsg
                    key={ntf.id}
                    text={ntf.text}
                    checked={ntf.checked}
                    
                  />
                ))}
                 {notification
                .filter((ntf) => !ntf.checked)
                .map((ntf) => (
                  <NotificationMsg
                    key={ntf.id}
                    text={ntf.text}
                    checked={ntf.checked}
                    
                  />
                ))}
                <button className="buttonNoti" onClick={closeNotificationWindow}> {Ivealreadyreadit
} </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
