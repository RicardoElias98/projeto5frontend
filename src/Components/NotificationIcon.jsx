import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationIcon = ({ count }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotificationWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FaBell size={24} color="gray" onClick={toggleNotificationWindow} />
      {count > 0 && (
        <span className="notification-count">{count}</span>
      )}
      {isOpen && (
        <div className="notification-window">
          {/* Aqui você pode renderizar o conteúdo das notificações */}
          <p>Conteúdo das notificações...</p>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;

