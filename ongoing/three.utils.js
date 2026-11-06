// three.utils.js

const vec = (p) => new THREE.Vector3(p.x, p.y, p.z);

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

const Y = new THREE.Vector3(0, 1, 0);

const basic = (color, options) =>
  new THREE.MeshBasicMaterial(
    Object.assign({ color }, options || {}),
  );

function link(radius, color) {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, 1, 32),
    basic(color),
  );
}

function connect(mesh, a, b) {
  const A = vec(a);
  const B = vec(b);

  const d = B.clone().sub(A);

  mesh.position.copy(A.clone().add(B).multiplyScalar(0.5));
  mesh.scale.set(1, d.length(), 1);
  mesh.quaternion.setFromUnitVectors(Y, d.clone().normalize());
}

function dot(radius, color) {
  const g = new THREE.Group();

  g.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.25, 24, 16),
      basic(0x0f172a, { side: THREE.BackSide }),
    ),
  );

  g.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(radius, 24, 16),
      basic(color),
    ),
  );

  return g;
}

function hub(color) {
  const g = new THREE.Group();

  g.add(dot(2.2, 0xffffff));

  const axisMaterial = basic(color, {
    transparent: true,
    opacity: 0.45,
  });

  const ax = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 14, 8),
    axisMaterial,
  );

  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 2, 16),
    axisMaterial,
  );

  tip.position.y = 8;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(5, 0.14, 6, 56),
    basic(color, {
      transparent: true,
      opacity: 0.2,
    }),
  );

  ring.rotation.x = Math.PI / 2;

  g.add(ax, tip, ring);

  return g;
}

function newLine(color, dash, gap) {
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(6), 3),
  );

  const line = new THREE.Line(
    geometry,
    new THREE.LineDashedMaterial({
      color,
      dashSize: dash,
      gapSize: gap,
    }),
  );

  line.frustumCulled = false;

  return line;
}

function setLine(line, a, b) {
  const p = line.geometry.attributes.position.array;

  p[0] = a.x;
  p[1] = a.y;
  p[2] = a.z;

  p[3] = b.x;
  p[4] = b.y;
  p[5] = b.z;

  line.geometry.attributes.position.needsUpdate = true;

  line.computeLineDistances();
}

export {
  vec,
  clamp,
  Y,
  basic,
  link,
  connect,
  dot,
  hub,
  newLine,
  setLine,
};