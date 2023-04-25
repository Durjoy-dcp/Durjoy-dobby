import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState("");
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const signup = (email, password) => {
    setLoading(true);
    const info = { email, password };
    return fetch("https://durjoy-dobby.vercel.app/createuser", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const login = (email, password) => {
    setLoading(true);
    const info = { email, password };
    return fetch("https://durjoy-dobby.vercel.app/login", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const unsubscribe = () => {
      // check if a JWT is present in local storage
      const authToken = localStorage.getItem("dobby-token");
      if (authToken) {
        // validate the JWT and set the user if it is valid
        fetch("https://durjoy-dobby.vercel.app/validate", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Invalid token");
            }
          })
          .then((data) => {
            setuser(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };
    return () => unsubscribe();
  }, [authToken]);

  const authInfo = {
    user,
    loading,
    setLoading,
    signup,
    login,
    authToken,
    setAuthToken,
    setuser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
