import React, { useEffect, useState } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import GraphUsersInTime from "./GraphUsersInTime";
import WebSocketDB from "./WebSocketDB";
import { useNavigate } from "react-router-dom";
import translations from "../Translation/translation";

function MainDashBoard() {
  const allUsers = userStore((state) => state.allUsers);
  const dbinfo = userStore((state) => state.dbinfo);
  const updateDBinfo = userStore((state) => state.updateDBinfo);
  const token = userStore((state) => state.token);
  const dbinfoMedia = userStore((state) => state.dbinfoMedia);
  const updateDBinfoMedia = userStore((state) => state.updateDBinfoMedia);
  const categoryDescList = userStore((state) => state.categoryDescList);
  const updateCategoryDescList = userStore(
    (state) => state.updateCategoryDescList
  );
  const updateAllUsers = userStore((state) => state.updateAllUsers);
  const language = userStore((state) => state.language);
  const { userTasksInfo, totalUsers, confirmedUsers,unconfirmedUsers,Averagenumberoftasksperuser, tasksTodo, tasksDoing, tasksDone,categoryInfo,graphs  } = translations[language];

  const navigate = useNavigate();

  useEffect(() => {
    console.log(dbinfo);
    getTasksUsersInfo();
    getTasksUsersInfoDoubleValues();
    getCategoryDescList();
    displayUsers();
  }, []);

  const onNewsReceived = (news) => {
    console.log("news", news);
    getTasksUsersInfo();
    getTasksUsersInfoDoubleValues();
    getCategoryDescList();
    displayUsers();
  };

  WebSocketDB(token, onNewsReceived);

  const displayUsers = () => {
    fetch("http://localhost:8080/projecto5backend/rest/user/all", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then(async function (response) {
        if (response.status === 403) {
          console.log("User with this token is not found");
        } else if (response.status === 200) {
          const usersData = await response.json();
          updateAllUsers(usersData);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const getCategoryDescList = () => {
    fetch("http://localhost:8080/projecto5backend/rest/task/listDesCcategory", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then(async function (response) {
        if (response.status === 403) {
          console.log("User with this token is not found");
        } else if (response.status === 200) {
          const categoryDescList = await response.json();
          updateCategoryDescList(categoryDescList);
          console.log(categoryDescList);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const getTasksUsersInfoDoubleValues = () => {
    fetch(
      "http://localhost:8080/projecto5backend/rest/user/dashBoardInfoMediaTasksByUser",
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then(async function (response) {
        if (response.status === 403) {
          console.log("User with this token is not found");
        } else if (response.status === 200) {
          const infoMedia = await response.json();
          updateDBinfoMedia(infoMedia);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const getTasksUsersInfo = () => {
    fetch("http://localhost:8080/projecto5backend/rest/user/dashBoardInfo", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then(async function (response) {
        if (response.status === 403) {
          console.log("User with this token is not found");
        } else if (response.status === 401) {
          alert("Token timer expired, please login again.");
          navigate("/goBackInitialPage", { replace: true });
        } else if (response.status === 200) {
          const info = await response.json();
          updateDBinfo(info);
          console.log(info);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="users-header">
          <h2>{userTasksInfo}</h2>
        </div>
        <div className="board-container" id="users-container">
          <section className="board-column" id="users-column">
            <h2>
              {" "}
              {totalUsers} {allUsers.length}{" "}
            </h2>
            <h2>
              {" "}
              {confirmedUsers} {dbinfo[0]}
            </h2>
            <h2>
              {" "}
              {unconfirmedUsers} {dbinfo[1]}
            </h2>
            <h2>
              {" "}
              {Averagenumberoftasksperuser} : {dbinfoMedia}
            </h2>
            <h2>
              {" "}
              {tasksTodo} {dbinfo[2]}{" "}
            </h2>
            <h2>
              {" "}
              {tasksDoing} {dbinfo[3]}
            </h2>
            <h2>
              {" "}
              {tasksDone} {dbinfo[4]}
            </h2>
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="tasks-header">
          <h2>{categoryInfo}</h2>
        </div>
        <div className="board-container" id="tasks-container">
          <section className="board-column" id="tasks-column">
            <section className="board-column" id="tasks-column">
              {categoryDescList.map((item, index) => (
                <h2 key={index}>
                  {item[0].name} : {item[1]}
                </h2>
              ))}
            </section>
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="graphs-header">
          <h2>{graphs}</h2>
        </div>
        <div className="board-container" id="graphs-container">
          <section className="board-column" id="graphs-column">
            <GraphUsersInTime />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainDashBoard;
