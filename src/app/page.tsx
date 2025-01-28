
import Featured from "./componets/featured";
import Hero from "./componets/hero";
import { CarouselSize } from "./componets/page1";
import GearUp from "./componets/page4";
import DontMiss from "./componets/page5";
import Essential from "./componets/page6";
import Navigation from "./componets/page7";




export default function Home() {
  return (
  <main>
 
    <Hero/>
    <CarouselSize/>
    <Featured/>
    <GearUp/>
    <DontMiss/>
    <Essential/>
    <Navigation/>
    
    
    
  
  </main>
  )
}