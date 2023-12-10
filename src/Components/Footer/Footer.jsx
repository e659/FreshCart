import React from "react";
import amazon from "../../Assets/images/amazon-logo.png";
import express from "../../Assets/images/american-express-logo.png";
import mastercard from "../../Assets/images/mastercard-logo.png";
import paypal from "../../Assets/images/paypal.png";
import appStore from "../../Assets/images/app-store.png";
import googlePlay from "../../Assets/images/google-play.png";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className="bg-main-light py-5 mt-auto ">
        <div className="container-sm">
          <h3 className="h5 fw-semibold mb-2">Get the FreshCart App</h3>
          <p>We will sent you a link, open it on your phone to download it</p>
          <div className="row g-4 justify-content-between align-items-center pb-3 border-bottom border-opacity-25 border-dark">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control w-100"
                placeholder="Your Email"
              />
            </div>
            <div className="col-md-3 text-end">
              <button className="btn bg-main text-light w-100">
                Share App Link
              </button>
            </div>
          </div>
          <div className="row border-bottom border-opacity-25 border-dark">
            <div className="col-md-6 d-flex">
              {/* <span className="me-3 fw-semibold fs-5">Payment Partners</span> */}
              <div>
                <img
                  src={amazon}
                  alt="amazon logo"
                  className={`${styles.partnersImg}`}
                />
                <img
                  src={express}
                  alt="express logo"
                  className={`${styles.partnersImg}`}
                />
                <img
                  src={paypal}
                  alt="paypal logo"
                  className={`${styles.partnersImg}`}
                />
                <img
                  src={mastercard}
                  alt="master logo"
                  className={`${styles.partnersImg}`}
                />
              </div>
            </div>
            <div className="col-md-6 store text-lg-end d-flex justify-content-end mt-4">
              <span className="me-3 fw-semibold mt-2">
                Get Deliveries with FreshCart
              </span>
              <div>
                <Link to="/">
                  <img
                    src={appStore}
                    alt="app store logo"
                    className={`${styles.app}`}
                  />
                </Link>
                <Link to="/">
                  <img
                    src={googlePlay}
                    alt="google play logo"
                    className={`${styles.google}`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
