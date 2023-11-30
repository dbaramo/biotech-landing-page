import { gsap } from "gsap";
import { useEffect, useRef } from "react";

function HeadlineBlock(props) {
  return (
    <div className="flex gap-5 items-center py-5 press-bottom-border">
      {/* <div className="min-w-[70px] min-h-[50px]" /> */}
      <img src={props.imgURL} className="max-w-[70px]" />
      <h5 className="text-xl font-light">{props.headline}</h5>
    </div>
  );
}

export default function LastSection() {
  const d = new Date();
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
      className="w-full h-[100svh]  text-[#F1F1FA] p-4 flex flex-col opacity-0"
    >
      <div className="flex flex-col items-center pt-20">
        <div className="w-[100%]">
          <h6 className="uppercase text-center font-bold tracking-widest pb-2">
            In the press
          </h6>
          <div className="max-w-[750px] m-auto">
            <HeadlineBlock
              headline={
                "Robust Labs to Present Data on Treatment of Neurodegeneration and Brain Aging at Upcoming Conference"
              }
              imgURL={"press-logos/tc.png"}
            />
            <HeadlineBlock
              headline={
                "Andreessen Co-Leads $200 Million Investment in Biotech Startup Robust Labs"
              }
              imgURL={"press-logos/wsj.png"}
            />
            <HeadlineBlock
              headline={
                "Robust Labs Hires Grace Jones as Chief Business Officer"
              }
              imgURL={"press-logos/bw.png"}
            />
            <HeadlineBlock
              headline={
                "Robust Labs Announces New Clinical Data Supporting a Potential Treatment for Pompe Disease"
              }
              imgURL={"press-logos/bw.png"}
            />
          </div>
        </div>
      </div>
      <div className="bottom-0 w-full h-full">
        <div className="flex justify-between h-full items-end">
          <div>
            <p>© {d.getFullYear()} Robust Labs Inc.</p>
          </div>
          <div className="flex gap-4">
            <a>Careers</a>
            <a>Company</a>
            <a>Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
