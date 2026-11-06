
import {
  vec,
  Y,
  link,
  connect,
  dot,
  hub,
} from "./three.utils.js";

const ACC = 0xff7700;

export class RobotVisual {
  constructor(scene, robot) {
    this.scene = scene;
    this.robot = robot;

    this.createLinks();
    this.createJoints();
    this.createEndEffector();
  }

  createLinks() {
    const linkColors = [
      0x38edf8,
      0x35a2ff,
      0x7b5cff,
      0xb85cff,
      0xff5ca8,
      ACC,
    ];

    const linkRadii = [
      1.5,
      1.5,
      1.5,
      1.5,
      1.5,
      1.5,
    ];

    this.links = linkColors.map((color, i) =>
      link(linkRadii[i], color),
    );

    this.links.forEach((mesh) => {
      this.scene.add(mesh);
    });
  }

  createJoints() {
    this.joints = Array.from(
      { length: this.robot.dof },
      () => {
        const group = hub(0x94a3b8);

        this.scene.add(group);

        return group;
      },
    );
  }

  createEndEffector() {
    this.tip = new THREE.Group();

    this.tip.add(dot(4, ACC));

    this.scene.add(this.tip);
  }

  update(q) {
    const p = this.robot.fkVisual(q);

    const pts = [
      p.base,
      p.j1,
      p.j2,
      p.j3,
      p.j4,
      p.j5,
      p.head,
    ];

    this.links.forEach((mesh, i) => {
      connect(mesh, pts[i], pts[i + 1]);
    });

    const axes = this.robot.axes(q);

    this.joints.forEach((group, i) => {
      group.position.copy(vec(pts[i + 1]));

      group.quaternion.setFromUnitVectors(
        Y,
        vec(axes[i]).normalize(),
      );
    });

    this.tip.position.copy(vec(p.head));

    return p;
  }
}