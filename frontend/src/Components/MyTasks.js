import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update, get, deleteTaskReducer } from "../features/task/tasksSlice.js";
import { showToast } from "../features/toast/toastSlice.js";
import { showNavbar } from "../features/navbar/navbarSlice.js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
        console.log(res.data);
        dispatch(
          update({
            index,
            task: res.data,
          })
        );
        dispatch(showToast([true, "success", `Task completed successfully!`]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTask = async (index, task) => {
    await axios
      .put(
        "/tasks/delete-task",
        { task },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          deleteTaskReducer({
            index,
            task,
          })
        );
        dispatch(showToast([true, "success", `Task deleted successfully!`]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="tasks-container">
      {tasks.length > 0 ? (
        tasks.map((task, index) => {
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
                <button
                  className="task-button"
                  onClick={(e) => {
                    deleteTask(index, task);
                  }}
                >
                  <DeleteOutlineIcon style={{ fontSize: "3vh" }} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="tasks-not-found">no tasks found</div>
      )}
    </div>
  );
}

export default MyTasks;
