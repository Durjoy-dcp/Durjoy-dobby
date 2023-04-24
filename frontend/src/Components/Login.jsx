import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import Spinner from "./Spinner";
import authImg from "../assets/auth-animation.gif";
const Login = () => {
  const { login, loading, seLoading } = useContext(AuthContext);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const handleToLogin = (e) => {
    seLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((res) => {
        fetch(`http://localhost:5000/jwt?email=${res.user.email}`)
          .then((result) => result.json())
          .then((data) => {
            if (data?.accessToken) {
              localStorage.setItem("dobby-token", data.accessToken);

              navigate("/");
              seLoading(false);
            }
          });
      })
      .catch((err) => {
        setMsg(err.message);
        seLoading(false);
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
          onSubmit={(e) => handleToLogin(e)}
        >
          <p className="text-center my-3">Login</p>
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

            {msg !== null && <p className="text-xs text-red-700">{msg}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              <p className="my-2">
                {" "}
                No account?{" "}
                <Link className="text-green-600" to="/signup">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
