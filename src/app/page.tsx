"use client"

import { Card, CardContent } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import React from "react";
import Autoplay from 'embla-carousel-autoplay';

export default function HomePage() {
    const plugin = React.useRef(
      Autoplay({ delay: 6000, stopOnInteraction: true })
    );
    
  return (
    <div className="w-full min-h-full flex items-center justify-center text-center">

         <Carousel
      plugins={[plugin.current]}
      className="w-full flex items-center justify-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="w-full">
              <Card>
                <CardContent>
                  <img src="https://placehold.co/1350x400" alt="Promoções" className="w-full h-auto" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-12 top-1/2 transform -translate-y-1/2"/>
      <CarouselNext className="absolute right-12 top-1/2 transform -translate-y-1/2"/>
    </Carousel>

    </div>
  );
}
