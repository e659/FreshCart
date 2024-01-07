import React, { useEffect, useState, useContext } from "react";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { userContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { wishlistContext } from "../Context/wishListContext";
export default function Navbar() {
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  const CartLenght = useSelector((state) =>
    state.addToCart.cart.data?.products.reduce((a, b) => a + b.count, 0)
  );
  // console.log(CartLenght)
  // const favLenght = useSelector((state) =>
  //   state.wishList.wishList.data?.length
  // );

  const { wishlistCount } = useContext(wishlistContext);
  const navigate = useNavigate();
  // using userToken
  let { userToken, setUserToken } = useContext(userContext);
  // console.log(userToken);
  // logOut Function
  const logOut = () => {
    localStorage.removeItem("usertoken");
    setUserToken(null);
    navigate("/login");
  };
  // navigate To cart
  const navugateToCart = () => {
    navigate("/cart");
  };
  // navigate To wishlist
  const navigateTowishlist = () => {
    navigate("/WishList");
  };
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="fresh cart logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* hide navLinks when notLogIn User */}
              {userToken !== null ? (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/"
                      style={({ isActive }) => ({
                        color: isActive ? "#0aad0a" : "",
                        fontWeight: isActive ? "bold" : "",
                      })}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/products"
                      style={({ isActive }) => ({
                        color: isActive ? "#0aad0a" : "",
                        fontWeight: isActive ? "bold" : "",
                      })}
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/categories"
                      style={({ isActive }) => ({
                        color: isActive ? "#0aad0a" : "",
                        fontWeight: isActive ? "bold" : "",
                      })}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/brands"
                      style={({ isActive }) => ({
                        color: isActive ? "#0aad0a" : "",
                        fontWeight: isActive ? "bold" : "",
                      })}
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/cart"
                      style={({ isActive }) => ({
                        color: isActive ? "#0aad0a" : "",
                        fontWeight: isActive ? "bold" : "",
                      })}
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/wishList"
                      style={({ isActive }) => ({
                        color: isActive ? "#0aad0a" : "",
                        fontWeight: isActive ? "bold" : "",
                      })}
                    >
                     WishList
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/allorders"
                      style={({ isActive }) => ({
                        color: isActive ? "#0aad0a" : "",
                        fontWeight: isActive ? "bold" : "",
                      })}
                    >
                      Orders
                    </NavLink>
                  </li>
                </ul>
              ) : (
                ""
              )}

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item d-flex align-items-center cursor-pointer">
                  <i className="fab mx-2 fa-facebook"></i>
                  <i className="fab mx-2 fa-twitter"></i>
                  <i className="fab mx-2 fa-instagram"></i>
                  <i className="fab mx-2 fa-youtube"></i>
                  <i className="fab mx-2 fa-tiktok"></i>
                  {/* <IoCart
                    className="cursor-pointer position-relative"
                    onClick={() => navugateToCart()}
                    size={25}
                  />
                  {CartLenght >= 1 ? (
                    <span className="lenght__Cartspan">{CartLenght}</span>
                  ) : (
                    ""
                  )}
                 
                  <i
                    onClick={() => navigateTowishlist()}
                    className="fa-regular fa-heart mx-3 fs-5 position-relative"
                  ></i>
                  {wishlistCount >= 1 ? (
                    <span className="lenght__span">{wishlistCount}</span>
                  ) : (
                    ""
                  )} */}
                </li>
                {/* hide login&register when loggedin user */}
                {userToken !== null ? (
                  <li className="nav-item mx-3">
                    <span
                      onClick={() => logOut()}
                      className="nav-link cursor-pointer log__out"
                      style={{
                        color: "white",
                        background: "#0aad0a",
                        borderRadius: "10px",
                      }}
                    >
                      Logout
                    </span>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
