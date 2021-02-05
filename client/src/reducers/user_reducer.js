import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../actions/types";

//return the state
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    // if present or true
    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
