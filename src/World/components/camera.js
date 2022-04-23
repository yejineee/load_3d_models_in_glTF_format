import { PerspectiveCamera } from 'three';

function createCamera() {
  // fov, aspect ratio, near, far
  const camera = new PerspectiveCamera(50, 1, 2000, 4000);

  camera.position.set(0, 2000, 2000);

  return camera;
}

export { createCamera };
