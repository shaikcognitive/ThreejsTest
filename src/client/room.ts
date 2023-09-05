import * as THREE from 'three'

const geometry = new THREE.PlaneGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0xB1A595,
    wireframe: false,
})
const cube = new THREE.Mesh(geometry, material)

cube.position.set(2,1.5,-2.4);
cube.rotation.set(0,0,0);
cube.scale.set(4,3,0.1);