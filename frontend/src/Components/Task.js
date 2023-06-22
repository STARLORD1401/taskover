import React, { useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditTask from "./EditTask";
import LoadingAnimation from "./LoadingAnimation";
import axios from "../axios.js";
import { showToast } from "../features/toast/toastSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { update, deleteTaskReducer } from "../features/task/tasksSlice.js";

function Task({ task, index }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [editTask, setEditTask] = useState(false);
  const updateTask = async (index, task, msg) => {
    setLoading(true);
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
        setLoading(false);
        dispatch(showToast([true, "success", `Task ${msg} successfully!`]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTask = async (index, task) => {
    setLoading(true);
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
        setLoading(false);
        dispatch(showToast([true, "success", `Task deleted successfully!`]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return !editTask ? (
    <div className="task-container">
      {loading && (
        <div className="task-loading-overlay">
          <LoadingAnimation height="5vh" backgroundColor="#b9d2b1d9" />
        </div>
      )}
      <div className="task-title">
        {task.title.slice(0, 10)}
        {task.title.length > 10 && "..."}
      </div>
      <div className="task-description">
        {task.description.slice(0, 40)}
        {task.description.length > 40 && "..."}
      </div>
      <div className="task-button-bar">
        <button
          disabled={task.completed && true}
          className="task-button"
          onClick={(e) => {
            task = { ...task, completed: true };
            updateTask(index, task, "completed");
          }}
        >
          {task.completed ? (
            <CheckCircleIcon style={{ fontSize: "4vh" }} />
          ) : (
            <DoneOutlineIcon style={{ fontSize: "3vh" }} />
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
        {!task.completed && (
          <button
            className="task-button"
            onClick={(e) => {
              setEditTask(true);
            }}
          >
            <EditOutlinedIcon style={{ fontSize: "3vh" }} />
          </button>
        )}
      </div>
    </div>
  ) : (
    <EditTask
      editTask={task}
      updateTask={updateTask}
      index={index}
      setEditTask={setEditTask}
    />
  );
}

export default Task;
