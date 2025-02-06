"use client";
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "../../data/messages.json";

function page() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center  py-12">
        <section className="w-full flex justify-between items-center mb-8 md:mb-12 min-h-90 md:px-24">
          <div className="w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold">
              Speak Freely, Stay Hidden: The World of Anonymous Chats
            </h1>
            <p className="italic text-base font-notoSerif md:text-lg mt-3 md:mt-6">
              Echo true - Join a space where you can express yourself without
              limits. No names, no judgments—just real conversations.
            </p>
          </div>
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-1/2 md:max-w-sm sm:max-w-xs"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader className="text-lg font-medium">
                        {message.title}
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center px-6">
                        <span className="text-lg font-semibold">
                          {message.content}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>
      <footer className="w-full bg-gray-200 min-h-44 p-6">
        <div className="text-center w-full">
          <span className="italic">
            © 2025 Echo True. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default page;
