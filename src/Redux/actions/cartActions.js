import { ActionTypes } from "../Constance/actionsTypes";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const headers = {
  token: localStorage.getItem("usertoken"),
};

export const addToCartAction = (productId) => async (dispatch) => {
  let response = await axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productId,
      },
      {
        headers: headers,
      }
    )
    .catch((err) => err);
  if (response.data.status === "success") {
    toast.success("Product added successfully to your cart", {
      duration: 2000,
      position: "top-center",
    });
  } else {
    toast.error("Product not added to your cart");
  }
  //   console.log(response);
  dispatch({ type: ActionTypes.ADD_TO_CART, payload: response.data });
};
// export const getLoggedCartAction = (productId) => {
//   return {
//     type: ActionTypes.GET_LOGGED_CART,
//     payload: productId,
//   };
// };

export const getLoggedCartAction = () => async (dispatch) => {
  let response = await axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers,
    })
    .catch((err) => err);

  // console.log(response.data);
  dispatch({ type: ActionTypes.GET_LOGGED_CART, payload: response.data });
};

export const deleteCartItemAction = (productId) => async (dispatch) => {
  let response = await axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: headers,
    })
    .catch((err) => err);
  if (response.data.status === "success") {
    toast.success("Product removed successfully from your cart", {
      duration: 2000,
      position: "top-center",
      style: {
        maxWidth: "500px",
      },
    });
  } else {
    toast.error("Product not removed to your cart");
  }
  // console.log(response.data)
  dispatch({ type: ActionTypes.DELETE_ITEM, payload: response.data });
};
export const updateCartItemAction = (productId, count) => async (dispatch) => {
  let { data } = await axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count,
      },
      { headers: headers }
    )
    .catch((err) => err);
  dispatch({ type: ActionTypes.UPDATE_QTY, payload: data });

};
export const clearAllCartItemsAction = () => async (dispatch) => {
  let { data } = await axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers,
    })
    .catch((err) => err);
  console.log(data);
  dispatch({ type: ActionTypes.CLEAR_ALL_CART });
 
};
