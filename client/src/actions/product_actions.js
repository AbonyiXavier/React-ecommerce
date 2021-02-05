import axios from "axios";

import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
} from "./types";
import { PRODUCT_SERVER } from "../components/utils/misc";

export async function getProductsBySell() {
  try {
    const response = await axios.get(
      `${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`
    );
    return {
      type: GET_PRODUCTS_BY_SELL,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error);
  }
}
export async function getProductsByArrival() {
  try {
    const response = await axios.get(
      `${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`
    );
    return {
      type: GET_PRODUCTS_BY_ARRIVAL,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error);
  }
}

//Categories of products

export async function getBrands() {
  try {
    const response = await axios.get(`${PRODUCT_SERVER}/brands`);
    return {
      type: GET_BRANDS,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error);
  }
}
export async function getWoods() {
  try {
    const response = await axios.get(`${PRODUCT_SERVER}/woods`);
    return {
      type: GET_WOODS,
      payload: response.data,
    };
  } catch (error) {
    console.log("error", error);
  }
}
