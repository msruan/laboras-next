import Image from "next/image";
import Link from "next/link";
import { Assets } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function NotFoundPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<Card className="flex flex-col items-center justify-center gap-10 py-10 text-center">
				<h1 className="font-bold text-6xl">PAGE NOT FOUND</h1>
				<div className="relative inline-flex items-center justify-center">
					<Image
						unoptimized
						height={600}
						width={600}
						alt=""
						src={Assets.images.notFound}
					/>
				</div>
				<p className="box-border text-3xl">
					are you <strong>lost</strong> baby bunny?...but do not worry! <br />{" "}
					they are are here to guide you
				</p>
				<Link href="/">
					<Button className="cursor-pointer rounded-full font-bold text-white">
						GO HOME
					</Button>
				</Link>
			</Card>
		</div>
	);
}

export default NotFoundPage;
