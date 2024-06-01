"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";

import img1 from "@/../public/img1.svg";
import img2 from "@/../public/img2.svg";
import img3 from "@/../public/img3.svg";
import img4 from "@/../public/img4.svg";
import { Card, CardContent } from "@/components/ui/card";

const SignLayout = ({ children }: { children: React.ReactNode }) => {
  type MyCarouselItemProps = {
    img: string;
  };

  function MyCarouselItem({ img }: MyCarouselItemProps) {
    return (
      <CarouselItem>
        <div className="flex relative aspect-square bg-background rounded p-8">
          <Image src={img} alt="" />
        </div>
      </CarouselItem>
    );
  }

  return (
    <main className=" h-screen  flex justify-center items-center  w-full">
      <div className="bg-card w-full h-full md:flex justify-center items-center p-16 max-sm:hidden">
        <Carousel
          className="w-full max-w-xl"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            <MyCarouselItem img={img1} />
            <MyCarouselItem img={img2} />
            <MyCarouselItem img={img3} />
            <MyCarouselItem img={img4} />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
        {children}
      </section>
    </main>
  );
};

export default SignLayout;

function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
