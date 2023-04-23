import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const NavHeader = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlerToLogOut = () => {
    logOut().then(() => navigate("/"));
  };
  return (
    <div>
      <div className="navbar bg-base-100 container mx-auto ">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {user && user.uid ? (
              <button
                className="btn btn-xs btn-error"
                onClick={handlerToLogOut}
              >
                Logout
              </button>
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
