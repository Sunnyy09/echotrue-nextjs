"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/Schemas/acceptMessagesSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RefreshCcw } from "lucide-react";
import MessageCard from "@/components/app/MessageCard";
import { useRouter } from "next/navigation";

function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();

  const { data: session, status } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-messages`);
      setValue("acceptMessages", response.data.isAcceptingMessages as boolean);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>(`/api/get-messages`);
        setMessages(response.data.messages || []);
        console.log(response);

        if (refresh) {
          toast({
            title: "Refreshed messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description: axiosError.response?.data.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    // console.log("Session status:", status);
    // console.log("Session data:", session);
    if (status === "loading") return;
    if (!session || !session.user) {
      router.replace("/sign-in");
    }

    fetchMessages();
    fetchAcceptMessages();
  }, [status, router, session, setValue, fetchMessages, fetchAcceptMessages]);

  // handle switch change for messages
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>(`/api/accept-messages`, {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "destructive",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    }
  };

  // optimistic UI approach
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const user = session?.user as User;
  const username = user?.username;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL copied successfully",
      description: "Profile URL has been copy to clipboard",
    });
    // another method using with ref hook
  };

  if (status === "loading") {
    return <div className="text-4xl text-center mt-12">Loading...</div>;
  }

  if (!session || !session.user) {
    return <div className="text-4xl text-center mt-12">Please login</div>;
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 font-roboto">User Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 font-lora">
          Copy Your Unique Link
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 "
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>
      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />
      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
