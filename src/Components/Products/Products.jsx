import axios from "axios";
import { Helmet } from "react-helmet";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../Redux/actions/cartActions";
import FavoritIcon from "../FeaturedProduct/FavoritIcon";
import { addToWishListAction } from "../../Redux/actions/wishListAction";
import "./Products.scss";
import Filters from "../Filters/Filters";
import { FiltersState } from "../Context/filterContext";
import { FilterContext } from "../Context/filterContext";
export default function Products() {
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  function getFeaturedProducts(pageNum = 1) {
    window.scrollTo({ top: 80, left: 0, behavior: "smooth" });
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  // usingReactQuery
  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ["getFeaturedProducts", page],
    queryFn: () => getFeaturedProducts(page),
    keepPreviousData: true,
  });
  // console.log(data);

  // addToCart
  const addToCart = (prodId) => {
    dispatch(addToCartAction(prodId));
  };
  // addProductToWishList
  const addToWishList = (prodId) => {
    dispatch(addToWishListAction(prodId));
  };

  const {
    productState: { sort, byRating, searchQuery, category },
  } = FiltersState();

  const transformProducts = () => {
    let sortedProducts = data?.data.data;
    // console.log(sortedProducts);
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) =>
   
      // prod.ratings >= byRating
       Math.round(prod.ratingsAverage) ==byRating
      )
    }

    if (category) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.category.name.includes(category)
      );
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <main className="container main my-5 py-5">
          <h1 className="h5 fw-bold">Get Your Favourite Products</h1>
          <div className="row g-4 my-2">
            {/* using helmet */}
            <Helmet>
              <meta charSet="utf-8" />
              <meta name="description" content="Products Page" />
              <title>Products</title>
            </Helmet>
            <div className="col-md-2">
              <Filters />
            </div>
            <div className="col-md-10">
              <div className="row g-4 my-2">
                {transformProducts().map((product) => {
                  return (
                    <div className="col-md-2 col-lg-2" key={product.id}>
                      <div className="product rounded-2 prCard shadow overflow-hidden position-relative">
                        <span onClick={() => addToWishList(product._id)}>
                          {" "}
                          <FavoritIcon />
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
                            <span className="fw-semibold">
                              {product.price} EGP
                            </span>
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
            </div>
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
