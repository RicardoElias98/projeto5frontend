import React from "react";
import { useNavigate } from "react-router-dom";

function NotificationMsg({ text, checked }) {

  const navigate = useNavigate();

  const handleClick = () => {
    const match = text.match(/from\s+(.*?)\s+on/);
    const sender = match ? match[1] : ''; 
    navigate(`/userProfile/${sender}`, { replace: true });
  };
  
  return (
    <div 
      className={`notification-msg ${checked ? "checked" : "unchecked"}`}
      onClick={handleClick} 
    >
      {text}
    </div>
  );
}

export default NotificationMsg;
