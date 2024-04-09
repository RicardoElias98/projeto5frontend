import React from "react";
import { userStore } from "../stores/UserStore";

function Message({ text, checked, sender}) {
  const messageClass = checked ? "message-checked" : "message-unchecked";
  const loginUser = userStore((state) => state.loginUser);

  if (sender === loginUser.username) {
    return (
      <div className={"message-container-right"}>
        <div className={`message-bubble ${messageClass}`}>{text}</div>
      </div>
    );
  } else {
    return (
      <div className={"message-container-left"}>
        <div className={`message-bubble ${messageClass}`}>{text}</div>
      </div>
    );
  }
}

export default Message;
