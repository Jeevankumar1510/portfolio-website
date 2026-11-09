import React from 'react';
import { Sparkles, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { SPIRAL_PROJECTS_DATA } from '../../data/projectsData';
import { playClickSound } from '../../utils/soundEffects';

const SpiralProjectHUD = ({
  activeIndex = 0,
  onNavigateToProject
}) => {
  const currentProject = SPIRAL_PROJECTS_DATA[activeIndex] || SPIRAL_PROJECTS_DATA[0];

  const handlePointClick = (index) => {
    playClickSound();
    if (onNavigateToProject) {
      onNavigateToProject(index);
    }
  };

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto">
      {/* Active Project Card Pill */}
      <div className="glass-panel-glow px-4 py-2.5 rounded-2xl border border-cyan-400/40 shadow-[0_0_25px_rgba(0,240,255,0.25)] flex items-center gap-3 backdrop-blur-xl animate-fade-in text-right">
        <div>
          <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            PROJECT {currentProject.number} / 07 • WAYPOINT
          </div>
          <div className="text-xs sm:text-sm font-bold text-white font-sans max-w-[170px] truncate">
            {currentProject.title}
          </div>
        </div>

        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center border shadow-lg shrink-0"
          style={{
            backgroundColor: `${currentProject.color}20`,
            borderColor: `${currentProject.color}60`,
            color: currentProject.color
          }}
        >
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* 7 Vertical Navigation Waypoints Bar */}
      <div className="glass-panel p-2.5 rounded-full border border-slate-800 flex flex-col items-center gap-2.5 shadow-xl">
        {SPIRAL_PROJECTS_DATA.map((proj, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={proj.id}
              onClick={() => handlePointClick(idx)}
              className="group relative flex items-center justify-center cursor-pointer p-1"
              title={`Jump to Project ${proj.number}: ${proj.title}`}
              aria-label={`Jump to Project ${proj.number}`}
            >
              {/* Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-4 h-4 shadow-[0_0_15px_#00f0ff]'
                    : 'w-2 h-2 bg-slate-600 group-hover:bg-cyan-400/80 group-hover:scale-125'
                }`}
                style={{
                  backgroundColor: isActive ? proj.color : undefined
                }}
              />

              {/* Floating Tooltip on Hover */}
              <span className="absolute right-7 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                0{idx + 1}. {proj.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SpiralProjectHUD;

