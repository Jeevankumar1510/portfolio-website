import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;
    const camera = new THREE.PerspectiveCamera(
      60,
      width / Math.max(height, 1),
      1,
      1200
    );
    camera.position.z = 450;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mount.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL not supported in ParticleBackground:", err);
      return;
    }

    // Dynamic Moving Constellation Field
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color('#00f0ff');
    const sky = new THREE.Color('#38bdf8');
    const purple = new THREE.Color('#a855f7');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;

      // Gentle continuous drift velocity in 3D (visibly moving)
      velocities[i * 3] = (Math.random() - 0.5) * 0.55;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.55;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      const rand = Math.random();
      const chosenColor = rand > 0.65 ? cyan : rand > 0.35 ? sky : rand > 0.15 ? purple : white;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Glowing Particle Texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(0,240,255,0.95)');
    grad.addColorStop(0.55, 'rgba(168,85,247,0.45)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 6.0,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Interactive Constellation Connecting Lines
    const maxLineConnections = 300;
    const linePositions = new Float32Array(maxLineConnections * 6);
    const lineColors = new Float32Array(maxLineConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse Tracking with smooth parallax
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.08;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.08;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop (Continuous Visible Moving Cosmos)
    let animationId;
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const posArr = geometry.attributes.position.array;

      if (!prefersReducedMotion) {
        // Continuous organic drifting of every particle
        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3] += velocities[i * 3];
          posArr[i * 3 + 1] += velocities[i * 3 + 1];
          posArr[i * 3 + 2] += velocities[i * 3 + 2];

          // Boundary wrap-around for endless continuous motion
          if (posArr[i * 3] < -700) posArr[i * 3] = 700;
          if (posArr[i * 3] > 700) posArr[i * 3] = -700;
          if (posArr[i * 3 + 1] < -500) posArr[i * 3 + 1] = 500;
          if (posArr[i * 3 + 1] > 500) posArr[i * 3 + 1] = -500;
          if (posArr[i * 3 + 2] < -300) posArr[i * 3 + 2] = 300;
          if (posArr[i * 3 + 2] > 300) posArr[i * 3 + 2] = -300;
        }
        geometry.attributes.position.needsUpdate = true;

        // Dynamic Constellation lines calculation
        let lineIdx = 0;
        const connectDistance = 120;

        for (let i = 0; i < particleCount && lineIdx < maxLineConnections; i++) {
          for (let j = i + 1; j < particleCount && lineIdx < maxLineConnections; j++) {
            const dx = posArr[i * 3] - posArr[j * 3];
            const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
            const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < connectDistance) {
              const alpha = 1 - dist / connectDistance;

              // Line point 1
              linePositions[lineIdx * 6] = posArr[i * 3];
              linePositions[lineIdx * 6 + 1] = posArr[i * 3 + 1];
              linePositions[lineIdx * 6 + 2] = posArr[i * 3 + 2];

              lineColors[lineIdx * 6] = 0;
              lineColors[lineIdx * 6 + 1] = 0.94 * alpha;
              lineColors[lineIdx * 6 + 2] = 1 * alpha;

              // Line point 2
              linePositions[lineIdx * 6 + 3] = posArr[j * 3];
              linePositions[lineIdx * 6 + 4] = posArr[j * 3 + 1];
              linePositions[lineIdx * 6 + 5] = posArr[j * 3 + 2];

              lineColors[lineIdx * 6 + 3] = 0.66 * alpha;
              lineColors[lineIdx * 6 + 4] = 0.33 * alpha;
              lineColors[lineIdx * 6 + 5] = 0.97 * alpha;

              lineIdx++;
            }
          }
        }

        lineGeometry.setDrawRange(0, lineIdx * 2);
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;

        // Gentle global rotation
        particles.rotation.y += 0.0006;
        lineMesh.rotation.y += 0.0006;
      }

      // Parallax smooth interpolation
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      try {
        renderer.render(scene, camera);
      } catch (e) {}
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
