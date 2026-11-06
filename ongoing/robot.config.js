export const ROBOT_CONFIG = {
  unitScale: 0.004,

  dimensions: {
    H: 25,
    L1: 25,
    L2: 50,
    L3: 50,
    L4: 25,
    L5: 25,
  },

  joints: [
    {
      name: "Base Yaw",
      type: "revolute",
      axis: "z",
      limit: [-180, 180],
    },
    {
      name: "Shoulder Pitch",
      type: "revolute",
      axis: "y",
      limit: [-180, 180],
    },
    {
      name: "Elbow Pitch",
      type: "revolute",
      axis: "y",
      limit: [-180, 180],
    },
    {
      name: "Neck Pitch",
      type: "revolute",
      axis: "y",
      limit: [-180, 180],
    },
    {
      name: "Head Yaw",
      type: "revolute",
      axis: "z",
      limit: [-180, 180],
    },
  ],

  initialPosition: [0, 90, 0, 0, 0],
};