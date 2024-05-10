import React, { useState } from "react";
import { useSelector } from "react-redux";
import File_icon from "../Assets/file_icon.jpg";
import Folder_file from "../Assets/Folder_Icon.png"
import  minus_mark  from "../Assets/minus.avif"
import plus_mark from "../Assets/plus.png"
import "./FolderStructure.css";
const FolderExplorer = () => {
  const folders = useSelector((state) => state.fileListOfDM.state);
 
  const [visibleFolders, setVisibleFolders] = useState({});
  const toggleFolderVisibility = (folderName) => {
    setVisibleFolders((prevVisibleFolders) => ({
      ...prevVisibleFolders,
      [folderName]: !prevVisibleFolders[folderName],
    }));
  };
  const lastDate = (date) => {
    const lastDate = new Date(date);
    let day = lastDate.getDate();
    let month = lastDate.getMonth();
    let year = lastDate.getFullYear();
    let time = lastDate.getHours();
    let minute = lastDate.getMinutes();
    if (minute === 0) {
      minute = "00";
    } else if (minute > 0 & minute < 9) {
      minute="0"+minute
    }
    let modifiedDate =
      day.toString() +
      "/" +
      month.toString() +
      "/" +
      year.toString() +
      "-" +
      time.toString() +
      ":" +
      minute.toString();
    return modifiedDate;
  };
  const renderFolder = (folder, folderName,index) => {
    const isVisible = visibleFolders[folderName];
    // const isVisible = true;
    const extName = folderName.split(".")[1]
  
      return (
        <ul style={{ listStyleType: "none" }}>
          <li key={folderName}>
           
            <div className="folderStructureInnerDiv">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => toggleFolderVisibility(folderName)}
              >
                {isVisible ? (
                  <img src={minus_mark} className="foldervisiblemarks" alt="" />
                ) : extName ? (
                  <img src={minus_mark} className="foldervisiblemarks" alt="" />
                ) : (
                  <>
                    {/* <button></button> */}
                    <img
                      src={plus_mark}
                      className="foldervisiblemarks"
                      alt=""
                    />
                  </>
                )}
              </span>
              {extName ? (
                <img src={File_icon} className="folder-icon" alt="" />
              ) : (
                <img src={Folder_file} className="folder-icon" alt="" />
              )}
              {folderName}{" "}
              <span className="content-size">
                {folder.size && (
                  <span className="sizeOfFile">
                    {Math.round(folder.size / 1024).toString() + "KB"}
                  </span>
                )}{" "}
                {folder.lastModified && lastDate(folder.lastModified)}
              </span>
             
            </div>

            {isVisible && (
              <ul style={{ listStyleType: "none" }}>
                {Object.entries(folder).map(([name, content], index) => (
                  <li key={name}>
                    {typeof content === "object" ? (
                      renderFolder(content, name, index)
                    ) : (
                      <div>
                        <span>
                          {/* <img src={minus_mark} className="foldervisiblemarks" /> */}
                          {name}
                        </span>
                        {/* <span>{size}</span> */}
                      </div>
                    )}
                   
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      );
  };

  return (
    <div>
      {folders && (
        <>
          |<span className="folderStructure">Folder Structure</span>|
          <span className="filesize">Size of File</span>|
          <span className="lastmodifieddate">Last Modified Date-Time</span>|
        </>
      )}
      {folders ? (
        renderFolder(Object.values(folders)[0], Object.keys(folders)[0])
      ) : (
        <div>you have not selected any DM Folder</div>
      )}
    </div>
  );
};

export default FolderExplorer;
