"user client";

import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { useEffect, useRef } from "react";

function Inbox({ messageBox }) {
  const { userName } = useStore();
  const inboxRef = useRef(null);

  useEffect(() => {
    if (inboxRef.current) {
      inboxRef.current.scrollTop = inboxRef.current.scrollHeight; // Scroll to the bottom
    }
  }, [messageBox]);

  const formatTimer = (isoDate) => {
    const localTime = new Date(isoDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // This ensures AM/PM format
    });

    // Remove leading zero from hour part if it exists
    return localTime.replace(/^0/, "");
  };

  return (
    <div
      ref={inboxRef}
      className="h-5/6 overflow-y-auto p-4 border border-gray-300 bg-gray-50 "
    >
      {messageBox?.length > 0 ? (
        messageBox.map((inbox, index) => (
          <div key={`${index}-${inbox.userName}`}>
            {inbox.type == "chat" ? (
              <div
                key={index}
                className={cn(
                  "p-3 mb-3 w-fit max-w-[300px] rounded-lg bg-white shadow-md text-gray-800",
                  inbox.userId === inbox.currentUser ? " ml-auto" : "mr-auto"
                )}
              >
                <div className="whitespace-normal break-words flex flex-col">
                  <p className="text-xs font-bold">{inbox.username}</p>
                  <p className="my-1">{inbox.message}</p>
                  <p className="text-xs font-bold ml-auto ">
                    {formatTimer(inbox?.date)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-3">
                <span className="bg-blue-700/55 rounded-lg p-1 text-sm px-2 text-white">
                  {inbox.message}
                </span>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          Start your conversation!
        </div>
      )}
    </div>
  );
}

export default Inbox;
