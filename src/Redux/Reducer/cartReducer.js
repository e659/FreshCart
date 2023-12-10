import { ActionTypes } from "../Constance/actionsTypes";
const INTIAL_STATE = {
  cart: [],
  cartTotal: 0,
};
const addToCartReducer = (state = INTIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.ADD_TO_CART: {
      let newCart = { ...payload };

      return {
        ...state,
        cart: newCart,
      };
    }

    case ActionTypes.GET_LOGGED_CART: {
      return {
        ...state,
        cart: payload,
      };
    }
    case ActionTypes.DELETE_ITEM: {
      let newCart = { ...payload };
      return {
        ...state,
        cart: newCart,
      };
    }
    case ActionTypes.UPDATE_QTY: {
      let newCart = { ...payload };
      return {
        ...state,
        cart: newCart,
      };
    }
    case ActionTypes.CLEAR_ALL_CART: {
      
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};

export default addToCartReducer;
