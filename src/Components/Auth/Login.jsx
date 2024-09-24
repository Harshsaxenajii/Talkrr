import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Login to Talkrr
        </h2>
        {error && (
          <div className="bg-red-500 text-white py-2 px-4 rounded">{error}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="user"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="/Register"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              New user? Register now
            </Link>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 transition ease-in-out"
            >
              <img
                src="./Images/google.png"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            <button
              type="submit"
              className=" w-full bg-indigo-600 text-black border-[1px] hover:text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 transition ease-in-out"
            >
              Login with your credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
