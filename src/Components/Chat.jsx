import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div>
      {data.user?.displayName && (
        <div>
          <div className="flex bg-[#0a0026] px-4 py-5 justify-between">
            <div className="flex gap-6">
              <img
                className="w-12 h-12 rounded-full"
                src="./Images/person.png"
                alt=""
              />
              <div className=" text-white flex flex-col justify-center gap-1">
                <div className="text-base">{data.user?.displayName}</div>
                {/* <div className="text-xs">Last Seen: 12/Nov/2023</div> */}
              </div>
            </div>
            <div className="flex gap-4">
              <img
                className="p-1 w-10 h-10 cursor-pointer"
                src="./Images/camera.png"
                alt=""
              />
              <img
                className=" cursor-pointer first-line:w-10 h-10 rotate-90"
                src="./Images/menu.png"
                alt=""
              />
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      )}
    </div>
  );
}

export default Chat;
