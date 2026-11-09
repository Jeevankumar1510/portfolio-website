import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playCyberBeep, playClickSound } from '../../utils/soundEffects';

export const SOLAR_SKILLS = [
  {
    id: 'genai',
    name: 'Gen AI',
    symbol: '⚡',
    category: 'Generative AI',
    orbitRadius: 1.5,
    orbitSpeed: 0.018,
    size: 0.22,
    color: '#00f0ff',
    level: 92,
    type: 'Plasma World',
    desc: 'Prompt Engineering, RAG Architectures & LLM Fine-Tuning'
  },
  {
    id: 'llms',
    name: 'LLMs',
    symbol: '🤖',
    category: 'Generative AI',
    orbitRadius: 2.0,
    orbitSpeed: -0.015,
    size: 0.24,
    color: '#38bdf8',
    level: 90,
    type: 'Neural Atmosphere',
    desc: 'OpenAI, Llama, Claude, Vector Embeddings & Quantization'
  },
  {
    id: 'agentic',
    name: 'Agentic AI',
    symbol: '🛰️',
    category: 'Generative AI',
    orbitRadius: 2.5,
    orbitSpeed: 0.013,
    size: 0.26,
    color: '#c084fc',
    level: 88,
    hasMoon: true,
    type: 'Autonomous Core',
    desc: 'Autonomous Agentic Loops, Tool-Calling & Memory Persistence'
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    symbol: '🧠',
    category: 'AI & ML',
    orbitRadius: 3.0,
    orbitSpeed: -0.011,
    size: 0.25,
    color: '#ec4899',
    level: 92,
    type: 'Predictive Sphere',
    desc: 'Supervised/Unsupervised Algorithms, Scikit-learn & EDA'
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    symbol: '🔮',
    category: 'AI & ML',
    orbitRadius: 3.5,
    orbitSpeed: 0.009,
    size: 0.34,
    color: '#8b5cf6',
    level: 88,
    hasMoons: 2,
    type: 'Gas Giant (Jupiter)',
    desc: 'PyTorch, TensorFlow, CNNs, Transformers & Loss Optimization'
  },
  {
    id: 'django',
    name: 'Django',
    symbol: '🐍',
    category: 'Backend & APIs',
    orbitRadius: 4.0,
    orbitSpeed: -0.008,
    size: 0.28,
    color: '#10b981',
    level: 88,
    hasRings: true,
    ringColor: '#34d399',
    type: 'Ringed Planet (Saturn)',
    desc: 'Robust Full-Stack MVC Architecture, ORM & Enterprise APIs'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    symbol: '⚡',
    category: 'Backend & APIs',
    orbitRadius: 4.5,
    orbitSpeed: 0.011,
    size: 0.26,
    color: '#06b6d4',
    level: 94,
    hasVerticalRings: true,
    ringColor: '#22d3ee',
    type: 'Ice Giant (Uranus)',
    desc: 'Ultra-Fast Asynchronous Python Endpoints & OpenAPI Schema'
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    symbol: '☁️',
    category: 'Cloud & Infrastructure',
    orbitRadius: 5.0,
    orbitSpeed: -0.007,
    size: 0.32,
    color: '#f59e0b',
    level: 90,
    hasRings: true,
    ringColor: '#fbbf24',
    type: 'Cloud Giant',
    desc: 'EC2, S3, Lambda, IAM, CloudWatch & Boto3 Automation'
  },
  {
    id: 'azure',
    name: 'Azure AI',
    symbol: '🔷',
    category: 'Cloud & Infrastructure',
    orbitRadius: 5.5,
    orbitSpeed: 0.006,
    size: 0.27,
    color: '#0284c7',
    level: 85,
    type: 'Azure Ice Core',
    desc: 'Azure Cognitive Services, Azure ML Workspace & AI-900'
  },
  {
    id: 'python',
    name: 'Python',
    symbol: '🐍',
    category: 'Backend & APIs',
    orbitRadius: 1.1,
    orbitSpeed: 0.024,
    size: 0.20,
    color: '#facc15',
    level: 96,
    type: 'Inner Golden Core',
    desc: 'Core OOP, AsyncIO, Pytest Frameworks & High-Speed Scripting'
  },
  {
    id: 'cv',
    name: 'YOLOv8 & Vision',
    symbol: '👁️',
    category: 'AI & ML',
    orbitRadius: 6.0,
    orbitSpeed: -0.005,
    size: 0.25,
    color: '#fb7185',
    level: 90,
    type: 'Vision Outpost',
    desc: 'Real-Time Multi-Object Tracking, DeepSORT & Heatmaps'
  },
  {
    id: 'cicd',
    name: 'CI/CD & Docker',
    symbol: '🐳',
    category: 'Cloud & Infrastructure',
    orbitRadius: 6.5,
    orbitSpeed: 0.005,
    size: 0.24,
    color: '#3b82f6',
    level: 86,
    type: 'Orbital Container',
    desc: 'GitHub Actions Automated Regression Pipelines & Containers'
  }
];

// Helper to generate dynamic canvas texture for skill labels
const createLabelTexture = (text, symbol, color) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');

  // Background Glass Pill
  ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;

  const r = 24;
  const x = 10;
  const y = 10;
  const w = 492;
  const h = 120;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Glow shadow
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.stroke();

  // Text
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 46px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${symbol} ${text}`, 256, 70);

  return new THREE.CanvasTexture(canvas);
};

const EvolvingSkillsCanvas = ({ onSelectSkill, selectedSkillId }) => {
  const mountRef = useRef(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [activePlanet, setActivePlanet] = useState(SOLAR_SKILLS[0]);
  const [screenPos, setScreenPos] = useState({ x: -100, y: -100, visible: false });
  const [isOrbiting, setIsOrbiting] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const width = mount.clientWidth || 850;
    const height = mount.clientHeight || 580;

    // Top-down angled perspective that keeps all orbits circular and visible!
    const camera = new THREE.PerspectiveCamera(
      42,
      width / Math.max(height, 1),
      0.1,
      1000
    );
    camera.position.set(0, 11.5, 6.5);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL renderer creation failed:", err);
      return;
    }

    // Solar system group (gently pitched so it's a magnificent round circular plane)
    const solarGroup = new THREE.Group();
    solarGroup.rotation.x = 0.35;
    scene.add(solarGroup);

    // 1. CENTRAL AI NEURAL SUN CORE
    const sunGroup = new THREE.Group();
    solarGroup.add(sunGroup);

    const sunGeo = new THREE.SphereGeometry(0.68, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Corona wireframe
    const coronaGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunGroup.add(coronaMesh);

    // Outer Sun Glow
    const sunHaloGeo = new THREE.SphereGeometry(0.98, 16, 16);
    const sunHaloMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
    const sunHalo = new THREE.Mesh(sunHaloGeo, sunHaloMat);
    sunGroup.add(sunHalo);

    const sunLight = new THREE.PointLight(0x00f0ff, 4, 25);
    sunGroup.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 15, 8);
    scene.add(dirLight);

    // 2. ORBITS & PLANETS
    const planetsData = [];
    const interactiveMeshes = [];

    SOLAR_SKILLS.forEach((skill, index) => {
      // Circular Orbit Ring
      const orbitGeo = new THREE.RingGeometry(skill.orbitRadius - 0.012, skill.orbitRadius + 0.012, 96);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.28
      });
      const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
      orbitRing.rotation.x = Math.PI / 2;
      solarGroup.add(orbitRing);

      // Planet container group
      const planetPivot = new THREE.Group();
      solarGroup.add(planetPivot);

      const planetGroup = new THREE.Group();
      planetPivot.add(planetGroup);

      // Planet Mesh
      const planetGeo = new THREE.SphereGeometry(skill.size, 28, 28);
      const planetMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(skill.color),
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 0.65,
        roughness: 0.3,
        metalness: 0.7
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetGroup.add(planetMesh);

      // Rings for Django / Saturn or FastAPI
      if (skill.hasRings) {
        const ringGeo = new THREE.RingGeometry(skill.size * 1.4, skill.size * 2.2, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(skill.ringColor || skill.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        });
        const planetRing = new THREE.Mesh(ringGeo, ringMat);
        planetRing.rotation.x = Math.PI / 2.5;
        planetGroup.add(planetRing);
      } else if (skill.hasVerticalRings) {
        const vRingGeo = new THREE.RingGeometry(skill.size * 1.35, skill.size * 2.0, 32);
        const vRingMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(skill.ringColor || skill.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        });
        const vRing = new THREE.Mesh(vRingGeo, vRingMat);
        vRing.rotation.y = Math.PI / 3;
        planetGroup.add(vRing);
      }

      // Moon
      if (skill.hasMoon || skill.hasMoons) {
        const moonGeo = new THREE.SphereGeometry(0.05, 12, 12);
        const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        moon.userData = { distance: skill.size * 1.8, speed: 0.05, angle: 0 };
        planetGroup.add(moon);
      }

      // 3D Skill Name Label Billboard (Child of planetGroup!)
      const labelTexture = createLabelTexture(skill.name, skill.symbol, skill.color);
      const spriteMat = new THREE.SpriteMaterial({
        map: labelTexture,
        transparent: true,
        opacity: 0, // Reveals when hovered or selected!
        depthWrite: false
      });
      const nameSprite = new THREE.Sprite(spriteMat);
      nameSprite.scale.set(1.4, 0.42, 1);
      planetGroup.add(nameSprite);

      // Orbiting halo ring
      const localHaloGeo = new THREE.RingGeometry(skill.size * 1.25, skill.size * 1.4, 32);
      const localHaloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
      });
      const localHalo = new THREE.Mesh(localHaloGeo, localHaloMat);
      localHalo.rotation.x = Math.PI / 2;
      planetGroup.add(localHalo);

      // Start angles distributed evenly along circular orbit
      const startAngle = (index * (Math.PI * 2)) / SOLAR_SKILLS.length + (index * 0.35);
      planetGroup.position.x = Math.cos(startAngle) * skill.orbitRadius;
      planetGroup.position.z = Math.sin(startAngle) * skill.orbitRadius;

      planetMesh.userData = {
        skill,
        planetGroup,
        nameSprite,
        localHalo,
        orbitRadius: skill.orbitRadius,
        orbitSpeed: skill.orbitSpeed,
        angle: startAngle,
        localOrbitAngle: 0,
        index
      };

      interactiveMeshes.push(planetMesh);
      planetsData.push(planetMesh.userData);
    });

    // 3. BACKGROUND SOLAR STARS
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 2.0 + Math.random() * 8;
      const th = Math.random() * Math.PI * 2;
      starPositions[i * 3] = r * Math.cos(th);
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      starPositions[i * 3 + 2] = r * Math.sin(th);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4
    });
    const starField = new THREE.Points(starGeo, starMat);
    solarGroup.add(starField);

    // 4. RAYCASTING & CLICK SELECTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let currentHoveredMesh = null;
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let targetRotY = 0;
    let targetRotX = 0.35;

    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevPointer.x;
        const dy = e.clientY - prevPointer.y;
        targetRotY += dx * 0.007;
        targetRotX += dy * 0.005;
        prevPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePlanetClick = (hitMesh) => {
      if (!hitMesh || !hitMesh.userData || !hitMesh.userData.skill) return;
      playClickSound();
      const clickedSkill = hitMesh.userData.skill;
      setActivePlanet(clickedSkill);
      if (onSelectSkill) onSelectSkill(clickedSkill);
    };

    const onPointerDown = (e) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };

      const rect = mount.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const clickVec = new THREE.Vector2(clickX, clickY);

      raycaster.setFromCamera(clickVec, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        handlePlanetClick(intersects[0].object);
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
      const w = mount.clientWidth || 850;
      const h = mount.clientHeight || 580;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // 5. ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate central Sun
      sunMesh.rotation.y += 0.012;
      coronaMesh.rotation.y -= 0.008;
      coronaMesh.rotation.x += 0.004;
      sunHalo.rotation.z += 0.003;
      sunMesh.material.emissiveIntensity = 1.2 + Math.sin(elapsed * 4) * 0.4;

      // Revolve planets around the Sun
      if (!prefersReducedMotion && isOrbiting) {
        planetsData.forEach((pData) => {
          pData.angle += pData.orbitSpeed;
          pData.planetGroup.position.x = Math.cos(pData.angle) * pData.orbitRadius;
          pData.planetGroup.position.z = Math.sin(pData.angle) * pData.orbitRadius;

          pData.planetGroup.children[0].rotation.y += 0.02;

          // Animate moon
          pData.planetGroup.children.forEach((child) => {
            if (child.userData && child.userData.distance) {
              child.userData.angle += child.userData.speed;
              child.position.x = Math.cos(child.userData.angle) * child.userData.distance;
              child.position.z = Math.sin(child.userData.angle) * child.userData.distance;
            }
          });
        });
      }

      // Smooth mouse drag rotation damping
      solarGroup.rotation.y += (targetRotY - solarGroup.rotation.y) * 0.08;
      solarGroup.rotation.x += (targetRotX - solarGroup.rotation.x) * 0.08;

      // RAYCASTING: Detect hover over rotating planets
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (currentHoveredMesh !== hit) {
          currentHoveredMesh = hit;
          setHoveredPlanet(hit.userData.skill);
          playCyberBeep(900, 0.04);
        }
      } else {
        if (currentHoveredMesh !== null) {
          currentHoveredMesh = null;
          setHoveredPlanet(null);
        }
      }

      // ROTATE SKILL NAME ALONG WITH PLANET WHEN CURSOR GOES OVER
      planetsData.forEach((pData) => {
        const isHovered = Boolean(currentHoveredMesh?.userData?.skill?.id === pData.skill.id);
        const isClicked = Boolean(activePlanet?.id === pData.skill.id);

        if (isHovered || isClicked) {
          // Reveal label & halo
          pData.nameSprite.material.opacity = THREE.MathUtils.lerp(pData.nameSprite.material.opacity, 1, 0.15);
          pData.localHalo.material.opacity = THREE.MathUtils.lerp(pData.localHalo.material.opacity, 0.8, 0.15);

          // SKILL NAME ROTATES ALONG WITH PLANET!
          pData.localOrbitAngle += 0.04;
          const labelOrbitRadius = pData.skill.size * 2.2;
          pData.nameSprite.position.x = Math.cos(pData.localOrbitAngle) * labelOrbitRadius;
          pData.nameSprite.position.z = Math.sin(pData.localOrbitAngle) * labelOrbitRadius;
          pData.nameSprite.position.y = pData.skill.size * 1.5 + Math.sin(pData.localOrbitAngle * 2) * 0.15;

          pData.localHalo.rotation.z += 0.04;
          pData.planetGroup.scale.lerp(new THREE.Vector3(1.35, 1.35, 1.35), 0.15);

          if (isHovered) {
            const worldPos = new THREE.Vector3();
            pData.planetGroup.getWorldPosition(worldPos);
            worldPos.project(camera);

            const halfW = mount.clientWidth / 2;
            const halfH = mount.clientHeight / 2;
            const screenX = worldPos.x * halfW + halfW;
            const screenY = -(worldPos.y * halfH) + halfH;
            setScreenPos({ x: screenX, y: screenY, visible: true });
          }
        } else {
          // HIDE WHEN NOT HOVERED/SELECTED
          pData.nameSprite.material.opacity = THREE.MathUtils.lerp(pData.nameSprite.material.opacity, 0, 0.12);
          pData.localHalo.material.opacity = THREE.MathUtils.lerp(pData.localHalo.material.opacity, 0, 0.12);
          pData.planetGroup.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.12);
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
  }, [isOrbiting, activePlanet]);

  // Sync external selectedSkillId
  useEffect(() => {
    if (selectedSkillId) {
      const match = SOLAR_SKILLS.find((s) => s.id === selectedSkillId);
      if (match) setActivePlanet(match);
    }
  }, [selectedSkillId]);

  return (
    <div className="relative w-full h-[500px] sm:h-[580px] md:h-[640px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="w-full h-full absolute inset-0" />

      {/* Floating Control HUD */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setIsOrbiting(!isOrbiting)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium glass-panel border transition-all ${
            isOrbiting
              ? 'border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'border-slate-800 text-slate-400'
          }`}
        >
          {isOrbiting ? '● Solar Revolution Active' : '⏸ Revolution Paused'}
        </button>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono glass-panel border border-cyan-500/30 text-cyan-300 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span>Click any planet to inspect skill • Hover to orbit skill name</span>
        </div>
      </div>

      {/* Quick Select Planet Bar */}
      <div className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-1.5 max-w-sm overflow-x-auto p-1 rounded-full glass-panel border border-slate-800">
        {SOLAR_SKILLS.slice(0, 6).map((planet) => (
          <button
            key={planet.id}
            onClick={() => {
              playClickSound();
              setActivePlanet(planet);
              if (onSelectSkill) onSelectSkill(planet);
            }}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
              activePlanet?.id === planet.id
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {planet.symbol} {planet.name}
          </button>
        ))}
      </div>

      {/* Real-time Dynamic 2D HUD gliding along with the revolved planet */}
      {hoveredPlanet && screenPos.visible && (
        <div
          className="absolute z-30 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${screenPos.x}px, ${screenPos.y - 70}px, 0) translate(-50%, -100%)`
          }}
        >
          <div className="glass-panel-glow px-4 py-2 rounded-2xl border border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] text-center min-w-[200px]">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-white mb-0.5">
              <span>{hoveredPlanet.symbol}</span>
              <span className="text-cyan-300 text-sm">{hoveredPlanet.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {hoveredPlanet.level}%
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              {hoveredPlanet.category}
            </div>
            <div className="mt-1 text-[9px] font-mono text-cyan-400/80 animate-pulse">
              // Click planet to open full details
            </div>
          </div>
        </div>
      )}

      {/* Bottom Center Solar Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/20 text-[11px] font-mono text-slate-400 pointer-events-none hidden sm:flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
          <span>AI Sun Core</span>
        </span>
        <span className="text-slate-600">|</span>
        <span>12 Circular Planetary Orbits</span>
        <span className="text-slate-600">|</span>
        <span>Drag to Rotate Orbit Plane</span>
      </div>
    </div>
  );
};

export default EvolvingSkillsCanvas;
