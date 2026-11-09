import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, RotateCcw, Cloud, Cpu, ArrowRight, Sparkles, Layers } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { INTERNSHIP_DATA } from '../../data/portfolioData';
import { playClickSound } from '../../utils/soundEffects';

const InternshipFlipCard = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    playClickSound();
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="perspective-1000 h-[520px] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''
          }`}
      >
        {/* ================= FRONT SIDE ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 hover:border-cyan-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300">
          {/* Top Banner */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                {item.duration}
              </span>
              <button
                onClick={handleFlip}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-all border border-slate-800 hover:border-cyan-500/30"
                title="Click to flip card"
              >
                <RotateCcw className="w-3 h-3 text-cyan-400" />
                <span>Flip to Back</span>
              </button>
            </div>

            {/* Role & Company */}
            <h3 className="text-2xl font-extrabold text-white font-sans tracking-tight mb-1">
              {item.role}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-mono text-cyan-400 mb-4">
              <span className="font-bold text-slate-200">{item.company}</span>
              <span className="flex items-center gap-1 text-slate-400 text-xs">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {item.location}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-slate-800/80">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{item.period}</span>
            </div>

            {/* Summary */}
            <p className="text-sm text-slate-300 font-sans mb-5 leading-relaxed">
              {item.summary}
            </p>

            {/* Front Key Achievements */}
            <div className="space-y-3">
              {item.frontDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {item.technologies.slice(0, 3).map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-cyan-300 border border-slate-800"
                >
                  {tech}
                </span>
              ))}
              {item.technologies.length > 3 && (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400">
                  +{item.technologies.length - 3} more
                </span>
              )}
            </div>

            <button
              onClick={handleFlip}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group font-semibold"
            >
              <span>View Responsibilities</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ================= BACK SIDE (ROTATED 180 DEG) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl glass-panel-glow p-6 sm:p-8 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col justify-between">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                Responsibilities & Technologies
              </div>
              <button
                onClick={handleFlip}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/60 transition-all"
              >
                <RotateCcw className="w-3 h-3 text-cyan-400" />
                <span>Flip Back</span>
              </button>
            </div>

            <h4 className="text-lg font-bold text-white mb-3">
              Key Contributions & Engineering Workflow
            </h4>

            {/* Detailed Responsibilities */}
            <div className="space-y-2.5 mb-6">
              {item.responsibilities.map((resp, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_#00f0ff]" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>

            {/* Complete Technologies Stack */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                Technology Stack Leveraged:
              </h5>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/60 shadow-[0_0_8px_rgba(0,240,255,0.15)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <span className="text-xs font-mono text-slate-400">
              Techwing & Blackbucks verified internship engagement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Internships = () => {
  return (
    <section id="internships" className="relative py-24 overflow-hidden scroll-mt-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="// 02. INDUSTRY EXPERIENCE"
          title="Internships & Applied Engineering"
          subtitle="Real-world hands-on experience in AWS cloud automation, Python infrastructure orchestration, and predictive machine learning model development."
        />

        {/* 3D Flip Card Instructions */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-slate-400 glass-panel border border-slate-800">
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Interactive 3D Cards • Click "Flip to Back" to explore details</span>
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INTERNSHIP_DATA.map((item) => (
            <InternshipFlipCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internships;

