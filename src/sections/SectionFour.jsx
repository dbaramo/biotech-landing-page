import Marquee from "react-fast-marquee";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

function TeamMember(props) {
  const { name, role, imgURL } = props;

  return (
    <div className="w-full">
      <div className="relative cursor-pointer group">
        <img
          src={`${imgURL}`}
          className="saturate-0 group-hover:saturate-100"
        />

        <div className="w-full max-h-full aspect-square bg-[#262D64] opacity-50 top-0 absolute group-hover:hidden" />
      </div>

      <div className="flex justify-between items-center pt-2">
        <div>
          <p className="m-0 pt-1 font-bold leading-3">{name}</p>
          <span className="text-sm">{role}</span>
        </div>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default function SectionFour() {
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
      className="w-full h-[100svh]  text-[#F1F1FA] md:grid grid-cols-2 p-4 opacity-0"
    >
      <div className="grid gap-y-10 auto-rows-min pt-10">
        <h1 className="text-6xl">Our Team</h1>
        <div className="grid gap-y-10 auto-rows-min">
          <div className="">
            <div className="flex gap-5 w-full justify-center">
              <TeamMember
                name={"Tim Smith, PhD"}
                role={"Co-Founder, CEO"}
                imgURL={"face-1.jpeg"}
              />
              <TeamMember
                name={"Sidra Awan, PhD"}
                role={"Co-Founder, CTO"}
                imgURL={"face-2.jpeg"}
              />
              <TeamMember
                name={"Hector Sanchez"}
                role={"Chief Scientest"}
                imgURL={"face-3.jpeg"}
              />
              <TeamMember
                name={"Grace Jones"}
                role={"CFO"}
                imgURL={"face-4.jpeg"}
              />
            </div>
            <div className="pt-3">
              <p className="text-xl py-2">
                We believe that intervening directly in the aging process will
                be the most impactful way to decrease the burden of disease and
                increase healthspan in an aging population. We always look for
                talented individuals to join our mission.
              </p>
              <div className="pt-3">
                <button className="transition-all py-2 px-8 rounded border-solid border-2 border-[##F1F1FA] hover:bg-[#F1F1FA] hover:text-[#262D64] font-medium ">
                  Join Us
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <h6 className="uppercase text-center font-bold tracking-widest pb-5">
              Investors
            </h6>
            <Marquee
              autoFill={true}
              gradient={true}
              gradientWidth={100}
              gradientColor={[8, 12, 43]}
            >
              <img className="w-[170px] px-5" src="/investors/ah.png" />
              <img className="w-[170px] px-5" src="/investors/inv.png" />
              <img className="w-[170px] px-5" src="/investors/kv.png" />
              <img className="w-[170px] px-5" src="/investors/rp.png" />
              <img className="w-[170px] px-5" src="/investors/kfh.png" />
              <img className="w-[170px] px-5" src="/investors/aarp.png" />
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
