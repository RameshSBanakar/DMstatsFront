import React, { useEffect,useState } from "react";
import axios from "axios";
import "./SystemInfo.css"
const ClientInfo = () => {
    const [diskData,setDiskData]=useState(null)
  useEffect(() => {
    const getClientInfo = async () => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          };
        const response = await axios.post(
          "https://dmstats.onrender.com/client/systeminfo",
          {
            userAgent: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            // Add more client-side information as needed
          },
          config
        );
            console.log("Client info sent successfully:", response.data);
            setDiskData(response.data);
      } catch (error) {
        console.error("Error sending client info:", error);
      }
    };

    getClientInfo();
  }, []);

  return (
    <div style={{ backgroundColor: "blanchedalmond" }}>
      {diskData ? (
        <div>
          {diskData.modifiedDiskInfo.map((disk, index) => (
            <div className="diskDivs" key={index}>
              <span style={{ color: "red", fontWeight: "700" }}>{disk.fs}</span>
              <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                <strong>Total:</strong>
                {disk.sizeGB}
              </span>
              <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                <strong>Used:</strong>
                {disk.usedGB}
              </span>
              <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                {" "}
                <strong>Free:</strong>
                {disk.availableGB}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>Collecting Client Information...</p>
      )}
    </div>
  );
};

export default ClientInfo;
