import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const { user } = useUserAuth();
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = async () => {
      const unsub = await onSnapshot(
        doc(db, "userChats", auth.currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    getChats();
  }, [user]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="theScroller overflow-y-scroll h-[44.8rem] md:h-[56.8rem]">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="flex gap-4 items-center text-gray-200 px-4 py-3 hover:bg-gray-900 cursor-pointer"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src="./Images/person.png"
                alt=""
              />
            </div>
            <div>
              <div>{chat[1].userInfo.displayName}</div>
              <div>{chat[1].lastMessage?.text}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
