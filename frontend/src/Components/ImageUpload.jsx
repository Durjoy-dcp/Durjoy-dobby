import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import Spinner from "./Spinner";
import uploadAnimation from "../assets/upload-files-animation.gif";

const ImageUpload = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const imageHostKey = import.meta.env.VITE_APP_imgbb;
  const navigate = useNavigate();
  // setLoading(false);
  const handleAddProduct = (e) => {
    e.preventDefault();
    const img = e.target.image.files[0];
    const name = e.target.name.value;
    const formData = new FormData();

    formData.append("image", img);
    setLoading(true);
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
          };

          fetch(`http://localhost:5000/uploadimage`, {
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
                setLoading(false);
                navigate("/gallery");
              }
            })
            .catch((err) => {
              setLoading(false);
            });
        }
      });
  };
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content">
        <div>
          <img src={uploadAnimation} className="max-w-sm " />{" "}
          <p className="py-6 text-2xl font-bold italic text-red-500">
            Upload your images daily & create Story
          </p>
        </div>
        <form onSubmit={(e) => handleAddProduct(e)} className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Image Title"
            className="border my-2"
          />
          <input type="file" name="image" className="my-2" />

          <button className="btn btn-xs btn-info" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
