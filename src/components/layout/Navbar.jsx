import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Download, Github, Linkedin, Terminal, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { toggleMute, getIsMuted, playClickSound } from '../../utils/soundEffects';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Internships', href: '#internships', id: 'internships' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(getIsMuted());

  // Detect active section on scroll with requestAnimationFrame throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          const navOffset = 140;
          const scrollPos = window.scrollY + navOffset;

          for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
            const item = NAV_ITEMS[i];
            const el = document.getElementById(item.id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPos >= top) {
                setActiveSection(item.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    playClickSound();
    setActiveSection(id);
    setMobileMenuOpen(false);

    const target = document.getElementById(id) || document.querySelector(href);
    if (target) {
      const navHeight = 76;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: 'smooth'
      });
    }
  };

  const handleToggleAudio = () => {
    const nextMuted = toggleMute();
    setMuted(nextMuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#030712]/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl glass-panel border border-cyan-500/40 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <span className="font-mono font-bold text-cyan-400 text-lg group-hover:scale-110 transition-transform">
                JK
              </span>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-white tracking-wider text-sm sm:base flex items-center gap-1.5">
                JEEVAN <span className="text-cyan-400">KUMAR</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                AI & GEN AI ENGINEER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full glass-panel border border-slate-800/80 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/60 shadow-[0_0_12px_rgba(0,240,255,0.3)] border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Resume */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl glass-panel border transition-all duration-200 ${
                !muted
                  ? 'border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={muted ? 'Enable futuristic sound effects' : 'Mute sound effects'}
              aria-label="Toggle sound effects"
            >
              {!muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Social Links */}
            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all hover:scale-105"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClickSound();
                onOpenResume();
              }}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:brightness-110 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-lg glass-panel border transition-all ${
                !muted ? 'border-cyan-500/50 text-cyan-300' : 'border-slate-800 text-slate-500'
              }`}
              aria-label="Toggle sound"
            >
              {!muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg glass-panel border border-slate-800 text-slate-300 hover:text-cyan-400 focus:outline-none"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel-glow border-t border-b border-cyan-500/30 mt-3 px-6 py-5 animate-fade-in">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-sm transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Actions */}
          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg glass-panel border border-slate-800 text-slate-300 hover:text-cyan-400"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg glass-panel border border-slate-800 text-slate-300 hover:text-cyan-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
