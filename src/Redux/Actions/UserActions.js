import axios from "axios";
import { Store } from "react-notifications-component";
import { spinnerStart, spinnerStop } from "./SpinnerAction";
let notification = {
  // title: "Wonderful!",
  message: "Configurable",
  type: "success",
  insert: "top",
  container: "top-center",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
};

export const userLogin = (data) => async (dispatch) => {
  try {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("action",data)
    dispatch(spinnerStart());
    const resp = await axios.post(
      "https://dmstats.onrender.com/auth/login",
      data,
      config
    );
    dispatch(spinnerStop());
    console.log(resp.data);
    if (resp.data.status) {
      Store.addNotification({
        ...notification,
        // title: "Wonderful!",
        message: resp.data.message,
      });
      dispatch({
        type: "USER_LOGIN",
        payload: resp.data,
      });
    } else {
       if (resp.data.message === "credentials are not correct") {
         Store.addNotification({
           ...notification,
          //  title: "Warning",
           message: resp.data.message,
           type: "warning",
         });
       } else {
         Store.addNotification({
           ...notification,
          //  title: "Danger X",
           message: resp.data.message,
           type: "danger",
         });
       }
      dispatch({
        type: "LOGIN_FAILED",
        payload: resp.data,
      });
    }
   
  } catch (error) {
    dispatch(spinnerStop());
    Store.addNotification({
      ...notification,
      // title: "Wonderful!",
      message: error.message,
      type: "danger",
    });
    dispatch({ type: "LOGIN_FAILED" });
    console.log(error);
  }
};
export const logoutUser = (data) => async (dispatch) => {
     Store.addNotification({
       ...notification,
      //  title: " success",
       message: "User logged out success",
       type: "success",
     });
     dispatch({
       type: "SIGNUP_FAILED",
    //    payload: resp.data,
     });
};
export const userSignup = (data) => async (dispatch) => {
  try {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(spinnerStart());
    const resp = await axios.post(
      "https://dmstats.onrender.com/auth/signup",
      data,
      config
    );
    // console.log(resp);
     dispatch(spinnerStop());
    if (resp.data.status) {
      Store.addNotification({
        ...notification,
        // title: "Wonderful!",
        message: resp.data.message,
      });
      dispatch({
        type: "USER_SIGNUP",
        payload: resp.data,
      });
    } else {
     Store.addNotification({
       ...notification,
      //  title: "Danger X",
       message: resp.data.message,
       type: "danger",
     });
      dispatch({
        type: "SIGNUP_FAILED",
        payload: resp.data,
      });
      // console.log("from usersignup else block");
    }
   
  } catch (error) {
    dispatch(spinnerStop());
    Store.addNotification({
      ...notification,
      // title: "Danger X",
      message: error.message,
      type: "danger",
    });
    dispatch({ type: "SIGNUP_FAILED" });
    console.log(error);
  }
};
