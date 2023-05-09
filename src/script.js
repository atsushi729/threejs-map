import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Models
 */
const gltfLoader = new GLTFLoader();
let mixer = null;
let mixer1 = null;

// Import Fox model
gltfLoader.load("/models/Fox/glTF/Fox.gltf", (gltf) => {
  gltf.scene.scale.set(0.025, 0.025, 0.025);
  gltf.scene.position.set(0, 0, 5);
  scene.add(gltf.scene);

  // Animation of Fox
  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[2]);
  action.play();
});

// Import Stone Floor model
gltfLoader.load("/models/StoneFloor/scene.gltf", (gltf) => {
  gltf.scene.position.set(0, -2.8, 0);
  scene.add(gltf.scene);
});

// Import Stone Wall model(right position)
gltfLoader.load("/models/StoneWall/scene.gltf", (gltf) => {
  gltf.scene.scale.set(0.3, 1, 1);
  gltf.scene.position.set(11, 0.6, -3);
  gltf.scene.rotation.y = -Math.PI * 0.5;
  scene.add(gltf.scene);
});

// Import Stone Wall model(left position)
gltfLoader.load("/models/StoneWall/scene.gltf", (gltf) => {
  gltf.scene.scale.set(0.3, 1, 1);
  gltf.scene.position.set(-11, 0.6, -3);
  gltf.scene.rotation.y = -Math.PI * 0.5;
  scene.add(gltf.scene);
});

// Import Torch model
gltfLoader.load("/models/Torch/scene.gltf", (gltf) => {
  gltf.scene.scale.set(0.5, 0.5, 0.5);
  gltf.scene.position.set(-5, -1, 0);
  scene.add(gltf.scene);

  console.log(gltf);

  // Animation of Torch
  mixer1 = new THREE.AnimationMixer(gltf.scene);
  const action = mixer1.clipAction(gltf.animations[0]);
  action.play();
});

/**
 * TODO :
 *  import multiple 3D models
 *  enable shadow effect
 *  floor texture
 */

// Import Tree model
gltfLoader.load("/models/PineTree/scene.gltf", (gltf) => {
  //   for (let i = 0; i < 10; i++) {
  //     const angle = Math.random() * Math.PI * 2; // Random angle
  //     const radius = 6 + Math.random() * 6; // Random radius
  //     const x = Math.cos(angle) * radius; // Get the x position using cosinus
  //     const z = Math.sin(angle) * radius; // Get the z position using sinus

  gltf.scene.scale.set(0.25, 0.25, 0.25);
  gltf.scene.position.set(5, 0.25, 1);
  // gltf.scene.position.set(x, 0.25, z);
  scene.add(gltf.scene);
  console.log(gltf);
  //   console.log("counter", i);
  //   }
});

// Trees
// const trees = new THREE.Group();
// scene.add(trees);

// const treeGeometry = new THREE.CylinderGeometry(0, 1, 3, 8);
// const treeMaterial = new THREE.MeshStandardMaterial({ color: "green" });
// const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 3, 8);
// const trunkMaterial = new THREE.MeshStandardMaterial({ color: "brown" });

// for (let i = 0; i < 10; i++) {
//   const angle = Math.random() * Math.PI * 2; // Random angle
//   const radius = 6 + Math.random() * 6; // Random radius
//   const x = Math.cos(angle) * radius; // Get the x position using cosinus
//   const z = Math.sin(angle) * radius; // Get the z position using sinus

//   // Create the mesh
//   const leaf = new THREE.Mesh(treeGeometry, treeMaterial);
//   const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

//   // Position
//   leaf.position.set(x, 3, z);
//   trunk.position.set(x, 1, z);

//   // Add to the trees container
//   trees.add(leaf);
//   trees.add(trunk);
// }

/**
 * Textures
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Floor
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(26, 26),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 1)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Fog
 */
// const fog = new THREE.Fog("#262837", 1, 15);
// scene.fog = fog;

/**
 * Lights
 */
// Ambient light
// const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
const ambientLight = new THREE.AmbientLight("#f9ffb9", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update 3D model animation
  if (mixer) {
    mixer.update(deltaTime);
  }
  if (mixer1) {
    mixer1.update(deltaTime * 2);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
