import React, { useState, useRef } from "react";
import "./FileBasedDm.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fileListAdd } from "../../Redux/Actions/FileAction";
import { XmlDataAdd } from "../../Redux/Actions/XmlAction";
import {dbDataAdd} from "../../Redux/Actions/DbAction"
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { adddmpath } from "../../Redux/Actions/dmpathAction";
import History from "../History/History";
import { addHistory } from "../../Redux/Actions/HistoryAction";
const FileBasedDm = () => {
  //  const history = [
  //    { name: "my_dm", lastDate: "22/3/2000" },
  //    { name: "test_dm", lastDate: "30/4/2024" },
  //  ];
  const inputFileRef = useRef();
  const dispatch = useDispatch();
  const [dmPath, setDmPath] = useState("");
  const [listOfFiles, setListOfFile] = useState([]);
  const handleFileSelect = (event) => {
    const selectedFolder = event.target.files;
    let new_path = "./" + selectedFolder[0].webkitRelativePath.split("/")[0];
    setDmPath(new_path);
    dispatch(adddmpath(new_path));
    dispatch(addHistory(new_path));
    setListOfFile(selectedFolder);
    // console.log(selectedFolder);
  };
  const triggerToInputFile = () => {
    inputFileRef.current.click();
  };
  const sendFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("xmlfile", file);

    try {
      const response = await axios.post(
        "https://dmstats.onrender.com/filesUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:");
     
      if (response.data.XMLData) {
        dispatch(XmlDataAdd(response.data.XMLData));
      } else {
        dispatch(dbDataAdd(response.data));
      }
      // Handle success response
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  };

  const dispatchFile = (e) => {
    // e.preventDefault()
    Object.entries(listOfFiles).forEach((file) => {
      if (file[1].name === "dm_structure.xml") {
        sendFileToBackend(file[1]);
      }
      if (file[1].name === "dm_root_v3.db") {
        // console.log(file[1]);
        sendFileToBackend(file[1]);
      }
    });
    dispatch(fileListAdd(listOfFiles));
  };


  return (
    <>
      <Sidebar />
      <div className="fileDM-main">
        <div className="file-input-container">
          <h1 className="slect-folder">Select DM Folder</h1>
          <input
            type="text"
            className="folderPathShow"
            value={dmPath}
            readOnly
            onClick={triggerToInputFile}
            placeholder="Select DM Folder"
          />
          <input
            type="file"
            webkitdirectory="true"
            className="file-input"
            onChange={handleFileSelect}
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          {dmPath && (
            <Link to="/DMDetailes">
              <button className="btn-go" onClick={dispatchFile}>
                GO
              </button>
            </Link>
          )}
        </div>

        <div className="historydiv">
          <History/>
        </div>
      </div>
    </>
  );
};

export default FileBasedDm;
