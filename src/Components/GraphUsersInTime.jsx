import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import Chart from "chart.js";
import { useNavigate } from "react-router-dom";
import translations from "../Translation/translation";

function GraphUsersInTime() {
  const token = userStore((state) => state.token);
  const [activeUserByDate, setActiveUserByDate] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const navigate = useNavigate();
  const language = userStore((state) => state.language);
  const {
    Numberofregisteredusersconfirmedornot,
    numberofActiveUsers,
    Numberoftasksdone,
  } = translations[language];

  useEffect(() => {
    getUsersInfo();
    getTasksInfo();
  }, []);

  const getTasksInfo = () => {
    fetch("http://localhost:8080/projecto5backend/rest/task/taskDoneByDate", {
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
          const tasks = await response.json();
          setDoneTasks(tasks);
          console.log("tasks", tasks);
          drawTasksChart(tasks);
        } else if (response.status === 403) {
          alert("Token timer expired, please login again.");
          navigate("/goBackInitialPage", { replace: true });
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const getUsersInfo = () => {
    fetch("http://localhost:8080/projecto5backend/rest/user/allActiveUsers", {
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
          const activeUsers = await response.json();
          setActiveUserByDate(activeUsers);
          console.log(activeUsers);
          drawUsersChart(activeUsers);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const drawUsersChart = (data) => {
    const labels = data.map((entry) => Object.keys(entry)[0]);
    const values = data.map((entry) => Object.values(entry)[0]);

    const ctx = document.getElementById("usersChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label:  Numberofregisteredusersconfirmedornot ,
            data: values,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "DD/MM/YYYY",
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text:  numberofActiveUsers ,
            },
          },
        },
      },
    });
  };

  const drawTasksChart = (data) => {
    const labels = data.map((entry) => Object.keys(entry)[0]);
    const values = data.map((entry) => Object.values(entry)[0]);

    const ctx = document.getElementById("tasksChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label:  Numberoftasksdone ,
            data: values,
            borderColor: "rgb(192, 75, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "DD/MM/YYYY",
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text:  Numberoftasksdone ,
            },
          },
        },
      },
    });
  };

  return (
    <div>
      <div>
        <canvas id="usersChart" width="400" height="400"></canvas>
      </div>
      <div>
        <canvas id="tasksChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}

export default GraphUsersInTime;
