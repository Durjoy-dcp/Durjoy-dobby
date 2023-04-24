import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const ImageUpload = () => {
  const { user } = useContext(AuthContext);
  const [upload, setUpload] = useState(false);
  const imageHostKey = import.meta.env.VITE_APP_imgbb;
  const handleAddProduct = (e) => {
    e.preventDefault();
    const img = e.target.image.files[0];
    const name = e.target.name.value;
    const formData = new FormData();
    formData.append("image", img);

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

          fetch("http://localhost:5000/uploadimage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(imgInfo),
          })
            .then((res) => res.json())
            .then((result) => console.log(result));
        }
      });
  };
  return (
    <div>
      <form onSubmit={(e) => handleAddProduct(e)}>
        <input type="text" name="name" placeholder="Name" />
        <input
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          name="image"
        />
        <button className="btn btn-xs btn-info">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
