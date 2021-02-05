import axios from "axios";

import { REGISTER_USER, LOGIN_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { USER_SERVER } from "../components/utils/misc";

// make the request from server

export async function registerUser(dataToSubmit) {
  try {
    const response = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
    console.log("register", response);
    return {
      type: REGISTER_USER,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error.response);
    // if (error.response) {
    //   alert(error.response.data.message);
    // }
  }
}
export async function loginUser(dataToSubmit) {
  try {
    const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
    return {
      type: LOGIN_USER,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error.response);
    if (error.response) {
      alert(error.response.data.message);
    }
  }
}

export async function auth() {
  try {
    const response = await axios.get(`${USER_SERVER}/auth`);
    return {
      type: AUTH_USER,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error);
  }
}

export async function logoutUser() {
  try {
    const response = await axios.get(`${USER_SERVER}/logout`);
    return {
      type: LOGOUT_USER,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error);
  }
}
