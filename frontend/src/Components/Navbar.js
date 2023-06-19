import React, { useEffect } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logOut } from "../features/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {}, []);
  return (
    <div id="navbar">
      <button
        id="navbar-button"
        onClick={(e) => {
          dispatch(logOut());
          navigate("/auth");
        }}
      >
        {user?.user.username}
        <ExitToAppIcon style={{ marginLeft: "0.5vw" }} />
      </button>
      <div id="navbar-brand">taskover</div>
    </div>
  );
}

export default Navbar;
