import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../slices/api/auth/AuthApi";
import { useDispatch } from "react-redux";
import { logIn } from "../../slices/slice/auth/AuthSlice";
import LoaderSpinner from "../../const/widget_component_model/LoaderSpinner";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLogInMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    await login({ email, password }).then((data) => {
      if (data.error) {
        setError(data.error?.data?.message);
      }
      if (data.data) {
        const toStore = {
          user: data.data.userData,
          token: data?.data?.token,
        };
        dispatch(logIn(toStore));
        navigate("/dashboard");
      }
      if (error?.status === "FETCH_ERROR") {
        toast.error("Couldn't connect to server!!! Please try again later");
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <Toaster />
      {isLoading && <LoaderSpinner />}

      <div
        className="card shadow p-4"
        style={{ maxWidth: "350px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="my-3">
              <Link to="/">Forget Password ?</Link>
            </div>
          </div>
          {err && <div className="alert alert-danger">{err}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <hr />
          <p className="text-center">
            New User? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
