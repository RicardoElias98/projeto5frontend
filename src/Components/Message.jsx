import React, { useState } from "react";
import { userStore } from "../stores/UserStore";
import { FaEye } from "react-icons/fa";

function Message({ text, checked, sender }) {
  const [isMessageRead, setIsMessageRead] = useState(checked);
  const loginUser = userStore((state) => state.loginUser);

  const messageClass = isMessageRead ? "message-checked" : "message-unchecked";

  const handleEyeClick = () => {
    // Lógica para marcar a mensagem como lida
    setIsMessageRead(true);
  };

  if (sender === loginUser.username) {
    return (
      <div className={"message-container-right"}>
        <div className={`message-bubble ${messageClass}`}>
          {text}
        </div>
      </div>
    );
  } else {
    return (
      <div className={"message-container-left"}>
        <div className={`message-bubble ${messageClass}`}>
          {text}
          {!isMessageRead && (
            <button onClick={handleEyeClick}>
              <FaEye />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Message;

