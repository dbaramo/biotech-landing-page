import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useProgress, useTexture } from "@react-three/drei";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { getModelTexture, getVelocitiesTexture } from "./utils.js";
import { MainShader } from "./shaders/index";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import simPositionFragment from "./shaders/simPositionFragment.glsl";
import simVelocityFragment from "./shaders/simVelocityFragment.glsl";
import { useControls } from "leva";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export default function GPGPU() {
  const { scene, viewport, camera, raycaster } = useThree();

  const { progress } = useControls({
    progress: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (v) => {
        velocityUniforms.uProgress.value = v;
        if (v > 0.5) {
          raycasterMesh = humanBodyMesh;
        } else {
          // scene.add(humanBodyMesh);
          raycasterMesh = introCubeMesh;
        }
      },
    },
    clipValue: {
      value: 1.0,
      min: -1,
      max: 1,
      onChange: (v) => {
        mainShaderRef.current.uniforms.uClipValue.value = v;
      },
    },
    helix: {
      value: false,
      onChange: (v) => {
        if (v) {
          velocityUniforms.uCurrentModel.value = 3;
          raycasterMesh = dnaHelixMesh;
        }
      },
    },
    cameraX: {
      value: 0,
      min: -5,
      max: 5,
      onChange: (v) => {
        camera.position.x = v;
        // instancedMeshRef.current.position.x = v;
        // raycasterMesh.position.x = v;
      },
    },
    cameraY: {
      value: 0,
      min: -5,
      max: 5,
      onChange: (v) => {
        camera.position.y = v;
        // instancedMeshRef.current.position.y = v;
        // raycasterMesh.position.y = v;
      },
    },
    cameraZ: {
      value: 0,
      min: -5,
      max: 5,
      onChange: (v) => {
        camera.position.z = v;
        // instancedMeshRef.current.position.z = v;
        // raycasterMesh.position.z = v;
      },
    },
    cameraFOV: {
      value: 63,
      min: 0,
      max: 100,
      onChange: (v) => {
        camera.fov = v;
        camera.updateProjectionMatrix();
        // instancedMeshRef.current.position.z = v;
        // raycasterMesh.position.z = v;
      },
    },
    filmOffset: {
      value: 0,
      min: -100,
      max: 100,
      onChange: (v) => {
        camera.filmOffset = v;
        camera.updateProjectionMatrix();
      },
    },
  });

  const SIZE = 200;
  const { gl, size } = useThree();
  const instancedMeshRef = useRef();
  const mainShaderRef = useRef();
  const alphaTexture = useTexture("earth-map.png");
  const introCubeMesh = useGLTF("/intro-cube.glb").nodes["Plane"];
  const dnaHelixMesh = useGLTF("/dna-helix.glb").nodes["dna-helix"];
  const microscopeMesh = useGLTF("/microscope.glb").nodes["microscope"];
  const humanBodyMesh = useGLTF("/human_body.glb").nodes["human_body"];
  const sphereMesh = useGLTF("/sphere.glb").nodes["Sphere"];

  const dnaHelixTexture = useMemo(
    () => getModelTexture(SIZE, dnaHelixMesh),
    []
  );
  const introCubeTexture = useMemo(
    () => getModelTexture(SIZE, introCubeMesh),
    []
  );
  const microscopeTexture = useMemo(
    () => getModelTexture(SIZE, microscopeMesh),
    []
  );
  const humanBodyTexture = useMemo(
    () => getModelTexture(SIZE, humanBodyMesh),
    []
  );
  const sphereTexture = useMemo(() => getModelTexture(SIZE, sphereMesh), []);

  const outsideRaycast = new THREE.Vector3(1000, 1000, 1000);
  let raycasterMesh = introCubeMesh;
  const velocitiesTexture = useMemo(() => getVelocitiesTexture(SIZE), []);

  // const renderer = new THREE.WebGLRenderer();

  const gpuCompute = new GPUComputationRenderer(SIZE, SIZE, gl);
  const positionVariable = gpuCompute.addVariable(
    "uCurrentPosition",
    simPositionFragment,
    introCubeTexture
  );
  const velocityVariable = gpuCompute.addVariable(
    "uCurrentVelocity",
    simVelocityFragment,
    velocitiesTexture
  );

  gpuCompute.setVariableDependencies(positionVariable, [
    positionVariable,
    velocityVariable,
  ]);
  gpuCompute.setVariableDependencies(velocityVariable, [
    positionVariable,
    velocityVariable,
  ]);
  gpuCompute.init();

  const positionUniforms = positionVariable.material.uniforms;
  const velocityUniforms = velocityVariable.material.uniforms;
  positionUniforms.uMouse = { value: outsideRaycast };

  velocityUniforms.uMouse = { value: outsideRaycast };
  // positionUniforms.uOriginalPosition = { value: introCubeTexture };
  velocityUniforms.uIntroModel = { value: introCubeTexture };
  velocityUniforms.uHumanBodyModel = { value: humanBodyTexture };
  velocityUniforms.uMicroscopeModel = { value: microscopeTexture };
  velocityUniforms.uDnaHelixModel = { value: dnaHelixTexture };
  velocityUniforms.uSphereModel = { value: sphereTexture };
  velocityUniforms.uProgress = { value: 0 };
  velocityUniforms.uScrollProgress = { value: 0 };
  velocityUniforms.uTime = { value: 0 };
  velocityUniforms.uCurrentModel = { value: 0 };

  function changeToHumanModel() {
    velocityUniforms.uCurrentModel.value = 1;
    velocityUniforms.uProgress.value = 1;
    raycasterMesh = humanBodyMesh;
    // scene.add(raycasterMesh);
  }

  function changeToMicroscopeModel() {
    raycasterMesh = microscopeMesh;
  }

  function changeToDnaModel() {
    raycasterMesh = dnaHelixMesh;
  }

  function changeToSphereModel() {
    raycasterMesh = sphereMesh;
  }

  useEffect(() => {
    const uvArray = new Float32Array(SIZE * SIZE * 2);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const k = i * SIZE + j;
        uvArray[k * 2 + 0] = i / (SIZE - 1);
        uvArray[k * 2 + 1] = j / (SIZE - 1);
      }
    }

    instancedMeshRef.current.geometry.setAttribute(
      "uvRef",
      new THREE.InstancedBufferAttribute(uvArray, 2)
    );

    //Trasnform model into human body
    // gpuCompute.init();
    changeToHumanModel();
  }, []);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const sectionsContainer = self.selector("#sections-container")[0];

      ScrollTrigger.create({
        trigger: sectionsContainer,
        start: "top top",
        end: "bottom bottom",
        markers: false,
        onUpdate: (u) => {
          if (u.progress >= 0 && u.progress <= 0.25) {
            if (u.progress <= 0.07) changeToHumanModel();
            if (u.progress > 0.07) changeToMicroscopeModel();
          } else if (u.progress > 0.25 && u.progress <= 0.5) {
            if (u.progress <= 0.32) changeToMicroscopeModel();
            if (u.progress > 0.32) changeToDnaModel();
          } else if (u.progress > 0.5 && u.progress < 0.8) {
            changeToSphereModel();
          }

          camera.filmOffset = -24 * Math.min(u.progress, 0.25) * (1.0 / 0.25);
          camera.updateProjectionMatrix();
          velocityUniforms.uScrollProgress.value = u.progress;
          mainShaderRef.current.uniforms.uScrollProgress.value = u.progress;
        },
      });
    }, "body");

    return () => ctx.revert();
  }, []);

  const sizeRef = useRef(size);

  useEffect(() => {
    const s = sizeRef.current;

    if (s.width !== size.width || s.height !== size.height) {
      window.location.reload();
    }
  }, [size]);

  useFrame(({ clock, scene }, delta) => {
    // instancedMeshRef.current.rotation.y += 0.5 * delta;
    // raycasterMesh.rotation.y += 0.5 * delta;
    // humanBodyMesh.rotation.y += 0.1 * delta;

    gpuCompute.compute();

    mainShaderRef.current.uniforms.uTexture.value =
      gpuCompute.getCurrentRenderTarget(positionVariable).texture;
    mainShaderRef.current.uniforms.uVelocity.value =
      gpuCompute.getCurrentRenderTarget(velocityVariable).texture;

    velocityUniforms.uTime.value = clock.elapsedTime;
  });

  const pointer = new THREE.Vector2();

  document.addEventListener("mousemove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects([raycasterMesh]);

    if (intersects.length > 0) {
      positionUniforms.uMouse.value = intersects[0].point;
      velocityUniforms.uMouse.value = intersects[0].point;
    } else {
      positionUniforms.uMouse.value = outsideRaycast;
      velocityUniforms.uMouse.value = outsideRaycast;
    }
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, SIZE * SIZE]}>
      {/* <sphereGeometry args={[0.002, 9, 9]} /> */}

      <boxGeometry args={[0.004, 0.004, 0.004]} />

      <mainShader
        ref={mainShaderRef}
        key={MainShader.key}
        uTexture={introCubeTexture}
        uAlphaTexture={alphaTexture}
        transparent={true}
      />
    </instancedMesh>
  );
}

// useGLTF.preload("/intro-cube.glb");
// useGLTF.preload("/dna-helix.glb");
// useGLTF.preload("/human_body.glb");
// useGLTF.preload("/microscope.glb");
