import {
  RAD,
  transpose,
  mm,
  solve,
} from "./math.js";

import { clamp } from "./three.utils.js";

export class IKSolver {
  constructor(robot, limits) {
    this.robot = robot;
    this.limits = limits;
    this.dof = limits.length;
  }

  /**
   * 1 스텝 IK 계산 수행
   * @param {number[]} q - 현재 관절 각도 (deg)
   * @param {{x: number, y: number, z: number}} targetPos - 목표 위치 (visual scale)
   * @param {object} control - { method, gain, damping, cart, speed }
   * @param {number} dt - 타임스텝 (sec)
   * @returns {{ status: "reached" | "singular" | "running", q: number[], qdot: number[] }}
   */
  step(q, targetPos, control, dt) {
    const S = this.robot.unitScale;
    const p = this.robot.fkKin(q).head;

    const t = {
      x: targetPos.x * S,
      y: targetPos.y * S,
      z: targetPos.z * S,
    };

    const e = [
      t.x - p.x,
      t.y - p.y,
      t.z - p.z,
    ];

    const error = Math.hypot(...e);

    // 1. 목표 도달 판정
    if (error < 0.5 * S) {
      return {
        status: "reached",
        q: [...q],
        qdot: Array(this.dof).fill(0),
      };
    }

    // 2. 작업 공간 목표 속도 계산 및 클램핑
    const gain = clamp(control.gain || 2, 0.1, 10);
    let xd = e.map((v) => gain * v);

    const maxCart = Math.max(1, control.cart || 35) * S;
    const cs = Math.hypot(...xd);

    if (cs > maxCart) {
      xd = xd.map((v) => (v * maxCart) / cs);
    }

    // 3. Jacobian 및 DLS(Damped Least Squares) / Pseudoinverse 계산
    const J = this.robot.jacKin(q);
    const JT = transpose(J);
    const JJ = mm(J, JT);

    const damping =
      control.method === "dls"
        ? Math.max(0.001, control.damping || 1) * S
        : 0;

    const A = JJ.map((row, i) =>
      row.map((v, j) => v + (i === j ? damping * damping : 0)),
    );

    const y = solve(A, xd);

    // 4. 특이점(Singularity) 판정
    if (!y) {
      return {
        status: "singular",
        q: [...q],
        qdot: Array(this.dof).fill(0),
      };
    }

    // 5. 관절 속도 변환 및 속도 제한 클램핑
    let qd = mm(
      JT,
      y.map((v) => [v]),
    ).map((row) => row[0]);

    const maxJoint = Math.max(1, control.speed || 90) * RAD;
    const maxQd = Math.max(...qd.map(Math.abs));

    if (maxQd > maxJoint) {
      qd = qd.map((v) => (v * maxJoint) / maxQd);
    }

    // 6. 적분 및 관절 한계(Joint Limits) 적용
    const nextQ = q.map((val, i) =>
      clamp(
        val + (qd[i] * dt) / RAD,
        this.limits[i][0],
        this.limits[i][1],
      ),
    );

    return {
      status: "running",
      q: nextQ,
      qdot: qd,
    };
  }
}