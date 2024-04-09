import React from "react";

function Message({ text, checked }) {
  const messageClass = checked ? "message-checked" : "message-unchecked";

  return (
    <div className={`message-container `}>
      <div className={`message-bubble ${messageClass}`}>{text}</div>
    </div>
  );
}

export default Message;
