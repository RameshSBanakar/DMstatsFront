import React from 'react'
import { Link } from "react-router-dom";
import "./Sidebar.css"

const sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <Link to={"/filebased"} >
          FILE BASED DM
        </Link>
      </div>
      <div>
        <Link to={"/serverbased"}>SERVER BASED DM</Link>
      </div>
    </div>
  );
}

export default sidebar