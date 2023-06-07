import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./CreateTask.css";

function CreateTask() {
  const [task, setTask] = useState({ title: "", description: "" });

  const descriptionRef = useRef();
  function descFocus() {
    descriptionRef.current.focus();
  }
  useEffect(() => {
    descriptionRef.current.style.height = "auto";
    const scrollHeight = descriptionRef.current.scrollHeight;
    descriptionRef.current.style.height = scrollHeight + "px";
  }, [task.description]);
  return (
    <div id="create-task-container">
      <div id="create-task-header">create new task</div>
      <input
        id="create-task-title"
        autoComplete="off"
        maxLength={40}
        placeholder="enter a title (maximum 40 letters)"
        onChange={(e) => {
          setTask({ title: e.target.value() });
        }}
      />
      <textarea
        id="create-task-description"
        ref={descriptionRef}
        autoComplete="off"
        style={{ maxHeight: "20vh" }}
        placeholder="enter a description (maximum 200 letters)"
        maxLength={200}
        onChange={(e) => {
          setTask({ description: e.target.value() });
        }}
      ></textarea>
      <button
        id="create-task-button"
        onClick={(e) => {
          console.log(task);
        }}
      >
        <AddIcon />
      </button>
    </div>
  );
}

export default CreateTask;
