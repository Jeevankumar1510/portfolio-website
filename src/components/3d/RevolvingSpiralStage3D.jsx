import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Play, Pause, RotateCw,
  Sparkles, Zap, Eye, Github, ExternalLink, Bot, CheckCircle2
} from 'lucide-react';
import { SPIRAL_PROJECTS_DATA } from '../../data/projectsData';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

const RevolvingSpiralStage3D = ({
  activeProject,
  onSelectProject
}) => {
  const containerRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [frontIndex, setFrontIndex] = useState(0);

  // Responsive dimensions
  const [dimensions, setDimensions] = useState({
    cardWidth: 320,
    cardHeight: 280,
    radius: 340,
    stageHeight: 520
  });

  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const rotYRef = useRef(0);
  const targetRotYRef = useRef(null);
  const isAutoPlayingRef = useRef(true);
  const isHoveredRef = useRef(false);
  const lastInteractionRef = useRef(Date.now());
  const hasMovedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const totalProjects = SPIRAL_PROJECTS_DATA.length; // 7
  const angleStep = 360 / totalProjects; // ~51.43 deg

  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    isHoveredRef.current = hoveredProjectId !== null;
  }, [hoveredProjectId]);

  // Handle responsive resizing
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDimensions({
          cardWidth: 240,
          cardHeight: 230,
          radius: 210,
          stageHeight: 440
        });
      } else if (w < 768) {
        setDimensions({
          cardWidth: 270,
          cardHeight: 250,
          radius: 260,
          stageHeight: 480
        });
      } else if (w < 1024) {
        setDimensions({
          cardWidth: 290,
          cardHeight: 260,
          radius: 300,
          stageHeight: 500
        });
      } else {
        setDimensions({
          cardWidth: 320,
          cardHeight: 270,
          radius: 350,
          stageHeight: 520
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync external activeProject changes (e.g. from top tabs or HUD)
  useEffect(() => {
    if (!activeProject) return;
    const targetIdx = SPIRAL_PROJECTS_DATA.findIndex((p) => p.id === activeProject.id);
    if (targetIdx !== -1) {
      const targetBaseAngle = -targetIdx * angleStep;
      const current = rotYRef.current;
      const diff = ((targetBaseAngle - current) % 360 + 540) % 360 - 180;
      targetRotYRef.current = current + diff;
    }
  }, [activeProject, angleStep]);

  // 60 FPS Animation Loop
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

      // 1. Smooth glide to target snap angle
      if (targetRotYRef.current !== null) {
        const diff = targetRotYRef.current - rotYRef.current;
        if (Math.abs(diff) < 0.2) {
          rotYRef.current = targetRotYRef.current;
          targetRotYRef.current = null;
        } else {
          rotYRef.current += diff * 0.12;
        }
      } else if (isDraggingRef.current) {
        // Controlled by pointer
      } else if (Math.abs(velocityRef.current) > 0.04) {
        // Friction coasting after flick
        rotYRef.current += velocityRef.current;
        velocityRef.current *= 0.88;

        if (Math.abs(velocityRef.current) <= 0.04) {
          velocityRef.current = 0;
          const nearestSnap = Math.round(rotYRef.current / angleStep) * angleStep;
          targetRotYRef.current = nearestSnap;
        }
      } else {
        // Auto-revolve around spiral center: pauses on cursor hover, resumes after 3.2s
        const now = Date.now();
        const isHoverTimedOut = isHoveredRef.current && (now - lastInteractionRef.current > 3200);

        if ((!isHoveredRef.current || isHoverTimedOut) && isAutoPlayingRef.current) {
          rotYRef.current -= 0.22; // smooth continuous revolution
        }
      }

      setRotationY(rotYRef.current);

      // Determine which project is in front
      const normalized = ((-rotYRef.current % 360) + 360) % 360;
      const currentFrontIdx = Math.round(normalized / angleStep) % totalProjects;
      setFrontIndex(currentFrontIdx);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [angleStep, totalProjects]);

  // Update parent when front project changes
  useEffect(() => {
    if (!isHoveredRef.current) {
      const frontProj = SPIRAL_PROJECTS_DATA[frontIndex];
      if (frontProj && onSelectProject) {
        onSelectProject(frontProj);
      }
    }
  }, [frontIndex, onSelectProject]);

  // Pointer drag event handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
    velocityRef.current = 0;
    targetRotYRef.current = null;
    lastInteractionRef.current = Date.now();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastPointerRef.current.x;
    const totalDist = Math.hypot(e.clientX - startPosRef.current.x, e.clientY - startPosRef.current.y);
    if (totalDist > 6) {
      hasMovedRef.current = true;
    }

    lastInteractionRef.current = Date.now();

    const sensitivity = 0.40;
    rotYRef.current += dx * sensitivity;
    velocityRef.current = dx * sensitivity * 0.45;

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

      // Snap to nearest project angle
      const projected = rotYRef.current + velocityRef.current * 10;
      const snapTarget = Math.round(projected / angleStep) * angleStep;
      targetRotYRef.current = snapTarget;
    }
  };

  // Nav Arrows
  const handleStepPrev = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    const currentBase = Math.round(rotYRef.current / angleStep) * angleStep;
    targetRotYRef.current = currentBase + angleStep;
  };

  const handleStepNext = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    const currentBase = Math.round(rotYRef.current / angleStep) * angleStep;
    targetRotYRef.current = currentBase - angleStep;
  };

  // When cursor places on any project: pauses and focuses immediately!
  const handleProjectHover = (project, index) => {
    lastInteractionRef.current = Date.now();
    setHoveredProjectId(project.id);
    playCyberBeep(780, 0.02);
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  const handleProjectLeave = () => {
    setHoveredProjectId(null);
  };

  const handleProjectClick = (project, index) => {
    if (hasMovedRef.current) return; // Prevent accidental click on drag
    playClickSound();
    lastInteractionRef.current = Date.now();
    const targetBase = -index * angleStep;
    const current = rotYRef.current;
    const diff = ((targetBase - current) % 360 + 540) % 360 - 180;
    targetRotYRef.current = current + diff;
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        height: `${dimensions.stageHeight}px`,
        touchAction: 'pan-y'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[460px] h-[460px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Prominent Left Navigation Arrow */}
      <button
        onClick={handleStepPrev}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl glass-panel-glow border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.35)] cursor-pointer"
        title="Previous Project (‹)"
        aria-label="Previous Project"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Prominent Right Navigation Arrow */}
      <button
        onClick={handleStepNext}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl glass-panel-glow border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.35)] cursor-pointer"
        title="Next Project (›)"
        aria-label="Next Project"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: `${dimensions.cardHeight + 60}px`,
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Holographic Glowing Pedestal at Base */}
        <div
          className="absolute -bottom-8 pointer-events-none flex items-center justify-center z-0"
          style={{
            transform: 'rotateX(78deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="w-[500px] h-[500px] sm:w-[640px] sm:h-[640px] rounded-full border border-cyan-400/30 shadow-[0_0_45px_rgba(0,240,255,0.25)] animate-spin-slow" />
          <div
            className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-blue-500/40"
            style={{ animation: 'spin 18s linear infinite reverse' }}
          />
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/15 to-transparent blur-md" />
          <div className="absolute w-[160px] h-[160px] rounded-full bg-cyan-400/20 shadow-[0_0_40px_#00f0ff] animate-pulse" />
        </div>

        {/* Central Vertical Glowing Spiral Axis Core */}
        <div
          className="absolute z-10 pointer-events-none flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Central Pulsing Sphere */}
          <div className="w-12 h-12 rounded-full bg-cyan-400 shadow-[0_0_35px_#00f0ff] animate-pulse" />

          {/* Gyroscopic Orbital Rings */}
          <div
            className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            style={{
              transform: 'rotateX(65deg) rotateY(25deg)',
              animation: 'spin 10s linear infinite'
            }}
          />
          <div
            className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            style={{
              transform: 'rotateX(45deg) rotateZ(55deg)',
              animation: 'spin 8s linear infinite reverse'
            }}
          />

          {/* Glowing Vertical Energy Light Pillar */}
          <div className="absolute w-1.5 h-56 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-80 shadow-[0_0_25px_#00f0ff]" />
        </div>

        {/* Revolving 3D Spiral Cylinder Parent */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${dimensions.cardWidth}px`,
            height: `${dimensions.cardHeight}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(-6deg) rotateY(${rotationY}deg)`
          }}
        >
          {SPIRAL_PROJECTS_DATA.map((project, index) => {
            const cardAngle = index * angleStep;
            // Elevation along the spiral staircase
            const elevationY = ((index - 3) / 3) * 36; // Spans from -36px to +36px
            const relAngle = ((cardAngle + rotationY) % 360 + 540) % 360 - 180;
            const isFront = Math.abs(relAngle) < 26;
            const isFlanking = Math.abs(relAngle) >= 26 && Math.abs(relAngle) < 95;
            const isBack = Math.abs(relAngle) >= 95;
            const isHovered = hoveredProjectId === project.id;
            const isSelected = activeProject?.id === project.id;

            const cardOpacity = isSelected || isHovered ? 1.0 : isFront ? 0.95 : isFlanking ? 0.65 : 0.20;
            const cardScale = isHovered ? 1.08 : isFront || isSelected ? 1.04 : isFlanking ? 0.88 : 0.78;

            return (
              <div
                key={project.id}
                className="absolute inset-0 p-4 sm:p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 select-none cursor-pointer"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${dimensions.radius}px) translateY(${elevationY}px) scale(${cardScale})`,
                  opacity: cardOpacity,
                  pointerEvents: isBack ? 'none' : 'auto',
                  backfaceVisibility: 'visible',
                  background: isSelected || isHovered
                    ? 'rgba(7, 12, 28, 0.92)'
                    : 'rgba(5, 9, 22, 0.76)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: isSelected || isHovered
                    ? `1.5px solid ${project.color}`
                    : '1px solid rgba(0, 240, 255, 0.25)',
                  boxShadow: isSelected || isHovered
                    ? `0 0 35px ${project.color}55, inset 0 0 20px ${project.color}20`
                    : '0 0 15px rgba(0, 240, 255, 0.1)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project, index);
                }}
                onMouseEnter={() => handleProjectHover(project, index)}
                onMouseMove={() => {
                  lastInteractionRef.current = Date.now();
                }}
                onMouseLeave={handleProjectLeave}
              >
                {/* Cyber Corner Accents */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: project.color }} />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: project.color }} />
                <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: project.color }} />
                <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: project.color }} />

                {/* Top Header */}
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400">
                      PROJECT {project.number}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}50`,
                        backgroundColor: `${project.color}15`
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-base sm:text-lg font-extrabold text-white font-sans tracking-tight line-clamp-1 mb-0.5">
                    {project.title}
                  </h4>
                  <p className="text-[11px] font-mono text-cyan-300 truncate mb-2">
                    {project.subtitle}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2 font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Technologies and Bottom Hover Indicator */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 text-cyan-300 border border-slate-800 flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                        <span>{tech.name}</span>
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Status Bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{project.technologies.length} Technologies</span>
                    </span>
                    <span className={isFront || isSelected ? 'text-cyan-300 font-bold flex items-center gap-1' : 'text-slate-400'}>
                      {isFront || isSelected ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>Hovered / Active</span>
                        </>
                      ) : (
                        'Hover to Inspect'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Control Bar & Quick Project Indicators */}
      <div className="relative z-30 mt-4 flex flex-wrap items-center justify-center gap-3 px-5 py-2 rounded-full glass-panel-glow border border-cyan-500/30 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
        {/* Play/Pause Button */}
        <button
          onClick={() => {
            playClickSound();
            setIsAutoPlaying(!isAutoPlaying);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
            isAutoPlaying
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
              : 'border border-slate-800 text-slate-400 hover:text-white'
          }`}
          title={isAutoPlaying ? 'Pause 3D orbit' : 'Resume auto-revolving'}
        >
          {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isAutoPlaying ? 'Revolving Spiral' : 'Paused'}</span>
        </button>

        {/* 7 Project Dot Waypoints */}
        <div className="flex items-center gap-2 px-2 border-l border-slate-800">
          {SPIRAL_PROJECTS_DATA.map((proj, idx) => {
            const isActive = frontIndex === idx || activeProject?.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleProjectClick(proj, idx)}
                onMouseEnter={() => handleProjectHover(proj, idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2.5 bg-cyan-400 shadow-[0_0_12px_#00f0ff]'
                    : 'w-2.5 h-2.5 bg-slate-700 hover:bg-cyan-400/60'
                }`}
                title={`Jump to Project ${proj.number}: ${proj.title}`}
                aria-label={proj.title}
              />
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800 text-xs font-mono text-slate-400">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
          <span>Cursor Hover to Display Details</span>
        </div>
      </div>
    </div>
  );
};

export default RevolvingSpiralStage3D;

