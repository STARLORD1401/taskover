import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import "./Form.css";
import axios from "../axios.js";
import { useDispatch } from "react-redux";
import { logIn } from "../features/user/userSlice.js";
import { showToast } from "../features/toast/toastSlice.js";
import { showNavbar } from "../features/navbar/navbarSlice.js";

function Login({ setToggleForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorFlag, setErrorFlag] = useState(false);
  const [creds, setCreds] = useState({ username: "", password: "" });

  let credArray = [
    ["username", "username", "text"],
    ["password", "password", "password"],
  ];

  const [inputError, setInputError] = useState({
    username: [false, ""],
    password: [false, ""],
  });
  useEffect(() => {
    dispatch(showNavbar(false));
  }, [creds]);
  const login = async () => {
    if (!errorFlag) {
      await axios
        .post("/users/login", { creds })
        .then((res) => {
          dispatch(logIn(res.data));
          dispatch(
            showToast([
              true,
              "success",
              `${res.data.user.username} logged in successfully!`,
            ])
          );
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        })
        .catch((err) => {
          dispatch(showToast([true, "failed", err.response.data]));
        });
    }
  };
  return (
    <div id="container">
      <div id="header">
        log in to <div id="brand">taskover</div>
      </div>
      <div id="form">
        {inputError &&
          credArray.map((cred, index) => {
            return (
              <Input
                key={index}
                param={cred[0]}
                label={cred[1]}
                type={cred[2]}
                setCreds={setCreds}
                creds={creds}
                setInputError={setInputError}
                inputError={inputError}
                setErrorFlag={setErrorFlag}
                style={{ width: "28vw" }}
              />
            );
          })}
      </div>
      <div id="footer">
        <button
          className="form-button"
          onClick={(e) => {
            login();
          }}
        >
          login
        </button>
        <button
          id="toggle-form"
          onClick={(e) => {
            setToggleForm(false);
          }}
        >
          first time here?
        </button>
      </div>
    </div>
  );
}

export default Login;
