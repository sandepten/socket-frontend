import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";

interface Props {
  socket: any;
}

const ChatFooter: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const { socket } = props;
  const [message, setMessage] = useState("");

  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="p-3 bg-[#f9f5eb] h-[10vh]">
      <form
        className="w-full h-full flex items-center justify-between"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Write message"
          className="w-4/5 h-full rounded-lg border-[#ddd] border-solid border-2 p-3 outline-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="w-32 bg-green-500 p-3 border-0 outline-0 text-[#eae3d2] cursor-pointer hover:bg-green-300">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
