import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import authImg from "../assets/auth-animation.gif";
import Spinner from "./Spinner";
const Singup = () => {
  const { signup, setuser, setLoading, loading, authToken, setAuthToken } =
    useContext(AuthContext);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const handleToSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setMsg("Didn't match the passwords");
      return;
    }
    if (password.length < 8) {
      setMsg("Provide minimum 8 characters to set password");
      return;
    }
    signup(email, password)
      .then((res) => {
        console.log(res);
        if (res.status === 403) {
          res.json().then((data) => {
            setLoading(false);
            setMsg(data.message);
          });
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data?.email) {
          fetch(`https://durjoy-dobby.vercel.app/jwt?email=${data.email}`)
            .then((result) => result.json())
            .then((data2) => {
              if (data2?.accessToken) {
                // setuser(data);
                localStorage.setItem("dobby-token", data2.accessToken);
                setLoading(false);
                setAuthToken(data2.accessToken);
                navigate("/");
              }
              setLoading(false);
            });
        }
      });

    setMsg(null);
  };
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={authImg} className="max-w-sm " />
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl "
          onSubmit={(e) => handleToSignUp(e)}
        >
          <p className="text-center my-3">Sing Up</p>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                className="input input-bordered"
              />
            </div>
            {msg !== null && <p className="text-xs text-red-700">{msg}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Sign Up
              </button>
              <p className="my-2">
                {" "}
                Already have an account?{" "}
                <Link className="text-green-600" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Singup;
