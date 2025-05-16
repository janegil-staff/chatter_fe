import React, { useEffect, useState } from "react";
import { SideBar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const { user } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex py-[19px]">
        <SideBar onlineUsers={onlineUsers} typing={typing} />
      </div>
    </div>
  );
}
