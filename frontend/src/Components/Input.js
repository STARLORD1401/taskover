import React from "react";

function Input({ label, setCreds, creds, param, type, inputError }) {
  return (
    <div className="field" id={label}>
      <div className="field-header">
        <div
          className={inputError[param][0] ? `field-label-error` : `field-label`}
        >
          {label}
        </div>
        <div className="error-text">
          {inputError[param][0] && `${inputError[param][1]}`}
        </div>
      </div>
      <input
        type={type}
        className={inputError[param][0] ? `form-input-error` : `form-input`}
        onChange={(e) => setCreds({ ...creds, [param]: e.target.value })}
      />
    </div>
  );
}

export default Input;
