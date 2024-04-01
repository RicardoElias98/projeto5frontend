import React, { useState } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";

function UserInfo({
  isOpen,
  onClose,
  username,
  name,
  email,
  contactNumber,
  userPhoto,
  role,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const token = userStore.getState().token;
  const rolE = userStore.getState().loginUser.role;

  const [formData, setFormData] = useState({
    username: username,
    name: name,
    email: email,
    contactNumber: contactNumber,
    userPhoto: userPhoto,
    role: role,
  });

  const [warnings, setWarnings] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    contactNumber: "",
    userPhoto: "",
  });

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleClose = () => {
    onClose();
    setIsEditable(false);
  };

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirm = () => {
    const newWarnings = {};

    if (/\s/.test(formData.username)) {
      newWarnings.username = "Username cannot contain spaces";
    }
    if (formData.password === "") {
      newWarnings.password = "Password is required";
    }
    if (!/^(\S+\s+\S+)$/.test(formData.name.trim())) {
      newWarnings.name = "Name must contain exactly two names";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newWarnings.email = "Invalid email format";
    }
    if (!/^\d{9}$/.test(formData.contactNumber.trim())) {
      newWarnings.contactNumber =
        "Invalid phone number format (should contain exactly 9 digits)";
    }

    if (
      formData.userPhoto.trim() &&
      !formData.userPhoto.trim().startsWith("https://")
    ) {
      newWarnings.userPhoto = "Photo URL should start with 'https://'";
    }

    setWarnings(newWarnings);

    if (Object.values(newWarnings).every((warning) => warning === "")) {
      console.log(formData);
      fetch("http://localhost:8080/project4backend/rest/user/update", {
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
          onClose();
        }
      });
    }
  };

  const handleDelete = () => {
    const username = formData.username;
    console.log(username);
    fetch(
      `http://localhost:8080/project4backend/rest/user/delete/${username}`,
      {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    ).then(function (response) {
      if (response.status === 403) {
        console.log("Forbidden");
      } else if (response.status === 400) {
        console.log("Failed. User not deleted");
      } else if (response.status === 200) {
        console.log("User deleted");
        onClose();
      }
    });
  };

  return (
    <div className="modal" id="userInfoModal">
      <div className="modal-content">
        <h2 className="h2">User Info</h2>

        <label className="h2" htmlFor="userName">
          Username:
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
          Name of the User:
        </label>
        <input
          type="text"
          id="nameUser"
          name="name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!isEditable}
          className={isEditable ? "" : "input-read-only"}
        />
        <div className="warning">{warnings.name}</div>
        <label className="h2" htmlFor="email">
          Email:
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          readOnly={!isEditable}
          className={isEditable ? "" : "input-read-only"}
        />
        <div className="warning">{warnings.email}</div>
        <label className="h2" htmlFor="phoneNumber">
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          readOnly={!isEditable}
          className={isEditable ? "" : "input-read-only"}
        />
        <div className="warning">{warnings.contactNumber}</div>
        <label className="h2" htmlFor="photo">
          Photo:
        </label>
        <input
          type="text"
          id="photo"
          name="userPhoto"
          value={formData.userPhoto}
          onChange={handleChange}
          readOnly={!isEditable}
          className={isEditable ? "" : "input-read-only"}
        />
        <div className="warning">{warnings.userPhoto}</div>
        {isEditable ? (
          <>
            <button className="button" onClick={handleConfirm}>
              {" "}
              Confirm{" "}
            </button>
            <button className="button" onClick={handleClose}>
              {" "}
              Cancel{" "}
            </button>
            <button className="button" onClick={handleDelete}>
              {" "}
              Delete{" "}
            </button>
          </>
        ) : (
          <>
            {rolE === "Owner" && (
              <button className="button" onClick={handleEditClick}>
                Edit
              </button>
            )}
            <button className="button" onClick={handleClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
