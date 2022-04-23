import * as THREE from 'three';

class Raycaster {
  constructor(camera, scene){
    this.container = document.querySelector('#scene-container');
    this.camera = camera;
    this.scene = scene;
    this.pointer =  new THREE.Vector2(); 
    this.raycaster = new THREE.Raycaster();
  }

  calculatePointer(event) {
	  this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  render(){
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    for(let i = 0; i < intersects.length ; i++){
      intersects[i].object.material.color.set(new THREE.Color('blue'))
    }
    window.requestAnimationFrame(this.render.bind(this));
  }
}

export {Raycaster};