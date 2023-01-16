import Chat from "@/components/Chat";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:4000");
export default function Home() {
  const [userName, setUserName] = useState("");
  const [showChat, setShowChat] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketId: socket.id });
    setShowChat(true);
  };
  return (
    <>
      <Head>
        <title>Socket by Sandeep</title>
        <meta name="description" content="This is chat which uses socket.io" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!showChat ? (
          <form
            className="w-full h-screen flex flex-col justify-center items-center [&>*]:mb-4"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-8">Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              minLength={6}
              name="username"
              id="username"
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button className="w-[200px] p-4 bg-[#1a73e8] text-white rounded-md cursor-pointer text-base outline-none border-0">
              SIGN IN
            </button>
          </form>
        ) : (
          <Chat socket={socket} />
        )}
      </main>
    </>
  );
}
