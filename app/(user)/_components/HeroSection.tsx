import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="wrapper">
      <div>
        <div className="grid grid-cols-2">
          <div className="m-auto w-full">
            <div className="relative w-full h-screen">
              <Image
                src="/images/herobackground.png"
                alt="hero"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="m-auto w-full pl-20">
            <div>
                <h1>THE SCENT WE LOVED</h1>
                <Button asChild variant="link" className="p-0">
                    <Link href="/shop">
                        <p>DISCOVER MORE</p>
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
