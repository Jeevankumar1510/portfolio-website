import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playCyberBeep, playClickSound } from '../../utils/soundEffects';

export const SKILL_SPHERE_CLUSTERS = [
  {
    id: 'data',
    alias: 'data-science',
    name: 'Data Science',
    symbol: '📊',
    label3D: '📊 DATA SCIENCE',
    subtitle: 'NumPy, Pandas & Predictive Analytics',
    color: '#06b6d4',
    accentColor: 0x06b6d4,
    description: 'Data wrangling, matrix vectorization, exploratory analysis, and statistical modeling.',
    skills: [
      { id: 'numpy', name: 'NumPy', level: 95, role: 'Matrix Math & Vectorized Computations', phi: 0.38, theta: 0.42 },
      { id: 'pandas', name: 'Pandas', level: 96, role: 'High-Volume Data Manipulation & Analysis', phi: 0.48, theta: 0.88 },
      { id: 'seaborn', name: 'Matplotlib & Seaborn', level: 89, role: 'Statistical Visualizations & Heatmaps', phi: 0.22, theta: 0.65 },
      { id: 'sklearn', name: 'Scikit-learn', level: 92, role: 'Predictive Feature Pipelines & Modeling', phi: 0.58, theta: 0.62 }
    ]
  },
  {
    id: 'cloud',
    alias: 'cloud-tech',
    name: 'Cloud Technologies',
    symbol: '☁️',
    label3D: '☁️ CLOUD TECH',
    subtitle: 'AWS (EC2, S3, Lambda, IAM) & Azure AI',
    color: '#f59e0b',
    accentColor: 0xf59e0b,
    description: 'AWS serverless orchestration, Azure Cognitive Services, automated CI/CD and containerization.',
    skills: [
      { id: 'aws', name: 'AWS (EC2, S3, Lambda, IAM)', level: 92, role: 'Boto3 Cloud Automation (Certified CCP)', phi: -0.35, theta: 1.82 },
      { id: 'azure', name: 'Microsoft Azure', level: 88, role: 'Azure AI & Cognitive Services (AI-900)', phi: -0.46, theta: 2.32 },
      { id: 'cicd', name: 'CI/CD GitHub Actions', level: 90, role: 'Automated Regression Suites & DevOps', phi: -0.22, theta: 2.06 },
      { id: 'docker', name: 'Docker & Linux', level: 84, role: 'Container Orchestration & Shell Scripts', phi: -0.56, theta: 1.92 }
    ]
  },
  {
    id: 'genai',
    alias: 'genai-llms',
    name: 'AI & Generative AI',
    symbol: '⚡',
    label3D: '⚡ GEN AI & LLMS',
    subtitle: 'LLMs, Agentic AI, Prompt Engineering & RAG',
    color: '#00f0ff',
    accentColor: 0x00f0ff,
    description: 'Autonomous multi-agent systems, prompt strategies, semantic search, and vector embeddings.',
    skills: [
      { id: 'llms', name: 'LLMs & Prompt Engineering', level: 92, role: 'Prompt Strategies, System Prompts & Guardrails', phi: 0.48, theta: 3.12 },
      { id: 'agentic', name: 'Agentic AI & Tool-Calling', level: 90, role: 'Autonomous Multi-Agent Loops & Reasoning', phi: 0.34, theta: 3.58 },
      { id: 'rag', name: 'RAG & Vector Embeddings', level: 94, role: 'Semantic Search, Chunking & ChromaDB', phi: 0.60, theta: 3.36 },
      { id: 'nlp', name: 'NLP & Document Extraction', level: 88, role: 'Structured Entity Extraction & Spacy', phi: 0.22, theta: 3.32 }
    ]
  },
  {
    id: 'mldl',
    alias: 'machine-learning',
    name: 'Machine Learning & DL',
    symbol: '🧠',
    label3D: '🧠 ML & DL',
    subtitle: 'PyTorch, TensorFlow, YOLOv8 & OpenCV',
    color: '#ec4899',
    accentColor: 0xec4899,
    description: 'Computer vision, real-time tracking, deep neural networks, and predictive classifiers.',
    skills: [
      { id: 'pytorch', name: 'PyTorch & TensorFlow', level: 90, role: 'Deep Neural Networks, CNNs & Optimization', phi: -0.38, theta: 4.46 },
      { id: 'yolo', name: 'YOLOv8 & OpenCV', level: 94, role: 'Real-Time Object Detection & Tracking', phi: -0.54, theta: 4.82 },
      { id: 'mlalgo', name: 'Supervised & Unsupervised ML', level: 92, role: 'Classifiers, Regression & Cross-Validation', phi: -0.26, theta: 4.72 },
      { id: 'eda', name: 'Feature Engineering & EDA', level: 90, role: 'Hyperparameter Tuning & ROC-AUC Metrics', phi: -0.44, theta: 5.02 }
    ]
  },
  {
    id: 'backend',
    alias: 'backend-apis',
    name: 'Backend & Web APIs',
    symbol: '⚙️',
    label3D: '⚙️ BACKEND & APIS',
    subtitle: 'FastAPI, Django & Python Automation',
    color: '#10b981',
    accentColor: 0x10b981,
    description: 'High-performance async APIs, full-stack MVC, automated test suites (100% pass rate).',
    skills: [
      { id: 'fastapi', name: 'FastAPI', level: 95, role: 'Asynchronous Endpoints & Pydantic Validation', phi: 0.18, theta: 5.66 },
      { id: 'django', name: 'Django', level: 90, role: 'Production Full-Stack & Relational ORM', phi: -0.16, theta: 5.86 },
      { id: 'python', name: 'Python Core & Pytest', level: 97, role: 'Automated Test Frameworks (100% Pass Rate)', phi: 0.02, theta: 5.46 },
      { id: 'streamlit', name: 'Streamlit & React.js', level: 88, role: 'Interactive AI Dashboards & Modern UIs', phi: 0.32, theta: 5.82 }
    ]
  }
];

// Helper to create crisp, high-res 3D billboard text sprites
function createClusterSprite(label, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 120);

  // Background rounded pill
  ctx.fillStyle = 'rgba(2, 6, 23, 0.88)';
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(8, 8, 496, 104, 22);
  } else {
    ctx.rect(8, 8, 496, 104);
  }
  ctx.fill();
  ctx.stroke();

  // Subtle inner accent line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(14, 14, 484, 92, 18);
  }
  ctx.stroke();

  // Text
  ctx.font = 'bold 34px "JetBrains Mono", monospace, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 256, 60);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.3, 0.32, 1);
  return sprite;
}

const InteractiveSkillsSphere = ({ selectedClusterId, onSelectCluster, onSelectSkill }) => {
  const mountRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [screenPos, setScreenPos] = useState({ x: -100, y: -100, visible: false });

  // References for continuous animation and rotation
  const targetRotationRef = useRef({ x: 0.2, y: 0 });
  const activeClusterIdRef = useRef(selectedClusterId || 'data');
  const allNodesRef = useRef([]);

  // Sync ref when prop changes
  useEffect(() => {
    activeClusterIdRef.current = selectedClusterId || 'data';
  }, [selectedClusterId]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Pause rendering when off-screen to save 100% GPU
    let isVisibleOnScreen = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleOnScreen = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    const width = mount.clientWidth || 750;
    const height = mount.clientHeight || 520;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / Math.max(height, 1), 0.1, 100);
    camera.position.z = 6.4;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mount.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL not supported:", err);
      return;
    }

    // MASTER ROTATING GROUP
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. CENTRAL GLOWING CYBER SPHERE
    const coreRadius = 1.6;
    const sphereGeo = new THREE.SphereGeometry(coreRadius, 36, 36);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x051329,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.28,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.8
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    masterGroup.add(coreSphere);

    // Geodesic Wireframe Shell
    const wireGeo = new THREE.IcosahedronGeometry(coreRadius + 0.08, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const wireShell = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireShell);

    // Coordinate Latitude & Longitude Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28
    });
    const eqRingGeo = new THREE.RingGeometry(coreRadius + 0.15, coreRadius + 0.18, 64);
    const eqRing = new THREE.Mesh(eqRingGeo, ringMat);
    eqRing.rotation.x = Math.PI / 2;
    masterGroup.add(eqRing);

    const polarRingGeo = new THREE.RingGeometry(coreRadius + 0.2, coreRadius + 0.22, 64);
    const polarRing = new THREE.Mesh(polarRingGeo, ringMat);
    polarRing.rotation.y = Math.PI / 2;
    masterGroup.add(polarRing);

    // 2. SKILL NODES, LASER FILAMENTS & CLUSTER BILLBOARDS
    const interactiveMeshes = [];
    const allSkillNodes = [];

    SKILL_SPHERE_CLUSTERS.forEach((cluster) => {
      const clusterColor = new THREE.Color(cluster.color);
      const clusterPoints = [];

      cluster.skills.forEach((skill) => {
        // Spherical coordinates to Cartesian
        const r = coreRadius + 0.45;
        const x = r * Math.cos(skill.phi) * Math.sin(skill.theta);
        const y = r * Math.sin(skill.phi);
        const z = r * Math.cos(skill.phi) * Math.cos(skill.theta);

        // Node Mesh
        const nodeGeo = new THREE.SphereGeometry(0.125, 18, 18);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: clusterColor,
          emissive: clusterColor,
          emissiveIntensity: 0.85,
          roughness: 0.2,
          metalness: 0.85
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.set(x, y, z);

        // Halo Ring around node
        const haloGeo = new THREE.RingGeometry(0.16, 0.22, 18);
        const haloMat = new THREE.MeshBasicMaterial({
          color: clusterColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.set(x, y, z);
        halo.lookAt(0, 0, 0);
        masterGroup.add(halo);

        nodeMesh.userData = {
          skill,
          cluster,
          halo,
          basePos: new THREE.Vector3(x, y, z),
          color: cluster.color
        };

        masterGroup.add(nodeMesh);
        interactiveMeshes.push(nodeMesh);
        allSkillNodes.push(nodeMesh);
        clusterPoints.push(new THREE.Vector3(x, y, z));
      });

      // Connect skills within same cluster with glowing laser lines
      // (e.g. NumPy <-> Pandas, AWS <-> Azure)
      for (let i = 0; i < clusterPoints.length - 1; i++) {
        for (let j = i + 1; j < clusterPoints.length; j++) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            clusterPoints[i],
            clusterPoints[j]
          ]);
          const lineMat = new THREE.LineBasicMaterial({
            color: clusterColor,
            transparent: true,
            opacity: 0.45
          });
          const line = new THREE.Line(lineGeo, lineMat);
          masterGroup.add(line);
        }
      }

      // Compute cluster centroid for floating billboard sprite
      const center = new THREE.Vector3();
      clusterPoints.forEach((pt) => center.add(pt));
      center.divideScalar(clusterPoints.length);

      // Offset outward
      const spritePos = center.clone().normalize().multiplyScalar(coreRadius + 0.85);
      const billboard = createClusterSprite(cluster.label3D, cluster.color);
      billboard.position.copy(spritePos);
      billboard.userData = { cluster };
      masterGroup.add(billboard);
      interactiveMeshes.push(billboard);
    });

    allNodesRef.current = allSkillNodes;

    // 3. ORBITING DATA DUST
    const dustCount = 120;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 2.1 + Math.random() * 1.4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      dustPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      dustPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      dustPos[i * 3 + 2] = r * Math.cos(ph);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    masterGroup.add(dust);

    // 4. LIGHTING
    const pointLight = new THREE.PointLight(0x00f0ff, 2.8, 14);
    pointLight.position.set(0, 0, 0);
    masterGroup.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.5);
    dirLight2.position.set(-5, -5, -3);
    scene.add(dirLight2);

    // 5. INTERACTION & RAYCASTING
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let currentHoveredMesh = null;

    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevPointer.x;
        const dy = e.clientY - prevPointer.y;
        targetRotationRef.current.y += dx * 0.007;
        targetRotationRef.current.x += dy * 0.005;
        prevPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const handleObjectClick = (hitMesh) => {
      if (!hitMesh || !hitMesh.userData) return;
      playClickSound();

      if (hitMesh.userData.skill) {
        const { skill, cluster } = hitMesh.userData;
        if (onSelectCluster) onSelectCluster(cluster.id);
        if (onSelectSkill) onSelectSkill(skill);
      } else if (hitMesh.userData.cluster) {
        const { cluster } = hitMesh.userData;
        if (onSelectCluster) onSelectCluster(cluster.id);
        if (onSelectSkill && cluster.skills.length > 0) onSelectSkill(cluster.skills[0]);
      }
    };

    const onPointerDown = (e) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };

      const rect = mount.getBoundingClientRect();
      const clickVec = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );
      raycaster.setFromCamera(clickVec, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        handleObjectClick(intersects[0].object);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // RESIZE
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 750;
      const h = mount.clientHeight || 520;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // 6. ANIMATION LOOP (Only runs when visible!)
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Performance Optimization: If user scrolled away, skip rendering!
      if (!isVisibleOnScreen) return;

      const elapsed = clock.getElapsedTime();

      // Slow organic rotation when not dragging
      if (!isDragging) {
        targetRotationRef.current.y += 0.0025;
      }

      // Smooth damping interpolation
      masterGroup.rotation.y += (targetRotationRef.current.y - masterGroup.rotation.y) * 0.08;
      masterGroup.rotation.x += (targetRotationRef.current.x - masterGroup.rotation.x) * 0.08;

      coreSphere.rotation.y += 0.002;
      wireShell.rotation.y -= 0.003;
      eqRing.rotation.z += 0.004;
      polarRing.rotation.z -= 0.003;
      dust.rotation.y += 0.001;

      // Raycasting hover check (nodes only for precise HUD)
      raycaster.setFromCamera(mouse, camera);
      const nodeIntersects = raycaster.intersectObjects(allSkillNodes);

      if (nodeIntersects.length > 0) {
        const hit = nodeIntersects[0].object;
        if (currentHoveredMesh !== hit) {
          currentHoveredMesh = hit;
          setHoveredSkill({
            ...hit.userData.skill,
            cluster: hit.userData.cluster
          });
          playCyberBeep(850, 0.03);
        }
      } else {
        if (currentHoveredMesh !== null) {
          currentHoveredMesh = null;
          setHoveredSkill(null);
        }
      }

      // Animate node scales & halos
      const activeId = activeClusterIdRef.current;
      allSkillNodes.forEach((node) => {
        const isHovered = currentHoveredMesh === node;
        const isClusterActive = activeId && (node.userData.cluster.id === activeId || node.userData.cluster.alias === activeId);
        const targetScale = isHovered ? 1.55 : isClusterActive ? 1.35 : 0.95;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        if (node.userData.halo) {
          node.userData.halo.rotation.z += 0.03;
          node.userData.halo.material.opacity = isHovered ? 0.95 : isClusterActive ? 0.75 : 0.28;
        }

        if (isHovered) {
          const worldPos = new THREE.Vector3();
          node.getWorldPosition(worldPos);
          worldPos.project(camera);

          const halfW = mount.clientWidth / 2;
          const halfH = mount.clientHeight / 2;
          const sx = worldPos.x * halfW + halfW;
          const sy = -(worldPos.y * halfH) + halfH;
          setScreenPos({ x: sx, y: sy, visible: true });
        }
      });

      if (!currentHoveredMesh) {
        setScreenPos((prev) => ({ ...prev, visible: false }));
      }

      try {
        renderer.render(scene, camera);
      } catch (e) {}
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      try {
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      } catch (e) {}
    };
  }, []); // Run once! Do not re-create WebGL on every click!

  // Smoothly rotate sphere to face selected cluster
  useEffect(() => {
    if (!selectedClusterId) return;
    const cluster = SKILL_SPHERE_CLUSTERS.find(
      (c) => c.id === selectedClusterId || c.alias === selectedClusterId
    );
    if (cluster && cluster.skills.length > 0) {
      // Find average theta of cluster to bring directly in front of camera
      const avgTheta = cluster.skills.reduce((acc, s) => acc + s.theta, 0) / cluster.skills.length;
      targetRotationRef.current.y = -avgTheta + Math.PI / 2;
      targetRotationRef.current.x = 0.18;
    }
  }, [selectedClusterId]);

  return (
    <div
      className="relative w-full h-[460px] sm:h-[530px] md:h-[600px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Three.js Canvas */}
      <div ref={mountRef} className="w-full h-full absolute inset-0" />

      {/* Floating Controls HUD Top */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono glass-panel border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span>Interactive 3D Skill Sphere • Drag 360° • Click Any Node</span>
        </div>
      </div>

      {/* Real-time Dynamic 2D HUD following hovered node */}
      {hoveredSkill && screenPos.visible && (
        <div
          className="absolute z-30 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${screenPos.x}px, ${screenPos.y - 70}px, 0) translate(-50%, -100%)`
          }}
        >
          <div className="glass-panel-glow px-4 py-2.5 rounded-2xl border border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.45)] text-center min-w-[220px]">
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-white mb-0.5">
              <span>{hoveredSkill.cluster?.symbol}</span>
              <span className="text-cyan-300 text-sm font-bold">{hoveredSkill.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {hoveredSkill.level}%
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-300">
              {hoveredSkill.role}
            </div>
            <div className="mt-1 text-[9px] font-mono text-cyan-400/90 font-semibold">
              // Click node to focus architecture details
            </div>
          </div>
        </div>
      )}

      {/* Bottom Center Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-[11px] font-mono text-slate-300 pointer-events-none hidden sm:flex items-center gap-3 shadow-lg">
        <span className="flex items-center gap-1.5 text-cyan-300">
          <span>📊 Data Science (NumPy, Pandas)</span>
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-amber-400">☁️ Cloud (AWS, Azure)</span>
        <span className="text-slate-600">|</span>
        <span className="text-pink-400">🧠 ML/DL</span>
        <span className="text-slate-600">|</span>
        <span className="text-emerald-400">⚙️ Backend</span>
      </div>
    </div>
  );
};

export default InteractiveSkillsSphere;
