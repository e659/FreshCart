import { ActionTypes } from "../Constance/actionsTypes";
import axios from "axios";
import toast from "react-hot-toast";
const headers = {
  token: localStorage.getItem("usertoken"),
};
export const addToWishListAction = (productId) => async (dispatch) => {
  let { data } = await axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: productId,
      },
      {
        headers: headers,
      }
    )
    .catch((err) => err);
  if (data.status === "success") {
    toast.success("Product added successfully to your wishlist", {
      duration: 2000,
      position: "top-center",
      style: {
        maxWidth: "500px",
      },
    });
  } else {
    toast.error("Product not added to your wishlist");
  }
  // console.log(data);
  dispatch({ type: ActionTypes.ADD_TO_LIST, payload: data });
};
export const getLoggedListAction = (productId) => {
  return {
    type: ActionTypes.DELETE_ITEM_LIST,
    payload: productId,
  };
};
export const deleteWishListAction = (productId) => async (dispatch) => {
    let { data } = await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: headers,
        }
      )
      .catch((err) => err);
    if (data.status === "success") {
      toast.success("Product removed successfully from your wishlist", {
        duration: 2000,
        position: "top-center",
        style: {
          maxWidth: "500px",
        },
      });
    } else {
      toast.error("Product not removed from your wishlist");
    }
    // console.log(data);
    dispatch({ type: ActionTypes.DELETE_ITEM_LIST, payload: data });
  };