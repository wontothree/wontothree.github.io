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
  const len = d.length();

  mesh.position.copy(A.clone().add(B).multiplyScalar(0.5));
  mesh.scale.set(1, len, 1);

  if (len > 1e-8) {
    mesh.quaternion.setFromUnitVectors(Y, d.normalize());
  }
}

function dot(radius, color) {
  const g = new THREE.Group();

  // 검은색 외곽선 셸 (Toon/Technical 스타일 강조)
  g.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.18, 24, 16),
      basic(0x0f172a, { side: THREE.BackSide }),
    ),
  );

  // 메인 컬러 구
  g.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(radius, 24, 16),
      basic(color),
    ),
  );

  return g;
}

function hub(color, radius = 3.4) {
  const g = new THREE.Group();

  // 1. 관절 중심 구
  g.add(dot(radius, 0xffffff));

  const axisMaterial = basic(color, {
    transparent: true,
    opacity: 0.45,
  });

  // 2. 회전축 기둥 및 화살표 촉 (구 크기에 비례하여 바깥으로 돌출)
  const shaftLen = radius * 5.0;
  const ax = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, shaftLen, 8),
    axisMaterial,
  );

  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.85, 2.3, 16),
    axisMaterial,
  );
  tip.position.y = shaftLen / 2 + 1.1;

  // 3. 회전 방향 링 (구 외곽선 바깥으로 여유 있게 배치)
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 2.05, 0.16, 6, 56),
    basic(color, {
      transparent: true,
      opacity: 0.25,
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