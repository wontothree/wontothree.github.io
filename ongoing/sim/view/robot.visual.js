import { vec, Y, link, connect, dot, hub } from "./three.utils.js";

const DEFAULT_LINK_COLORS = [
  0x38edf8, 0x35a2ff, 0x7b5cff, 0xb85cff, 0xff5ca8, 0xff7700,
];

export class RobotVisual {
  constructor({
    scene,
    robot,
    dof,
    accentColor = 0xff7700,
    jointColor = 0x94a3b8,
    linkColors = DEFAULT_LINK_COLORS,
    trailLength = 260,
    trailEnabled = true,
    linkRadius = 1.6,
    jointRadius = 3.4,
    tipRadius = 4.5,
  }) {
    this.scene = scene;
    this.robot = robot;
    this.dof = dof;

    // 1. Root group holding the whole robot (added to the scene once)
    this.root = new THREE.Group();
    this.scene.add(this.root);

    // 2. Links (base -> j1 -> ... -> j5 -> head : dof + 1 in total)
    const linkCount = this.dof + 1;
    this.links = Array.from({ length: linkCount }, (_, i) => {
      const color = linkColors[i % linkColors.length];
      const mesh = link(linkRadius, color);
      this.root.add(mesh);
      return mesh;
    });

    // 3. Joints (j1 ~ j5 : dof in total)
    this.joints = Array.from({ length: this.dof }, () => {
      const g = hub(jointColor, jointRadius);
      this.root.add(g);
      return g;
    });

    // 4. End effector tip
    this.tip = new THREE.Group();
    this.tip.add(dot(tipRadius, accentColor));
    this.root.add(this.tip);

    // 5. Trajectory trail
    this.trailEnabled = trailEnabled;
    this.N = trailLength;
    this.trailPts = [];
    this.trailGeo = new THREE.BufferGeometry();
    this.trailGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(this.N * 3), 3),
    );
    this.trailGeo.setDrawRange(0, 0);

    this.trail = new THREE.Line(
      this.trailGeo,
      new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.8,
      }),
    );
    this.trail.frustumCulled = false;
    this.trail.visible = this.trailEnabled;
    this.root.add(this.trail);
  }

  update(q) {
    const p = this.robot.fkVisual(q);

    // Build the point list from the fkVisual result (dof + 2 points)
    const pts = [p.base, p.j1, p.j2, p.j3, p.j4, p.j5, p.head];

    // Update links: pts[0]~pts[1], ..., pts[5]~pts[6]
    this.links.forEach((m, i) => {
      if (pts[i] && pts[i + 1]) {
        connect(m, pts[i], pts[i + 1]);
      }
    });

    // Update joints: pts[1] (j1) ~ pts[5] (j5)
    const ax = this.robot.axes(q);
    this.joints.forEach((g, i) => {
      const jointPos = pts[i + 1];
      if (!jointPos) return;

      g.position.copy(vec(jointPos));

      // Zero-vector guard: a zero-length axis would make the quaternion NaN
      // and the mesh would disappear
      if (ax && ax[i]) {
        const axisVec = vec(ax[i]);
        if (axisVec.lengthSq() > 1e-10) {
          g.quaternion.setFromUnitVectors(Y, axisVec.normalize());
        }
      }
    });

    // Update end effector position
    const headVec = vec(p.head);
    this.tip.position.copy(headVec);

    // Update trail (returns immediately inside if trailEnabled is false)
    this._updateTrail(headVec);

    return headVec;
  }

  _updateTrail(headVec) {
    if (!this.trailEnabled) return;

    const last = this.trailPts[this.trailPts.length - 1];

    // Only add a point when the tip has moved far enough from the last one
    if (!last || last.distanceTo(headVec) > 0.6) {
      this.trailPts.push(headVec.clone());

      // Drop the oldest point once the buffer is full
      if (this.trailPts.length > this.N) {
        this.trailPts.shift();
      }

      // Copy points into the GPU buffer
      const arr = this.trailGeo.attributes.position.array;
      this.trailPts.forEach((v, i) => {
        arr[i * 3] = v.x;
        arr[i * 3 + 1] = v.y;
        arr[i * 3 + 2] = v.z;
      });

      this.trailGeo.attributes.position.needsUpdate = true;
      this.trailGeo.setDrawRange(0, this.trailPts.length);
    }
  }

  /* =====================================
     TRAIL CONTROL
     ===================================== */

  setTrailEnabled(enabled) {
    this.trailEnabled = enabled;
    this.trail.visible = enabled;

    // Clear the old path when disabling so it does not reappear
    // connected to new points when re-enabled
    if (!enabled) this.clearTrail();
  }

  clearTrail() {
    this.trailPts = [];
    this.trailGeo.setDrawRange(0, 0);
  }
}