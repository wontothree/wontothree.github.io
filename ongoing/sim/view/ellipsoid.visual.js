import {
  transpose,
  mm,
  eig3,
} from "../core/math.js";

import { basic } from "./three.utils.js";

const { OrbitControls } = THREE;

export class EllipsoidVisual {
  constructor({
    canvasId = "ell",
    robot,
    accentColor = 0xff7700,
  }) {
    this.robot = robot;
    this.accentColor = accentColor;

    const cv = document.getElementById(canvasId);
    if (!cv) return;

    this.renderer = new THREE.WebGLRenderer({
      canvas: cv,
      antialias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(
      Math.min(devicePixelRatio, 2),
    );

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      32,
      1,
      0.1,
      50,
    );

    this.camera.up.set(0, 0, 1);
    this.camera.position.set(3.3, 3.3, 2.8);
    this.camera.lookAt(0, 0, 0);

    this.controls = new OrbitControls(this.camera, cv);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;

    this.group = new THREE.Group();

    const geo = new THREE.SphereGeometry(1, 40, 28);

    this.group.add(
      new THREE.Mesh(
        geo,
        basic(this.accentColor, {
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        }),
      ),
    );

    this.group.add(
      new THREE.Mesh(
        geo,
        basic(this.accentColor, {
          wireframe: true,
          transparent: true,
          opacity: 0.28,
        }),
      ),
    );

    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ].forEach(([x, y, z]) => {
      this.group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-x, -y, -z),
            new THREE.Vector3(x, y, z),
          ]),
          new THREE.LineBasicMaterial({
            color: 0x475569,
          }),
        ),
      );
    });

    this.scene.add(this.group);

    const axes = new THREE.AxesHelper(1.7);
    axes.material.transparent = true;
    axes.material.opacity = 0.3;
    this.scene.add(axes);

    if (
      typeof ResizeObserver !== "undefined" &&
      cv.parentElement
    ) {
      new ResizeObserver(() => {
        const r = cv.getBoundingClientRect();
        if (!r.width || !r.height) return;

        this.renderer.setSize(r.width, r.height, false);
        this.camera.aspect = r.width / r.height;
        this.camera.updateProjectionMatrix();
      }).observe(cv.parentElement);
    }
  }

  _setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  update(q) {
    const Jv = this.robot.jacKin(q);
    const JvJT = mm(Jv, transpose(Jv));
    const E = eig3(JvJT);

    const sg = E.map((e) =>
      Math.sqrt(Math.max(e.val, 0)),
    );

    const smax = sg[0];
    const smid = sg[1];
    const smin = sg[2];

    const mu = smin > 1e-4 ? smax / smin : Infinity;
    const w = Math.sqrt(
      Math.max(
        0,
        smax * smax * smid * smid * smin * smin,
      ),
    );

    this._setText(
      "mu1",
      isFinite(mu)
        ? mu > 999
          ? ">999"
          : mu.toFixed(3)
        : "∞",
    );

    this._setText(
      "mu2",
      isFinite(mu)
        ? mu * mu > 9999
          ? ">9999"
          : (mu * mu).toFixed(3)
        : "∞",
    );

    this._setText(
      "mu3",
      w >= 1000 ? w.toFixed(0) : w.toFixed(3),
    );

    this._setText(
      "ell-s",
      "σ  " +
        sg.map((v) => v.toFixed(1)).join(" · ") +
        "  scaled unit/s per rad/s",
    );

    const k = smax > 1e-6 ? 1.15 / smax : 0;
    const sc = sg.map((v) => Math.max(v * k, 0.03));

    const v1 = new THREE.Vector3(...E[0].vec);
    const v2 = new THREE.Vector3(...E[1].vec);
    const v3 = new THREE.Vector3().crossVectors(v1, v2);

    if (
      this.group &&
      this.controls &&
      this.renderer &&
      this.scene &&
      this.camera
    ) {
      new THREE.Matrix4()
        .makeBasis(
          v1.clone().multiplyScalar(sc[0]),
          v2.clone().multiplyScalar(sc[1]),
          v3.multiplyScalar(sc[2]),
        )
        .decompose(
          this.group.position,
          this.group.quaternion,
          this.group.scale,
        );

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }
}