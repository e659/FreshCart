import axios from "axios";

import { createContext } from "react";
export let WishListContext = createContext();
export function WishListContextProvider(props) {
  const headers = {
    token: localStorage.getItem("usertoken"),
  };
  // addToWishList
  function addToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response).catch((err)=>err)
  }
  return (
    <WishListContext.Provider value={{addToWishList}}>
      {props.children}
    </WishListContext.Provider>
  );
}
