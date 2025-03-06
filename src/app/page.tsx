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

    const images = ["/page-1.png", "/page-2.png", "/page-3.png"];
    
  return (
    <div className="w-full min-h-full flex items-center justify-center text-center">

         <Carousel
      plugins={[plugin.current]}
      className="w-full flex items-center justify-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="w-full">
              <Card>
                <CardContent>
                  <img src={image} alt="Carousel Banner" className="w-full h-auto" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-white border-none hover:bg-white hover:scale-110"/>
      <CarouselNext className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-white border-none hover:bg-white hover:scale-110"/>
    </Carousel>

    </div>
  );
}
