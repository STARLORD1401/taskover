import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import "./Home.css";
import CreateTask from "./CreateTask";

function Home({ showNavbar, setShowNavbar }) {
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
        <div className="task-container"></div>
        <div className="task-container"></div>
        <div className="task-container"></div>
        <div className="task-container"></div>
        <div className="task-container"></div>
        <div className="task-container"></div>
        <div className="task-container"></div>
      </div>
    </div>
  );
}

export default Home;
