import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Compass, Sparkles, Rocket } from 'lucide-react';
import { TUNNEL_PROJECTS_DATA } from '../../data/projectsData';
import { playClickSound } from '../../utils/soundEffects';

const TunnelNavigationControls = ({
  currentIndex = 0,
  onNavigate,
  isAutoCruising = true,
  onToggleAutoCruise,
  cruiseProgress = 0 // 0 to 100 percentage for the active interval
}) => {
  const currentProject = TUNNEL_PROJECTS_DATA[currentIndex] || TUNNEL_PROJECTS_DATA[0];
  const totalCount = TUNNEL_PROJECTS_DATA.length;

  const handlePrev = () => {
    playClickSound();
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(totalCount - 1);
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex < totalCount - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  };

  const handleDotClick = (idx) => {
    playClickSound();
    onNavigate(idx);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3.5 z-30 select-none">
      
      {/* Top HUD Row: Previous, Status Pill, Auto-Cruise Toggle & Next */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-4xl px-2">
        
        {/* Left: Previous Button & Current Project Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl glass-panel-glow border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer"
            title="Previous Project (‹)"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              TUNNEL WAYPOINT
            </span>
            <span className="text-xs font-bold text-white font-sans max-w-[190px] truncate block">
              {currentProject.title}
            </span>
          </div>
        </div>

        {/* Center: Main Project Indicator `PROJECT 01 / 07` & Auto-Cruise Button */}
        <div className="flex items-center gap-2.5">
          {/* Main Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-black text-white tracking-wider">
              PROJECT {currentProject.number} / 07
            </span>
          </div>

          {/* Auto-Cruise Play / Pause Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              if (onToggleAutoCruise) onToggleAutoCruise();
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              isAutoCruising
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                : 'glass-panel text-slate-400 hover:text-white border-slate-800'
            }`}
            title={isAutoCruising ? 'Pause automatic tunnel cruise' : 'Resume automatic cruise'}
          >
            {isAutoCruising ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{isAutoCruising ? 'Auto-Cruising' : 'Paused'}</span>
          </button>
        </div>

        {/* Right: Next Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
              CATEGORY
            </span>
            <span className="text-xs font-mono text-cyan-300 truncate max-w-[160px] block">
              {currentProject.tag}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl glass-panel-glow border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer"
            title="Next Project (›)"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Progress Bar & Seven Waypoint Indicators */}
      <div className="w-full max-w-4xl px-2 flex flex-col items-center gap-2">
        {/* Continuous Inward Cruise Progress Line */}
        <div className="w-full h-1 bg-slate-900 rounded-full border border-slate-800 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full transition-all duration-300 shadow-[0_0_12px_#00f0ff]"
            style={{
              width: isAutoCruising
                ? `${((currentIndex + cruiseProgress / 100) / totalCount) * 100}%`
                : `${((currentIndex + 1) / totalCount) * 100}%`
            }}
          />
        </div>

        {/* Seven Waypoint Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 pt-0.5">
          {TUNNEL_PROJECTS_DATA.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                onClick={() => handleDotClick(idx)}
                className="group relative flex flex-col items-center cursor-pointer p-1"
                title={`Jump to Project ${proj.number}: ${proj.title}`}
                aria-label={`Jump to Project ${proj.number}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-7 sm:w-9 h-2.5 sm:h-3 bg-cyan-400 shadow-[0_0_16px_#00f0ff]'
                      : 'w-2.5 h-2.5 bg-slate-700 hover:bg-cyan-400/70 hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: isActive ? proj.color : undefined
                  }}
                />

                {/* Floating Tooltip */}
                <span className="absolute -top-7 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-30">
                  {proj.number}. {proj.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default TunnelNavigationControls;
