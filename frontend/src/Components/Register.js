import React, { useEffect, useState } from "react";
import axios from "../axios";
import Input from "./Input";
import validateForm from "./FormValidate";
import "./Form.css";
function Register({ toggleForm, setToggleForm, setToast }) {
  const [creds, setCreds] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
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
  useEffect(() => {
    if (formSubmitted) {
      const errList = validateForm(creds);
      setInputError(errList);
    }
  }, [creds, formSubmitted]);
  const register = async () => {
    setFormSubmitted(true);
    const errList = validateForm(creds);
    let errorFlag = false;
    for (const err in errList) {
      console.log(errList[err]);
      if (errList[err][0]) {
        errorFlag = true;
      }
    }
    console.log(errorFlag);
    setInputError(errList);
    if (!errorFlag && creds.password === creds.confirmPassword) {
      console.log(creds);
      await axios
        .post("/users/register", { creds })
        .then((res) => {
          setToast([
            true,
            "success",
            `${res.data.username} registered in successfully!`,
          ]);
          setToggleForm(true);
        })
        .catch((err) => {
          console.log("err: ", err.response.data);
          setToast([true, "failed", err.response.data]);
        });
    } else {
      setToast([true, "failed", "Passwords do not match"]);
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
                inputError={inputError}
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
            setToggleForm(!toggleForm);
          }}
        >
          already registered?
        </button>
      </div>
    </div>
  );
}

export default Register;
