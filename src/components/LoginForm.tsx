import React, { ChangeEvent, useState } from "react";
import { utilityValidateEmail } from "../utility";

const LoginForm = ({ onClickLogin }: { onClickLogin: any }): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const isEmailValid = utilityValidateEmail(inputValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="rowL">
        <input
          id="input-login"
          className="form-control"
          placeholder="Insert Email"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          id="button-login"
          className="btn"
          disabled={!isEmailValid}
          onClick={() => onClickLogin(inputValue)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
