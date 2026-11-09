import React, { useState, useMemo } from 'react';
import {
  Sparkles, BrainCircuit, Cpu, Server, Cloud, Database,
  RotateCw, Layers, Terminal, Zap, Check, Compass,
  Code2, Bot, Flame, BarChart3, Binary, Table, LineChart,
  Eye, Network, HardDrive, Workflow, Shield, Boxes, GitBranch,
  Github, Code, BookOpen, ArrowRight, Orbit
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import TransparentSkillsCube3D, { SKILL_CUBE_FACES } from '../3d/TransparentSkillsCube3D';
import RotatingSkillCarousel3D from '../3d/RotatingSkillCarousel3D';
import CyberTerminal from '../common/CyberTerminal';
import {
  SKILL_CATEGORIES,
  ALL_SKILLS_DATA,
  getSkillsForCategory
} from '../../data/skillsData';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const categoryIconMap = {
  all: Sparkles,
  programming: Code2,
  aiml: BrainCircuit,
  libraries: Binary,
  backend: Server,
  cloud: Cloud,
  databases: Database,
  tools: GitBranch
};

const iconMap = {
  Code2, Database, BrainCircuit, Cpu, Sparkles, Bot, Layers, Flame,
  BarChart3, Binary, Table, LineChart, Eye, Server, Zap, Network,
  Cloud, HardDrive, Workflow, Shield, Boxes, GitBranch, Github,
  Code, BookOpen
};

const TechSkills = () => {
  // Mode: 'cube' (Transparent 3D Cube Carousel - Default) or 'orbit' (3D Revolving Orbital Carousel)
  const [carouselMode, setCarouselMode] = useState('cube');
  const [activeCubeFaceId, setActiveCubeFaceId] = useState('programming');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(ALL_SKILLS_DATA[0]); // Python

  // Listen to cross-component carousel switch requests (from Hero or Navbar)
  React.useEffect(() => {
    const handleSwitchMode = (e) => {
      if (e.detail) {
        setCarouselMode(e.detail);
      }
    };
    window.addEventListener('set-skills-carousel-mode', handleSwitchMode);
    return () => window.removeEventListener('set-skills-carousel-mode', handleSwitchMode);
  }, []);

  // Cube active face
  const activeCubeFace = useMemo(() => {
    return SKILL_CUBE_FACES.find((f) => f.id === activeCubeFaceId) || SKILL_CUBE_FACES[0];
  }, [activeCubeFaceId]);

  // Orbit skills list
  const currentSkills = useMemo(() => {
    return getSkillsForCategory(activeCategory);
  }, [activeCategory]);

  const currentCategoryMeta = useMemo(() => {
    return SKILL_CATEGORIES.find((c) => c.id === activeCategory) || SKILL_CATEGORIES[0];
  }, [activeCategory]);

  const handleSelectCubeFace = (face) => {
    playSuccessSound();
    setActiveCubeFaceId(face.id);
  };

  const handleCategoryChange = (categoryId) => {
    playClickSound();
    setActiveCategory(categoryId);
    const categorySkills = getSkillsForCategory(categoryId);
    if (categorySkills.length > 0) {
      setSelectedSkill(categorySkills[0]);
    }
  };

  const handleSkillSelect = (skill) => {
    playSuccessSound();
    setSelectedSkill(skill);
  };

  const ActiveCategoryIcon = categoryIconMap[activeCategory] || Sparkles;
  const SelectedSkillIcon = iconMap[selectedSkill?.iconName] || Sparkles;
  const CubeFaceIcon = activeCubeFace.icon;

  return (
    <section id="skills" className="relative py-24 overflow-hidden scroll-mt-24">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="// 01. TECHNICAL SPECTRUM"
          title="3D Transparent Skills Cube Carousel"
          subtitle="Futuristic 3D technology showcase featuring Jeevan Kumar's technical stack on a transparent glass cube revolving in 3D space between Home and Education. Drag to tumble 360°, select faces, or explore technologies across all 6 transparent glass faces."
        />

        {/* Carousel Mode Switcher Bar */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => {
              playClickSound();
              setCarouselMode('cube');
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              carouselMode === 'cube'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                : 'glass-panel text-slate-400 hover:text-white border-slate-800 hover:border-cyan-500/30'
            }`}
          >
            <Boxes className="w-4 h-4 text-cyan-400" />
            <span>3D Transparent Cube Carousel</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setCarouselMode('orbit');
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              carouselMode === 'orbit'
                ? 'bg-purple-950 text-purple-300 border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105'
                : 'glass-panel text-slate-400 hover:text-white border-slate-800 hover:border-purple-500/30'
            }`}
          >
            <Orbit className="w-4 h-4 text-purple-400" />
            <span>3D Revolving Orbital Carousel</span>
          </button>
        </div>

        {/* ========================================================
            MODE 1: 3D TRANSPARENT CUBE CAROUSEL
           ======================================================== */}
        {carouselMode === 'cube' && (
          <div className="animate-fade-in">
            {/* 3D Cube Card Container */}
            <div className="glass-panel rounded-3xl border border-cyan-500/30 p-4 sm:p-8 mb-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg"
                    style={{
                      backgroundColor: `${activeCubeFace.color}20`,
                      borderColor: `${activeCubeFace.color}50`,
                      color: activeCubeFace.color
                    }}
                  >
                    <CubeFaceIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>{activeCubeFace.badge}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      3D Transparent Skills Cube
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
                    6 Transparent Glass Faces
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40">
                    Inner Glowing Core
                  </span>
                </div>
              </div>

              {/* Cube Face Navigation Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-mono text-slate-400 font-semibold mr-1">
                  Focus Face:
                </span>
                {SKILL_CUBE_FACES.map((face) => {
                  const isSelected = activeCubeFaceId === face.id;
                  const FaceBtnIcon = face.icon;

                  return (
                    <button
                      key={face.id}
                      onClick={() => handleSelectCubeFace(face)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105 font-bold'
                          : 'glass-panel text-slate-400 hover:text-white border-slate-800 hover:border-cyan-500/30'
                      }`}
                      style={{
                        borderColor: isSelected ? face.color : undefined
                      }}
                    >
                      <FaceBtnIcon className="w-3.5 h-3.5" style={{ color: face.color }} />
                      <span>{face.categoryName}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3D Transparent Cube Carousel Component */}
              <TransparentSkillsCube3D
                activeFaceId={activeCubeFaceId}
                onSelectFace={handleSelectCubeFace}
              />
            </div>

            {/* Active Cube Face Detailed Inspector HUD Card */}
            {activeCubeFace && (
              <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.2)] mb-14 animate-fade-in relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Face Info (7 Cols) */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                        {activeCubeFace.faceName} • Front Inspection
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {activeCubeFace.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg shrink-0"
                        style={{
                          backgroundColor: `${activeCubeFace.color}20`,
                          borderColor: `${activeCubeFace.color}60`,
                          color: activeCubeFace.color
                        }}
                      >
                        <CubeFaceIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {activeCubeFace.title}
                        </h3>
                        <p className="text-xs font-mono text-cyan-400">
                          {activeCubeFace.categoryName}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {activeCubeFace.description}
                    </p>
                  </div>

                  {/* Right Column: Skills Progress Breakdown (5 Cols) */}
                  <div className="md:col-span-5 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 block font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Technologies on This Face:
                    </span>
                    <div className="space-y-2">
                      {activeCubeFace.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className="text-cyan-300 font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: activeCubeFace.color,
                                boxShadow: `0 0 8px ${activeCubeFace.color}`
                              }}
                            />
                          </div>
                          <p className="text-[10px] font-mono text-slate-400 truncate">
                            {skill.tag}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Quick Switcher to 3D Revolving Orbital Carousel */}
            <div className="flex items-center justify-center mb-10">
              <button
                onClick={() => {
                  playClickSound();
                  setCarouselMode('orbit');
                }}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl glass-panel border border-cyan-500/40 hover:border-cyan-400 text-slate-300 hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                <Orbit className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xs font-mono">Want to see all cards revolving horizontally?</span>
                <span className="text-xs font-mono font-bold text-cyan-400 underline">Switch to 3D Revolving Skill Carousel &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            MODE 2: 3D REVOLVING ORBITAL CAROUSEL
           ======================================================== */}
        {carouselMode === 'orbit' && (
          <div className="animate-fade-in">
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {SKILL_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const CatIcon = categoryIconMap[cat.id] || Sparkles;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                        : 'glass-panel text-slate-400 hover:text-white border-slate-800 hover:border-cyan-500/30'
                    }`}
                    style={{
                      borderColor: isActive ? cat.color : undefined
                    }}
                  >
                    <span>{cat.symbol}</span>
                    <span>{cat.name}</span>
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-ping ml-0.5"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 3D Rotating Carousel Container Card */}
            <div className="glass-panel rounded-3xl border border-cyan-500/30 p-4 sm:p-8 mb-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg"
                    style={{
                      backgroundColor: `${currentCategoryMeta.color}15`,
                      borderColor: `${currentCategoryMeta.color}40`,
                      color: currentCategoryMeta.color
                    }}
                  >
                    <ActiveCategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>{currentCategoryMeta.badge}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {currentCategoryMeta.name} Carousel
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
                    {currentSkills.length} Technologies in Category
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40">
                    Horizontal 3D Orbit
                  </span>
                </div>
              </div>

              {/* 3D Rotating Skill Carousel */}
              <RotatingSkillCarousel3D
                skills={currentSkills}
                activeCategory={activeCategory}
                selectedSkill={selectedSkill}
                onSelectSkill={handleSkillSelect}
              />
            </div>

            {/* Selected Orbital Skill Detailed Inspector HUD */}
            {selectedSkill && (
              <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.2)] mb-8 animate-fade-in relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Skill Information */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                        Front Inspection • 3D Revolving Orbit
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {selectedSkill.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg shrink-0"
                        style={{
                          backgroundColor: `${selectedSkill.color}20`,
                          borderColor: `${selectedSkill.color}60`,
                          color: selectedSkill.color
                        }}
                      >
                        <SelectedSkillIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {selectedSkill.name}
                        </h3>
                        <p className="text-xs font-mono text-cyan-400">
                          {selectedSkill.tag}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {selectedSkill.desc}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400">Production Role:</span>
                      <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-medium">
                        {selectedSkill.role}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Proficiency & Metrics */}
                  <div className="md:col-span-5 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        Proficiency Score
                      </span>
                      <span
                        className="text-lg font-mono font-extrabold px-3 py-1 rounded-lg border"
                        style={{
                          color: selectedSkill.color,
                          borderColor: `${selectedSkill.color}50`,
                          backgroundColor: `${selectedSkill.color}15`
                        }}
                      >
                        {selectedSkill.level}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${selectedSkill.level}%`,
                          backgroundColor: selectedSkill.color,
                          boxShadow: `0 0 12px ${selectedSkill.color}`
                        }}
                      />
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 space-y-1.5 pt-1 border-t border-slate-900">
                      <div className="flex items-center justify-between">
                        <span>Revolving State:</span>
                        <span className="text-emerald-400 font-semibold">Active in 3D Orbit</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Interaction:</span>
                        <span className="text-cyan-300">Click any card to focus & bring to front</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Quick Switch to Transparent Cube */}
            <div className="flex items-center justify-center mb-10">
              <button
                onClick={() => {
                  playClickSound();
                  setCarouselMode('cube');
                }}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl glass-panel border border-purple-500/40 hover:border-purple-400 text-slate-300 hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              >
                <Boxes className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xs font-mono">Want to inspect skills on the 3D Glass Cube?</span>
                <span className="text-xs font-mono font-bold text-purple-400 underline">Switch to 3D Transparent Cube &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* Detailed Grid of All Skills in Active Category */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Full Technology Specification Grid</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Interactive capability matrices
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentSkills.map((skill) => {
              const SkillIcon = iconMap[skill.iconName] || Sparkles;
              const isSelected = selectedSkill?.id === skill.id;

              return (
                <div
                  key={skill.id}
                  onClick={() => handleSkillSelect(skill)}
                  className={`p-5 rounded-2xl glass-panel border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_25px_rgba(0,240,255,0.3)] -translate-y-1'
                      : 'border-slate-800/80 hover:border-cyan-500/40 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
                      style={{
                        backgroundColor: `${skill.color}15`,
                        borderColor: `${skill.color}40`,
                        color: skill.color
                      }}
                    >
                      <SkillIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                      {skill.level}%
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {skill.name}
                  </h4>
                  <div className="text-[11px] font-mono text-slate-400 mb-2 truncate">
                    {skill.tag}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                    {skill.desc}
                  </p>

                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Cyber AI Terminal & Playground */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>Interactive Pipeline Terminal Emulation</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Live testing for AI Agents, Computer Vision & Cloud
            </span>
          </div>
          <CyberTerminal />
        </div>

        {/* Complete Tech Arsenal Pills */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-4">
            <Layers className="w-4 h-4 text-cyan-400" />
            Complete Technological Arsenal:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Python", "SQL", "Machine Learning", "Deep Learning", "Generative AI", "Agentic AI",
              "TensorFlow", "PyTorch", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "OpenCV",
              "Django", "FastAPI", "REST APIs", "AWS EC2", "AWS S3", "AWS Lambda", "AWS IAM",
              "AWS RDS", "Azure AI (AI-900)", "MySQL", "PostgreSQL", "MongoDB", "DynamoDB",
              "Git", "GitHub", "VS Code", "Jupyter Notebook", "Streamlit", "Pytest", "Docker"
            ].map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/90 text-cyan-300 border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechSkills;
