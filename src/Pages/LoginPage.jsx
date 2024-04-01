import React from "react";
import "../general.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userStore } from "../stores/UserStore";

function LoginPage() {
  const navigate = useNavigate();
  const updateToken = userStore((state) => state.updateToken);
  const updateUserPhoto = userStore((state) => state.updateUserPhoto);
  const updateLoginUser = userStore((state) => state.updateLoginUser);
  const updateFirstName = userStore((state) => state.updateFirstName);
  const loginUser = userStore((state) => state.loginUser);

  //Dados do formulário
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const goBack = () => {
    navigate("/goBackInitialPage", { replace: true });
  };

  const loginSucess = () => {
    navigate("/htmlDefault", { replace: true });
  };

  const findUser = (username, token) => {
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
          alert("Username not found");
        } else if (response.status === 200) {
          const user = await response.json();
          updateLoginUser(user);
          console.log("user", user);
          console.log("loginUser", loginUser)
          updateFirstName(user.name.split(" ")[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/project4backend/rest/user/login", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        username: formData.username,
        password: formData.password,
      },
    }).then(async function (response) {
      if (response.status === 403) {
        alert("User is not active");
      } else if (response.status === 404) {
        alert("Username or password are incorrect");
      } else if (response.status === 200) {
        const token = await response.text();
        updateToken(token);
        findUser(formData.username, token);
        fetch("http://localhost:8080/project4backend/rest/user/photo", {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: token,
          },
        })
          .then(async function (response) {
            if (response.status === 401) {
              alert("Unauthorized");
            } else if (response.status === 200) {
              const userPhoto = await response.text();
              updateUserPhoto(userPhoto);
              console.log("loginUser", loginUser);
              loginSucess();
            }
          })
          .catch((error) => {
            console.error("Error fetching user photo:", error);
          });
      }
    });
  };

  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="labels-containers">
              <label htmlFor="username"> Username: </label>
              <input
                type="text"
                name="username"
                defaultValue=""
                onChange={handleChange}
                placeholder="Your username"
              />

              <label>
                <label htmlFor="Password"> Password: </label>
                <input
                  type="password"
                  name="password"
                  defaultValue=""
                  onChange={handleChange}
                  placeholder="Your Password"
                />
              </label>
            </div>
          </div>
          <div className="button-container">
            <input className="button" type="submit" value="Send" />
            <button className="button" onClick={goBack}>
              {" "}
              Back{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
