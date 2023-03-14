import React, { useEffect, useContext, useRef } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { user } = useUserAuth();
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const ExactTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    let hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    return hours + ":" + minutes;
  };

  return (
    <div ref={ref} className="text-white flex flex-col gap-4 mx-2">
      {message.senderId === data.user.uid && (
        <div className="flex flex-col my-2">
          <message className="bg-sky-700 px-3 py-2 w-fit rounded-xl flex flex-col items-end">
            <span>{message.text}</span>
          </message>
        </div>
      )}
      {message.senderId === user.uid && (
        <div className="flex flex-col justify-end items-end">
          <message className="bg-orange-600 px-3 rounded-xl py-2 w-fit flex flex-col my-2">
            <span>{message.text}</span>
            <span className="text-[10px] text-gray-400">
              {ExactTime(message.date.seconds)}
            </span>
          </message>
        </div>
      )}
    </div>
  );
};

export default Message;
