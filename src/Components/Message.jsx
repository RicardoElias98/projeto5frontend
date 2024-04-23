import React, { useState } from "react";
import { userStore } from "../stores/UserStore";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Message({ text, checked, sender, id }) {
  const [isMessageRead, setIsMessageRead] = useState(checked);
  const loginUser = userStore((state) => state.loginUser);
  const token = userStore((state) => state.token);
  const messageClass = isMessageRead ? "message-checked" : "message-unchecked";
  const navigate = useNavigate();

  const handleEyeClick = () => {
    const checked=true;
    fetch(`http://localhost:8080/projecto5backend/rest/msg/udpateChecked/${checked}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
        msgId: id,
      },
    })
      .then(async function (response) {
        if (response.status === 403) {
          alert("User with this token is not found");
        } else if (response.status === 200) {
          console.log("Msg is checked");
          setIsMessageRead(true);
        } else if (response.status === 401) {
          alert("Token timer expired, please login again.");
          navigate("/goBackInitialPage", { replace: true });
        }
      }
    )};
    
    

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

