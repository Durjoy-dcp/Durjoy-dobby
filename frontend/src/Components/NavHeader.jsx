import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const NavHeader = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlerToLogOut = () => {
    logOut().then(() => {
      localStorage.removeItem("dobby-token");
      navigate("/");
    });
  };
  const storeToken = localStorage.getItem("dobby-token") || null;
  return (
    <div>
      <div className="navbar bg-base-100 container mx-auto ">
        <div className="flex-1">
          <Link to="/" className="  font-bold text-xl">
            Dobby Images
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {storeToken !== null ? (
              <div className="flex gap-7">
                <Link to="/imageupload">Upload Image</Link>
                <Link to="/gallery">Gallery</Link>

                <button
                  className="btn btn-xs btn-error"
                  onClick={handlerToLogOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                {" "}
                <Link to="/login">Login</Link>{" "}
                <Link to="/signup" className="">
                  Sign up
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
