import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function NotFoundPage() {
  return (
    <div className="h-screen items-center flex flex-col justify-center">
      <Card className="text-center flex flex-col items-center justify-center gap-10 py-10">
        <h1 className="text-6xl font-bold">PAGE NOT FOUND</h1>
        <div className="relative inline-flex justify-center items-center">
          <Image unoptimized height={600} width={600} alt="" src="/images/404.jpg" />
        </div>
        <Link href="/">
          <Button className="font-bold  text-white cursor-pointer rounded-full">
            GO HOME
          </Button>
        </Link>
        <p className="text-3xl box-border">
          are you <strong>lost</strong> baby bunny?...but do not worry! <br />{" "}
          they are are here to guide you
        </p>
      </Card>
    </div>
  );
}

export default NotFoundPage;
