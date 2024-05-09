
const initialState = {
  token: localStorage.getItem("auth-token"),
  isAuthenticated: false,
  userName: null,
};

const Reducer = (state = initialState, action) => {

  switch (action.type) {
    case "USER_LOGIN": {
      localStorage.setItem("auth-token", action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        userName: action.payload.userName,
      };
    }
    case "USER_SIGNUP": {
      localStorage.setItem("auth-token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        userName: action.payload.userName,
      };
    }
    case "SIGNUP_FAILED":
    case "LOGIN_FAILED": {
      localStorage.removeItem("auth-token");

      return {
        ...state,
        isAuthenticated: false,
        userName: null,
      };
    }

    default: {
      return { ...state };
    }
  }
};
export default Reducer;
