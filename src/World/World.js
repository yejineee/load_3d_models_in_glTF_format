import {loadBirds} from './components/birds/birds.js'
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createButton } from './components/button.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { Raycaster } from './systems/Raycaster';

class World {
  #camera;
  #renderer;
  #scene;
  #loop;
  #controls;
  #models = [];
  #currentFocusIndex = 0;
  #raycaster;
  

  constructor(container) {
    this.#camera = createCamera();
    this.#renderer = createRenderer();
    this.#scene = createScene();
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer);
    this.#raycaster = new Raycaster(this.#camera, this.#scene)
    container.append(this.#renderer.domElement);

    this.#controls = createControls(this.#camera, this.#renderer.domElement);
    const { ambientLight, mainLight } = createLights();

    this.#loop.updatables.push(this.#controls);
    this.#scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, this.#camera, this.#renderer);

    // button
    const button = createButton();
    this.#scene.add(button);
  }

  // asynchronous setup here
  async init(){
    const {parrot, flamingo, stork} = await loadBirds();
    [parrot, flamingo, stork].forEach((birdModel) => {
      this.setModels(birdModel);
    });
    // this.focusCurrent();
    this.#scene.add(...this.getModels());
  }

  initRaycaster(){
    this.#renderer.domElement.addEventListener('click', this.#raycaster.calculatePointer.bind(this.#raycaster))
    window.requestAnimationFrame(this.#raycaster.render.bind(this.#raycaster));
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }

  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }

  focusCurrent(){
    // "target" sets the location of focus, where the object orbits around
    this.#controls.target.copy(this.getCurrentFocusModel().position)
  }

  focusNext(){
    this.setCurrentFocusIndex(this.getNextFocusIndex());
    this.focusCurrent();
  }

  getModelsLength(){
    return this.#models.length;
  }

  getCurrentFocusIndex(){
    return this.#currentFocusIndex;
  }

  setCurrentFocusIndex(index){
    this.#currentFocusIndex = index;
  }

  getCurrentFocusModel(){
    return this.getModels()[this.getCurrentFocusIndex()];
  }

  getModels(){
    return this.#models;
  }

  getNextFocusIndex(){
    return (this.#currentFocusIndex + 1) % this.getModelsLength();
  }

  setModels(model){
    this.#models = [...this.#models, model];
  }
}

export { World };
