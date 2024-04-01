import React, { useState, useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import Task from "./Task";
import { tasksStore } from "../stores/TasksStore";
import { categoriesStore } from "../stores/CategoriesStore";

function MainSB() {
  const token = userStore.getState().token;
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const selectedCategory = categoriesStore((state) => state.selectedCategory);
  const selectedUser = userStore((state) => state.userSelected);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filteredTasksUser, setFilteredTasksUser] = useState([]);
  const [filteredTasksCategoryUser, setFilteredTasksCategoryUser] = useState(
    []
  );
  const tasks = tasksStore.getState().tasks;
  const updateTask = tasksStore((state) => state.updateTasks);
  const tasks2 = tasksStore((state) => JSON.stringify(state.tasks));
  const counter = userStore((state) => state.counter);

  const updateCounter = userStore((state) => state.updateCounter);
  
  useEffect(() => {
    console.log("Updating from filters");
   console.log(counter);
    if (!selectedCategory && !selectedUser) {
      displayTasksByStatus(10, setTodoTasks);
      displayTasksByStatus(20, setDoingTasks);
      displayTasksByStatus(30, setDoneTasks);
      console.log("1");
    } else if (selectedCategory && !selectedUser) {
      displayFilterCategory(selectedCategory);
      console.log("2");
    } else if (!selectedCategory && selectedUser) {
      displayFilterUser(selectedUser);
      console.log("3");
    } else if (selectedCategory && selectedUser) {
      displayFilterCategoryUser(selectedCategory, selectedUser);
    }
  }, [selectedCategory, selectedUser, counter]);

  useEffect(() => {
    const combinedTasks = [...todoTasks, ...doingTasks, ...doneTasks];
    setAllTasks(combinedTasks);
    updateTask(combinedTasks);
  }, [todoTasks, doingTasks, doneTasks]);

  useEffect(() => {
    const todo = filteredTasks.filter((task) => task.status === 10);
    const doing = filteredTasks.filter((task) => task.status === 20);
    const done = filteredTasks.filter((task) => task.status === 30);

    setTodoTasks(todo);
    setDoingTasks(doing);
    setDoneTasks(done);
  }, [filteredTasks]);

  useEffect(() => {
    const todo = filteredTasksUser.filter((task) => task.status === 10);
    const doing = filteredTasksUser.filter((task) => task.status === 20);
    const done = filteredTasksUser.filter((task) => task.status === 30);

    setTodoTasks(todo);
    setDoingTasks(doing);
    setDoneTasks(done);
  }, [filteredTasksUser]);

  useEffect(() => {
    const todo = filteredTasksCategoryUser.filter((task) => task.status === 10);
    const doing = filteredTasksCategoryUser.filter(
      (task) => task.status === 20
    );
    const done = filteredTasksCategoryUser.filter((task) => task.status === 30);
    console.log("ENTREI");

    setTodoTasks(todo);
    setDoingTasks(doing);
    setDoneTasks(done);
  }, [filteredTasksCategoryUser]);

  const displayTasksByStatus = (status, setTasks) => {
    fetch(`http://localhost:8080/project4backend/rest/task/status`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
        status: status,
      },
    })
      .then(async function (response) {
        if (response.status === 401) {
          alert("Unauthorized");
        } else if (response.status === 200) {
          const tasksData = await response.json();
          setTasks(tasksData);
         
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("data_id", taskId);
  };

  const handleDrop = (event, status) => {
    const taskId = event.dataTransfer.getData("data_id");

    updateStatus(status, taskId);
    updateCounter(counter + 1);
    console.log(counter);
    
    
  };

  const displayFilterCategoryUser = (category, username) => {
    console.log("Username: " + username);
    console.log("Category: " + category);
    fetch(
      `http://localhost:8080/project4backend/rest/task/byCategoryAndUser/${category}/${username}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    ).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const tasksData = await response.json();
        setAllTasks(tasksData);
        setFilteredTasksCategoryUser(tasksData);
      }
    });
  };

  const displayFilterCategory = (category) => {
    fetch(
      `http://localhost:8080/project4backend/rest/task/byCategory/${category}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    ).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const tasksData = await response.json();
        setAllTasks(tasksData);
        setFilteredTasks(tasksData);
      }
    });
  };

  const displayFilterUser = (username) => {
    fetch(
      `http://localhost:8080/project4backend/rest/task/byUser/${username}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    ).then(async function (response) {
      if (response.status === 401) {
        alert("Unauthorized");
      } else if (response.status === 200) {
        const tasksData = await response.json();
        setAllTasks(tasksData);
        setFilteredTasksUser(tasksData);
      }
    });
  };

  const updateStatus = (newStatus, idTask) => {
    console.log("newStatus: " + newStatus);
    console.log("idTask: " + idTask);
    fetch(
      `http://localhost:8080/project4backend/rest/task/changeStatus/${idTask}`,
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    )
      .then(async function (response) {
        if (response.status === 401) {
          console.log("Unauthorized");
        } else if (response.status === 400) {
          console.log("Failed. Status not changed");
        } else if (response.status === 200) {
          console.log("status changed to" + newStatus);
        }
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="to-do-header">
          <h2>To Do</h2>
        </div>
        <div
          className="board-container"
          id="todo-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 10)}
        >
          <section className="board-column" id="todo-column">
            {todoTasks
              .filter((task) => task.active === true)
              .map((task) => (
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
                  onDragStart={(event) => handleDragStart(event, task.id)}
                />
              ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="doing-header">
          <h2>Doing</h2>
        </div>
        <div
          className="board-container"
          id="doing-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 20)}
        >
          <section className="board-column" id="doing-column">
            {doingTasks
              .filter((task) => task.active === true)
              .map((task) => (
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
                  onDragStart={(event) => handleDragStart(event, task.id)}
                />
              ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="done-header">
          <h2>Done</h2>
        </div>
        <div
          className="board-container"
          id="done-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, 30)}
        >
          <section className="board-column" id="done-column">
            {doneTasks
              .filter((task) => task.active === true)
              .map((task) => (
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
                  onDragStart={(event) => handleDragStart(event, task.id)}
                />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainSB;
