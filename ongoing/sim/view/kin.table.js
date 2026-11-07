/* =========================================
   KIN TABLE
   Velocity kinematics readout:  V = J · qdot
   Builds the table once and updates the numbers every frame.
   It only reads robot state and writes to the DOM.
   ========================================= */

const LABELS = [
  "&omega;<sub>x</sub> (rad/s)",
  "&omega;<sub>y</sub>",
  "&omega;<sub>z</sub>",
  "v<sub>x</sub>",
  "v<sub>y</sub>",
  "v<sub>z</sub>",
];

// Build a string by repeating a template n times
const repeat = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");

export class KinTable {
  constructor({ elementId = "eq", robot, dof }) {
    this.root = document.getElementById(elementId);
    this.robot = robot;
    this.dof = dof;

    // Cache every cell once so the per-frame update avoids getElementById
    this.cells = null;
    this.twistCells = null;
    this.qdotCells = null;

    if (this.root) this._build();
  }

  /* =====================================
     BUILD
     ===================================== */

  _build() {
    this.root.innerHTML = `
      <table class="mx vec">
        <thead>
          <tr><th></th><th>V</th></tr>
        </thead>
        <tbody>
          ${repeat(
            6,
            (r) => `
              <tr class="${r === 3 ? "sep" : ""}">
                <td class="lab">${LABELS[r]}</td>
                <td class="val res" id="tw${r}">0.00</td>
              </tr>
            `,
          )}
        </tbody>
      </table>

      <div class="op">=</div>

      <table class="mx mat">
        <thead>
          <tr>
            ${repeat(this.dof, (c) => `<th>J<sub>${c + 1}</sub></th>`)}
          </tr>
        </thead>
        <tbody>
          ${repeat(
            6,
            (r) => `
              <tr class="${r === 3 ? "sep" : ""}">
                ${repeat(this.dof, (c) => `<td id="jc${r}_${c}">0.00</td>`)}
              </tr>
            `,
          )}
        </tbody>
      </table>

      <div class="op">&middot;</div>

      <table class="mx vec qvec">
        <thead>
          <tr><th></th><th>&theta;&#775;</th></tr>
        </thead>
        <tbody>
          ${repeat(
            this.dof,
            (c) => `
              <tr>
                <td class="lab">&theta;<sub>${c + 1}</sub></td>
                <td class="val" id="qd${c}">0.00</td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;

    // Cache cell references
    this.cells = Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: this.dof }, (_, c) =>
        document.getElementById(`jc${r}_${c}`),
      ),
    );
    this.twistCells = Array.from({ length: 6 }, (_, r) =>
      document.getElementById(`tw${r}`),
    );
    this.qdotCells = Array.from({ length: this.dof }, (_, c) =>
      document.getElementById(`qd${c}`),
    );
  }

  /* =====================================
     UPDATE
     ===================================== */

  update(q, qdot) {
    if (!this.cells) return;

    const J = this.robot.sJacKin(q);

    const maxJ = Math.max(1e-9, ...J.flat().map(Math.abs));

    // Twist V = J · qdot
    const twist = J.map((row) =>
      row.reduce((sum, v, k) => sum + v * qdot[k], 0),
    );

    // Normalization factors for the bar backgrounds
    const na = Math.max(0.1, ...twist.slice(0, 3).map(Math.abs));
    const nl = Math.max(1, ...twist.slice(3).map(Math.abs));
    const nq = Math.max(0.5, ...qdot.map(Math.abs));

    for (let c = 0; c < this.dof; c++) {
      // A joint column is highlighted while that joint is moving
      const active = Math.abs(qdot[c]) > 1e-3;

      for (let r = 0; r < 6; r++) {
        const el = this.cells[r][c];
        if (!el) continue;

        const v = J[r][c];
        const nonZero = Math.abs(v) >= 5e-3;

        el.textContent = v.toFixed(2);
        el.className = !nonZero ? "" : active ? "v on" : "v";
        el.style.backgroundColor =
          active && nonZero
            ? `rgba(255,119,0,${(0.06 + (0.2 * Math.abs(v)) / maxJ).toFixed(3)})`
            : "";
      }

      this._put(this.qdotCells[c], qdot[c], nq);
    }

    for (let r = 0; r < 6; r++) {
      this._put(this.twistCells[r], twist[r], r < 3 ? na : nl);
    }
  }

  /* =====================================
     HELPERS
     ===================================== */

  // Show a value and fill the cell background proportionally to |value| / norm
  _put(el, value, norm) {
    if (!el) return;

    el.textContent = value.toFixed(2);

    if (norm !== undefined) {
      const w = Math.min(100, (Math.abs(value) / norm) * 100).toFixed(0);

      el.style.backgroundImage = `linear-gradient(90deg,rgba(255,119,0,.2) ${w}%,transparent ${w}%)`;
    }
  }
}