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

  // State for the view (login vs. signup)
  const [isLoginView, setIsLoginView] = useState(true);

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for handling errors
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset error on new submission
    setError("");

    if (!isLoginView && password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // In a real app, you'd handle authentication here (e.g., API call)
    console.log({
      type: isLoginView ? "Login" : "Signup",
      name: isLoginView ? undefined : name,
      email,
      password,
    });

    // Reset form fields after submission for a clean state
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const EyeIcon = ({ onClick, isVisible }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
    >
      {isVisible ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.67.111 2.458.322l1.41-1.41A11.953 11.953 0 0012 3C6.477 3 2 7.03 2 12s4.477 9 10 9a11.953 11.953 0 005.125-1.075l-1.25-1.25z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.939 10.939l-4.48-4.48m5.92 5.92l4.48 4.48"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 1l22 22"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md mx-4 p-8 md:p-10 bg-white rounded-xl shadow-2xl">
        {/* Toggle Buttons with Sliding Effect */}
        <div className="relative flex w-full max-w-xs p-1 mx-auto mb-8 bg-gray-200 rounded-full">
          <div
            className={`absolute top-1 left-1 h-[calc(100%-8px)] w-1/2 rounded-full bg-black transition-transform duration-300 ease-in-out
              ${isLoginView ? "translate-x-0" : "translate-x-full"}`}
          ></div>
          <button
            onClick={() => setIsLoginView(true)}
            className={`relative z-10 w-1/2 py-2 font-semibold text-center transition-colors duration-300 ${
              isLoginView ? "text-white" : "text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginView(false)}
            className={`relative z-10 w-1/2 py-2 font-semibold text-center transition-colors duration-300 ${
              !isLoginView ? "text-white" : "text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center text-black mb-2">
            {isLoginView ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLoginView
              ? "Sign in to continue"
              : "Get started with a free account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginView && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
                <EyeIcon
                  isVisible={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            {!isLoginView && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                  <EyeIcon
                    isVisible={showConfirmPassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-transform transform hover:scale-105"
            >
              {isLoginView ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;


  




