import React from "react";

const SingleImage = ({ img }) => {
  return (
    <div className="max-w-xs max-h-52 p-2 pb-5 m-2">
      <div className="card-container  shadow-lg  ">
        <img className="max-w-xs max-h-52 p-2 pb-5" src={img?.img} alt="" />
        <p className="card-name mx-2">{img.name}</p>
        <p className="card-name mx-2">{img.appliedTime}</p>
      </div>
    </div>
  );
};

export default SingleImage;
