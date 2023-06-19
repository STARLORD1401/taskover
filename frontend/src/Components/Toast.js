import React, { useEffect } from "react";
import "./Toast.css";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../features/toast/toastSlice.js";

import CloseIcon from "@mui/icons-material/Close";
function Toast() {
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.toast);
  useEffect(() => {
    setTimeout(() => {
      dispatch(showToast([false, ""]));
    }, 5000);
    // eslint-disable-next-line
  }, [toast]);
  return (
    <div id="toast-container" className={`toast-${toast[1]}`}>
      <button
        className="toast-close"
        onClick={(e) => {
          clearTimeout();
          dispatch(showToast([false, ""]));
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
