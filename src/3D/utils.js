import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

export function getModelTexture(size, mesh) {
  const sampler = new MeshSurfaceSampler(mesh).build();
  const position = new THREE.Vector3();
  const number = size * size;

  const data = new Float32Array(4 * number);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      sampler.sample(position);

      data[4 * index] = position.x;
      data[4 * index + 1] = position.y;
      data[4 * index + 2] = position.z;
      data[4 * index + 3] = (Math.random() - 0.5) * 0.01;
    }
  }

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}

export function getVelocitiesTexture(size) {
  const number = size * size;
  const data = new Float32Array(4 * number);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;

      data[4 * index] = 0;
      data[4 * index + 1] = 0;
      data[4 * index + 2] = 0;
      data[4 * index + 3] = 0;
    }
  }

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}
