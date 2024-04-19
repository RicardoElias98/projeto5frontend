import React, { useState } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";



function MainDashBoard() {

    const [totalUsers, setTotalUsers] = useState();
    const allUsers = userStore((state) => state.allUsers);

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="users-header">
          <h2>Users Info</h2>
        </div>
        <div className="board-container" id="users-container">
          <section className="board-column" id="users-column">
            <h2> Total users: {allUsers.length} </h2>
            <h2> Users confimed: </h2>
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
