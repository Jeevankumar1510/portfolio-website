import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { playClickSound } from '../../utils/soundEffects';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-xl glass-panel text-cyan-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] active:scale-95 group ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 text-cyan-300" />
      <span className="sr-only">Back to top</span>
    </button>
  );
};

export default BackToTop;

