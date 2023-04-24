import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Components/Spinner";
import { AuthContext } from "./Context/AuthProvider";

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const storeToken = localStorage.getItem("dobby-token") || null;
  if (user && storeToken !== null) {
    return children;
  }
  if (loading) {
    return <Spinner></Spinner>;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Private;
