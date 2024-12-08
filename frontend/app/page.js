"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";
import { SetUserName } from "./_component/setUserName";

function page() {
  const router = useRouter();

  const redirect = (path) => {
    router.push(`/${path}`);
  };

  return (
    <div className="flex gap-3 flex-col items-center justify-center h-full">
      <Label className="text-3xl">Chat Room</Label>
      <div className="flex gap-3 ">
        <Button onClick={() => redirect("createroom")}>Create room</Button>
        <Button onClick={() => redirect("joinroom")}>Join room</Button>
        <SetUserName />
      </div>
    </div>
  );
}

export default page;
