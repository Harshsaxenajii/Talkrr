import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="h-screen bg-[#181818] flex justify-center items-center">
      <div className="back h-screen w-[95rem] bg-[#212121]  shadow-md flex ">
        <div className="w-1/3 bg-[#212121]  h-full">
          <Sidebar />
        </div>
        <div className="w-2/3">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Home;
