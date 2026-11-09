import React, { useEffect, useState } from 'react';

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 20, text: 'MOUNTING THREE.JS GRAPHICS...' },
      { at: 45, text: 'INITIALIZING 3D NEON ASSETS...' },
      { at: 75, text: 'CONFIGURING CLOUD & AI MODULES...' },
      { at: 95, text: 'READY // JEEVAN KUMAR PORTFOLIO' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setStatusText('SYSTEM ONLINE');
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 600);
          }, 300);
          return 100;
        }

        const match = statuses.find((s) => s.at <= next && s.at > prev);
        if (match) setStatusText(match.text);

        return next;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center p-4 select-none transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      {/* Central 3D Wireframe Logo Box */}
      <div className="relative mb-8 perspective-1000">
        <div className="w-24 h-24 relative transform-style-3d animate-spin-slow">
          <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.6)] transform rotate-45 animate-pulse" />
          <div className="absolute inset-2 rounded-2xl border-2 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.5)] transform -rotate-12" />
          <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-2xl text-cyan-300">
            JK
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="relative text-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold font-mono tracking-widest text-white mb-1">
          JEEVAN <span className="text-cyan-400">KUMAR</span>
        </h1>
        <p className="text-xs font-mono text-cyan-500/80 tracking-widest uppercase">
          3D Developer Interface
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-64 md:w-80 h-2 bg-slate-900 rounded-full border border-cyan-500/30 overflow-hidden mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 transition-all duration-150 ease-out shadow-[0_0_10px_#00f0ff]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Stats */}
      <div className="relative w-64 md:w-80 flex justify-between items-center text-xs font-mono text-slate-400">
        <span className="text-cyan-400 animate-pulse">{statusText}</span>
        <span className="font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
};

export default Preloader;

