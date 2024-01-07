import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "./FeaturedProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../Redux/actions/cartActions";
import FavoritIcon from "./FavoritIcon";
import { addToWishListAction } from "../../Redux/actions/wishListAction";
import { wishlistContext } from "../Context/wishListContext";
import toast from "react-hot-toast";
export default function FeaturedProduct() {
  const { wishlistCount, addProductToWishlist } = useContext(wishlistContext);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  function getFeaturedProducts(pageNum = 1) {
    window.scrollTo({ top: 1000, left: 0, behavior: "smooth" });
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }
  // usingReactQuery
  // let { data, isLoading ,isPreviousDat} = useQuery("featuredProdects", getFeaturedProducts);
  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ["getFeaturedProducts", page],
    queryFn: () => getFeaturedProducts(page),
    keepPreviousData: true,
  });
  // console.log(data?.data.data);
  // addToCart
  const addToCart = (prodId) => {
    dispatch(addToCartAction(prodId));
  };
  // addProductToWishList
  // const addToWishList = (prodId) => {
  //   dispatch(addToWishListAction(prodId));
  // };
  async function addwishlistItem(id) {
    let response = await addProductToWishlist(id);
    if (response?.data.status === "success") {
      toast.success("Product added successfully to your wishlist", {
        duration: 3500,
      });
      // displayWishlistItems();
    } else {
      toast.error("error in removing the product from your wishlist", {
        duration: 3500,
      });
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
            {/* using helmet */}
            <Helmet>
              <meta charSet="utf-8" />
              <meta name="description" content="Home Page" />
            </Helmet>
            {data?.data.data.map((product) => {
              return (
                <div className="col-md-2 col-lg-2" key={product.id}>
                  <div className="product rounded-2 prCard shadow overflow-hidden position-relative">
                    <span onClick={() => addwishlistItem(product._id)}>
                      {" "}
                      <FavoritIcon className="wishList__icon"/>
                    </span>

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
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link cursor-pointer text-main fw-semibold"
                  aria-label="Next"
                  onClick={() => {
                    if (!isPreviousData || data.next) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={page === 2}
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
