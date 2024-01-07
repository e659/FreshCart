import { ActionTypes } from "../Constance/actionsTypes";
const INTIAL_STATE = {
  wishList: [],
};
const wishListReducer = (state = INTIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.ADD_TO_LIST: {
      let newCart = { ...payload };
      return {
        ...state,
        wishList: newCart,
      };
    }
    case ActionTypes.GET_LOGGED_LIST: {
      return {
        ...state,
        wishList: payload,
      };
    }
    // case ActionTypes.DELETE_ITEM_LIST: {
    
    //   let newCart = { ...payload };
    
    //   return {
    //     ...state,
    //     wishList: newCart,
    //   };
    // }
    default:
      return state;
  }
};

export default wishListReducer;
