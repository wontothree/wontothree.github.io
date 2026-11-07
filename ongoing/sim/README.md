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
├── sim.html
├── sim.css
├── sim.js                    # archestration
├── sim.config.js                    
│
├── core/
│   ├── math.js               # 
│   ├── robot.config.js
│   ├── robot.js              # kinematics
│   └── ik.solver.js
│
└── view/
    ├── three.utils.js
    ├── robot.visual.js       
    ├── ellipsoid.visual.js
    ├── target.marker.js      # 
    ├── scene.stage.js   
    ├── kin.table.js
    ├── dom.utils.js
    └── ui.panel.js
```
