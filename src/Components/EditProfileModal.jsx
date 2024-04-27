import React, { useState } from "react";
import { userStore } from "../stores/UserStore";
import EditPasswordModal from "./EditPasswordModal";
import translations from "../Translation/translation";

function EditProfileModal({ onClose, user }) {
  const loginUser = userStore((state) => state.loginUser);
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    userPhoto: user.userPhoto,
    password: user.password,
    role: loginUser.role,
  });

  const updateLoginUser = userStore((state) => state.updateLoginUser);
  const language = userStore((state) => state.language);
  const updateLanguage = userStore((state) => state.updateLanguage);
  const {
    editProfile,
    usernameLabel,
    nameLabel,
    emailLabel,
    phoneLabel,
    photoLabel,
    confirmm,
    cancel,
    edit,
    editPassword,
    switchLanguageButton,
    Usernamecannotcontainspaces,
    Passwordisrequired,
    Namemustcontainexactlytwonames,
    Invalidemailformat,
    Invalidphonenumberformatshouldcontainexactly9digits,
    PhotoURLshouldstartwithhttps,
  } = translations[language];

  const toggleLanguage = () => {
    updateLanguage(language === "en" ? "pt" : "en");
  };

  const token = userStore.getState().token;
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    onClose();
  };

  const openEditPasswordModal = () => {
    setIsEditPasswordModalOpen(true);
  };

  const [warnings, setWarnings] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    contactNumber: "",
    userPhoto: "",
  });

  const handleConfirm = () => {
    const newWarnings = {};

    if (/\s/.test(formData.username)) {
      newWarnings.username = Usernamecannotcontainspaces;
    }
    if (formData.password === "") {
      newWarnings.password = Passwordisrequired;
    }
    if (!/^(\S+\s+\S+)$/.test(formData.name.trim())) {
      newWarnings.name = Namemustcontainexactlytwonames;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newWarnings.email = Invalidemailformat;
    }
    if (!/^\d{9}$/.test(formData.contactNumber.trim())) {
      newWarnings.contactNumber =
        Invalidphonenumberformatshouldcontainexactly9digits;
    }

    if (
      formData.userPhoto.trim() &&
      !formData.userPhoto.trim().startsWith("https://")
    ) {
      newWarnings.userPhoto = PhotoURLshouldstartwithhttps;
    }

    setWarnings(newWarnings);

    if (Object.values(newWarnings).every((warning) => warning === "")) {
      console.log(formData);
      fetch("http://localhost:8080/projecto5backend/rest/user/update", {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData),
      }).then(function (response) {
        if (response.status === 404) {
          console.log("User not found");
        } else if (response.status === 406) {
          console.log("Failed. User not updated. All elements are required");
        } else if (response.status === 400) {
          console.log("Failed. User not updated");
        } else if (response.status === 200) {
          console.log("User updated");
          updateLoginUser(formData);
          onClose();
        }
      });
    }
  };

  return (
    <div
      className={`modal ${isEditPasswordModalOpen ? "dark-background" : ""}`}
      id="userInfoModal"
    >
      <div className="modal-content">
        <h2 className="h2">{editProfile}</h2>

        <label className="h2" htmlFor="userName">
          {usernameLabel}
        </label>
        <input
          type="text"
          id="usernaName"
          name="username"
          value={formData.username}
          onChange={handleChange}
          readOnly={true}
          className={"input-read-only"}
        />
        <div className="warning">{warnings.username}</div>

        <label className="h2" htmlFor="nameUser">
          {nameLabel}
        </label>
        <input
          type="text"
          id="nameUser"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="warning">{warnings.name}</div>
        <label className="h2" htmlFor="email">
          {emailLabel}
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="warning">{warnings.email}</div>
        <label className="h2" htmlFor="phoneNumber">
          {phoneLabel}
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <div className="warning">{warnings.contactNumber}</div>
        <label className="h2" htmlFor="photo">
          {photoLabel}
        </label>
        <input
          type="text"
          id="photo"
          name="userPhoto"
          value={formData.userPhoto}
          onChange={handleChange}
        />
        <div className="warning">{warnings.userPhoto}</div>

        <button onClick={handleConfirm}> {confirmm} </button>
        <button onClick={handleCancel}> {cancel} </button>
        <button onClick={openEditPasswordModal}> {editPassword} </button>
        <button className="button" onClick={toggleLanguage}>
          {switchLanguageButton}
        </button>
        {isEditPasswordModalOpen && (
          <EditPasswordModal
            onClose={() => setIsEditPasswordModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default EditProfileModal;
