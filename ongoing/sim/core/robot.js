import { RAD } from "./math.js";
import { ROBOT_CONFIG } from "./robot.config.js";

/* =========================================
   ROBOT MODEL
   ========================================= */

export class Robot {
  constructor(config = ROBOT_CONFIG) {
    this.config = config;
    this.visual = { ...config.dimensions };
    this.unitScale = config.unitScale;

    this.kin = Object.fromEntries(
      Object.entries(this.visual).map(([key, value]) => [
        key,
        value * this.unitScale,
      ]),
    );
  }

  forwardKinematics(q, L) {
    const [a, b, c, d, e] = q.map((v) => v * RAD);

    const ca = Math.cos(a);
    const sa = Math.sin(a);

    const j1 = { x: 0, y: 0, z: L.H };
    const j2 = { x: 0, y: 0, z: L.H + L.L1 };

    let phi = b;

    const step = (p, length) => ({
      x: p.x + length * Math.sin(phi) * ca,
      y: p.y + length * Math.sin(phi) * sa,
      z: p.z + length * Math.cos(phi),
    });

    const j3 = step(j2, L.L2);

    phi += c;
    const j4 = step(j3, L.L3);

    phi += d;
    const j5 = step(j4, L.L4);

    const yaw = a + e;

    const head = {
      x: j5.x + L.L5 * Math.sin(phi) * Math.cos(yaw),
      y: j5.y + L.L5 * Math.sin(phi) * Math.sin(yaw),
      z: j5.z + L.L5 * Math.cos(phi),
    };

    return {
      base: { x: 0, y: 0, z: 0 },
      j1,
      j2,
      j3,
      j4,
      j5,
      head,
    };
  }

  fkVisual(q) {
    return this.forwardKinematics(q, this.visual);
  }

  fkKin(q) {
    return this.forwardKinematics(q, this.kin);
  }

  axes(q) {
    const [a] = q.map((v) => v * RAD);

    const ca = Math.cos(a);
    const sa = Math.sin(a);

    const z0 = { x: 0, y: 0, z: 1 };
    const pitchAx = { x: -sa, y: ca, z: 0 };
    const headYawAx = { x: 0, y: 0, z: 1 };

    return [z0, pitchAx, pitchAx, pitchAx, headYawAx];
  }

  sJacKin(q) {
    const p = this.fkKin(q);
    const ax = this.axes(q);

    const positions = [p.j1, p.j2, p.j3, p.j4, p.j5];
    const head = p.head;

    const dof = this.config.joints.length;

    const J = Array.from(
      { length: 6 },
      () => Array(dof).fill(0),
    );

    for (let i = 0; i < dof; i++) {
      const z = ax[i];
      const pi = positions[i];

      J[0][i] = z.x;
      J[1][i] = z.y;
      J[2][i] = z.z;

      const rx = head.x - pi.x;
      const ry = head.y - pi.y;
      const rz = head.z - pi.z;

      J[3][i] = z.y * rz - z.z * ry;
      J[4][i] = z.z * rx - z.x * rz;
      J[5][i] = z.x * ry - z.y * rx;
    }

    return J;
  }

  jacKin(q) {
    const J = this.sJacKin(q);
    return [J[3], J[4], J[5]];
  }
}