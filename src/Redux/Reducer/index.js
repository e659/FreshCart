// if ihave more one reducer
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import addToCartReducer from "./cartReducer";
import wishListReducer from "./wishListReducer";
import  FilterReducer  from "./filterReducer";

// all My Reducers
const reducers = combineReducers({
  allProducts: productReducer,
  addToCart: addToCartReducer,
  wishList: wishListReducer,
  FilterReducer:FilterReducer
});
export default reducers;
