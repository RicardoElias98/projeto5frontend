import React from "react";
import Sidebar from "../components/navbar/Sidebar";
import "../index.css";
import { userStore } from "../stores/UserStore";

function Home() {
  const username = userStore((state) => state.username);
  return (
    <div className="Home" id="home-outer-container">
      <Sidebar
        pageWrapId={"home-page-wrap"}
        outerContainerId={"home-outer-container"}
      />
      <div className="page-wrap" id="home-page-wrap">
        <h1>Home </h1>
        <p> Welcome {username}</p>
      </div>
    </div>
  );
}

export default Home;
