import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader'
import {setupModel} from './setupModel';

async function loadBirds(){
  const loader = new GLTFLoader();

  const [parrotData, storkData, flamingoData] = await Promise.all([
    loader.loadAsync('/assets/models/Parrot.glb'),
    loader.loadAsync('/assets/models/Stork.glb'),
    loader.loadAsync('/assets/models/Flamingo.glb'),
  ])

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(0, 0, -5);

  const stork = setupModel(storkData);
  stork.position.set(0, 2, 0);
  
  return {parrot, flamingo, stork};
}

export {loadBirds};