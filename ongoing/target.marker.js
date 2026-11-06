
import {
  basic,
  newLine,
  setLine,
} from "./three.utils.js";

const { TransformControls } = THREE;

const INK = 0x0f172a;

/* =========================================
   TARGET MARKER
   ========================================= */

export class TargetMarker {
  constructor({
    scene,
    camera,
    domElement,
    target,
    onDragging,
    onChange,
  }) {
    this.target = target;

    this.group = new THREE.Group();

    this.coreMaterial = basic(INK);

    this.ringMaterial = basic(INK, {
      side: THREE.DoubleSide,
      depthTest: false,
      transparent: true,
      opacity: 0.9,
    });

    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 20, 14),
      this.coreMaterial,
    );

    this.ring = new THREE.Mesh(
      new THREE.RingGeometry(6.2, 7.2, 48),
      this.ringMaterial,
    );

    this.ring.renderOrder = 5;

    this.group.add(this.sphere);
    this.group.add(this.ring);

    target.add(this.group);

    this.stem = newLine(0x94a3b8, 2, 2);

    scene.add(this.stem);

    this.foot = new THREE.Mesh(
      new THREE.RingGeometry(3.4, 4.4, 40),
      this.ringMaterial,
    );

    this.foot.position.z = 0.3;

    scene.add(this.foot);

    this.transform = new TransformControls(
      camera,
      domElement,
    );

    this.transform.setMode("translate");
    this.transform.setSpace("world");
    this.transform.setSize(0.7);
    this.transform.attach(target);

    scene.add(this.transform);

    this.transform.addEventListener(
      "dragging-changed",
      (e) => {
        if (onDragging) onDragging(e.value);
      },
    );

    this.transform.addEventListener(
      "objectChange",
      () => {
        if (onChange) onChange();
      },
    );
  }

  /* =====================================
     UPDATE
     ===================================== */

  update(camera) {
    const t = this.target.position;

    this.ring.quaternion.copy(camera.quaternion);

    this.foot.position.set(t.x, t.y, 0.3);

    setLine(
      this.stem,
      t,
      new THREE.Vector3(t.x, t.y, 0),
    );
  }

  /* =====================================
     COLOR
     ===================================== */

  setColor(color) {
    this.coreMaterial.color.setHex(color);
    this.ringMaterial.color.setHex(color);
  }

  /* =====================================
     VISIBILITY
     ===================================== */

  setVisible(visible) {
    this.group.visible = visible;
    this.foot.visible = visible;
    this.stem.visible = visible;

    this.transform.visible = visible;
    this.transform.enabled = visible;
  }
}
