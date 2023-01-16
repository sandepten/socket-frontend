import type { NextComponentType, NextPageContext } from "next";
import { useEffect, useState } from "react";

interface Props {
  socket: any;
}

const ChatSidebar: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const { socket } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data: any) => setUsers(data));
  }, [socket, users]);
  return (
    <div className="h-full bg-[#f9f5eb] flex-[0.2] p-4 border-r border-solid border-[#fdfdfd]">
      <p className="font-semibold text-xl">Open Chat</p>
      <div>
        <p className="mt-8 mb-5">ACTIVE USERS</p>
        <div className="[&>*]:mb-3 [&>*]:text-[#607eaa] text-base">
          {users.map((user: any) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
