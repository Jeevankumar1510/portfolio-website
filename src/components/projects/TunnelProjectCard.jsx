import React, { useState } from 'react';
import {
  Github, ExternalLink, Sparkles, CheckCircle2,
  Eye, Zap, ChevronRight, Terminal, Code2
} from 'lucide-react';
import ProjectVisualIdentity from './ProjectVisualIdentity';
import { playClickSound, playCyberBeep } from '../../utils/soundEffects';

const TunnelProjectCard = ({
  project,
  onExploreProject,
  onHoverStateChange
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle 3D Tilt on Mouse Move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playCyberBeep(780, 0.02);
    if (onHoverStateChange) onHoverStateChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    if (onHoverStateChange) onHoverStateChange(false);
  };

  return (
    <div
      className="perspective-1000 w-full max-w-[740px] mx-auto transition-all duration-300 z-20"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative rounded-2xl p-5 sm:p-7 transition-all duration-300 transform-style-3d border overflow-hidden select-none ${isHovered
            ? 'glass-panel-glow border-2 shadow-[0_0_50px_rgba(0,240,255,0.4)] scale-[1.01]'
            : 'glass-panel border-cyan-500/40 shadow-[0_0_35px_rgba(0,0,0,0.85)]'
          }`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          borderColor: isHovered ? project.color : 'rgba(0, 240, 255, 0.45)',
          background: isHovered
            ? 'rgba(6, 11, 26, 0.94)'
            : 'rgba(4, 8, 20, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: project.color,
            opacity: isHovered ? 0.25 : 0.12
          }}
        />

        {/* Cyber Neon Corner Accents */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: project.color }} />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: project.color }} />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: project.color }} />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: project.color }} />

        {/* Top Header Row: Project ID Badge & Tag */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-900/90 border border-slate-800 text-cyan-400 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>PROJECT {project.number} / 07</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              // {project.category}
            </span>
          </div>

          <span
            className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border"
            style={{
              color: project.color,
              borderColor: `${project.color}50`,
              backgroundColor: `${project.color}15`
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Main Content Grid: Cockpit Preview & Tech Specs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative z-10">

          {/* Left Column (5 Cols): Visual Cockpit Preview & Benchmark */}
          <div className="md:col-span-5 space-y-2.5">
            {/* Visual Cockpit Dashboard Preview */}
            <div className={`transition-transform duration-300 ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}>
              <ProjectVisualIdentity type={project.visualIdentityType} color={project.color} />
            </div>

            {/* Performance Benchmark Indicator */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 pt-1">
              <span className="flex items-center gap-1 text-cyan-400">
                <Zap className="w-3 h-3" />
                <span>Verified</span>
              </span>
              <span className="text-slate-300 font-bold truncate max-w-[160px]">
                {project.metrics}
              </span>
            </div>
          </div>

          {/* Right Column (7 Cols): Title, Description, Features & Stack */}
          <div className="md:col-span-7 space-y-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight leading-snug">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-cyan-300 mt-0.5">
                {project.subtitle}
              </p>
            </div>

            {/* Concise Description */}
            <p className="text-xs text-slate-200 font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
              {project.description}
            </p>

            {/* 3 Key Highlights */}
            <div className="space-y-1 py-0.5">
              {project.features.slice(0, 3).map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-200">
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: project.color }}
                  />
                  <span className="leading-tight text-[11.5px]">{feature}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Badges */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map((tech, tIdx) => {
                  const TechIcon = tech.icon || Code2;
                  return (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/80 text-cyan-300 border border-cyan-500/30"
                    >
                      <TechIcon className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{tech.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Actions: GitHub, Live Demo (if available), Explore Project */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 mt-3 border-t border-slate-800/80">
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white glass-panel border border-slate-700 hover:border-cyan-400 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title="View GitHub Repository"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>

            {/* Live Demo Button (if available) */}
            {project.hasLiveDemo && project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-black bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Launch Live Application Demo"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Explore Project Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              onExploreProject(project);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-cyan-300 glass-panel-glow border border-cyan-500/40 hover:border-cyan-300 hover:bg-cyan-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.25)]"
          >
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>Explore Specs</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TunnelProjectCard;
