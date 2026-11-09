import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SPIRAL_PROJECTS_DATA } from '../../data/projectsData';

const SpiralPathCanvas3D = ({
  scrollProgress = 0, // 0 to 1
  activeIndex = 0
}) => {
  const mountRef = useRef(null);
  const scrollProgressRef = useRef(scrollProgress);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 20, 48);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x0d1b2a, 1.8);
    scene.add(ambientLight);

    const primaryLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    primaryLight.position.set(20, 40, 30);
    scene.add(primaryLight);

    const secondaryLight = new THREE.DirectionalLight(0x3b82f6, 2.0);
    secondaryLight.position.set(-20, -20, 20);
    scene.add(secondaryLight);

    // Dynamic spotlight tracking the active project
    const focusSpot = new THREE.SpotLight(0x00f0ff, 4.0, 50, Math.PI / 4, 0.5, 1.5);
    scene.add(focusSpot);

    // 3. Construct 3D Spiral Helical Pathway
    const totalPoints = 360;
    const radius = 16;
    const totalHeight = 90;
    const turns = 3.2; // 3.2 full revolutions

    const curvePoints = [];
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * turns * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = totalHeight / 2 - t * totalHeight; // Spans from +45 down to -45
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const spiralCurve = new THREE.CatmullRomCurve3(curvePoints);

    // Main Glowing Tube Geometry
    const tubeGeo = new THREE.TubeGeometry(spiralCurve, 260, 0.42, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x005577,
      emissiveIntensity: 0.9,
      metalness: 0.85,
      roughness: 0.25
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tubeMesh);

    // Outer Neon Wireframe Hologram Tube
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const wireGeo = new THREE.TubeGeometry(spiralCurve, 180, 0.75, 6, false);
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // 4. Seven Project Waypoint Beacons along the Spiral
    const beacons = [];
    const beaconRings = [];

    SPIRAL_PROJECTS_DATA.forEach((project, index) => {
      const t = index / (SPIRAL_PROJECTS_DATA.length - 1);
      const point = spiralCurve.getPointAt(t);

      // Sphere core
      const beaconGeo = new THREE.SphereGeometry(1.1, 24, 24);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(project.color),
        emissive: new THREE.Color(project.color),
        emissiveIntensity: 1.5,
        roughness: 0.1
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.copy(point);
      scene.add(beaconMesh);
      beacons.push({ mesh: beaconMesh, point, baseScale: 1, color: project.color });

      // Orbiting Neon Ring
      const ringGeo = new THREE.RingGeometry(1.6, 1.85, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(project.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(point);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);
      beaconRings.push(ringMesh);

      // Energy Ray connecting toward card direction (Left / Right)
      const rayPoints = [
        point,
        new THREE.Vector3(
          point.x + (project.side === 'left' ? -7 : 7),
          point.y,
          point.z + 4
        )
      ];
      const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
      const rayMat = new THREE.LineDashedMaterial({
        color: new THREE.Color(project.color),
        dashSize: 0.6,
        gapSize: 0.4,
        transparent: true,
        opacity: 0.4
      });
      const rayLine = new THREE.Line(rayGeo, rayMat);
      rayLine.computeLineDistances();
      scene.add(rayLine);
    });

    // 5. Travelling Energetic Pulse Photon
    const pulseLight = new THREE.PointLight(0x00f0ff, 5.0, 18);
    const pulseGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.add(pulseLight);
    scene.add(pulseMesh);

    // 6. Floating Cosmic Cyber Dust Particles
    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const blueColor = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      // Scatter within cylindrical shell around spiral
      const theta = Math.random() * Math.PI * 2;
      const r = 8 + Math.random() * 20;
      const y = (Math.random() - 0.5) * totalHeight * 1.1;

      particlePositions[i * 3] = Math.cos(theta) * r;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(theta) * r;

      const c = Math.random() > 0.4 ? cyanColor : blueColor;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Camera trajectory interpolation state
    const currentCamTarget = new THREE.Vector3(0, 30, 0);
    const currentCamPos = new THREE.Vector3(0, 32, 45);

    // 7. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous subtle ambient rotation of the spiral
      wireMesh.rotation.y = elapsed * 0.08;
      particles.rotation.y = elapsed * 0.03;

      // Travelling energy photon along curve
      const pulseT = (elapsed * 0.18) % 1;
      const pulsePos = spiralCurve.getPointAt(pulseT);
      pulseMesh.position.copy(pulsePos);

      // Rotate beacon rings
      beaconRings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * (1.2 + idx * 0.2);
      });

      // Update active beacon scaling and intense pulsating glow
      const currentActive = activeIndexRef.current;
      beacons.forEach((b, idx) => {
        const isActive = idx === currentActive;
        const targetScale = isActive ? 1.6 + Math.sin(elapsed * 5) * 0.18 : 1.0;
        b.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        b.mesh.material.emissiveIntensity = isActive ? 3.0 : 1.0;
      });

      // Calculate camera position along spiral based on scrollProgress
      const progress = Math.max(0, Math.min(1, scrollProgressRef.current));
      
      // Target waypoint position on curve
      const curvePoint = spiralCurve.getPointAt(progress);

      // Focus spotlight onto active project
      focusSpot.position.set(curvePoint.x * 1.5, curvePoint.y + 12, curvePoint.z * 1.5 + 10);
      focusSpot.target.position.copy(curvePoint);
      focusSpot.target.updateMatrixWorld();

      // Desired camera orbit around curve point (Responsive distance)
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const camOrbitRadius = isMobile ? 46 : isTablet ? 38 : 34;
      const camElevation = isMobile ? 8 : 6;
      const camAngle = progress * turns * Math.PI * 2 + 0.4;

      const targetX = Math.cos(camAngle) * camOrbitRadius;
      const targetZ = Math.sin(camAngle) * camOrbitRadius + (isMobile ? 22 : 18);
      const targetY = curvePoint.y + camElevation;

      // Smoothly interpolate camera position and lookAt target (damped spring)
      currentCamPos.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.07);
      currentCamTarget.lerp(curvePoint, 0.07);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamTarget);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.88 }}
    />
  );
};

export default SpiralPathCanvas3D;
