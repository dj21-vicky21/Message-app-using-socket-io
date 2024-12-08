"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStore } from "@/store";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function SetUserName() {
  const { openModel } = useStore();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  // Handle form submission
  function onSubmit(data) {
    useStore.setState({ userName: data.username, openModel: false }); // Set userName and close modal
  }

  return (
    <div>
      <AlertDialog
        open={openModel}
        onOpenChange={() => {
          useStore.setState({ openModel: !openModel });
        }}
      >
        <AlertDialogContent asChild>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter your Username</AlertDialogTitle>
            <div>
                <Form {...form} className="">
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
                    <div className="flex gap-3">
                      <Button variant="secondary" type="submit">
                        Join
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
