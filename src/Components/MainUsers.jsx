import React, { useState, useEffect } from "react";
import "../general.css";
import { userStore } from "../stores/UserStore";
import User from "./User";

function MainUsers() {
  const token = userStore.getState().token;
  const [allUsers, setAllUsers] = useState([]);
  const updateAllUsers = userStore((state) => state.updateAllUsers);
  const fullUsers = userStore((state) => state.allUsers);
  
  

  useEffect(() => {
    displayUsers();
  }, [fullUsers]);

  const displayUsers = () => {
    fetch("http://localhost:8080/project4backend/rest/user/all", {
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
          const usersData = await response.json();
          console.log(usersData);
          setAllUsers(usersData);
          updateAllUsers(usersData);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const updateRole = (userData) => {
    fetch("http://localhost:8080/project4backend/rest/user/update", {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(userData),
    })
      .then(async function (response) {
        if (response.status === 400) {
          alert("User with this token is not found");
        } else if (response.status === 200) {
          console.log("Role updated");
          displayUsers();
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  const handleDragStart = (event, username) => {
    event.dataTransfer.setData("user_id", username);
  };

  const handleDrop = (event, role) => {
    const username = event.dataTransfer.getData("user_id");
    console.log(username);
    fetch(`http://localhost:8080/project4backend/rest/user/${username}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then(async function (response) {
        if (response.status === 404) {
          alert("User not found");
          console.log(username);
        } else if (response.status === 200) {
          console.log("User found");
          const userData = await response.json();
          userData.role = role;
          updateRole(userData);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <div className="board">
      <div className="total-column">
        <div className="column-header" id="developer-header">
          <h2>Developer</h2>
        </div>
        <div
          className="board-container"
          id="developer-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, "developer")}
        >
          <section className="board-column" id="developer-column">
            {allUsers
              .filter((user) => user.role === "developer")
              .map((user) => (
                <User
                  key={user.username}
                  id={user.id}
                  username={user.username}
                  name={user.name}
                  email={user.email}
                  contactNumber={user.contactNumber}
                  photo={user.userPhoto}
                  role={user.role}
                  onDragStart={(event) => handleDragStart(event, user.username)} 
                />
              ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="scrumMaster-header">
          <h2>Scrum Master</h2>
        </div>
        <div
          className="board-container"
          id="scrumMaster-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, "user")}
        >
          <section className="board-column" id="scrumMaster-column">
            {allUsers
              .filter((user) => user.role === "user")
              .map((user) => (
                <User
                  key={user.username}
                  id={user.id}
                  username={user.username}
                  name={user.name}
                  email={user.email}
                  contactNumber={user.contactNumber}
                  photo={user.userPhoto}
                  role={user.role}
                  onDragStart={(event) => handleDragStart(event, user.id)}
                />
              ))}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="productOwner-header">
          <h2>Product Owner</h2>
        </div>
        <div
          className="board-container"
          id="productOwner-container"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, "Owner")}
        >
          <section className="board-column" id="productOwner-column">
            {allUsers
              .filter((user) => user.role === "Owner")
              .map((user) => (
                <User
                  key={user.username}
                  id={user.id}
                  username={user.username}
                  name={user.name}
                  email={user.email}
                  contactNumber={user.contactNumber}
                  photo={user.userPhoto}
                  role={user.role}
                  onDragStart={(event) => handleDragStart(event, user.id)}
                />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainUsers;
