/* ==========================================================================
1. Robot Model & Velocity/Force Kinematics Engine
   ========================================================================== */
class RobotEngine {
    constructor() {
        // Link Lengths (cm)
        this.H = 25;  this.L1 = 25; this.L2 = 50; 
        this.L3 = 50; this.L4 = 25; this.L5 = 25;

        // Kinematics Data Cache (Prevents memory re-allocation)
        this.J = Array.from({ length: 6 }, () => new Float64Array(5));
        this.V = new Float64Array(6);
        this.JJT = Array.from({ length: 3 }, () => new Float64Array(3));
        this.tau = new Float64Array(5); // Joint torque (tau = J^T * W)
    }

    /** 3D Vector Cross Product Helper */
    static cross(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };
    }

    /** Forward Kinematics & Joint Position/Axis Calculation */
    computeFK(qDeg) {
        const qRad = qDeg.map(d => (d * Math.PI) / 180);
        const [j1, j2, j3, j4, j5] = qRad;

        const c1 = Math.cos(j1), s1 = Math.sin(j1);

        // Joint Positions (p)
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

        // Joint Rotation Axes (z)
        const z0 = { x: 0, y: 0, z: 1 };             // Base Yaw (+Z)
        const zPitch = { x: -s1, y: c1, z: 0 };       // Pitch Axes (+Y rotated by theta1)
        const z4 = { x: 0, y: 0, z: 1 };             // Head Yaw (+Z)

        return {
            points: { base, j1P: p1, j2P: p2, j3P: p3, j4P: p4, j5P: p5, head },
            axes: [z0, zPitch, zPitch, zPitch, z4],
            positions: [p1, p2, p3, p4, p5]
        };
    }

    /** Geometric Jacobian, Manipulability & Statics (Wrench to Joint Torque) */
    computeKinematicsAndStatics(qDeg, qDotDeg, wrench) {
        const { points, axes, positions } = this.computeFK(qDeg);
        const headP = points.head;
        const J = this.J;

        // 1. Geometric Jacobian (J = [J_omega; J_v])
        for (let i = 0; i < 5; i++) {
            const zI = axes[i];
            const pI = positions[i];

            // Angular Velocity Jacobian J_omega = z_i
            J[0][i] = zI.x;
            J[1][i] = zI.y;
            J[2][i] = zI.z;

            // Linear Velocity Jacobian J_v = z_i x (p_head - p_i)
            const r = { 
                x: headP.x - pI.x, 
                y: headP.y - pI.y, 
                z: headP.z - pI.z 
            };
            const v = RobotEngine.cross(zI, r);

            J[3][i] = v.x;
            J[4][i] = v.y;
            J[5][i] = v.z;
        }

        // 2. Manipulability Index (w)
        const JJT = this.JJT;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                let sum = 0;
                for (let k = 0; k < 5; k++) {
                    sum += (J[r + 3][k] / 100) * (J[c + 3][k] / 100);
                }
                JJT[r][c] = sum;
            }
        }

        const detJJT = Math.max(0, 
            JJT[0][0] * (JJT[1][1] * JJT[2][2] - JJT[1][2] * JJT[2][1]) -
            JJT[0][1] * (JJT[1][0] * JJT[2][2] - JJT[1][2] * JJT[2][0]) +
            JJT[0][2] * (JJT[1][0] * JJT[2][1] - JJT[1][1] * JJT[2][0])
        );
        const w = Math.sqrt(detJJT);

        // 3. End-Effector Twist V = J * qDot
        const V = this.V;
        V.fill(0);
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 5; c++) {
                const qDotRad = (qDotDeg[c] * Math.PI) / 180;
                V[r] += J[r][c] * qDotRad;
            }
        }

        // 4. Joint Torque Calculation: tau = J^T * W
        // Wrench W = [Mx, My, Mz, Fx, Fy, Fz]^T (Aligned with J row structure)
        const W = [
            wrench.mx, wrench.my, wrench.mz,
            wrench.fx, wrench.fy, wrench.fz
        ];
        const tau = this.tau;
        for (let j = 0; j < 5; j++) {
            let t = 0;
            for (let r = 0; r < 6; r++) {
                // Apply length normalization (/100) for linear velocity Jacobian (cm -> m)
                const jScale = r >= 3 ? J[r][j] / 100.0 : J[r][j];
                t += jScale * W[r];
            }
            tau[j] = t;
        }

        return { points, axes, J, V, w, tau };
    }
}

/* ==========================================================================
2. Canvas 3D View Renderer (Enhanced Rotation Axis & Wrench/Torque Visualization)
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
        const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
        const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
        const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
        const norm = v => { const n = Math.sqrt(dot(v, v)) || 1e-9; return { x: v.x / n, y: v.y / n, z: v.z / n }; };

        this.fwd = norm(sub(this.target, this.camera));
        this.rgt = norm(cross(this.fwd, { x: 0, y: 0, z: 1 }));
        this.up  = norm(cross(this.rgt, this.fwd));
    }

    project(p) {
        const v = { x: p.x - this.camera.x, y: p.y - this.camera.y, z: p.z - this.camera.z };
        const z = v.x * this.fwd.x + v.y * this.fwd.y + v.z * this.fwd.z;
        if (z <= 0) return null;

        const sc = this.focal / z;
        const xProj = v.x * this.rgt.x + v.y * this.rgt.y + v.z * this.rgt.z;
        const yProj = v.x * this.up.x  + v.y * this.up.y  + v.z * this.up.z;

        return {
            x: this.canvas.width / 2 + xProj * sc,
            y: this.canvas.height / 2 - yProj * sc
        };
    }

    line(a, b, w = 3, col = "black") {
        const A = this.project(a), B = this.project(b);
        if (!A || !B) return;
        this.ctx.beginPath(); this.ctx.moveTo(A.x, A.y); this.ctx.lineTo(B.x, B.y);
        this.ctx.strokeStyle = col; this.ctx.lineWidth = w; this.ctx.stroke();
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
        this.ctx.beginPath(); this.ctx.arc(P.x, P.y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = fill; this.ctx.fill(); this.ctx.strokeStyle = "black"; this.ctx.lineWidth = 1.5; this.ctx.stroke();
    }

    text3D(txt, p, col = "black", font = "bold 13px Arial") {
        const P = this.project(p);
        if (!P) return;
        this.ctx.font = font; this.ctx.fillStyle = col;
        this.ctx.fillText(txt, P.x + 6, P.y + 4);
    }

    /** Draw intuitive 3D rotation arc around joint axis */
    drawRotationArrow(center, axis, angle, radius = 16) {
        const a = axis;
        const ref = Math.abs(a.z) < 0.9
            ? { x: 0, y: 0, z: 1 }
            : { x: 0, y: 1, z: 0 };

        const cross = (u, v) => ({
            x: u.y * v.z - u.z * v.y,
            y: u.z * v.x - u.x * v.z,
            z: u.x * v.y - u.y * v.x
        });

        const norm = v => {
            const n = Math.hypot(v.x, v.y, v.z) || 1e-9;
            return { x: v.x / n, y: v.y / n, z: v.z / n };
        };

        const u = norm(cross(a, ref));
        const v = norm(cross(a, u));

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

        this.arrow(
            points[points.length - 2],
            points[points.length - 1],
            2,
            "#ff7700"
        );
    }

    draw(points, axes, activeJointIndex, wrench, tau, qDeg) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // World Axes
        const O = { x: 0, y: 0, z: 0 }, axisLen = 180;
        this.arrow(O, { x: axisLen, y: 0, z: 0 }, 2, "#e03131");
        this.text3D("X", { x: axisLen + 8, y: 0, z: 0 }, "#e03131");

        this.arrow(O, { x: 0, y: axisLen, z: 0 }, 2, "#2f9e44");
        this.text3D("Y", { x: 0, y: axisLen + 8, z: 0 }, "#2f9e44");

        this.arrow(O, { x: 0, y: 0, z: axisLen }, 2, "#1971c2");
        this.text3D("Z", { x: 0, y: 0, z: axisLen + 8 }, "#1971c2");

        // Robot Structure
        const P = points;
        this.point(P.base, 5, "#777");
        this.line(P.base, P.j1P, 5, "black");
        this.line(P.j1P, P.j2P, 4, "black");
        this.line(P.j2P, P.j3P, 5, "black");
        this.line(P.j3P, P.j4P, 5, "black");
        this.line(P.j4P, P.j5P, 4, "black");
        this.line(P.j5P, P.head, 3, "black");
        this.point(P.head, 6, "#598be7");

        const jointPoints = [P.j1P, P.j2P, P.j3P, P.j4P, P.j5P];
        jointPoints.forEach((p, idx) => {
            const isHovered = (activeJointIndex === idx);
            const radius = (idx === 0 || idx === 4 ? 7 : 8);
            const color = isHovered ? "#ff7700" : "#ffffff";

            this.point(p, radius, color);
            
            // Draw joint rotation axis vector (Cyan dashed arrow)
            const axisVec = axes[idx];
            const axisEnd = {
                x: p.x + axisVec.x * 25,
                y: p.y + axisVec.y * 25,
                z: p.z + axisVec.z * 25
            };
            this.arrow(p, axisEnd, 2, "#888888");

            // Draw rotation curved arrow for clear axis direction intuition
            if (isHovered) {
                this.drawRotationArrow(p, axisVec, qDeg[idx] || 1, 18);
            }

            // Torque numerical display
            const torqueVal = tau ? tau[idx].toFixed(1) : "0.0";
            this.text3D(`θ${idx + 1} (${torqueVal} N·m)`, p, isHovered ? "#ff7700" : "#222222", isHovered ? "bold 15px Arial" : "12px Arial");
        });

        // Wrench (Force & Moment) Visualization at Head
        const head = P.head;
        const fScale = 0.8; // Force scale factor
        const mScale = 1.8; // Moment scale factor

        // Force Vector (Red arrow)
        if (Math.abs(wrench.fx) > 0.1 || Math.abs(wrench.fy) > 0.1 || Math.abs(wrench.fz) > 0.1) {
            const fEnd = {
                x: head.x + wrench.fx * fScale,
                y: head.y + wrench.fy * fScale,
                z: head.z + wrench.fz * fScale
            };
            this.arrow(head, fEnd, 3, "#ff3300");
            this.text3D("F", fEnd, "#ff3300", "bold 14px Arial");
        }

        // Moment Vector (Purple arrow)
        if (Math.abs(wrench.mx) > 0.1 || Math.abs(wrench.my) > 0.1 || Math.abs(wrench.mz) > 0.1) {
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
3. DOM Manager (DOM Updates & Wrench UI Control Integration)
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

        // Wrench DOM Elements
        this.wrenchNorm = document.getElementById("wrench-norm");
        this.wrenchVector = document.getElementById("wrench-vector");
        this.resetWrenchBtn = document.getElementById("reset-wrench");

        this.wrenchInputs = {
            fx: document.getElementById("wrench-fx"),
            fy: document.getElementById("wrench-fy"),
            fz: document.getElementById("wrench-fz"),
            mx: document.getElementById("wrench-mx"),
            my: document.getElementById("wrench-my"),
            mz: document.getElementById("wrench-mz")
        };

        this.wrenchValues = {
            fx: document.getElementById("value-fx"),
            fy: document.getElementById("value-fy"),
            fz: document.getElementById("value-fz"),
            mx: document.getElementById("value-mx"),
            my: document.getElementById("value-my"),
            mz: document.getElementById("value-mz")
        };

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
            input.addEventListener("input", () => {
                const val = parseFloat(input.value);
                this.wrenchValues[key].textContent = val;
                this.callbacks.onWrenchChange();
            });
        });

        if (this.resetWrenchBtn) {
            this.resetWrenchBtn.addEventListener("click", () => {
                Object.keys(this.wrenchInputs).forEach(key => {
                    this.wrenchInputs[key].value = 0;
                    this.wrenchValues[key].textContent = "0";
                });
                this.callbacks.onWrenchChange();
            });
        }
    }

    getWrench() {
        return {
            fx: parseFloat(this.wrenchInputs.fx.value),
            fy: parseFloat(this.wrenchInputs.fy.value),
            fz: parseFloat(this.wrenchInputs.fz.value),
            mx: parseFloat(this.wrenchInputs.mx.value),
            my: parseFloat(this.wrenchInputs.my.value),
            mz: parseFloat(this.wrenchInputs.mz.value)
        };
    }

    buildMatrixTables() {
        const twistLabels = ['ω<sub>x</sub>', 'ω<sub>y</sub>', 'ω<sub>z</sub>', 'v<sub>x</sub>', 'v<sub>y</sub>', 'v<sub>z</sub>'];
        this.twistBody.innerHTML = twistLabels.map((l, r) => 
            `<tr><td class="row-label">${l}</td><td class="j-cell" id="v-cell-${r}">0.00</td></tr>`
        ).join('');

        this.jacobianBody.innerHTML = Array.from({ length: 6 }, (_, r) => {
            const cells = Array.from({ length: 5 }, (_, c) => 
                `<td class="j-cell" id="j-cell-${r}-${c}">0.00</td>`
            ).join('');
            return `<tr${r === 3 ? ' class="sep-row"' : ''}>${cells}</tr>`;
        }).join('');

        const qdotLabels = ['&theta;&#775;<sub>1</sub>', '&theta;&#775;<sub>2</sub>', '&theta;&#775;<sub>3</sub>', '&theta;&#775;<sub>4</sub>', '&theta;&#775;<sub>5</sub>'];
        this.qdotBody.innerHTML = qdotLabels.map((l, c) => 
            `<tr><td class="row-label">${l}</td><td class="j-cell" id="qdot-cell-${c}">0.0</td></tr>`
        ).join('');
    }

    updateAngleDisplay(i, val) {
        document.getElementById(`v${i}`).textContent = val;
    }

    updateUI({ J, V, w }, qDotDeg, activeJointIndex, wrench) {
        // Manipulability Badge
        this.manipBadge.textContent = `w = ${w.toFixed(3)}`;

        // Active Column Highlight
        for (let c = 0; c < 5; c++) {
            const th = document.getElementById(`jh-${c}`);
            if (th) th.classList.toggle("active-col", c === activeJointIndex);
        }

        // Twist Vector Update
        for (let r = 0; r < 6; r++) {
            const val = V[r];
            const absVal = Math.abs(val);
            const cell = document.getElementById(`v-cell-${r}`);
            cell.textContent = val === 0 ? "0.00" : (val > 0 ? "+" : "") + val.toFixed(2);
            cell.style.backgroundColor = absVal > 0.01 ? "rgba(56, 237, 248, 0.25)" : "";
            cell.style.color = absVal > 0.01 ? "#38edf8" : "";
        }

        // Jacobian Matrix Update
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

        // Joint Velocity Vector Update
        for (let c = 0; c < 5; c++) {
            const val = qDotDeg[c];
            const absVal = Math.abs(val);
            const cell = document.getElementById(`qdot-cell-${c}`);
            cell.textContent = val === 0 ? "0.0" : (val > 0 ? "+" : "") + val.toFixed(1);
            cell.style.backgroundColor = absVal > 0.1 ? "rgba(74, 222, 128, 0.25)" : "";
            cell.style.color = absVal > 0.1 ? "#4ade80" : "";
        }

        // Wrench Info Update
        const fNorm = Math.sqrt(wrench.fx ** 2 + wrench.fy ** 2 + wrench.fz ** 2);
        this.wrenchNorm.textContent = `‖F‖ = ${fNorm.toFixed(2)} N`;
        this.wrenchVector.textContent = `[${wrench.fx}, ${wrench.fy}, ${wrench.fz}, ${wrench.mx}, ${wrench.my}, ${wrench.mz}]ᵀ`;
    }
}

/* ==========================================================================
4. Main Orchestrator App (requestAnimationFrame Loop Control)
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

    /** Input Stop Detection & Animation Loop Processing */
    startLoop() {
        const loop = () => {
            const now = performance.now();
            
            // Detect input stop and decay joint velocities to 0
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
                
                this.renderer.draw(kinData.points, kinData.axes, this.activeJointIndex, wrench, kinData.tau, this.qDeg);
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