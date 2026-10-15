/* ==========================================================================
1. Linear Algebra & Math Utilities
   ========================================================================== */
class Vector3 {
    static cross(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };
    }

    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    }

    static normalize(v) {
        const n = Math.hypot(v.x, v.y, v.z) || 1e-9;
        return { x: v.x / n, y: v.y / n, z: v.z / n };
    }
}

class MatrixMath {
    /** 5x5 Matrix Determinant (Gaussian Elimination) */
    static det5x5(mat) {
        const A = mat.map(row => Array.from(row));
        let det = 1.0;
        const n = 5;

        for (let i = 0; i < n; i++) {
            let pivot = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(A[j][i]) > Math.abs(A[pivot][i])) pivot = j;
            }

            if (Math.abs(A[pivot][i]) < 1e-12) return 0.0;

            if (pivot !== i) {
                [A[i], A[pivot]] = [A[pivot], A[i]];
                det *= -1.0;
            }

            det *= A[i][i];

            for (let j = i + 1; j < n; j++) {
                const factor = A[j][i] / A[i][i];
                for (let k = i + 1; k < n; k++) {
                    A[j][k] -= factor * A[i][k];
                }
            }
        }
        return det;
    }

    /** Symmetric 5x5 Matrix Eigenvalues Solver (Jacobi Algorithm) */
    static solveEigenvalues5x5(A) {
        const D = A.map(row => Array.from(row));
        const n = 5;

        for (let iter = 0; iter < 20; iter++) {
            let p = 0, q = 1, max = Math.abs(D[0][1]);
            for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                    if (Math.abs(D[i][j]) > max) {
                        max = Math.abs(D[i][j]);
                        p = i; q = j;
                    }
                }
            }

            if (max < 1e-9) break;

            const diff = D[q][q] - D[p][p];
            let t = 0;
            if (Math.abs(D[p][q]) >= 1e-11) {
                const phi = diff / (2 * D[p][q]);
                t = 1 / (Math.abs(phi) + Math.sqrt(phi * phi + 1));
                if (phi < 0) t = -t;
            }

            const c = 1 / Math.sqrt(t * t + 1);
            const s = t * c;
            const tau = s / (1 + c);

            const temp = D[p][q];
            D[p][q] = 0;
            D[q][p] = 0;
            D[p][p] -= t * temp;
            D[q][q] += t * temp;

            for (let i = 0; i < n; i++) {
                if (i !== p && i !== q) {
                    const g = D[i][p], h = D[i][q];
                    D[i][p] = g - s * (h + g * tau);
                    D[p][i] = D[i][p];
                    D[i][q] = h + s * (g - h * tau);
                    D[q][i] = D[i][q];
                }
            }
        }

        const evals = [];
        for (let i = 0; i < n; i++) evals.push(Math.max(0, D[i][i]));
        return evals.sort((a, b) => b - a);
    }

    /** Symmetric 3x3 Matrix Eigen Decomposition */
    static solveEigen3x3(A) {
        const V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        const D = [
            [A[0][0], A[0][1], A[0][2]],
            [A[1][0], A[1][1], A[1][2]],
            [A[2][0], A[2][1], A[2][2]]
        ];

        for (let iter = 0; iter < 15; iter++) {
            let p = 0, q = 1;
            let max = Math.abs(D[0][1]);
            if (Math.abs(D[0][2]) > max) { max = Math.abs(D[0][2]); p = 0; q = 2; }
            if (Math.abs(D[1][2]) > max) { max = Math.abs(D[1][2]); p = 1; q = 2; }

            if (max < 1e-9) break;

            const diff = D[q][q] - D[p][p];
            let t = 0;
            if (Math.abs(D[p][q]) >= 1e-11) {
                const phi = diff / (2 * D[p][q]);
                t = 1 / (Math.abs(phi) + Math.sqrt(phi * phi + 1));
                if (phi < 0) t = -t;
            }

            const c = 1 / Math.sqrt(t * t + 1);
            const s = t * c;
            const tau = s / (1 + c);

            const temp = D[p][q];
            D[p][q] = 0;
            D[q][p] = 0;
            D[p][p] -= t * temp;
            D[q][q] += t * temp;

            for (let i = 0; i < 3; i++) {
                if (i !== p && i !== q) {
                    const g = D[i][p], h = D[i][q];
                    D[i][p] = g - s * (h + g * tau);
                    D[p][i] = D[i][p];
                    D[i][q] = h + s * (g - h * tau);
                    D[q][i] = D[i][q];
                }
            }

            for (let i = 0; i < 3; i++) {
                const g = V[i][p], h = V[i][q];
                V[i][p] = g - s * (h + g * tau);
                V[i][q] = h + s * (g - h * tau);
            }
        }

        return {
            values: [D[0][0], D[1][1], D[2][2]],
            vectors: [
                { x: V[0][0], y: V[1][0], z: V[2][0] },
                { x: V[0][1], y: V[1][0], z: V[2][1] },
                { x: V[0][2], y: V[1][2], z: V[2][2] }
            ]
        };
    }
}

/* ==========================================================================
2. Robot Kinematics & Statics Engine
   ========================================================================== */
class RobotEngine {
    constructor() {
        this.H = 25;  this.L1 = 25; this.L2 = 50; 
        this.L3 = 50; this.L4 = 25; this.L5 = 25;

        this.J = Array.from({ length: 6 }, () => new Float64Array(5));
        this.V = new Float64Array(6);
        this.JJT = Array.from({ length: 3 }, () => new Float64Array(3));
        this.tau = new Float64Array(5);
    }

    computeFK(qDeg) {
        const qRad = qDeg.map(d => (d * Math.PI) / 180);
        const [j1, j2, j3, j4, j5] = qRad;
        const c1 = Math.cos(j1), s1 = Math.sin(j1);

        const base = { x: 0, y: 0, z: 0 };
        const p1 = { x: 0, y: 0, z: this.H };
        const p2 = { x: 0, y: 0, z: this.H + this.L1 };

        let phi = j2;
        const p3 = {
            x: p2.x + this.L2 * Math.sin(phi) * c1,
            y: p2.y + this.L2 * Math.sin(phi) * s1,
            z: p2.z + this.L2 * Math.cos(phi)
        };

        phi += j3;
        const p4 = {
            x: p3.x + this.L3 * Math.sin(phi) * c1,
            y: p3.y + this.L3 * Math.sin(phi) * s1,
            z: p3.z + this.L3 * Math.cos(phi)
        };

        phi += j4;
        const p5 = {
            x: p4.x + this.L4 * Math.sin(phi) * c1,
            y: p4.y + this.L4 * Math.sin(phi) * s1,
            z: p4.z + this.L4 * Math.cos(phi)
        };

        const totalYaw = j1 + j5;
        const c15 = Math.cos(totalYaw), s15 = Math.sin(totalYaw);
        const head = {
            x: p5.x + this.L5 * Math.sin(phi) * c15,
            y: p5.y + this.L5 * Math.sin(phi) * s15,
            z: p5.z + this.L5 * Math.cos(phi)
        };

        const z0 = { x: 0, y: 0, z: 1 };
        const zPitch = { x: -s1, y: c1, z: 0 };
        const z4 = { x: 0, y: 0, z: 1 };

        return {
            points: { base, j1P: p1, j2P: p2, j3P: p3, j4P: p4, j5P: p5, head },
            axes: [z0, zPitch, zPitch, zPitch, z4],
            positions: [p1, p2, p3, p4, p5]
        };
    }

    computeKinematicsAndStatics(qDeg, qDotDeg, wrench) {
        const { points, axes, positions } = this.computeFK(qDeg);
        const headP = points.head;
        const J = this.J;

        // 1. Geometric Jacobian (J = [J_omega; J_v])
        for (let i = 0; i < 5; i++) {
            const zI = axes[i];
            const pI = positions[i];

            J[0][i] = zI.x;
            J[1][i] = zI.y;
            J[2][i] = zI.z;

            const r = { x: headP.x - pI.x, y: headP.y - pI.y, z: headP.z - pI.z };
            const v = Vector3.cross(zI, r);

            J[3][i] = v.x;
            J[4][i] = v.y;
            J[5][i] = v.z;
        }

        // 2. JTJ Computation
        const JTJ = Array.from({ length: 5 }, () => new Float64Array(5));
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                let sum = 0;
                for (let k = 0; k < 6; k++) {
                    const jVal_r = k >= 3 ? J[k][r] / 100.0 : J[k][r];
                    const jVal_c = k >= 3 ? J[k][c] / 100.0 : J[k][c];
                    sum += jVal_r * jVal_c;
                }
                JTJ[r][c] = sum;
            }
        }

        // 2.1 Manipulability Index & Condition Number
        const detJTJ = Math.max(0, MatrixMath.det5x5(JTJ));
        const w = Math.sqrt(detJTJ);

        const sortedEvals = MatrixMath.solveEigenvalues5x5(JTJ);
        const lambdaMax = sortedEvals[0];
        const lambdaMin = sortedEvals[4];

        const condNum = (lambdaMin > 1e-8 && lambdaMax > 1e-8) 
            ? Math.sqrt(lambdaMax / lambdaMin) 
            : Infinity;

        // 2.3 Linear Velocity Ellipsoid JJT
        const JJT = this.JJT;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                let sum = 0;
                for (let k = 0; k < 5; k++) {
                    sum += (J[r + 3][k] / 100.0) * (J[c + 3][k] / 100.0);
                }
                JJT[r][c] = sum;
            }
        }

        const eigen3x3 = MatrixMath.solveEigen3x3(JJT);
        const sortedValues3x3 = [...eigen3x3.values].map(v => Math.max(0, v)).sort((a, b) => b - a);
        const ellipsoid = {
            radii: sortedValues3x3.map(v => Math.sqrt(v)),
            axes: eigen3x3.vectors
        };

        // 3. Twist Calculation
        const V = this.V;
        V.fill(0);
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 5; c++) {
                const qDotRad = (qDotDeg[c] * Math.PI) / 180;
                V[r] += J[r][c] * qDotRad;
            }
        }

        // 4. Joint Torque Calculation
        const W = [wrench.mx, wrench.my, wrench.mz, wrench.fx, wrench.fy, wrench.fz];
        const tau = this.tau;
        for (let j = 0; j < 5; j++) {
            let t = 0;
            for (let r = 0; r < 6; r++) {
                const jScale = r >= 3 ? J[r][j] / 100.0 : J[r][j];
                t += jScale * W[r];
            }
            tau[j] = t;
        }

        return { points, axes, J, V, w, condNum, tau, ellipsoid };
    }
}

/* ==========================================================================
3. Canvas 3D View Renderer
   ========================================================================== */
class RobotRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.camera = { x: 550, y: 180, z: 220 };
        this.target = { x: 0, y: 0, z: 90 };
        this.focal = 700;

        this.initCamera();
    }

    initCamera() {
        this.fwd = Vector3.normalize(Vector3.sub(this.target, this.camera));
        this.rgt = Vector3.normalize(Vector3.cross(this.fwd, { x: 0, y: 0, z: 1 }));
        this.up  = Vector3.normalize(Vector3.cross(this.rgt, this.fwd));
    }

    project(p) {
        const v = Vector3.sub(p, this.camera);
        const z = Vector3.dot(v, this.fwd);
        if (z <= 0) return null;

        const sc = this.focal / z;
        const xProj = Vector3.dot(v, this.rgt);
        const yProj = Vector3.dot(v, this.up);

        return {
            x: this.canvas.width / 2 + xProj * sc,
            y: this.canvas.height / 2 - yProj * sc
        };
    }

    line(a, b, w = 3, col = "black") {
        const A = this.project(a), B = this.project(b);
        if (!A || !B) return;
        this.ctx.beginPath(); 
        this.ctx.moveTo(A.x, A.y); 
        this.ctx.lineTo(B.x, B.y);
        this.ctx.strokeStyle = col; 
        this.ctx.lineWidth = w; 
        this.ctx.stroke();
    }

    arrow(from, to, w = 2, col = "black") {
        this.line(from, to, w, col);
        const A = this.project(from), B = this.project(to);
        if (!A || !B) return;
        
        const angle = Math.atan2(B.y - A.y, B.x - A.x);
        const headLen = 9;
        this.ctx.beginPath();
        this.ctx.moveTo(B.x, B.y);
        this.ctx.lineTo(B.x - headLen * Math.cos(angle - Math.PI / 6), B.y - headLen * Math.sin(angle - Math.PI / 6));
        this.ctx.lineTo(B.x - headLen * Math.cos(angle + Math.PI / 6), B.y - headLen * Math.sin(angle + Math.PI / 6));
        this.ctx.closePath();
        this.ctx.fillStyle = col;
        this.ctx.fill();
    }

    point(p, r = 8, fill = "black") {
        const P = this.project(p);
        if (!P) return;
        this.ctx.beginPath(); 
        this.ctx.arc(P.x, P.y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = fill; 
        this.ctx.fill(); 
        this.ctx.strokeStyle = "black"; 
        this.ctx.lineWidth = 1.5; 
        this.ctx.stroke();
    }

    text3D(txt, p, col = "black", font = "bold 13px Arial") {
        const P = this.project(p);
        if (!P) return;
        this.ctx.font = font; 
        this.ctx.fillStyle = col;
        this.ctx.fillText(txt, P.x + 6, P.y + 4);
    }

    drawRotationArrow(center, axis, angle, radius = 16) {
        const ref = Math.abs(axis.z) < 0.9 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
        const u = Vector3.normalize(Vector3.cross(axis, ref));
        const v = Vector3.normalize(Vector3.cross(axis, u));

        const points = [];
        const direction = Math.sign(angle) || 1;
        const sweep = direction * Math.PI * 1.5;

        for (let i = 0; i <= 32; i++) {
            const t = (sweep * i) / 32;
            points.push({
                x: center.x + radius * (u.x * Math.cos(t) + v.x * Math.sin(t)),
                y: center.y + radius * (u.y * Math.cos(t) + v.y * Math.sin(t)),
                z: center.z + radius * (u.z * Math.cos(t) + v.z * Math.sin(t))
            });
        }

        for (let i = 0; i < points.length - 1; i++) {
            this.line(points[i], points[i + 1], 2, "#ff7700");
        }
        this.arrow(points[points.length - 2], points[points.length - 1], 2, "#ff7700");
    }

    drawEllipsoid(center, ellipsoid, scale = 35) {
        const { radii, axes } = ellipsoid;
        const latSteps = 12, lonSteps = 24;
        const gridPoints = [];

        const colors = ["#e03131", "#2f9e44", "#1971c2"];
        for (let i = 0; i < 3; i++) {
            const len = radii[i] * scale;
            if (len < 1e-3) continue;
            const dir = axes[i];
            const p1 = { x: center.x + dir.x * len, y: center.y + dir.y * len, z: center.z + dir.z * len };
            const p2 = { x: center.x - dir.x * len, y: center.y - dir.y * len, z: center.z - dir.z * len };
            this.line(p2, p1, 2, colors[i]);
        }

        for (let i = 0; i <= latSteps; i++) {
            const theta = (i * Math.PI) / latSteps;
            const sinT = Math.sin(theta), cosT = Math.cos(theta);
            const row = [];

            for (let j = 0; j <= lonSteps; j++) {
                const phi = (j * 2 * Math.PI) / lonSteps;
                const sinP = Math.sin(phi), cosP = Math.cos(phi);

                const dx = radii[0] * sinT * cosP;
                const dy = radii[1] * sinT * sinP;
                const dz = radii[2] * cosT;

                const worldX = center.x + scale * (axes[0].x * dx + axes[1].x * dy + axes[2].x * dz);
                const worldY = center.y + scale * (axes[0].y * dx + axes[1].y * dy + axes[2].y * dz);
                const worldZ = center.z + scale * (axes[0].z * dx + axes[1].z * dy + axes[2].z * dz);

                row.push({ x: worldX, y: worldY, z: worldZ });
            }
            gridPoints.push(row);
        }

        const meshCol = "rgba(0, 180, 216, 0.35)";
        for (let i = 0; i <= latSteps; i++) {
            for (let j = 0; j < lonSteps; j++) {
                this.line(gridPoints[i][j], gridPoints[i][j + 1], 1, meshCol);
            }
        }
        for (let j = 0; j <= lonSteps; j++) {
            for (let i = 0; i < latSteps; i++) {
                this.line(gridPoints[i][j], gridPoints[i + 1][j], 1, meshCol);
            }
        }
    }

    draw(points, axes, activeJointIndex, wrench, tau, qDeg, ellipsoid) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // World Axes
        const O = { x: 0, y: 0, z: 0 }, axisLen = 180;
        this.arrow(O, { x: axisLen, y: 0, z: 0 }, 2, "#e03131");
        this.text3D("X", { x: axisLen + 8, y: 0, z: 0 }, "#e03131");

        this.arrow(O, { x: 0, y: axisLen, z: 0 }, 2, "#2f9e44");
        this.text3D("Y", { x: 0, y: axisLen + 8, z: 0 }, "#2f9e44");

        this.arrow(O, { x: 0, y: 0, z: axisLen }, 2, "#1971c2");
        this.text3D("Z", { x: 0, y: 0, z: axisLen + 8 }, "#1971c2");

        // Structure
        const P = points;
        this.point(P.base, 5, "#777");
        this.line(P.base, P.j1P, 5, "black");
        this.line(P.j1P, P.j2P, 4, "black");
        this.line(P.j2P, P.j3P, 5, "black");
        this.line(P.j3P, P.j4P, 5, "black");
        this.line(P.j4P, P.j5P, 4, "black");
        this.line(P.j5P, P.head, 3, "black");
        this.point(P.head, 6, "#598be7");

        if (ellipsoid) {
            this.drawEllipsoid(P.head, ellipsoid, 35);
        }

        const jointPoints = [P.j1P, P.j2P, P.j3P, P.j4P, P.j5P];
        jointPoints.forEach((p, idx) => {
            const isHovered = (activeJointIndex === idx);
            const radius = (idx === 0 || idx === 4 ? 7 : 8);
            const color = isHovered ? "#ff7700" : "#ffffff";

            this.point(p, radius, color);
            
            const axisVec = axes[idx];
            const axisEnd = {
                x: p.x + axisVec.x * 25,
                y: p.y + axisVec.y * 25,
                z: p.z + axisVec.z * 25
            };
            this.arrow(p, axisEnd, 2, "#888888");

            if (isHovered) {
                this.drawRotationArrow(p, axisVec, qDeg[idx] || 1, 18);
            }
        });

        // Wrench Visuals
        const head = P.head;
        const fScale = 0.8, mScale = 1.8;

        if (Math.hypot(wrench.fx, wrench.fy, wrench.fz) > 0.1) {
            const fEnd = {
                x: head.x + wrench.fx * fScale,
                y: head.y + wrench.fy * fScale,
                z: head.z + wrench.fz * fScale
            };
            this.arrow(head, fEnd, 3, "#ff3300");
            this.text3D("F", fEnd, "#ff3300", "bold 14px Arial");
        }

        if (Math.hypot(wrench.mx, wrench.my, wrench.mz) > 0.1) {
            const mEnd = {
                x: head.x + wrench.mx * mScale,
                y: head.y + wrench.my * mScale,
                z: head.z + wrench.mz * mScale
            };
            this.arrow(head, mEnd, 3, "#9c27b0");
            this.text3D("M", mEnd, "#9c27b0", "bold 14px Arial");
        }
    }
}

/* ==========================================================================
4. DOM Manager
   ========================================================================== */
class DOMManager {
    constructor(jointNames, callbacks) {
        this.jointNames = jointNames;
        this.callbacks = callbacks;

        this.guiContainer = document.getElementById("gui");
        this.twistBody = document.getElementById("twist-body");
        this.jacobianBody = document.getElementById("jacobian-body");
        this.qdotBody = document.getElementById("qdot-body");
        this.manipBadge = document.getElementById("manipulability-val");

        this.torqueBody = document.getElementById("torque-body");
        this.jtBody = document.getElementById("jacobian-transpose-body");
        this.wrenchMatrixBody = document.getElementById("wrench-matrix-body");
        this.maxTorqueVal = document.getElementById("max-torque-val");

        this.wrenchNorm = document.getElementById("wrench-norm");
        this.resetWrenchBtn = document.getElementById("reset-wrench");

        const keys = ['fx', 'fy', 'fz', 'mx', 'my', 'mz'];
        this.wrenchInputs = Object.fromEntries(keys.map(k => [k, document.getElementById(`wrench-${k}`)]));
        this.wrenchValues = Object.fromEntries(keys.map(k => [k, document.getElementById(`value-${k}`)]));

        this.initGUI();
        this.initWrenchEvents();
        this.buildMatrixTables();
    }

    initGUI() {
        this.guiContainer.innerHTML = this.jointNames.map((name, i) => `
            <div class="gui-item" data-index="${i}" style="padding: 4px; border-radius: 4px; transition: background 0.2s;">
                <label>
                    <span id="dot-${i}" class="gui-dot"></span>
                    <b>${name}:</b> <span id="v${i}">0</span>°
                </label>
                <input type="range" id="s${i}" min="-180" max="180" step="1" value="0">
            </div>
        `).join('');

        this.jointNames.forEach((_, i) => {
            const slider = document.getElementById(`s${i}`);
            const item = slider.closest('.gui-item');

            item.addEventListener("mouseenter", () => this.callbacks.onHover(i, true, item));
            item.addEventListener("mouseleave", () => this.callbacks.onHover(i, false, item));
            slider.addEventListener("input", e => this.callbacks.onInput(i, parseFloat(e.target.value)));
        });
    }

    initWrenchEvents() {
        Object.keys(this.wrenchInputs).forEach(key => {
            const input = this.wrenchInputs[key];
            input?.addEventListener("input", () => {
                const val = parseFloat(input.value);
                this.wrenchValues[key].textContent = val;
                this.callbacks.onWrenchChange();
            });
        });

        this.resetWrenchBtn?.addEventListener("click", () => {
            Object.keys(this.wrenchInputs).forEach(key => {
                this.wrenchInputs[key].value = 0;
                this.wrenchValues[key].textContent = "0";
            });
            this.callbacks.onWrenchChange();
        });
    }

    getWrench() {
        return Object.fromEntries(
            Object.entries(this.wrenchInputs).map(([k, el]) => [k, parseFloat(el?.value || 0)])
        );
    }

    buildMatrixTables() {
        const twistLabels = ['&omega;<sub>x</sub>', '&omega;<sub>y</sub>', '&omega;<sub>z</sub>', 'v<sub>x</sub>', 'v<sub>y</sub>', 'v<sub>z</sub>'];
        this.twistBody.innerHTML = twistLabels.map((l, r) => 
            `<tr><td class="row-label">${l}</td><td class="j-cell" id="v-cell-${r}">0.00</td></tr>`
        ).join('');

        this.jacobianBody.innerHTML = Array.from({ length: 6 }, (_, r) => {
            const cells = Array.from({ length: 5 }, (_, c) => `<td class="j-cell" id="j-cell-${r}-${c}">0.00</td>`).join('');
            return `<tr${r === 3 ? ' class="sep-row"' : ''}>${cells}</tr>`;
        }).join('');

        const qdotLabels = ['&theta;&#775;<sub>1</sub>', '&theta;&#775;<sub>2</sub>', '&theta;&#775;<sub>3</sub>', '&theta;&#775;<sub>4</sub>', '&theta;&#775;<sub>5</sub>'];
        this.qdotBody.innerHTML = qdotLabels.map((l, c) => 
            `<tr><td class="row-label">${l}</td><td class="j-cell" id="qdot-cell-${c}">0.0</td></tr>`
        ).join('');

        const tauLabels = ['&tau;<sub>1</sub>', '&tau;<sub>2</sub>', '&tau;<sub>3</sub>', '&tau;<sub>4</sub>', '&tau;<sub>5</sub>'];
        this.torqueBody.innerHTML = tauLabels.map((l, r) =>
            `<tr><td class="row-label">${l}</td><td class="j-cell" id="tau-cell-${r}">0.00</td></tr>`
        ).join('');

        this.jtBody.innerHTML = Array.from({ length: 5 }, (_, r) => {
            const cells = Array.from({ length: 6 }, (_, c) => `<td class="j-cell" id="jt-cell-${r}-${c}">0.00</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        const wrenchLabels = ['M<sub>x</sub>', 'M<sub>y</sub>', 'M<sub>z</sub>', 'F<sub>x</sub>', 'F<sub>y</sub>', 'F<sub>z</sub>'];
        this.wrenchMatrixBody.innerHTML = wrenchLabels.map((l, r) =>
            `<tr><td class="row-label">${l}</td><td class="j-cell" id="wrench-cell-${r}">0.00</td></tr>`
        ).join('');
    }

    updateAngleDisplay(i, val) {
        document.getElementById(`v${i}`).textContent = val;
    }

    updateUI({ J, V, w, condNum, tau }, qDotDeg, activeJointIndex, wrench) {
        const condStr = (!isFinite(condNum) || isNaN(condNum)) ? "∞" : condNum.toFixed(3);
        this.manipBadge.innerHTML = `&mu;<sub>1</sub> = ${condStr} &nbsp;|&nbsp; &mu;<sub>3</sub> = ${w.toFixed(3)}`;
        
        for (let c = 0; c < 5; c++) {
            document.getElementById(`jh-${c}`)?.classList.toggle("active-col", c === activeJointIndex);
        }

        for (let r = 0; r < 6; r++) {
            const val = V[r];
            const absVal = Math.abs(val);
            const cell = document.getElementById(`v-cell-${r}`);
            cell.textContent = val === 0 ? "0.00" : (val > 0 ? "+" : "") + val.toFixed(2);
            cell.style.backgroundColor = absVal > 0.01 ? "rgba(56, 237, 248, 0.25)" : "";
            cell.style.color = absVal > 0.01 ? "#38edf8" : "";
        }

        for (let r = 0; r < 6; r++) {
            const isAngular = r < 3;
            for (let c = 0; c < 5; c++) {
                let normVal = isAngular ? J[r][c] : J[r][c] / 100;
                if (Math.abs(normVal) < 1e-5) normVal = 0;

                const absVal = Math.abs(normVal);
                const cell = document.getElementById(`j-cell-${r}-${c}`);
                cell.textContent = normVal === 0 ? "0.00" : (normVal > 0 ? "+" : "-") + absVal.toFixed(2);

                if (absVal > 0.02) {
                    const alpha = Math.min(0.75, 0.25 + absVal / (isAngular ? 0.6 : 0.8));
                    cell.style.backgroundColor = `rgba(255, 73, 0, ${alpha.toFixed(2)})`;
                    cell.style.color = "#ffffff";
                } else {
                    cell.style.backgroundColor = "";
                    cell.style.color = "";
                }
            }
        }

        for (let c = 0; c < 5; c++) {
            const val = qDotDeg[c];
            const absVal = Math.abs(val);
            const cell = document.getElementById(`qdot-cell-${c}`);
            cell.textContent = val === 0 ? "0.0" : (val > 0 ? "+" : "") + val.toFixed(1);
            cell.style.backgroundColor = absVal > 0.1 ? "rgba(74, 222, 128, 0.25)" : "";
            cell.style.color = absVal > 0.1 ? "#4ade80" : "";
        }

        let maxAbsTau = 0;
        for (let r = 0; r < 5; r++) {
            const val = tau[r];
            const absVal = Math.abs(val);
            if (absVal > maxAbsTau) maxAbsTau = absVal;

            const cell = document.getElementById(`tau-cell-${r}`);
            cell.textContent = val === 0 ? "0.00" : (val > 0 ? "+" : "") + val.toFixed(2);
            cell.style.backgroundColor = absVal > 0.1 ? "rgba(234, 179, 8, 0.3)" : "";
            cell.style.color = absVal > 0.1 ? "#facc15" : "";
        }
        if (this.maxTorqueVal) {
            this.maxTorqueVal.textContent = `Max τ = ${maxAbsTau.toFixed(1)} N·m`;
        }

        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                const isAngularCol = c < 3;
                let normVal = isAngularCol ? J[c][r] : J[c][r] / 100;
                if (Math.abs(normVal) < 1e-5) normVal = 0;

                const absVal = Math.abs(normVal);
                const cell = document.getElementById(`jt-cell-${r}-${c}`);
                cell.textContent = normVal === 0 ? "0.00" : (normVal > 0 ? "+" : "-") + absVal.toFixed(2);

                if (absVal > 0.02) {
                    const alpha = Math.min(0.75, 0.2 + absVal / (isAngularCol ? 0.6 : 0.8));
                    cell.style.backgroundColor = `rgba(168, 85, 247, ${alpha.toFixed(2)})`;
                    cell.style.color = "#ffffff";
                } else {
                    cell.style.backgroundColor = "";
                    cell.style.color = "";
                }
            }
        }

        const wrenchArr = [wrench.mx, wrench.my, wrench.mz, wrench.fx, wrench.fy, wrench.fz];
        for (let r = 0; r < 6; r++) {
            const val = wrenchArr[r];
            const absVal = Math.abs(val);
            const cell = document.getElementById(`wrench-cell-${r}`);
            cell.textContent = val === 0 ? "0.00" : (val > 0 ? "+" : "") + val.toFixed(2);
            cell.style.backgroundColor = absVal > 0.01 ? "rgba(236, 72, 153, 0.25)" : "";
            cell.style.color = absVal > 0.01 ? "#f472b6" : "";
        }

        const fNorm = Math.hypot(wrench.fx, wrench.fy, wrench.fz);
        this.wrenchNorm.textContent = `‖F‖ = ${fNorm.toFixed(2)} N`;
    }
}

/* ==========================================================================
5. Main Orchestrator App
   ========================================================================== */
class SimulationApp {
    constructor() {
        this.qDeg = [0, 0, 0, 0, 0];
        this.qDotDeg = [0, 0, 0, 0, 0];
        this.activeJointIndex = -1;

        const initTime = performance.now();
        this.lastChangeTime = [initTime, initTime, initTime, initTime, initTime];
        this.needsRedraw = true;

        this.engine = new RobotEngine();
        this.canvas = document.getElementById("canvas");
        this.renderer = new RobotRenderer(this.canvas);

        const jointNames = [
            "&theta;<sub>1</sub>: Base Yaw (+Z)",
            "&theta;<sub>2</sub>: Shoulder Pitch (+Y)",
            "&theta;<sub>3</sub>: Elbow Pitch (+Y)",
            "&theta;<sub>4</sub>: Neck Pitch (+Y)",
            "&theta;<sub>5</sub>: Head Yaw (+Z)"
        ];

        this.dom = new DOMManager(jointNames, {
            onInput: (i, val) => this.handleInput(i, val),
            onHover: (i, isHovered, el) => this.handleHover(i, isHovered, el),
            onWrenchChange: () => { this.needsRedraw = true; }
        });

        this.initEvents();
        this.startLoop();
    }

    initEvents() {
        const handleResize = () => {
            const container = this.canvas.parentElement;
            this.canvas.width = container.clientWidth;
            this.canvas.height = container.clientHeight;
            this.needsRedraw = true;
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    }

    handleInput(i, newDeg) {
        const now = performance.now();
        const deltaDeg = newDeg - this.qDeg[i];
        const dt = (now - (this.lastChangeTime[i] || now)) / 1000;

        if (dt > 0.001) {
            this.qDotDeg[i] = deltaDeg / dt;
        }

        this.qDeg[i] = newDeg;
        this.lastChangeTime[i] = now;
        this.dom.updateAngleDisplay(i, newDeg);
        this.needsRedraw = true;
    }

    handleHover(i, isHovered, element) {
        this.activeJointIndex = isHovered ? i : -1;
        element.classList.toggle("active-item", isHovered);
        this.needsRedraw = true;
    }

    startLoop() {
        const loop = () => {
            const now = performance.now();
            
            for (let i = 0; i < 5; i++) {
                if (this.lastChangeTime[i] !== 0 && (now - this.lastChangeTime[i]) > 50) {
                    if (this.qDotDeg[i] !== 0) {
                        this.qDotDeg[i] = 0;
                        this.needsRedraw = true;
                    }
                }
            }

            if (this.needsRedraw) {
                const wrench = this.dom.getWrench();
                const kinData = this.engine.computeKinematicsAndStatics(this.qDeg, this.qDotDeg, wrench);
                
                this.renderer.draw(
                    kinData.points, 
                    kinData.axes, 
                    this.activeJointIndex, 
                    wrench, 
                    kinData.tau, 
                    this.qDeg, 
                    kinData.ellipsoid
                );
                this.dom.updateUI(kinData, this.qDotDeg, this.activeJointIndex, wrench);
                this.needsRedraw = false;
            }

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }
}

// Execute application
window.addEventListener("DOMContentLoaded", () => {
    new SimulationApp();
});