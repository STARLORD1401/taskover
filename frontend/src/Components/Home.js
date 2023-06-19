import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTask from "./CreateTask";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import "./Home.css";
import MyTasks from "./MyTasks";
import { groupTasksTab, myTasksTab } from "../features/tab/tabSlice";

function Home({}) {
  const { tab } = useSelector((state) => state.tab);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab ${tab?.myTasks ? `active-tab` : `inactive-tab`}`}
          onClick={(e) => {
            dispatch(myTasksTab());
          }}
        >
          <PersonIcon style={{ marginRight: "0.5vw" }} />
          my tasks
        </button>
        <button
          className={`tab ${tab?.groupTasks ? `active-tab` : `inactive-tab`}`}
          onClick={(e) => {
            dispatch(groupTasksTab());
          }}
        >
          <GroupIcon style={{ marginRight: "0.5vw" }} />
          group tasks
        </button>
      </div>
      <div className="secondary-container">
        {tab.myTasks && <MyTasks />}
        <CreateTask />
      </div>
    </div>
  );
}

export default Home;
