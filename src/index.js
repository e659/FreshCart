import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserContextProvider from "./Components/Context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import { Provider } from 'react-redux';
import store from './Redux/store';
import { WishListContextProvider } from "./Components/Context/wishListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
// take instanse from reactQuery
let queryClient = new QueryClient();
root.render(
  // wrapp all componets into context&QueryProvider
  <Provider store={store}>
   <WishListContextProvider>
   <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    <ReactQueryDevtools initialIsOpen="false" position="top-right"/>
  </QueryClientProvider>
   </WishListContextProvider>

  </Provider>
);
