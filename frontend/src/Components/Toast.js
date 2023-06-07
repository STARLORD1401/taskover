import React from "react";
import "./Toast.css";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
function Toast({ setToast, toast }) {
  setTimeout(setToast, 6000, false);
  return (
    <div id="toast-container" className={`toast-${toast[1]}`}>
      <button
        className="toast-close"
        onClick={(e) => {
          clearTimeout();
          setToast(false);
        }}
      >
        <CloseIcon />
      </button>
      <div className="toast-icon">
        {toast[1] === "failed" && <CloseIcon />}
        {toast[1] === "success" && <DoneOutlineIcon />}
      </div>
      <div className="toast-title">{toast[2]}</div>
    </div>
  );
}

export default Toast;
