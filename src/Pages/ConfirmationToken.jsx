import React from "react";

function ConfirmationToken() {
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
                /*onChange={handleChange}*/
                placeholder="New Password"
              />

              <label>
                <label htmlFor="PasswordConfirmation">
                  {" "}
                  Password Confirmation:{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue=""
                  /*onChange={handleChange}*/
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
