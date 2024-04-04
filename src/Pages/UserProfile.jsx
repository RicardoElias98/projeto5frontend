import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from "../Components/LogoutButton";
import Photo from "../Components/Photo";
import EditProfileButton from "../Components/EditProfileButton";
import { userStore } from "../stores/UserStore";
import Modal from "react-modal";
import { useState } from "react";

function UserProfile() {
  const { username } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const profileInfo = userStore((state) => state.profileInfo);
  console.log("profile Info", profileInfo);

  const closeModal = () => {
    setModalIsOpen(false);
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
              <h2>Perfil do Utilizador</h2>
              <h3>Username: {profileInfo.username}</h3>
              <h3>Name: {profileInfo.name}</h3>
              <h3>Email: {profileInfo.email}</h3>
              <div className="circle-photo">
                <h3> Photo: </h3>
                <Photo src={profileInfo.photo} />
              </div>
              <button className="buttonModal" onClick={closeModal}>
                Close Modal
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
