import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fileListAdd } from "../../Redux/Actions/FileAction";
import { XmlDataAdd } from "../../Redux/Actions/XmlAction";
import { dbDataAdd } from "../../Redux/Actions/DbAction";

import axios from "axios";
import { adddmpath } from "../../Redux/Actions/dmpathAction";
import History from "../History/History";
import { addHistory } from "../../Redux/Actions/HistoryAction";
import { spinnerStart, spinnerStop } from "../../Redux/Actions/SpinnerAction";
const FolderUploadComponent = () => {
    const dispatch=useDispatch()
  const onDrop = useCallback(async (acceptedFiles) => {
    // Handle folder upload
      dispatch(adddmpath("./" + (acceptedFiles[0].path.split("/"))[1]));
      dispatch(addHistory("./" + acceptedFiles[0].path.split("/")[1]));
      dispatch(fileListAdd(acceptedFiles));
    for (const file of acceptedFiles) {
      if (file.isDirectory) {
        // Handle folder upload
        await handleFolderUpload(file);
      } else {
        // Handle individual file upload
        // You can handle non-folder files here if needed
          if (file.name === "dm_structure.xml") {
            sendFileToBackend(file);
          }
          if (file.name === "dm_root_v3.db") {
            // console.log(file[1]);
            sendFileToBackend(file);
          }
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    webkitdirectory: true,
    directory: true,
    // Enable directory uploads
  });

  const handleFolderUpload = async (folder) => {
    // Use the File System Access API or other methods to read folder contents
    // For simplicity, let's just log the folder object
    console.log("Uploaded folder:", folder);
  };
  const sendFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("xmlfile", file);
    dispatch(spinnerStart());
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
      // console.log("File uploaded successfully:");

      if (response.data.XMLData) {
        dispatch(XmlDataAdd(response.data.XMLData));
      } else {
        dispatch(dbDataAdd(response.data));
      }
      dispatch(spinnerStop());
      // Handle success response
    } catch (error) {
      dispatch(spinnerStop());
      // console.error("Error uploading file:", error);
      // Handle error
    }
  };
  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the folder here...</p>
      ) : (
        <p>Drag 'n' drop folders here,</p>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default FolderUploadComponent;
