import React, { useEffect } from "react";
import validateForm from "./FormValidate";

function Input({
  label = null,
  setCreds,
  creds,
  param,
  type,
  inputError,
  setInputError,
  setErrorFlag,
  style,
}) {
  useEffect(() => {
    setErrorFlag(false);
    const errList = validateForm(creds);
    for (const err in errList) {
      if (errList[err][0]) {
        setErrorFlag(true);
      }
    }
    setInputError(errList);
  }, []);
  return (
    <div className="field" id={param}>
      <div className="field-header">
        {label && (
          <div
            className={
              inputError[param][0] ? `field-label-error` : `field-label`
            }
          >
            {label}
          </div>
        )}
        <div className="error-text">
          {inputError[param][0] && `${inputError[param][1]}`}
        </div>
      </div>
      <input
        type={type}
        className={inputError[param][0] ? `form-input-error` : `form-input`}
        style={style}
        onChange={(e) => setCreds({ ...creds, [param]: e.target.value })}
      />
    </div>
  );
}

export default Input;
