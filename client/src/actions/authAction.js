import axios from "axios";
import { returnErrors } from "./errorAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const tokenConfig = (getState) => {
  // Get token from  localstorage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if there's a token then add to the header
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
