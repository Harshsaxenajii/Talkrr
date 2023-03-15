import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";

function Register() {
  const [displayName, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signUp(email, password);

      await updateProfile(res.user, {
        displayName,
      });

      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: displayName,
        email: email,
        password: password,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="newBack  h-[50.7rem] md:h-[62.955rem] flex justify-center items-center ">
      <div className="md:h-[50rem] w-[23rem] h-[36rem] md:w-[60rem] border-blue-900 border-2 rounded-md bg-[#1d1f39] items-center justify-center  flex flex-col relative">
        <form action="" className="flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-6 mb-12">
            <div className="text-cyan-500 text-4xl md:text-6xl">SignUp Here</div>
          </div>
          {error && (
            <div className="w-full py-1 px-3  bg-red-600 text-gray-200">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <div className=" text-gray-300">Your Name</div>
            <input
              className="outline-none border-blue-700 border-2 py-1 px-2 w-60 md:w-96 "
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className=" text-gray-300">Email</div>
            <input
              className="outline-none border-blue-700 border-2 py-1 px-2 w-60 md:w-96  "
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
          <div className="cursor-pointer  outline-none py-1 my-1 text-cyan-200 w-60 md:w-96">
            <input style={{ display: "none" }} type="file" id="file" />
            <label
              className="flex gap-4 items-center cursor-pointer"
              htmlFor="file"
            >
              <img
                className="w-8 h-8 rounded-full border-2"
                src="./Images/person.png"
                alt=""
              />
              <span>Add an Avatar</span>
            </label>
          </div>
          <Link to="/Login">
            <div className="py-3  text-sm text-cyan-400">
              Already Register ? Login Now.
            </div>
          </Link>

          <button
            onClick={handleSubmit}
            className="text-white bg-gradient-to-l from-black to-[#0a0026] hover:to-black hover:from-[#0a0026] transition-all delay-75 ease-in-out py-1 px-2 w-60 md:w-96"
          >
            Comfirm With Your Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
