"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";

const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  
  roomname: z.string().min(3, {
    message: "Room name must be at least 3 characters.",
  })
});

export default function CreateRoom() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      roomname: "",
    },
  });

  const redirect = (path) => {
    router.push(`/${path}`);
  };

  function onSubmit(data) {
    const roomID =  uuidv4(); 
    useStore.setState({userName:data.username,roomName:data.roomname})
    redirect(`chat/${roomID}`)
  }

  return (
    <Form {...form} className="">
        <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-[40%] space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Jonny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="War room" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
          <Button variant="secondary" type="button" onClick={()=>redirect('joinroom')}>Join</Button>
          <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
  );
}
