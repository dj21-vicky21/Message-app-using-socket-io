import { Sticker } from "lucide-react";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";

function Emoji(params) {
    const {typeAreaRef,setMessage} = params

    const handleOnclickEmoji = (e) => {
        // Ensure typeAreaRef is available and append the emoji to the contentEditable div
        if (typeAreaRef.current) {
            typeAreaRef.current.innerText += e.emoji;  // Append the emoji to the div
        }
        // Update the message state correctly (do not mutate the previous state directly)
        setMessage((prev) => prev + e.emoji); // Properly concatenate the emoji to the previous message state
    };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Sticker className="cursor-pointer active:scale-90" />
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-transparent border-0 shadow-none">
        <EmojiPicker searchDisabled={true} skinTonesDisabled={true} lazyLoadEmojis={true} onEmojiClick={handleOnclickEmoji}/>
      </PopoverContent>
    </Popover>
  );
}

export default Emoji;
