import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";
export const MainShader = shaderMaterial(
  {
    uTexture: null,
    uPosition: null,
    uVelocity: null,
    uAlphaTexture: null,
    uScrollProgress: null,
    uClipValue: -1,
  },
  vertex,
  fragment
);

// declaratively
extend({ MainShader });
