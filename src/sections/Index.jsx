import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import LastSection from "./LastSection";
import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";

function Loading(props) {
  const loadingTextRef = useRef(null);
  const { loaded } = props;
  if (loadingTextRef.current) {
    loadingTextRef.current.textContent = `${((loaded / 13) * 100).toFixed(
      0,
    )} %`;
  }

  return (
    <section className="w-full h-[100svh] text-[#F1F1FA] flex justify-center items-center text-center absolute">
      <div>
        {/* <p>LOADING</p> */}
        <p className="text-5xl" ref={loadingTextRef}>
          0 %
        </p>
      </div>
    </section>
  );
}

export default function Sections() {
  const { loaded } = useProgress();
  return (
    <div>
      {loaded / 13 < 1 ? <Loading loaded={loaded} /> : null}
      <div id="sections-container" className="w-full h-full ">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <LastSection />
      </div>
    </div>
  );
}

// export default function Content() {
//   const { loaded } = useProgress();

//   return loaded / 13 < 1 ? <Loading loaded={loaded} /> : <Sections />;
//   // return <Sections />;
// }
