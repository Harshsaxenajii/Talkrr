import React from "react";
import Search from "./Search";
import Navbar from "./Navbar";
import Chats from "./Chats";

function Sidebar() {
  return (
    <div className="theScroller h-full overflow-y-auto">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}

export default Sidebar;
