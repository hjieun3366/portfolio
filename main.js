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
scene.background = new Color('black')

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
const material = new MeshBasicMaterial({wireframe:true, color: "rgba(255, 10, 50, 0.3)"});
const cube = new Mesh(geometry, material);
cube.name = "cubeZero"
cube.rotation.set(-0.5, -0.1, 1.8);
cube.position.set(-4, -2, 0);
cube.scale.set(1.5, 1.5, 1.5);

const cubeOneGeo = new IcosahedronBufferGeometry(1, 0);
const cubeOneMat = new MeshBasicMaterial({wireframe:true, color: "rgba(100, 5, 150, 0.3)"});
const cubeOne = new Mesh(cubeOneGeo, cubeOneMat);
cubeOne.name = "cubeOne"
cubeOne.rotation.set(-0.5, -0.1, 1.8);
cubeOne.position.set(0, -2, 0);
cubeOne.scale.set(1.5, 1.5, 1.5);

const cubeTwoGeo = new IcosahedronBufferGeometry(1, 0);
const cubeTwoMat = new MeshPhongMaterial({color: "rgba(200, 100, 0, 0.3)"});
const cubeTwo = new Mesh(cubeTwoGeo, cubeTwoMat);
cubeTwo.name = "cubeTwo"
cubeTwo.rotation.set(-0.5, -0.1, 1.8);
cubeTwo.position.set(4, -2, 0);
cubeTwo.scale.set(1.5, 1.5, 1.5);

const cubeThreeGeo = new IcosahedronBufferGeometry(1, 0);
const cubeThreeMat = new MeshBasicMaterial({wireframe:true, color: "rgba(0, 200, 100, 0.3)"});
const cubeThree = new Mesh(cubeThreeGeo, cubeThreeMat);
cubeThree.name = "cubeThree"
cubeThree.rotation.set(-0.5, -0.1, 1.8);
cubeThree.position.set(-4, 3, 0);
cubeThree.scale.set(1.5, 1.5, 1.5);

const cubeFourGeo = new IcosahedronBufferGeometry(1, 0);
const cubeFourMat = new MeshPhongMaterial({color: "rgba(0, 50, 200, 0.3)"});
const cubeFour = new Mesh(cubeFourGeo, cubeFourMat);
cubeFour.name = "cubeFour"
cubeFour.rotation.set(-0.5, -0.1, 1.8);
cubeFour.position.set(0, 3, 0);
cubeFour.scale.set(1.5, 1.5, 1.5);

const cubeFiveGeo = new IcosahedronBufferGeometry(1, 0);
const cubeFiveMat = new MeshPhongMaterial({color: "rgba(200, 255, 20, 0.3)"});
const cubeFive = new Mesh(cubeFiveGeo, cubeFiveMat);
cubeFive.name = "cubeFive"
cubeFive.rotation.set(-0.5, -0.1, 1.8);
cubeFive.position.set(4, 3, 0);
cubeFive.scale.set(1.5, 1.5, 1.5);
//const torGeo = new TorusKnotBufferGeometry( 1, 0.4, 64, 8 );
//const torMat = new MeshStandardMaterial( { color: "rgba(100, 100, 200, 0.2)"} );
//const torusKnot = new Mesh( torGeo, torMat );
//torusKnot.position.set(-2, 0, 0);

scene.add(cube, cubeOne, cubeTwo, cubeThree, cubeFour, cubeFive, light);

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
  if(intersects.length > 0) {}
    for(let i = 0; i < intersects.length; i++) {
      if(mouseClicked) {
        if(intersects[i].object.name == "cubeZero") {
          window.location.assign("../projects/neighborhoodSF/index.html");
          //intersects[i].object.material.color.set(0x000000);
        } 
        else if (intersects[i].object.name == "cubeOne") {
          window.location.assign("../projects/theRedTree/index.html");
        }
        else if (intersects[i].object.name == "cubeTwo") {
          window.location.assign("../projects/oneDay/index.html");
        }
        else if (intersects[i].object.name == "cubeThree") {
          window.location.assign("../projects/publicLibrary/index.html");
        }
        else if (intersects[i].object.name == "cubeFour") {
          window.location.assign("../projects/lotus/index.html");
        }
        else if (intersects[i].object.name == "cubeFive") {
          window.location.assign("../projects/hanok/index.html");
        }
      }
    }

  cube.rotation.set(rotateX, rotateY, 0);
  rotateX+=0.002;
  rotateY+=0.001;
  cubeOne.rotation.set(rotateX, rotateY, 0);
  rotateX+=0.001;
  rotateY+=0.002;
  cubeTwo.rotation.set(rotateX, rotateY, 0);
  rotateX+=0.001;
  rotateY+=0.001;
  cubeThree.rotation.set(rotateX, rotateY, 0);
  rotateX+=0.002;
  rotateY+=0.002;
  cubeFour.rotation.set(rotateX, rotateY, 0);
  rotateX+=0.002;
  rotateY+=0.001;
  cubeFive.rotation.set(rotateX, rotateY, 0);
  rotateX+=0.001;
  rotateY+=0.002;


  //torusKnot.rotation.set(rotateX, rotateY, 0);
  //rotateX+=0.01;
  //rotateY+=0.02;

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

/window.addEventListener('mousemove', function(e){
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