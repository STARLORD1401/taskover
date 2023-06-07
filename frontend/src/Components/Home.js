import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Home.css";
import CreateTask from "./CreateTask";

function Home({ showNavbar, setShowNavbar }) {
  const tasks = [
    { title: "task 1", description: "task 1 desc", completed: false },
    { title: "task 2", description: "task 2 desc", completed: false },
    { title: "task 3", description: "task 3 desc", completed: false },
    { title: "task 4", description: "task 4 desc", completed: false },
    { title: "task 5", description: "task 5 desc", completed: false },
  ];
  const [taskCompleted, setTaskCompleted] = useState({});
  const [activeTab, setActiveTab] = useState({
    myTasks: true,
    groupTasks: false,
    createTask: false,
  });
  useEffect(() => {
    setShowNavbar(true);
  });
  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab ${activeTab.myTasks ? `active-tab` : `inactive-tab`}`}
          onClick={(e) => {
            setActiveTab({
              ...activeTab,
              myTasks: true,
              groupTasks: false,
              createTask: false,
            });
          }}
        >
          <PersonIcon style={{ marginRight: "0.5vw" }} />
          my tasks
        </button>
        <button
          className={`tab ${
            activeTab.groupTasks ? `active-tab` : `inactive-tab`
          }`}
          onClick={(e) => {
            setActiveTab({
              ...activeTab,
              myTasks: false,
              groupTasks: true,
              createTask: false,
            });
          }}
        >
          <GroupIcon style={{ marginRight: "0.5vw" }} />
          group tasks
        </button>
        <button
          className={`tab ${
            activeTab.createTask ? `active-tab` : `inactive-tab`
          }`}
          onClick={(e) => {
            setActiveTab({
              ...activeTab,
              myTasks: false,
              groupTasks: false,
              createTask: true,
            });
          }}
        >
          <AddIcon style={{ marginRight: "0.5vw" }} /> create new task
        </button>
      </div>
      {activeTab.createTask && <CreateTask />}
      <div className="secondary-container">
        {tasks.map((task, index) => {
          return (
            <div className="task-container" key={`task${index}`}>
              <div className="task-title">{task.title}</div>
              <div className="task-description">{task.description}</div>
              <div className="task-button-bar">
                <button
                  className="task-button"
                  onClick={(e) => {
                    setTaskCompleted({
                      ...taskCompleted,
                      [index]: !taskCompleted[index],
                    });
                  }}
                >
                  {taskCompleted[index] ? (
                    <CheckCircleIcon style={{ fontSize: "4vh" }} />
                  ) : (
                    <CheckCircleOutlineIcon style={{ fontSize: "4vh" }} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
