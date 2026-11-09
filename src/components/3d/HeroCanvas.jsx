import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const width = container.clientWidth || 550;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(
      45,
      width / Math.max(height, 1),
      0.1,
      1000
    );
    camera.position.z = 6.2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL not supported in HeroCanvas:", err);
      return;
    }

    // MASTER ROTATING GROUP
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. MAIN DEVELOPER SPHERE
    // Inner glowing sphere
    const sphereRadius = 1.6;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x051329,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });
    const mainSphere = new THREE.Mesh(sphereGeo, sphereMat);
    masterGroup.add(mainSphere);

    // 2. HOLOGRAPHIC NEURAL MATRIX (Points on sphere surface)
    const pointCount = 650;
    const pointGeo = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    const colorCyan = new THREE.Color(0x00f0ff);
    const colorPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      const r = sphereRadius + 0.04;

      pointPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pointPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pointPositions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = colorCyan.clone().lerp(colorPurple, Math.random());
      pointColors[i * 3] = mixed.r;
      pointColors[i * 3 + 1] = mixed.g;
      pointColors[i * 3 + 2] = mixed.b;
    }

    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });
    const neuralPoints = new THREE.Points(pointGeo, pointMat);
    masterGroup.add(neuralPoints);

    // 3. ELEGANT GEODESIC WIREFRAME SHELL
    const wireGeo = new THREE.IcosahedronGeometry(sphereRadius + 0.12, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.16
    });
    const wireShell = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireShell);

    // 4. CLEAN ORBITING GYROSCOPE RINGS
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.015, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.6
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    masterGroup.add(ring2);

    // 5. ORBITING TECH BEACONS
    const beacons = [];
    const beaconCount = 5;
    const techColors = [0x00f0ff, 0xa855f7, 0x38bdf8, 0x10b981, 0xf59e0b];

    for (let i = 0; i < beaconCount; i++) {
      const bGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const bMat = new THREE.MeshBasicMaterial({ color: techColors[i] });
      const bMesh = new THREE.Mesh(bGeo, bMat);

      // Glow halo ring around beacon
      const haloGeo = new THREE.RingGeometry(0.12, 0.16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: techColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      bMesh.add(halo);

      masterGroup.add(bMesh);

      beacons.push({
        mesh: bMesh,
        halo,
        orbitRadius: 2.3 + (i % 2) * 0.3,
        speed: 0.012 + i * 0.004,
        angle: (i * Math.PI * 2) / beaconCount,
        plane: i % 2
      });
    }

    // 6. LIGHTING
    const coreLight = new THREE.PointLight(0x00f0ff, 3, 10);
    coreLight.position.set(0, 0, 0);
    masterGroup.add(coreLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.8);
    dirLight2.position.set(-5, -5, -3);
    scene.add(dirLight2);

    // MOUSE PARALLAX & 360° DRAG
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevPointer.x;
        const dy = e.clientY - prevPointer.y;
        targetRotationY += dx * 0.008;
        targetRotationX += dy * 0.008;
        prevPointer = { x: e.clientX, y: e.clientY };
      } else {
        mouseX = x * 0.4;
        mouseY = y * 0.4;
      }
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // RESIZE
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 550;
      const h = container.clientHeight || 500;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth continuous rotation
        mainSphere.rotation.y += 0.004;
        neuralPoints.rotation.y += 0.005;
        wireShell.rotation.y -= 0.003;
        wireShell.rotation.x += 0.002;

        ring1.rotation.z += 0.007;
        ring2.rotation.z -= 0.006;

        // Beacons orbit
        beacons.forEach((b) => {
          b.angle += b.speed;
          if (b.plane === 0) {
            b.mesh.position.x = Math.cos(b.angle) * b.orbitRadius;
            b.mesh.position.y = Math.sin(b.angle) * b.orbitRadius * 0.5;
            b.mesh.position.z = Math.sin(b.angle) * b.orbitRadius * 0.8;
          } else {
            b.mesh.position.x = Math.sin(b.angle) * b.orbitRadius * 0.7;
            b.mesh.position.y = Math.cos(b.angle) * b.orbitRadius;
            b.mesh.position.z = Math.sin(b.angle) * b.orbitRadius * 0.7;
          }
          b.halo.rotation.z += 0.04;
        });

        // Pulsing core light
        coreLight.intensity = 2.5 + Math.sin(elapsed * 3) * 0.8;
      }

      // Smooth damping
      if (!isDragging) {
        targetRotationY += (mouseX - masterGroup.rotation.y) * 0.04;
        targetRotationX += (mouseY - masterGroup.rotation.x) * 0.04;
      }

      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.08;
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.08;

      try {
        renderer.render(scene, camera);
      } catch (e) {}
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      try {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      } catch (e) {}
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full min-h-[420px] md:min-h-[550px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'pan-y' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={containerRef} className="w-full h-full absolute inset-0" />
      
      {/* 3D Interaction Badge */}
      <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider glass-panel text-cyan-300 border border-cyan-500/30 transition-all duration-300 pointer-events-none flex items-center gap-2 ${
        isHovered ? 'opacity-100 translate-y-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'opacity-75 translate-y-1'
      }`}>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
        <span>{isInteracting ? '360° Dragging Active' : '3D Developer Neural Sphere • Drag to Rotate 360°'}</span>
      </div>
    </div>
  );
};

export default HeroCanvas;
