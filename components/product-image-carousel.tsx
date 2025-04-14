import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function ImageCarousel() {
  return (
    <div className=" mx-auto  flex items-center  justify-center">
      {/* Carousel wrapper with dynamic width for different screen sizes */}
      <Carousel className="w-full max-sm:max-w-xs max-w-md">
        {/* Carousel content holds the individual carousel items */}
        <CarouselContent>
          {/* Generate 5 carousel items dynamically */}
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                {/* Card component to wrap each carousel item */}
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    {/* Image container with fixed aspect ratio and overflow handling */}
                    <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-[10px]">
                      {/* Product image inside the carousel item */}
                      <Image
                        src="/images/land.webp" 
                        alt="Featured product" 
                        fill  
                        className="object-cover "  
                        sizes="(max-width: 768px) 100vw, 500px" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel navigation buttons */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
