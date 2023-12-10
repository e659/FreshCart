import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedCartAction,
  updateCartItemAction,
  clearAllCartItemsAction,
} from "../../Redux/actions/cartActions";
import { deleteCartItemAction } from "../../Redux/actions/cartActions";
import { InfinitySpin } from "react-loader-spinner";

import "./Cart.scss";
export default function Cart() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const headers = {
    token: localStorage.getItem("usertoken"),
  };
  let [cartItems, setCart] = useState(null);
  // console.log(cartItems)
  // getLoggedCart
  async function getLoggedCart() {
    let { data } = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .catch((err) => err);

    dispatch(getLoggedCartAction(data));
    setCart(data);
  }
  useEffect(() => {
    getLoggedCart();
  }, []);

  // deleteCartItem
  const cart = useSelector((state) => state.addToCart.cart);
  console.log("cart",cart);
  function deleteCartItem(id) {
    dispatch(deleteCartItemAction(id));
    setCart(cart);
  }
  // deleteAllCart
  function deleteAllCart() {
     dispatch(clearAllCartItemsAction());

  }

  // updateCartItem
  function updateCartItem(id, count) {
    dispatch(updateCartItemAction(id, count));
    setCart(cart);
  }
  return (
    <>
      <div className="container py-5">
        <button onClick={deleteAllCart} className="btn bg-main text-white">Clear all</button>
        {cartItems ? (
          <div className="row py-5 ">
            <h3>Cart Shop</h3>

            <div className="total d-flex justify-content-between">
              <h5 className="text-main">
                <span className="text-dark">CartItems : </span>
                {cartItems.numOfCartItems}
              </h5>
              <h4 className="text-main">
                <span className="text-dark">Total Cart Price : </span>
                {cartItems.data.totalCartPrice} EGP
              </h4>
              <button className="btn bg-main text-white">Clear all</button>
            </div>
            {cartItems.data.products?.map((product) => {
              return (
                <div className="row cartRow gy-2" key={product._id}>
                  <div className="col-md-6">
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-md-4 py-2 ">
                        <img
                          src={product.product.imageCover}
                          alt={product.product.imageCover}
                          className="w-50 rounded rounded-3"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="cartDes">
                          <h4>
                            {product.product.title
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")}
                          </h4>
                        </div>
                        <h5 className="text-main">
                          <span className=""> Price : </span>
                          {product.price} EGP
                        </h5>
                        <ul className="fa-ul cursor-pointer ">
                          <li
                            onClick={() => deleteCartItem(product.product.id)}
                            className="fs-5"
                          >
                            <span className="fa-li">
                              <FaRegTrashCan style={{ color: "#0aad0a" }} />
                            </span>
                            Remove
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end cursor-pointer  align-items-center">
                    <CiSquarePlus
                      onClick={() =>
                        updateCartItem(product.product.id, product.count + 1)
                      }
                      style={{ color: "#0aad0a" }}
                      size={40}
                    />
                    <span> {product.count} </span>
                    <CiSquareMinus
                      onClick={() =>
                        updateCartItem(product.product.id, product.count - 1)
                      }
                      style={{ color: "#0aad0a" }}
                      size={40}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
            <InfinitySpin width="200" color="#4fa94d" />
          </div>
        )}
      </div>
    </>
  );
}
