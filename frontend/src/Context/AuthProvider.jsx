import React, { useEffect, useState } from "react";
import { createContext } from "react";
import app from "../Firebase/firebase-init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState("");
  const [loading, setLoading] = useState(true);
  const signup = (email, password) => {
    setLoading(true);
    const info = { email, password };
    return fetch("http://localhost:5000/createuser", {
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
    return fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const logOut = () => {
    return signOut(auth);
  };
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setuser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);
  const authInfo = {
    user,
    loading,
    setLoading,
    signup,
    login,
    logOut,
    setuser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
