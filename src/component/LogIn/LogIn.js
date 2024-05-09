import React, { useState } from "react";
import "./LogIn.css";
import { useDispatch } from "react-redux";
import { userLogin, userSignup } from "../../Redux/Actions/UserActions.js";
const LogIn = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const [signup, setSignup] = useState(false);
  const changeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const logInDataSubmit = (e) => {
    e.preventDefault();
    if (signup) {
      dispatch(userSignup(loginData));
    } else {
      dispatch(userLogin(loginData));
    }
  };
  return (
    <div className="loginForm">
      <div className="loginFrom-inside">
        {signup ? <h3>Registration</h3> : <h3>Log In</h3>}
        {signup && (
          <input
            type="text"
            name="userName"
            placeholder="Enter User Name"
            value={loginData.userName}
            onChange={changeHandler}
          />
        )}
        <input
          type="email"
          name="email"
          value={loginData.email}
          placeholder="Enter E-mail"
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={changeHandler}
        />
        <button onClick={logInDataSubmit}>
          {" "}
          {signup ? <span>Register</span> : <span>Log In</span>}
        </button>
        {signup ? (
          <p>
            If you already have an account{" "}
            <span
              className="register-login"
              onClick={() => {
                setSignup(!signup);
              }}
            >
              Log In
            </span>{" "}
            here
          </p>
        ) : (
          <p>
            If you don't have account{" "}
            <span
              className="register-login"
              onClick={() => {
                setSignup(!signup);
              }}
            >
              Register
            </span>{" "}
            here
          </p>
        )}
      </div>
    </div>
  );
};

export default LogIn;
