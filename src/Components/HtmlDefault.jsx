import React from "react";
import "../general.css";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import AsideAddTask from "./AsideAddTask";
import MainSB from "./MainSB";
import Photo from "./Photo";
import { userStore } from "../stores/UserStore";
import EditProfileButton from "./EditProfileButton";

function HtmlDefault() {
  const userPhoto = userStore.getState().userPhoto;
  const loginUser = userStore.getState().loginUser;
  const firstName = userStore((state) => state.firstName);
  const role = userStore.getState().loginUser.role;

  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <div className="links">
          <h2 className="users-link">
            {(role === "Owner" || role === "user") && (
              <Link to="/users">Users</Link>
            )}
          </h2>

          <h2 className="Deleted-tasks-link">
            {(role === "Owner" || role === "user") && (
              <Link to="/deletedTasks"> Deleted Tasks</Link>
            )}
          </h2>
        </div>
        <Photo src={userPhoto} />
        <h2> {firstName} </h2>
        <EditProfileButton />
        <LogoutButton />
      </header>
      <div className="container">
        <aside className="aside" id="aside-app">
          <AsideAddTask />
        </aside>
        <main className="main" id="main-app">
          <MainSB />
        </main>
      </div>
      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default HtmlDefault;
