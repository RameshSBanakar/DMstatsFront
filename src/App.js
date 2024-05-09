import "./App.css";
import FileBasedDm from "./component/FIleBasedDM/FileBasedDm";
import LogIn from "./component/LogIn/LogIn";
import Navbar from "./component/Navbar/Navbar";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ServerBasedDm from "./component/ServerBasedDm/ServerBasedDm";

import DmDetails from "./component/DMDetails/DmDetails";
import { useSelector } from "react-redux";


function App() {

  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  
  console.log(isAuthenticated);
  return (
    <div>
      <Navbar />

      <div className="app-sidebar-dmSelection">
        <ReactNotifications />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <LogIn />
              ) : (
                <Navigate to="/filebased" replace={true} />
              )
            }
          />
          <Route
            path="/filebased"
            element={
              isAuthenticated ? (
                <FileBasedDm />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/serverbased"
            element={
              isAuthenticated ? (
                <ServerBasedDm />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/DMDetailes"
            element={
              isAuthenticated ? (
                <DmDetails />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
        </Routes>
      </div>
     
    </div>
  );
}

export default App;
