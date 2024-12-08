"use client"

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Header from "./header";
import TypeArea from "./typeArea";
import Inbox from "./inbox";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

function ChatArea(params) {
  const { roomId } = params; // Destructure roomId from params
  const { userName, roomName ,openModel} = useStore();
  const [socket, setSocket] = useState(undefined);
  const [message, setMessage] = useState("");
  const [messageBox, setMessageBox] = useState([]);
  const router = useRouter()

  // Effect to handle socket connection when userName is set
  useEffect(() => {
    if (!userName) {
      useStore.setState({ openModel: true });
      return;
    }

    const socketIo = io("http://localhost:3000");

    // Set socket to state
    setSocket(socketIo);

    if (!socketIo) {
      console.log("Socket not connected!");
      return;
    }

    // Listeners for messages
    socketIo.on("message", (message, userId, username, date) => {
      setMessageBox((prev) => [...prev, { message, username, date, userId, type: 'chat', currentUser: socketIo.id}]);
    });

    socketIo.on("userJoined", (username,userId) => {
      setMessageBox((prev) => [...prev, {
        message: userId  === socketIo.id ? `You Joined the Room` : `${username} joined this room`,
        username,
        type: "system"
      }]);
    });

    socketIo.on("userLeaveRoom", (username, userId) => {
      setMessageBox((prev) => [...prev, {
        message: userId  === socketIo.id ? `You Joined this Room` : `${username} Left this room`,
        username,
        type: "system"
      }]);
    });

    if (!roomName) {
      socketIo.emit("joinRoom", roomId, userName);
    } else {
      socketIo.emit("createRoom", roomId, userName, roomName);
    }

    return () => {
      console.log("disconnect ")
      if (socketIo) {
        leaveRoom()
        socketIo.disconnect(); // Clean up the socket connection on component unmount
      }
    };
  }, [openModel ]); // Re-run when roomId, userName, or roomName changes

  const leaveRoom = () => {
    if(socket){
      router.push('/')
    }
  };

  // Handler to send a message
  const handlerSendMessage = () => {
    if (socket && roomId ) {
      const date = new Date()
      socket.emit("message", message , roomId,userName, date);
      setMessage(""); // Clear the message input after sending
    }
  };

 

  if (!socket) return <>Unable to connect to the room!</>;

  return (
    <div className="w-full md:w-10/12 h-screen p-3 shadow-md bg-blue-50 rounded-md relative">
      <Header roomId={roomId} roomName={roomName} userName={userName} socket={socket} leaveRoom={leaveRoom}/>
      <Inbox messageBox={messageBox} />
      <div className="relative">
        <TypeArea message={message} handlerSendMessage={handlerSendMessage} setMessage={setMessage}/>
      </div>
    </div>
  );
}

export default ChatArea;
