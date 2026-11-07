// sim.config.js
export const SIM_CONFIG = {
  // Master switches
  enableTargetMarker: true,
  enableTrail: true,

  // Timing
  dt: 1 / 60,

  // Colors
  accentColor: 0xff7700,
  inkColor: 0x0f172a,
  reachedColor: 0x10b981,

  // Reach tolerance (cm)
  reachTolerance: 0.5,

  // Initial IK parameters
  control: {
    method: "dls",
    gain: 2,
    damping: 1,
    cart: 35,
    speed: 90,
  },
};