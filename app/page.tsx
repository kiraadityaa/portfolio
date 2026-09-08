import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IntroGate from "./components/IntroGate";
import Interests from "./components/Interests";
import LinuxSection from "./components/LinuxSection";
import NowSection from "./components/NowSection";
import Philosophy from "./components/Philosophy";
import ProgrammingSection from "./components/ProgrammingSection";

export default function Home() {
  return (
    <>
      <IntroGate />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Interests />
        <LinuxSection />
        <ProgrammingSection />
        <Education />
        <NowSection />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
