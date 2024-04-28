import React from "react";
import { useState } from "react";
import translations from "../Translation/translation";
import { userStore } from "../stores/UserStore";

function AsideAddUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    contactNumber: "",
    userPhoto: "",
  });

  const [warnings, setWarnings] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    contactNumber: "",
    userPhoto: "",
  });

  const allUsers = userStore((state) => state.allUsers);
  const updateAllUsers = userStore((state) => state.updateAllUsers);

  const language = userStore((state) => state.language);
  const {
    usernameLabel,
    usernamePlaceholder,
    passwordLabel,
    passwordPlaceholder,
    nameLabel,
    firstNameLastPlaceholder,
    emailLabel,
    emailPlaceHolder,
    photoLabel,
    photoPlaceHolder,
    phoneLabel,
    phonePlaceHolder,
    createUser,
    Usernamecannotcontainspaces,
    Passwordisrequired,
    Namemustcontainexactlytwonames,
    Invalidemailformat,
    Invalidphonenumberformatshouldcontainexactly9digits,
    PhotoURLshouldstartwithhttps,
  } = translations[language];

  const handleSubmit = (event) => {
    event.preventDefault();

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
      fetch("http://localhost:8080/projecto5backend/rest/user/register", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async function (response) {
        if (response.status === 400) {
          alert("All elements are required");
        } else if (response.status === 409) {
          alert("User with this username is already exists");
        } else if (response.status === 201) {     
          const newUser = await response.json();

  
  const updatedAllUsers = [...allUsers, newUser];

  
  updateAllUsers(updatedAllUsers);
          setFormData({
            username: "",
            password: "",
            name: "",
            email: "",
            contactNumber: "",
            userPhoto: "",
          });
        }
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setWarnings((prevWarnings) => ({ ...prevWarnings, [name]: "" }));
  };

  return (
    <div>
      <div className="overlayaddUser"></div>
      <div className="modaladdUser">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="labels-containers">
              <label className="label-add-user" htmlFor="username">
                {" "}
                {usernameLabel}{" "}
              </label>
              <input
                type="text"
                name="username"
                defaultValue=""
                onChange={handleChange}
                placeholder={usernamePlaceholder}
              />
              <div className="warning">{warnings.username}</div>
              <label>
                <label className="label-add-user" htmlFor="password">
                  {" "}
                  {passwordLabel}{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue=""
                  onChange={handleChange}
                  placeholder={passwordPlaceholder}
                />
                <div className="warning">{warnings.password}</div>
              </label>
              <label className="label-add-user" htmlFor="name">
                {" "}
                {nameLabel}{" "}
              </label>
              <input
                type="text"
                name="name"
                defaultValue=""
                onChange={handleChange}
                placeholder={firstNameLastPlaceholder}
              />
              <div className="warning">{warnings.name}</div>
              <label className="label-add-user" htmlFor="email">
                {" "}
                {emailLabel}{" "}
              </label>
              <input
                type="text"
                name="email"
                defaultValue=""
                onChange={handleChange}
                placeholder={emailPlaceHolder}
              />
              <div className="warning">{warnings.email}</div>
              <label className="label-add-user" htmlFor="contactNumber">
                {" "}
                {phoneLabel}{" "}
              </label>
              <input
                type="text"
                name="contactNumber"
                defaultValue=""
                onChange={handleChange}
                placeholder={phonePlaceHolder}
              />
              <div className="warning">{warnings.contactNumber}</div>
              <label className="label-add-user" htmlFor="userPhoto">
                {" "}
                {photoLabel}{" "}
              </label>
              <input
                type="text"
                name="userPhoto"
                defaultValue=""
                onChange={handleChange}
                placeholder={photoPlaceHolder}
              />
              <div className="warning">{warnings.userPhoto}</div>
            </div>
          </div>
          <div className="button-container">
            <input className="button" type="submit" value={createUser} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AsideAddUser;
