import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
} from "../actions/types";

//return the state
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    // if present or true
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_BRANDS:
      return { ...state, getBrands: action.payload };
    case GET_WOODS:
      return { ...state, getWoods: action.payload };
    default:
      return state;
  }
}
