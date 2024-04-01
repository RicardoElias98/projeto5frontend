import React, { useState } from "react";
import "../general.css";
import UserInfo from "./UserInfo";
import { userStore } from "../stores/UserStore";

function User({ username, name, email, contactNumber, role, photo }) {
  let roleClass = "";

  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const rolE = userStore.getState().loginUser.role;

  if (role === "developer") {
    roleClass = "dev";
  } else if (role === "user") {
    roleClass = "scrum-master";
  } else if (role === "Owner") {
    roleClass = "owner";
  }

  const handleDragStart = (event) => {
    event.dataTransfer.setData("user_id", username);
  };

  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  return (
    <>
      <div
        className={`role ${roleClass}`}
        draggable={rolE === "Owner" ? "true" : "false"}
        onDragStart={rolE === "Owner" ? handleDragStart : null}
        onDoubleClick={handleOpenUserInfoModal}
      >
        <div className="photoUser">
          <img src={photo} alt="User" className="photo-user" />
        </div>
        {username}
      </div>
      <UserInfo
        isOpen={isUserInfoModalOpen}
        onClose={handleCloseUserInfoModal}
        username={username}
        name={name}
        email={email}
        contactNumber={contactNumber}
        userPhoto={photo}
        role={role}
      />
    </>
  );
}

export default User;
