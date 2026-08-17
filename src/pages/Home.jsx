import { useEffect, useState } from "react";
import Preloader from "../components/home/Preloader";
import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import Services from "../components/home/Services";
import HorizontalProjects from "../components/home/HorizontalProjects";
import ProjectTransition from "../components/home/ProjectTransition";
import Philosophy from "../components/home/Philosophy";
import Process from "../components/home/Process";
import Technology from "../components/home/Technology";
import TestimonialOrbit from "../components/home/TestimonialOrbit";
import ReviewMarquee from "../components/home/ReviewMarquee";
import Numbers from "../components/home/Numbers";
import CTA from "../components/home/CTA";
import { useLenis } from "../hooks/useLenis";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    // Prevent scroll jack while the preloader plays.
    const already = sessionStorage.getItem("field-preloaded");
    if (already) {
      setLoaded(true);
      return;
    }
    lenis?.stop();
  }, [lenis]);

  const handlePreloaderComplete = () => {
    setLoaded(true);
    lenis?.start();
    sessionStorage.setItem("field-preloaded", "1");
  };

  const skipPreloader = typeof window !== "undefined" && sessionStorage.getItem("field-preloaded");

  return (
    <>
      {!skipPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero start={loaded || Boolean(skipPreloader)} />
      <Intro />
      <Services />
      <HorizontalProjects />
      <ProjectTransition />
      <Philosophy />
      <Process />
      <Technology />
      <TestimonialOrbit />
      <ReviewMarquee />
      <Numbers />
      <CTA />
    </>
  );
}
