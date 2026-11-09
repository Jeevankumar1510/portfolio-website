import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlowingSpiralPathway3D = ({
  isPaused = false,
  rotationY = 0
}) => {
  const mountRef = useRef(null);
  const isPausedRef = useRef(isPaused);
  const rotationYRef = useRef(rotationY);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    rotationYRef.current = rotationY;
  }, [rotationY]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 48);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Neon Lighting
    const ambientLight = new THREE.AmbientLight(0x060d1f, 2.0);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 4.0, 60);
    cyanPoint.position.set(0, 5, 10);
    scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0xa855f7, 3.0, 50);
    purplePoint.position.set(0, -8, -10);
    scene.add(purplePoint);

    const blueDir = new THREE.DirectionalLight(0x3b82f6, 2.0);
    blueDir.position.set(15, 25, 20);
    scene.add(blueDir);

    // 3. Central Glowing 3D Spiral Pathway
    const spiralGroup = new THREE.Group();
    scene.add(spiralGroup);

    const pointCount = 380;
    const turns = 3.6; // 3.6 revolutions
    const maxRadius = 17;
    const minRadius = 2.5;
    const totalHeight = 16;

    const spiralPoints = [];
    for (let i = 0; i <= pointCount; i++) {
      const t = i / pointCount;
      const angle = t * turns * Math.PI * 2;
      const r = minRadius + (maxRadius - minRadius) * Math.pow(t, 0.9);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (t - 0.5) * totalHeight; // Spans vertically from -8 to +8
      spiralPoints.push(new THREE.Vector3(x, y, z));
    }

    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);

    // Main Neon Cyan Tube
    const tubeGeo = new THREE.TubeGeometry(spiralCurve, 240, 0.38, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0088cc,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.8
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    spiralGroup.add(tubeMesh);

    // Outer Electric Purple / Blue Wireframe Tube
    const wireGeo = new THREE.TubeGeometry(spiralCurve, 160, 0.72, 6, false);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    spiralGroup.add(wireMesh);

    // 4. Seven Glowing Waypoint Beacons along the Spiral
    const beacons = [];
    const colors = [0x00f0ff, 0x3b82f6, 0xa855f7, 0x10b981, 0xf59e0b, 0xec4899, 0x06b6d4];

    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const pt = spiralCurve.getPointAt(t);

      // Core sphere
      const bGeo = new THREE.SphereGeometry(0.85, 20, 20);
      const bMat = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 1.8,
        roughness: 0.1
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.copy(pt);
      spiralGroup.add(bMesh);

      // Orbital halo ring
      const rGeo = new THREE.RingGeometry(1.2, 1.45, 24);
      const rMat = new THREE.MeshBasicMaterial({
        color: colors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.position.copy(pt);
      rMesh.rotation.x = Math.PI / 2;
      spiralGroup.add(rMesh);

      beacons.push({ bMesh, rMesh });
    }

    // 5. Travelling Energetic Light Pulse
    const pulseLight = new THREE.PointLight(0x00f0ff, 4.0, 16);
    const pulseGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.add(pulseLight);
    spiralGroup.add(pulseMesh);

    // 6. Subtle Floating Cyber Dust Particles
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00f0ff);
    const c2 = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 20;
      const y = (Math.random() - 0.5) * 22;

      particlePositions[i * 3] = Math.cos(theta) * r;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(theta) * r;

      const c = Math.random() > 0.5 ? c1 : c2;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    spiralGroup.add(particles);

    // 7. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Traveling pulse along spiral
      const pulseT = (elapsed * 0.16) % 1;
      const pulsePos = spiralCurve.getPointAt(pulseT);
      pulseMesh.position.copy(pulsePos);

      // Rotate beacon rings
      beacons.forEach((b, idx) => {
        b.rMesh.rotation.z = elapsed * (1.2 + idx * 0.15);
      });

      // Synchronize 3D spiral rotation with the carousel rotation
      const rad = (rotationYRef.current * Math.PI) / 180;
      spiralGroup.rotation.y = rad;

      // Slight vertical wobble for floating depth
      spiralGroup.position.y = Math.sin(elapsed * 0.8) * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center"
      style={{ opacity: 0.9 }}
    />
  );
};

export default GlowingSpiralPathway3D;

