import React from "react";
import styles from "./Home.module.css";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  return (
    <>
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
