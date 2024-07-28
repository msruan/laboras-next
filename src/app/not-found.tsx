import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function NotFoundPage() {
  return (
    <div className="h-screen items-center overflow-hidden flex flex-col justify-center gap-10">
      <Card className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-6xl font-bold pt-10">PAGE NOT FOUND</h1>
        <div className="relative inline-flex justify-center items-center">
          <Image height={600} width={600} alt="" src="/404.jpg" />
          <Link href="/">
            <Button className="font-bold absolute top-1/2 left-1/2 transform -translate-x-72 translate-y-32 px-4 py-2 text-white cursor-pointer rounded-full">
              GO HOME
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl pb-10">
          are you <strong>lost</strong> baby bunny?...but do not worry! <br />{" "}
          they are are here to guide you
        </h1>
      </Card>
    </div>
  );
}

export default NotFoundPage;
