import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../features/task/tasksSlice.js";
import { showNavbar } from "../features/navbar/navbarSlice.js";
import "./Home.css";
import axios from "../axios.js";
import Task from "./Task.js";
import LoadingAnimation from "./LoadingAnimation.js";

function MyTasks() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(showNavbar(true));
    loadTasks();
    // eslint-disable-next-line
  }, []);
  const loadTasks = async () => {
    setLoading(true);
    await axios
      .get("/tasks/get-tasks", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        dispatch(get(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="tasks-container">
      {loading && (
        <div className="tasks-loading-overlay">
          <LoadingAnimation height="30vh" backgroundColor="#b9d2b1" />
        </div>
      )}
      {tasks.length > 0 ? (
        tasks.map((task, index) => {
          return <Task task={task} index={index} key={`task${index}`} />;
        })
      ) : (
        <div className="tasks-not-found">no tasks found</div>
      )}
    </div>
  );
}

export default MyTasks;
