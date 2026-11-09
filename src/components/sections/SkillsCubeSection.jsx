import React, { useState, useMemo } from 'react';
import {
  Code2, Database, BrainCircuit, Cpu, Sparkles, Binary,
  Cloud, Server, Zap, Compass, RotateCw, CheckCircle2, Boxes,
  LayoutGrid, Orbit, Eye, ChevronRight
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import SkillsCarousel3D from '../3d/SkillsCarousel3D';
import SkillsCube3D from '../3d/SkillsCube3D';
import { CUBE_FACES_DATA } from '../../data/skillsCubeData';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const SkillsCubeSection = () => {
  const [activeFaceId, setActiveFaceId] = useState('programming');
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'cube' | 'grid'

  const activeFace = useMemo(() => {
    return CUBE_FACES_DATA.find((f) => f.id === activeFaceId) || CUBE_FACES_DATA[0];
  }, [activeFaceId]);

  const handleSelectFace = (face) => {
    setActiveFaceId(face.id);
  };

  const handlePillClick = (face) => {
    playClickSound();
    setActiveFaceId(face.id);
  };

  const handleViewModeChange = (mode) => {
    playClickSound();
    setViewMode(mode);
  };

  const FaceIcon = activeFace.icon;

  return (
    <section id="skills" className="relative py-24 overflow-hidden scroll-mt-24">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="// 03. TECHNICAL SPECTRUM"
          title="Technical Skills Spectrum"
          subtitle="An interactive 3D technology showcase featuring Jeevan Kumar's core competencies. Drag horizontally to revolve smoothly, use navigation arrows, or toggle between 3D Carousel, 3D Cube, and All-in-One Grid."
        />

        {/* View Mode Switcher + 6 Category Quick-Selector Controls */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          
          {/* Futuristic View Mode Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl glass-panel-glow border border-cyan-500/40 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
            <button
              onClick={() => handleViewModeChange('carousel')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Orbit className="w-4 h-4 text-cyan-400" />
              <span>3D Carousel</span>
            </button>

            <button
              onClick={() => handleViewModeChange('cube')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                viewMode === 'cube'
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Boxes className="w-4 h-4 text-purple-400" />
              <span>3D Cube</span>
            </button>

            <button
              onClick={() => handleViewModeChange('grid')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-white border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-emerald-400" />
              <span>Simple Grid View</span>
            </button>
          </div>

          {/* 6 Category Quick Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CUBE_FACES_DATA.map((face) => {
              const isSelected = activeFaceId === face.id;
              const PillIcon = face.icon;

              return (
                <button
                  key={face.id}
                  onClick={() => handlePillClick(face)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                      : 'glass-panel text-slate-400 hover:text-white border-slate-800 hover:border-cyan-500/30'
                  }`}
                  style={{
                    borderColor: isSelected ? face.color : undefined
                  }}
                >
                  <PillIcon className="w-3.5 h-3.5" style={{ color: face.color }} />
                  <span>{face.category}</span>
                  {isSelected && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-ping ml-0.5"
                      style={{ backgroundColor: face.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEW 1: 3D Revolving Hexagonal Carousel (Smooth Horizontal, Upright Cards) */}
        {viewMode === 'carousel' && (
          <div className="glass-panel rounded-3xl border border-cyan-500/30 p-3 sm:p-6 md:p-8 mb-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden transition-all duration-500">
            {/* Header Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg"
                  style={{
                    backgroundColor: `${activeFace.color}20`,
                    borderColor: `${activeFace.color}50`,
                    color: activeFace.color
                  }}
                >
                  <FaceIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                    <span>3D Horizontal Carousel</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {activeFace.category}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
                  Swipe / Drag Left-Right
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40">
                  Magnetic Face Snap
                </span>
              </div>
            </div>

            {/* 3D Cylindrical Carousel Component */}
            <SkillsCarousel3D
              activeFaceId={activeFaceId}
              onSelectFace={handleSelectFace}
            />
          </div>
        )}

        {/* VIEW 2: 3D Transparent Cube (Glass faces with smart tilt controls) */}
        {viewMode === 'cube' && (
          <div className="glass-panel rounded-3xl border border-purple-500/30 p-3 sm:p-6 md:p-8 mb-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden transition-all duration-500">
            {/* Header Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg"
                  style={{
                    backgroundColor: `${activeFace.color}20`,
                    borderColor: `${activeFace.color}50`,
                    color: activeFace.color
                  }}
                >
                  <FaceIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <Boxes className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
                    <span>3D Transparent Cube</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {activeFace.category} Face
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40">
                  6 Glass Faces
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
                  Holographic Core
                </span>
              </div>
            </div>

            {/* 3D Cube Component */}
            <SkillsCube3D
              activeFaceId={activeFaceId}
              onSelectFace={handleSelectFace}
            />
          </div>
        )}

        {/* VIEW 3: Simple Grid View (All 6 Categories simultaneously visible) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 transition-all duration-500">
            {CUBE_FACES_DATA.map((cat, idx) => {
              const CatIcon = cat.icon;
              const isSelected = activeFaceId === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => handlePillClick(cat)}
                  className={`p-6 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'glass-panel-glow border-2 shadow-[0_0_35px_rgba(0,240,255,0.25)] scale-[1.02]'
                      : 'glass-panel border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1'
                  }`}
                  style={{
                    borderColor: isSelected ? cat.color : undefined
                  }}
                >
                  {/* Cyber Corner Accents */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: cat.color }} />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: cat.color }} />

                  <div>
                    {/* Header: Number and Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                        0{idx + 1} / 06
                      </span>
                      <span
                        className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border"
                        style={{
                          color: cat.color,
                          borderColor: `${cat.color}50`,
                          backgroundColor: `${cat.color}15`
                        }}
                      >
                        {cat.badge}
                      </span>
                    </div>

                    {/* Icon & Category Title */}
                    <div className="flex items-center gap-3.5 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg shrink-0"
                        style={{
                          backgroundColor: `${cat.color}20`,
                          borderColor: `${cat.color}60`,
                          color: cat.color
                        }}
                      >
                        <CatIcon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-white font-sans tracking-tight">
                          {cat.category}
                        </h4>
                        <p className="text-xs font-mono text-cyan-300 truncate">
                          {cat.title}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                      {cat.description}
                    </p>

                    {/* Technology Progress Bars */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                      {cat.skills.map((skill, sIdx) => {
                        const SkillIcon = skill.icon || Zap;
                        return (
                          <div key={sIdx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-white font-medium flex items-center gap-1.5">
                                <SkillIcon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                                <span>{skill.name}</span>
                              </span>
                              <span className="text-cyan-300 font-bold">{skill.level}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${skill.level}%`,
                                  backgroundColor: cat.color,
                                  boxShadow: `0 0 10px ${cat.color}`
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{cat.skills.length} Technologies</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300 hover:text-white">
                      <span>{isSelected ? 'Selected' : 'Inspect'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Active Face Detailed Inspector HUD Card (Available for 3D modes and grid selection) */}
        {activeFace && (
          <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400/60 shadow-[0_0_35px_rgba(0,240,255,0.2)] mb-12 animate-fade-in relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Category Overview (6 Cols) */}
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    {activeFace.faceName} • Active Specification
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeFace.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg shrink-0"
                    style={{
                      backgroundColor: `${activeFace.color}20`,
                      borderColor: `${activeFace.color}60`,
                      color: activeFace.color
                    }}
                  >
                    <FaceIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeFace.category}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">
                      {activeFace.title}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {activeFace.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
                    100% Production Verified
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-purple-300">
                    Scalable Architecture
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
                    Enterprise Tested
                  </span>
                </div>
              </div>

              {/* Right Column: Skills Progress Breakdown (6 Cols) */}
              <div className="md:col-span-6 p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3.5">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Technologies in {activeFace.category}:
                </span>
                
                <div className="space-y-3">
                  {activeFace.skills.map((skill, sIdx) => {
                    const SkillItemIcon = skill.icon || Zap;

                    return (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-white font-medium flex items-center gap-1.5">
                            <SkillItemIcon className="w-3.5 h-3.5" style={{ color: activeFace.color }} />
                            <span>{skill.name}</span>
                          </span>
                          <span className="text-cyan-300 font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: activeFace.color,
                              boxShadow: `0 0 10px ${activeFace.color}`
                            }}
                          />
                        </div>
                        <p className="text-[11px] font-sans text-slate-400 leading-snug">
                          {skill.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default SkillsCubeSection;
