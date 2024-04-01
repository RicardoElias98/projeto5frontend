import React from "react";
import "../general.css";
import LogoutButton from "../Components/LogoutButton";
import { Link } from "react-router-dom";
import Photo from "../Components/Photo";
import { userStore } from "../stores/UserStore";
import MainUsers from "../Components/MainUsers";
import AsideAddUser from "../Components/AsideAddUser";
import EditProfileButton from "../Components/EditProfileButton";

function Users() {
  const userPhoto = userStore.getState().userPhoto;
  const firstName = userStore.getState().loginUser.name.split(" ")[0];
  const role = userStore.getState().loginUser.role;
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <div className="links">
          <h2 className="tasks-link">
            <Link to="/htmlDefault "> Tasks </Link>
          </h2>
        </div>
        <Photo src={userPhoto} />
        <h2> {firstName} </h2>
        <EditProfileButton />
        <LogoutButton />
      </header>
      <div className="container">
        {role === "Owner" && (
        <aside className="aside" id="aside-app">
          <AsideAddUser />
        </aside>
        )}
        <main className="main" id="main-app">
          <MainUsers />
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default Users;
