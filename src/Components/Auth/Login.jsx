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
    <div>
      <div className="newBack  h-[50.7rem] md:h-[62.955rem] flex justify-center items-center  ">
        <div className=" md:h-[50rem] w-[23rem] h-[36rem] md:w-[60rem] border-blue-900 border-2 rounded-md bg-[#1d1f39] items-center justify-center  flex flex-col">
          <form action="" className="flex flex-col gap-4 justify-center">
            <div className="flex gap-6 mb-12">
              <div className="text-cyan-500 text-4xl md:text-6xl">
                Login With Talkrr
              </div>
            </div>
            {error && (
              <div className="w-full py-1 px-3  bg-red-600 text-gray-200">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className=" text-gray-300">Email</div>
              <input
                className="outline-none border-blue-700 border-2 py-1 px-2 w-60 md:w-96 "
                placeholder="Enter Your Email Name"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className=" text-gray-300">Password</div>
              <input
                className="outline-none border-blue-700 border-2 py-1 px-2 w-60 md:w-96 "
                placeholder="Enter Your Password Name"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                id=""
              />
            </div>
            <Link to="/Register">
              <div className="py-3  text-sm text-cyan-400">
                New Customer ? Regiser Now.
              </div>
            </Link>
            <button
              onClick={handleGoogleSignIn}
              className="text-white bg-gradient-to-l w-6 "
            >
              <img src="./Images/google.png" alt="" />
            </button>
            <button
              onClick={handleSubmit}
              className="text-white bg-gradient-to-l from-black to-[#0a0026] hover:to-black hover:from-[#0a0026] transition-all delay-75 ease-in-out py-1 px-2 w-60 md:w-96"
            >
              Comfirm With Your Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
