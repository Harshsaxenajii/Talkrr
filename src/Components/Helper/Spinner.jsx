import React from "react";

function Spinner() {
  return (
    <div className="h-screen bg-gradient-to-r from-cyan-600 to-cyan-100 flex justify-center items-center">
      <div className="h-[55rem] w-[95rem] bg-white  rounded-2xl p-12 shadow-md flex justify-center items-center">
        <img className="w-60" src="./Images/loading.gif " alt="" />
        <div className="text-cyan-500">We will back soon.</div>
      </div>
    </div>
  );
}

export default Spinner;
