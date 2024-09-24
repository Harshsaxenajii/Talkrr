import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";

function Register() {
  const [displayName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      // Create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: displayName,
        email: email,
        password: password,
      });

      // Create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-3">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-black border-[1px] hover:text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 transition ease-in-out"
          >
            Register
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/Login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
