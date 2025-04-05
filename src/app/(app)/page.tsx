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
import FeedbackSection from "@/components/app/FeedbackSection";
import About from "@/components/app/About";
import InteractionStats from "@/components/app/InteractionStats";

function Page() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center  py-12">
        <section className="w-full flex justify-between items-center mb-8 md:mb-12 min-h-[70vh] md:px-20 lg:flex-row flex-col gap-16 lg:gap-0">
          <div className="w-4/5 lg:pr-24 text-center lg:text-left">
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
            className="lg:w-1/3 sm:max-w-lg max-w-[80vw]"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-[#000000] text-white lg:max-h-96">
                      <CardHeader className="text-lg font-medium pb-0">
                        {message.title}
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center px-6">
                        <span className="text-lg font-semibold italic">
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
        <section className="w-full min-h-[70vh] mx-auto mb-6 py-6 sm:px-6 lg:px-8 bg-[#F5F5F5] border-b-2">
          <About />
        </section>
        <section className="w-full mx-auto mb-6 py-6 sm:px-6 lg:px-8">
          <InteractionStats />
        </section>
        <section className="w-full mx-auto py-6 sm:px-6 lg:px-8">
          <hr className="h-0.5 w-full bg-black" />
          <FeedbackSection />
        </section>
      </main>

      <footer className="w-full bg-[#F5F5DC] min-h-44 p-6">
        <div className="text-center w-full">
          <span className="italic">
            © 2025 Echo True. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Page;
