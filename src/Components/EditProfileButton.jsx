import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { userStore } from "../stores/UserStore";


function EditProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loginUser = userStore((state) => state.loginUser);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="button-edit-profile" onClick={openModal}>Edit Profile</button>
      {isModalOpen && <EditProfileModal onClose={closeModal} user={loginUser}/>}
    </>
  );
}

export default EditProfileButton;
