import "./App.css";
import FileBasedDm from "./component/FIleBasedDM/FileBasedDm";
import LogIn from "./component/LogIn/LogIn";
import Navbar from "./component/Navbar/Navbar";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ServerBasedDm from "./component/ServerBasedDm/ServerBasedDm";
import DmDetails from "./component/DMDetails/DmDetails";
import DMConnect from "./component/DMConnect/DMConnect";
import { useSelector } from "react-redux";
import RightSidebar from "./component/RightSidebar/RightSidebar";
import Spinner from "./component/Spinner/Spinner";
import Sidebar from "./component/Sidebar/Sidebar";
import Hierarchy from "./component/Hierarchy/Hierarchy"
import Statistics from "./component/Statistics/Statistics";
import Profile from "./component/Profile/Profile"
function App() {
  const spinner = useSelector((state) => state.spinner);
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  // PrivateRoute component
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ReactNotifications />
      {<Navbar />}
      {spinner.state && <Spinner />}

      {!spinner.state && (
        <>
          {/* Navbar visible only if authenticated */}

          <div className="flex-grow-1 d-flex">
            {!isAuthenticated ? (
              // Center login vertically & horizontally
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <LogIn />
              </div>
            ) : (
              <>
                {/* Left Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-grow-1 p-3">
                  <Routes>
                    <Route
                      path="/filebased"
                      element={
                        <PrivateRoute>
                          <FileBasedDm />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/serverbased"
                      element={
                        <PrivateRoute>
                          <ServerBasedDm />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/hierarchy"
                      element={
                        <PrivateRoute>
                          <Hierarchy />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/statistics"
                      element={
                        <PrivateRoute>
                          <Statistics />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile/:username"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                   
                    <Route
                      path="/DMDetailes"
                      element={
                        <PrivateRoute>
                          <DmDetails />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/DMConnect"
                      element={
                        <PrivateRoute>
                          <DMConnect />
                        </PrivateRoute>
                      }
                    />
                    {/* Default route */}
                    <Route
                      path="/"
                      element={<Navigate to="/DMConnect" replace />}
                    />
                  </Routes>
                </div>

                {/* Right Sidebar */}
                <RightSidebar />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
