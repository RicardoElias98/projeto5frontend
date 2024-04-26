import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../general.css";
import { useNavigate } from "react-router-dom";

function RecoveryPassword() {
  

  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    fetch(
      "http://localhost:8080/projecto5backend/rest/user/emailRecoveryPassword",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          email: formData.email,
        },
      }
    )
      .then(async function (response) {
        if (response.status === 404) {
          console.log("Email was not found");
        } else if (response.status === 200) {
          alert("Check Your Email");
          navigate("/loginPage", { replace: true });
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
              <label htmlFor="email"> Email </label>
              <input
                type="email"
                name="email"
                defaultValue=""
                onChange={handleChange}
                placeholder="Your Email"
              />
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

export default RecoveryPassword;
