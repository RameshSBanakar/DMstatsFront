import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DM_log from "../Assets/app_logo.png";
import {
  FaUserCircle,
  FaBookmark,
  FaSearch,
  FaIdBadge,
  FaSignOutAlt,
} from "react-icons/fa";
import { logoutUser } from "../../Redux/Actions/UserActions";

const Navbar = () => {
  const auth = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("auth-token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 position-fixed w-100">
      {/* Left: Logo */}
      <div className="d-flex align-items-center">
        <img
          src={DM_log}
          alt="App Logo"
          className="me-2"
          style={{ height: "40px", cursor: "pointer" }}
          onClick={() => navigate("/dmconnect")}
        />
        <span className="navbar-brand mb-0 h1">DM Stats</span>
      </div>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Center & Right */}
      <div className="collapse navbar-collapse" id="navbarContent">
        {auth.isAuthenticated && (
          <form
            className="d-flex mx-auto my-2 my-lg-0"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <div className="input-group shadow-sm rounded-pill overflow-hidden">
              <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center">
                <FaSearch />
              </span>
              <input
                type="search"
                className="form-control border-0"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </form>
        )}

        {/* Right: Bookmarks + User */}
        {auth.isAuthenticated && (
          <div
            className="d-flex align-items-center ms-3 position-relative"
            ref={menuRef}
          >
            <FaBookmark
              className="text-white fs-5 me-3"
              style={{ cursor: "pointer" }}
            />

            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUserCircle className="text-white fs-4 me-2" />
              <strong className="text-white">{auth.userName}</strong>
            </div>

            {showUserMenu && (
              <div
                className="position-absolute bg-white text-dark rounded shadow p-2"
                style={{
                  top: "50px",
                  right: 0,
                  minWidth: "140px",
                  zIndex: 2000,
                }}
              >
                <button
                  className="dropdown-item d-flex align-items-center fs-5"
                  onClick={() => navigate(`/profile/${auth.userName}`)}
                >
                  <FaIdBadge className="me-2 fs-5" /> Profile
                </button>
                <button
                  className="dropdown-item d-flex align-items-center text-danger fs-5"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-2 fs-5" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
