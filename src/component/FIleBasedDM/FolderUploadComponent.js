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
        console.log(file.isDirectory);
      if (file.isDirectory) {
        // Handle folder upload
        await handleFolderUpload(file);
      } else {
        if (file.name === "dm_structure.xml" || file.name === "dm_root_v3.db") {
          await sendFileToBackend(file);
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

    // const handleSelectFolder = useCallback(async () => {
    //     try {
    //     console.log("hello")
    //     const [folderHandle] = await window.showDirectoryPicker();
    //     console.log(folderHandle);
    //     const files = await getAllFilesInDirectory(folderHandle);
    //     console.log("Selected files:", files);
    // } catch (error) {
    //     console.error("Error selecting folder:", error);
    // }
    // }, []);
    // const getAllFilesInDirectory = async (directoryHandle) => {
    //   const files = [];
    //   for await (const entry of directoryHandle.values()) {
    //     if (entry.isFile) {
    //       files.push(await entry.getFile());
    //     } else if (entry.isDirectory) {
    //       const subFiles = await getAllFilesInDirectory(entry);
    //       files.push(...subFiles);
    //     }
    //   }
    //   return files;
    // };
   
  return (
    <div
      {...getRootProps()}
      style={dropzoneStyles}
    //   onClick={handleSelectFolder}
    >
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
