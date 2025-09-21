import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, removeHistory } from "../../Redux/Actions/HistoryAction";
import { FaTrash } from "react-icons/fa"; // FontAwesome trash icon

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.state);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const removeHistoryFrom = (item) => {
    dispatch(removeHistory(item));
  };

  const lastDateConvert = (lastDate) => {
    let date = new Date(lastDate);
    return date.toLocaleString();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">History</h5>
      </div>
      <div className="card-body p-0">
        {history && history.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">DM Name</th>
                  <th scope="col">Last Viewed</th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{lastDateConvert(item.lastDate)}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeHistoryFrom(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-3 text-center text-muted">
            <em>No History Available</em>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
