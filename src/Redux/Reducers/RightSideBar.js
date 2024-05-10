const initialState = false;

const Reducer = (state = initialState, action) => {
  switch (action.type) {
   
    case "SIDEBAR_SHOW": {
      return {
        state: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default Reducer;
