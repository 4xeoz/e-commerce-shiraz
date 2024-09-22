import Image from "next/image";
import React from "react";

const SubHeroSection = () => {
  return (
    <div className="wrapper">
      <div>
        <div className="grid grid-cols-2 gap-20">
          <div className="m-auto w-full ">
            <div className="flex flex-col gap-10 pl-[5vw]">
              <h1>Our History</h1>
              <p>
                At AromaEssence, we believe that every scent tells a story.
                Founded in the heart of Provence, our journey began with a
                passion for capturing the essence of nature’s most exquisite
                aromas. Each of our fragrances is a delicate blend of rare
                botanicals, handpicked from around the globe, and crafted by
                master perfumers with decades of experience. We are committed to
                creating unique, long-lasting scents that not only enhance your
                presence but also evoke emotions and memories. Our dedication to
                sustainability ensures that every bottle of AromaEssence
                reflects a deep respect for the environment, with ethically
                sourced ingredients and eco-friendly packaging. Discover the art
                of fragrance with AromaEssence, where luxury meets nature.
              </p>
            </div>
          </div>
          <div className="m-auto w-full">
            <div className="relative w-3/4 h-screen mx-auto">
              <Image
                src="/images/herobackground.png"
                alt="hero"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeroSection;
