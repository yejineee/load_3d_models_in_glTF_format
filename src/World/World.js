import {loadBirds} from './components/birds/birds.js'
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;
let controls;
let models = [];
let currentFocusIndex = 0;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    controls = createControls(camera, renderer.domElement);
    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  // asynchronous setup here
  async init(){
    const {parrot, flamingo, stork} = await loadBirds();

    [parrot, flamingo, stork].forEach((birdModel) => {
      this.setModels(birdModel);
    });
    
    this.focusCurrent();

    scene.add(...this.getModels());
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  focusCurrent(){
    // "target" sets the location of focus, where the object orbits around
    controls.target.copy(this.getCurrentFocusModel().position)
  }

  focusNext(){
    this.setCurrentFocusIndex(this.getNextFocusIndex());
    this.focusCurrent();
  }

  getModelsLength(){
    return models.length;
  }

  getCurrentFocusIndex(){
    return currentFocusIndex;
  }

  setCurrentFocusIndex(index){
    currentFocusIndex = index;
  }

  getCurrentFocusModel(){
    return this.getModels()[this.getCurrentFocusIndex()];
  }

  getModels(){
    return models;
  }

  getNextFocusIndex(){
    return (currentFocusIndex + 1) % this.getModelsLength();
  }

  setModels(model){
    models = [...models, model];
  }
}

export { World };
