import React from "react";
import Sidebar from "../components/navbar/Sidebar";
import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const updateName = userStore((state) => state.updateName);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    updateName(inputs.username);
    navigate("/home", { replace: true });
  };
  return (
    <div className="Login" id="profile-outer-container">
      <Sidebar
        pageWrapId={"login-page-wrap"}
        outerContainerId={"login-outer-container"}
      />{" "}
      <div className="page-wrap" id="login-page-wrap">
        {" "}
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your username:
            <input
              type="text"
              name="username"
              defaultValue={inputs.username || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Enter your password:
            <input
              type="text"
              name="password"
              defaultValue={inputs.password || ""}
              onChange={handleChange}
            />{" "}
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
