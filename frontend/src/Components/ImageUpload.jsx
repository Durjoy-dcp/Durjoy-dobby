import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const ImageUpload = () => {
  const { user, loading, seLoading } = useContext(AuthContext);
  const imageHostKey = import.meta.env.VITE_APP_imgbb;
  const navigate = useNavigate();
  const handleAddProduct = (e) => {
    e.preventDefault();
    const img = e.target.image.files[0];
    const name = e.target.name.value;
    const formData = new FormData();

    formData.append("image", img);
    seLoading(true);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          console.log(imageData);
          const imgInfo = {
            name,
            img: imageData.data.url,
            email: user?.email,
          };

          fetch(`http://localhost:5000/uploadimage?email=${user.email}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("dobby-token")}`,
            },
            body: JSON.stringify(imgInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                navigate("/gallery");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };
  return (
    <div>
      <form onSubmit={(e) => handleAddProduct(e)}>
        <input type="text" name="name" placeholder="Name" />
        <input type="file" name="image" />

        <button className="btn btn-xs btn-info" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
