import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  RotateCw, ChevronLeft, ChevronRight, Play, Pause,
  Zap, Sparkles, CheckCircle2, Eye, Compass
} from 'lucide-react';
import { CUBE_FACES_DATA } from '../../data/skillsCubeData';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

const SkillsCarousel3D = ({
  activeFaceId = 'programming',
  onSelectFace
}) => {
  const containerRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [frontFaceIndex, setFrontFaceIndex] = useState(0);

  // Responsive dimensions
  const [dimensions, setDimensions] = useState({
    cardWidth: 340,
    cardHeight: 440,
    radius: 360,
    stageHeight: 580
  });

  // Drag & Motion refs
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const rotYRef = useRef(0);
  const targetRotYRef = useRef(null);
  const isAutoPlayingRef = useRef(true);
  const isHoveredRef = useRef(false);
  const lastInteractionRef = useRef(Date.now());

  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    isHoveredRef.current = hoveredCardId !== null;
  }, [hoveredCardId]);

  // Handle responsive resizing
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        // Mobile Small
        setDimensions({
          cardWidth: 260,
          cardHeight: 390,
          radius: 260,
          stageHeight: 480
        });
      } else if (w < 768) {
        // Mobile Large / Tablet
        setDimensions({
          cardWidth: 290,
          cardHeight: 410,
          radius: 300,
          stageHeight: 520
        });
      } else if (w < 1024) {
        // Tablet
        setDimensions({
          cardWidth: 320,
          cardHeight: 430,
          radius: 340,
          stageHeight: 550
        });
      } else {
        // Desktop
        setDimensions({
          cardWidth: 350,
          cardHeight: 450,
          radius: 380,
          stageHeight: 580
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync external activeFaceId changes smoothly
  useEffect(() => {
    if (!activeFaceId) return;
    const targetIdx = CUBE_FACES_DATA.findIndex((f) => f.id === activeFaceId);
    if (targetIdx !== -1) {
      const targetBaseAngle = -targetIdx * 60;
      // Calculate shortest angular distance from current angle
      const current = rotYRef.current;
      const diff = ((targetBaseAngle - current) % 360 + 540) % 360 - 180;
      targetRotYRef.current = current + diff;
    }
  }, [activeFaceId]);

  // Main 60 FPS animation loop with spring damping & auto-orbit
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

      // 1. Smooth spring glide to target snap angle
      if (targetRotYRef.current !== null) {
        const diff = targetRotYRef.current - rotYRef.current;
        if (Math.abs(diff) < 0.2) {
          rotYRef.current = targetRotYRef.current;
          targetRotYRef.current = null;
        } else {
          rotYRef.current += diff * 0.12; // buttery smooth easing
        }
      } else if (isDraggingRef.current) {
        // Controlled directly by user drag
      } else if (Math.abs(velocityRef.current) > 0.04) {
        // Friction coasting after a flick gesture
        rotYRef.current += velocityRef.current;
        velocityRef.current *= 0.88;

        if (Math.abs(velocityRef.current) <= 0.04) {
          velocityRef.current = 0;
          // Snap cleanly to nearest card upon stopping
          const nearestSnap = Math.round(rotYRef.current / 60) * 60;
          targetRotYRef.current = nearestSnap;
        }
      } else {
        // Auto-orbit: paused when hovered, resumes automatically after 3.5s
        const now = Date.now();
        const isHoverTimedOut = isHoveredRef.current && (now - lastInteractionRef.current > 3500);

        if ((!isHoveredRef.current || isHoverTimedOut) && isAutoPlayingRef.current) {
          rotYRef.current -= 0.22; // gentle continuous rotation
        }
      }

      setRotationY(rotYRef.current);

      // Compute which card index is in front
      const normalized = ((-rotYRef.current % 360) + 360) % 360;
      const currentFrontIdx = Math.round(normalized / 60) % 6;
      setFrontFaceIndex(currentFrontIdx);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  // Update parent when front card settles or changes
  useEffect(() => {
    const activeFace = CUBE_FACES_DATA[frontFaceIndex];
    if (activeFace && onSelectFace) {
      onSelectFace(activeFace);
    }
  }, [frontFaceIndex]);

  // Pointer drag event handlers (Horizontally constrained, zero pitch tumbling!)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
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
    lastInteractionRef.current = Date.now();

    // Responsive horizontal sensitivity
    const sensitivity = 0.42;
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

      // Magnetic snap to nearest 60° card
      const projected = rotYRef.current + velocityRef.current * 10;
      const snapTarget = Math.round(projected / 60) * 60;
      targetRotYRef.current = snapTarget;
    }
  };

  // Nav Arrows: Effortlessly step prev / next
  const handleStepPrev = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    const currentBase = Math.round(rotYRef.current / 60) * 60;
    targetRotYRef.current = currentBase + 60;
  };

  const handleStepNext = (e) => {
    e?.stopPropagation();
    playClickSound();
    lastInteractionRef.current = Date.now();
    const currentBase = Math.round(rotYRef.current / 60) * 60;
    targetRotYRef.current = currentBase - 60;
  };

  // Direct card click: brings that card smoothly to front
  const handleCardClick = (index, face) => {
    playClickSound();
    lastInteractionRef.current = Date.now();
    const targetAngle = -index * 60;
    const current = rotYRef.current;
    const diff = ((targetAngle - current) % 360 + 540) % 360 - 180;
    targetRotYRef.current = current + diff;
    if (onSelectFace) {
      onSelectFace(face);
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
      <div className="absolute w-[460px] h-[460px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Prominent Floating Left Navigation Arrow Button */}
      <button
        onClick={handleStepPrev}
        className="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl glass-panel-glow border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.35)] cursor-pointer"
        title="Previous Skill Category (‹)"
        aria-label="Previous Category"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Prominent Floating Right Navigation Arrow Button */}
      <button
        onClick={handleStepNext}
        className="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl glass-panel-glow border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.35)] cursor-pointer"
        title="Next Skill Category (›)"
        aria-label="Next Category"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: `${dimensions.cardHeight + 40}px`,
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
          {/* Outer Neon Cyber Ring */}
          <div className="w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full border border-cyan-400/30 shadow-[0_0_50px_rgba(0,240,255,0.25)] animate-spin-slow" />
          
          {/* Middle Counter-Rotating Purple Segment Ring */}
          <div
            className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] rounded-full border border-dashed border-purple-500/40"
            style={{ animation: 'spin 18s linear infinite reverse' }}
          />

          {/* Radial Light Disc on Floor */}
          <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-purple-500/15 to-transparent blur-md" />

          {/* Central Pulsing Power Source */}
          <div className="absolute w-[180px] h-[180px] rounded-full bg-cyan-400/20 shadow-[0_0_45px_#00f0ff] animate-pulse" />
        </div>

        {/* Central Floating Holographic Reactor Core */}
        <div
          className="absolute z-10 pointer-events-none flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glowing Energy Orb */}
          <div className="w-12 h-12 rounded-full bg-cyan-400 shadow-[0_0_40px_#00f0ff] animate-pulse" />

          {/* Rotating Gyroscopic Gyro Rings */}
          <div
            className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            style={{
              transform: 'rotateX(65deg) rotateY(25deg)',
              animation: 'spin 12s linear infinite'
            }}
          />
          <div
            className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            style={{
              transform: 'rotateX(45deg) rotateZ(55deg)',
              animation: 'spin 9s linear infinite reverse'
            }}
          />

          {/* Vertical Laser Light Beam */}
          <div className="absolute w-1.5 h-44 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-75 shadow-[0_0_30px_#00f0ff]" />
        </div>

        {/* 3D Revolving Hexagonal Carousel Cylinder */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${dimensions.cardWidth}px`,
            height: `${dimensions.cardHeight}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotationY}deg)`
          }}
        >
          {CUBE_FACES_DATA.map((face, index) => {
            const cardAngle = index * 60;
            // Calculate angle relative to front camera (0°)
            const relAngle = ((cardAngle + rotationY) % 360 + 540) % 360 - 180;
            const isFront = Math.abs(relAngle) < 30;
            const isFlanking = Math.abs(relAngle) >= 30 && Math.abs(relAngle) < 95;
            const isBack = Math.abs(relAngle) >= 95;
            const isHovered = hoveredCardId === face.id;
            const FaceIcon = face.icon;

            // Visual depth styling
            const cardOpacity = isFront ? 1 : isFlanking ? 0.72 : 0.22;
            const cardScale = isFront ? 1.05 : isFlanking ? 0.92 : 0.82;
            const cardPointerEvents = isBack ? 'none' : 'auto';

            return (
              <div
                key={face.id}
                className="absolute inset-0 p-5 sm:p-6 rounded-3xl flex flex-col justify-between transition-opacity duration-300 select-none cursor-pointer"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${dimensions.radius}px) scale(${cardScale})`,
                  opacity: cardOpacity,
                  pointerEvents: cardPointerEvents,
                  backfaceVisibility: 'visible',
                  background: isFront
                    ? 'rgba(7, 12, 26, 0.88)'
                    : 'rgba(5, 9, 20, 0.75)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: isFront
                    ? `1.5px solid ${face.color}`
                    : `1px solid rgba(0, 240, 255, 0.25)`,
                  boxShadow: isFront
                    ? `0 0 45px ${face.color}55, inset 0 0 25px ${face.color}20`
                    : '0 0 20px rgba(0, 240, 255, 0.1)',
                  transition: isDraggingRef.current
                    ? 'box-shadow 0.2s, border-color 0.2s'
                    : 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(index, face);
                }}
                onMouseEnter={() => {
                  lastInteractionRef.current = Date.now();
                  setHoveredCardId(face.id);
                  playCyberBeep(740, 0.03);
                }}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Cyber Neon Corner Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: face.color }} />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: face.color }} />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: face.color }} />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: face.color }} />

                {/* Card Top: Category Badge & Face Number */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
                      0{index + 1} / 06
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
                      className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg shrink-0"
                      style={{
                        backgroundColor: `${face.color}20`,
                        borderColor: `${face.color}60`,
                        color: face.color
                      }}
                    >
                      <FaceIcon className="w-6 h-6" />
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
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3 font-sans">
                    {face.description}
                  </p>
                </div>

                {/* Skills Chips on This Card */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {face.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-1 rounded text-[11px] font-mono bg-slate-900/90 text-cyan-300 border border-slate-800 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: face.color }} />
                        <span>{skill.name}</span>
                        <span className="text-slate-400 font-bold">{skill.level}%</span>
                      </span>
                    ))}
                  </div>

                  {/* Bottom Interactive Bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{face.skills.length} Technologies</span>
                    </span>
                    <span className={isFront ? 'text-cyan-300 font-bold flex items-center gap-1' : 'text-slate-400'}>
                      {isFront ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>Active Front</span>
                        </>
                      ) : (
                        'Click to Rotate'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Control Pill & Indicator Dots */}
      <div className="relative z-30 mt-6 flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full glass-panel-glow border border-cyan-500/30 shadow-[0_0_25px_rgba(0,0,0,0.6)]">
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
          title={isAutoPlaying ? 'Pause rotation' : 'Resume auto-rotation'}
        >
          {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isAutoPlaying ? 'Orbiting' : 'Paused'}</span>
        </button>

        {/* 6 Category Dot Selectors */}
        <div className="flex items-center gap-2 px-2 border-l border-slate-800">
          {CUBE_FACES_DATA.map((face, idx) => {
            const isActive = frontFaceIndex === idx;
            return (
              <button
                key={face.id}
                onClick={() => handleCardClick(idx, face)}
                className={`transition-all rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2.5 bg-cyan-400 shadow-[0_0_12px_#00f0ff]'
                    : 'w-2.5 h-2.5 bg-slate-700 hover:bg-cyan-400/60'
                }`}
                title={`Jump to ${face.category}`}
                aria-label={face.category}
              />
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800 text-xs font-mono text-slate-400">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
          <span>Horizontal Drag & Snap</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsCarousel3D;

