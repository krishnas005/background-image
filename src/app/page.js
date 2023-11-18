import Navbar from "@/components/Navbar";
import HowToUse from "@/components/HowToUse";
import Demo from "@/components/Demo";
import GetStarted from "@/components/getStarted";
import Footer from "@/components/Footer";
import Home from '@/components/Home';
import ChangeBg from '@/components/ChangeBg';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Home />
      {/* <ChangeBg /> */}
      <HowToUse/>
      <Demo/>
      <GetStarted/>
      <Footer/>
    </main>
  )
}
