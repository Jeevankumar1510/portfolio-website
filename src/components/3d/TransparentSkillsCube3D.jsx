import React, { useState, useEffect, useRef } from 'react';
import {
  Code2, BrainCircuit, Binary, Server, Cloud, Database,
  Sparkles, RotateCw, ChevronLeft, ChevronRight, Play, Pause,
  ArrowUp, ArrowDown, CheckCircle2, Zap, Boxes
} from 'lucide-react';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

export const SKILL_CUBE_FACES = [
  {
    id: 'programming',
    faceName: 'Front Face',
    categoryName: 'Programming',
    title: 'Python & SQL Core',
    badge: 'Core Languages',
    icon: Code2,
    color: '#00f0ff',
    targetRot: { x: 0, y: 0 },
    description: 'Foundational programming and relational query languages powering intelligent backend architectures, algorithms, and automated test frameworks.',
    skills: [
      { name: 'Python', level: 96, tag: 'Primary Core Language (AI/ML & APIs)' },
      { name: 'SQL', level: 90, tag: 'Complex Joins, Indexing & Schemas' }
    ]
  },
  {
    id: 'aiml',
    faceName: 'Right Face',
    categoryName: 'AI & Machine Learning',
    title: 'Neural, Agentic & Gen AI',
    badge: 'AI Models & Agents',
    icon: BrainCircuit,
    color: '#a855f7',
    targetRot: { x: 0, y: -90 },
    description: 'Autonomous agentic loops, prompt engineering, RAG, deep neural networks, computer vision, and predictive ML classifiers.',
    skills: [
      { name: 'Generative AI', level: 94, tag: 'LLMs, Prompt Engineering & RAG' },
      { name: 'Agentic AI', level: 90, tag: 'Autonomous Multi-Agent Loops' },
      { name: 'Machine Learning', level: 92, tag: 'Supervised & Unsupervised ML' },
      { name: 'Deep Learning', level: 90, tag: 'CNNs & Neural Architectures' },
      { name: 'PyTorch & TensorFlow', level: 89, tag: 'Deep Learning Frameworks' },
      { name: 'Scikit-learn', level: 92, tag: 'Predictive Feature Pipelines' }
    ]
  },
  {
    id: 'libraries',
    faceName: 'Back Face',
    categoryName: 'Python Libraries',
    title: 'Data & Vision Toolkit',
    badge: 'High-Performance Math',
    icon: Binary,
    color: '#38bdf8',
    targetRot: { x: 0, y: 180 },
    description: 'High-speed matrix vectorization, large-scale dataset cleaning, computer vision frame acquisition, and publication-ready statistical charting.',
    skills: [
      { name: 'NumPy', level: 95, tag: 'Matrix Math & Vectorized Computations' },
      { name: 'Pandas', level: 96, tag: 'Data Wrangling, Time Series & ETL' },
      { name: 'OpenCV', level: 92, tag: 'Real-Time Frame Processing & Tracking' },
      { name: 'Matplotlib', level: 88, tag: 'Statistical Plotting & Heatmaps' }
    ]
  },
  {
    id: 'backend',
    faceName: 'Left Face',
    categoryName: 'Backend Development',
    title: 'High-Throughput APIs',
    badge: 'Production Frameworks',
    icon: Server,
    color: '#10b981',
    targetRot: { x: 0, y: 90 },
    description: 'Ultra-fast asynchronous microservices, full-stack MVC platforms, and enterprise RESTful API architectures.',
    skills: [
      { name: 'FastAPI', level: 95, tag: 'Async Endpoints & Pydantic Validation' },
      { name: 'Django', level: 90, tag: 'Full-Stack ORM, Auth & Admin' },
      { name: 'REST APIs', level: 94, tag: 'Microservices & JSON Conformance' }
    ]
  },
  {
    id: 'cloud',
    faceName: 'Top Face',
    categoryName: 'Cloud Computing',
    title: 'AWS & Azure Architecture',
    badge: 'Certified Cloud',
    icon: Cloud,
    color: '#f59e0b',
    targetRot: { x: -90, y: 0 },
    description: 'Certified cloud infrastructure orchestration, automated Boto3 provisioning scripts, serverless event pipelines, and cognitive AI services.',
    skills: [
      { name: 'AWS EC2 & S3', level: 93, tag: 'Compute Instances & Object Storage' },
      { name: 'AWS Lambda', level: 90, tag: 'Serverless Event-Driven Functions' },
      { name: 'AWS IAM & RDS', level: 92, tag: 'Access Security & Managed DBs' },
      { name: 'Azure AI (AI-900)', level: 88, tag: 'Certified Cognitive Services' }
    ]
  },
  {
    id: 'databases_tools',
    faceName: 'Bottom Face',
    categoryName: 'Databases & Tools',
    title: 'Data Stores & DevOps',
    badge: 'ACID & Workflows',
    icon: Database,
    color: '#6366f1',
    targetRot: { x: 90, y: 0 },
    description: 'Relational ACID persistence, NoSQL document stores, automated CI/CD GitHub Actions test regression, and developer tooling.',
    skills: [
      { name: 'PostgreSQL & MySQL', level: 91, tag: 'Relational ACID & Complex Queries' },
      { name: 'MongoDB & DynamoDB', level: 86, tag: 'NoSQL Documents & Key-Value Stores' },
      { name: 'Git & GitHub Actions', level: 95, tag: 'Version Control & CI/CD Regression' },
      { name: 'VS Code & Jupyter', level: 96, tag: 'IDE & Interactive Notebooks' }
    ]
  }
];

const TransparentSkillsCube3D = ({
  activeFaceId = 'programming',
  onSelectFace
}) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: -12, y: 24 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredFaceId, setHoveredFaceId] = useState(null);
  const [cubeSize, setCubeSize] = useState(340);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: -12, y: 24 });
  const targetRotRef = useRef(null);
  const isAutoPlayingRef = useRef(true);
  const isHoveredFaceRef = useRef(false);
  const lastHoverInteractionRef = useRef(Date.now());

  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  useEffect(() => {
    isHoveredFaceRef.current = hoveredFaceId !== null;
  }, [hoveredFaceId]);

  // Screen size responsive cube dimensions
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCubeSize(260); // Mobile
      } else if (w < 1024) {
        setCubeSize(300); // Tablet
      } else {
        setCubeSize(340); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const halfSize = cubeSize / 2;

  // 60 FPS Animation Loop with IntersectionObserver
  useEffect(() => {
    let animId;
    let isVisible = true;
    let time = 0;

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
      time += 0.016;

      // Smooth interpolation to target face rotation
      if (targetRotRef.current !== null) {
        const dx = targetRotRef.current.x - rotRef.current.x;
        const dy = targetRotRef.current.y - rotRef.current.y;

        if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
          rotRef.current = { ...targetRotRef.current };
          targetRotRef.current = null;
        } else {
          rotRef.current.x += dx * 0.085;
          rotRef.current.y += dy * 0.085;
        }
      } else if (isDraggingRef.current) {
        // Controlled by pointer move
      } else if (Math.abs(velocityRef.current.x) > 0.02 || Math.abs(velocityRef.current.y) > 0.02) {
        // Inertia coasting
        rotRef.current.x += velocityRef.current.x;
        rotRef.current.y += velocityRef.current.y;
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;
      } else {
        // Continuous auto-orbit: pauses when actively hovering over a face, auto-resumes after 3.2s
        const now = Date.now();
        const isHoverTimedOut = isHoveredFaceRef.current && (now - lastHoverInteractionRef.current > 3200);

        if ((!isHoveredFaceRef.current || isHoverTimedOut) && isAutoPlayingRef.current) {
          rotRef.current.y = (rotRef.current.y + (isHoverTimedOut ? 0.22 : 0.38)) % 3600;
          rotRef.current.x = Math.sin(time * 0.5) * 14;
        }
      }

      setRotation({ x: rotRef.current.x, y: rotRef.current.y });
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  // Smoothly rotate cube to face when activeFaceId prop changes
  useEffect(() => {
    if (!activeFaceId) return;
    const face = SKILL_CUBE_FACES.find((f) => f.id === activeFaceId);
    if (face) {
      targetRotRef.current = { ...face.targetRot };
    }
  }, [activeFaceId]);

  const handleFaceClick = (face) => {
    playClickSound();
    targetRotRef.current = { ...face.targetRot };
    if (onSelectFace) {
      onSelectFace(face);
    }
  };

  // Drag interaction handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    targetRotRef.current = null;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;

    const sensitivity = 0.45;
    rotRef.current.y += dx * sensitivity;
    rotRef.current.x -= dy * sensitivity;

    velocityRef.current = {
      x: -dy * sensitivity * 0.4,
      y: dx * sensitivity * 0.4
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
    }
  };

  // 6 Face Transform Definitions
  const getFaceStyle = (faceId) => {
    let transform = '';
    switch (faceId) {
      case 'programming':
        transform = `rotateY(0deg) translateZ(${halfSize}px)`;
        break;
      case 'aiml':
        transform = `rotateY(90deg) translateZ(${halfSize}px)`;
        break;
      case 'libraries':
        transform = `rotateY(180deg) translateZ(${halfSize}px)`;
        break;
      case 'backend':
        transform = `rotateY(-90deg) translateZ(${halfSize}px)`;
        break;
      case 'cloud':
        transform = `rotateX(90deg) translateZ(${halfSize}px)`;
        break;
      case 'databases_tools':
        transform = `rotateX(-90deg) translateZ(${halfSize}px)`;
        break;
      default:
        transform = `translateZ(${halfSize}px)`;
    }

    return {
      width: `${cubeSize}px`,
      height: `${cubeSize}px`,
      transform,
      backfaceVisibility: 'visible' // Transparent so you can see through to other faces!
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] flex flex-col items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating HUD Mode Tag */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-wrap items-center gap-2">
        <div className="glass-panel px-3.5 py-1.5 rounded-full border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <Boxes className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>3D Transparent Skills Cube • Drag 360° to Tumble</span>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Rotating 3D Cube */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {/* Inner Glowing Holographic Reactor Core (Visible through the transparent glass faces!) */}
          <div
            className="absolute z-10 pointer-events-none flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Pulsing Light Core */}
            <div className="w-12 h-12 rounded-full bg-cyan-400/80 shadow-[0_0_40px_#00f0ff] animate-pulse" />
            <div className="absolute w-28 h-28 rounded-full border border-cyan-400/50 animate-spin-slow" style={{ transform: 'rotateX(60deg)' }} />
            <div className="absolute w-20 h-20 rounded-full border border-purple-500/60" style={{ transform: 'rotateY(60deg) rotateZ(30deg)', animation: 'spin 8s linear infinite reverse' }} />
            <div className="absolute w-1.5 h-36 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-80 shadow-[0_0_20px_#00f0ff]" />
          </div>

          {/* The 6 Transparent Glass Faces */}
          {SKILL_CUBE_FACES.map((face) => {
            const isHovered = hoveredFaceId === face.id;
            const isSelected = activeFaceId === face.id;
            const FaceIcon = face.icon;

            return (
              <div
                key={face.id}
                className="absolute p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                style={{
                  ...getFaceStyle(face.id),
                  background: 'rgba(3, 7, 18, 0.75)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isSelected || isHovered
                    ? `1.5px solid ${face.color}`
                    : '1px solid rgba(0, 240, 255, 0.35)',
                  boxShadow: isSelected || isHovered
                    ? `0 0 35px ${face.color}55, inset 0 0 25px ${face.color}20`
                    : '0 0 20px rgba(0, 240, 255, 0.12), inset 0 0 15px rgba(0, 240, 255, 0.05)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFaceClick(face);
                }}
                onMouseEnter={() => {
                  lastHoverInteractionRef.current = Date.now();
                  setHoveredFaceId(face.id);
                  playCyberBeep(780, 0.03);
                }}
                onMouseMove={() => {
                  lastHoverInteractionRef.current = Date.now();
                }}
                onMouseLeave={() => setHoveredFaceId(null)}
              >
                {/* Neon Corner Cyber Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: face.color }} />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: face.color }} />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: face.color }} />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: face.color }} />

                {/* Top Header Badge & Face Tag */}
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

                  {/* Icon & Category Title */}
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
                      <h4 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight line-clamp-1">
                        {face.title}
                      </h4>
                      <p className="text-[11px] font-mono text-cyan-300 truncate">
                        {face.categoryName}
                      </p>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2 font-sans">
                    {face.description}
                  </p>
                </div>

                {/* Skills Chips on Face */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {face.skills.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 text-cyan-300 border border-slate-800 flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: face.color }} />
                        <span>{skill.name}</span>
                        <span className="text-slate-400 font-bold">{skill.level}%</span>
                      </span>
                    ))}
                  </div>

                  <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Zap className="w-3 h-3" />
                      <span>{face.skills.length} Tech Skills</span>
                    </span>
                    <span className="text-slate-400 hover:text-white">Click to Focus</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cube Controls Bar */}
      <div className="relative z-30 mt-3 flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {/* Step Rotate Buttons */}
        <button
          onClick={() => {
            playClickSound();
            rotRef.current.y += 90;
          }}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Rotate Left (90°)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            playClickSound();
            setIsAutoPlaying(!isAutoPlaying);
          }}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
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
          onClick={() => {
            playClickSound();
            rotRef.current.y -= 90;
          }}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Rotate Right (90°)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            playClickSound();
            rotRef.current.x -= 90;
          }}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Tilt Up (90°)"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            playClickSound();
            rotRef.current.x += 90;
          }}
          className="p-1.5 rounded-full glass-panel border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Tilt Down (90°)"
        >
          <ArrowDown className="w-4 h-4" />
        </button>

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 text-[11px] font-mono text-slate-400">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
          <span>6 Transparent Faces</span>
        </div>
      </div>
    </div>
  );
};

export default TransparentSkillsCube3D;

