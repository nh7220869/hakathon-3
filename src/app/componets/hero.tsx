import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Suspense } from "react"
export default function Hero(){
    return(
        <Suspense>
        <section className="flex justify-center flex-col items-center bg-[#fafafa] m-4 ">
            <div className="flex justify-center flex-col items-center pb-4">
            <h3 className="text-2xl text-black font-bold">Hello Nike App</h3>
         <p className="text-sm text-gray-600" >
         <span>Download the app to access everything Nike.</span>{" "}
           <Link href={"/"}> Get Your Great</Link>
        </p>
            </div>
        
            <Image src={"https://c-hackathon-2-dec.vercel.app/_next/image?url=%2FHero.png&w=1920&q=75"} alt={"shoes"} width={1375} height={700}/>
            <div className="flex justify-center items-center flex-col p-10 text-center
            ">
                <p className="text-[15px] font-bold">First Look</p>
                <h2 className=" lg:text-[56px] text-[20px] font-semibold uppercase text-[#111111] sm:text-[30px]">Nike Air Max Pulse</h2>
                <p  className="text-sm leading-5 w-full pt-3 pb-2 text-center 
                lg:w-[90%]">
                Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse
                 <br />— designed to push you past your limits and help you go to the max.
           
                </p>
                <div className="flex justify-center items-center mt-[12px] gap-3">
                <Link href={"/areas"}><Button>Notify Me</Button></Link>
                <Link href={"/products"}><Button>Shop Air Max</Button></Link>
                </div>
            </div>
        </section></Suspense>
    )
    
}