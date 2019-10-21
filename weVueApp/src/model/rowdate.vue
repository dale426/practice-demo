<template>
    <div>
        <h1>展示页面123</h1>
        <div id="model3d"></div>
    </div>
</template>
<script>
import * as THREE from "three";
import initOrbitControls from "three-orbit-controls";
import OBJLoader from "three-obj-loader";
import MTLLoader from "three-mtl-loader";
OBJLoader(THREE);
const {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    DirectionalLight,
    Color,
    Vector3,
    Raycaster,
    TextureLoader,
    MeshBasicMaterial,
    BackSide,
    Mesh,
    CubeGeometry,
    MeshFaceMaterial,
    DoubleSide,
    JSONLoader,
    Group,
    Geometry,
    PointsMaterial,
    AddEquation,
    Points,
    Vector2,
    MeshLambertMaterial,
    LensFlare,
    AdditiveBlending,
    ShaderMaterial,
} = THREE
const OrbitControls = initOrbitControls(THREE);
export default {
  name: "rowDate",
  data() {
    return {

    };
  },
  attached() {
    console.log("this.height", document.getElementById("model3d"));
    
    const defaultOptions = {
      width: window.innerWidth,
      height: window.innerHeight-30,
      element: document.body,
      pixelRatio: window.devicePixelRatio,
      debugMode: false
    };
    this.options = Object.assign({}, defaultOptions);
    this.animate = this.animate.bind(this);
    this.initThreejs();
    this.initSence();
    this.initCamera();
    this.initLight();
    this.initMtl();
    this.initControl();
    this.animate();
    this.render();
  },
  methods: {
    initThreejs() {
      const renderer = (this.renderer = new WebGLRenderer({
        alpha: true,
        antialias: true
      }));
      let el = document.getElementById("model3d");
      renderer.setSize(this.options.width, this.options.height);
      renderer.setPixelRatio(this.options.pixelRatio);
el.appendChild(renderer.domElement);
    //   this.options.element.appendChild &&
    //     this.options.element.appendChild(renderer.domElement);
    },
    initSence() {
      const scene = (this.scene = new Scene());
      scene.background = new Color(0xffffff);
    },

    initCamera() {
      const camera = (this.camera = new PerspectiveCamera(
        10,
        this.options.width / this.options.height,
        1,
        10000
      ));
      // camera.position.set(0, 50, 50)
      camera.position.z = 250;
      camera.lookAt(new Vector3(0, 0, 0));
      this.scene.add(camera);
    },

    initLight() {
      // 环境光
      var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      this.scene.add(ambientLight);

      // 平行光
      const light = (this.light = new DirectionalLight());
      light.position.set(0, 20, 20);

      // 点光
      // const pointLight = new THREE.PointLight(0xffffff, 0.8);
      // pointLight.position.set(0, 20, 20)
      this.camera.add(light);
    },

    initMtl() {
      let scene = this.scene;
      var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          console.log(percentComplete);
        }
      };

      var onError = function(xhr) {};

      // THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
      const mtlLoader = new MTLLoader();
      mtlLoader.setPath("src/assets/obj/obj001/");
      mtlLoader.load("Box001.mtl", function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("src/assets/obj/obj001/");
        objLoader.load(
          "Box001.obj",
          function(object) {
            // object.position.y = -0.5;
            // object.position.y = - 95;
            scene.add(object);
          },
          onProgress,
          onError
        );
      });
    },
    initControl() {
      const controls = (this.controls = new OrbitControls(this.camera));
      controls.maxPolarAngle = 1.5;
      controls.minPolarAngle = 0.5;
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 2;
      controls.panSpeed = 2;
      controls.onZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.3;
      controls.minDistance = 120;
      controls.maxDistance = 300;
    },

    animate() {
      window.requestAnimationFrame(this.animate);
      this.controls.update();
      this.render();
    },

    render() {
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style lang="less">
h1{
  width: 375px;
  height: 20px;
background: yellowgreen;
  // border: 2px solid red;
}
</style>