# 5 DOF Arm Studio

```bash
python3 -m http.server 8000
```

```mermaid
flowchart TD
    A[robot.config.js] --> B[robot.js]
    C[math.js] --> D[ik.solver.js]
    C ---> B
    B --> D
    B --> E[robot.visual.js]
    F[three.utils.js] --> E
    F --> G[target.marker.js]
    B --> H[manipulability.js]
    C --> H
    E --> I[sim.js]
    G --> I
    D --> I
    H --> I
    J[ui.js] --> I
    B --> I
```

```md
src/
├── sim.html
├── sim.css
├── sim.js
├── three.utils.js
├── target.marker.js
├── robot.config.js
├── robot.js
├── robot.visual.js
├── ik.solver.js
├── ellipsoid.visual.js
└── math.js
```
