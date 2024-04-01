import React from "react";
import { useState } from "react";

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

   

  const handleSubmit = (event) => {
    event.preventDefault();

    const newWarnings = {};

    if (/\s/.test(formData.username)) {
      newWarnings.username = "Username cannot contain spaces";
    }
    if ((formData.password === "")) {
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
      fetch("http://localhost:8080/project4backend/rest/user/register", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(function (response) {
        if (response.status === 400) {
          alert("All elements are required");
        } else if (response.status === 409) {
          alert("User with this username is already exists");
        } else if (response.status === 201) {
          alert("A new user is created");

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
                Username:{" "}
              </label>
              <input
                type="text"
                name="username"
                defaultValue=""
                onChange={handleChange}
                placeholder="Username"
              />
              <div className="warning">{warnings.username}</div>
              <label>
                <label className="label-add-user" htmlFor="password">
                  {" "}
                  Password:{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue=""
                  onChange={handleChange}
                  placeholder="Password"
                />
                <div className="warning">{warnings.password}</div>
              </label>
              <label className="label-add-user" htmlFor="name">
                {" "}
                Name:{" "}
              </label>
              <input
                type="text"
                name="name"
                defaultValue=""
                onChange={handleChange}
                placeholder="First and Last Name"
              />
              <div className="warning">{warnings.name}</div>
              <label className="label-add-user" htmlFor="email">
                {" "}
                Email:{" "}
              </label>
              <input
                type="text"
                name="email"
                defaultValue=""
                onChange={handleChange}
                placeholder="Email"
              />
              <div className="warning">{warnings.email}</div>
              <label className="label-add-user" htmlFor="contactNumber">
                {" "}
                Phone number:{" "}
              </label>
              <input
                type="text"
                name="contactNumber"
                defaultValue=""
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <div className="warning">{warnings.contactNumber}</div>
              <label className="label-add-user" htmlFor="userPhoto">
                {" "}
                Photo:{" "}
              </label>
              <input
                type="text"
                name="userPhoto"
                defaultValue=""
                onChange={handleChange}
                placeholder="Photo"
              />
              <div className="warning">{warnings.userPhoto}</div>
            </div>
          </div>
          <div className="button-container">
            <input className="button" type="submit" value="Create User" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AsideAddUser;
