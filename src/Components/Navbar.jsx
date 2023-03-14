import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut(user);
    navigate("/login");
  };

  const NavItems = (props) => {
    return (
      <div
        onClick={props.work}
        className="bg-[#0a0026] py-1 px-3 cursor-pointer hover:bg-slate-900"
      >
        {props.title}
      </div>
    );
  };
  return (
    <div className="flex justify-between px-4 py-3 bg-[#0a0026]  text-gray-300 relative">
      <div className="text-gray-300 text-lg">Talkrr</div>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="cursor-pointer"
      >
        <img src="./Images/setting.png" alt="" />
      </div>
      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute top-9 right-0 w-28 py-3 transition-all delay-100 ease-in-out"
        >
          {user && <NavItems title={user.displayName} work={null} />}
          <NavItems title={"Profile"} work={null} />
          <NavItems title={"Report Bug"} work={null} />
          {user && <NavItems title={"Logout"} work={handleLogOut} />}
          <NavItems title={"Setting"} work={null} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
