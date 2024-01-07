import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./Categories.scss";
import { InfinitySpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";
export default function Categories() {
  // getAllCategories
  function getAllCaterories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  // // useUseQuery
  let { data, isLoading } = useQuery("CategoriesSlider", getAllCaterories);
  console.log(data?.data.data);
  return (
    <>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <div className="container py-5">
          <Helmet>
            <title>Categories</title>
            <meta name="description" content="Categories Page" />
          </Helmet>
          <div className="row g-3 py-5 cat__row">
            {data?.data.data
              ? data?.data.data?.map((category) => (
                  <div
                    className="col-md-3 position-relative Categories"
                    key={category._id}
                  >
                    <div className="cat_layout cursor-pointer"></div>
                    <h5 className="cat___name cursor-pointer">
                      {category.name}
                    </h5>
                    <img
                      className="Cat__img cursor-pointer"
                      src={category.image}
                      alt={category.name}
                    />
                  </div>
                ))
              : ""}
          </div>
        </div>
      )}
    </>
  );
}
