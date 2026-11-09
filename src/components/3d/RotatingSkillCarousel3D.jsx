import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Code2, Database, BrainCircuit, Cpu, Sparkles, Bot, Layers, Flame,
  BarChart3, Binary, Table, LineChart, Eye, Server, Zap, Network,
  Cloud, HardDrive, Workflow, Shield, Boxes, GitBranch, Github,
  Code, BookOpen, ChevronLeft, ChevronRight, Play, Pause, RotateCw, Gauge
} from 'lucide-react';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

// Icon resolver
const iconMap = {
  Code2, Database, BrainCircuit, Cpu, Sparkles, Bot, Layers, Flame,
  BarChart3, Binary, Table, LineChart, Eye, Server, Zap, Network,
  Cloud, HardDrive, Workflow, Shield, Boxes, GitBranch, Github,
  Code, BookOpen
};

const getSkillIcon = (iconName) => {
  return iconMap[iconName] || Sparkles;
};

const RotatingSkillCarousel3D = ({
  skills = [],
  activeCategory,
  selectedSkill,
  onSelectSkill
}) => {
  const containerRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [dimensions, setDimensions] = useState({ rx: 440, rz: 170, cardWidth: 265 });

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const targetAngleRef = useRef(null);
  const angleRef = useRef(0);
  const isAutoPlayingRef = useRef(true);
  const hoveredCardIdRef = useRef(null);
  const speedMultiplierRef = useRef(1);
  const lastHoverInteractionRef = useRef(Date.now());

  // Sync refs to avoid stale closures in animation loop
  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    hoveredCardIdRef.current = hoveredCardId;
  }, [hoveredCardId]);

  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  // Adjust elliptical radii based on screen size
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDimensions({ rx: 135, rz: 65, cardWidth: 175 }); // Small Mobile
      } else if (w < 640) {
        setDimensions({ rx: 175, rz: 85, cardWidth: 200 }); // Mobile
      } else if (w < 1024) {
        setDimensions({ rx: 310, rz: 130, cardWidth: 235 }); // Tablet
      } else {
        setDimensions({ rx: 440, rz: 170, cardWidth: 265 }); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format cards to always have at least 6 cards for a full balanced circular 3D cylinder
  const displayCards = useMemo(() => {
    if (!skills || skills.length === 0) return [];

    let list = [...skills];
    // If small number of skills (e.g. Programming has 2 skills: Python, SQL), duplicate to create a complete ring
    if (list.length === 2) {
      list = [
        { ...list[0], uniqueKey: '0-0' },
        { ...list[1], uniqueKey: '1-0' },
        { ...list[0], uniqueKey: '0-1' },
        { ...list[1], uniqueKey: '1-1' },
        { ...list[0], uniqueKey: '0-2' },
        { ...list[1], uniqueKey: '1-2' }
      ];
    } else if (list.length === 3) {
      list = [
        { ...list[0], uniqueKey: '0-0' },
        { ...list[1], uniqueKey: '1-0' },
        { ...list[2], uniqueKey: '2-0' },
        { ...list[0], uniqueKey: '0-1' },
        { ...list[1], uniqueKey: '1-1' },
        { ...list[2], uniqueKey: '2-1' }
      ];
    } else if (list.length === 4) {
      list = [
        { ...list[0], uniqueKey: '0-0' },
        { ...list[1], uniqueKey: '1-0' },
        { ...list[2], uniqueKey: '2-0' },
        { ...list[3], uniqueKey: '3-0' },
        { ...list[0], uniqueKey: '0-1' },
        { ...list[1], uniqueKey: '1-1' },
        { ...list[2], uniqueKey: '2-1' },
        { ...list[3], uniqueKey: '3-1' }
      ];
    } else {
      list = list.map((s, idx) => ({ ...s, uniqueKey: `${s.id}-${idx}` }));
    }
    return list;
  }, [skills]);

  const totalCards = displayCards.length;
  const angleStep = totalCards > 0 ? 360 / totalCards : 0;

  // Continuous 60 FPS Animation Loop (Never freezes!)
  useEffect(() => {
    let animId;
    let isTabVisible = !document.hidden;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      // 1. Smooth glide towards target angle (when clicking a card or stepping)
      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - angleRef.current;
        if (Math.abs(diff) < 0.25) {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        } else {
          angleRef.current += diff * 0.09;
        }
      } else if (isDraggingRef.current) {
        // Driven directly by pointer move
      } else if (Math.abs(velocityRef.current) > 0.04) {
        // Momentum coasting after drag
        angleRef.current += velocityRef.current;
        velocityRef.current *= 0.93;
      } else {
        // Continuous auto-orbit: pauses when actively hovering over a card, auto-resumes after 3.2s
        const isHoveringCard = hoveredCardIdRef.current !== null;
        const now = Date.now();
        const isHoverTimedOut = isHoveringCard && (now - lastHoverInteractionRef.current > 3200);

        if ((!isHoveringCard || isHoverTimedOut) && isAutoPlayingRef.current) {
          const baseStep = (isHoverTimedOut ? 0.22 : 0.38) * speedMultiplierRef.current;
          angleRef.current = (angleRef.current + baseStep) % 3600;
        }
      }

      setRotationAngle(angleRef.current);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  // Reset hover state when category or skills list changes
  useEffect(() => {
    setHoveredCardId(null);
    hoveredCardIdRef.current = null;
  }, [activeCategory, skills]);

  // Bring selected card to front when category changes or initial load
  useEffect(() => {
    if (selectedSkill && displayCards.length > 0) {
      const idx = displayCards.findIndex((c) => c.id === selectedSkill.id);
      if (idx !== -1) {
        rotateCardToFront(idx);
      }
    }
  }, [activeCategory]);

  // Rotate a specific card index to the front (angle = 0)
  const rotateCardToFront = (cardIndex) => {
    const cardBaseAngle = cardIndex * angleStep;
    const currentAngle = angleRef.current;
    
    // Calculate shortest angular path to bring this card to 0deg (front)
    const diff = ((-cardBaseAngle - currentAngle) % 360 + 540) % 360 - 180;
    targetAngleRef.current = currentAngle + diff;
  };

  const handleCardClick = (card, index) => {
    playClickSound();
    rotateCardToFront(index);
    if (onSelectSkill) {
      onSelectSkill(card);
    }
  };

  // Step Left / Right Controls
  const handleStepLeft = () => {
    playClickSound();
    targetAngleRef.current = angleRef.current + angleStep;
  };

  const handleStepRight = () => {
    playClickSound();
    targetAngleRef.current = angleRef.current - angleStep;
  };

  // Mouse & Touch Drag handlers with Pointer Capture
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = 0;
    targetAngleRef.current = null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    // Parallax tilt calculation
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTilt({
        x: Math.max(-6, Math.min(6, -y * 0.02)),
        y: Math.max(-8, Math.min(8, x * 0.02))
      });
    }

    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastPointerRef.current.x;
    const speed = 0.38;
    angleRef.current += dx * speed;
    velocityRef.current = dx * speed;
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
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] sm:h-[620px] md:h-[680px] flex flex-col items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        setTilt({ x: 0, y: 0 });
      }}
    >
      {/* Background radial glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Mode HUD Indicator */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-wrap items-center gap-2">
        <div className="glass-panel px-3.5 py-1.5 rounded-full border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>3D Circular Orbit Active • Drag or Click to Focus</span>
        </div>
      </div>

      {/* Central 3D Futuristic Stage */}
      <div
        className="relative w-full h-[440px] sm:h-[500px] md:h-[540px] flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Central Futuristic Energy Core (Physical Central Axis) */}
        <div
          className="absolute z-20 pointer-events-none flex items-center justify-center"
          style={{
            transform: `rotateX(${tilt.x * 0.4}deg) rotateY(${tilt.y * 0.4}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Central Hologram Pedestal Base */}
          <div
            className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.25)]"
            style={{
              transform: 'rotateX(75deg)',
              background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, rgba(6,182,212,0.06) 45%, transparent 70%)'
            }}
          />

          {/* Central Vertical Energy Pillar */}
          <div
            className="absolute w-1.5 h-48 sm:h-64 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-70 shadow-[0_0_25px_#00f0ff]"
          />

          {/* Core Concentric Orbiting Rings */}
          <div
            className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-cyan-400/50 animate-spin-slow"
            style={{
              transform: 'rotateX(65deg) rotateY(25deg)',
              boxShadow: '0 0 20px rgba(0,240,255,0.4)'
            }}
          />
          <div
            className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-purple-500/60"
            style={{
              transform: 'rotateX(55deg) rotateZ(45deg)',
              animation: 'spin 10s linear infinite reverse'
            }}
          />

          {/* Central Glowing Orb */}
          <div className="absolute w-7 h-7 rounded-full bg-cyan-400 shadow-[0_0_30px_#00f0ff] animate-pulse" />
        </div>

        {/* 3D Orbiting Ring of Cards (True Cylindrical Geometry) */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y * 0.5}deg)`
          }}
        >
          {displayCards.map((card, index) => {
            const cardBaseAngle = index * angleStep;
            // Effective angle relative to camera front (0deg)
            const currentTotalAngle = (rotationAngle + cardBaseAngle) % 360;
            const normalizedAngle = (currentTotalAngle + 360) % 360;
            const rad = (normalizedAngle * Math.PI) / 180;
            
            // 3D Elliptical Coordinates
            const x = Math.sin(rad) * dimensions.rx;
            const z = Math.cos(rad) * dimensions.rz;
            
            // Subtle floating vertical bobbing
            const floatOffset = Math.sin(normalizedAngle * 0.05 + index * 1.5) * 6;

            // Perspective yaw: turns slightly towards center as it arcs around sides
            const yaw = -Math.sin(rad) * 25;

            // Depth factor d: 1 (front) to 0 (back)
            const d = (Math.cos(rad) + 1) / 2;
            const isFront = d > 0.88;
            const isHoveredCard = hoveredCardId === card.uniqueKey;
            const isSelected = selectedSkill?.id === card.id;

            // Depth cueing
            const cardScale = isHoveredCard
              ? 1.18
              : isSelected && isFront
              ? 1.12
              : 0.78 + 0.32 * d;
            
            const cardOpacity = 0.42 + 0.58 * d;
            const zIndex = Math.round(d * 100);

            const IconComponent = getSkillIcon(card.iconName);

            return (
              <div
                key={card.uniqueKey || index}
                className="absolute select-none transition-opacity duration-150"
                style={{
                  width: `${dimensions.cardWidth}px`,
                  transformStyle: 'preserve-3d',
                  transform: `translate3d(${x}px, ${floatOffset}px, ${z}px) rotateY(${yaw}deg) scale3d(${cardScale}, ${cardScale}, ${cardScale})`,
                  opacity: cardOpacity,
                  zIndex,
                  pointerEvents: d > 0.25 ? 'auto' : 'none'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(card, index);
                }}
                onMouseEnter={() => {
                  lastHoverInteractionRef.current = Date.now();
                  setHoveredCardId(card.uniqueKey);
                  hoveredCardIdRef.current = card.uniqueKey;
                  playCyberBeep(780, 0.03);
                }}
                onMouseMove={() => {
                  lastHoverInteractionRef.current = Date.now();
                }}
                onMouseLeave={() => {
                  setHoveredCardId(null);
                  hoveredCardIdRef.current = null;
                }}
              >
                {/* 3D Glassmorphism Card */}
                <div
                  className={`relative p-5 sm:p-6 rounded-3xl glass-panel border transition-all duration-300 transform-style-3d cursor-pointer ${
                    isFront || isHoveredCard || isSelected
                      ? 'border-cyan-400 bg-slate-900/95 shadow-[0_0_35px_rgba(0,240,255,0.45)]'
                      : 'border-slate-800/80 bg-slate-950/75 hover:border-cyan-500/40 shadow-xl'
                  }`}
                  style={{
                    boxShadow: isFront || isSelected
                      ? `0 0 35px ${card.color}55, inset 0 0 20px ${card.color}20`
                      : undefined
                  }}
                >
                  {/* Card Header Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
                      {card.categoryLabel}
                    </span>
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        color: card.color,
                        borderColor: `${card.color}50`,
                        backgroundColor: `${card.color}15`
                      }}
                    >
                      {card.level}%
                    </span>
                  </div>

                  {/* Icon & Technology Name */}
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-300 shrink-0"
                      style={{
                        backgroundColor: `${card.color}20`,
                        borderColor: `${card.color}60`,
                        color: card.color,
                        transform: isHoveredCard ? 'scale(1.1) rotate(4deg)' : 'scale(1)'
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-white font-sans tracking-tight truncate">
                        {card.name}
                      </h4>
                      <span className="text-[11px] font-mono text-cyan-300 truncate">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3 font-sans">
                    {card.desc}
                  </p>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${card.level}%`,
                        background: `linear-gradient(90deg, #00f0ff, ${card.color})`,
                        boxShadow: `0 0 10px ${card.color}`
                      }}
                    />
                  </div>

                  {/* Active Card Bottom Hint */}
                  {isFront && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Active Front</span>
                      </span>
                      <span className="text-slate-400">Click to Focus</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Carousel Controls Bar */}
      <div className="relative z-30 mt-3 flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <button
          onClick={handleStepLeft}
          className="p-2 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Previous Skill (Rotate Right)"
          aria-label="Previous skill"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

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
          title={isAutoPlaying ? 'Pause rotation' : 'Resume auto-rotation'}
        >
          {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isAutoPlaying ? 'Auto-Orbiting' : 'Paused'}</span>
        </button>

        <button
          onClick={handleStepRight}
          className="p-2 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Next Skill (Rotate Left)"
          aria-label="Next skill"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Speed Toggle Button */}
        <button
          onClick={() => {
            playClickSound();
            setSpeedMultiplier((prev) => (prev === 1 ? 1.8 : 1));
          }}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
            speedMultiplier > 1
              ? 'bg-purple-950 text-purple-300 border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-bold'
              : 'border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle orbit speed"
        >
          <Gauge className="w-3 h-3" />
          <span>{speedMultiplier > 1 ? '2x Speed' : '1x Speed'}</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 text-[11px] font-mono text-slate-400">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
          <span>{totalCards} Skills in Orbit</span>
        </div>
      </div>
    </div>
  );
};

export default RotatingSkillCarousel3D;
