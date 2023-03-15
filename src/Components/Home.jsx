import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Home() {
  const { data } = useContext(ChatContext);
  return (
    <div className="h-[50.7rem] md:h-[62.955rem] bg-[#020209] flex justify-center items-center">
      <div className="back h-[50.7rem] md:h-[62.955rem] w-[95rem] bg-[#212121] shadow-md flex ">
        <div
          className={`w-full md:w-1/3 bg-[#1d1f39] ${
            data.user?.displayName && "hidden md:block"
          }`}
        >
          <Sidebar />
        </div>

        {data && (
          <div
            className={`md:w-2/3 h-[] ${data.user?.displayName && "w-full"}`}
          >
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
