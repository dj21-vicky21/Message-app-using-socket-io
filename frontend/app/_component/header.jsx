"use client"

import { Copy, LogOut } from "lucide-react";
import React from "react";

function Header(params) {
  const { roomName, userName ,roomId,leaveRoom} = params;

  const decodeRoomName = roomName ? decodeURIComponent(roomName) : " "

  function copyToClipboard() {
    // Use the Clipboard API to write text to the clipboard
    navigator.clipboard
      .writeText(roomId)
      .then(() => {
        console.log("Text successfully copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    }

  return (
    <div className="flex items-center justify-between p-4 bg-blue-200 text-black">
      <div className="flex">
        <span className="whitespace-nowrap w-fit overflow-hidden text-ellipsis capitalize">
          {userName}
        </span>
      </div>
      <div className="flex items-center space-x-3 text-xl sm:text-2xl gap-2 overflow-hidden">
        <span className="font-semibold whitespace-nowrap min-w-[100px] w-fit md:w-fit overflow-hidden text-ellipsis">
          {decodeRoomName}
        </span>
        <span
          title="Copy room id"
          className="font-semibold active:scale-90 cursor-pointer"
        >
          <Copy className="size-5" onClick={copyToClipboard} />
        </span>
      </div>
      <div className="flex justify-end gap-2 cursor-pointer" onClick={leaveRoom}>
        <LogOut />
      </div>
    </div>
  );
}

export default Header;
