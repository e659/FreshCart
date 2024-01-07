import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../Redux/actions/cartActions";
import "./productDetails.scss";
function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const dispatch = useDispatch();
  // get spesific product
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  // usingReactQuery
  let { data, isLoading } = useQuery("productDetails", () =>
    getProductDetails(productId)
  );

  // addToCart
  const addToCart = (prodId) => {
    dispatch(addToCartAction(prodId));
  };
  const settings = {
    customPaging: function (i) {
      for (let i = 0; i < data?.data.data.images.length; i++) {}
      return (
        <a href="">
          <img
            src={data?.data.data.images[i]}
            alt=""
            height={50}
            className=""
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {data?.data.data ? (
        <div className="container py-5">
          <div className="row py-5 align-items-center">
            {/* using helmet */}
            <Helmet>
              <meta charSet="utf-8" />
              <meta name="description" content="Product Details Page" />
              <title>{data?.data.data.title}</title>
            </Helmet>
            <div className="col-md-4 pt-5">
              <Slider {...settings}>
                {data?.data.data.images?.map((img) => (
                  <img
                    key={data?.data.data._id}
                    className="cursor-pointer w-100 rounded"
                    height={200}
                    src={img}
                    alt={data?.data.data.title}
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-8 pt-5 prod___Details">
              <div className="prodDes">
                <h2 className="h5">{data?.data.data.title}</h2>
                <p className="">{data?.data.data.description}</p>
              </div>
              <h6 className="text-main">{data?.data.data.category?.name}</h6>

              <div className="d-flex justify-content-between">
                <h6 className="text-main">
                  <span className="text-dark">Price: </span>
                  {data?.data.data.price}EGP
                </h6>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {data?.data.data.ratingsAverage}{" "}
                </span>
              </div>
              <button
                onClick={() => addToCart(data?.data.data._id)}
                className="btn bg-main w-100 text-white mt-2"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
    </>
  );
}

export default ProductDetails;
