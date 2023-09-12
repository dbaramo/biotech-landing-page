import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

// gsap.registerPlugin(ScrollTrigger);

export default function SectionOne() {
  const sectionDivRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(".hc-1", {
        transform: "translateY(0)",
        delay: 2.0,
        duration: 1,
      }).to(".sub-1", { transform: "translateY(0)", duration: 1 });

      const reversed = gsap.timeline({
        scrollTrigger: {
          trigger: sectionDivRef.current,
          start: "top",
          scrub: true,
          end: "bottom 75%",
          markers: false,
        },
      });
      reversed.to(".rev-up", { transform: "translateY(-110%)" }).to(
        ".rev-down",
        {
          transform: "translateY(100%)",
        },
        "<"
      );
    }, sectionDivRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionDivRef}
      className="w-full h-[100svh] text-[#F1F1FA] grid grid-cols-2 p-4"
    >
      <div className="text-5xl sm:text-7xl lg:text-[100px] uppercase hc-1">
        <div className="overflow-hidden">
          <h1 className="leading-[85px] translate-y-[-100%] hc-1 rev-down">
            Robust
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="leading-[85px] translate-y-[100%] hc-1 rev-up">
            Labs
          </h1>
        </div>
      </div>
      <div className="relative">
        {/*         <h3 className="text-[6vw] sm:text-4xl lg:text-[50px] absolute bottom-0 right-0 leading-[90%] uppercase">
          Extending{" "}
          <span className="text-[#0F3BFE]">
            the <br /> gift of{" "}
          </span>
          life
        </h3> */}
        <div className="flex flex-col items-end justify-end h-full text-[6vw] sm:text-4xl lg:text-[50px] uppercase">
          <div className="pb-1 overflow-hidden">
            <span className="inline-block overflow-hidden">
              <h3 className="translate-y-[100%] rev-down inline-block sub-1">
                Extending{" "}
              </h3>
            </span>
            <span className="text-[#0F3BFE] translate-y-[-100%] rev-up inline-block sub-1 pl-2">
              the
            </span>
          </div>
          <h3 className="overflow-hidden">
            <span className="text-[#0F3BFE] translate-y-[100%] rev-down inline-block sub-1">
              gift of
            </span>
            <span className="translate-y-[-100%] rev-up inline-block sub-1 pl-2">
              life
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}
