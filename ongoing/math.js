
/* =========================================
   MATRIX UTILITIES
   Independent of Three.js
   ========================================= */

export const RAD = Math.PI / 180;

/**
 * Matrix transpose
 * A: m × n
 * Returns: n × m
 */
export function transpose(A) {
  return A[0].map((_, j) => A.map((row) => row[j]));
}

/**
 * Matrix multiplication
 * A: m × n
 * B: n × p
 * Returns: m × p
 */
export function mm(A, B) {
  return A.map((row) =>
    B[0].map((_, j) =>
      row.reduce((sum, value, k) => sum + value * B[k][j], 0),
    ),
  );
}

/**
 * Solve linear system Ax = b
 * Uses Gauss-Jordan elimination with partial pivoting.
 *
 * Returns:
 *   number[] : solution
 *   null     : singular matrix
 */
export function solve(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < n; i++) {
    let pivot = i;

    for (let j = i + 1; j < n; j++) {
      if (Math.abs(M[j][i]) > Math.abs(M[pivot][i])) {
        pivot = j;
      }
    }

    if (Math.abs(M[pivot][i]) < 1e-12) {
      return null;
    }

    [M[i], M[pivot]] = [M[pivot], M[i]];

    const d = M[i][i];

    for (let k = 0; k <= n; k++) {
      M[i][k] /= d;
    }

    for (let j = 0; j < n; j++) {
      if (j === i) continue;

      const f = M[j][i];

      for (let k = 0; k <= n; k++) {
        M[j][k] -= f * M[i][k];
      }
    }
  }

  return M.map((row) => row[n]);
}

/**
 * Eigenvalue decomposition of a symmetric 3 × 3 matrix.
 *
 * Uses Jacobi rotations.
 *
 * Returns:
 * [
 *   { val: eigenvalue, vec: [x, y, z] },
 *   ...
 * ]
 *
 * Results are sorted in descending eigenvalue order.
 *
 * Note:
 * Eigenvectors are plain arrays.
 * This function does not depend on Three.js.
 */
export function eig3(A) {
  const a = A.map((row) => row.slice());

  const V = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  for (let it = 0; it < 50; it++) {
    let p = 0;
    let q = 1;
    let m = Math.abs(a[0][1]);

    if (Math.abs(a[0][2]) > m) {
      p = 0;
      q = 2;
      m = Math.abs(a[0][2]);
    }

    if (Math.abs(a[1][2]) > m) {
      p = 1;
      q = 2;
      m = Math.abs(a[1][2]);
    }

    if (m < 1e-10) break;

    const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);

    const t =
      Math.sign(theta || 1) /
      (Math.abs(theta) + Math.sqrt(theta * theta + 1));

    const c = 1 / Math.sqrt(t * t + 1);
    const s = t * c;

    const app = a[p][p];
    const aqq = a[q][q];
    const apq = a[p][q];

    a[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    a[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    a[p][q] = a[q][p] = 0;

    for (let k = 0; k < 3; k++) {
      if (k !== p && k !== q) {
        const akp = a[k][p];
        const akq = a[k][q];

        a[k][p] = a[p][k] = c * akp - s * akq;
        a[k][q] = a[q][k] = s * akp + c * akq;
      }

      const vkp = V[k][p];
      const vkq = V[k][q];

      V[k][p] = c * vkp - s * vkq;
      V[k][q] = s * vkp + c * vkq;
    }
  }

  return [0, 1, 2]
    .map((i) => ({
      val: Math.max(0, a[i][i]),
      vec: [V[0][i], V[1][i], V[2][i]],
    }))
    .sort((u, v) => v.val - u.val);
}
