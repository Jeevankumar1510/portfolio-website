import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Github, Linkedin, Mail, Sparkles, Terminal, Code2, Cloud, Cpu, CheckCircle, BrainCircuit, RotateCw } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playClickSound } from '../../utils/soundEffects';

const Hero = ({ onOpenResume }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  // Animated Typing Effect
  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
          setTypingSpeed(45);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
          setTypingSpeed(90);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed]);

  const scrollToProjects = () => {
    playClickSound();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const navOffset = 76;
      const targetPos = projectsEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden scroll-mt-24">
      {/* Background ambient neon radial glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl space-y-7 text-left">
          
          {/* Status Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Available for Hire • AI, Gen AI, LLMs & Cloud Specialist</span>
          </div>

          {/* Main Greeting & Name */}
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              I'm <span className="text-gradient drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">{PERSONAL_INFO.name}</span>
            </h1>
          </div>

          {/* Animated Typing Role */}
          <div className="h-10 sm:h-12 flex items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-mono font-semibold text-slate-300">
              &gt; <span className="text-cyan-300">{displayedText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 inline-block ml-1 animate-pulse" />
            </span>
          </div>

          {/* Role Subtitle Badge Bar */}
          <div className="text-xs sm:text-sm font-mono text-slate-400 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">
              AI & Gen AI
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-purple-400">
              LLMs & Agentic AI
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-pink-400">
              ML & Deep Learning
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">
              Django & FastAPI
            </span>
            <span className="text-slate-600">•</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400">
              AWS & Azure
            </span>
          </div>

          {/* Introduction Paragraph */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
            "{PERSONAL_INFO.bio}"
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* View Projects Button */}
            <button
              onClick={scrollToProjects}
              className="relative group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:brightness-110 shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Download Resume Button */}
            <button
              onClick={() => {
                playClickSound();
                onOpenResume();
              }}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-mono text-sm font-semibold text-slate-300 glass-panel border border-slate-800 hover:border-cyan-500/40 hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pl-2">
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all hover:scale-110 cursor-pointer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all hover:scale-110 cursor-pointer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Floating Tech Icons */}
          <div className="pt-6 border-t border-slate-900/80">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              Core Arsenal // Specialized In:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Gen AI & LLMs', color: 'border-cyan-500/30 text-cyan-300' },
                { name: 'Agentic AI', color: 'border-purple-500/30 text-purple-300' },
                { name: 'PyTorch & DL', color: 'border-pink-500/30 text-pink-300' },
                { name: 'YOLOv8 & OpenCV', color: 'border-rose-500/30 text-rose-300' },
                { name: 'FastAPI & Django', color: 'border-emerald-500/30 text-emerald-300' },
                { name: 'AWS & Azure', color: 'border-amber-500/30 text-amber-300' },
                { name: 'Pytest CI/CD', color: 'border-teal-500/30 text-teal-300' }
              ].map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1 text-xs font-mono rounded-lg glass-panel border ${tech.color} shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div
                key={i}
                className="glass-panel p-3 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:-translate-y-1"
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-slate-400 tracking-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
