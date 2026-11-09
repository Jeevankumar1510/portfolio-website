import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ProjectTunnelCanvas3D = ({
  activeProjectIndex = 0,
  progress = 0, // 0 to 1
  isHovered = false
}) => {
  const mountRef = useRef(null);
  const activeIndexRef = useRef(activeProjectIndex);
  const progressRef = useRef(progress);
  const isHoveredRef = useRef(isHovered);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    activeIndexRef.current = activeProjectIndex;
  }, [activeProjectIndex]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040c, 0.016);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 800);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0x04091a, 2.0);
    scene.add(ambientLight);

    // Moving camera headlight
    const cameraLight = new THREE.PointLight(0x00f0ff, 4.2, 50);
    scene.add(cameraLight);

    // Deep purple secondary atmospheric light
    const purpleLight = new THREE.PointLight(0xa855f7, 3.2, 70);
    scene.add(purpleLight);

    // 3. Compact Futuristic Tunnel Dimensions
    // Reduced from 15 down to 8.2 for a tighter, high-intensity particle-accelerator conduit
    const tunnelRadius = 8.2;
    const ringCount = 32;
    const ringSpacing = 9.5;
    const totalTunnelSpan = ringCount * ringSpacing; // ~304 units

    const tunnelGroup = new THREE.Group();
    scene.add(tunnelGroup);

    // Color Palette
    const cyanColor = new THREE.Color(0x00f0ff);
    const blueColor = new THREE.Color(0x0070f3);
    const purpleColor = new THREE.Color(0xa855f7);
    const magentaColor = new THREE.Color(0xec4899);

    const ringPalette = [cyanColor, blueColor, purpleColor, cyanColor, magentaColor];

    // 4. Primary Torus Conduit Rings
    const ringMeshes = [];
    const torusGeo = new THREE.TorusGeometry(tunnelRadius, 0.16, 16, 64);

    for (let i = 0; i < ringCount; i++) {
      const color = ringPalette[i % ringPalette.length];
      const ringMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.8,
        roughness: 0.12,
        metalness: 0.88
      });

      const ringMesh = new THREE.Mesh(torusGeo, ringMat);
      ringMesh.position.set(0, 0, 10 - i * ringSpacing);
      tunnelGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    }

    // 5. Concentric Hexagonal Cyber Aperture Gates (High-tech visual interest)
    const hexGateMeshes = [];
    const hexGateCount = 10;
    const hexGateGeo = new THREE.RingGeometry(tunnelRadius + 0.35, tunnelRadius + 0.75, 6);

    for (let h = 0; h < hexGateCount; h++) {
      const isAlt = h % 2 === 0;
      const hexMat = new THREE.MeshBasicMaterial({
        color: isAlt ? 0x00f0ff : 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      });

      const hexMesh = new THREE.Mesh(hexGateGeo, hexMat);
      hexMesh.position.set(0, 0, 5 - h * (totalTunnelSpan / hexGateCount));
      hexMesh.rotation.z = (h * Math.PI) / 6;
      tunnelGroup.add(hexMesh);
      hexGateMeshes.push({ mesh: hexMesh, speed: isAlt ? 0.25 : -0.25 });
    }

    // 6. 4 Longitudinal Corner Laser Speed Rails with Travelling Pulses
    const cornerAngles = [
      Math.PI / 4,
      (3 * Math.PI) / 4,
      (5 * Math.PI) / 4,
      (7 * Math.PI) / 4
    ];
    const railLength = totalTunnelSpan * 1.4;

    cornerAngles.forEach((angle, idx) => {
      const rx = Math.cos(angle) * (tunnelRadius + 0.1);
      const ry = Math.sin(angle) * (tunnelRadius + 0.1);

      // Continuous rail line
      const railPoints = [
        new THREE.Vector3(rx, ry, 25),
        new THREE.Vector3(rx, ry, -railLength)
      ];
      const railGeo = new THREE.BufferGeometry().setFromPoints(railPoints);
      const railMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x00f0ff : 0xa855f7,
        transparent: true,
        opacity: 0.42
      });
      const railLine = new THREE.Line(railGeo, railMat);
      scene.add(railLine);
    });

    // Pulse nodes that streak along the 4 rails
    const pulseSpheres = [];
    const sphereGeo = new THREE.SphereGeometry(0.28, 12, 12);
    for (let p = 0; p < 8; p++) {
      const angle = cornerAngles[p % 4];
      const sphereMat = new THREE.MeshBasicMaterial({
        color: p % 2 === 0 ? 0x00f0ff : 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      const rx = Math.cos(angle) * (tunnelRadius + 0.1);
      const ry = Math.sin(angle) * (tunnelRadius + 0.1);
      sphere.position.set(rx, ry, -p * 35);
      scene.add(sphere);
      pulseSpheres.push({
        mesh: sphere,
        baseX: rx,
        baseY: ry,
        speed: 1.2 + (p % 3) * 0.4
      });
    }

    // 7. Travelling Warp Shockwave Rings
    const shockwaveCount = 4;
    const shockwaves = [];
    const shockwaveGeo = new THREE.RingGeometry(tunnelRadius - 0.2, tunnelRadius + 0.2, 48);

    for (let s = 0; s < shockwaveCount; s++) {
      const shockwaveMat = new THREE.MeshBasicMaterial({
        color: s % 2 === 0 ? 0x00f0ff : 0x38bdf8,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
      shockwaveMesh.position.set(0, 0, -s * 60);
      scene.add(shockwaveMesh);
      shockwaves.push({
        mesh: shockwaveMesh,
        speed: 1.6 + s * 0.2
      });
    }

    // 8. Glowing Vanishing Point Vortex Core at the Tunnel Vanishing Point
    const vortexGroup = new THREE.Group();
    vortexGroup.position.set(0, 0, -260);
    scene.add(vortexGroup);

    // Concentric glowing rings in the vortex core
    for (let v = 0; v < 3; v++) {
      const vGeo = new THREE.RingGeometry(0.8 + v * 1.2, 1.2 + v * 1.2, 32);
      const vMat = new THREE.MeshBasicMaterial({
        color: v === 0 ? 0x00f0ff : v === 1 ? 0xa855f7 : 0x0070f3,
        transparent: true,
        opacity: 0.65 - v * 0.15,
        side: THREE.DoubleSide
      });
      const vMesh = new THREE.Mesh(vGeo, vMat);
      vortexGroup.add(vMesh);
    }

    // 9. Flying Warp Particles
    const particleCount = 480;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      const angle = Math.random() * Math.PI * 2;
      // Position particles tightly along tunnel walls
      const dist = 1.8 + Math.random() * (tunnelRadius - 2.2);

      particlePositions[p * 3] = Math.cos(angle) * dist;
      particlePositions[p * 3 + 1] = Math.sin(angle) * dist;
      particlePositions[p * 3 + 2] = 20 - Math.random() * totalTunnelSpan;

      const pick = Math.random();
      const col = pick < 0.45 ? cyanColor : pick < 0.75 ? blueColor : purpleColor;
      particleColors[p * 3] = col.r;
      particleColors[p * 3 + 1] = col.g;
      particleColors[p * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse move listener for smooth 3D parallax
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: nx, y: ny };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 10. 60 FPS Render & Inward Animation Loop
    let animId;
    let clock = new THREE.Clock();
    let currentCamZ = 0;
    let currentParallax = { x: 0, y: 0 };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera Z position tracks progress through the 7 project tunnel waypoints
      const targetZ = -(progressRef.current * 6 * 28);
      currentCamZ += (targetZ - currentCamZ) * 0.085;

      // Mouse Parallax with gentle damping
      const targetPx = mouseRef.current.x * 1.5;
      const targetPy = mouseRef.current.y * 1.1;
      currentParallax.x += (targetPx - currentParallax.x) * 0.06;
      currentParallax.y += (targetPy - currentParallax.y) * 0.06;

      camera.position.set(currentParallax.x, currentParallax.y, currentCamZ);
      camera.lookAt(currentParallax.x * 0.5, currentParallax.y * 0.5, currentCamZ - 45);

      // Dynamic headlights follow camera position
      cameraLight.position.set(currentParallax.x, currentParallax.y, currentCamZ - 4);
      purpleLight.position.set(-currentParallax.x * 1.2, -currentParallax.y * 1.2, currentCamZ - 20);

      // Rotate Hexagonal Aperture Gates
      hexGateMeshes.forEach((item, idx) => {
        if (!isHoveredRef.current) {
          item.mesh.rotation.z += item.speed * 0.015;
        }
        // Infinite recycling along Z
        while (item.mesh.position.z > camera.position.z + 15) {
          item.mesh.position.z -= totalTunnelSpan;
        }
        while (item.mesh.position.z < camera.position.z - (totalTunnelSpan - 15)) {
          item.mesh.position.z += totalTunnelSpan;
        }
      });

      // Animate Corner Laser Pulse Spheres
      pulseSpheres.forEach((p) => {
        if (!isHoveredRef.current) {
          p.mesh.position.z += p.speed;
          if (p.mesh.position.z > camera.position.z + 20) {
            p.mesh.position.z = camera.position.z - totalTunnelSpan * 0.9;
          }
        }
      });

      // Animate Travelling Shockwave Rings
      shockwaves.forEach((sw) => {
        if (!isHoveredRef.current) {
          sw.mesh.position.z += sw.speed;
          if (sw.mesh.position.z > camera.position.z + 18) {
            sw.mesh.position.z = camera.position.z - totalTunnelSpan * 0.85;
          }
        }
      });

      // Rotate Deep Vortex Core
      vortexGroup.rotation.z = elapsed * 0.65;
      vortexGroup.position.z = camera.position.z - 240;

      // Infinite Conduit Ring Recycling
      ringMeshes.forEach((ring, idx) => {
        if (!isHoveredRef.current) {
          ring.rotation.z = elapsed * (0.12 + (idx % 4) * 0.04);
        }

        while (ring.position.z > camera.position.z + 16) {
          ring.position.z -= totalTunnelSpan;
        }
        while (ring.position.z < camera.position.z - (totalTunnelSpan - 16)) {
          ring.position.z += totalTunnelSpan;
        }
      });

      // High-Velocity Particle Flow (Speed streaks into the tunnel)
      const positions = particleGeo.attributes.position.array;
      const speed = isHoveredRef.current ? 0.03 : 0.18;

      for (let p = 0; p < particleCount; p++) {
        const pzIdx = p * 3 + 2;
        positions[pzIdx] += speed;

        if (positions[pzIdx] > camera.position.z + 15) {
          positions[pzIdx] = camera.position.z - (totalTunnelSpan - 15);
        } else if (positions[pzIdx] < camera.position.z - totalTunnelSpan) {
          positions[pzIdx] = camera.position.z + 10;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeo.dispose();
      hexGateGeo.dispose();
      sphereGeo.dispose();
      shockwaveGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.98 }}
    />
  );
};

export default ProjectTunnelCanvas3D;
