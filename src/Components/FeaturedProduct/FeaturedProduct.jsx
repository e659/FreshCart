import axios from "axios";
import toast from "react-hot-toast";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import "./FeaturedProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../Redux/actions/cartActions";
import { WishListContext } from "../Context/wishListContext";
import FavoritIcon from "./FavoritIcon";

export default function FeaturedProduct() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  let { addToWishList } = useContext(WishListContext);
  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  // usingReactQuery
  let { data, isLoading } = useQuery("featuredProdects", getFeaturedProducts);
  // console.log(data?.data.data);
  // addToCart
  const addToCart = (prodId) => {
    dispatch(addToCartAction(prodId));
  };
  // addProductToWishList
  async function addProductToWishList(prodId) {
    let { data } = await addToWishList(prodId);
    console.log(data);
    setIsActive(!isActive);
    if (data.status === "success") {
      toast.success("Product added successfully to your wishlist", {
        duration: 2000,
        position: "top-center",
        style: {
          maxWidth: "500px",
        },
      });
    } else {
      toast.error("Product not added to your wishlist");
    }
  }
  return (
    <>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <main className="container main my-5">
          <h1 className="h5 fw-bold">Get Your Favourite Products</h1>
          <div className="row g-4 my-2">
            {data?.data.data.map((product) => {
              return (
                <div className="col-md-2 col-lg-2" key={product.id}>
                  <div className="product rounded-2 prCard shadow overflow-hidden position-relative">
                    <FavoritIcon
                      addToFav={addProductToWishList}
                    />

                    <Link to={`ProductDetails/${product._id}`}>
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-100"
                      />
                      <span className="text-main px-3">
                        {product.category.name}
                      </span>
                      <h2 className="text-muted h5 fw-semibold px-3 cursor-pointer">
                        {product.title.split(" ").splice(0, 2).join(" ")}
                      </h2>
                      <div className="d-flex justify-content-between align-items-center p-3">
                        <span className="fw-semibold">{product.price} EGP</span>
                        <span className=" d-inline-block">
                          <i className="fa-solid fa-star rating-color me-2"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => addToCart(product._id)}
                      className="btn bg-main text-light d-block w-75 mx-auto m-3"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <nav aria-label="Page navigation example" className="my-5">
            <ul className="pagination justify-content-center">
              <li className="page-item ">
                <button
                  className="page-link cursor-pointer text-main fw-semibold"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link cursor-pointer text-main fw-semibold"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </main>
      )}
    </>
  );
}
