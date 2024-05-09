const initialState = [];

const Reducer = (state = initialState, action) => {

  switch (action.type) {
    case "XML_DATA_ADD": {
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
