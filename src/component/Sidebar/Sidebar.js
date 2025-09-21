import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCog, FaInfoCircle } from "react-icons/fa";
import { BsDatabaseAdd } from "react-icons/bs";
import { TbHierarchy3 } from "react-icons/tb";
import { FcStatistics } from "react-icons/fc";
import { BiDetail } from "react-icons/bi";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation(); // track current route

  const menuItems = [
    { icon: <BsDatabaseAdd />, label: "DM Connect", link: "/dmconnect" },
    { icon: <TbHierarchy3 />, label: "Hierarchy", link: "/hierarchy" },
    { icon: <BiDetail />, label: "Property/Attribute", link: "/serverbased" },
    { icon: <FcStatistics />, label: "Statistics", link: "/statistics" },
    { icon: <FaCog />, label: "Settings", link: "/settings" },
  ];

  // Determine active item based on current route
  const activeIndex = menuItems.findIndex(
    (item) => location.pathname === item.link
  );

  return (
    <div
      className="d-flex flex-column bg-dark text-white position-fixed start-0 h-100"
      style={{
        width: isExpanded ? "200px" : "70px",
        transition: "width 0.3s",
        top: "56px",
      }}
    >
      {/* Clickable empty space wrapper */}
      <div
        style={{ flex: 1 }}
        onClick={(e) => {
          // Only toggle if clicked directly on the wrapper
          if (e.target === e.currentTarget) {
            setIsExpanded((prev) => !prev);
          }
        }}
      >
        <ul className="nav nav-pills flex-column mb-auto p-2 flex-grow-1">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item mb-2">
              <Link
                to={item.link}
                className={`nav-link d-flex align-items-center text-white ${
                  activeIndex === index ? "active-item" : ""
                }`}
                onClick={(e) => e.stopPropagation()} // prevent toggle
                style={{
                  borderLeft:
                    activeIndex === index
                      ? "5px solid #0d6efd"
                      : "4px solid transparent",
                  borderRadius: 0,
                  paddingLeft: isExpanded ? "10px" : "8px",
                  height: "50px",
                  backgroundColor:
                    activeIndex === index
                      ? "rgba(255,255,255,0.1)"
                      : "transparent",
                  transition: "background-color 0.3s",
                }}
              >
                <span className="fs-2 me-2">{item.icon}</span>
                {isExpanded && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
        {/* Empty space at bottom to allow toggle */}
        <div style={{ flexGrow: 1 }} />
      </div>
    </div>
  );
};

export default Sidebar;
