import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const handleToLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => navigate("/"))
      .catch((err) => setMsg(err.message));
    setMsg(null);
  };
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl "
          onSubmit={(e) => handleToLogin(e)}
        >
          <p className="text-center">Login</p>
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
