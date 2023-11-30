import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GPGPU from "./GPGPU";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Scene() {
  const { camera, scene } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    // controlsRef.current.object.position.set(0, 0, 1.8);

    const ctx = gsap.context(() => {
      const cameraTween = gsap.to(null, {
        duration: 2,
        ease: "power1.out",
        onUpdate: () => {
          const p = cameraTween.progress();

          controlsRef.current.object.position.y = 5 + -p * 5 + 0.2;
          controlsRef.current.object.position.z = p * 1.6;
          camera.fov = 75 - 12 * p;
          camera.updateProjectionMatrix();
        },
      });
    });
    return () => ctx.revert();
  }, []);
  // useFrame(({ camera }) => {
  //   console.log(camera);
  // });
  return (
    <>
      <OrbitControls
        ref={controlsRef}
        autoRotate={true}
        autoRotateSpeed={3}
        enableRotate={false}
        enableZoom={false}
      />
      {/* <cameraHelper args={[camera]} /> */}
      <GPGPU />
    </>
  );
}
