export const spinnerStart = (data) => async (dispatch) => { 
    dispatch({
      type: "SPINNER_START",
    });
}

export const spinnerStop = (data) => async (dispatch) => {
  dispatch({
    type: "SPINNER_STOP",
  });
};