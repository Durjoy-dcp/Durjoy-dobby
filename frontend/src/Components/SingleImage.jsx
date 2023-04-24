import React from "react";

const SingleImage = ({ img }) => {
  return (
    <div>
      <img src={img?.img} alt="" />
    </div>
  );
};

export default SingleImage;
