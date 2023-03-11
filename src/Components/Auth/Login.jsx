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
    <div className="h-screen bg-gradient-to-r from-cyan-600 to-cyan-100 flex justify-center items-center">
      <div className="h-[55rem] w-[95rem] bg-white rounded-2xl p-12 shadow-md flex justify-center items-center divide-x-2">
        <section className="w-1/2 flex flex-col justify-center items-center h-full">
          <div className="text-6xl text-cyan-500">Please Login Here </div>
        </section>
        <section className="w-1/2 flex flex-col justify-center items-center h-full">
          <form action="" className="flex flex-col gap-4 justify-center ">
            {error && (
              <div className="w-full border-2 py-3 px-4 border-red-600 bg-red-200 text-gray-500 rounded-3xl">
                {error}
              </div>
            )}
            <input
              // className="border-cyan-400 border-2 py-3 px-4 w-96 rounded-3xl"
              class="outline-none border-cyan-400 border-2 py-3 px-4 w-96 rounded-3xl"
              placeholder="Enter Your Email Name"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name=""
              id=""
            />
            <input
              className="outline-none border-cyan-400 border-2 py-3 px-4 w-96 rounded-3xl"
              placeholder="Enter Your Password Name"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name=""
              id=""
            />
            <Link to="/Register">
              <div className="py-3 px-4 text-sm text-cyan-400">
                New Customer ? Regiser Now.
              </div>
            </Link>
            <button
              onClick={handleSubmit}
              className="text-white bg-gradient-to-l from-cyan-600 to-cyan-300 py-3 px-4 w-96 rounded-3xl"
            >
              Comfirm With Your Details
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="text-white bg-gradient-to-l from-cyan-600 to-cyan-300 py-3 px-4 w-96 rounded-3xl"
            >
              Sign In With Google
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
