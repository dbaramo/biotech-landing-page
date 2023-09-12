import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function SectionTwo() {
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
        <h1 className="text-6xl">Our Company</h1>
        <div className="grid gap-y-10 auto-rows-min">
          <p className="text-xl">
            We’re a team of pharmaceutical scientists, deep learning
            researchers, and software engineers working towards extending the
            gift of human life. Collaborating to drive AI in biochemistry, while
            discovering and developing new therapies for patients suffering from
            severe disorders.
          </p>
          <div className="flex justify-between">
            <div className="">
              <h2 className="text-5xl text-[#0F3BFE] font-bold counter">12</h2>
              <p className="font-bold">Years of progress</p>
            </div>
            <div className="">
              <h2 className="text-5xl text-[#0F3BFE] font-bold counter">48</h2>
              <p className="font-bold">Products in the pipepline</p>
            </div>
            <div className="">
              <h2 className="text-5xl text-[#0F3BFE] font-bold counter">35</h2>
              <p className="font-bold">Ongoing clinical trials</p>
            </div>
          </div>
          <div className="">
            <button className="transition-all py-2 px-8 rounded border-solid border-2 border-[##F1F1FA] hover:bg-[#F1F1FA] hover:text-[#262D64] font-medium ">
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* <h1 className="">Canvas</h1> */}
    </section>
  );
}
