import React, { useContext, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { user } = useUserAuth();
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text === "") {
      return;
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  return (
    // <div className="fixed w-full my-2 mx-4 border-2">
    //   <div className="flex w-full justify-between items-center gap-4">
    //     <div>
    //       <img className="w-8" src="./Images/attachments.png" alt="" />
    //     </div>
    //     <div className="bg-[#0a0026] w-full flex items-center rounded-xl">
    //       <input
    //         className=" bg-transparent w-full p-3 outline-none text-white"
    //         type="text"
    //         placeholder="Enter Everything In Your Mind"
    //         onChange={(e) => setText(e.target.value)}
    //         value={text}
    //         onKeyDown={handleKey}
    //       />
    //     </div>
    //     <div>
    //       <img
    //         className="w-10"
    //         src="./Images/send.png"
    //         alt=""
    //         onClick={handleSend}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className=" h-[9vh] md:h-[6vh] flex justify-center items-center">
      <div className="bg-[#0a0026] w-full flex items-center rounded-xl justify-around px-4 ">
        <div>
          <img className="w-8" src="./Images/attachments.png" alt="" />
        </div>
        <input
          className=" bg-transparent px-4 py-5 w-[85%] outline-none text-white"
          type="text"
          placeholder="Enter Everything In Your Mind"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleKey}
        />
        <div>
          <img
            className="w-10"
            src="./Images/send.png"
            alt=""
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

export default Input;
