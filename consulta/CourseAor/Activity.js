import React from "react";
import Sidebar from "../components/navbar/Sidebar";
import { useState, useEffect } from "react";

function Activity() {
  const [activities, setActivities] = useState([]);
  const [inputs, setInputs] = useState({});
  const [newactivity, setNewActivities] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/my_activities_backend/rest/activity/add", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: "-q-6yZTFMd1tYCZYUd7PagfyYTQjGaQU",
      },
      body: JSON.stringify(inputs),
    }).then(function (response) {
      if (response.status === 200) {
        setNewActivities(inputs);
      } else {
        alert("something went wrong ");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/my_activities_backend/rest/activity/all",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              token: "-q-6yZTFMd1tYCZYUd7PagfyYTQjGaQU",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally handle error state or display an error message
      }
    };
    fetchData();
  }, [newactivity]); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <table className="tables" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.title}</td>
              <td>{activity.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Add a New Activity</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Activity Title:
            <input
              type="text"
              name="title"
              defaultValue=""
              onChange={handleChange}
            />
          </label>
          <label>
            Activity Description:
            <input
              type="text"
              name="description"
              defaultValue=""
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export default Activity;
