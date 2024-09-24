import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const { dispatch } = useContext(ChatContext);

  const handleChatSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    handleClose();
  };

  const handleKey = (e) => {
    e.code === ("Enter" || "Arrow") && handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [username]);

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      auth.currentUser.uid > user.uid
        ? auth.currentUser.uid + user.uid
        : user.uid + auth.currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            // photoURL: auth.currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setUsername("");
  };

  const handleClose = () => {
    setUser(null);
    setUsername("");
  };

  return (
    <div className="">
      <div className="flex items-center border-b-2 border-[#181818] gap-2 px-4">
        <img className="w-6 h-6" src="./Images/find.png" alt="" />
        <input
          className="w-full bg-transparent px-3 py-2 outline-none text-white"
          type="text"
          value={username}
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
        <img
          onClick={handleClose}
          className="w-5 cursor-pointer"
          src="./Images/close.png"
          alt=""
        />
      </div>
      {err && <span className="text-white">User not found!</span>}
      {console.log(user)}
      {user && (
        <div
          onClick={() => {
            handleSelect();
            handleChatSelect(user);
          }}
          className="cursor-pointer"
        >
          <div className="text-gray-300 px-4 my-2">1 Result Found</div>
          <div className="flex items-center gap-4 px-4 py-2 text-white border-b-2">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src="./Images/person.png"
                alt=""
              />
            </div>
            <div>{user.displayName}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
