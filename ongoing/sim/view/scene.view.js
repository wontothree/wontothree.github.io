const { OrbitControls } = THREE;

/* =========================================
   SCENE VIEW
   Owns the Three.js environment: scene, camera, renderer,
   lights, orbit controls and the static workspace helpers.
   It knows nothing about the robot, IK or the DOM panels.
   ========================================= */

export class SceneView {
  constructor(canvas, { background = 0xffffff } = {}) {
    if (!canvas) {
      throw new Error("SceneView requires a canvas element.");
    }

    this.canvas = canvas;

    this._createScene(background);
    this._createCamera();
    this._createRenderer();
    this._createLights();
    this._createControls();
    this._createWorkspace();
  }

  /* =====================================
     SETUP
     ===================================== */

  _createScene(background) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(background);
  }

  _createCamera() {
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000);

    // Z-up world
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(267, 267, 210);
  }

  _createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  _createLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1.5);

    directional.position.set(-150, -200, 350);
    directional.castShadow = true;

    directional.shadow.mapSize.set(2048, 2048);

    directional.shadow.camera.left = -350;
    directional.shadow.camera.right = 350;
    directional.shadow.camera.top = 350;
    directional.shadow.camera.bottom = -350;

    directional.shadow.camera.near = 0.1;
    directional.shadow.camera.far = 1000;

    directional.shadow.bias = -0.0001;
    directional.shadow.normalBias = 0.02;

    this.scene.add(directional);
  }

  _createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.target.set(0, 0, 80);

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 700;
    this.controls.maxPolarAngle = Math.PI * 0.92;

    this.controls.update();
  }

  _createWorkspace() {
    // Invisible plane that only receives shadows
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.ShadowMaterial({
        color: 0x000000,
        opacity: 0.2,
      }),
    );

    shadowPlane.position.z = -0.02;
    shadowPlane.receiveShadow = true;
    this.scene.add(shadowPlane);

    // Ground grid (rotated to lie on the XY plane)
    const grid = new THREE.GridHelper(500, 25, 0xcbd5e1, 0xeef2f6);

    grid.rotation.x = Math.PI / 2;
    grid.position.z = 0.001;
    this.scene.add(grid);

    // World axes
    const axes = new THREE.AxesHelper(100);

    axes.material.transparent = true;
    axes.material.opacity = 0.45;
    this.scene.add(axes);
  }

  /* =====================================
     PUBLIC API
     ===================================== */

  // Enable shadow casting/receiving for every mesh currently in the scene.
  // Call this AFTER the objects that should cast shadows have been added.
  enableShadows() {
    this.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }

  // Enable or disable user camera interaction (e.g. while dragging the target)
  setControlsEnabled(enabled) {
    this.controls.enabled = enabled;
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();

    if (!r.width || !r.height) return;

    this.camera.aspect = r.width / r.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(r.width, r.height, false);
  }

  // Advance damping; call once per frame before drawing objects that depend on the camera
  updateControls() {
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}