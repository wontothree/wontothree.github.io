import { ROBOT_CONFIG } from "./core/robot.config.js";
import { Robot } from "./core/robot.js";
import { IKSolver } from "./core/ik.solver.js";
import { IKRunner } from "./core/ik.runner.js";
import { rank } from "./core/math.js";

import { SIM_CONFIG } from "./sim.config.js";

import { getElement } from "./view/dom.utils.js";
import { SceneView } from "./view/scene.view.js";
import { UIPanel } from "./view/ui.panel.js";
import { RobotVisual } from "./view/robot.visual.js";
import { EllipsoidVisual } from "./view/ellipsoid.visual.js";
import { KinTable } from "./view/kin.table.js";
import { vec } from "./view/three.utils.js";
import { TargetMarker } from "./view/target.marker.js";

/* =========================================
   SIMULATOR
   Orchestrates core (robot, IK runner) and view (scene, panel, tables).
   All tunable constants live in sim.config.js.
   ========================================= */

class Simulator {
  /* =====================================
     CONSTRUCTOR
     ===================================== */

  constructor(config = ROBOT_CONFIG, simConfig = SIM_CONFIG) {
    this.config = config;
    this.cfg = simConfig;

    this.robot = new Robot(config);
    this.dof = config.joints.length;

    this.limits = config.joints.map((j) => j.limit);
    this.names = config.joints.map((j) => j.name);

    /* =====================================
       IK RUNNER (joint state + stepping)
       ===================================== */

    this.runner = new IKRunner({
      robot: this.robot,
      ik: new IKSolver(this.robot, this.limits),
      initialPosition: config.initialPosition,
      control: this.cfg.control,
      dt: this.cfg.dt,
    });

    /* =====================================
       SCENE VIEW
       ===================================== */

    const viewCanvas = getElement("view");

    if (!viewCanvas) {
      throw new Error(
        '5-DOF Robotics Studio requires a canvas with id="view".',
      );
    }

    this.view = new SceneView(viewCanvas);

    /* =====================================
       ROBOT & ELLIPSOID VISUALIZATION
       ===================================== */

    this.robotVisual = new RobotVisual({
      scene: this.view.scene,
      robot: this.robot,
      dof: this.dof,
      accentColor: this.cfg.accentColor,
      trailEnabled: this.cfg.enableTrail,
    });

    // Must run after the robot meshes are added to the scene
    this.view.enableShadows();

    this.ellipsoidVisual = new EllipsoidVisual({
      canvasId: "ell",
      robot: this.robot,
      accentColor: this.cfg.accentColor,
    });

    /* =====================================
       TARGET STATE
       ===================================== */

    this.target = new THREE.Group();

    this.view.scene.add(this.target);

    /* =====================================
       TARGET MARKER (+ POSITION ERROR LINE)
       - Always created
       - When enableTargetMarker is false, the ball, arrows,
         foot, stem and error line are all hidden
       ===================================== */

    this.marker = new TargetMarker({
      scene: this.view.scene,
      camera: this.view.camera,
      domElement: this.view.renderer.domElement,
      target: this.target,

      onDragging: (dragging) => {
        // Disable camera orbit while the target is being dragged
        this.view.setControlsEnabled(!dragging);

        if (dragging) this.stop();
      },

      onChange: () => {
        this.ui.syncTarget(this.target.position);
        this.start();
      },
    });

    this.marker.setVisible(this.cfg.enableTargetMarker);

    /* =====================================
       PANELS
       ===================================== */

    this.kinTable = new KinTable({
      elementId: "eq",
      robot: this.robot,
      dof: this.dof,
    });

    this.ui = new UIPanel({
      names: this.names,
      limits: this.limits,
      q: this.runner.q,
      handlers: {
        onJointInput: (i, value) => this.onJointInput(i, value),

        onControlChange: (key, value) => {
          if (value !== undefined) this.runner.setControl({ [key]: value });
        },

        onMethodChange: (method) => {
          if (method !== undefined) this.runner.setControl({ method });
        },

        onTargetChange: () => this.onTargetChange(),
        onRun: () => this.start(),
        onStop: () => this.stop(),
        onCurrent: () => this.moveTargetToCurrent(),
        onReset: () => this.reset(),
      },
    });

    // Pick up the initial IK parameters from the DOM
    this.runner.setControl(this.ui.readControls(this.runner.control));

    /* =====================================
       INITIALIZATION
       ===================================== */

    this.view.resize();

    window.addEventListener("resize", () => this.view.resize());

    this.snapTargetToHead();

    this.draw();

    this.refresh();

    this.animate();
  }

  /* =====================================
     VISIBILITY CONTROL
     ===================================== */

  setTargetVisible(visible) {
    this.marker.setVisible(visible);
  }

  setTrailVisible(visible) {
    this.robotVisual.setTrailEnabled(visible);
  }

  clearTrail() {
    this.robotVisual.clearTrail();
  }

  /* =====================================
     TARGET HELPERS
     ===================================== */

  // Place the target on the current end effector and update the inputs
  snapTargetToHead() {
    this.target.position.copy(vec(this.robot.fkVisual(this.runner.q).head));

    this.ui.syncTarget(this.target.position);
  }

  /* =====================================
     RUN CONTROL
     ===================================== */

  start() {
    this.runner.start();

    this.ui.setStatus("Running");
  }

  stop() {
    this.runner.stop();

    this.refresh();
  }

  // Advance the IK one step and report the outcome in the status field
  step() {
    const result = this.runner.step(this.target.position);

    switch (result) {
      case "moving":
        this.ui.syncJoints(this.runner.q);
        break;

      case "reached":
        this.ui.setStatus("Target reached");
        break;

      case "singular":
        this.ui.setStatus("Singular: use DLS");
        break;

      default:
        // null: runner is not running
        break;
    }
  }

  /* =====================================
     UI EVENT HANDLERS
     ===================================== */

  // Manual joint slider
  onJointInput(i, value) {
    this.runner.setJoint(i, value);

    this.ui.syncJoint(i, value);

    this.draw();

    this.refresh();
  }

  // Target coordinates typed into the inputs
  onTargetChange() {
    this.stop();

    const { x, y, z } = this.ui.readTarget(this.target.position);

    this.target.position.set(x, y, z);

    this.start();
  }

  moveTargetToCurrent() {
    this.stop();

    this.snapTargetToHead();

    this.refresh();
  }

  reset() {
    this.runner.reset();

    this.ui.syncJoints(this.runner.q);

    this.snapTargetToHead();

    this.clearTrail();

    this.draw();

    this.refresh();

    this.ui.setStatus("Reset");
  }

  /* =====================================
     VISUALIZATION
     ===================================== */

  draw() {
    const headVec = this.robotVisual.update(this.runner.q);

    this.marker.update(this.view.camera);

    this.marker.updatePositionErrorLine(headVec, this.target.position);
  }

  /* =====================================
     LIVE QUANTITIES
     ===================================== */

  refresh() {
    const q = this.runner.q;

    const p = this.robot.fkVisual(q).head;

    const t = this.target.position;

    const err = Math.hypot(t.x - p.x, t.y - p.y, t.z - p.z);

    this.ui.setError(err.toFixed(4) + " cm");

    // Green when within the reach tolerance, ink color otherwise
    const col =
      err < this.cfg.reachTolerance
        ? this.cfg.reachedColor
        : this.cfg.inkColor;

    this.marker.setColor(col);

    this.ui.setRank(rank(this.robot.jacKin(q)) + " / 3");
  }

  /* =====================================
     ANIMATION LOOP
     ===================================== */

  animate() {
    const tick = () => {
      requestAnimationFrame(tick);

      this.step();

      if (!this.runner.running) {
        this.runner.decayVel();
      }

      this.view.updateControls();

      this.draw();

      this.refresh();

      this.kinTable.update(this.runner.q, this.runner.qdot);

      this.ellipsoidVisual.update(this.runner.q);

      this.view.render();
    };

    tick();
  }
}

/* =========================================
   START APPLICATION
   ========================================= */

const simulator = new Simulator(ROBOT_CONFIG, SIM_CONFIG);

window.simulator = simulator;