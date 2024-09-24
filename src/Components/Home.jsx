import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Home() {
  const { data } = useContext(ChatContext);
  return (
    <div className="h-[100vh] bg-[#020209] flex justify-center items-center overflow-hidden">
      <div className=" relative h-[100vh] w-[95rem] bg-white shadow-md flex ">
        <div
          className={`w-full md:w-1/3 bg-[#1d1f39] z-20 ${
            data.user?.displayName && "hidden md:block"
          }`}
        >
          <Sidebar />
        </div>

        <img className="absolute h-[100vh] w-[100vw]" src="./Images/bg2.jpg" />
        {data && (
          <div
            className={`md:w-2/3 z-10 ${data.user?.displayName && "w-full"}`}
          >
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
