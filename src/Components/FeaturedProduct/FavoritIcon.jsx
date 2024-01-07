import React, { useContext, useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import "./FeaturedProduct.scss";
export default function FavoritIcon() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      
      {isActive ? (
        <MdFavorite
          color="red"
          className="position-absolute cursor-pointer wishList__icon "
          style={{ left: "80%", top: "10px" }}
          onClick={() => {
            setIsActive(!isActive);
          }}
        />
      ) : (
        <GrFavorite
          className="position-absolute cursor-pointer wishList__icon "
          style={{ left: "80%", top: "10px" }}
          onClick={() => {
            setIsActive(!isActive);
          }}
        />
      )}
    </>
  );
}
