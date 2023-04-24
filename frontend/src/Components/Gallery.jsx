import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SingleImage from "./SingleImage";

const Gallery = () => {
  const [serachText, setSerachText] = useState("");
  const { user } = useContext(AuthContext);
  const {
    data: images = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/gallery?serachText=${serachText}&&email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      {images.map((img) => (
        <SingleImage key={img._id} img={img}></SingleImage>
      ))}
    </div>
  );
};

export default Gallery;
