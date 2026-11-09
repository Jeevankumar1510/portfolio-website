import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const skillsList = [
  { name: 'Python', color: '#00f0ff' },
  { name: 'AWS Cloud', color: '#f59e0b' },
  { name: 'Machine Learning', color: '#a855f7' },
  { name: 'YOLOv8', color: '#ec4899' },
  { name: 'Pytest', color: '#10b981' },
  { name: 'FastAPI', color: '#06b6d4' },
  { name: 'Docker', color: '#38bdf8' },
  { name: 'SQL', color: '#6366f1' },
  { name: 'OpenCV', color: '#f43f5e' },
  { name: 'CI/CD Actions', color: '#22c55e' },
  { name: 'Azure AI', color: '#0284c7' },
  { name: 'React.js', color: '#38bdf8' }
];

const SkillSphereCanvas = () => {
  const mountRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState('Python');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(50, width / Math.max(height, 1), 0.1, 100);
    camera.position.z = 5.2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL not supported in SkillSphereCanvas:", err);
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Inner wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const innerWireSphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(innerWireSphere);

    // Nodes positioned on a sphere using Fibonacci sphere distribution
    const nodes = [];
    const radius = 2.0;
    const total = skillsList.length;

    skillsList.forEach((skill, index) => {
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Node Mesh
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(skill.color),
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { skill: skill.name };
      group.add(nodeMesh);

      // Node glow ring
      const ringGeo = new THREE.RingGeometry(0.15, 0.22, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(x, y, z);
      ringMesh.lookAt(0, 0, 0);
      group.add(ringMesh);

      nodes.push({ mesh: nodeMesh, ring: ringMesh, name: skill.name, color: skill.color });
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // Pointer Drag & Move
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotVelX = 0.003;
    let rotVelY = 0.004;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        group.rotation.y += dx * 0.008;
        group.rotation.x += dy * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!prefersReducedMotion && !isDragging) {
        group.rotation.y += rotVelY;
        group.rotation.x += rotVelX;
      }

      // Check which node is closest to camera z
      let closestNode = null;
      let maxZ = -999;
      const worldPos = new THREE.Vector3();

      nodes.forEach((n) => {
        n.mesh.getWorldPosition(worldPos);
        if (worldPos.z > maxZ) {
          maxZ = worldPos.z;
          closestNode = n;
        }
      });

      if (closestNode && closestNode.name !== activeSkill) {
        setActiveSkill(closestNode.name);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [activeSkill]);

  return (
    <div className="relative w-full h-[360px] md:h-[420px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 rounded-full text-xs font-mono border border-cyan-500/30 text-cyan-300 pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        Focus: <span className="text-white font-bold tracking-wide">{activeSkill}</span>
      </div>
    </div>
  );
};

export default SkillSphereCanvas;

