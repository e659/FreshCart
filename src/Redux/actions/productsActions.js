import { ActionTypes } from "../Constance/actionsTypes";
import axios from "axios";
// export const setAllProducts=()=>{
//     return{
//         type:ActionTypes.ALL_PRODUCTS,

//     }
// };
// export const setAllProducts = () => async (dispatch) => {
//   let { data } = await axios
//     .get(`https://ecommerce.routemisr.com/api/v1/products`)
//     .catch((err) => err);
//   dispatch({ type: ActionTypes.ALL_PRODUCTS, payload: data });
//   console.log(data);
// };
export const setAllProducts = (products) => {
    return {
      type: ActionTypes.ALL_PRODUCTS,
     payload:products
    };
  };