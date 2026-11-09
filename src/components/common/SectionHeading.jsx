import React from 'react';

const SectionHeading = ({ tag, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-14 md:mb-18 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-xl'}`}>
      {/* Futuristic Tag Badge */}
      <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider glass-panel border border-cyan-500/30 text-cyan-400 mb-3.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
        <span>{tag}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title.split(' ').map((word, i) => {
          // Highlight every other key word or the last word
          if (i === 1 || i === title.split(' ').length - 1) {
            return (
              <span key={i} className="text-gradient inline-block mr-2.5">
                {word}
              </span>
            );
          }
          return (
            <span key={i} className="inline-block mr-2.5">
              {word}
            </span>
          );
        })}
      </h2>

      {/* Futuristic Animated Underline */}
      <div className={`flex items-center gap-2 mb-4 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-cyan-400" />
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-cyan-400" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

