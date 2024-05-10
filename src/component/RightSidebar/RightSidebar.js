import React, {useState } from 'react'
import { showRightSideBar } from '../../Redux/Actions/RightSideBar';
import { useDispatch, useSelector } from 'react-redux';
import "./RightSidebar.css"
const RightSidebar = () => {
  const dispatch = useDispatch();
  const Atrributes = useSelector((state) => state.dbFileData.state);
  const isSidebarOpen = useSelector((state) => state.rightSideBar);
  const hideSideBar = () => {
    dispatch(showRightSideBar(false));
  };
  console.log(Atrributes);
  if (Atrributes) {
    return (
      <div className="App">
        <div className="content"></div>
        <div className={`sidebar ${isSidebarOpen.state ? "open" : ""}`}>
          <button onClick={hideSideBar}>X</button>
          <table className='table'>
            <thead className='tableHeder'>
              <tr>
                <th>_attribute_id_</th>
                <th>_attribute_name_</th>
              </tr>
            </thead>
            <tbody>
              {
                Atrributes.Atrributes.map((item, index) => (
                  <tr key={index}>
                    <td>{item._attribute_id_}</td>
                    <td>{item._attribute_name_}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="content"></div>
        <div className={`sidebar ${isSidebarOpen.state ? "open" : ""}`}>
          <button onClick={hideSideBar}>X</button>
          
        </div>
      </div>
    );
  }
    
}

export default RightSidebar
