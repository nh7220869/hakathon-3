import { Button } from "../../components/ui/button";
import Image from "next/image";
import { Suspense } from 'react';

export default function DontMiss() {
  return (
    <section className="my-20 p-4">
      <h1 className="font-semibold text-xl mb-3 ml-6">Don&apos;t Miss</h1>
      <div className="flex justify-center"> {/* Center the image */}
        <div className="flex flex-col items-center"> {/* Center content */}
          <Suspense>
          <Image
            src={"https://c-hackathon-2-dec.vercel.app/_next/image?url=%2FDontMiss.png&w=1920&q=75"}
            alt={"flight"}
            width={1400}
            height={600}
            className="max-w-full h-auto" 
          /></Suspense>
          <div className="flex flex-col justify-center items-center space-y-5 pt-10">
            <h1 className="font-semibold text-2xl md:text-4xl">
              FLIGHT ESSENTIALS
            </h1>
            <h2 className="text-[9px] md:text-sm text-center"> {/* Center text */}
              Your built-to-last, all-week wears—but with style only Jordan Brand
              can deliver.
            </h2>
            <Button className="rounded-full">Shop</Button>
          </div>
        </div>
      </div>
    </section>
  );
}