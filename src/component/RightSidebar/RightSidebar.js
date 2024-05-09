import React, {useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./RightSidebar.css"
const RightSidebar = () => {
    const isSidebarOpen = useSelector((state) => state.rightSideBar);
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 
    // const toggleSidebar = () => {
    //   setIsSidebarOpen(!isSidebarOpen);
    // };
    console.log(isSidebarOpen);
    useEffect(() => {}, [isSidebarOpen]);
  return (
    <div className="App">
      <div className="content">
        {/* <button onClick={toggleSidebar}>Toggle Sidebar</button> */}
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        Sidebar Content
      </div>
    </div>
  );
}

export default RightSidebar
