import React from 'react'

const Spinner = () => {
  return (
    <div>
      <div className="spinner-border" role="status" style={{marginLeft:"47%",marginTop:"40vh"}}>
        <span className="visually-hidden">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default Spinner
