import { World } from './World/World.js';

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world. constructor에서 동기적인 세팅
  const world = new World(container);

  // complete async tasks. init에서 비동기적인 세팅
  await world.init();

  world.initRaycaster((intersect) => {
    if(intersect.object.name !== 'button'){
      return;
    }
    world.focusNext();
  });

  // start the animation loop
  world.start();
}

main().catch((err) => {
  console.error(err)
})
