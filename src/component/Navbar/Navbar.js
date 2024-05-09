import React, { useEffect } from "react";
import "./Navbar.css";
import DM_log from "../Assets/app_logo.png";
import nav_options from "../Assets/nav-option1.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/Actions/UserActions";
const Navbar = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const auth = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/filebased");
    }
  }, [auth.isAuthenticated]);
  const logOut = () => {
   dispatch(logoutUser());
 }
  return (
    <div className="navbar1">
      <div className="navbar-logo1">
        <span onClick={() => navigate("/filebased")}>
          <img src={DM_log} alt="" className="dmlogo" />
        </span>
        {/* <Link to="/filebased">
          <span className="DMpath">DM Overview</span>
        </Link> */}
      </div>

      <div className="dropdown navbar-login1">
        <strong className="loggedInUserName">{auth.userName}</strong>
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        <img src={nav_options} alt="" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="/">
              {auth.isAuthenticated ? (
                <span onClick={logOut}>Logout</span>
              ) : (
                <span>Log In</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
