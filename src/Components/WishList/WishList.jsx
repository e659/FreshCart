
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { wishlistContext } from "../Context/wishListContext";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../Redux/actions/cartActions";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import "./wishList.scss";
export default function Wishlist() {
  const { getLoggedUserWishlist, deleteWishlistItem } =
    useContext(wishlistContext);
  let [isLoading, setLoading] = useState(true);
  let [wishlistDetails, setWishlistDetails] = useState(null);
  const dispatch = useDispatch();
  async function displayWishlistItems() {
    const response = await getLoggedUserWishlist();
    setLoading(false);
    if (response?.data.status === "success") {
      setWishlistDetails(response?.data);
    }
    return wishlistDetails;
  }

  async function removewishlistItem(id) {
    let response = await deleteWishlistItem(id);
    if (response?.data.status === "success") {
      toast.success("Product removed successfully from your wishlist", {
        duration: 3500,
      });
      displayWishlistItems();
    } else {
      toast.error("error in removing the product from your wishlist", {
        duration: 3500,
      });
    }
  }

  // addToCart
  const addToCart = (prodId) => {
    dispatch(addToCartAction(prodId));
  };
  useEffect(() => {
    displayWishlistItems();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center overlay">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : wishlistDetails === null ? (
        <h1 className="h3 fw-bolder my-4">Your Wishlist is empty</h1>
      ) : (
        <>
          <Helmet>
            <title>Wishlist</title>
            <meta name="description" content="Wishlist Page" />
          </Helmet>
          <div className="bg-body-tertiary py-5 px-4 mt-5">
            <h1 className="h3 fw-bolder mb-4">Wishlist</h1>

            <h2 className="h6 fw-bold mt-2">
              Total number of items:{" "}
              <span className="text-main">{wishlistDetails.count}</span>
            </h2>
            <div className="row g-4 my-2">
            {wishlistDetails.data.map((product) => {
              return (
                <div className="col-md-2 col-lg-2" key={product.id}>
                  <div className="product h-100 rounded-2 prCard shadow overflow-hidden position-relative">
                    <IoMdCloseCircle
                      onClick={() => removewishlistItem(product._id)}
                      className="position-absolute cursor-pointer wish__del"
                      style={{ left: "92%",color:"#4fa94d"  }}
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
          </div>
        </>
      )}
    </>
  );
}
