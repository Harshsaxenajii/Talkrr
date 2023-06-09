import React from "react";

function Spinner() {
  return (
    <div>
      <div className="newBack h-screen flex justify-center items-center ">
        <div className=" h-[50rem] w-[60rem] border-blue-900 border-2 rounded-md bg-[#1d1f39] items-center justify-center  flex flex-col">
          <img className="w-32" src="./Images/load.gif" alt="" />
          <div className="text-gray-400 text-center">Please Wait</div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
