import { PerspectiveCamera } from 'three';

function createCamera() {
  // fov, aspect ratio, near, far
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(-3, 3, 6.5);

  return camera;
}

export { createCamera };
