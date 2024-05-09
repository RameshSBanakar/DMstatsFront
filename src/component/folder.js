// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// const DMmodel = () => {
//   const xmlData = useSelector((state) => state.xmlFileData.state);
//   const [innerObjectsVisibility, setInnerObjectsVisibility] = useState({});
//   let result = {};
//   // Function to toggle show/hide for an inner object
//   const toggleInnerObject = (innerObjectName) => {
//     setInnerObjectsVisibility((prevState) => ({
//       ...prevState,
//       [innerObjectName]: !prevState[innerObjectName] || false,
//     }));
//   };

//   useEffect(() => {
//     if (xmlData) {
//       const iterateThroughObject = (data) => {
//         for (let [key, value] of Object.entries(data)) {
//           result[key] = {};
//           if (value.Properties && value.Properties.Property) {
//             result[key].properties = value.Properties.Property.map(
//               (property) => property._attributes.name
//             );
//           }
//           if (value.Attributes && typeof value.Attributes.Attribute) {
//             try {
//               result[key].attributes = value.Attributes.Attribute.map(
//                 (attribute) => attribute._attributes.name
//               );
//             } catch (error) {
//               // console.log(error);
//             }
//           }
//         }
//         console.log(result);
//       };
//       iterateThroughObject(xmlData);
//     }
//   }, [xmlData]);

//   if (!xmlData) {
//     return <>No data</>;
//   } else {
//     return (
//       <div>
//         {Object.keys(result).map((innerObjectName) => (
//           <div key={innerObjectName}>
//             {console.log(innerObjectName)}
//             {/* Check if the inner object contains arrays */}
//             {Array.isArray(result[innerObjectName]) ? (
//               <div>
//                 {/* Render content for inner objects containing arrays */}
//                 <button onClick={() => toggleInnerObject(innerObjectName)}>
//                   {innerObjectsVisibility[innerObjectName]
//                     ? `Hide ${innerObjectName}`
//                     : `Show ${innerObjectName}`}
//                 </button>
//                 {innerObjectsVisibility[innerObjectName] && (
//                   <div>
//                     {/* Render array content for each inner object */}
//                     <h6>{innerObjectName}</h6>
//                     <ul>
//                       {result[innerObjectName].map((item, index) => (
//                         <li key={index}>{item}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               // Render content for inner objects not containing arrays
//               <div>
//                 <h6>{innerObjectName}</h6>
//                 <p>{result[innerObjectName]}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   }
// };

// export default DMmodel;
