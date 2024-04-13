import React from "react";
import general from "../general.css";

function NotificationMsg({ text, checked }) {
  return (
    <div className={`notification-msg ${checked ? "checked" : "unchecked"}`}>
      {text}
    </div>
  );
}

export default NotificationMsg;
