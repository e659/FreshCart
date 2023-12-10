import React, { useContext, useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import toast from "react-hot-toast";
import { WishListContext } from "../Context/wishListContext";
export default function FavoritIcon(props) {
  const [isActive, setIsActive] = useState(false);
 console.log(props)
  
  return (
    <>
      {isActive ? (
        <MdFavorite
          onClick={() => {
            setIsActive(!isActive);
          }}
        />
      ) : (
        <GrFavorite
          onClick={() => {
            setIsActive(!isActive);
          }}
        />
      )}
    </>
  );
}
