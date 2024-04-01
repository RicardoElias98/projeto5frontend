import React, { useState } from "react";
import { userStore } from "../stores/UserStore";

function EditPasswordModal({ onClose}) {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });

  

  const token = userStore.getState().token;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    
    fetch("http://localhost:8080/project4backend/rest/user/updatePassword", {
        method: "PUT",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: token,
        },
        body: JSON.stringify(formData),
        }).then(function (response) {
        if (response.status === 403) {
            console.log("Forbidden");
        } else if (response.status === 406) {
            console.log("Failed. User not updated. Password is invalid");
        } else if (response.status === 400) {
            console.log("Failed. User not updated.");
        } else if (response.status === 200) {
            console.log("User updated");
        
            onClose();
        }
        });
  };

  return (
    <div className="modal" id="userInfoModal">
      <div className="modal-content">
        <h2 className="h2">Edit Password</h2>

        <label className="h2" htmlFor="actualPassword">
          Actual Password:
        </label>
        <input
          type="text"
          id="actualPassword"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label className="h2" htmlFor="newPassword">
          New Password:
        </label>
        <input
          type="text"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <button onClick={handleConfirm}> Confirm </button>
        <button onClick={handleCancel}> Cancel </button>
      </div>
    </div>
  );
}

export default EditPasswordModal;
