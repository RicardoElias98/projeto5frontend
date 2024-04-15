import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ConfirmationToken() {
    const { token } = useParams();
    console.log(token);

    const [formData, setFormData] = useState({
        password: "",
        passwordConfirmation: "",
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <form /*onSubmit={handleSubmit}*/>
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
