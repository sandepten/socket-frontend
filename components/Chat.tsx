import { useEffect, useState } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatSidebar from "./ChatSidebar";

const Chat: any = (props: any) => {
  const { socket } = props;
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.on("messageResponse", (data: any) =>
      setMessages([...messages, data])
    );
  }, [socket, messages]);
  return (
    <div className="w-full h-screen flex items-center">
      <ChatSidebar socket={socket} />
      <div className="h-full flex-[0.8]">
        <ChatBody messages={messages} socket={socket} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
