import { ROBOT_CONFIG } from "./robot.config.js";
import { Robot } from "./robot.js";
import { RobotVisual } from "./robot.visual.js";

import {
  RAD,
  transpose,
  mm,
  solve,
  eig3,
} from "./math.js";

import {
  vec,
  clamp,
  basic,
  newLine,
  setLine,
} from "./three.utils.js";

import { TargetMarker } from "./target.marker.js";

const { OrbitControls } = THREE;

/* =========================================
   MASTER SWITCH
   false: hide target ball / arrows / foot / stem
   IK and error line remain active.
   ========================================= */

const ENABLE_TARGET_MARKER = true;

const DT = 1 / 60;

const ACC = 0xff7700;
const INK = 0x0f172a;

/* =========================================
   SIMULATOR
   ========================================= */

class Simulator {
  /* =====================================
     DOM HELPERS
     ===================================== */

  getElement(id) {
    return document.getElementById(id);
  }

  setText(id, value) {
    const el = this.getElement(id);

    if (el) el.textContent = value;
  }

  setValue(id, value) {
    const el = this.getElement(id);

    if (el) el.value = value;
  }

  getNumber(id, fallback) {
    const el = this.getElement(id);

    if (!el) return fallback;

    const value = Number(el.value);

    return Number.isFinite(value) ? value : fallback;
  }

  getValue(id, fallback) {
    const el = this.getElement(id);

    return el ? el.value : fallback;
  }

  bind(id, eventName, callback) {
    const el = this.getElement(id);

    if (el) el.addEventListener(eventName, callback);

    return el;
  }

  /* =====================================
     CONSTRUCTOR
     ===================================== */

  constructor(config = ROBOT_CONFIG) {
    this.config = config;

    this.robot = new Robot(config);
    this.dof = config.joints.length;

    // Use the supplied configuration rather than global limits.
    this.limits = config.joints.map((j) => j.limit);
    this.names = config.joints.map((j) => j.name);

    this.q = [...config.initialPosition];
    this.qdot = Array(this.dof).fill(0);

    this.running = false;

    this.lastChangeTime = Array(this.dof).fill(0);

    this.control = {
      method: "dls",
      gain: 2,
      damping: 1,
      cart: 35,
      speed: 90,
    };

    /* =====================================
       CANVAS
       ===================================== */

    const viewCanvas = this.getElement("view");

    if (!viewCanvas) {
      throw new Error(
        '5-DOF Robotics Studio requires a canvas with id="view".',
      );
    }

    /* =====================================
       SCENE
       ===================================== */

    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(
      42,
      1,
      0.1,
      2000,
    );

    this.camera.up.set(0, 0, 1);
    this.camera.position.set(267, 267, 210);

    this.renderer = new THREE.WebGLRenderer({
      canvas: viewCanvas,
      antialias: true,
    });

    this.renderer.setPixelRatio(
      Math.min(devicePixelRatio, 2),
    );

    /* =====================================
       ORBIT CONTROLS
       ===================================== */

    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement,
    );

    this.controls.target.set(0, 0, 80);

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 700;
    this.controls.maxPolarAngle = Math.PI * 0.92;

    this.controls.update();

    /* =====================================
       WORKSPACE
       ===================================== */

    const grid = new THREE.GridHelper(
      500,
      25,
      0xcbd5e1,
      0xeef2f6,
    );

    grid.rotation.x = Math.PI / 2;

    this.scene.add(grid);

    const axes = new THREE.AxesHelper(100);

    axes.material.transparent = true;
    axes.material.opacity = 0.45;

    this.scene.add(axes);

    /* =====================================
       ROBOT VISUALIZATION
       ===================================== */

    this.robotVisual = new RobotVisual({
      scene: this.scene,
      robot: this.robot,
      dof: this.dof,
      accentColor: ACC,
    });

    /* =====================================
       TARGET STATE
       ===================================== */

    this.target = new THREE.Group();

    this.scene.add(this.target);

    this.errorLine = newLine(0x94a3b8, 4, 3);

    this.scene.add(this.errorLine);

    /* =====================================
       TARGET MARKER
       ===================================== */

    this.marker = null;

    if (ENABLE_TARGET_MARKER) {
      this.marker = new TargetMarker({
        scene: this.scene,
        camera: this.camera,
        domElement: this.renderer.domElement,
        target: this.target,

        onDragging: (dragging) => {
          this.controls.enabled = !dragging;

          if (dragging) this.stop();
        },

        onChange: () => {
          this.syncTarget();
          this.start();
        },
      });
    }

    /* =====================================
       INITIALIZATION
       ===================================== */

    this.initKin();
    this.initEllipsoid();
    this.buildUI();

    this.resize();

    window.addEventListener(
      "resize",
      () => this.resize(),
    );

    this.target.position.copy(
      vec(this.robot.fkVisual(this.q).head),
    );

    this.syncTarget();

    this.draw();
    this.refresh();
    this.animate();
  }

  /* =====================================
     TARGET MARKER CONTROL
     ===================================== */

  setTargetVisible(visible) {
    this.marker?.setVisible(visible);
  }

  /* =====================================
     RESIZE
     ===================================== */

  resize() {
    const view = this.getElement("view");

    if (!view) return;

    const r = view.getBoundingClientRect();

    if (!r.width || !r.height) return;

    this.camera.aspect = r.width / r.height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(r.width, r.height, false);
  }

  /* =====================================
     VELOCITY KINEMATICS UI
     ===================================== */

  initKin() {
    const eq = this.getElement("eq");

    if (!eq) return;

    const labels = [
      "&omega;<sub>x</sub> (rad/s)",
      "&omega;<sub>y</sub>",
      "&omega;<sub>z</sub>",
      "v<sub>x</sub>",
      "v<sub>y</sub>",
      "v<sub>z</sub>",
    ];

    const R = (n, f) =>
      Array.from({ length: n }, (_, i) => f(i)).join("");

    eq.innerHTML = `
      <table class="mx vec">
        <thead>
          <tr><th></th><th>V</th></tr>
        </thead>
        <tbody>
          ${R(
            6,
            (r) => `
              <tr class="${r === 3 ? "sep" : ""}">
                <td class="lab">${labels[r]}</td>
                <td class="val res" id="tw${r}">0.00</td>
              </tr>
            `,
          )}
        </tbody>
      </table>

      <div class="op">=</div>

      <table class="mx mat">
        <thead>
          <tr>
            ${R(
              this.dof,
              (c) => `<th>J<sub>${c + 1}</sub></th>`,
            )}
          </tr>
        </thead>
        <tbody>
          ${R(
            6,
            (r) => `
              <tr class="${r === 3 ? "sep" : ""}">
                ${R(
                  this.dof,
                  (c) => `<td id="jc${r}_${c}">0.00</td>`,
                )}
              </tr>
            `,
          )}
        </tbody>
      </table>

      <div class="op">&middot;</div>

      <table class="mx vec qvec">
        <thead>
          <tr><th></th><th>&theta;&#775;</th></tr>
        </thead>
        <tbody>
          ${R(
            this.dof,
            (c) => `
              <tr>
                <td class="lab">&theta;<sub>${c + 1}</sub></td>
                <td class="val" id="qd${c}">0.00</td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }

  /* =====================================
     MANIPULABILITY ELLIPSOID
     ===================================== */

  initEllipsoid() {
    const cv = this.getElement("ell");

    if (!cv) return;

    this.eR = new THREE.WebGLRenderer({
      canvas: cv,
      antialias: true,
      alpha: true,
    });

    this.eR.setPixelRatio(
      Math.min(devicePixelRatio, 2),
    );

    this.eS = new THREE.Scene();

    this.eC = new THREE.PerspectiveCamera(
      32,
      1,
      0.1,
      50,
    );

    this.eC.up.set(0, 0, 1);

    this.eC.position.set(3.3, 3.3, 2.8);

    this.eC.lookAt(0, 0, 0);

    this.eCtl = new OrbitControls(this.eC, cv);

    this.eCtl.enablePan = false;
    this.eCtl.enableZoom = false;
    this.eCtl.enableDamping = true;
    this.eCtl.dampingFactor = 0.08;

    this.eG = new THREE.Group();

    const geo = new THREE.SphereGeometry(1, 40, 28);

    this.eG.add(
      new THREE.Mesh(
        geo,
        basic(ACC, {
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        }),
      ),
    );

    this.eG.add(
      new THREE.Mesh(
        geo,
        basic(ACC, {
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
      this.eG.add(
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

    this.eS.add(this.eG);

    const axes = new THREE.AxesHelper(1.7);

    axes.material.transparent = true;
    axes.material.opacity = 0.3;

    this.eS.add(axes);

    if (
      typeof ResizeObserver !== "undefined" &&
      cv.parentElement
    ) {
      new ResizeObserver(() => {
        const r = cv.getBoundingClientRect();

        if (!r.width || !r.height) return;

        this.eR.setSize(r.width, r.height, false);

        this.eC.aspect = r.width / r.height;

        this.eC.updateProjectionMatrix();
      }).observe(cv.parentElement);
    }
  }

  drawEllipsoid() {
    const Jv = this.robot.jacKin(this.q);

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

    this.setText(
      "mu1",
      isFinite(mu)
        ? mu > 999
          ? ">999"
          : mu.toFixed(3)
        : "∞",
    );

    this.setText(
      "mu2",
      isFinite(mu)
        ? mu * mu > 9999
          ? ">9999"
          : (mu * mu).toFixed(3)
        : "∞",
    );

    this.setText(
      "mu3",
      w >= 1000 ? w.toFixed(0) : w.toFixed(3),
    );

    this.setText(
      "ell-s",
      "σ  " +
        sg.map((v) => v.toFixed(1)).join(" · ") +
        "  scaled unit/s per rad/s",
    );

    const J = this.robot.sJacKin(this.q);

    const qd = this.qdot;

    const maxJ = Math.max(
      1e-9,
      ...J.flat().map(Math.abs),
    );

    const twist = J.map((row) =>
      row.reduce(
        (sum, v, k) => sum + v * qd[k],
        0,
      ),
    );

    const na = Math.max(
      0.1,
      ...twist.slice(0, 3).map(Math.abs),
    );

    const nl = Math.max(
      1,
      ...twist.slice(3).map(Math.abs),
    );

    const nq = Math.max(
      0.5,
      ...qd.map(Math.abs),
    );

    for (let c = 0; c < this.dof; c++) {
      const active = Math.abs(qd[c]) > 1e-3;

      for (let r = 0; r < 6; r++) {
        const el = this.getElement("jc" + r + "_" + c);

        if (el) {
          el.textContent = J[r][c].toFixed(2);

          el.className =
            Math.abs(J[r][c]) < 5e-3
              ? ""
              : active
                ? "v on"
                : "v";

          el.style.backgroundColor =
            active && Math.abs(J[r][c]) >= 5e-3
              ? `rgba(255,119,0,${(
                  0.06 +
                  (0.2 * Math.abs(J[r][c])) / maxJ
                ).toFixed(3)})`
              : "";
        }
      }

      this.put("qd" + c, qd[c], nq);
    }

    for (let r = 0; r < 6; r++) {
      this.put("tw" + r, twist[r], r < 3 ? na : nl);
    }

    const k = smax > 1e-6 ? 1.15 / smax : 0;

    const sc = sg.map((v) =>
      Math.max(v * k, 0.03),
    );

    const v1 = new THREE.Vector3(...E[0].vec);
    const v2 = new THREE.Vector3(...E[1].vec);

    const v3 = new THREE.Vector3().crossVectors(v1, v2);

    if (
      this.eG &&
      this.eCtl &&
      this.eR &&
      this.eS &&
      this.eC
    ) {
      new THREE.Matrix4()
        .makeBasis(
          v1.clone().multiplyScalar(sc[0]),
          v2.clone().multiplyScalar(sc[1]),
          v3.multiplyScalar(sc[2]),
        )
        .decompose(
          this.eG.position,
          this.eG.quaternion,
          this.eG.scale,
        );

      this.eCtl.update();

      this.eR.render(this.eS, this.eC);
    }
  }

  /* =====================================
     UI HELPERS
     ===================================== */

  put(id, value, norm) {
    const el = this.getElement(id);

    if (!el) return;

    el.textContent = value.toFixed(2);

    if (norm !== undefined) {
      const w = Math.min(
        100,
        (Math.abs(value) / norm) * 100,
      ).toFixed(0);

      el.style.backgroundImage =
        `linear-gradient(90deg,rgba(255,119,0,.2) ${w}%,transparent ${w}%)`;
    }
  }

  decayVel() {
    const now = performance.now();

    for (let i = 0; i < this.dof; i++) {
      if (
        this.lastChangeTime[i] !== 0 &&
        now - this.lastChangeTime[i] > 50
      ) {
        this.qdot[i] = 0;
      }
    }
  }

  clearTrail() {
    this.robotVisual.clearTrail();
  }

  syncJoint(i) {
    this.setValue("q" + i, this.q[i]);

    this.setText(
      "qv" + i,
      this.q[i].toFixed(1) + "°",
    );
  }

  syncTarget() {
    const p = this.target.position;

    this.setValue("tx", p.x.toFixed(1));
    this.setValue("ty", p.y.toFixed(1));
    this.setValue("tz", p.z.toFixed(1));
  }

  status(s) {
    this.setText("status", s);
  }

  /* =====================================
     UI EVENTS
     ===================================== */

  buildUI() {
    const jointsPanel = this.getElement("joints");

    if (jointsPanel) {
      jointsPanel.innerHTML = this.names
        .map((name, i) => {
          const width = (
            ((this.limits[i][1] - this.limits[i][0]) / 360) *
            100
          ).toFixed(1);

          return `
            <div class="joint">
              <div class="jointtop">
                <b>&theta;<sub>${i + 1}</sub> (${name})</b>
                <output id="qv${i}"></output>
              </div>

              <div class="jw">
                <div class="ghost"></div>

                <input
                  id="q${i}"
                  type="range"
                  min="${this.limits[i][0]}"
                  max="${this.limits[i][1]}"
                  step=".1"
                  value="${this.q[i]}"
                  style="width:${width}%"
                >
              </div>

              <div class="jr" style="width:${width}%">
                <span>${this.limits[i][0]}°</span>
                <span>${this.limits[i][1]}°</span>
              </div>
            </div>
          `;
        })
        .join("");
    }

    this.q.forEach((_, i) => this.syncJoint(i));

    this.lastChangeTime = Array(
      this.dof,
    ).fill(performance.now());

    this.q.forEach((_, i) => {
      this.bind("q" + i, "input", (e) => {
        this.running = false;

        const now = performance.now();

        const nv = +e.target.value;

        const deltaDeg = nv - this.q[i];

        const dt = Math.max(
          (now - (this.lastChangeTime[i] || now)) / 1000,
          0.001,
        );

        this.qdot[i] = (deltaDeg * RAD) / dt;

        this.q[i] = nv;

        this.lastChangeTime[i] = now;

        this.syncJoint(i);

        this.draw();

        this.refresh();
      });
    });

    this.control.gain = this.getNumber(
      "gain",
      this.control.gain,
    );

    this.control.damping = this.getNumber(
      "damping",
      this.control.damping,
    );

    this.control.cart = this.getNumber(
      "cart",
      this.control.cart,
    );

    this.control.speed = this.getNumber(
      "speed",
      this.control.speed,
    );

    this.control.method = this.getValue(
      "method",
      this.control.method,
    );

    ["gain", "damping", "cart", "speed"].forEach((id) => {
      this.bind(id, "input", () => {
        this.control[id] = this.getNumber(
          id,
          this.control[id],
        );
      });
    });

    this.bind("method", "change", () => {
      this.control.method = this.getValue(
        "method",
        this.control.method,
      );
    });

    ["tx", "ty", "tz"].forEach((id) => {
      this.bind(id, "change", () => {
        this.stop();

        const current = this.target.position;

        const x = this.getNumber("tx", current.x);
        const y = this.getNumber("ty", current.y);
        const z = this.getNumber("tz", current.z);

        this.target.position.set(x, y, z);

        this.start();
      });
    });

    this.bind("run", "click", () => this.start());

    this.bind("stop", "click", () => this.stop());

    this.bind("current", "click", () => {
      this.stop();

      this.target.position.copy(
        vec(this.robot.fkVisual(this.q).head),
      );

      this.syncTarget();

      this.refresh();
    });

    this.bind("reset", "click", () => {
      this.stop();

      this.q = [...this.config.initialPosition];

      this.q.forEach((v, i) => this.syncJoint(i));

      this.target.position.copy(
        vec(this.robot.fkVisual(this.q).head),
      );

      this.clearTrail();

      this.syncTarget();

      this.draw();

      this.refresh();

      this.status("Reset");
    });
  }

  /* =====================================
     IK CONTROL
     ===================================== */

  start() {
    this.running = true;

    this.status("Running");
  }

  stop() {
    this.running = false;

    this.qdot.fill(0);

    this.refresh();
  }

  step() {
    if (!this.running) return;

    const S = this.robot.unitScale;

    const p = this.robot.fkKin(this.q).head;

    const t = {
      x: this.target.position.x * S,
      y: this.target.position.y * S,
      z: this.target.position.z * S,
    };

    const e = [
      t.x - p.x,
      t.y - p.y,
      t.z - p.z,
    ];

    const error = Math.hypot(...e);

    if (error < 0.5 * S) {
      this.running = false;

      this.qdot.fill(0);

      this.status("Target reached");

      return;
    }

    const gain = clamp(
      this.control.gain || 2,
      0.1,
      10,
    );

    let xd = e.map((v) => gain * v);

    const maxCart =
      Math.max(1, this.control.cart || 35) * S;

    const cs = Math.hypot(...xd);

    if (cs > maxCart) {
      xd = xd.map((v) => (v * maxCart) / cs);
    }

    const J = this.robot.jacKin(this.q);

    const JT = transpose(J);

    const JJ = mm(J, JT);

    const damping =
      this.control.method === "dls"
        ? Math.max(0.001, this.control.damping || 1) * S
        : 0;

    const A = JJ.map((row, i) =>
      row.map(
        (v, j) =>
          v + (i === j ? damping * damping : 0),
      ),
    );

    const y = solve(A, xd);

    if (!y) {
      this.running = false;

      this.status("Singular: use DLS");

      return;
    }

    let qd = mm(
      JT,
      y.map((v) => [v]),
    ).map((row) => row[0]);

    const maxJoint =
      Math.max(1, this.control.speed || 90) * RAD;

    const maxQd = Math.max(...qd.map(Math.abs));

    if (maxQd > maxJoint) {
      qd = qd.map(
        (v) => (v * maxJoint) / maxQd,
      );
    }

    for (let i = 0; i < this.dof; i++) {
      this.q[i] = clamp(
        this.q[i] + (qd[i] * DT) / RAD,
        this.limits[i][0],
        this.limits[i][1],
      );
    }

    this.qdot = qd;

    this.q.forEach((v, i) => this.syncJoint(i));
  }

  /* =====================================
     VISUALIZATION
     ===================================== */

  draw() {
    const headVec = this.robotVisual.update(this.q);

    /* =====================================
       TARGET MARKER
       ===================================== */

    this.marker?.update(this.camera);

    /* =====================================
       ERROR LINE
       ===================================== */

    setLine(this.errorLine, headVec, this.target.position);
  }

  /* =====================================
     LIVE QUANTITIES
     ===================================== */

  refresh() {
    const p = this.robot.fkVisual(this.q).head;

    const t = this.target.position;

    const err = Math.hypot(
      t.x - p.x,
      t.y - p.y,
      t.z - p.z,
    );

    this.setText(
      "error",
      err.toFixed(4) + " cm",
    );

    const col = err < 0.5 ? 0x10b981 : INK;

    this.marker?.setColor(col);

    this.setText(
      "rank",
      this.rank(this.robot.jacKin(this.q)) + " / 3",
    );
  }

  /* =====================================
     MATRIX RANK
     ===================================== */

  rank(A) {
    const M = A.map((row) => row.slice());

    const rows = M.length;
    const cols = M[0].length;

    let rk = 0;

    for (let c = 0; c < cols && rk < rows; c++) {
      let pv = rk;

      for (let r = rk + 1; r < rows; r++) {
        if (Math.abs(M[r][c]) > Math.abs(M[pv][c])) {
          pv = r;
        }
      }

      if (Math.abs(M[pv][c]) < 1e-8) continue;

      [M[rk], M[pv]] = [M[pv], M[rk]];

      const d = M[rk][c];

      for (let j = c; j < cols; j++) {
        M[rk][j] /= d;
      }

      for (let r = 0; r < rows; r++) {
        if (r === rk) continue;

        const f = M[r][c];

        for (let j = c; j < cols; j++) {
          M[r][j] -= f * M[rk][j];
        }
      }

      rk++;
    }

    return rk;
  }

  /* =====================================
     ANIMATION LOOP
     ===================================== */

  animate() {
    const tick = () => {
      requestAnimationFrame(tick);

      this.step();

      if (!this.running) {
        this.decayVel();
      }

      this.controls.update();

      this.draw();

      this.refresh();

      this.drawEllipsoid();

      this.renderer.render(this.scene, this.camera);
    };

    tick();
  }
}

/* =========================================
   START APPLICATION
   ========================================= */

const simulator = new Simulator(ROBOT_CONFIG);

window.simulator = simulator;