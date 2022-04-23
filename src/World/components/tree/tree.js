import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {setupModel} from './setupModel';

async function loadTree(){
  const loader = new GLTFLoader();

  const [treeData] = await Promise.all([
    loader.loadAsync('/assets/models/tree.glb'),
  ])

  const tree = setupModel(treeData);
  tree.name = 'tree'
  
  return {tree};
}

export {loadTree};