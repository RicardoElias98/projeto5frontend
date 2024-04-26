import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { userStore } from "../stores/UserStore";
import NotificationMsg from "./NotificationMsg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";


const NotificationIcon = ({ count }) => {
  const [isOpen, setIsOpen] = useState(false);
  const notification = userStore((state) => state.notification);
  const token = userStore((state) => state.token);
  const navigate = useNavigate();
  const notificationWindowRef = useRef(null);


  const toggleNotificationWindow = () => {
    setIsOpen(true);
    fetch("http://localhost:8080/projecto5backend/rest/notif/checkNotification", {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    }).then((response) => {
      if (response.status === 403) {
        alert("User with this token is not found");
      } else if (response.status === 200) {
        console.log("Notifications are checked");
      } 
      else if (response.status === 401) {
        alert("Token timer expired, please login again.");
        navigate("/goBackInitialPage", { replace: true });
      } 
    });
  };

  useEffect(() => {
    if (isOpen) {
      // Scroll para a notificação mais recente
      notificationWindowRef.current.scrollTop = notificationWindowRef.current.scrollHeight;
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
            notification.map((ntf) => (
              <NotificationMsg key={ntf.id} text={ntf.text} checked={ntf.checked} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
