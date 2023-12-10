import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { userContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Reducer/cartReducer";
export default function Navbar() {
  const CartLenght = useSelector((state) => state.addToCart.cart.numOfCartItems);
  // console.log(CartLenght);
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
                  <IoCart
                    className="cursor-pointer"
                    onClick={() => navugateToCart()}
                    size={25}
                  />
                  <span>{CartLenght}</span>
                </li>
                {/* hide login&register when loggedin user */}
                {userToken !== null ? (
                  <li className="nav-item mx-3">
                    <span
                      onClick={() => logOut()}
                      className="nav-link cursor-pointer"
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
