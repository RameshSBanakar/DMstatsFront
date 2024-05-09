import axios from "axios";
export const getHistory = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    const resp = await axios.get(
      "https://dmstats.onrender.com/history/getHistory",
      config
    );
    // console.log(resp.data);
    dispatch({
      type: "GET_HISTORY",
      payload: resp.data.data,
    });
  } catch (error) {}
};

export const addHistory = (data) => async (dispatch) => {
  // console.log(data);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    const resp = await axios.post(
      "https://dmstats.onrender.com/history/addHistory",
      { name: data },
      config
    );
    // console.log(resp.data);
    dispatch({
      type: "ADD_HISTORY",
      payload: resp.data,
    });
  } catch (error) {}
};

export const removeHistory = (data) => async (dispatch) => {
  console.log(data._id);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    const resp = await axios.post(
      "https://dmstats.onrender.com/history/removeHistory",
      data,
      config
    );
    if (resp.data.status) {
      dispatch({
        type: "REMOVE_HISTORY",
        payload: data,
      });
    }
    
  } catch (error) {
    console.log(error)
  }
};


