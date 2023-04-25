import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import img from "../assets/img-animation.gif";
import { AuthContext } from "../Context/AuthProvider";
import Spinner from "./Spinner";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        <div className="hero min-h-screen bg-base-100">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={img} className="max-w-sm " />
            <div>
              <h1 className="text-5xl font-bold">Dobby Images</h1>
              <p className="py-6">
                <span className="text-2xl font-bold italic text-red-500">
                  Join today !{" "}
                </span>{" "}
                to store images & create memories.
              </p>
              {!user ? (
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              ) : (
                <Link to="/imageupload" className="btn btn-primary">
                  {" "}
                  Upload Image
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
