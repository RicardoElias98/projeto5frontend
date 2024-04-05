import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from "../Components/LogoutButton";
import Photo from "../Components/Photo";
import EditProfileButton from "../Components/EditProfileButton";
import { userStore } from "../stores/UserStore";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserProfile() {
  const { username } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const token = userStore((state) => state.token);
  const allUsers = userStore((state) => state.allUsers);
  const userPicked = allUsers.find((user) => user.username === username);
  

  const navigate = useNavigate();

  console.log("username", username);
  console.log("userPicked", userPicked);

  const [data, setData] = useState({
    name: userPicked.name,
    email: userPicked.email,
    username: username,
    photo: userPicked.userPhoto,
    tasks: [],
    tasksTODO: [],
    tasksDOING: [],
    tasksDONE: [],
  });

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/usersTable`, { replace: true });
  };

  fetch(`http://localhost:8080/projecto5backend/rest/task/byUser/${username}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
  }).then(async function (response) {
    if (response.status === 403) {
      alert("User with this token is not found");
    } else if (response.status === 200) {
      const tasks = await response.json();
      console.log("****", tasks);
      const updatedData = {
        ...data,
        tasks: tasks,
        tasksTODO: [],
        tasksDOING: [],
        tasksDONE: [],
      };
      tasks.map((task) => {
        if (task.status === 10) {
          updatedData.tasksTODO.push(task);
        } else if (task.status === 20) {
          updatedData.tasksDOING.push(task);
        } else if (task.status === 30) {
          updatedData.tasksDONE.push(task);
        }
      });
      setData(updatedData);
      console.log("****", updatedData);
    }
  });

  const handleEdit = () => {
    console.log("Edit");
  };

  const userPhoto = userStore.getState().userPhoto;
  const firstName = userStore.getState().loginUser.name.split(" ")[0];
  const role = userStore.getState().loginUser.role;
  return (
    <div className="App" id="outer-container">
      <header className="header" id="header-app">
        <h1>Scrum Board</h1>
        <div className="links">
          <h2 className="tasks-link">
            <Link to="/htmlDefault "> Tasks </Link>
          </h2>
          <h2 className="Deleted-tasks-link">
            {(role === "Owner" || role === "user") && (
              <Link to="/deletedTasks"> Deleted Tasks</Link>
            )}
          </h2>
          <h2 className="users-link">
            <Link to="/users">Users</Link>
          </h2>
        </div>
        <Photo src={userPhoto} />
        <h2> {firstName} </h2>
        <EditProfileButton />
        <LogoutButton />
      </header>
      <div className="container">
        <main className="main" id="main-app">
          <div className="modal-button-container"></div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="custom-modal"
            overlayClassName="custom-overlay"
          >
            <div className="modal-content">
              <h2>User Profile</h2>
              <label>
                Username: <input type="text" value={data.username} readOnly />
              </label>
              <label>
                Name: <input type="text" value={data.name} readOnly />
              </label>
              <label>
                Email: <input type="email" value={data.email} readOnly />
              </label>
              <label>
                Photo: <input type="text" value={data.photo} readOnly />
              </label>
              <div className="circle-photo">
                <h3> Photo: </h3>
                <Photo src={data.photo} />
              </div>
              <h3>Total Tasks: {data.tasks.length}</h3>
              {console.log("++++", data.tasks)}
              <h3> Tasks To-do: {data.tasksTODO.length} </h3>
              <h3> Tasks Doing: {data.tasksDOING.length} </h3>
              <h3> Tasks Done: {data.tasksDONE.length} </h3>
              <button className="buttonModal" onClick={closeModal}>
                Close
              </button>
              <button className="buttonModal " onClick={handleEdit}>
                Edit
              </button>
            </div>
          </Modal>
        </main>
      </div>

      <footer className="footer" id="footer-app">
        {/* Conteúdo do footer */}
      </footer>
    </div>
  );
}

export default UserProfile;
