import {
  setText,
  setValue,
  getNumber,
  getValue,
  getElement,
  bind,
} from "./dom.utils.js";

const CONTROL_KEYS = ["gain", "damping", "cart", "speed"];

/* =========================================
   UI PANEL
   Owns every DOM id used by the control panel:
   joint sliders, IK parameters, target inputs, buttons and readouts.
   User actions are reported through the handlers object, so the
   panel contains no robot or IK logic.

   handlers:
     onJointInput(i, value)   joint slider moved
     onControlChange(key, v)  gain / damping / cart / speed changed
     onMethodChange(method)   IK method changed
     onTargetChange()         tx / ty / tz edited
     onRun / onStop / onCurrent / onReset
   ========================================= */

export class UIPanel {
  constructor({ names, limits, q, handlers = {} }) {
    this.names = names;
    this.limits = limits;
    this.handlers = handlers;

    this._buildJoints(q);
    this._bindJoints();
    this._bindControls();
    this._bindTarget();
    this._bindButtons();
  }

  /* =====================================
     BUILD
     ===================================== */

  _buildJoints(q) {
    const panel = getElement("joints");

    if (panel) {
      panel.innerHTML = this.names
        .map((name, i) => {
          // Slider width is proportional to the joint range
          const width = (
            ((this.limits[i][1] - this.limits[i][0]) / 360) *
            100
          ).toFixed(1);

          return `
            <div class="joint">
              <div class="jointtop">
                <b>&theta;<sub>${i + 1}</sub> (${name})</b>
                <output id="qv${i}"></output>
              </div>

              <div class="jw">
                <div class="ghost"></div>

                <input
                  id="q${i}"
                  type="range"
                  min="${this.limits[i][0]}"
                  max="${this.limits[i][1]}"
                  step=".1"
                  value="${q[i]}"
                  style="width:${width}%"
                >
              </div>

              <div class="jr" style="width:${width}%">
                <span>${this.limits[i][0]}°</span>
                <span>${this.limits[i][1]}°</span>
              </div>
            </div>
          `;
        })
        .join("");
    }

    this.syncJoints(q);
  }

  /* =====================================
     BINDINGS
     ===================================== */

  _bindJoints() {
    this.names.forEach((_, i) => {
      bind("q" + i, "input", (e) => {
        this.handlers.onJointInput?.(i, +e.target.value);
      });
    });
  }

  _bindControls() {
    CONTROL_KEYS.forEach((id) => {
      bind(id, "input", () => {
        this.handlers.onControlChange?.(id, getNumber(id, undefined));
      });
    });

    bind("method", "change", () => {
      this.handlers.onMethodChange?.(getValue("method", undefined));
    });
  }

  _bindTarget() {
    ["tx", "ty", "tz"].forEach((id) => {
      bind(id, "change", () => this.handlers.onTargetChange?.());
    });
  }

  _bindButtons() {
    bind("run", "click", () => this.handlers.onRun?.());
    bind("stop", "click", () => this.handlers.onStop?.());
    bind("current", "click", () => this.handlers.onCurrent?.());
    bind("reset", "click", () => this.handlers.onReset?.());
  }

  /* =====================================
     READ
     ===================================== */

  // Read the initial IK parameters from the DOM, using the given values as fallbacks
  readControls(fallback) {
    return {
      method: getValue("method", fallback.method),
      gain: getNumber("gain", fallback.gain),
      damping: getNumber("damping", fallback.damping),
      cart: getNumber("cart", fallback.cart),
      speed: getNumber("speed", fallback.speed),
    };
  }

  // Read the target inputs, falling back to the current position per axis
  readTarget(fallback) {
    return {
      x: getNumber("tx", fallback.x),
      y: getNumber("ty", fallback.y),
      z: getNumber("tz", fallback.z),
    };
  }

  /* =====================================
     WRITE
     ===================================== */

  syncJoint(i, value) {
    setValue("q" + i, value);
    setText("qv" + i, value.toFixed(1) + "°");
  }

  syncJoints(q) {
    q.forEach((value, i) => this.syncJoint(i, value));
  }

  syncTarget(p) {
    setValue("tx", p.x.toFixed(1));
    setValue("ty", p.y.toFixed(1));
    setValue("tz", p.z.toFixed(1));
  }

  setStatus(text) {
    setText("status", text);
  }

  setError(text) {
    setText("error", text);
  }

  setRank(text) {
    setText("rank", text);
  }
}