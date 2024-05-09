const initialState = []

const Reducer = (state = initialState, action) => {

  switch (action.type) {
    case "GET_HISTORY": {
      return {
        state: action.payload,
      };
    }
    case "ADD_HISTORY": {
      return {
        state: [...state, action.payload],
      };
    }
    case "REMOVE_HISTORY": {
      
      return {
        state: state.state.filter(item=>item._id!==action.payload._id),
      };
    }
    default: {
      return state;
    }
  }
};
export default Reducer;