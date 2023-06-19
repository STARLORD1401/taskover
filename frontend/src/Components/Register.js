import React, { useState } from "react";
import axios from "../axios";
import Input from "./Input";
import { showToast } from "../features/toast/toastSlice.js";
import { useDispatch } from "react-redux";
import "./Form.css";
function Register({ setToggleForm }) {
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const credArray = [
    ["email", "email", "email"],
    ["username", "username", "text"],
    ["password", "password", "password"],
    ["confirmPassword", "confirm password", "password"],
  ];
  const [inputError, setInputError] = useState({
    username: [false, ""],
    password: [false, ""],
    email: [false, ""],
    confirmPassword: [false, ""],
  });
  const [errorFlag, setErrorFlag] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const register = async () => {
    setFormSubmitted(true);
    if (!errorFlag) {
      await axios
        .post("/users/register", {
          creds: {
            email: creds.email,
            username: creds.username,
            password: creds.password,
          },
        })
        .then((res) => {
          dispatch(
            showToast([true, "success", `User registered successfully!`])
          );
          setToggleForm(true);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("err: ", err.response.data);
          dispatch(showToast([true, "failed", err.response.data]));
        });
    }
  };
  return (
    <div id="container">
      <div id="header">
        register on<div id="brand">taskover</div>
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
                formSubmitted={formSubmitted}
              />
            );
          })}
      </div>
      <div id="footer">
        <button
          className="form-button"
          onClick={(e) => {
            register();
          }}
        >
          register
        </button>
        <button
          id="toggle-form"
          onClick={(e) => {
            setToggleForm(true);
          }}
        >
          already registered?
        </button>
      </div>
    </div>
  );
}

export default Register;
