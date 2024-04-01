import React from "react";
import { tasksStore } from "../stores/TasksStore";
import Task from "./Task";
import { userStore } from "../stores/UserStore";
import { useEffect } from "react";

function MainDeletedTasks() {
  const token = userStore.getState().token;
  //const tasks = tasksStore.getState().tasks;
  const tasks = tasksStore((state) => state.tasks);
  const updateTasks = tasksStore((state) => state.updateTasks);
  const tasks2 = tasksStore((state) => JSON.stringify(state.tasks));
  //const tasks2 = tasksStore((state) => JSON.stringify(state.tasks));
  const deletedTasks = tasks.filter((task) => task.active === false);
  const role = userStore.getState().loginUser.role;

  const handleDragStart = (event, username) => {
    event.dataTransfer.setData("user_id", username);
  };

  const handleDropRestore = (event) => {
    const taskId = event.dataTransfer.getData("data_id");
    console.log(taskId);
    fetch(`http://localhost:8080/project4backend/rest/task/restore/${taskId}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then(async function (response) {
        if (response.status === 400) {
          alert("Task with this token is not found");
        } else if (response.status === 200) {
          const task = (tasks.find((task) => task.id === taskId).active = true);
          updateTasks(tasks);

          console.log(task);
          console.log(tasks);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleDropDelete = (event) => {
    const taskId = event.dataTransfer.getData("data_id");
    console.log(taskId);
    fetch(`http://localhost:8080/project4backend/rest/task/delete/${taskId}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then(async function (response) {
        if (response.status === 400) {
          alert("Task with this token is not found");
        } else if (response.status === 200) {
          const task = (tasks.find((task) => task.id === taskId).active = true);
          updateTasks(tasks);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };
  return (
    <div className="board">
  <div className="total-column">
    <div className="column-header" id="deleted-header">
      <h2>Deleted</h2>
    </div>
    <div className="board-container" id="deleted-container">
      <section className="board-column" id="deleted-column">
        {deletedTasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            priority={task.priority}
            id={task.id}
            description={task.description}
            category={task.category}
            startDate={task.startDate}
            endDate={task.endDate}
            status={task.status}
            onDragStart={role === "Owner" ? (event) => handleDragStart(event, task.id) : null}
          />
        ))}
      </section>
    </div>
  </div>
  {role === "Owner" && (
    <>
      <div className="total-column">
        <div className="column-header" id="restore-header">
          <h2> Restore </h2>
        </div>
        <div
          className="board-container"
          id="restore-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDropRestore(event)}
        >
          <section className="board-column" id="deletePerm-column"></section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="deletePerm-header">
          <h2> PERMANENTLY DELETE </h2>
        </div>
        <div
          className="board-container"
          id="deletePerm-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDropDelete(event)}
        >
          <section className="board-column" id="restore-column"></section>
        </div>
      </div>
    </>
  )}
</div>

  );
}

export default MainDeletedTasks;
