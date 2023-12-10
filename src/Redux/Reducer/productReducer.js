import { ActionTypes } from "../Constance/actionsTypes";
const intialState={
    products:[],
 
 };
//  all Products Reducer
export const productReducer=(state=intialState,action)=>{
    const {type,payload}=action;
    switch (type) {
        case ActionTypes.ALL_PRODUCTS:
            return {
             ...state,
            products:payload
         }
            break;
     
        default:return state
            break;
     
     }

    };