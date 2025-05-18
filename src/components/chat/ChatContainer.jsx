import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { getConversationMessages } from "../../features/chatSlice";
import { checkOnlineStatus } from "../../utils/chat";
import ChatActions from "./actions/ChatActions";

export default function ChatContainer({ onlineUsers, typing, callUser }) {
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };
  const isEmptyObject = (activeConversation) =>
    Object.keys(activeConversation).length === 0;

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      {/*Container*/}
      <div>
        {/*Chat header*/}
        <ChatHeader
          online={
            activeConversation
              ? false
              : checkOnlineStatus(onlineUsers, user, activeConversation.users)
          }
          callUser={callUser}
        />
        <ChatMessages />

        <ChatActions />
      </div>
    </div>
  );
}
