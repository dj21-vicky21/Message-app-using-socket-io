"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  roomid: z.string().min(3, {
    message: "Room id must be at least 3 characters.",
  })
});

export default function JoinRoom() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      roomid: "",
    },
  });

  const redirect = (path) => {
    router.push(`/${path}`);
  };

  function onSubmit(data) {
    useStore.setState({userName:data.username})
    redirect(`chat/${data.roomid}`)
  }

  return (
    <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:w-[40%] space-y-6"
        >
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
            name="roomid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Id <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="flex gap-3">
          <Button variant="secondary" type="button" onClick={()=>redirect('createroom')}>Create</Button>
          <Button type="submit">Join</Button>
          </div>
        </form>
      </Form>
  );
}
