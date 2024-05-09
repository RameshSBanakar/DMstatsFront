import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./NumberOfItems.css";
const NumberOfItems = () => {
  const NumberOfItems = useSelector((state) => state.dbFileData.state);

  if (!NumberOfItems) {
    return <div>Nothing Found</div>;
  } else {
    return (
      <div className="NumberOfItems">
        {Object.entries(NumberOfItems.totalCountOfObjects).map(
          ([key, value]) => (
            <li key={key} className="NumberOfItems-list">
              <span>
                <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
                  {key}:
                </strong>
              </span>
              <span style={{ color: "green" }}>{value}</span>
            </li>
          )
        )}
      </div>
    );
  }
};

export default NumberOfItems;
