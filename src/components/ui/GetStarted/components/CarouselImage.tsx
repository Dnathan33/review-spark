import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ShadcnComponents/carousel";

const CarouselImage = ({ images }: { images: string[] }) => {
  return (
    <Carousel className="w-[100%] h-[100%] mt-4">
      <CarouselContent className="w-[100%] h-[100%]">
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index} className="p-1">
            <img
              src={images[index]}
              className="w-[100%] h-[100%] rounded-md object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselImage;
