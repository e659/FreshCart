import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline, Online } from "react-detect-offline";
export default function Layout() {
  return (
    <>
      <Navbar />

      <Outlet></Outlet>
      <div>
        <Offline>
          <div className="network">
            <i className="fa fa-wifi px-2"></i>
            You Are Offline
          </div>
        </Offline>
      </div>

      <Footer />
    </>
  );
}
