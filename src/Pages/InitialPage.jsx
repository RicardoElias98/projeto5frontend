import React from "react";
import "../general.css";
import { useNavigate } from "react-router-dom";

function InitialPage() {
  const navigate = useNavigate();
  const loginSubmit = () => {
    navigate("/loginPage", { replace: true });
  };

  const registerSubmit = () => {
    navigate("/registerPage", { replace: true });
  };
  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <h2>Welcome to ScrumBoard</h2>
        <div className="button-container">
          <button className="button" onClick={loginSubmit}>
            Login
          </button>
          <button className="button" onClick={registerSubmit}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default InitialPage;
