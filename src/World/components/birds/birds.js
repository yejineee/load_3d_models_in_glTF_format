import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader'

async function loadBirds(){
  const loader = new GLTFLoader();

  const parrotData = await loader.loadAsync('/assets/models/Parrot.glb');

   console.log('parrotData!', parrotData);
}

export {loadBirds};