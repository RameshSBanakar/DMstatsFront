// import React, { useState, useRef } from "react";
// import "./FileBasedDm.css";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fileListAdd } from "../../Redux/Actions/FileAction";
// import { XmlDataAdd } from "../../Redux/Actions/XmlAction";
// import {dbDataAdd} from "../../Redux/Actions/DbAction"
// import Sidebar from "../Sidebar/Sidebar";
// import axios from "axios";
// import { adddmpath } from "../../Redux/Actions/dmpathAction";
// import History from "../History/History";
// import { addHistory } from "../../Redux/Actions/HistoryAction";
// import { spinnerStart, spinnerStop } from "../../Redux/Actions/SpinnerAction";
// import FolderUploadComponent from "./FolderUploadComponent";
// const FileBasedDm = () => {
//   //  const history = [
//   //    { name: "my_dm", lastDate: "22/3/2000" },
//   //    { name: "test_dm", lastDate: "30/4/2024" },
//   //  ];
//   const dmpath = useSelector((state) => state.dmpath.state)
//   console.log(dmpath);
//   const inputFileRef = useRef();
//   const dispatch = useDispatch();
//   const [dmPath, setDmPath] = useState("");
//   const [listOfFiles, setListOfFile] = useState([]);
//   const handleFileSelect = (event) => {

//     const selectedFolder = event.target.files;
//     let new_path = "./" + selectedFolder[0].webkitRelativePath.split("/")[0];
//     setDmPath(new_path);
//     dispatch(adddmpath(new_path));
//     dispatch(addHistory(new_path));
//     setListOfFile(selectedFolder);
//     // console.log(selectedFolder);
//   };
//   const triggerToInputFile = () => {
//     inputFileRef.current.click();

//   };
//   const sendFileToBackend = async (file) => {
//     const formData = new FormData();
//     formData.append("xmlfile", file);
//     dispatch(spinnerStart())
//     try {
//       const response = await axios.post(
//         "https://dmstats.onrender.com/filesUpload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       // console.log("File uploaded successfully:");

//       if (response.data.XMLData) {
//         dispatch(XmlDataAdd(response.data.XMLData));
//       } else {
//         dispatch(dbDataAdd(response.data));
//       }
//       dispatch(spinnerStop())
//       // Handle success response
//     } catch (error) {
//       dispatch(spinnerStop());
//       // console.error("Error uploading file:", error);
//       // Handle error
//     }
//   };

//   const dispatchFile = (e) => {
//     // e.preventDefault()
//     Object.entries(listOfFiles).forEach((file) => {
//       console.log(file)
//       if (file[1].name === "dm_structure.xml") {
//         sendFileToBackend(file[1]);
//       }
//       if (file[1].name === "dm_root_v3.db") {
//         // console.log(file[1]);
//         sendFileToBackend(file[1]);
//       }
//     });
//     dispatch(fileListAdd(listOfFiles));
//   };

//   return (
//     <>
//       {/* <Sidebar /> */}

//       <div className="fileDM-main">
//         <FolderUploadComponent />
//         {/* <div className="file-input-container">
//           <h1 className="slect-folder">Select DM Folder</h1>
//           <input
//             type="text"
//             className="folderPathShow"
//             value={dmPath}
//             readOnly
//             onClick={triggerToInputFile}
//             placeholder="Select DM Folder"
//           />
//           <input
//             type="file"
//             webkitdirectory="true"
//             className="file-input"
//             onChange={handleFileSelect}
//             ref={inputFileRef}
//             style={{ display: "none" }}
//           /> */}
//           {dmpath && (
//             <Link to="/DMDetailes">
//               <button className="btn-go" >
//                 GO
//               </button>
//             </Link>
//           )}
//         {/* </div> */}

//         <div className="historydiv">
//           <History />
//         </div>
//       </div>
//     </>
//   );
// };

// export default FileBasedDm;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adddmpath } from "../../Redux/Actions/dmpathAction";
import { addHistory } from "../../Redux/Actions/HistoryAction";
import { fileListAdd } from "../../Redux/Actions/FileAction";
import { XmlDataAdd } from "../../Redux/Actions/XmlAction";
import { dbDataAdd } from "../../Redux/Actions/DbAction";
import { spinnerStart, spinnerStop } from "../../Redux/Actions/SpinnerAction";
import axios from "axios";
import History from "../History/History";
import { FaFolderOpen } from "react-icons/fa";

const FileBasedDm = () => {
  const dispatch = useDispatch();
  const dmpath = useSelector((state) => state.dmpath.state);
  const inputFileRef = useRef();
  const [listOfFiles, setListOfFile] = useState([]);

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles.length) return;

    const topFolderName = selectedFiles[0].webkitRelativePath.split("/")[0];
    dispatch(adddmpath(topFolderName));
    dispatch(addHistory(topFolderName));

    setListOfFile(selectedFiles);
  };

  const triggerToInputFile = () => inputFileRef.current.click();

  const sendFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("xmlfile", file);
    dispatch(spinnerStart());
    try {
      const response = await axios.post(
        "https://dmstats.onrender.com/filesUpload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.XMLData) dispatch(XmlDataAdd(response.data.XMLData));
      else dispatch(dbDataAdd(response.data));
    } catch (error) {
      console.error("File upload error:", error);
    } finally {
      dispatch(spinnerStop());
    }
  };

  const dispatchFile = () => {
    Object.entries(listOfFiles).forEach(([_, file]) => {
      if (file.name === "dm_structure.xml" || file.name === "dm_root_v3.db") {
        sendFileToBackend(file);
      }
    });
    dispatch(fileListAdd(listOfFiles));
  };

  return (
    <div className="container-fluid">
      <div
        className="d-flex flex-column align-items-center"
        style={{ paddingTop: "80px" }}
      >
        {/* Folder Upload Card */}
        <div
          className="card shadow-lg p-4 mb-4 w-100"
          style={{ maxWidth: "700px" }}
        >
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <FaFolderOpen className="fs-1 text-primary me-3" />
              <h4 className="mb-0 fs-5">Select DM Folder</h4>
            </div>

            <div className="d-flex align-items-center w-100 mt-3 mt-md-0">
              <input
                type="text"
                className="form-control me-2"
                value={dmpath || ""}
                placeholder="Select DM Folder"
                readOnly
                // onClick={triggerToInputFile}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                webkitdirectory="true"
                className="d-none"
                ref={inputFileRef}
                onChange={handleFileSelect}
              />
            </div>
          </div>

          {/* Action Buttons (Always Visible) */}
          <div className="d-flex justify-content-center gap-5 mt-4 flex-wrap">
            <button className="btn btn-success" onClick={triggerToInputFile}>
              Add
            </button>
            <button
              className="btn btn-primary"
              disabled={!dmpath}
              onClick={dispatchFile}
            >
              Connect
            </button>

            <button
              className="btn btn-warning"
              disabled={!dmpath}
              onClick={() => alert("Edit functionality")}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              disabled={!dmpath}
              onClick={() => dispatch(adddmpath(""))}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="card shadow-sm p-3 w-100" style={{ maxWidth: "700px" }}>
          <History />
        </div>
      </div>
    </div>
  );
};

export default FileBasedDm;
