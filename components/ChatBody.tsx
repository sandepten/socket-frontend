import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface Props {
  messages: any;
  socket: any;
}

const ChatBody: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const { messages, socket } = props;
  const router = useRouter();
  const [typingStatus, setTypingStatus] = useState("");
  const handleLeave = () => {
    localStorage.removeItem("userName");
    router.push("/");
    window.location.reload();
  };
  useEffect(() => {
    socket.on("typingResponse", (data: any) => setTypingStatus(data));
  }, [socket]);
  return (
    <>
      <header className="w-full h-[10vh] flex items-center justify-between p-6 bg-[#f9f5eb]">
        <p>Hangout with Colleagues</p>
        <button
          className="p-2 w-20 border-0 outline-0 bg-[#d1512d] cursor-pointer text-[#eae3d2] rounded-md"
          onClick={handleLeave}
        >
          LEAVE CHAT
        </button>
      </header>
      {/*This shows messages sent from you*/}
      <div className="w-full h-[80vh] bg-white p-4 overflow-y-scroll [&>*]:mb-3">
        {messages.map((message: any) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
