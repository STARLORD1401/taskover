import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update, get } from "../features/task/tasksSlice.js";
import { showToast } from "../features/toast/toastSlice.js";
import { showNavbar } from "../features/navbar/navbarSlice.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Home.css";
import axios from "../axios.js";

function MyTasks() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(showNavbar(true));
    loadTasks();
    // eslint-disable-next-line
  }, []);
  const loadTasks = async () => {
    await axios
      .get("/tasks/get-tasks", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        dispatch(get(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTask = async (index, task) => {
    await axios
      .put(
        "/tasks/update-task",
        { task },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          update({
            index,
            task,
          })
        );
        dispatch(showToast([true, "success", `Task completed successfully!`]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="tasks-container">
      {tasks.map((task, index) => {
        return (
          <div className="task-container" key={`task${index}`}>
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
            <div className="task-button-bar">
              <button
                disabled={task.completed && true}
                className="task-button"
                onClick={(e) => {
                  task = { ...task, completed: true };
                  updateTask(index, task);
                }}
              >
                {task.completed ? (
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
  );
}

export default MyTasks;
