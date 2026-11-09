import React from 'react';
import { Eye, ChevronRight, Sparkles } from 'lucide-react';
import { playClickSound } from '../../utils/soundEffects';

const TunnelDepthGhostCard = ({
  project,
  depthLevel = 1, // 1 (closer) or 2 (further in the inner tunnel)
  onClick,
  inwardOffset = 0
}) => {
  if (!project) return null;

  // Compute 3D transform according to depth level
  const baseZ = depthLevel === 1 ? -145 : -285;
  const baseScale = depthLevel === 1 ? 0.76 : 0.54;
  const baseOpacity = depthLevel === 1 ? 0.45 : 0.22;
  const translateY = depthLevel === 1 ? -14 : -28;

  // Inward drift offset
  const currentZ = baseZ - inwardOffset * 0.35;
  const currentScale = baseScale - inwardOffset * 0.0006;

  return (
    <div
      onClick={() => {
        playClickSound();
        onClick();
      }}
      className="absolute cursor-pointer transition-transform duration-500 ease-out hover:opacity-80"
      style={{
        transform: `translate3d(0, ${translateY}px, ${currentZ}px) scale(${currentScale})`,
        opacity: baseOpacity,
        filter: depthLevel === 1 ? 'blur(0.4px)' : 'blur(1.6px)',
        zIndex: depthLevel === 1 ? 10 : 5,
        pointerEvents: 'auto'
      }}
      title={`Click to warp to ${project.title}`}
    >
      <div
        className="w-[660px] max-w-[90vw] rounded-2xl p-4 sm:p-5 border glass-panel transition-all duration-300 shadow-2xl overflow-hidden select-none"
        style={{
          borderColor: project.color,
          background: 'rgba(5, 10, 24, 0.82)',
          boxShadow: `0 0 35px ${project.accentGlow || 'rgba(0,240,255,0.3)'}`
        }}
      >
        {/* Holographic Top Tag */}
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: project.color }} />
            <span className="font-bold text-white tracking-wider">PROJECT {project.number} / 07</span>
            <span className="text-slate-400 text-[10px] hidden sm:inline">// INWARD QUEUE</span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded border"
            style={{
              color: project.color,
              borderColor: `${project.color}40`,
              backgroundColor: `${project.color}15`
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Project Header */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white font-sans tracking-tight">
              {project.title}
            </h4>
            <p className="text-xs font-mono text-cyan-300 truncate max-w-sm mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium shrink-0">
            <span>Bring to Focus</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TunnelDepthGhostCard;

