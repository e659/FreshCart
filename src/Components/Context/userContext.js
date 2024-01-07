import { createContext, useContext, useState } from "react";
import axios from "axios";
// create Context
export const userContext = createContext();
export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
  //  payment
  function onlinePayment(cartId, url, values) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: values,
        },
        {
          headers: { token: localStorage.getItem("usertoken") },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function payByCash(id, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("usertoken") } }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }
  return (
    <userContext.Provider value={{ userToken, setUserToken, onlinePayment,payByCash }}>
      {props.children}
    </userContext.Provider>
  );
}
