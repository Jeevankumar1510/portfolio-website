import React, { useState } from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { EDUCATION_DATA } from '../../data/portfolioData';
import { playClickSound } from '../../utils/soundEffects';

const EducationCard = ({ item, index }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
    playClickSound();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''} mb-16`}>
      {/* 3D Timeline Center Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className={`w-10 h-10 rounded-full glass-panel border-2 ${isHovered ? 'border-cyan-400 shadow-[0_0_20px_#00f0ff]' : 'border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]'} flex items-center justify-center transition-all duration-300 bg-[#030712]`}>
          <GraduationCap className={`w-5 h-5 ${isHovered ? 'text-cyan-300 scale-110' : 'text-cyan-400'} transition-all`} />
        </div>
      </div>

      {/* Card Container (Takes half width on desktop) */}
      <div className="w-full md:w-1/2 pl-12 md:pl-0">
        <div
          className={`perspective-1000 ${isEven ? 'md:pl-10 text-left' : 'md:pr-10 text-left'}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`relative rounded-2xl glass-panel p-6 md:p-8 border transition-all duration-300 transform-style-3d ${
              isHovered
                ? 'border-cyan-400 shadow-[0_15px_35px_rgba(6,182,212,0.25)] -translate-y-2'
                : 'border-slate-800 hover:border-cyan-500/40 shadow-lg'
            }`}
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
            }}
          >
            {/* Top Badge & Period */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {item.badge}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Degree Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight mb-1.5 group-hover:text-cyan-300 transition-colors">
              {item.degree}
            </h3>

            {/* Institution & Location */}
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-mono text-slate-300 mb-4">
              <span className="text-cyan-400 font-semibold">{item.institution}</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                {item.location}
              </span>
            </div>

            {/* Grade Chip */}
            <div className="inline-block px-3 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold mb-5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              {item.grade}
            </div>

            {/* Highlights List */}
            <ul className="space-y-2 mb-5">
              {item.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Skills learned badges */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* 3D Corner Accent Glow */}
            <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-transparent to-cyan-500/20 rounded-br-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Spacer for other half */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
};

const Education = () => {
  return (
    <section id="education" className="relative py-24 overflow-hidden scroll-mt-24">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="// 01. ACADEMIC JOURNEY"
          title="Education & Foundations"
          subtitle="A solid computer science and engineering foundation marked by academic distinction, practical problem solving, and analytical rigor."
        />

        {/* Vertical Timeline Track */}
        <div className="relative">
          {/* Glowing central beam */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-8 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-500/20 shadow-[0_0_10px_rgba(0,240,255,0.6)]" />

          {/* Education Timeline Cards */}
          <div className="space-y-4">
            {EDUCATION_DATA.map((item, index) => (
              <EducationCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
