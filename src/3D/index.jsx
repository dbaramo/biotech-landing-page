import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Scene from "./Scene";
import { Leva } from "leva";
import { Perf } from "r3f-perf";

function R3FScene() {
  return (
    <>
      <div id="canvas-container">
        {/* <Stats /> */}
        {<Leva collapsed />}
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 0, 1.8],
            // position: [0, 5, 0],
          }}
        >
          {/* <Perf /> */}
          <Scene />
        </Canvas>
      </div>
    </>
  );
}

export default R3FScene;
