import React, { useEffect, useState } from "react";

import DBStatics from "./DBStatics";
import "./DmDetails.css";
import DMmodel from "./DMmodel";
import FolderStructure from "./FolderStructure";
import NumberOfItems from "./NumberOfItems";
import drop_down from "../Assets/Dropdown.webp"
import { useSelector } from "react-redux";

const DmDetails = () => {
  const totalObjects = useSelector(
    (state) => state.dbFileData
  );
  const dmpath = useSelector((state) => state.dmpath.state);

  const [dmStatics, setdmStatics] = useState(true);
  const [numberOfItems, setNumberOfItems] = useState(true);
  const [dataModel, setDataModel] = useState(false);
  const toggleDmStaticVisible = () => {
    setdmStatics(!dmStatics);
  };
  const toggleDmNumberOfItemVisible = () => {
    setNumberOfItems(!numberOfItems);
  };
  const toggleDataModelVisible = () => {
    setDataModel(!dataModel);
  };

  console.log(totalObjects);
 
    return (
      <div className="dmDetails-main-container">
        <div className="dmpath">{dmpath}</div>
        <div className="dmDetails">
          <div className="dmDetails-left-container">
            <FolderStructure />
          </div>
          <div className="dmDetails-right">
            <div
              onClick={toggleDmNumberOfItemVisible}
              className="numberOfItems background"
            >
              <span className="dmDetailsDesign">Number Of DM Items</span>
              <img src={drop_down} className="drop-down-img" alt="" />
              <span style={{ marginLeft: "10px", color: "green" }}>
                {/* {totalObjects && totalObjects.state.totalObjects} */}
              </span>
              {numberOfItems && <NumberOfItems />}
            </div>
            <div
              onClick={toggleDmStaticVisible}
              className="dmStatics background"
            >
              <span className="dmDetailsDesign">DM Statistics</span>
              <img src={drop_down} className="drop-down-img" alt="" />
              {dmStatics && <DBStatics />}
            </div>

            <div className="background" onClick={toggleDataModelVisible}>
              <span className="dmDetailsDesign">Data Model</span>
              <img src={drop_down} className="drop-down-img" alt="" />
            </div>
            {dataModel && <DMmodel />}
          </div>
        </div>
      </div>
    );
};

export default DmDetails;
