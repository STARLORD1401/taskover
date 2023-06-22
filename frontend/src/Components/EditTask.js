import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LoadingAnimation from "./LoadingAnimation.js";
import { useSelector } from "react-redux";
import axios from "../axios.js";
import "./CreateTask.css";
function EditTask({ updateTask, editTask, index, setEditTask }) {
  const { user } = useSelector((state) => state.user);
  const { tab } = useSelector((state) => state.tab);
  const { loading } = useSelector((state) => state.loading);
  const [task, setTask] = useState(editTask);
  const [groupMembers, setGroupMembers] = useState([]);
  const [username, setUsername] = useState("");
  const descriptionRef = useRef();
  useEffect(() => {
    if (user?.token) {
      descriptionRef.current.style.height = "auto";
      const scrollHeight = descriptionRef.current.scrollHeight;
      descriptionRef.current.style.height = scrollHeight + "px";
    }
    // eslint-disable-next-line
  }, [task, groupMembers]);

  const addGroupMember = async () => {
    console.log("username: ", username);
    await axios
      .post("/users/check-user", { username })
      .then((res) => {
        setGroupMembers([...groupMembers, username]);
        setUsername("");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <div id="create-task-container">
      <div id="create-task-header">edit task</div>
      <input
        id="create-task-title"
        autoComplete="off"
        maxLength={40}
        placeholder="enter a title (maximum 40 letters)"
        value={task.title}
        onChange={(e) => {
          setTask({ ...task, title: e.target.value });
        }}
      ></input>
      <textarea
        id="create-task-description"
        ref={descriptionRef}
        value={task.description}
        autoComplete="off"
        style={{ maxHeight: "20vh" }}
        placeholder="enter a description (maximum 150 letters)"
        maxLength={150}
        onChange={(e) => {
          setTask({ ...task, description: e.target.value });
        }}
      ></textarea>
      {tab.groupTasks && (
        <div id="create-group-task">
          <div id="add-group-member-header">add group members</div>
          <div id="add-group-member">
            <input
              id="add-group-member-input"
              autoComplete="off"
              value={username}
              maxLength={20}
              placeholder="enter a username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button
              id="add-group-member-button"
              disabled={groupMembers.length >= 3 ? true : false}
              onClick={(e) => {
                addGroupMember();
              }}
            >
              <AddIcon />
            </button>
          </div>
          <div id="group-members-container">
            {groupMembers?.map((groupMember, index) => {
              return (
                <div
                  className="group-member-chip"
                  key={`group-member-${index}`}
                >
                  {groupMember}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <button
        id="create-task-button"
        disabled={
          task.title?.length <= 0 &&
          task.description?.length <= 0 &&
          loading &&
          true
        }
        onClick={(e) => {
          tab.myTasks &&
            updateTask(index, task, "edited").then(setEditTask(false));
        }}
      >
        {loading ? (
          <LoadingAnimation height="3vh" backgroundColor="#727482" />
        ) : (
          <EditIcon />
        )}
      </button>
    </div>
  );
}

export default EditTask;
