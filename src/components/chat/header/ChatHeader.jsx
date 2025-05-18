import React from "react";
import { useSelector } from "react-redux";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { capitalize } from "../../../utils/string";

export default function ChatHeader({ online, callUser, socket }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/*Container*/}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {/*Conversation image*/}
          <button className="btn">
            <img
              src={
                activeConversation
                  ? activeConversation.picture
                  : getConversationPicture(user, activeConversation.users)
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {activeConversation
                ? activeConversation.name
                : capitalize(
                    getConversationName(user, activeConversation.users).split(
                      " "
                    )[0]
                  )}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">
              {online ? "online" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
