"use client";

import { cn } from "@/lib/utils";
import EmojiPicker from "emoji-picker-react";
import { Send, Sticker } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Emoji from "./emoji";

function TypeArea(params) {
  const { setMessage, handlerSendMessage ,message} = params;
  const typeAreaRef = useRef();

  const handlerCurrentMesssage = (e) => {
    // Use innerHTML to capture the message, including line breaks
    const content = typeAreaRef.current.innerText.trim();
    setMessage(content);  // Save the message with line breaks preserved
  };

  const submitMessage = () => {
    handlerSendMessage();
    typeAreaRef.current.innerText = "";
  };

  useEffect(() => {
    // Define the event handler function
    const handleKeyDown = (event) => {
      // Check if the key pressed is Enter and Shift key is not held down
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent default action (e.g., form submission)
        if (!typeAreaRef?.current?.innerText?.trim()) return;
        submitMessage(); // Trigger the submitMessage function
      }
    };

    // Add the event listener for the 'keydown' event
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlerSendMessage]);

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste action

    const pastedText = e.clipboardData.getData("text/plain"); // Get plain text from clipboard

    // Replace newlines in the pasted text with line breaks for contentEditable
    const formattedText = pastedText.replace(/\n/g, "\n");

    // Insert the plain text with newlines
    document.execCommand("insertText", false, formattedText);
  };

     // Handle drag over: Allow only text
  const handleDragOver = (e) => {
    e.preventDefault();
    const isText = e.dataTransfer.types.includes("text/plain");

    // Add or remove classes for cursor control based on the type of dragged content
    if (isText) {
      typeAreaRef.current.classList.add("cursor-text");
      typeAreaRef.current.classList.remove("cursor-not-allowed");
    } else {
      typeAreaRef.current.classList.add("cursor-not-allowed");
      typeAreaRef.current.classList.remove("cursor-text");
    }
  };

  // Handle drag start: Prevent drag for non-text content
  const handleDragStart = (e) => {
    e.preventDefault(); // Disable default drag behavior for non-text items
  };

  // Handle drop: Allow only plain text
  const handleDrop = (e) => {
    e.preventDefault();
    const isText = e.dataTransfer.types.includes("text/plain");

    if (isText) {
      const text = e.dataTransfer.getData("text/plain");
      typeAreaRef.current.innerText += text; // Append text to the contenteditable area
      setMessage((prev) => prev + text); // Update the message state
    }

    // Reset the cursor to text after drop
    typeAreaRef.current.classList.remove("cursor-not-allowed");
    typeAreaRef.current.classList.add("cursor-text");
  };

  // Prevent unwanted cursor changes while dragging
  const handleDragEnter = (e) => {
    e.preventDefault();
    const isText = e.dataTransfer.types.includes("text/plain");
    if (isText) {
      typeAreaRef.current.classList.add("cursor-text");
      typeAreaRef.current.classList.remove("cursor-not-allowed");
    } else {
      typeAreaRef.current.classList.add("cursor-not-allowed");
      typeAreaRef.current.classList.remove("cursor-text");
    }
  };

  const handleDragLeave = () => {
    // Reset cursor when dragging leaves
    typeAreaRef.current.classList.remove("cursor-not-allowed");
    typeAreaRef.current.classList.add("cursor-text");
  };
  return (
    <div className="flex absolute w-full -bottom-12">
      <div className="flex items-end w-full bg-blue-200 p-2 rounded-md">
        <div className="flex items-end w-11/12  bg-blue-100/55 rounded-md">
          <div className="w-10 flex items-center justify-center pb-2">
            <Emoji setMessage={setMessage} typeAreaRef={typeAreaRef} />
          </div>
          <div
            ref={typeAreaRef}
            onInput={handlerCurrentMesssage}
            onPaste={handlePaste}
            onDragOver={handleDragOver} // Prevent drag over effect
            onDragStart={handleDragStart} // Disable drag start behavior
            onDrop={handleDrop} // Prevent dropping content inside the editable div
            onDragEnter={handleDragEnter} // Prevent cursor change when dragging enters
            onDragLeave={handleDragLeave} 
            className="p-2 max-h-36 overflow-scroll w-11/12 outline-none"
            contentEditable
          ></div>
        </div>
        <div className="min-w-10 w-1/12 flex items-center justify-center pb-2">
          <Send
            className={cn(
              "cursor-pointer active:scale-90 ",
              (typeAreaRef?.current?.innerText?.trim() && message?.trim())
                ? "opacity-100"
                : "opacity-45 pointer-events-none"
            )}
            onClick={submitMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default TypeArea;
