const initialState = {
  token: localStorage.getItem("auth-token") || null,
  isAuthenticated: !!localStorage.getItem("auth-token"), // true if token exists
  userName: localStorage.getItem("userName") || null, // optional
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
    case "USER_SIGNUP":
      localStorage.setItem("auth-token", action.payload.token);
      localStorage.setItem("userName", action.payload.userName||""); // optional

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        userName: action.payload.userName,
      };

    case "SIGNUP_FAILED":
    case "LOGIN_FAILED":
      localStorage.removeItem("auth-token");
      localStorage.removeItem("userName");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userName: null,
      };

    default:
      return state;
  }
};

export default Reducer;
