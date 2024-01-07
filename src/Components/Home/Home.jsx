import React from "react";
import styles from "./Home.module.css";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
            <title>Home</title>
            <meta name="description" content="Home Page" />
          </Helmet>
      <MainSlider />
      
      <div className="container py-3">
        <div className="row ">
          {/* <MainSlider /> */}
          <CategorySlider />
          <FeaturedProduct />
        </div>
      </div>
    </>
  );
}
