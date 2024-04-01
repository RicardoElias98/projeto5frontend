import React from "react";
import "../general.css";
import LogoutButton from "../Components/LogoutButton";
import { Link } from "react-router-dom";

import Photo from "../Components/Photo";

import { userStore } from "../stores/UserStore";
import MainDeletedTasks from "../Components/MainDeletedTasks";
import EditProfileButton from "../Components/EditProfileButton";

function DeletedTasks() {
  const userPhoto = userStore.getState().userPhoto;
  const firstName = userStore.getState().loginUser.name.split(" ")[0];
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <div className="links">
          <h2 className="users-link">
            <Link to="/users">Users</Link>
          </h2>
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
        <main className="main" id="main-app">
          <MainDeletedTasks />
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default DeletedTasks;
