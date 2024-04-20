import React, { useEffect, useState } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";

function MainDashBoard() {
  const allUsers = userStore((state) => state.allUsers);
  const dbinfo = userStore((state) => state.dbinfo);
  const updateDBinfo = userStore((state) => state.updateDBinfo);
  const token = userStore((state) => state.token);
  const dbinfoMedia = userStore((state) => state.dbinfoMedia);
  const updateDBinfoMedia = userStore((state) => state.updateDBinfoMedia);

  useEffect(() => {
    getTasksUsersInfo();
    getTasksUsersInfoDoubleValues();
  }, []);

  const getTasksUsersInfoDoubleValues = () => {
    fetch("http://localhost:8080/projecto5backend/rest/user/dashBoardInfoMediaTasksByUser", {
        method: "GET",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: token,
        },
    })
        .then(async function (response) {
            if (response.status === 403) {
                alert("User with this token is not found");
            } else if (response.status === 200) {
                const infoMedia = await response.json();
                updateDBinfoMedia(infoMedia);
            }
        })
        .catch((error) => {
            console.error("Error fetching tasks:", error);
        }
        );
    }


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
          alert("User with this token is not found");
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
          <h2>Users Info</h2>
        </div>
        <div className="board-container" id="users-container">
          <section className="board-column" id="users-column">
            <h2> Total users: {allUsers.length} </h2>
            <h2> Confirmed Users: {dbinfo[0]}</h2>
            <h2> Unconfirmed Users: {dbinfo[1]}</h2>
            <h2> Average number of tasks per user: {dbinfoMedia}</h2>
            <h2> To-do Tasks: {dbinfo[2]} </h2>
            <h2> Doing Tasks: {dbinfo[3]}</h2>
            <h2> Done Tasks: {dbinfo[4]}</h2>
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="tasks-header">
          <h2>Tasks Info</h2>
        </div>
        <div className="board-container" id="tasks-container">
          <section className="board-column" id="tasks-column"></section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="graphs-header">
          <h2>Graphs</h2>
        </div>
        <div className="board-container" id="graphs-container">
          <section className="board-column" id="graphs-column"></section>
        </div>
      </div>
    </div>
  );
}


export default MainDashBoard;
