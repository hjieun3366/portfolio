import {
    scene, 
    camera, 
    renderer, 
    controls, 
    model, 
    hemiLight, 
    spotLight
  } from '../../libs/threejs/build/three.module.js'
  
  import {
    OrbitControls,
  } from '../../libs/threejs/examples/jsm/controls/OrbitControls.js'
  
  import {
    GLTFLoader,
  } from '../../libs/threejs/examples/jsm/loaders/GLTFLoader.js'


    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdddddd);

      camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,1,5000);
      camera.position.set(0, 25, 25);
      controls = new THREE.OrbitControls(camera);

      hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
      scene.add(hemiLight);

      spotLight = new THREE.SpotLight(0xffa95c, 4);
      spotLight.castShadow = true;
      spotLigtt.shadow.bias = -0.0001;
      spotLight.shadow.mapSize.width = 1024*4;
      spotLight.shadow.mapSize.height = 1024*4;
      scene.add(spotLight);

     
      renderer = new THREE.WebGLRenderer();
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 2.3;
      renderer.shadowMap.enabled = true;
renderer.setSize(window.innderWidth,window.innerHeight);
      document.body.appendChild(renderer.domElement);

      new TJREE.GLTFLoader()/load("../3d_models/honeycomb.glb", result =>{
        model = result.scene.children[0];
        model.position.set(0, -5,-25);
        model.traverse(n => {
          if(n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if(n.material.map) n.material.map.anisotropy = 16;
          }
        });
        scene.add(model);
        animate();
      });


      animate();
    }
    function animation() {
      renderer.render(scene, camera);
      spotLight.positin.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10

      );
      requestAnimationFrame(animate);
    }
    init();