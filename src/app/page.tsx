"use client"

import { Card, CardContent } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';

import React from "react";

import { FaCreditCard } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";

export default function HomePage() {
    const plugin = React.useRef(
      Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    const images = ["/page-1.png", "/page-2.png", "/page-3.png"];
    
  return (
    <div className="w-full min-h-full flex items-center justify-center text-center flex-col">

         <Carousel
      plugins={[plugin.current]}
      className="w-full flex items-center justify-center"
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

    <div className="flex items-center justify-around w-full p-12 text-[#1E293B]">
      <div className="flex flex-col items-center justify-center text-center gap-y-2">
      <p className="flex items-center font-semibold text-[1.2rem]"><FaTruck className="text-[30px] mr-[8px] text-[#1E293B]" /> RECEBA EM CASA</p>
        <p>Entregas em fortaleza, e envios para todo o Brasil</p>
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-y-2">
        <p className="flex items-center font-semibold text-[1.2rem]"> <FaCreditCard className="text-[30px] mr-[8px]"/>PAGUE COMO PREFERIR</p>
        <p>Cartão, boleto, Pix ou dinheiro (como faziam os maias e astecas)</p>
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-y-2">
        <p className="flex items-center font-semibold text-[1.2rem]"><GoArrowSwitch className="text-[30px] mr-[8px]"/>PRIMEIRA TROCA GRÁTIS</p>
        <p>Em até 07 dias</p>
      </div>
    </div>

    </div>
  );
}
