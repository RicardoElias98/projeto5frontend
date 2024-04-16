import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../general.css";
import { useNavigate } from "react-router-dom";

function ConfirmationToken() {
  const { token } = useParams();
  console.log(token);

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log("token2", token);
    fetch("http://localhost:8080/projecto5backend/rest/user/tokenConfirmationAndChangePassword", {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        tokenConfirmation: token,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      },
    })
      .then(async function (response) {
        if (response.status === 403) {
          console.log("User with this token confirmation is not found");
        } else if (response.status === 200) {
          alert("User is confirmated and first password is updated");
            navigate("/loginPage", { replace: true });
        } else if (response.status === 400) {
          console.log("Passwords are not the same");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="labels-containers">
              <label htmlFor="password"> Password: </label>
              <input
                type="password"
                name="password"
                defaultValue=""
                onChange={handleChange}
                placeholder="New Password"
              />

              <label>
                <label htmlFor="PasswordConfirmation">
                  {" "}
                  Password Confirmation:{" "}
                </label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  defaultValue=""
                  onChange={handleChange}
                  placeholder="Repeat your password"
                />
              </label>
              <div className="button-container">
                <input className="button" type="submit" value="Confirm" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


export default ConfirmationToken;
