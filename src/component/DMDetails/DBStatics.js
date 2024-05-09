import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./DBStatics.css";
const DBStatics = () => {
  const [isVisible, setIsVisible] = useState();

  const NumberOfItems = useSelector((state) => state.dbFileData.state);
  const toggleShowAndHide = () => {
    setIsVisible(!isVisible);
  };
  // console.log(NumberOfItems["settings"]);
  if (!NumberOfItems) {
    return <div>Nothing found</div>;
  } else {
    return (
      <div className="dbstastics-main">
        <li className="dbstatics">
          <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
            Total Atrributes:
          </strong>
          <spn style={ {color:"orange"}}>{NumberOfItems["Total Atrributes"]}</spn>
        </li>
        <li className="dbstatics">
          <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
            Total Reference:
          </strong>
          <spn style={ {color:"orange"}}>{NumberOfItems["Total Reference"]}</spn>
        </li>

        <div className="settings" onClick={toggleShowAndHide}>
          <strong>Settings</strong>
          {NumberOfItems["settings"].map((item, index) => {
            return (
              <li className="dbstatics" key={index}>
                <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
                  {item.Name}:
                </strong>
                <spn style={{ color: "orange" }}>{item.Value}</spn>
                {/* {`${item.Name}:${item.Value}`} */}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
};

export default DBStatics;
