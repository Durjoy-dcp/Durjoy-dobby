import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SingleImage from "./SingleImage";
import { useEffect } from "react";
import Spinner from "./Spinner";

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
        `https://durjoy-dobby.vercel.app/gallery?serachText=${serachText}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("dobby-token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  const handleToSerarch = (e) => {
    e.preventDefault();
    setSerachText(e.target.searchName.value);
  };
  useEffect(() => {
    refetch();
  }, [serachText]);
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <form
        action=""
        onSubmit={(e) => handleToSerarch(e)}
        className="container mx-auto my-2"
      >
        <input
          type="text"
          name="searchName"
          placeholder="Search by Name "
          className="border p-2 w-1/4 m-2"
        />
        <button className="btn btn-xs btn-info" type="submit">
          Search
        </button>
      </form>
      <div className="container mx-auto p-2">
        <div className="flex flex-wrap gap-20">
          {images.map((img) => (
            <SingleImage key={img._id} img={img}></SingleImage>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
