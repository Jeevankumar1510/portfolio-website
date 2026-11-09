import React, { useState } from 'react';
import {
  Github, ExternalLink, Sparkles, CheckCircle2,
  Eye, Zap, ChevronRight, Terminal
} from 'lucide-react';
import ProjectVisualIdentity from './ProjectVisualIdentity';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

const SpiralProjectCard = ({
  project,
  index,
  isActive = false,
  onSelectProject
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect on mouse movement
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playCyberBeep(780, 0.03);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className="perspective-1000 w-full max-w-xl transition-all duration-500"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 transform-style-3d flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
          isActive || isHovered
            ? 'glass-panel-glow border-2 shadow-[0_20px_45px_rgba(0,240,255,0.28)] scale-[1.02]'
            : 'glass-panel border border-slate-800/80 hover:border-cyan-500/40 shadow-xl'
        }`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          borderColor: isActive || isHovered ? project.color : undefined,
          background: isActive
            ? 'rgba(7, 12, 28, 0.90)'
            : 'rgba(5, 9, 20, 0.80)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
        onClick={() => {
          playClickSound();
          onSelectProject(project);
        }}
      >
        {/* Cyber Neon Corner Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: project.color }} />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: project.color }} />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: project.color }} />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: project.color }} />

        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: project.color,
            opacity: isActive || isHovered ? 0.2 : 0.08
          }}
        />

        {/* Top Header: Project Number, Tag & Active Status */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-800 text-cyan-400">
                PROJECT {project.number} / 07
              </span>
              <span
                className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border"
                style={{
                  color: project.color,
                  borderColor: `${project.color}50`,
                  backgroundColor: `${project.color}15`
                }}
              >
                {project.tag}
              </span>
            </div>

            {isActive && (
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>ACTIVE WAYPOINT</span>
              </span>
            )}
          </div>

          {/* Project Title & Subtitle */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight mb-1 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-cyan-400/90 mb-4 font-semibold">
            {project.subtitle}
          </p>

          {/* Visual Identity Preview Cockpit */}
          <div className="mb-4">
            <ProjectVisualIdentity type={project.visualIdentityType} color={project.color} />
          </div>

          {/* Project Description */}
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Key Features (Top 3) */}
          <div className="space-y-1.5 mb-5">
            {project.features.slice(0, 3).map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: project.color }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Technologies & Action Buttons */}
        <div>
          {/* Tech Stack Chips with Original Icons */}
          <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-slate-800/80">
            {project.technologies.map((tech, tIdx) => {
              const TechIcon = tech.icon || Code2;
              return (
                <span
                  key={tIdx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900/90 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <TechIcon className="w-3 h-3 text-cyan-400" />
                  <span>{tech.name}</span>
                </span>
              );
            })}
          </div>

          {/* Action Buttons: GitHub, Live Demo (if available), Explore Details */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              {/* GitHub Button */}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white glass-panel border border-slate-800 hover:border-cyan-400 transition-all hover:scale-105 active:scale-95"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
              </a>

              {/* Live Demo Button (ONLY when genuine demo exists) */}
              {project.hasLiveDemo && project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-black bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
                  title="Launch Live Application Demo"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Explore Project / Details Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                onSelectProject(project);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-300 glass-panel border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40 transition-all hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Explore Project</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiralProjectCard;

