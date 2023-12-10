import {ActionTypes} from "../constance/actionTypes";
export const setAllProducts=(products)=>{
    return{
        type:ActionTypes.ALL_PRODUCTS,
        payload:products
    }
};