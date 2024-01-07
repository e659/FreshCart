import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
      
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;

// import React from "react";
// import Box from "@mui/material/Box";
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// // import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// const Ratingg = ({ rating, onClick, style }) => {

//   return (
//     <Stack spacing={10}>
//     <Rating
   
//      name="half-rating" defaultValue={2} precision={0.1}
//      onClick={() => onClick()}
//       />
 
//   </Stack>
//   );
// };

// export default Ratingg;
