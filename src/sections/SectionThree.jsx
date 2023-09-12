import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function SectionThree() {
  const sectionDivRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionDivRef.current,
          start: "-80%",
          markers: false,
        },
      });
      tl.to(sectionDivRef.current, {
        opacity: "1",
        duration: 1.5,
      });
    }, sectionDivRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionDivRef}
      className="w-full h-[100svh] text-[#F1F1FA] md:grid grid-cols-2 p-4 opacity-0"
    >
      <div className="grid gap-y-10 auto-rows-min pt-10">
        <h1 className="text-6xl">Our Focus</h1>
        <div className="grid gap-y-10 auto-rows-min">
          <div className="flex flex-col gap-10">
            <div>
              <h6 className="uppercase font-bold tracking-widest pb-3">
                Immune Aging
              </h6>
              <p className="text-xl">
                As we age, our natural immune defenses remain active even when
                not fighting infection, leading to chronic inflammatory states
                that degrade tissue, interfere with organ function, and drive
                diseases throughout the body. Our immune aging program defuses
                pathologic inflammation, restoring youthful regulation of
                cytokine responses and reverses disease progression.
              </p>
            </div>
            <div>
              <h6 className="uppercase font-bold tracking-widest pb-3">
                Technology
              </h6>
              <p className="text-xl">
                Robust Labs is pioneering new methods in single cell analysis by
                combining innovations in microfluidics, optics, and AI. Through
                these multiple lenses, we are magnifying insights into cells’
                phenotype and function to address important research questions
                across biology.
              </p>
            </div>
          </div>

          <div>
            <button className="transition-all py-2 px-8 rounded border-solid border-2 border-[##F1F1FA] hover:bg-[#F1F1FA] hover:text-[#262D64] font-medium ">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div />
    </section>
  );
}
