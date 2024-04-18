import React from "react";
import "../general.css";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import AsideAddTask from "./AsideAddTask";
import MainSB from "./MainSB";
import Photo from "./Photo";
import { userStore } from "../stores/UserStore";
import EditProfileButton from "./EditProfileButton";
import NotificationIcon from "./NotificationIcon";
import { useState } from "react";
import WebSocketNotification from "./WebSocketNotification";
import WebSocketTasks from "./WebSocketTasks";
import { tasksStore } from "../stores/TasksStore";

function HtmlDefault() {
  const userPhoto = userStore.getState().userPhoto;
  const loginUser = userStore.getState().loginUser;
  const firstName = userStore((state) => state.firstName);
  const role = userStore.getState().loginUser.role;
  const notifications = userStore((state) => state.notification);
  const notCheckedNotification = userStore(
    (state) => state.notCheckedNotification
  );
  const token = userStore((state) => state.token);
  const tasks = tasksStore((state) => state.tasks);

  const counter = userStore((state) => state.counter);
  const updateCounter = userStore((state) => state.updateCounter);
  const addTask = tasksStore((state) => state.addTask);
  const removeTask = tasksStore((state) => state.removeTask);

  const updateNotCheckedNotification = userStore(
    (state) => state.updateNotCheckedNotification
  );

  

  const [notCheckedMessages, setNotCheckedMessages] = useState(
    notCheckedNotification
  );

  const onNotificationReceived = (notification) => {
    console.log("receive", notification);
    setNotCheckedMessages((prevNotifications) => [
      ...prevNotifications,
      {
        text: notification.text,
        user: notification.user,
        notificationDateTime: notification.notificationDateTime,
        checked: notification.checked,
        id: notification.id,
      },
    ]);
    updateNotCheckedNotification(notCheckedMessages);
  };

  const onTasksReceived = (task) => {
    console.log("tasks", tasks);
    console.log("receive", task);
    const idTask = task.id;

    removeTask(idTask);
    console.log("tasks romove", tasks);

    addTask(task);
    console.log("tasks add", tasks);
    updateCounter(counter + 1);
  };

  WebSocketNotification(token, onNotificationReceived);
  WebSocketTasks(token, onTasksReceived);

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
          <h2 className="usersTable-link">
            <Link to="/usersTable">Users Table</Link>
          </h2>

          <h2 className="Deleted-tasks-link">
            {(role === "Owner" || role === "user") && (
              <Link to="/deletedTasks"> Deleted Tasks</Link>
            )}
          </h2>
        </div>
        <Photo src={userPhoto} />
        <h2> {firstName} </h2>
        <NotificationIcon count={notCheckedNotification.length} />
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
