import React from "react";
import "../general.css";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";

function LogoutButton() {
  const navigate = useNavigate();
  const token = userStore.getState().token;
  const updateToken = userStore((state) => state.updateToken);
  const updateLoginUser = userStore((state) => state.updateLoginUser);
  const updateFirstName = userStore((state) => state.updateFirstName);

  const logoutSucess = () => {
    
    navigate("/goBackInitialPage", { replace: true });
  };

  const logout = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/project4backend/rest/user/logout", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    }).then(function (response) {
      if (response.status === 405) {
        console.log(token);
        alert("Forbidden");
      } else if (response.status === 200) {
        updateToken("");
        updateLoginUser("");
        updateFirstName("");
        logoutSucess();
      }
    });
  };

  return <button onClick={logout}> Logout </button>;
}

export default LogoutButton;
