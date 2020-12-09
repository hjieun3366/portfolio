// import whatever modules you need from three.js

import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  SphereBufferGeometry,
} from '../../libs/threejs/build/three.module.js'

import {
  OrbitControls,
} from '../../libs/threejs/examples/jsm/controls/OrbitControls.js'

import {
  GLTFLoader,
} from '../../libs/threejs/examples/jsm/loaders/GLTFLoader.js'

// Global variables (we'll use these to rotate our shapes below)
let rotateX = 0;
let rotateY = 0;

// get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new Scene();

// set the background color of the scene (set this to be the same background color of the container)
scene.background = new Color('rgb(187, 225, 254)')

// create camera
const fov = 35; // field of view
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(10, 0, 10);


// create lights
const light = new DirectionalLight('white', 8);
light.position.set(10, 10, 10);

// create a shape with geometry, material, and then pass those in
// as arguments to a mesh
const geometry = new BoxBufferGeometry();
const material = new MeshStandardMaterial();
const cube = new Mesh();

//cube.rotation.set(-0.5, -0.1, 0.8);
//cube.position.set(1, 1, -10);
//cube.scale.set(1.5, 1.5, 1.5);


const loader = new GLTFLoader();

loader.load('../../assets/3d_models/neighborhood.glb', function(gltf) {

  console.log(gltf.scene);

  gltf.scene.scale.set(0.5, 0.5, 0.5);
  gltf.scene.position.set(-3, -1, 0);
  
  scene.add(gltf.scene);
}, undefined, function(error){
  console.error(error);
})

scene.add(cube, light);

const renderer = new WebGLRenderer({ antialias: true });

// initialize controls
const controls = new OrbitControls(camera, renderer.domElement);

renderer.physicallyCorrectLights = true;

renderer.setSize(container.clientWidth, container.clientHeight);

renderer.setPixelRatio(window.devicePixelRatio);

container.append(renderer.domElement);

renderer.render(scene, camera);

window.addEventListener("resize", function(){
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
})


// create the animation loop (basically the p5.js draw loop)
renderer.setAnimationLoop(function() {

  cube.rotation.set(rotateX, rotateY, 0);
  rotateX+=0.01;
  rotateY+=0.05;

  controls.update();
  renderer.render(scene, camera);
})



