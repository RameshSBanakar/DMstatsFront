import React, { useState } from "react";
// import "./LogIn.css";
import { useDispatch } from "react-redux";
import { userLogin, userSignup } from "../../Redux/Actions/UserActions.js";

const LogIn = () => {
  const dispatch = useDispatch();

  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!isLoginView && password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (isLoginView) {
      
      dispatch(userLogin({ email, password }));
    } else {
      dispatch(userSignup({ "userName":name, email, password }));
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const EyeIcon = ({ onClick, isVisible }) => (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 p-0"
      style={{ textDecoration: "none" }}
    >
      {isVisible ? (
        <i className="bi bi-eye-fill"></i>
      ) : (
        <i className="bi bi-eye-slash-fill"></i>
      )}
    </button>
  );

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}
      >
        {/* Toggle buttons */}
        <div className="btn-group mb-4 w-100" role="group">
          <button
            className={`btn ${isLoginView ? "btn-dark " : "btn-outline-dark"} rounded-start`}
            onClick={() => setIsLoginView(true)}
          >
            Login
          </button>
          <button
            className={`btn ${!isLoginView ? "btn-dark " : "btn-outline-dark"} rounded-end`}
            onClick={() => setIsLoginView(false)}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-center fw-bold mb-2">
          {isLoginView ? "Welcome Back!" : "Create Account"}
        </h2>
        <p className="text-center text-muted mb-4">
          {isLoginView
            ? "Sign in to continue"
            : "Get started with a free account"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeIcon
              isVisible={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {!isLoginView && (
            <div className="mb-3 position-relative">
              <label
                htmlFor="confirmPassword"
                className="form-label fw-semibold"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="form-control"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <EyeIcon
                isVisible={showConfirmPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          )}

          {error && (
            <p className="text-danger text-center fw-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-dark w-100 fw-bold py-2 rounded"
          >
            {isLoginView ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
