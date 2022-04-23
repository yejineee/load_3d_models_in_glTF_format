import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';

const DEFAULT_SIZE = 0.5;

function createButton() {
  const geometry = new BoxBufferGeometry(DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE / 2);

  const material = new MeshBasicMaterial();

  const button = new Mesh(geometry, material);
  button.name = 'button';

  return button;
}

export { createButton };
