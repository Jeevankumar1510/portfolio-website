import React from 'react';
import {
  X, Github, ExternalLink, Sparkles, CheckCircle2,
  Code2, AlertTriangle, Lightbulb, ShieldCheck, Zap
} from 'lucide-react';
import ProjectVisualIdentity from './ProjectVisualIdentity';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const ExploreProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl glass-panel-glow rounded-3xl p-6 sm:p-9 border text-slate-200 max-h-[92vh] overflow-y-auto"
        style={{
          borderColor: project.color,
          boxShadow: `0 0 50px ${project.color}35, inset 0 0 25px ${project.color}10`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cyber Corner Accents */}
        <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: project.color }} />
        <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: project.color }} />
        <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: project.color }} />
        <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: project.color }} />

        {/* Header Badges */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
              PROJECT {project.number} / 07 • ARCHITECTURAL OVERVIEW
            </span>
            <span
              className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border"
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

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-cyan-300 mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Interactive Visual Cockpit Preview */}
        <div className="mb-5">
          <ProjectVisualIdentity type={project.visualIdentityType} color={project.color} />
        </div>

        {/* Full Project Description */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-5">
          <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold mb-1.5">
            Full Project Overview
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Problem Statement & Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Problem */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-red-500/30">
            <h4 className="text-xs font-mono uppercase text-red-400 font-semibold mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              Problem Statement
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {project.problemStatement}
            </p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/30">
            <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
              Engineering Solution
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Complete Key Features */}
        <div className="mb-5">
          <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Key Features & System Capabilities:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: project.color }}
                />
                <span className="leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold mb-2">
            Engineered Technology Stack:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => {
              const TechIcon = tech.icon || Code2;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/50"
                >
                  <TechIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{tech.name}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Benchmark: <strong className="text-cyan-300">{project.metrics}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white glass-panel border border-slate-700 hover:border-cyan-400 transition-all hover:scale-105 active:scale-95"
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

      </div>
    </div>
  );
};

export default ExploreProjectModal;

