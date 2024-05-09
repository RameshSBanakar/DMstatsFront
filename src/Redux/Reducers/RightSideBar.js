const initialState = false;

const Reducer = (state = initialState, action) => {
  // console.log(action.type)
  // console.log(action.payload)
  switch (action.type) {
    case "SIDEBAR_SHOW": {
      return {
        state: !state,
      };
    }
    default: {
      return state;
    }
  }
};
export default Reducer;
