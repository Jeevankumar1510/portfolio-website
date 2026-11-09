import React from 'react';
import { Github, Linkedin, Mail, MapPin, Heart, Sparkles, ArrowUp, Terminal, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playClickSound } from '../../utils/soundEffects';

const Footer = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/15 bg-[#02050e] pt-16 pb-12 overflow-hidden">
      {/* Cyber Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Bio & Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-panel border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <span className="font-mono font-bold text-cyan-400 text-lg">JK</span>
              </div>
              <div>
                <h3 className="font-mono font-bold text-white tracking-wider text-lg">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {PERSONAL_INFO.title}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-sans">
              Passionate Computer Science graduate developing high-performance Generative AI & Agentic AI solutions, predictive Machine Learning & Deep Learning pipelines, scalable AWS & Azure cloud systems, and automated testing architectures.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all hover:scale-105"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email"
                className="p-2.5 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-mono text-slate-400">
              {['Home', 'Education', 'Internships', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => playClickSound()}
                    className="hover:text-cyan-300 transition-colors inline-block hover:translate-x-1 duration-150"
                  >
                    // {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: System Status & Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Live Status
            </h4>

            <div className="glass-panel p-3.5 rounded-xl border border-cyan-500/20 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Available for Full-time Roles</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                AI & 3D Interactive Engine • Active
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors group"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to Top of Page</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            Crafted with React, Three.js, Tailwind CSS & Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
