// src/robot.visual.js
import {
  vec,
  Y,
  link,
  connect,
  dot,
  hub,
} from "./three.utils.js";

const DEFAULT_LINK_COLORS = [
  0x38edf8,
  0x35a2ff,
  0x7b5cff,
  0xb85cff,
  0xff5ca8,
  0xff7700,
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
    linkRadius = 1.6,
    jointRadius = 3.4,
    tipRadius = 4.5,
  }) {
    this.scene = scene;
    this.robot = robot;
    this.dof = dof;

    // 1. 로봇 전체를 담는 루트 그룹 (한 번만 scene에 추가)
    this.root = new THREE.Group();
    this.scene.add(this.root);

    // 2. Links (base -> j1 -> ... -> j5 -> head : 총 dof + 1개)
    const linkCount = this.dof + 1;
    this.links = Array.from({ length: linkCount }, (_, i) => {
      const color = linkColors[i % linkColors.length];
      const mesh = link(linkRadius, color);
      this.root.add(mesh);
      return mesh;
    });

    // 3. Joints (j1 ~ j5 : 총 dof개)
    this.joints = Array.from({ length: this.dof }, () => {
      const g = hub(jointColor, jointRadius);
      this.root.add(g);
      return g;
    });

    // 4. End Effector Tip
    this.tip = new THREE.Group();
    this.tip.add(dot(tipRadius, accentColor));
    this.root.add(this.tip);

    // 5. Trajectory Trail
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
    this.root.add(this.trail);
  }

  update(q) {
    const p = this.robot.fkVisual(q);

    // fkVisual 반환 구조에 맞춰 좌표 배열 구성 (총 dof + 2개 포인트)
    const pts = [
      p.base,
      p.j1,
      p.j2,
      p.j3,
      p.j4,
      p.j5,
      p.head,
    ];

    // 링크 업데이트: pts[0]~pts[1], ..., pts[5]~pts[6]
    this.links.forEach((m, i) => {
      if (pts[i] && pts[i + 1]) {
        connect(m, pts[i], pts[i + 1]);
      }
    });

    // 조인트 업데이트: pts[1](j1) ~ pts[5](j5)
    const ax = this.robot.axes(q);
    this.joints.forEach((g, i) => {
      const jointPos = pts[i + 1];
      if (!jointPos) return;

      g.position.copy(vec(jointPos));

      // 영벡터 방어: axes[i] 길이가 0이면 quaternion이 NaN이 되어 메쉬가 사라짐
      if (ax && ax[i]) {
        const axisVec = vec(ax[i]);
        if (axisVec.lengthSq() > 1e-10) {
          g.quaternion.setFromUnitVectors(Y, axisVec.normalize());
        }
      }
    });

    // 엔드이펙터 위치 업데이트
    const headVec = vec(p.head);
    this.tip.position.copy(headVec);

    // 궤적 업데이트
    this._updateTrail(headVec);

    return headVec;
  }

  _updateTrail(headVec) {
    const last = this.trailPts[this.trailPts.length - 1];

    if (!last || last.distanceTo(headVec) > 0.6) {
      this.trailPts.push(headVec.clone());

      if (this.trailPts.length > this.N) {
        this.trailPts.shift();
      }

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

  clearTrail() {
    this.trailPts = [];
    this.trailGeo.setDrawRange(0, 0);
  }
}