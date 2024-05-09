import React, { useState } from "react";

import DBStatics from "./DBStatics";
import "./DmDetails.css";
import DMmodel from "./DMmodel";
import FolderStructure from "./FolderStructure";
import NumberOfItems from "./NumberOfItems";
import drop_down from "../Assets/Dropdown.webp"
import { useSelector } from "react-redux";
// import RightSidebar from "../RightSidebar/RightSidebar";
const DmDetails = () => {
  const dmpath = useSelector((state) => state.dmpath.state);
  // console.log(dmpath)
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
            {numberOfItems && <NumberOfItems />}
          </div>
          <div onClick={toggleDmStaticVisible} className="dmStatics background">
            <span className="dmDetailsDesign">DM Statistics</span>
            <img src={drop_down} className="drop-down-img" alt="" />
            {dmStatics && <DBStatics />}
          </div>

          <div className="background" onClick={toggleDataModelVisible}>
            <span className="dmDetailsDesign">Data Model</span>
            <img src={drop_down} className="drop-down-img" alt="" />
            {/* <RightSidebar/> */}
          </div>
          {dataModel && <DMmodel />}
        </div>
      </div>
    </div>
  );
};

export default DmDetails;
