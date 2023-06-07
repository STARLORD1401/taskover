import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import "./Form.css";
import axios from "../axios.js";
import validateForm from "./FormValidate";

function Login({ toggleForm, setToggleForm, setToast }) {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  let credArray = [
    ["username", "username", "text"],
    ["password", "password", "password"],
  ];

  const [inputError, setInputError] = useState({
    username: [false, ""],
    password: [false, ""],
  });
  useEffect(() => {
    if (formSubmitted) {
      const errList = validateForm(creds);
      setInputError(errList);
    }
  }, [creds, formSubmitted]);
  const login = async () => {
    setFormSubmitted(true);
    const errList = validateForm(creds);
    let errorFlag = false;
    for (const err in errList) {
      if (errList[err][0]) {
        errorFlag = true;
      }
    }
    setInputError(errList);
    if (!errorFlag) {
      await axios
        .post("/users/login", { creds })
        .then((res) => {
          setToast([
            true,
            "success",
            `${res.data.username} logged in successfully!`,
          ]);
          navigate("/");
        })
        .catch((err) => {
          console.log("err: ", err.response.data);
          setToast([true, "failed", err.response.data]);
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
                inputError={inputError}
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
            setToggleForm(!toggleForm);
          }}
        >
          first time here?
        </button>
      </div>
    </div>
  );
}

export default Login;
