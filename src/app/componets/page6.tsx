import Image from "next/image";
import Link from "next/link";

export default function Essential() {
  return (
    <section className="py-5">
      <div>
        <h2 className="font-semibold text-2xl mb-3 ml-4">The Essentials</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
        <div className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%]">
          <Link href={"/men"}>
          <Image
            width={350}
            height={300}
            alt="Essential 1"
            src={"/e1.png"}
            className="w-full h-auto"
          /></Link>
        </div>
        <div className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%]">
          <Link href={"/Women"}>
          <Image
            width={350}
            height={300}
            alt="Essential 2"
            src={"/e2.png"}
            className="w-full h-auto"
          /></Link>
        </div>
        <div className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%]">
          <Link href={"/Kids"}>
          <Image
            width={350}
            height={300}
            alt="Essential 3"
            src={"/e3.png"}
            className="w-full h-auto"
          /></Link>
        </div>
      </div>
    </section>
  );
}
