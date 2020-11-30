// import whatever modules you need from three.js

import {
  IcosahedronBufferGeometry,
  PolyhedronBufferGeometry,
  TorusKnotBufferGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  Raycaster,
  Vector2,
  WireframeGeometry,
  LineSegments,
} from '../libs/threejs/build/three.module.js'
import { OrbitControls } from '../libs/threejs/examples/jsm/controls/OrbitControls.js'

let rotateX = 0;
let rotateY = 0;

// get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new Scene();

// set the background color of the scene (set this to be the same background color of the container)
scene.background = new Color('skyblue')

// create camera
const fov = 35; // field of view
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 20);

// create lights
const light = new DirectionalLight('white', 6);
light.position.set(10, 10, 20);

// create raycaster for clicking on objects
const raycaster = new Raycaster();

// create a variable to store our mouse position
const mouse = new Vector2();

// create a boolean to check if the mouse is pressed
let mouseClicked = false;

// create a shape with geometry, material, and then pass those in
// as arguments to a mesh

const geometry = new IcosahedronBufferGeometry(1, 0);
const material = new MeshPhongMaterial({color: "rgba(100, 1, 150, 0.3)"});
const wireframe = new WireframeGeometry(geometry);
const line = new LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;

const cube = new Mesh(geometry, material, line);

cube.rotation.set(-0.5, -0.1, 1.8);
cube.position.set(2, 0, 0);
cube.scale.set(1.5, 1.5, 1.5);
// create a sphere

const torGeo = new TorusKnotBufferGeometry( 1, 0.4, 64, 8 );
const torMat = new MeshStandardMaterial( { color: "rgba(100, 100, 200, 0.2)"} );
const torusKnot = new Mesh( torGeo, torMat );

torusKnot.position.set(-2, 0, 0);

scene.add(cube, torusKnot, light);



const renderer = new WebGLRenderer({ antialias: true });

// initialize controls
const controls = new OrbitControls(camera, renderer.domElement);

renderer.physicallyCorrectLights = true;

renderer.setSize(container.clientWidth, container.clientHeight);

renderer.setPixelRatio(window.devicePixelRatio);

container.append(renderer.domElement);
renderer.render(scene, camera);


// create the animation loop (basically the p5.js draw loop)
renderer.setAnimationLoop(function() {

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  if(intersects.length > 0) {
    // console.log(intersects);
  }

  for(let i = 0; i < intersects.length; i++) {

    if(mouseClicked) {
      if(intersects[i].object.name == "myCube") {
        intersects[i].object.material.color.set({color: "black"});
      } else if (intersects[i].object.name == "myTor") {
        intersects[i].object.material.color.set(0x0000ff);
      }
      
      console.log(intersects[i]);
      // window.location.assign("https://crouton.net");
    }
  }
  //cube.rotation.set(rotateX, rotateY, 0);
  //rotateX+=0.01;
  //rotateY+=0.05;

  controls.update();
  renderer.render(scene, camera);
})

///// EVENT LISTENERS
window.addEventListener("resize", function(){
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
})

window.addEventListener('mousemove', function(e){
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
})

window.addEventListener('pointerdown', function(e){
  mouseClicked = true;
})

window.addEventListener('pointerup', function(e){
  mouseClicked = false;
})