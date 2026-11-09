import React from 'react';
import {
  Github, ExternalLink, Sparkles, CheckCircle2,
  Terminal, Code2, Zap, ShieldCheck, Activity, Eye, Bot
} from 'lucide-react';
import ProjectVisualIdentity from './ProjectVisualIdentity';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const ActiveProjectDetailHUD = ({ project }) => {
  if (!project) return null;

  return (
    <div
      className="glass-panel-glow rounded-3xl p-6 sm:p-8 md:p-9 border transition-all duration-500 relative overflow-hidden animate-fade-in shadow-[0_0_40px_rgba(0,240,255,0.22)]"
      style={{
        borderColor: project.color,
        boxShadow: `0 0 45px ${project.color}35, inset 0 0 25px ${project.color}10`
      }}
    >
      {/* Ambient Top Glow */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
        style={{
          backgroundColor: project.color,
          opacity: 0.18
        }}
      />

      {/* Cyber Corner Accents */}
      <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: project.color }} />
      <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: project.color }} />
      <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: project.color }} />
      <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: project.color }} />

      {/* Main Grid: Left Column (Overview & Cockpit) + Right Column (Features & Specs) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start relative z-10">
        
        {/* Left Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-800 text-cyan-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>PROJECT {project.number} / 07 • INSPECTED</span>
            </span>
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-md border"
              style={{
                color: project.color,
                borderColor: `${project.color}50`,
                backgroundColor: `${project.color}15`
              }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.tag}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-sans tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Visual Identity Interactive Cockpit Dashboard */}
          <div className="pt-1">
            <ProjectVisualIdentity type={project.visualIdentityType} color={project.color} />
          </div>

          {/* Description */}
          <p className="text-sm text-slate-200 leading-relaxed font-sans pt-1">
            {project.description}
          </p>

          {/* Action Buttons: GitHub & Demo */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono text-slate-200 hover:text-white glass-panel border border-slate-700 hover:border-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>View Source Code</span>
            </a>

            {project.hasLiveDemo && project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSuccessSound()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium text-black bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column (6 Cols): Key Features & Technology Stack */}
        <div className="lg:col-span-6 space-y-5 p-5 sm:p-7 rounded-2xl bg-slate-950/80 border border-slate-800">
          
          {/* Key Features List */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block font-semibold mb-3.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Architectural Features & Capabilities:
            </span>

            <div className="space-y-2.5">
              {project.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-snug">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: project.color }}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack with Lucide Icons */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold mb-2.5">
              Engineered Technology Stack:
            </span>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, tIdx) => {
                const TechIcon = tech.icon || Code2;
                return (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/50"
                  >
                    <TechIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{tech.name}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Performance Benchmark Badge */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Benchmark Metric:
            </span>
            <span className="text-cyan-300 font-bold">{project.metrics}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ActiveProjectDetailHUD;

