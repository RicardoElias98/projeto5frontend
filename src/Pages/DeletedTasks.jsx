import React from "react";
import "../general.css";
import LogoutButton from "../Components/LogoutButton";
import { Link } from "react-router-dom";

import Photo from "../Components/Photo";

import { userStore } from "../stores/UserStore";
import MainDeletedTasks from "../Components/MainDeletedTasks";
import EditProfileButton from "../Components/EditProfileButton";
import NotificationIcon from "../Components/NotificationIcon";
import translations from "../Translation/translation";


function DeletedTasks() {
  const userPhoto = userStore.getState().userPhoto;
  const firstName = userStore.getState().loginUser.name.split(" ")[0];
  const notifications = userStore((state) => state.notification);
  const notCheckedNotification = userStore((state) => state.notCheckedNotification);
  const role = userStore.getState().loginUser.role;
  const language = userStore((state) => state.language);
  const { tasksLink, usersTableLink, usersLink, dashboardLink } = translations[language];

  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <div className="links">
          <h2 className="users-link">
            <Link to="/users">{usersLink}</Link>
          </h2>
          <h2 className="usersTable-link">
              <Link to="/usersTable">{usersTableLink}</Link>
          </h2>
          <h2 className="tasks-link">
            <Link to="/htmlDefault "> {tasksLink} </Link>
          </h2>
          <h2 className="dashboard-link">
            {(role === "Owner") && (
              <Link to="/dashboard">{dashboardLink}</Link>
            )}
          </h2>
        </div>
        <Photo src={userPhoto} variant={1} />
        <h2> {firstName} </h2>
        <NotificationIcon count={notCheckedNotification.length} />
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
