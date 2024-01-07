import { ActionTypes } from "../Constance/actionsTypes";
const INTIAL_STATE = {
  filters: [],
};

 const FilterReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case "SORT_BY_CATEGORY":
        return { ...state, category: action.payload };
      case "SORT_BY_PRICE":
        return { ...state, sort: action.payload };
      case "FILTER_BY_RATING":
        return { ...state, byRating: action.payload };
      case "FILTER_BY_SEARCH":
        return { ...state, searchQuery: action.payload };
      case "CLEAR_FILTERS":
        return { byStock: false, byFastDelivery: false, byRating: 0 };
      default:
        return state;
    }
  };

  export default FilterReducer;