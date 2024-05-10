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
        <strong>Table Data</strong>
        <div className="vishwahadabitti">
          <li className="dbstatics">
            <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
              Total Objects:
            </strong>
            <spn style={{ color: "green" }}>
              {NumberOfItems["totalObjects"]}
            </spn>
          </li>
          <li className="dbstatics">
            <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
              Total Atrributes:
            </strong>
            <spn style={{ color: "green" }}>
              {NumberOfItems["Total Atrributes"]}
            </spn>
          </li>
          <li className="dbstatics">
            <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
              Total Reference:
            </strong>
            <spn style={{ color: "green" }}>
              {NumberOfItems["Total Reference"]}
            </spn>
          </li>
          <li className="dbstatics">
            <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
              Total Typed Values:
            </strong>
            <spn style={{ color: "green" }}>{NumberOfItems["typedValues"]}</spn>
          </li>
          <li className="dbstatics">
            <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
              Total Number Of Values:
            </strong>
            <spn style={{ color: "green" }}>{NumberOfItems["values"]}</spn>
          </li>
        </div>
        <div className="settings" onClick={toggleShowAndHide}>
          <strong>Settings</strong>
          {NumberOfItems["settings"].map((item, index) => {
            return (
              <li className="dbstatics" key={index}>
                <strong style={{ marginLeft: "2px", marginRight: "4px" }}>
                  {item.Name}:
                </strong>
                <spn style={{ color: "green" }}>{item.Value}</spn>
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
