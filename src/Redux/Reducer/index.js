// if ihave more one reducer
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import addToCartReducer from "./cartReducer";

// all My Reducers
const reducers = combineReducers({
  allProducts: productReducer,
  addToCart: addToCartReducer,
  // getloggedCart:getLoggedCartReducer,
 

});
export default reducers;
