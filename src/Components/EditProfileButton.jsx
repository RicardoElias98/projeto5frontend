import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { userStore } from "../stores/UserStore";
import translations from "../Translation/translation";



function EditProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loginUser = userStore((state) => state.loginUser);
  const language = userStore((state) => state.language);
  const { editProfile } = translations[language];
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="button-edit-profile" onClick={openModal}>{ editProfile }</button>
      {isModalOpen && <EditProfileModal onClose={closeModal} user={loginUser}/>}
    </>
  );
}

export default EditProfileButton;
