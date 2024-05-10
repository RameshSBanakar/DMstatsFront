const initialState ={state:false};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SPINNER_START": {
      return {
        state: true,
      };
    }
    case "SPINNER_STOP": {
      return {
        state: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default Reducer;
