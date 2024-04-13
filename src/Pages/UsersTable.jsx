import React from "react";
import "../general.css";
import LogoutButton from "../Components/LogoutButton";
import { Link } from "react-router-dom";
import Photo from "../Components/Photo";
import { userStore } from "../stores/UserStore";
import MainUsers from "../Components/MainUsers";
import AsideAddUser from "../Components/AsideAddUser";
import EditProfileButton from "../Components/EditProfileButton";
import DataTableUsers from "../Components/DataTableUsers";
import NotificationIcon from "../Components/NotificationIcon";

function UsersTable() {
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
          <h2 className="Deleted-tasks-link">
            {(role === "Owner" || role === "user") && (
              <Link to="/deletedTasks"> Deleted Tasks</Link>
            )}
          </h2>
          <h2 className="users-link">
            <Link to="/users">Users</Link>
          </h2>
        </div>
        <Photo src={userPhoto} />
        <h2> {firstName}</h2>
        <NotificationIcon /*count={10}*//>
        <EditProfileButton />
        <LogoutButton />
      </header>
      <div className="container">
        <main className="main" id="main-app">
          <DataTableUsers />
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default UsersTable;
