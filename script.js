import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background
document.body.appendChild(renderer.domElement);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';

// Load 3D model
let model;
const loader = new GLTFLoader();

loader.load('assets/models/scene.glb',
    function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.scale.set(0.01, 0.01, 0.01);
        animate();
    },
    undefined,
    function (error) {
        console.error('Error loading 3D model:', error);
        // Remove the canvas if model fails to load
        renderer.domElement.remove();
    }
);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.x += 0.005;
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// Resize handling
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

