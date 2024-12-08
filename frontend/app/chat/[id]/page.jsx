import ChatArea from "@/app/_component/chatRoom";
import { SetUserName } from "@/app/_component/setUserName";

async function page({ params }) {
  const roomId = (await params).id;
  return (
    <div className="flex items-center justify-center h-full">
      <ChatArea roomId={roomId} />
      <SetUserName/>
    </div>
  );
}

export default page;
