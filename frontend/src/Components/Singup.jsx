import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Singup = () => {
  const { signup } = useContext(AuthContext);
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
    signup(email, password).then((res) => {
      fetch(`http://localhost:5000/jwt?email=${res.user.email}`)
        .then((result) => result.json())
        .then((data) => {
          if (data?.accessToken) {
            localStorage.setItem("dobby-token", data.accessToken);
            navigate("/");
          }
        });
    });
    setMsg(null);
  };
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl "
          onSubmit={(e) => handleToSignUp(e)}
        >
          <p className="text-center">Sing Up</p>
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
