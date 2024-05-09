const initialState = [];

const Reducer = (state = initialState, action) => {
  // console.log(action.type)
  // console.log(action.payload)
  switch (action.type) {
    case "DB_DATA_ADD": {
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
