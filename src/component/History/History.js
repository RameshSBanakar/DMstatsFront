import React from "react";
import "./History.css"
import delete_image from "../Assets/delete.png"
import { getHistory,removeHistory } from "../../Redux/Actions/HistoryAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const History = () => {
  const dispatch=useDispatch()
  const history = useSelector((state) => state.history.state)
  useEffect(() => {
    dispatch(getHistory());
  }, []);
  const removeHistoryFrom = (item) => {
    dispatch(removeHistory(item))
  }
  if (history) {
    if (history.length > 0) {
      return (
        <div>
          <div className="hedingforhistory">
            <div className="itemnameHeading">DM Name</div>
            <div className="itemLastdateHeading">Last View date</div>
            <div className="deleteImageidvHeading">Delete</div>
          </div>
          {history.map((item, index) => (
            <div key={index} className="histroy-items">
              <div className="itemname">{item.name}</div>
              <div className="itemLastdate">{item.lastDate}</div>
              <div className="deleteImageidv">
                <img
                  src={delete_image}
                  className="deleteImage"
                  onClick={() => removeHistoryFrom(item)}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
  }  
   
    else {
        return (
          <div>
            <div className="hedingforhistory">
              <div className="itemnameHeading">DM Name</div>
              <div className="itemLastdateHeading">Last View date</div>
              <div className="deleteImageidvHeading">Delete</div>
            </div>
            <div className="nohistory">No Histroy Available</div>
          </div>
        );
    }
 
};

export default History;
