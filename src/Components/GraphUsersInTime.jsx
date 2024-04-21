import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import Chart from "chart.js";

function GraphUsersInTime() {
  const token = userStore((state) => state.token);
  const [activeUserByDate, setActiveUserByDate] = useState([]);

  useEffect(() => {
    getUsersInfo();
  }, []);

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
          alert("User with this token is not found");
        } else if (response.status === 200) {
          const activeUsers = await response.json();
          setActiveUserByDate(activeUsers);
          console.log(activeUsers);
          drawChart(activeUsers);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const drawChart = (data) => {
    const labels = data.map((entry) => Object.keys(entry)[0]);
    const values = data.map((entry) => Object.values(entry)[0]);

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of registered users (confirmed or not)",
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
              text: "Número de Usuários Ativos",
            },
          },
        },
      },
    });
  };

  return (
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

export default GraphUsersInTime;
