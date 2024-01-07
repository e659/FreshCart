import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import sockes from "../../../src/Assets/images/sockes.png";
import clothes from "../../../src/Assets/images/clothes-removebg-preview.png";
import glasses from "../../../src/Assets/images/glasses-removebg-preview.png";
import laptop from "../../../src/Assets/images/lap-removebg-preview.png";
import watch from "../../../src/Assets/images/watch-removebg-preview.png";
import heel from "../../../src/Assets/images/heel-removebg-preview.png";
import headphones from "../../../src/Assets/images/slide3-removebg-preview.png";
import bag from "../../../src/Assets/images/b1-removebg-preview.png";
import "./categorySlider.scss";
function CategorySlider() {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerPadding: "100px",
  };

  return (
    <>
      <h1 className="h5 fw-bold pt-5 pb-4">Get Your Favourite Products</h1>
      <Slider className="cursor-pointer" {...settings}>
        <div className="bg1 catg__div ">
          <img src={heel} alt="heels" className="w-50" />
        </div>
        <div className="bg2 catg__div ">
          <img src={watch} alt="watches" className="w-50" />
        </div>
        <div className="bg3 catg__div">
          <img src={bag} alt="bages" className="w-50" />
        </div>
        <div className="bg4 catg__div ">
          <img src={glasses} alt="glasses" className="w-50" />
        </div>
        <div className="bg5 catg__div">
          <img src={laptop} alt="electronic" className="w-50" />
        </div>
        <div className="bg6 catg__div ">
          <img src={clothes} alt="clothes" className="w-50" />
        </div>
        <div className="bg7 catg__div">
          <img src={sockes} alt="sockes" className="w-50" />
        </div>
        <div className="bg8 catg__div ">
          <img src={headphones} alt="headphones" className="w-50" />
        </div>
      </Slider>
    </>
  );
}

export default CategorySlider;
