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
    <div className="h-screen bg-gradient-to-r from-cyan-600 to-cyan-100 flex justify-center items-center">
      <div className="h-[55rem] w-[95rem] bg-white  rounded-2xl p-12 shadow-md flex justify-center items-center divide-x-2">
        <section className="w-1/2 flex flex-col justify-center items-center h-full">
          <div className="text-6xl text-cyan-500">Please Register Here </div>
        </section>
        <section className="w-1/2 flex flex-col justify-center items-center h-full">
          <form action="" className="flex flex-col gap-4">
            {error && (
              <div className="w-full border-2 py-3 px-4 border-red-600 bg-red-200 text-gray-500 rounded-3xl">
                {error}
              </div>
            )}
            <input
              className="outline-none border-cyan-400 border-2 py-3 px-4 w-96 rounded-3xl"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <input
              class="outline-none border-cyan-400 border-2 py-3 px-4 w-96 rounded-3xl"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Name"
              type="text"
            />
            <input
              className="outline-none border-cyan-400 border-2 py-3 px-4 w-96 rounded-3xl"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password Name"
              type="password"
            />
            <div className="cursor-pointer outline-none border-cyan-400 border-2 py-3 px-4 w-96 rounded-3xl">
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
            <Link to="/login">
              <div className="py-3 px-4 text-sm text-cyan-400">
                Already Register ? Login Now.
              </div>
            </Link>
            <button
              onClick={handleSubmit}
              className="text-white bg-gradient-to-l from-cyan-600 to-cyan-300 py-3 px-4 w-96 rounded-3xl"
            >
              Comfirm With Your Details
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
