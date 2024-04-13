import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { userStore } from "../stores/UserStore";
import NotificationMsg from "./NotificationMsg";

const NotificationIcon = ({ count }) => {
  const [isOpen, setIsOpen] = useState(false);
  const notification = userStore((state) => state.notification);

  const toggleNotificationWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FaBell size={24} color="gray" onClick={toggleNotificationWindow} />
      {count > 0 && <span className="notification-count">{count}</span>}
      {isOpen && (
        <div className="notification-window">
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
