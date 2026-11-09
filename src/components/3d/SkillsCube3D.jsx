import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  RotateCw, ChevronLeft, ChevronRight, Play, Pause,
  ArrowUp, ArrowDown, Zap, Sparkles, Boxes, CheckCircle2
} from 'lucide-react';
import { CUBE_FACES_DATA } from '../../data/skillsCubeData';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

const SkillsCube3D = ({
  activeFaceId = 'programming',
  onSelectFace
}) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: -10, y: 0 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredFaceId, setHoveredFaceId] = useState(null);
  const [cubeSize, setCubeSize] = useState(360);
  const [frontFaceId, setFrontFaceId] = useState('programming');

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: -10, y: 0 });
  const targetRotRef = useRef(null);
  const isAutoPlayingRef = useRef(true);
  const isHoveredRef = useRef(false);
  const lastInteractionRef = useRef(Date.now());

  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    isHoveredRef.current = hoveredFaceId !== null;
  }, [hoveredFaceId]);

  // Responsive cube dimension calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCubeSize(260); // Small Mobile
      } else if (w < 768) {
        setCubeSize(300); // Mobile / Tablet
      } else if (w < 1200) {
        setCubeSize(340); // Tablet / Laptop
      } else {
        setCubeSize(360); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const halfSize = cubeSize / 2;

  // Face normal vectors in local cube space (pointing outwards from face center)
  const faceNormals = useMemo(() => [
    { id: 'programming', normal: [0, 0, 1] },       // Front Face (Z+)
    { id: 'aiml', normal: [1, 0, 0] },              // Right Face (X+)
    { id: 'genai', normal: [0, 0, -1] },            // Back Face (Z-)
    { id: 'libraries', normal: [-1, 0, 0] },        // Left Face (X-)
    { id: 'cloud_backend', normal: [0, 1, 0] },     // Top Face (Y+)
    { id: 'database_tools', normal: [0, -1, 0] }    // Bottom Face (Y-)
  ], []);

  // Calculate which face currently points most directly at the camera
  const calculateFrontFace = (rotX, rotY) => {
    const radX = (rotX * Math.PI) / 180;
    const radY = (rotY * Math.PI) / 180;

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(radY);

    let maxDot = -Infinity;
    let closestFace = 'programming';

    faceNormals.forEach(({ id, normal: [nx, ny, nz] }) => {
      const rx = nx * Math.cos(radY) + nz * Math.sin(radY);
      const ry = ny;
      const rz = -nx * Math.sin(radY) + nz * Math.cos(radY);

      const worldZ = ry * Math.sin(radX) + rz * Math.cos(radX);

      if (worldZ > maxDot) {
        maxDot = worldZ;
        closestFace = id;
      }
    });

    return closestFace;
  };

  // 60 FPS Animation & Auto-Rotation Loop with Magnetic Snapping
  useEffect(() => {
    let animId;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // 1. Smooth glide to target rotation when a face or arrow is clicked
      if (targetRotRef.current !== null) {
        const dx = targetRotRef.current.x - rotRef.current.x;
        const dy = targetRotRef.current.y - rotRef.current.y;

        if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25) {
          rotRef.current = { ...targetRotRef.current };
          targetRotRef.current = null;
        } else {
          rotRef.current.x += dx * 0.12;
          rotRef.current.y += dy * 0.12;
        }
      } else if (isDraggingRef.current) {
        // Driven directly by user pointer
      } else if (Math.abs(velocityRef.current.y) > 0.02) {
        // Inertia coasting horizontally
        rotRef.current.y += velocityRef.current.y;
        velocityRef.current.y *= 0.90;

        if (Math.abs(velocityRef.current.y) <= 0.02) {
          velocityRef.current.y = 0;
          // Magnetic snap to nearest 90 degree face!
          const nearestY = Math.round(rotRef.current.y / 90) * 90;
          targetRotRef.current = { x: -10, y: nearestY };
        }
      } else {
        // Continuous auto-orbit: pauses on active hover, auto-resumes after 3.2s
        const now = Date.now();
        const isHoverTimedOut = isHoveredRef.current && (now - lastInteractionRef.current > 3200);

        if ((!isHoveredRef.current || isHoverTimedOut) && isAutoPlayingRef.current) {
          rotRef.current.y = (rotRef.current.y + 0.32);
          // Level X angle keeps cube stable and readable
          rotRef.current.x = -10;
        }
      }

      setRotation({ x: rotRef.current.x, y: rotRef.current.y });

      // Determine front face dynamically
      const activeCurrent = calculateFrontFace(rotRef.current.x, rotRef.current.y);
      setFrontFaceId(activeCurrent);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [faceNormals]);

  // Synchronize target rotation with external activeFaceId changes
  useEffect(() => {
    if (!activeFaceId) return;
    const face = CUBE_FACES_DATA.find((f) => f.id === activeFaceId);
    if (face) {
      targetRotRef.current = { ...face.targetRot };
    }
  }, [activeFaceId]);

  // Notify parent of front face changes
  useEffect(() => {
    if (onSelectFace && frontFaceId) {
      const face = CUBE_FACES_DATA.find((f) => f.id === frontFaceId);
      if (face) {
        onSelectFace(face);
      }
    }
  }, [frontFaceId]);

  const handleFaceClick = (face) => {
    playClickSound();
    lastInteractionRef.current = Date.now();
    targetRotRef.current = { ...face.targetRot };
    if (onSelectFace) {
      onSelectFace(face);
    }
  };

  // Pointer & Drag Handlers: Horizontally constrained, prevents upside-down flip!
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    targetRotRef.current = null;
    lastInteractionRef.current = Date.now();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    lastInteractionRef.current = Date.now();

    // Primary horizontal movement (yaw)
    const sensitivity = 0.42;
    rotRef.current.y += dx * sensitivity;

    // Subtle, safe vertical pitch (clamped between -25deg and +15deg so it NEVER flips upside-down)
    const newX = rotRef.current.x - dy * sensitivity * 0.3;
    rotRef.current.x = Math.max(-25, Math.min(15, newX));

    velocityRef.current = {
      x: 0,
      y: dx * sensitivity * 0.45
    };

    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        if (e && e.currentTarget) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}

      // Magnetic snap to nearest 90 degree face on release
      const projectedY = rotRef.current.y + velocityRef.current.y * 10;
      const snapY = Math.round(projectedY / 90) * 90;
      targetRotRef.current = { x: -10, y: snapY };
    }
  };

  // Navigation Arrows: Rotate Cube
  const handleStepLeft = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    targetRotRef.current = { x: -10, y: Math.round(rotRef.current.y / 90) * 90 + 90 };
  };

  const handleStepRight = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    targetRotRef.current = { x: -10, y: Math.round(rotRef.current.y / 90) * 90 - 90 };
  };

  const handleTiltUp = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    targetRotRef.current = { x: -90, y: Math.round(rotRef.current.y / 90) * 90 };
  };

  const handleTiltDown = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    targetRotRef.current = { x: 90, y: Math.round(rotRef.current.y / 90) * 90 };
  };

  // CSS 3D Face Transforms
  const getFaceTransform = (faceId) => {
    switch (faceId) {
      case 'programming':
        return `rotateY(0deg) translateZ(${halfSize}px)`;
      case 'aiml':
        return `rotateY(90deg) translateZ(${halfSize}px)`;
      case 'genai':
        return `rotateY(180deg) translateZ(${halfSize}px)`;
      case 'libraries':
        return `rotateY(-90deg) translateZ(${halfSize}px)`;
      case 'cloud_backend':
        return `rotateX(90deg) translateZ(${halfSize}px)`;
      case 'database_tools':
        return `rotateX(-90deg) translateZ(${halfSize}px)`;
      default:
        return `translateZ(${halfSize}px)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] flex flex-col items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Background Ambient Radial Glows */}
      <div className="absolute w-[560px] h-[560px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[440px] h-[440px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Prominent Floating Left Navigation Arrow Button */}
      <button
        onClick={handleStepLeft}
        className="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl glass-panel-glow border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.35)] cursor-pointer"
        title="Previous Cube Face (‹)"
        aria-label="Previous Cube Face"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Prominent Floating Right Navigation Arrow Button */}
      <button
        onClick={handleStepRight}
        className="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl glass-panel-glow border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.35)] cursor-pointer"
        title="Next Cube Face (›)"
        aria-label="Next Cube Face"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Holographic Glowing Pedestal at Base */}
        <div
          className="absolute -bottom-10 pointer-events-none flex items-center justify-center z-0"
          style={{
            transform: 'rotateX(78deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] rounded-full border border-cyan-400/30 shadow-[0_0_45px_rgba(0,240,255,0.25)] animate-spin-slow" />
          <div
            className="absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-purple-500/40"
            style={{ animation: 'spin 18s linear infinite reverse' }}
          />
          <div className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] rounded-full bg-cyan-400/15 shadow-[0_0_35px_#00f0ff] animate-pulse" />
        </div>

        {/* Rotating 3D Cube Parent */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {/* Inner Glowing Holographic Reactor Core */}
          <div
            className="absolute z-10 pointer-events-none flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-400 shadow-[0_0_35px_#00f0ff] animate-pulse" />
            <div
              className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              style={{
                transform: 'rotateX(65deg) rotateY(25deg)',
                animation: 'spin 12s linear infinite'
              }}
            />
            <div
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              style={{
                transform: 'rotateX(45deg) rotateZ(55deg)',
                animation: 'spin 9s linear infinite reverse'
              }}
            />
            <div className="absolute w-1.5 h-36 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-75 shadow-[0_0_25px_#00f0ff]" />
          </div>

          {/* Six Transparent Glass Faces */}
          {CUBE_FACES_DATA.map((face) => {
            const isFront = frontFaceId === face.id;
            const isHovered = hoveredFaceId === face.id;
            const FaceIcon = face.icon;

            return (
              <div
                key={face.id}
                className="absolute p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
                style={{
                  width: `${cubeSize}px`,
                  height: `${cubeSize}px`,
                  transform: getFaceTransform(face.id),
                  backfaceVisibility: 'visible',
                  background: isFront
                    ? 'rgba(3, 7, 18, 0.84)'
                    : 'rgba(3, 7, 18, 0.68)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isFront || isHovered
                    ? `1.5px solid ${face.color}`
                    : '1px solid rgba(0, 240, 255, 0.35)',
                  boxShadow: isFront || isHovered
                    ? `0 0 35px ${face.color}55, inset 0 0 25px ${face.color}20`
                    : '0 0 20px rgba(0, 240, 255, 0.12), inset 0 0 15px rgba(0, 240, 255, 0.05)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFaceClick(face);
                }}
                onMouseEnter={() => {
                  lastInteractionRef.current = Date.now();
                  setHoveredFaceId(face.id);
                  playCyberBeep(780, 0.03);
                }}
                onMouseLeave={() => setHoveredFaceId(null)}
              >
                {/* Cyber Neon Corner Accents */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: face.color }} />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: face.color }} />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: face.color }} />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: face.color }} />

                {/* Top Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
                      {face.faceName}
                    </span>
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        color: face.color,
                        borderColor: `${face.color}50`,
                        backgroundColor: `${face.color}15`
                      }}
                    >
                      {face.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg shrink-0"
                      style={{
                        backgroundColor: `${face.color}20`,
                        borderColor: `${face.color}60`,
                        color: face.color
                      }}
                    >
                      <FaceIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-white font-sans tracking-tight line-clamp-1">
                        {face.category}
                      </h4>
                      <p className="text-[11px] font-mono text-cyan-300 truncate">
                        {face.title}
                      </p>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2 font-sans">
                    {face.description}
                  </p>
                </div>

                {/* Skills Chips */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {face.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 text-cyan-300 border border-slate-800 flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: face.color }} />
                        <span>{skill.name}</span>
                        <span className="text-slate-400 font-bold">{skill.level}%</span>
                      </span>
                    ))}
                  </div>

                  {/* Bottom Bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{face.skills.length} Technologies</span>
                    </span>
                    <span className={isFront ? 'text-cyan-300 font-bold flex items-center gap-1' : 'text-slate-400'}>
                      {isFront ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>Front Active</span>
                        </>
                      ) : (
                        'Click to Focus'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cube Navigation Arrows & Interactive Controls Bar */}
      <div className="relative z-30 mt-3 flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {/* Step Left */}
        <button
          onClick={handleStepLeft}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Rotate Left (90°)"
          aria-label="Rotate cube left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={() => {
            playClickSound();
            setIsAutoPlaying(!isAutoPlaying);
          }}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
            isAutoPlaying
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
              : 'border border-slate-800 text-slate-400 hover:text-white'
          }`}
          title={isAutoPlaying ? 'Pause 3D rotation' : 'Resume auto-rotation'}
        >
          {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isAutoPlaying ? 'Auto-Orbiting' : 'Paused'}</span>
        </button>

        {/* Step Right */}
        <button
          onClick={handleStepRight}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Rotate Right (90°)"
          aria-label="Rotate cube right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Tilt Up Arrow */}
        <button
          onClick={handleTiltUp}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Tilt Up to Top Face (Cloud & Backend)"
          aria-label="Tilt cube up"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Tilt Down Arrow */}
        <button
          onClick={handleTiltDown}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Tilt Down to Bottom Face (Database & Tools)"
          aria-label="Tilt cube down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 text-[11px] font-mono text-slate-400">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
          <span>Magnetic Snap • 6 Glass Faces</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsCube3D;
