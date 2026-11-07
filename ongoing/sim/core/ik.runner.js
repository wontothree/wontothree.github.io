import { RAD } from "./math.js";

/* =========================================
   IK RUNNER
   Holds the joint state (q, qdot) and steps the IK solver.
   Pure logic: no DOM, no Three.js, no UI text.

   step() return values:
     null       runner is not running (nothing happened)
     "moving"   one IK step was applied
     "reached"  target reached, runner stopped
     "singular" singular configuration, runner stopped
   ========================================= */

export class IKRunner {
  constructor({ robot, ik, initialPosition, control, dt = 1 / 60 }) {
    this.robot = robot;
    this.ik = ik;
    this.initialPosition = initialPosition;
    this.dt = dt;

    this.dof = initialPosition.length;

    this.q = [...initialPosition];
    this.qdot = Array(this.dof).fill(0);

    this.running = false;

    this.control = { ...control };

    // Time of the last manual change per joint (used to estimate velocity)
    this.lastChangeTime = Array(this.dof).fill(performance.now());
  }

  /* =====================================
     CONTROL PARAMETERS
     ===================================== */

  setControl(partial) {
    Object.assign(this.control, partial);
  }

  /* =====================================
     RUN STATE
     ===================================== */

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
    this.qdot.fill(0);
  }

  reset() {
    this.stop();
    this.q = [...this.initialPosition];
  }

  // Apply one IK step toward target ({x, y, z}); see the return values above
  step(target) {
    if (!this.running) return null;

    const res = this.ik.step(this.q, target, this.control, this.dt);

    if (res.status === "reached") {
      this.running = false;
      this.qdot = res.qdot;
      return "reached";
    }

    if (res.status === "singular") {
      this.running = false;
      return "singular";
    }

    this.q = res.q;
    this.qdot = res.qdot;

    return "moving";
  }

  /* =====================================
     MANUAL JOINT CONTROL
     ===================================== */

  // Set one joint (degrees) from a slider and estimate its velocity in rad/s
  setJoint(i, value, now = performance.now()) {
    this.running = false;

    const deltaDeg = value - this.q[i];

    const dt = Math.max((now - (this.lastChangeTime[i] || now)) / 1000, 0.001);

    this.qdot[i] = (deltaDeg * RAD) / dt;

    this.q[i] = value;

    this.lastChangeTime[i] = now;
  }

  // Zero joint velocities that have not changed recently (manual slider use)
  decayVel(now = performance.now()) {
    for (let i = 0; i < this.dof; i++) {
      if (this.lastChangeTime[i] !== 0 && now - this.lastChangeTime[i] > 50) {
        this.qdot[i] = 0;
      }
    }
  }
}