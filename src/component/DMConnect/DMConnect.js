import React from "react";
import { Link } from "react-router-dom";
import { FaFolder, FaServer } from "react-icons/fa";

const DMConnect = () => {
  const cards = [
    { icon: <FaFolder />, name: "File Based DM", link: "/filebased" },
    { icon: <FaServer />, name: "Server Based DM", link: "/serverbased" },
  ];

  return (
    <div className="container mt-4">
      <div className="row g-3 justify-content-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="col-12 col-md-6 d-flex justify-content-center"
          >
            <Link
              to={card.link}
              className="text-decoration-none"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <div className="card shadow-sm text-center p-4 h-100 hover-shadow">
                <div className="mb-3 fs-1 text-primary">{card.icon}</div>
                <h5 className="card-title text-dark">{card.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DMConnect;
