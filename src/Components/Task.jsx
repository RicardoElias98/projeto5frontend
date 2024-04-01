import React, { useState } from "react";
import "../general.css";
import TaskInfo from "./TaskInfo";
import { userStore } from "../stores/UserStore";
import { useEffect } from "react";

function Task({ title, priority, id, description, category, startDate, endDate, status}) {
  let priorityClass = "";
  const rolE = userStore.getState().loginUser.role;
  const token = userStore.getState().token;
  const [creator, setCreator] = useState(""); 

  useEffect(() => {
    creatorTask(id);
    
  }, []); 
  
  

  if (priority === 300) {
    priorityClass = "high-priority";
  } else if (priority === 200) {
    priorityClass = "medium-priority";
  } else if (priority === 100) {
    priorityClass = "low-priority";
  }
  const [isTaskInfoModalOpen, setTaskInfoModalOpen] = useState(false);

  const handleCloseTaskInfoModal = () => {
    setTaskInfoModalOpen(false);
  };

  const handleOpenCategoryModal = () => {
    setTaskInfoModalOpen(true);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("data_id", id);
  };

  const creatorTask = (id) => {
    fetch(`http://localhost:8080/project4backend/rest/task/creator/${id}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: token,

      },
    })
    .then(async function (response) {
      if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setCreator(data);
      }
    })};

  return (
    <>
      <div
        className={`task ${priorityClass}`}
        draggable="true"
        onDragStart={handleDragStart}
        onDoubleClick={handleOpenCategoryModal}
      >
        {title} {creator}
      </div>
      <TaskInfo
        isOpen={isTaskInfoModalOpen}
        onClose={handleCloseTaskInfoModal}
        taskName={title}
        taskDescription={description}
        priority={priority} 
        category= {category} 
        startDate = {startDate} 
        endDate = {endDate}
        taskId={id}
        status={status}

      />
    </>
  );
} 

export default Task;
