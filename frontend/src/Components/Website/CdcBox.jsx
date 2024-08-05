import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { context } from "../../Context/MainContext";

gsap.registerPlugin(ScrollTrigger);

const AnimatedWordsAndImages = () => {
  const { products, productImageUrl, API_BASE_URL } = useContext(context);
  const crepRef = useRef(null);
  const dogRef = useRef(null);
  const crewRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".animation-container",
        start: "top 70%",
        end: "bottom 40%",
        scrub: true,
        // markers: true, 
      },
    });

    // Animate "CREP" from the left
    timeline.fromTo(
      crepRef.current,
      { x: "-100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animate "DOG" from the bottom
    timeline.fromTo(
      dogRef.current,
      { y: "100%", opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

    // Animate "CREW" from the Z-axis
    timeline.fromTo(
      crewRef.current,
      { z: -100, opacity: 0 },
      { z: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="mb-10 animation-container relative w-full h-[400px] bg-[#393d3f] flex flex-wrap items-center justify-center gap-7 px-4 md:px-8 rounded-b-3xl"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <h1
        ref={crepRef}
        className=" text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter leading-none"
      >
        CREP
      </h1>
      <h1
        ref={dogRef}
        className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter leading-none"
      >
        DOG
      </h1>
      <h1
        ref={crewRef}
        className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter leading-none"
      >
        CREW
      </h1>

    </div>
  );
};

export default AnimatedWordsAndImages;
