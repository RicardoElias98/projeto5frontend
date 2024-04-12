import React from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationIcon = ({ count }) => {
  return (
    <div>
      <FaBell size={24} color="gray" />
      {count > 0 && (
        <span className="notification-count">{count}</span>
      )}
    </div>
  );
};

export default NotificationIcon;
