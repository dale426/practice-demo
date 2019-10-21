
// import * as THREE from 'three';
// import stats from 'stats.js';
// import initOrbitControls from 'three-orbit-controls';

// import DDSLoader from '../three/DDSLoader';
// import MTLLoader from '../three/MTLLoader';
// import OBJLoader from '../three/OBJLoader';
// import Detector from '../three/Detector';

// const OrbitControls = initOrbitControls(THREE)

// DDSLoader(THREE);
// MTLLoader(THREE);
// OBJLoader(THREE);

// var container;
// var camera, scene, renderer;
// var mouseX = 0, mouseY = 0;
// var windowHalfX = window.innerWidth / 2;
// var windowHalfY = window.innerHeight / 2;
// init();
// animate();
// function init() {
//     container = document.createElement('div');
//     document.body.appendChild(container);

//     // 创建场景
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x333333);

//     // 创建相机

//     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
//     // camera.position.z = 250;
//     camera.position.set(0, 50, 50);

//     // 添加光
//     const light = new THREE.DirectionalLight()
//     light.position.set(0, 20, 20)
//     camera.add(light)

//     scene.add(camera)

//     // scene

//     /*     var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
//         scene.add(ambientLight);
    
//         var pointLight = new THREE.PointLight(0xffffff, 0.8);
//         camera.add(pointLight); */
//     // model
//     var onProgress = function (xhr) {
//         if (xhr.lengthComputable) {
//             var percentComplete = xhr.loaded / xhr.total * 100;
//             console.log(Math.round(percentComplete, 2) + '% downloaded');
//         }
//     };
//     var onError = function (xhr) { };
//     THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
//     new THREE.MTLLoader()
//         .setPath('assets/obj/')
//         .load('male02.mtl', function (materials) {
//             materials.preload();
//             new THREE.OBJLoader()
//                 .setMaterials(materials)
//                 .setPath('assets/obj/')
//                 .load('male02.obj', function (object) {
//                     object.position.y = - 95;
//                     scene.add(object);
//                 }, onProgress, onError);
//         });
//     //
//     renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // 添加控制
//     initControl()
    
//     // document.addEventListener('mousemove', onDocumentMouseMove, false);
//     //
//     window.addEventListener('resize', onWindowResize, false);
// }
// function onWindowResize() {
//     windowHalfX = window.innerWidth / 2;
//     windowHalfY = window.innerHeight / 2;
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }
// function onDocumentMouseMove(event) {
//     mouseX = (event.clientX - windowHalfX) / 2;
//     mouseY = (event.clientY - windowHalfY) / 2;
// }
// //
// function animate() {
//     requestAnimationFrame(animate);
//     render();
// }
// function render() {
//     // camera.position.x += (mouseX - camera.position.x) * .05;
//     // camera.position.y += (- mouseY - camera.position.y) * .05;
//     camera.lookAt(scene.position);
//     renderer.render(scene, camera);
// }
// function initControl() {
//     const controls = new OrbitControls(camera)
//     controls.maxPolarAngle = 1.5
//     controls.minPolarAngle = 0.5
//     controls.rotateSpeed = 5.0
//     controls.zoomSpeed = 5
//     controls.panSpeed = 2
//     controls.onZoom = false
//     controls.enablePan = false
//     controls.enableDamping = true
//     controls.dampingFactor = 0.3
//     controls.minDistance = 10
//     controls.maxDistance = 800
// }