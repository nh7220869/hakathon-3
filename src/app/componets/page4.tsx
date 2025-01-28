import { GearCarousel1 } from "./Carousel1";
import { GearCarousel2 } from "./Carousel2";

export default function GearUp() {
  return (
    <section className="p-6">
      {/* Heading */}
      <h1 className="font-semibold text-2xl mb-6">Gear Up</h1>

      {/* Container for Carousels */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Carousel (50% width) */}
        <div className="w-full md:w-1/2">
          <GearCarousel1 />
        </div>

        {/* Right Carousel (50% width) */}
        <div className="w-full md:w-1/2">
          <GearCarousel2 />
        </div>
      </div>
    </section>
  );
}