"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import img1 from "@/../public/images/img1.svg";
import img2 from "@/../public/images/img2.svg";
import img3 from "@/../public/images/img3.svg";
import img4 from "@/../public/images/img4.svg";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const SignLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<div className="h-full w-full items-center justify-center bg-card p-16 max-sm:hidden md:flex">
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
						{[img1, img2, img3, img4].map((image, index) => (
							<CarouselItem key={index}>
								<div className="relative flex aspect-square rounded bg-background p-8">
									<Image src={image} alt="" />
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
			<section className="flex h-full w-full max-w-3xl items-center justify-center bg-background p-4">
				{children}
			</section>
		</main>
	);
};

export default SignLayout;
