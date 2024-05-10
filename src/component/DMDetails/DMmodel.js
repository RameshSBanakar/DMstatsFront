import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DMmodel.css";
import { showRightSideBar } from "../../Redux/Actions/RightSideBar";
import drop_down from "../Assets/Dropdown.webp"
const DMmodel = () => {
  const dispatch=useDispatch()
  const xmlData = useSelector((state) => state.xmlFileData.state);
  const [innerObjectsVisibility, setInnerObjectsVisibility] = useState({});
  const [data, setData] = useState({});
  let result = {};
  // Function to toggle show/hide for an inner object
  const toggleInnerObject = (innerObjectName) => {
    setInnerObjectsVisibility((prevState) => ({
      ...prevState,
      [innerObjectName]: !prevState[innerObjectName] || false,
    }));
  };
  // console.log(xmlData)
  const sidebarshow = () => {
    dispatch(showRightSideBar(true));
  }
  useEffect(() => {
    if (xmlData) {
      const iterateThroughObject = (data) => {
        for (let [key, value] of Object.entries(data)) {
          result[key] = {};
          if (value.Properties && value.Properties.Property) {
            result[key].Properties = value.Properties.Property.map(
              (property) => property._attributes.name
            );
          }
          if (value.Attributes && typeof value.Attributes.Attribute) {
            try {
              result[key].Attributes = value.Attributes.Attribute.map(
                (attribute) => attribute._attributes.name
              );
            } catch (error) {
              // console.log(error);
            }
          }
          if (value.LIBRARYITEM) {
            try {
              result[key].Properties =
                value.LIBRARYITEM.map(properties=>properties.Properties.Property.map(property=>property._attributes.name+", "))
            } catch (error) {
              // console.log(error)
            }
            
          }
          if (value.LIBRARYITEM ) {
            try {
              result[key].Attributes = value.LIBRARYITEM.map((attributes) => {
                try {
                 return attributes.Attributes.Attribute._attributes.name
                } catch (error) {
                 return attributes.Attributes.Attribute.map(attr=>attr._attributes.name)
                }
                // console.log(attributes.Attributes.Attribute);
              //  attributes.Attributes.Attribute._attributes.name
                // if (attributes.Attributes) {
                //    console.log(attributes.Attributes.Attribute);
                //   attributes.Attributes.Attribute.map(
                //     (attribute) => attribute._attributes.name
                //   );
                // }
              }
               
              );
            } catch (error) {
              // console.log(error);
            }
          }
          if (value.DM_Setting) {
            result[key].DM_Setting = value.DM_Setting.map(dm_setting=>dm_setting._attributes.name)
          }
          if (value.FEATUREITEM) {
            try {
               result[key].Properties = value.FEATUREITEM.map((FEATUREITEM) =>
                 FEATUREITEM.Properties.Property.map((property) => property._attributes.name+", ")
               );
            } catch (error) {
              // console.log(error)
            }
           
          }
        }
        // console.log(result);
        setData(result);
      };
      iterateThroughObject(xmlData);
    }
  }, [xmlData]);
  // console.log(data)
  if (!xmlData) {
    return <div className="dm-model-main">No data</div>;
  } else {
    return (
      <div className="dm-model-main">
        {Object.keys(data).map((innerObjectName) => (
          <div key={innerObjectName} className="list-dm-models">
            {/* Check if the value is an object */}
            {typeof data[innerObjectName] === "object" &&
            !Array.isArray(data[innerObjectName]) ? (
              <div className="dm_model-main">
                {/* Render toggle button for inner object */}
                <strong
                  onClick={() => toggleInnerObject(innerObjectName)}
                  className="dm-model-data-sub"
                >
                  {innerObjectsVisibility[innerObjectName]
                    ? `${innerObjectName}`
                    : `${innerObjectName}`}
                </strong>
                {innerObjectsVisibility[innerObjectName] && (
                  <div className="dm-model-list">
                    {/* Render properties and attributes of the inner object */}
                    {/* <p>{innerObjectName}</p> */}
                    {/* <ul> */}
                    {Object.entries(data[innerObjectName]).map(
                      ([key, value]) => (
                        <li key={key} style={{ listStyle: "none" }}>
                          <div className="innerDivOfdmModel">
                            {key === "Attributes" ? (
                              <span
                                className="keyStyle"
                                style={{ cursor: "pointer" }}
                                onClick={sidebarshow}
                              >
                                {key}:<img src={drop_down} style={{width:"20px",height:"20px"} } />
                              </span>
                            ) : (
                              <span className="keyStyle">{key}:</span>
                            )}
                            <ol>
                              {value.map((v, index) => (
                                <li key={index}>{v} </li>
                              ))}
                            </ol>
                            <p></p>
                          </div>
                        </li>
                      )
                    )}
                    {/* </ul> */}
                  </div>
                )}
              </div>
            ) : (
              // Render simple value if not an object
              <div>
                <strong>{innerObjectName}</strong>
                <p>{data[innerObjectName]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default DMmodel;
