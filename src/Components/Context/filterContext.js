import { createContext, useContext, useReducer } from "react";

import FilterReducer from "../../Redux/Reducer/filterReducer";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(FilterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    category: "",
  });

  console.log(productState);

  return (
    <FilterContext.Provider value={{ productState, productDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const FiltersState = () => {
  return useContext(FilterContext);
};

export default FilterContextProvider;
