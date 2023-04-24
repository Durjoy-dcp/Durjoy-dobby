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
        `http://localhost:5000/gallery?serachText=${serachText}&&email=${user?.email}`,
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
      <form action="" onSubmit={(e) => handleToSerarch(e)}>
        <input type="text" name="searchName" placeholder="Search by Name " />
        <button className="btn btn-xs btn-info" type="submit">
          Search
        </button>
      </form>

      {images.map((img) => (
        <SingleImage key={img._id} img={img}></SingleImage>
      ))}
    </div>
  );
};

export default Gallery;
