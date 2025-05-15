import React, { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./header/notifications";
import Search from "./search/Search";

export default function SideBar() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      <SidebarHeader />
      <Notifications />
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
    </div>
  );
}
