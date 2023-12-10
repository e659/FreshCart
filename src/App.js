import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import { userContext } from "./Components/Context/userContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPass from "./Components/ResetPass/ResetPass";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

let routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:productId",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            {" "}
            <Brands />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "Login", element: <Login /> },
      { path: "ForgetPass", element: <ForgetPass /> },
      { path: "VerifyCode", element: <VerifyCode /> },
      { path: "ResetPass", element: <ResetPass /> },
      { path: "Register", element: <Register /> },
    ],
  },
]);

function App() {
  // user userContext
  let { setUserToken } = useContext(userContext);

  useEffect(() => {
    // to save token when refresh(rendering)
    if (localStorage.getItem("usertoken") !== null) {
      setUserToken(localStorage.getItem("usertoken"));
    }
  }, []);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
}

export default App;
