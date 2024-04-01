import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import InitialPage from "./Pages/InitialPage";
import HtmlDefault from "./Components/HtmlDefault";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Users from "./Pages/Users";
import DeletedTasks from "./Pages/DeletedTasks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index element={<App />} />
        <Route path="/htmlDefault" element={<HtmlDefault />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/goBackInitialPage" element={<InitialPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/htmlDefault " element={<HtmlDefault />} />
        <Route path="/users" element={<Users />} />
        <Route path="/deletedTasks" element={<DeletedTasks />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
