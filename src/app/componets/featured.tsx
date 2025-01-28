import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Featured() {
  return (
    <main className="mt-10 p-8">
      {/* Header Section */}
      <div>
        <h1 className="font-semibold text-xl sm:text-2xl mb-3 ml-6">Featured</h1>
      </div>

      {/* Background Image Section */}
      <div
        className="w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[600px] lg:w-[1430px] mx-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://c-hackathon-2-dec.vercel.app/Featured.png')",
        }}
      ></div>

      {/* Content Section */}
      <div className="flex justify-center items-center flex-col gap-3 p-6 sm:p-8 md:p-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
          Step Into What Feels Good
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-6 w-full sm:w-[80%] md:w-[60%] pt-3 pb-2">
          Cause everyone should know the feeling of running in that perfect pair.
        </p>
        <Link href={"/SNKRS"}>
        <Button>Find Your Shoe</Button></Link>
      </div>
    </main>
  );
}
