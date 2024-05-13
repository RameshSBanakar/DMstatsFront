

import React from 'react';
import './Spinner.css'; // Import CSS file for styling
import app_logo from "../Assets/app_logo.png"
const MovingImage = () => {
  return (
    <div className="container">
      <img className="moving-image" src={app_logo} alt="Moving" style={{width:"90px",heigth:"50px"}}/>
    </div>
  );
};

export default MovingImage;

